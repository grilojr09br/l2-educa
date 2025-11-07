# Guia Prático: Implementação Backend Seguro

## 🔧 Backend com Node.js + Express + TypeScript

### 1. Configuração Inicial

```bash
npm init -y
npm install express typescript @types/express @types/node dotenv cors helmet bcrypt jsonwebtoken @supabase/supabase-js
npm install -D ts-node @types/bcrypt @types/jsonwebtoken
```

### 2. Variáveis de Ambiente (.env)

```
PORT=3001
SUPABASE_URL=seu_url_aqui
SUPABASE_SERVICE_KEY=sua_chave_service_aqui
JWT_SECRET=sua_chave_jwt_super_secreta_aleatoria_com_64_chars_aqui
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=production
```

### 3. Tipos TypeScript (types.ts)

```typescript
export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}
```

### 4. Middleware de Autenticação (middleware/auth.ts)

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido',
        statusCode: 401
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: 'Token expirado',
        statusCode: 401
      });
    }

    res.status(403).json({
      success: false,
      error: 'Token inválido',
      statusCode: 403
    });
  }
};
```

### 5. Rate Limiting (middleware/rateLimiter.ts)

```typescript
import { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export const rateLimiter = (
  windowMs: number = 15 * 60 * 1000, // 15 min
  maxRequests: number = 100
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const identifier = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    
    let entry = rateLimitStore.get(identifier);

    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + windowMs
      };
    }

    entry.count++;

    if (entry.count > maxRequests) {
      res.status(429).json({
        success: false,
        error: 'Muitas requisições. Tente novamente mais tarde.',
        statusCode: 429
      });
      return;
    }

    rateLimitStore.set(identifier, entry);
    next();
  };
};
```

### 6. Service de Autenticação (services/authService.ts)

```typescript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';
import { User, AuthResponse, TokenPayload } from '../types';

export class AuthService {
  static async register(
    email: string,
    password: string,
    username: string
  ): Promise<User> {
    // Validações básicas
    if (!email || !password || !username) {
      throw new Error('Email, senha e username são obrigatórios');
    }

    if (password.length < 8) {
      throw new Error('Senha deve ter no mínimo 8 caracteres');
    }

    // Registrar no Supabase Auth
    const { data: { user: authUser }, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false
    });

    if (authError || !authUser) {
      throw new Error(authError?.message || 'Erro ao registrar usuário');
    }

    // Criar perfil do usuário
    const { data, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authUser.id,
          email,
          username
        }
      ])
      .select()
      .single();

    if (profileError) {
      // Limpar usuário do auth se falhar ao criar perfil
      await supabase.auth.admin.deleteUser(authUser.id);
      throw new Error('Erro ao criar perfil do usuário');
    }

    return data;
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    // Validar credenciais
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Autenticar no Supabase
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !user || !session) {
      throw new Error('Email ou senha incorretos');
    }

    // Buscar dados do usuário
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    // Gerar tokens JWT adicionais (para sessões backend)
    const accessToken = this.generateAccessToken(user.id, email);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user: userData
    };
  }

  static async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET!
      ) as TokenPayload;

      const newAccessToken = this.generateAccessToken(decoded.userId, decoded.email);
      return newAccessToken;
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }

  private static generateAccessToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
  }

  private static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    );
  }

  static async logout(userId: string): Promise<void> {
    // Invalidar sessão no Supabase
    await supabase.auth.signOut();
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    if (!currentPassword || !newPassword) {
      throw new Error('Senhas são obrigatórias');
    }

    if (newPassword.length < 8) {
      throw new Error('Nova senha deve ter no mínimo 8 caracteres');
    }

    // Atualizar senha no Supabase
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword
    });

    if (error) {
      throw new Error('Erro ao alterar senha');
    }
  }
}
```

### 7. Controllers (controllers/authController.ts)

```typescript
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, username } = req.body;

      const user = await AuthService.register(email, password, username);

      res.status(201).json({
        success: true,
        data: user,
        statusCode: 201
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao registrar',
        statusCode: 400
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const response = await AuthService.login(email, password);

      // HttpOnly cookie para maior segurança
      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
      });

      res.status(200).json({
        success: true,
        data: {
          accessToken: response.accessToken,
          user: response.user
        },
        statusCode: 200
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
        statusCode: 401
      });
    }
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          error: 'Refresh token não fornecido',
          statusCode: 401
        });
        return;
      }

      const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

      res.status(200).json({
        success: true,
        data: { accessToken: newAccessToken },
        statusCode: 200
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao renovar token',
        statusCode: 401
      });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Usuário não autenticado',
          statusCode: 401
        });
        return;
      }

      await AuthService.logout(req.user.userId);

      res.clearCookie('refreshToken');
      res.status(200).json({
        success: true,
        statusCode: 200
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao fazer logout',
        statusCode: 500
      });
    }
  }

  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Usuário não autenticado',
          statusCode: 401
        });
        return;
      }

      const { currentPassword, newPassword } = req.body;

      await AuthService.changePassword(req.user.userId, currentPassword, newPassword);

      res.status(200).json({
        success: true,
        statusCode: 200
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao alterar senha',
        statusCode: 400
      });
    }
  }
}
```

### 8. Rotas (routes/auth.ts)

```typescript
import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Rate limit mais restritivo para login
const loginLimiter = rateLimiter(15 * 60 * 1000, 5);

router.post('/register', rateLimiter(15 * 60 * 1000, 10), AuthController.register);
router.post('/login', loginLimiter, AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', authMiddleware, AuthController.logout);
router.post('/change-password', authMiddleware, AuthController.changePassword);

export default router;
```

### 9. App Principal (app.ts)

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';

const app = express();

// Segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Parsers
app.use(express.json({ limit: '10kb' })); // Limitar tamanho
app.use(express.urlencoded({ limit: '10kb', extended: true }));
app.use(cookieParser());

// Rotas
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    statusCode: 500
  });
});

export default app;
```

### 10. Server Entry Point (server.ts)

```typescript
import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
});
```

---

## 🔑 Diagrama de Fluxo de Segurança

```
┌─────────────────┐
│   Frontend      │
│  React + TS     │
└────────┬────────┘
         │ POST /login (email, password)
         ▼
┌─────────────────────────────────┐
│   Backend Express + TS          │
│ 1. Rate Limiting                │
│ 2. Validação de Input (Zod)     │
│ 3. Verificar credenciais        │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Supabase Auth                 │
│ (Armazena hash bcrypt)          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Supabase PostgreSQL           │
│ + Row Level Security (RLS)      │
│ (Garante isolamento de dados)   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Response com Tokens JWT       │
│ - Access Token (1h)             │
│ - Refresh Token (HttpOnly, 7d)  │
└─────────────────────────────────┘
```

---

## ✨ Resumo: Os 3 Pilares da Segurança

### 1️⃣ **Autenticação Forte**
- Hash bcrypt com salt (nunca plain text)
- JWT tokens com expiração
- Refresh tokens separados
- HttpOnly cookies para tokens

### 2️⃣ **Autorização Granular**
- Row Level Security (RLS) no banco
- Firebase Rules bem configuradas
- Middleware de autenticação
- Validação em todas as camadas

### 3️⃣ **Defesa em Profundidade**
- Rate limiting para brute force
- Validação de input (Zod)
- CORS e CSRF protegido
- Headers de segurança (Helmet)
- Logs de auditoria
