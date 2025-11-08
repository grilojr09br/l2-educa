# 🔒 FIX: Profile Update RLS Issue

## 🐛 Problema

Ao tentar salvar alterações no perfil, o usuário recebe o erro:

```
Erro ao salvar perfil: new row violates row-level security policy for table "user_profiles"
```

### Causa

As políticas de **Row Level Security (RLS)** da tabela `user_profiles` no Supabase estão mal configuradas ou ausentes, impedindo que usuários autenticados atualizem seus próprios perfis.

---

## ✅ Solução

### Opção 1: Via Supabase Dashboard (Recomendado)

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Navegue até SQL Editor**
   - No menu lateral: **SQL Editor**
   - Clique em **+ New Query**

3. **Execute o Script SQL**
   - Copie o conteúdo do arquivo: `l2-educa/supabase/fix_user_profiles_rls.sql`
   - Cole no editor SQL
   - Clique em **Run** (ou Ctrl+Enter)

4. **Verifique o Resultado**
   - Você deve ver: `✅ RLS policies for user_profiles table have been fixed!`
   - Verifique a lista de políticas criadas

---

### Opção 2: Via Supabase CLI (Para Desenvolvedores)

```bash
# 1. Certifique-se de ter o Supabase CLI instalado
npm install -g supabase

# 2. Faça login no Supabase
supabase login

# 3. Link seu projeto
supabase link --project-ref YOUR_PROJECT_REF

# 4. Execute o script
supabase db push --file l2-educa/supabase/fix_user_profiles_rls.sql
```

---

## 🔍 O Que o Script Faz

### 1. Remove Políticas Antigas (se existirem)
```sql
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON user_profiles;
```

### 2. Habilita RLS
```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

### 3. Cria 4 Políticas Novas

#### Política 1: SELECT (Leitura)
```sql
CREATE POLICY "Users can view own profile"
ON user_profiles
FOR SELECT
USING (auth.uid() = user_id);
```
- ✅ Usuários podem **ler** apenas seu próprio perfil

#### Política 2: INSERT (Criação)
```sql
CREATE POLICY "Users can insert own profile"
ON user_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```
- ✅ Usuários podem **criar** apenas seu próprio perfil

#### Política 3: UPDATE (Atualização)
```sql
CREATE POLICY "Users can update own profile"
ON user_profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```
- ✅ Usuários podem **atualizar** apenas seu próprio perfil
- ⚠️ **Esta é a política que estava faltando!**

#### Política 4: DELETE (Exclusão)
```sql
CREATE POLICY "Users can delete own profile"
ON user_profiles
FOR DELETE
USING (auth.uid() = user_id);
```
- ✅ Usuários podem **deletar** apenas seu próprio perfil (opcional)

### 4. Concede Permissões
```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON user_profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
```
- ✅ Garante que usuários autenticados tenham as permissões necessárias

---

## 🧪 Como Testar Após a Correção

### Teste 1: Atualizar Perfil
```
1. Faça login na plataforma
2. Vá para "Meu Perfil"
3. Clique em "Editar Perfil"
4. Altere "Nome Completo" ou "Bio"
5. Clique em "Salvar"
6. ✅ Deve salvar com sucesso
```

### Teste 2: Verificar no Console
```javascript
// Abra o console (F12) e execute:
const { data, error } = await supabase
  .from('user_profiles')
  .update({ bio: 'Teste de atualização' })
  .eq('user_id', user.id);

console.log('Resultado:', { data, error });
// ✅ error deve ser null
// ✅ data deve conter o perfil atualizado
```

---

## 📊 Antes vs Depois

### ANTES ❌
```
Operação: UPDATE user_profiles
Resultado: ❌ RLS Error
Mensagem: "new row violates row-level security policy"
Usuário: Frustrado, não consegue salvar perfil
```

### DEPOIS ✅
```
Operação: UPDATE user_profiles
Resultado: ✅ Sucesso
Mensagem: "Perfil atualizado com sucesso!"
Usuário: Feliz, perfil salvo normalmente
```

---

## 🔐 Segurança

### O Que as Políticas Garantem

✅ **Privacidade**
- Cada usuário vê apenas seu próprio perfil
- Impossível acessar perfis de outros usuários

✅ **Integridade**
- Usuários só podem modificar seus próprios dados
- Não podem alterar `user_id` para outro usuário

✅ **Isolamento**
- RLS é aplicado no nível do banco de dados
- Proteção mesmo se houver bug no código frontend/backend

### Exemplo de Tentativa Maliciosa (Bloqueada)

```javascript
// ❌ Tentativa de alterar perfil de outro usuário
const { error } = await supabase
  .from('user_profiles')
  .update({ bio: 'Hackeado!' })
  .eq('user_id', 'outro-usuario-id'); // ID diferente do usuário logado

// Resultado: error ≠ null
// RLS bloqueia automaticamente!
```

---

## 🚨 Troubleshooting

### Problema: Script falhou ao executar

**Solução 1: Verifique se a tabela existe**
```sql
SELECT * FROM user_profiles LIMIT 1;
```

**Solução 2: Verifique permissões**
```sql
SELECT 
  grantee, 
  privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name='user_profiles';
```

### Problema: Ainda recebo erro após executar script

**Passo 1: Limpe o cache do Supabase**
```javascript
// No console do navegador:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

**Passo 2: Faça logout e login novamente**
```
1. Clique em "Sair"
2. Faça login novamente
3. Tente atualizar o perfil
```

**Passo 3: Verifique se as políticas foram criadas**
```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'user_profiles';

-- Deve retornar 4 políticas:
-- 1. Users can view own profile (SELECT)
-- 2. Users can insert own profile (INSERT)
-- 3. Users can update own profile (UPDATE)
-- 4. Users can delete own profile (DELETE)
```

---

## 📝 Arquivos Relacionados

### Criados
- ✅ `l2-educa/supabase/fix_user_profiles_rls.sql` - Script SQL de correção
- ✅ `l2-educa/DOCS/FIX_PROFILE_RLS_ISSUE.md` - Esta documentação

### Relacionados
- `l2-educa/src/contexts/AuthContext.jsx` - Função `updateProfile()`
- `l2-educa/src/pages/Profile.jsx` - Página de perfil do usuário
- `l2-educa-backend/src/services/authService.ts` - Serviço de autenticação backend

---

## ✅ Checklist de Verificação

Após executar o script, verifique:

- [ ] Script SQL executou sem erros
- [ ] 4 políticas RLS foram criadas (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
- [ ] Permissões foram concedidas a `authenticated` role
- [ ] Teste de atualização de perfil funciona
- [ ] Nenhum erro no console do navegador
- [ ] Dados são salvos corretamente no banco

---

## 🎯 Status Final

**Antes:** ❌ Usuários não conseguem salvar perfil (RLS Error)  
**Depois:** ✅ Perfil atualiza normalmente

**Impacto:** Crítico - Resolve bloqueio total de funcionalidade  
**Complexidade:** Baixa - Script SQL simples  
**Tempo de Aplicação:** < 1 minuto  

---

**Data:** Novembro 2025  
**Prioridade:** 🔴 ALTA (Funcionalidade Crítica)  
**Status:** ✅ Solução Pronta para Aplicar

