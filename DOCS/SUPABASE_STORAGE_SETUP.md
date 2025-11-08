# 📦 Configuração do Supabase Storage para Avatares

## 🎯 Objetivo

Configurar o Supabase Storage para permitir upload de fotos de perfil dos usuários com otimização automática.

---

## 📋 Passo a Passo

### 1. Criar Bucket no Supabase

1. Acesse o **Dashboard do Supabase**: https://app.supabase.com
2. Selecione seu projeto **L2 Educa**
3. No menu lateral, clique em **Storage**
4. Clique em **"New bucket"**
5. Configure:
   - **Name**: `avatars`
   - **Public bucket**: ✅ **ATIVADO** (para permitir acesso público às imagens)
   - **File size limit**: `5 MB` (máximo por arquivo)
   - **Allowed MIME types**: `image/*` (todas as imagens)

6. Clique em **"Create bucket"**

---

### 2. Configurar Políticas de Segurança (RLS)

Adicione as seguintes políticas na aba **Policies** do bucket `avatars`:

#### Política 1: Permitir Upload (Usuários autenticados)

```sql
-- Nome: "Usuários podem fazer upload de seus próprios avatares"
-- Operation: INSERT
-- Target roles: authenticated

CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Política 2: Permitir Leitura Pública

```sql
-- Nome: "Avatares são publicamente visíveis"
-- Operation: SELECT
-- Target roles: public

CREATE POLICY "Avatars are publicly accessible"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

#### Política 3: Permitir Atualização (Próprio usuário)

```sql
-- Nome: "Usuários podem atualizar seus próprios avatares"
-- Operation: UPDATE
-- Target roles: authenticated

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Política 4: Permitir Exclusão (Próprio usuário)

```sql
-- Nome: "Usuários podem deletar seus próprios avatares"
-- Operation: DELETE
-- Target roles: authenticated

CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

---

### 3. Adicionar Coluna `avatar_url` na Tabela `users`

Execute no **SQL Editor** do Supabase:

```sql
-- Adicionar coluna avatar_url se não existir
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_users_avatar_url 
ON public.users(avatar_url);

-- Comentário descritivo
COMMENT ON COLUMN public.users.avatar_url 
IS 'URL pública da foto de perfil do usuário armazenada no Supabase Storage';
```

---

### 4. Atualizar RLS Policies da Tabela `users`

```sql
-- Permitir que usuários atualizem seu próprio avatar_url
CREATE POLICY "Users can update their own avatar_url"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

---

## 🧪 Testar Configuração

### Teste 1: Upload Manual

1. Vá para **Storage** > **avatars**
2. Clique em **"Upload file"**
3. Crie uma pasta com um UUID de teste
4. Faça upload de uma imagem
5. Clique na imagem e copie a **Public URL**
6. Teste acessar a URL no navegador

### Teste 2: Upload via Aplicação

1. Faça login no L2 Educa
2. Vá para **Perfil**
3. Clique em **"Editar Perfil"**
4. Clique no avatar ou em **"Escolher Foto"**
5. Selecione uma imagem do seu dispositivo
6. Aguarde o upload e compressão automática
7. Verifique se a foto aparece no perfil

---

## 📊 Estrutura de Pastas no Storage

```
avatars/
├── {user_id_1}/
│   ├── {user_id_1}-1731234567890.jpg
│   └── {user_id_1}-1731234589012.jpg (mais recente)
├── {user_id_2}/
│   └── {user_id_2}-1731234590123.jpg
└── ...
```

**Benefícios desta estrutura**:
- ✅ Cada usuário tem sua própria pasta
- ✅ Fácil identificar dono do avatar
- ✅ Permite múltiplos uploads (histórico)
- ✅ Timestamp garante nomes únicos

---

## 🔒 Segurança

### O que as políticas garantem:

- ✅ **Usuários só podem fazer upload em suas próprias pastas**
- ✅ **Todos podem VER avatares** (público)
- ✅ **Apenas o dono pode ATUALIZAR/DELETAR** seu avatar
- ✅ **Usuários não autenticados NÃO podem fazer upload**

---

## 📏 Limites e Otimização

### Otimização Automática (no frontend):

O componente `AvatarUpload` já faz:
- ✅ Redimensionamento para máx 400x400px
- ✅ Compressão para JPEG com qualidade 85%
- ✅ Conversão automática de qualquer formato
- ✅ Redução de tamanho em até 90%

### Exemplo de Redução:

```
Original: 3.2 MB (PNG 2000x2000)
   ⬇️
Otimizado: 45 KB (JPEG 400x400)
   ⬇️
Redução: 98.6%
```

---

## 🐛 Troubleshooting

### Erro: "new row violates row-level security policy"

**Causa**: Políticas RLS não configuradas corretamente.

**Solução**:
1. Verifique se as políticas foram criadas
2. Execute novamente os comandos SQL acima
3. Certifique-se que o bucket é **público**

---

### Erro: "Failed to upload: 413 Payload Too Large"

**Causa**: Imagem muito grande (>5MB antes da compressão).

**Solução**:
- O frontend já comprime antes do upload
- Se ainda assim der erro, aumente o limite no bucket
- Ou reduza a qualidade de compressão no `AvatarUpload.jsx` (linha 60)

---

### Avatar não aparece após upload

**Causas possíveis**:
1. URL pública não configurada
2. Bucket não é público
3. Cache do navegador

**Soluções**:
1. Verifique se o bucket `avatars` está marcado como **público**
2. Faça hard refresh: `Ctrl + Shift + R`
3. Verifique no console (F12) se há erros de CORS

---

## 🎨 URLs Públicas

### Formato da URL:

```
https://{PROJECT_REF}.supabase.co/storage/v1/object/public/avatars/{user_id}-{timestamp}.jpg
```

### Exemplo:

```
https://xyzabc123.supabase.co/storage/v1/object/public/avatars/f47ac10b-58cc-4372-a567-0e02b2c3d479-1731234567890.jpg
```

---

## 📈 Monitoramento

### Ver estatísticas de uso:

1. **Storage** > **avatars** > **Statistics**
2. Veja:
   - Total de arquivos
   - Tamanho total usado
   - Uploads recentes

### Limpar avatares antigos (opcional):

```sql
-- Listar avatares antigos (mais de 30 dias sem uso)
SELECT name, created_at, metadata
FROM storage.objects
WHERE bucket_id = 'avatars'
AND created_at < NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Deletar manualmente via Dashboard ou SQL
```

---

## ✅ Checklist de Configuração

Marque conforme completa:

- [ ] Bucket `avatars` criado e público
- [ ] 4 políticas RLS criadas no bucket
- [ ] Coluna `avatar_url` adicionada na tabela `users`
- [ ] Política de UPDATE criada na tabela `users`
- [ ] Teste de upload manual funcionando
- [ ] Teste via aplicação funcionando
- [ ] Avatar aparece no perfil
- [ ] Avatar aparece no sidebar

---

## 🚀 Próximos Passos (Opcional)

### Melhorias Futuras:

1. **CDN**: Integrar Cloudflare para cache global
2. **Transformação**: Usar Supabase Image Transformations para múltiplos tamanhos
3. **Moderação**: Adicionar filtro de conteúdo impróprio
4. **Backup**: Sistema automático de backup de avatares
5. **Analytics**: Rastrear uploads e visualizações

---

## 📚 Referências

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage RLS Policies](https://supabase.com/docs/guides/storage/security/access-control)
- [Image Optimization](https://supabase.com/docs/guides/storage/image-transformations)

---

**✅ Configuração Completa!**

Agora os usuários podem fazer upload de fotos de perfil otimizadas automaticamente! 📸










