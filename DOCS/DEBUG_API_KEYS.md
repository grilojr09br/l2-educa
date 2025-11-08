# 🔍 Debug: API Keys 401 Error

## 🎯 Problema Identificado e Corrigido

**Causa raiz:** O parser de API keys estava usando regex `/[\n,;\\s]+/` que incluía **espaços** como separador, podendo quebrar as chaves incorretamente.

**Solução:** Agora usa apenas **vírgula** como separador.

---

## ✅ Fix Aplicado

**Arquivo:** `l2-educa/src/contexts/ChatbotContext.jsx`

```javascript
// ANTES (problema)
.split(/[\n,;\\s]+/)  // ← Quebrava em espaços também!

// AGORA (corrigido)
.split(',')  // ← Apenas vírgula
```

---

## 🧪 Como Testar o Fix

### Passo 1: Verificar o formato no .env.production

Seu arquivo `.env.production` deve estar **EXATAMENTE** assim:

```env
VITE_OPENROUTER_API_KEYS=sk-or-v1-abc123xyz,sk-or-v1-def456uvw,sk-or-v1-ghi789rst
```

**ATENÇÃO:**
- ✅ **SEM ESPAÇOS** entre as chaves
- ✅ **SEM ASPAS** ao redor
- ✅ **SEM QUEBRAS DE LINHA**
- ✅ Tudo em **UMA LINHA SÓ**

### ❌ Formatos ERRADOS:

```env
# ERRADO - tem espaço depois da vírgula
VITE_OPENROUTER_API_KEYS=sk-or-v1-abc, sk-or-v1-def

# ERRADO - tem aspas
VITE_OPENROUTER_API_KEYS="sk-or-v1-abc,sk-or-v1-def"

# ERRADO - quebra de linha
VITE_OPENROUTER_API_KEYS=sk-or-v1-abc,
sk-or-v1-def

# ERRADO - tem ponto-e-vírgula
VITE_OPENROUTER_API_KEYS=sk-or-v1-abc;sk-or-v1-def
```

### ✅ Formato CORRETO:

```env
VITE_OPENROUTER_API_KEYS=sk-or-v1-abc,sk-or-v1-def,sk-or-v1-ghi
```

---

## 🔨 Passo a Passo para Corrigir

### 1. Editar .env.production

```bash
cd l2-educa
notepad .env.production
```

**Cole EXATAMENTE assim (substitua com suas chaves):**

```env
VITE_BACKEND_URL=https://l2-educa-production.up.railway.app
VITE_SUPABASE_URL=https://usyqgsgdsppthjmvyjxf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeXFnc2dkc3BwdGhqbXZ5anhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODgzOTgsImV4cCI6MjA3Nzk2NDM5OH0.A9QBFHK3EJFuXXUtQSSoDTiIp2opr0xtoLVA__JEpfc
VITE_OPENROUTER_API_KEYS=sk-or-v1-SUA_CHAVE_1,sk-or-v1-SUA_CHAVE_2
VITE_OPENROUTER_MODEL=minimax/minimax-m2:free
VITE_SITE_URL=https://silviosuperandolimites.com.br/l2
VITE_ENV=production
```

**IMPORTANTE:**
- Cole suas chaves REAIS
- Uma linha só, sem espaços
- Sem aspas

### 2. Testar Localmente Primeiro

```bash
# Build de produção
npm run build

# Testar o build
npm run preview
```

Abra: http://localhost:4173/l2/

### 3. Verificar Console (F12)

O console deve mostrar:

```
🔑 API Keys loaded: 2 keys
🔑 Keys preview: ['sk-or-v1-abc123xyz...', 'sk-or-v1-def456uvw...']
```

**Se mostrar `0 keys`:**
- ❌ O arquivo .env.production não está sendo lido
- ❌ O formato está errado
- ❌ Você não fez rebuild depois de editar

### 4. Testar Chatbot

1. Abra o chatbot
2. Envie uma mensagem
3. Console NÃO deve mostrar `401`

