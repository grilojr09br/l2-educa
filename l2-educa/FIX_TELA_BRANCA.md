# 🔧 CORREÇÃO: Tela Branca (Erro 504)

## ❌ Problema

```
Failed to load resource: 504 (Outdated Optimize Dep)
Tela fica branca
```

Este erro acontece quando o cache do Vite fica desatualizado após mudanças no código.

---

## ✅ SOLUÇÃO RÁPIDA (Windows)

### Opção 1: Usar o Script Automático

1. **Feche o servidor atual** (Ctrl+C no terminal onde está rodando)

2. **Dê duplo clique** no arquivo:
   ```
   fix-white-screen.bat
   ```

3. Aguarde o servidor reiniciar

4. **Abra o navegador** e acesse:
   ```
   http://localhost:5173
   ```

5. **Pressione**: `Ctrl + Shift + R` (hard refresh)

---

### Opção 2: Manual (Terminal/PowerShell)

1. **Pare o servidor** (Ctrl+C)

2. **Execute**:
   ```bash
   # Limpar cache do Vite
   Remove-Item -Recurse -Force node_modules\.vite
   
   # Reiniciar servidor
   npm run dev -- --force
   ```

3. **No navegador**: `Ctrl + Shift + R`

---

### Opção 3: Limpeza Completa (Se Opção 1 e 2 não funcionarem)

```bash
# 1. Pare o servidor (Ctrl+C)

# 2. Limpe TUDO
Remove-Item -Recurse -Force node_modules\.vite
Remove-Item -Recurse -Force dist

# 3. Reinstale dependências (opcional, só se necessário)
# npm install

# 4. Inicie servidor
npm run dev
```

---

## 🌐 Limpar Cache do Navegador

Depois de reiniciar o servidor:

### Chrome/Edge:
1. Pressione `F12` (DevTools)
2. Clique com **botão direito** no ícone de atualizar (🔄)
3. Selecione **"Esvaziar cache e atualizar forçadamente"**

OU:
- `Ctrl + Shift + R` (hard refresh)
- `Ctrl + Shift + Delete` (limpar tudo)

### Firefox:
- `Ctrl + Shift + R`

---

## 📋 Checklist de Verificação

Após executar a correção:

- [ ] Servidor reiniciado com sucesso
- [ ] Mensagem no terminal: `VITE ready in X ms`
- [ ] Navegador aberto em `http://localhost:5173`
- [ ] Hard refresh feito (`Ctrl + Shift + R`)
- [ ] Console do navegador (F12) sem erros vermelhos
- [ ] Site carrega (deve pedir login)

---

## 🔍 Verificar se Funcionou

### No Terminal (deve aparecer):
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### No Navegador:
- ✅ Site carrega
- ✅ Você vê a página de login ou terminal
- ✅ Console (F12) sem erros 504

---

## 🐛 Se AINDA Não Funcionar

### 1. Verifique a Porta

Outro processo pode estar usando a porta 5173:

```bash
# Ver o que está usando a porta
netstat -ano | findstr :5173

# Matar o processo (substitua PID pelo número mostrado)
taskkill /PID [número] /F
```

### 2. Use Porta Diferente

```bash
npm run dev -- --port 3000
```

Depois acesse: `http://localhost:3000`

### 3. Reinstale Dependências

```bash
# Pare o servidor (Ctrl+C)

# Remova node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstale
npm install

# Inicie
npm run dev
```

---

## ⚠️ Prevenção Futura

Para evitar este erro:

1. **Sempre pare o servidor** antes de:
   - Fazer pull de código
   - Mudar branches no Git
   - Instalar/atualizar dependências

2. **Limpe o cache** periodicamente:
   ```bash
   npm run dev -- --force
   ```

3. **Use Vite 5.x** (mais estável)

---

## 🆘 Erros Comuns

### `Cannot find path 'l2-educa'`
**Solução**: Navegue até a pasta antes:
```bash
cd "C:\Users\davie\OneDrive\Área de Trabalho\AI\EDU\Educational web page creator\l2-educa"
```

### `Port 5173 is already in use`
**Solução**: 
```bash
# Matar processo na porta
npx kill-port 5173

# Ou use outra porta
npm run dev -- --port 3000
```

### `Module not found`
**Solução**: Reinstale dependências
```bash
npm install
```

---

## 📞 Status de Correção

Depois de executar, me diga:

1. ✅ Servidor reiniciou?
2. ✅ Site abre no navegador?
3. ✅ Continua tela branca?
4. ✅ Que erros aparecem no Console (F12)?

---

## 🎯 Resumo Rápido

```bash
# 1. PARE O SERVIDOR (Ctrl+C)

# 2. LIMPE CACHE
Remove-Item -Recurse -Force node_modules\.vite

# 3. REINICIE
npm run dev -- --force

# 4. NO NAVEGADOR
# Ctrl + Shift + R
```

---

**Tempo estimado**: 2 minutos  
**Sucesso**: 99% dos casos

**Boa sorte! 🚀**

