# 🔧 Supabase Warnings - Troubleshooting

> **Soluções para erros comuns ao aplicar as correções**

---

## ❌ Erro: "operator does not exist: character varying = uuid"

### 📋 Erro Completo:
```
ERROR: 42883: operator does not exist: character varying = uuid
HINT: No operator matches the given name and argument types. 
You might need to add explicit type casts.
```

### 🔍 Causa:
Suas colunas de ID (`id`, `user_id`) estão definidas como **`VARCHAR`** (character varying), mas `auth.uid()` retorna um **`UUID`**. O PostgreSQL não pode comparar esses tipos diretamente.

### ✅ Solução:

**Use a versão v2 do script:**

```bash
# Arquivo corrigido:
l2-educa-backend/scripts/fix-supabase-warnings-complete-v2.sql
```

**O que mudou:**
```sql
-- ❌ Versão original (não funciona com VARCHAR):
USING (id = (SELECT auth.uid()))

-- ✅ Versão v2 (funciona com VARCHAR e UUID):
USING (id::text = (SELECT auth.uid())::text)
```

### 📝 Como Aplicar:

1. **Abra Supabase Dashboard**
2. **SQL Editor**
3. **Cole o conteúdo de:** `fix-supabase-warnings-complete-v2.sql`
4. **Run**

---

## 🎯 Por Que Isso Acontece?

### Estrutura Comum de Tabelas:

#### Opção 1: IDs como VARCHAR (seu caso)
```sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,  -- ← VARCHAR
    email VARCHAR(255),
    ...
);
```

#### Opção 2: IDs como UUID (ideal)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,  -- ← UUID
    email VARCHAR(255),
    ...
);
```

### Por Que VARCHAR?
Provavelmente você migrou de outro sistema ou framework que usa strings para IDs. Isso é comum em:
- Firebase (usa strings)
- MongoDB (ObjectId como string)
- Aplicações que usam UUIDs como strings

---

## 💡 Solução de Longo Prazo

### Opção A: Manter VARCHAR (mais fácil)
✅ **Recomendado se:**
- Sistema já em produção
- Muitos dados existentes
- IDs são referenciados em muitos lugares

**Vantagens:**
- Não precisa migrar dados
- Compatível com sistemas externos
- Funciona com o script v2

**Desvantagens:**
- Comparações um pouco mais lentas
- Ocupa mais espaço (VARCHAR vs UUID)

### Opção B: Migrar para UUID (mais performático)
⚠️ **Recomendado para:**
- Sistemas novos
- Antes de ir para produção
- Se performance é crítica

**Vantagens:**
- Mais rápido (índices menores)
- Menos espaço (16 bytes vs ~36 bytes)
- Tipo nativo do PostgreSQL

**Desvantagens:**
- Requer migração de dados
- Pode quebrar código existente
- Mais trabalho inicial

---

## 🔄 Como Migrar para UUID (Opcional)

**⚠️ IMPORTANTE:** Faça backup antes! Isso altera a estrutura de dados.

### Passo 1: Backup
```bash
# No Dashboard Supabase:
Settings → Database → Backups → Create backup
```

### Passo 2: Script de Migração
```sql
-- ⚠️ TESTE EM DESENVOLVIMENTO PRIMEIRO!

BEGIN;

-- 1. Adicionar nova coluna UUID
ALTER TABLE users ADD COLUMN id_uuid UUID;

-- 2. Converter VARCHAR para UUID
UPDATE users SET id_uuid = id::uuid 
WHERE id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- 3. Verificar se todos converteram
SELECT COUNT(*) FROM users WHERE id_uuid IS NULL;
-- Resultado deve ser 0

-- 4. Adicionar constraint NOT NULL
ALTER TABLE users ALTER COLUMN id_uuid SET NOT NULL;

-- 5. Dropar constraint antiga
ALTER TABLE users DROP CONSTRAINT users_pkey;

-- 6. Dropar coluna antiga
ALTER TABLE users DROP COLUMN id;

-- 7. Renomear nova coluna
ALTER TABLE users RENAME COLUMN id_uuid TO id;

