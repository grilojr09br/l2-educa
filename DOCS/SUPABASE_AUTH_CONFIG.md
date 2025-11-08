# Configuração de Autenticação Supabase - Guia Completo

Este guia detalha como configurar o Supabase para o sistema de autenticação ultra robusto do L2 EDUCA.

## 📋 Índice

1. [Configurações de Email](#1-configurações-de-email)
2. [Google OAuth](#2-google-oauth)
3. [Row Level Security (RLS)](#3-row-level-security-rls)
4. [Templates de Email](#4-templates-de-email)
5. [Rate Limiting](#5-rate-limiting)
6. [Verificação](#6-verificação)

---

## 1. Configurações de Email

### Desabilitar Confirmação Automática

Para forçar verificação de email antes do acesso:

1. Acesse o Dashboard do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá para **Authentication** → **Settings**
4. Role até **Auth Providers** → **Email**
5. **DESMARQUE** a opção: ✗ Enable email confirmations
6. **MARQUE** a opção: ✓ Confirm email
7. Clique em **Save**

### Configurar URLs de Redirect

Ainda em **Authentication** → **Settings**:

1. Role até **URL Configuration**

2. **Site URL:** Configure para produção:
   ```
   https://silviosuperandolimites.com.br/l2
   ```
   ⚠️ **CRÍTICO:** Inclua o caminho `/l2` pois o site está nesse subdiretório!

3. Em **Redirect URLs**, adicione:
   ```
   # Produção (OBRIGATÓRIO!)
   https://silviosuperandolimites.com.br/l2#/verify-email
   https://silviosuperandolimites.com.br/l2#/reset-password
   https://silviosuperandolimites.com.br/l2/
   
   # Desenvolvimento (opcional - manter para testes)
   http://localhost:5173/#/verify-email
   http://localhost:5173/#/reset-password
   http://localhost:5173/
   ```
   ⚠️ **Cada URL de produção DEVE incluir `/l2` antes do hash (#) ou barra final!**

4. Clique em **Save**

⚠️ **IMPORTANTE:** 
- O Site URL define para onde os emails de confirmação redirecionam
- Se estiver como `localhost`, emails em produção não funcionarão corretamente
- SEMPRE use `https://silviosuperandolimites.com.br/l2` em produção
- **NÃO esqueça o `/l2`** - sem ele, os links não funcionarão!

---

## 2. Google OAuth

### 2.1 Configurar Google Cloud Console

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto (ou selecione um existente)
3. Ative a **Google+ API**:
   - No menu lateral, vá em **APIs & Services** → **Library**
   - Procure por "Google+ API"
   - Clique em **Enable**

### 2.2 Configurar OAuth Consent Screen

1. No menu lateral, **APIs & Services** → **OAuth consent screen**
2. Escolha **External** (para testes) ou **Internal** (para uso empresarial)
3. Preencha os campos obrigatórios:
   - **App name**: L2 EDUCA
   - **User support email**: seu-email@exemplo.com
   - **Developer contact**: seu-email@exemplo.com
4. Em **Scopes**, adicione:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
5. Adicione usuários de teste (se estiver em modo External/Testing)
6. Salve e continue

### 2.3 Criar Credenciais OAuth

1. **APIs & Services** → **Credentials**
2. Clique em **Create Credentials** → **OAuth client ID**
3. Tipo de aplicativo: **Web application**
4. Nome: **L2 EDUCA Web Client**
5. **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   https://seu-dominio.com
   ```
6. **Authorized redirect URIs**:
   ```
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   ```
   ⚠️ **Importante**: Substitua `[YOUR-PROJECT-REF]` pelo ID do seu projeto Supabase
   
7. Clique em **Create**
8. **Copie** o **Client ID** e **Client Secret** gerados

### 2.4 Configurar no Supabase

1. Volte ao Dashboard do Supabase
2. **Authentication** → **Providers**
3. Procure por **Google** e clique para expandir
4. **Habilite** o provider
5. Cole:
   - **Client ID** (do Google Console)
   - **Client Secret** (do Google Console)
6. Em **Redirect URL**, copie a URL fornecida pelo Supabase
7. Clique em **Save**

---

## 3. Row Level Security (RLS)

Proteja suas tabelas com políticas RLS:

### Para tabela `users`

```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ler apenas seus próprios dados
CREATE POLICY "Users can read own data" 
ON users FOR SELECT 
USING (auth.uid() = id);

-- Política: Usuários podem atualizar apenas seus próprios dados
CREATE POLICY "Users can update own data" 
ON users FOR UPDATE 
USING (auth.uid() = id);
```

### Para tabela `user_profiles`

```sql
-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ler apenas seu próprio perfil
CREATE POLICY "Users can read own profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = user_id);

-- Política: Usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" 
ON user_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Política: Sistema pode inserir perfis (para novos registros)
CREATE POLICY "System can insert profiles" 
ON user_profiles FOR INSERT 
WITH CHECK (true);
```

### Verificar RLS

Execute no SQL Editor:

```sql
-- Verificar se RLS está ativo
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Ver todas as políticas
SELECT * FROM pg_policies;
```

---

## 4. Templates de Email

### Customizar Email de Verificação

1. **Authentication** → **Email Templates**
2. Selecione **Confirm signup**
3. Edite o template (exemplo em português):

```html
<h2>Confirme seu email</h2>
<p>Olá!</p>
<p>Obrigado por se cadastrar na L2 EDUCA. Por favor, confirme seu endereço de email clicando no link abaixo:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar meu email</a></p>
<p>Ou copie e cole esta URL no seu navegador:</p>
<p>{{ .ConfirmationURL }}</p>
<p>Se você não criou esta conta, pode ignorar este email com segurança.</p>
<p>Equipe L2 EDUCA</p>
```

### Customizar Email de Reset de Senha

1. Selecione **Reset Password**
2. Edite o template:

```html
<h2>Redefinir sua senha</h2>
<p>Olá!</p>
<p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para criar uma nova senha:</p>
<p><a href="{{ .ConfirmationURL }}">Redefinir minha senha</a></p>
<p>Ou copie e cole esta URL no seu navegador:</p>
<p>{{ .ConfirmationURL }}</p>
<p>Se você não solicitou esta redefinição, ignore este email. Sua senha não será alterada.</p>
<p>Este link expira em 24 horas.</p>
<p>Equipe L2 EDUCA</p>
```

### Configurar SMTP Customizado (Opcional)

Para usar seu próprio servidor de email:

1. **Project Settings** → **Auth** → **SMTP Settings**
2. Habilite **Enable Custom SMTP**
3. Configure:
   - **Host**: smtp.seuservidor.com
   - **Port**: 587
   - **Username**: seu-email@dominio.com
   - **Password**: sua-senha-smtp
   - **Sender email**: noreply@seu-dominio.com
   - **Sender name**: L2 EDUCA
4. Clique em **Save**

---

## 5. Rate Limiting

O rate limiting está implementado no **frontend** (via `securityUtils.js`), mas você pode adicionar proteção adicional no Supabase:

### Via Supabase Edge Functions (Opcional)

Crie uma Edge Function para rate limiting avançado:

```typescript
// supabase/functions/rate-limit/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const rateLimit = new Map();

serve(async (req) => {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutos
  const maxAttempts = 5;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return new Response(JSON.stringify({ allowed: true }), { status: 200 });
  }

  const record = rateLimit.get(ip);
  
  if (now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return new Response(JSON.stringify({ allowed: true }), { status: 200 });
  }

  if (record.count >= maxAttempts) {
    return new Response(JSON.stringify({ 
      allowed: false, 
      resetTime: record.resetTime 
    }), { status: 429 });
  }

  record.count++;
  return new Response(JSON.stringify({ allowed: true }), { status: 200 });
})
```

---

## 6. Verificação

### Checklist Final

Execute estes testes para garantir que tudo está funcionando:

- [ ] **Registro**:
  - [ ] Criar nova conta envia email de verificação
  - [ ] Usuário não consegue acessar conteúdo sem verificar
  - [ ] Link de verificação funciona e redireciona corretamente

- [ ] **Login**:
  - [ ] Login com email/senha funciona após verificação
  - [ ] Login antes da verificação mostra mensagem apropriada
  - [ ] Login com Google funciona e cria perfil automaticamente
  - [ ] Rate limiting bloqueia após 5 tentativas falhas

- [ ] **Logout**:
  - [ ] Logout limpa sessão completamente
  - [ ] Após logout, usuário é redirecionado para /login
  - [ ] Tentar acessar rotas protegidas após logout redireciona para login

- [ ] **Segurança**:
  - [ ] RLS impede usuários de acessar dados de outros
  - [ ] Tokens JWT expiram corretamente
  - [ ] Sessão expira após 24h de inatividade

- [ ] **Email**:
  - [ ] Emails são recebidos (check spam!)
  - [ ] Templates estão em português
  - [ ] Links de verificação funcionam

- [ ] **Google OAuth**:
  - [ ] Botão "Entrar com Google" aparece
  - [ ] Redirect OAuth funciona
  - [ ] Perfil é criado automaticamente
  - [ ] Username é extraído do email do Google

### Comandos SQL Úteis

```sql
-- Ver todos os usuários registrados
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- Ver usuários não verificados
SELECT 
  email,
  created_at
FROM auth.users
WHERE email_confirmed_at IS NULL;

-- Ver tentativas de login (via audit log)
SELECT *
FROM auth.audit_log_entries
WHERE action = 'user_signedin'
ORDER BY created_at DESC
LIMIT 100;

-- Ver tentativas falhas
SELECT *
FROM auth.audit_log_entries
WHERE action LIKE '%error%'
ORDER BY created_at DESC
LIMIT 100;
```

---

## 🚨 Problemas Comuns

### Email não chega

1. Verifique a pasta de spam
2. Confirme que o email está configurado corretamente no Supabase
3. Se usando SMTP customizado, teste as credenciais
4. Verifique os logs em **Authentication** → **Logs**

### Google OAuth não funciona

1. Verifique se as URLs de redirect estão corretas em ambos os lugares
2. Confirme que o projeto está aprovado no Google Console
3. Verifique se os scopes necessários foram adicionados
4. Teste com uma conta de email de teste adicionada ao OAuth Consent Screen

### Usuário não consegue acessar após verificação

1. Faça logout completo (limpe cache do navegador se necessário)
2. Faça login novamente
3. Verifique no SQL se `email_confirmed_at` não é NULL

### Rate limiting não funciona

1. O rate limiting frontend usa localStorage
2. Limpe o localStorage para resetar: `localStorage.clear()`
3. Verifique se o email está sendo usado como identificador

---

## 📚 Recursos Adicionais

- [Documentação oficial Supabase Auth](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## 7. Novo: Seamless Login & Login por Username

### Sistema de Login Inteligente

A partir da nova versão, o L2 EDUCA possui um fluxo de login seamless (sem costura):

**Como funciona:**
1. Usuário entra com email ou username
2. Sistema detecta automaticamente se usuário existe
3. Se existe → mostra campo de senha (login)
4. Se não existe → mostra formulário completo (registro)

**Configuração no Supabase:**
- Nenhuma configuração adicional necessária
- O Supabase continua usando email para autenticação
- O backend faz a conversão username → email internamente

### Login por Username

Agora os usuários podem fazer login usando:
- ✅ Email: `usuario@exemplo.com`
- ✅ Username: `usuario123`

**Funcionamento:**
1. Backend recebe identifier (email ou username)
2. Se contém "@" → trata como email
3. Se não contém "@" → busca email do username na tabela `users`
4. Autentica com Supabase usando o email

**Tabela users:**
```sql
-- Estrutura necessária
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

### Endpoints Novos

**POST /api/auth/check-user**
```json
{
  "identifier": "usuario@exemplo.com"
}
```

Resposta:
```json
{
  "success": true,
  "data": {
    "exists": true,
    "requiresRegistration": false,
    "identifierType": "email"
  }
}
```

**POST /api/auth/login** (atualizado)
```json
{
  "identifier": "usuario123",  // pode ser email OU username
  "password": "senha123"
}
```

### Proteção Contra User Enumeration

O endpoint `check-user` possui:
- Rate limiting muito restrito (menos tentativas que login)
- Respostas genéricas em caso de erro
- Audit logging de todas as verificações
- IP-based rate limiting

---

## 🎉 Conclusão

Com estas configurações, você tem um sistema de autenticação:

✅ Seguro com RLS e rate limiting  
✅ Verificação de email obrigatória  
✅ Login social com Google  
✅ **Login seamless (detecta automaticamente novo/existente)**  
✅ **Login por email OU username**  
✅ Logout robusto que limpa tudo  
✅ Emails customizados em português  
✅ **Redirecionamentos para domínio de produção**  
✅ Proteção contra tentativas excessivas  
✅ Proteção contra user enumeration  
✅ Timeout de sessão automático  
✅ **Campos preparados para chat (display_name, status, last_seen)**  

**Parabéns! Você implementou um sistema de autenticação de nível enterprise! 🚀**

