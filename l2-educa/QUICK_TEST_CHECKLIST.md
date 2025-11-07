# ✅ Checklist Rápido de Teste - Sistema de Autenticação

Use este checklist para validar rapidamente todas as funcionalidades implementadas.

## 🚀 Antes de Começar

```bash
# 1. Instalar dependências (se necessário)
npm install

# 2. Iniciar aplicação
npm run dev

# 3. Abrir no navegador
# http://localhost:5173
```

---

## 📋 Testes Obrigatórios

### ✅ 1. Registro de Novo Usuário (3 min)

- [ ] Acessar `/register`
- [ ] Botão "Cadastrar com Google" aparece
- [ ] Separador "ou continue com email" aparece
- [ ] Preencher formulário com senha forte
- [ ] Password strength meter mostra "Forte" ou "Muito forte"
- [ ] Checklist de requisitos de senha todos verdes (✓)
- [ ] Clicar em "Criar conta"
- [ ] Notificação verde de sucesso aparece
- [ ] Mensagem "Verifique seu email" aparece
- [ ] Redirecionado para `/verify-email`

**Status**: ⬜ Passou | ⬜ Falhou

---

### ✅ 2. Verificação de Email (2 min)

Na página `/verify-email`:

- [ ] Ícone de email animando (pulse)
- [ ] Email do usuário aparece destacado em verde
- [ ] Botão "Reenviar email de verificação" aparece
- [ ] Clicar em "Reenviar email"
- [ ] Notificação de sucesso aparece
- [ ] Countdown de 60s inicia
- [ ] Botão desabilitado durante countdown
- [ ] Email recebido na caixa de entrada (ou spam)
- [ ] Link no email funciona

**Status**: ⬜ Passou | ⬜ Falhou

---

### ✅ 3. Login e Proteção de Rotas (3 min)

#### 3.1 Antes da verificação de email

- [ ] Acessar `/login`
- [ ] Tentar fazer login com conta não verificada
- [ ] Mensagem de erro aparece
- [ ] Redirecionado para `/verify-email`

#### 3.2 Após verificação de email

- [ ] Verificar email pelo link recebido
- [ ] Voltar para `/login`
- [ ] Fazer login com email e senha
- [ ] Notificação verde "Login realizado com sucesso"
- [ ] Redirecionado para `/` (Terminal)
- [ ] Conteúdo da página carrega

#### 3.3 Teste de proteção

- [ ] Fazer logout
- [ ] Tentar acessar `/math` diretamente
- [ ] Redirecionado automaticamente para `/login`
- [ ] Fazer login novamente
- [ ] Redirecionado de volta para `/math`

**Status**: ⬜ Passou | ⬜ Falhou

---

### ✅ 4. Rate Limiting (2 min)

- [ ] Ir para `/login`
- [ ] Digitar email qualquer
- [ ] Digitar senha errada
- [ ] Tentar login (1ª tentativa)
- [ ] Repetir 4 vezes mais (total 5 tentativas)
- [ ] Após 3 tentativas: alerta amarelo aparece
- [ ] Após 5 tentativas: alerta vermelho de bloqueio
- [ ] Mensagem mostra "Aguarde X minutos"
- [ ] Formulário fica desabilitado
- [ ] Botão "Entrar" desabilitado

**Status**: ⬜ Passou | ⬜ Falhou

---

### ✅ 5. Logout Robusto (2 min)

- [ ] Fazer login normalmente
- [ ] Abrir sidebar (botão hambúrguer)
- [ ] Username aparece no botão de perfil
- [ ] Se email não verificado: badge ⚠ aparece
- [ ] Clicar em "Sair"
- [ ] Notificação "Você saiu com sucesso" aparece
- [ ] Redirecionado para `/login`
- [ ] Sidebar mostra botões "Entrar" e "Cadastre-se"
- [ ] Tentar acessar `/math` → Redireciona para `/login`
- [ ] Abrir nova aba → Também está deslogado (sync)

**Status**: ⬜ Passou | ⬜ Falhou

---

### ✅ 6. Banner de Verificação (1 min)

- [ ] Fazer login com conta não verificada
- [ ] Banner amarelo aparece no topo
- [ ] Mensagem "Verifique seu email" clara
- [ ] Botão "Reenviar email" no banner
- [ ] Clicar no botão
- [ ] Notificação de sucesso
- [ ] Countdown aparece no botão

**Status**: ⬜ Passou | ⬜ Falhou

---