-- 8. Adicionar nova primary key
ALTER TABLE users ADD PRIMARY KEY (id);

-- 9. Fazer o mesmo para outras tabelas que referenciam users
-- (user_profiles, audit_logs, auth_methods, etc)

COMMIT;
```

### Passo 3: Atualizar Políticas RLS
```sql
-- Agora pode usar comparação direta:
CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (id = (SELECT auth.uid()));  -- Sem cast!
```

---

## 🐛 Outros Erros Comuns

### Erro: "relation does not exist"

**Causa:** Tabela mencionada no script não existe no seu banco.

**Solução:**
```sql
-- Remova as linhas relacionadas à tabela que não existe
-- Exemplo: Se audit_logs não existe, comente/remova essas linhas:

-- DROP POLICY IF EXISTS "..." ON public.audit_logs;
-- CREATE POLICY "..." ON public.audit_logs ...
```

### Erro: "policy already exists"

**Causa:** Política não foi dropada corretamente.

**Solução:**
```sql
-- Force drop com CASCADE:
DROP POLICY IF EXISTS "nome_da_policy" ON nome_tabela CASCADE;
```

### Erro: "permission denied"

**Causa:** Executando como usuário sem privilégios.

**Solução:**
- Execute pelo **SQL Editor** do Supabase Dashboard
- Dashboard tem privilégios de superuser automaticamente

---

## ✅ Verificação Final

Após aplicar o script v2:

### 1. Verificar Políticas:
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### 2. Testar Autenticação:
```javascript
// No frontend, teste:
const { data: profile } = await supabase
  .from('users')
  .select('*')
  .eq('id', user.id)
  .single();

console.log('✅ Profile loaded:', profile);
```

### 3. Verificar Linter:
```
Dashboard → Settings → Database → Database Linter
```

**Resultado esperado:**
- ✅ 0 Security Warnings
- ✅ 0 Performance Warnings (ou muito menos)

---

## 📚 Resumo de Scripts

| Script | Quando Usar |
|--------|-------------|
| `fix-supabase-warnings-complete.sql` | IDs são UUID nativos |
| `fix-supabase-warnings-complete-v2.sql` | ✅ **IDs são VARCHAR** (seu caso) |

---

## 💬 Dúvidas Frequentes

### Q: Por que usar ::text em vez de ::uuid?
**A:** Porque `::text` funciona tanto para VARCHAR quanto para UUID, tornando o código mais portável.

### Q: O cast ::text afeta performance?
**A:** Minimamente. A comparação continua usando índices se existirem.

### Q: Devo migrar para UUID?
**A:** Só se estiver começando o projeto ou se performance for crítica. Para sistemas existentes, manter VARCHAR com cast é perfeitamente aceitável.

### Q: O script é reversível?
**A:** Sim! Todas as alterações são políticas RLS, que podem ser dropadas e recriadas facilmente sem perder dados.

---

## 🆘 Ainda Tendo Problemas?

### 1. Verifique tipos de colunas:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name IN ('id', 'user_id');
```

### 2. Verifique políticas existentes:
```sql
SELECT * FROM pg_policies WHERE tablename = 'users';
```

### 3. Tente aplicar política por política:
```sql
-- Teste uma de cada vez:
DROP POLICY IF EXISTS "test_policy" ON public.users;

CREATE POLICY "test_policy" 
ON public.users 
FOR SELECT 
USING (id::text = (SELECT auth.uid())::text);

-- Teste no app
-- Se funcionar, continue com as outras
```

---

## 📞 Suporte

Se o erro persistir:

1. 📸 Tire screenshot do erro completo
2. 📋 Execute e compartilhe resultado:
   ```sql
   SELECT table_name, column_name, data_type 
   FROM information_schema.columns 
   WHERE table_schema = 'public' 
   AND column_name IN ('id', 'user_id')
   ORDER BY table_name;
   ```
3. 📝 Verifique logs: Dashboard → Logs → Postgres Logs

---

**Criado para L2 EDUCA - Novembro 2025**

> **Problema resolvido? Use o script v2! 🚀**


