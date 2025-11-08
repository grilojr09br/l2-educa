# Testes, Deploy e Checklist Final

## 🧪 1. Testes de Segurança

### 1.1 Testes Unitários com Jest

```bash
npm install --save-dev jest @types/jest ts-jest
```

**auth.test.ts**
```typescript
import { AuthService } from '../services/authService';

describe('AuthService', () => {
  describe('register', () => {
    it('deve lançar erro com senha muito curta', async () => {
      await expect(
        AuthService.register('user@example.com', '123', 'testuser')
      ).rejects.toThrow('Senha deve ter no mínimo 8 caracteres');
    });

    it('deve lançar erro com email vazio', async () => {
      await expect(
        AuthService.register('', 'ValidPass123!', 'testuser')
      ).rejects.toThrow('Email, senha e username são obrigatórios');
    });

    it('deve criar usuário com dados válidos', async () => {
      const user = await AuthService.register(
        'newuser@example.com',
        'ValidPass123!',
        'newuser'
      );
      
      expect(user.email).toBe('newuser@example.com');
      expect(user.username).toBe('newuser');
    });
  });

  describe('login', () => {
    it('deve retornar tokens com credenciais válidas', async () => {
      const response = await AuthService.login(
        'user@example.com',
        'ValidPass123!'
      );

      expect(response.accessToken).toBeDefined();
      expect(response.refreshToken).toBeDefined();
      expect(response.user).toBeDefined();
    });

    it('deve lançar erro com credenciais inválidas', async () => {
      await expect(
        AuthService.login('user@example.com', 'WrongPassword123!')
      ).rejects.toThrow('Email ou senha incorretos');
    });
  });

  describe('changePassword', () => {
    it('deve lançar erro com senha fraca', async () => {
      await expect(
        AuthService.changePassword('user-id', 'Current123!', '123')
      ).rejects.toThrow('Nova senha deve ter no mínimo 8 caracteres');
    });
  });
});
```

### 1.2 Testes de Integração

```typescript
import request from 'supertest';
import app from '../app';

describe('Auth Endpoints', () => {
  describe('POST /api/auth/login', () => {
    it('deve retornar 429 após 5 tentativas falhadas', async () => {
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({ email: 'user@example.com', password: 'wrong' });
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: 'wrong' });

      expect(response.status).toBe(429);
    });

    it('deve retornar accessToken e refreshToken', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: 'ValidPass123!' });

      expect(response.status).toBe(200);
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });

  describe('POST /api/auth/refresh-token', () => {
    it('deve renovar accessToken com refreshToken válido', async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: 'ValidPass123!' });

      const refreshResponse = await request(app)
        .post('/api/auth/refresh-token')
        .set('Cookie', loginResponse.headers['set-cookie']);

      expect(refreshResponse.status).toBe(200);
      expect(refreshResponse.body.data.accessToken).toBeDefined();
    });
  });

  describe('POST /api/auth/logout', () => {
    it('deve retornar 401 sem token', async () => {
      const response = await request(app)
        .post('/api/auth/logout');

      expect(response.status).toBe(401);
    });

    it('deve fazer logout com token válido', async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: 'ValidPass123!' });

      const token = loginResponse.body.data.accessToken;

      const logoutResponse = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(logoutResponse.status).toBe(200);
    });
  });
});
```

### 1.3 Testes de Segurança com OWASP

```typescript
describe('Segurança OWASP', () => {
  describe('Injection Prevention', () => {
    it('deve rejeitar SQL injection', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: "admin'; DROP TABLE users; --",
          password: 'password'
        });

      expect(response.status).toBe(400);
    });

    it('deve rejeitar XSS em inputs', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@example.com',
          password: 'ValidPass123!',
          username: '<script>alert("xss")</script>'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('Broken Authentication', () => {
    it('não deve expor informações sensíveis', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password' });

      expect(response.body).not.toContain('password');
      expect(response.body).not.toContain('hash');
    });

    it('deve ter expiração de sessão', async () => {
      // Token com expiração no passado
      const expiredToken = jwt.sign(
        { userId: 'test', email: 'test@example.com' },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' }
      );

      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
    });
  });

  describe('Sensitive Data Exposure', () => {
    it('deve usar HTTPS headers em produção', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.headers['strict-transport-security']).toBeDefined();
      expect(response.headers['x-content-type-options']).toBe('nosniff');
    });
  });
});
```

---

## 🚀 2. Deployment Seguro

### 2.1 Docker Seguro

**Dockerfile**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

USER nodejs
EXPOSE 3001