### ✅ 7. Notificações Toast (2 min)

Testar cada tipo:

- [ ] Success: Fazer logout (verde)
- [ ] Error: Login com senha errada (vermelho)
- [ ] Warning: Banner de email (amarelo)
- [ ] Info: Qualquer ação informativa (azul)

Para cada notificação:
- [ ] Aparece no canto superior direito
- [ ] Animação suave de entrada
- [ ] Ícone apropriado (✓ ✕ ⚠ ℹ)
- [ ] Botão ✕ para fechar funciona
- [ ] Auto-dismiss após ~5 segundos
- [ ] Múltiplas notificações empilham corretamente

**Status**: ⬜ Passou | ⬜ Falhou

---

### ✅ 8. Google OAuth (3 min)

⚠️ **Requer configuração prévia no Supabase e Google Console**

- [ ] Ir para `/login`
- [ ] Botão "Entrar com Google" aparece
- [ ] Logo do Google colorido aparece
- [ ] Clicar no botão
- [ ] Popup do Google abre
- [ ] Selecionar conta Google
- [ ] Redirecionado de volta à aplicação
- [ ] Login automático bem-sucedido
- [ ] Perfil criado automaticamente
- [ ] Username extraído do email

**Status**: ⬜ Passou | ⬜ Falhou | ⬜ Não configurado

---

## 🔍 Testes Opcionais (Avançados)

### ⚙️ 9. Session Timeout (20-30 min)

⚠️ **Teste demorado - opcional**

- [ ] Fazer login
- [ ] Deixar aplicação aberta por 24h sem interação
- [ ] Tentar navegar após 24h
- [ ] Logout automático ocorre
- [ ] Redirecionado para `/login`

**Status**: ⬜ Passou | ⬜ Falhou | ⬜ Não testado

---

### 🔐 10. Validação de Segurança (5 min)

#### 10.1 SQL Injection (básico)

- [ ] Tentar login com: `' OR '1'='1`
- [ ] Deve falhar normalmente (sem erro de SQL)

#### 10.2 XSS (básico)

- [ ] Registrar com username: `<script>alert('XSS')</script>`
- [ ] Username deve ser sanitizado (sem executar script)

#### 10.3 RLS (Row Level Security)

Execute no SQL Editor do Supabase:

```sql
-- Como usuário A, tentar acessar dados do usuário B
-- Deve retornar vazio
SELECT * FROM users WHERE id != auth.uid();
```

**Status**: ⬜ Passou | ⬜ Falhou | ⬜ Não testado

---

## 📱 Testes Mobile (5 min)

Abrir em dispositivo móvel ou DevTools (F12 → Toggle Device):

- [ ] Login responsivo
- [ ] Register responsivo
- [ ] Sidebar funciona em mobile
- [ ] Banner de verificação se adapta
- [ ] Notificações se ajustam à largura
- [ ] Password strength meter legível
- [ ] Botões de Google acessíveis
- [ ] Formulários fáceis de preencher

**Status**: ⬜ Passou | ⬜ Falhou

---

## 🎯 Resultado Final

### Resumo

- **Testes obrigatórios**: ___ / 8
- **Testes opcionais**: ___ / 3
- **Taxa de sucesso**: ___%

### Status Geral

- [ ] 🟢 Tudo funcionando perfeitamente (>95%)
- [ ] 🟡 Pequenos ajustes necessários (80-95%)
- [ ] 🔴 Problemas críticos encontrados (<80%)

---

## 🐛 Problemas Encontrados

Liste aqui qualquer problema:

1. 
2. 
3. 

---

## ✅ Aprovação

- [ ] Sistema pronto para produção
- [ ] Documentação Supabase seguida
- [ ] Google OAuth configurado (se aplicável)
- [ ] Todos os testes críticos passaram
- [ ] Mobile responsivo

---

**Data do Teste**: ___________  
**Testador**: ___________  
**Versão**: 1.0.0  
**Build**: Produção

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique [`SISTEMA_AUTENTICACAO_IMPLEMENTADO.md`](./SISTEMA_AUTENTICACAO_IMPLEMENTADO.md) - Seção Troubleshooting
2. Revise [`SUPABASE_AUTH_CONFIG.md`](./SUPABASE_AUTH_CONFIG.md) - Configurações
3. Verifique console do navegador (F12) para erros
4. Verifique logs do Supabase Dashboard

---

**Tempo total estimado**: 20-25 minutos (testes obrigatórios)

**Boa sorte com os testes! 🚀**


