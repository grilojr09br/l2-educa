# Guia Completo: Sistema de Login Hiperseguro com React, TypeScript, Supabase/Firebase

## 📋 Índice
1. Arquitetura e Tecnologias
2. Configuração do Backend (Supabase/Firebase)
3. Autenticação Frontend
4. Validações e Proteção
5. Boas Práticas de Segurança

---

## 🏗️ 1. Arquitetura e Tecnologias

### Stack Recomendado:
- **Frontend**: React 18+ com TypeScript
- **Backend**: Supabase (com PostgreSQL + RLS) OU Firebase
- **Validação**: Zod + React Hook Form
- **HTTP Client**: Axios/Fetch com interceptores
- **Hash**: Bcrypt (backend)
- **Tokens**: JWT com Access + Refresh tokens
- **Ambiente**: Variáveis sensíveis em `.env.local`

---

## 🔐 2. Configuração Backend Seguro

### 2.1 Com Supabase (RECOMENDADO)

#### A. Inicializar Projeto
```bash
npm install @supabase/supabase-js
```

#### B. Configuração Base (supabaseClient.ts)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### C. Habilitando Row Level Security (RLS) - CRÍTICO PARA SEGURANÇA

**Passo 1**: No console do Supabase, crie tabelas de usuário com RLS habilitado:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Usuários só veem seus próprios dados
CREATE POLICY "Usuários visualizam seu próprio perfil"
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Usuários atualizam seu próprio perfil"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Permitir inserção durante registro
CREATE POLICY "Usuários podem criar seu próprio perfil"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);
```

**Passo 2**: Configurar autenticação com e-mail/senha:
- Ir em Authentication > Providers > Email
- Habilitar "Email/Password"
- Desabilitar "Autoconfirm" para produção
- Configurar email de confirmação

#### D. Configurações de Segurança Supabase
- Multi-factor Authentication: Ativar
- Session expiry: 1 hora
- Refresh token expiry: 7 dias
- Rate limiting: 100 requisições/minuto

---

### 2.2 Com Firebase

#### A. Instalação
```bash
npm install firebase
```

#### B. Configuração (firebaseConfig.ts)
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configurar persistência segura
setPersistence(auth, browserLocalPersistence);
```

#### C. Regras de Segurança Firebase (firestore.rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas usuários autenticados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if false; // Ninguém pode listar todos os usuários
    }

    // Dados sensíveis criptografados
    match /sessions/{sessionId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🎯 3. Autenticação Frontend Robusta

### 3.1 Contexto de Autenticação (AuthContext.tsx)

```typescript
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabaseClient';

interface User {
  id: string;
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar sessão ao montar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Buscar dados do usuário do banco
          const { data, error } = await supabase
            .from('users')
            .select('id, email, username')
            .eq('id', session.user.id)
            .single();

          if (!error && data) {
            setUser(data);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Ouvir mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from('users')
            .select('id, email, username')
            .eq('id', session.user.id)
            .single();
          
          setUser(data || null);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw new Error(error.message);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      // Registrar no Auth
      const { data: { user: authUser }, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (authError) throw authError;
      if (!authUser) throw new Error('Falha no registro');

      // Criar perfil do usuário (RLS protege isso automaticamente)
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authUser.id,
            email,
            username
          }
        ]);

      if (profileError) throw profileError;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
```

### 3.2 Componente de Login com Validação

```typescript
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';

// Schema Zod para validação
const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter letra maiúscula')
    .regex(/[0-9]/, 'Deve conter número')
    .regex(/[!@#$%^&*]/, 'Deve conter caractere especial')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    try {
      await login(data.email, data.password);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          disabled={isSubmitting}
          className="w-full px-4 py-2 border rounded"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      {apiError && <div className="text-red-500">{apiError}</div>}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};
```

---

## 🛡️ 4. Proteção Avançada

### 4.1 Interceptador HTTP com Rate Limiting

```typescript
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { supabase } from './supabaseClient';

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutos

  canAttempt(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    this.attempts.set(key, [...recentAttempts, now]);
    return true;
  }
}

const rateLimiter = new RateLimiter();

export const createAuthenticatedClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001'
  });

  // Interceptador de requisição
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Verificar rate limit
      const userEmail = (await supabase.auth.getUser()).data.user?.email || 'unknown';
      if (!rateLimiter.canAttempt(userEmail)) {
        throw new Error('Muitas tentativas. Tente novamente mais tarde.');
      }

      // Adicionar token JWT
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }

      // Headers de segurança
      config.headers['X-Requested-With'] = 'XMLHttpRequest';

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptador de resposta para renovação de token
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
          
          if (refreshError || !session) {
            await supabase.auth.signOut();
            throw new Error('Sessão expirada');
          }

          originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
          return client(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};
```

### 4.2 Proteção Contra XSS e CSRF

```typescript
// sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [] 
  });
};

// Usar em componentes:
const sanitizedUsername = sanitizeInput(userInput);
```

### 4.3 Componente ProtegidoRoute

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};
```

---

## ✅ 5. Checklist de Segurança

- [ ] Variáveis de ambiente nunca em código
- [ ] HTTPS obrigatório em produção
- [ ] Validação em frontend E backend
- [ ] Senhas com mínimo 8 chars, maiúscula, número, especial
- [ ] Rate limiting em login
- [ ] RLS habilitado no Supabase
- [ ] Firebase Rules bem configuradas
- [ ] CSRF token em formulários sensíveis
- [ ] Refresh tokens com expiração
- [ ] Session timeout após inatividade
- [ ] Logs de auditoria de acesso
- [ ] Backup automático do banco de dados
- [ ] Monitoramento de tentativas de acesso não autorizado

---

## 🚀 Deployment Seguro

### Variáveis de Ambiente (.env.local - NUNCA comitar)
```
REACT_APP_SUPABASE_URL=sua_url_aqui
REACT_APP_SUPABASE_ANON_KEY=sua_chave_publica_aqui
REACT_APP_API_URL=https://sua-api.com
```

### Headers de Segurança (Nginx/Apache)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

---

## 📚 Referências

- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Zod Validation](https://zod.dev/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