CMD ["node", "dist/server.js"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
    restart: unless-stopped
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 2.2 Nginx Reverso com HTTPS

**nginx.conf**
```nginx
events {
    worker_connections 1024;
}

http {
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/m;

    # Headers de segurança
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Redirect HTTP para HTTPS
    server {
        listen 80;
        server_name _;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name seu-dominio.com;

        ssl_certificate /etc/nginx/certs/cert.pem;
        ssl_certificate_key /etc/nginx/certs/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Desabilitar versões antigas de TLS
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        location /api/auth/login {
            limit_req zone=login_limit burst=2 nodelay;
            proxy_pass http://backend:3001;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /api/ {
            limit_req zone=api_limit burst=20 nodelay;
            proxy_pass http://backend:3001;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            proxy_pass http://backend:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

---

## ✅ 3. Checklist de Produção

### 🔐 Segurança de Autenticação
- [ ] Senhas com mínimo 8 caracteres
- [ ] Senhas com maiúscula, número e caractere especial
- [ ] Hash bcrypt com salt ≥ 10
- [ ] Access tokens com expiração ≤ 1 hora
- [ ] Refresh tokens com expiração ≤ 7 dias
- [ ] HttpOnly cookies para refresh tokens
- [ ] Secure flag em cookies (HTTPS only)
- [ ] SameSite=Strict em cookies
- [ ] Revogar tokens ao logout

### 🛡️ Proteção contra Ataques
- [ ] Rate limiting em endpoints sensíveis (5 req/min para login)
- [ ] CSRF tokens em formulários
- [ ] XSS prevention com sanitização
- [ ] SQL injection prevention com parametrização
- [ ] CORS configurado com domain específico
- [ ] Headers de segurança (Helmet)
- [ ] Content-Security-Policy ativo
- [ ] Validação de input com Zod
- [ ] Validação no backend e frontend

### 📊 Banco de Dados
- [ ] Row Level Security (RLS) habilitado
- [ ] Políticas RLS bem definidas
- [ ] Backup automático diário
- [ ] Point-in-time recovery configurado
- [ ] Auditoria de mudanças de dados
- [ ] Criptografia em trânsito (TLS)
- [ ] Criptografia em repouso (AES-256)

### 🔑 Gerenciamento de Chaves
- [ ] Variáveis de ambiente nunca em .git
- [ ] .env.local no .gitignore
- [ ] Chaves rotacionadas a cada 90 dias
- [ ] Chaves públicas separadas de privadas
- [ ] JWT_SECRET com ≥ 64 caracteres aleatórios
- [ ] Keys diferentes por ambiente (dev/staging/prod)

### 📋 Configuração do Servidor
- [ ] HTTPS/TLS obrigatório
- [ ] Certificado SSL válido
- [ ] TLS 1.2+ apenas
- [ ] HSTS habilitado (min-age: 31536000)
- [ ] Headers de segurança configurados
- [ ] Rate limiting no Nginx/LB
- [ ] DDoS protection ativo
- [ ] Firewall configurado

### 🔍 Monitoramento & Logs
- [ ] Logs de todas tentativas de login
- [ ] Logs de alterações sensíveis
- [ ] Alertas de múltiplas falhas de login
- [ ] Alertas de atividade anormal
- [ ] Rotação de logs (máx. 30 dias)
- [ ] Sem dados sensíveis em logs (senhas, tokens)
- [ ] Centralização de logs (ELK Stack, etc)

### 🧪 Testes
- [ ] Testes unitários com cobertura ≥ 80%
- [ ] Testes de integração para auth
- [ ] Teste de força bruta (fail after 5 attempts)
- [ ] Teste de token expiration
- [ ] Teste de XSS/injection
- [ ] Penetration testing anual

### 📦 Deployment
- [ ] Docker image slim (multi-stage build)
- [ ] Sem secrets hardcoded em imagem
- [ ] Health checks configurados
- [ ] CI/CD pipeline automatizado
- [ ] Staging environment espelhando produção
- [ ] Rollback procedure documentado
- [ ] Versão aplicação em resposta /health

### 📱 Frontend
- [ ] Verificar tokens antes de usar
- [ ] Limpar localStorage/sessionStorage ao logout
- [ ] Redirect para login se token expirado
- [ ] Validação de email e senha visível
- [ ] Sem mostrar senhas em error messages
- [ ] CSRF token em requisições POST/PUT/DELETE
- [ ] CSP headers respeitados

---

## 🚨 Resposta a Incidentes

### Se Suspeitar de Breach:

1. **Imediatamente**:
   - Revogar todos os tokens JWT
   - Forçar re-login de todos os usuários
   - Desabilitar conta comprometida

2. **Primeiras Horas**:
   - Verificar logs de acesso
   - Identificar período do acesso
   - Coletar evidências

3. **Próximas 24 horas**:
   - Notificar usuários afetados
   - Oferecer ferramenta de troca de senha
   - Fazer audit completo de segurança

4. **Semanas Seguintes**:
   - Investigação forense completa
   - Implementar melhorias identificadas
   - Comunicação transparente com usuários

---

## 📚 Recursos Adicionais

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Supabase Security](https://supabase.com/security)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [PostgreSQL Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

---

## 💡 Conclusão

Um sistema de login seguro não é construído em um dia. É um processo contínuo de:
- ✅ Implementação correta
- ✅ Testes rigorosos
- ✅ Monitoramento ativo
- ✅ Atualização constante

**Lembre-se**: Segurança é tão forte quanto seu elo mais fraco. 🔒