---

## 🔍 Comandos de Debug

### Verificar se .env.production existe

```bash
cd l2-educa
dir .env.production     # Windows
ls -la .env.production  # Linux/Mac
```

### Ver conteúdo do .env.production

```bash
type .env.production    # Windows
cat .env.production     # Linux/Mac
```

### Rebuild limpo

```bash
# Limpar tudo
rm -rf dist node_modules/.vite

# Rebuild
npm run build
```

---

## 🎯 Checklist de Verificação

Antes de fazer upload, confirme:

- [ ] Arquivo `.env.production` criado na pasta `l2-educa/`
- [ ] Chaves no formato: `chave1,chave2,chave3` (sem espaços)
- [ ] Sem aspas ao redor das chaves
- [ ] Rodou `npm run build` DEPOIS de editar o .env
- [ ] Testou com `npm run preview` localmente
- [ ] Console mostra `🔑 API Keys loaded: X keys`
- [ ] Console NÃO mostra `401 Unauthorized`

---

## 🚨 Se AINDA Tiver Erro 401

### Teste 1: Verificar se as chaves funcionam

Use curl para testar suas chaves manualmente:

```bash
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer SUA_CHAVE_AQUI"
```

**Resposta esperada (chave válida):**
```json
{
  "data": {
    "label": "Nome da Chave",
    "usage": 0.00,
    ...
  }
}
```

**Resposta de erro (chave inválida):**
```json
{
  "error": {
    "message": "Invalid API key"
  }
}
```

### Teste 2: Verificar se o build embedou as chaves

Depois de fazer `npm run build`, procure nos arquivos da pasta `dist/`:

```bash
# Windows PowerShell
cd l2-educa/dist/assets
Select-String -Pattern "sk-or-v1" -Path *.js

# Linux/Mac
cd l2-educa/dist/assets
grep -r "sk-or-v1" *.js
```

**Se NÃO encontrar nada:**
- ❌ As chaves não foram embedadas no build
- ❌ O .env.production não foi lido
- ❌ Rebuild necessário

### Teste 3: Comparar com projeto que funciona

Se suas chaves funcionam em outro projeto:

1. Copie o `.env.production` do projeto que funciona
2. Adapte as outras variáveis (Supabase, etc)
3. Faça rebuild
4. Teste novamente

---

## 📞 Informações para Debug

Se ainda não funcionar, forneça estas informações:

1. **Conteúdo do .env.production** (apenas os primeiros 20 chars das chaves)
2. **Output do console** (especialmente a linha `🔑 API Keys loaded`)
3. **Erro exato** no console (screenshot ou copiar)
4. **Versão do Node.js**: `node --version`
5. **Versão do npm**: `npm --version`

---

## ✨ Exemplo Completo Funcionando

**Arquivo:** `l2-educa/.env.production`

```env
VITE_BACKEND_URL=https://l2-educa-production.up.railway.app
VITE_SUPABASE_URL=https://usyqgsgdsppthjmvyjxf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeXFnc2dkc3BwdGhqbXZ5anhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODgzOTgsImV4cCI6MjA3Nzk2NDM5OH0.A9QBFHK3EJFuXXUtQSSoDTiIp2opr0xtoLVA__JEpfc
VITE_OPENROUTER_API_KEYS=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,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
VITE_OPENROUTER_MODEL=minimax/minimax-m2:free
VITE_SITE_URL=https://silviosuperandolimites.com.br/l2
VITE_ENV=production
```

**Comandos:**
```bash
cd l2-educa
npm run build
npm run preview  # Testar
```

**Console deve mostrar:**
```
🔑 API Keys loaded: 2 keys
🔑 Keys preview: ['sk-or-v1-5ef28d5dda...', 'sk-or-v1-3be5fd796...']
```

**Chatbot deve funcionar** sem erro 401!

---

**Boa sorte!** 🚀 O problema do regex foi corrigido, agora deve funcionar!

