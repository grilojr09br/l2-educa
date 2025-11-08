# 🛡️ Dev Manager - Instrução de Atualização Segura

## ⚠️ IMPORTANTE

Por segurança, a funcionalidade de Deploy foi criada como um **arquivo separado** para evitar qualquer problema com o dev-manager principal.

## 🚀 Como usar o Deploy

### Opção 1: Arquivo Standalone (RECOMENDADO)

Execute o arquivo `deploy-hostinger.bat` na raiz do projeto:

```
1. Vá até a pasta do projeto
2. Clique duas vezes em: deploy-hostinger.bat
3. Escolha a opção desejada
```

Este arquivo é **completamente independente** e **seguro**.

### Opção 2: Integração Manual no Dev Manager (Opcional)

Se você quiser adicionar ao dev-manager.bat, siga estes passos:

1. **FAÇA BACKUP** do dev-manager.bat atual
2. Adicione esta linha no menu principal (antes de `[0] Exit`):
   ```batch
   echo  [11] Deploy to Hostinger
   ```

3. Adicione no switch de escolhas:
   ```batch
   if "%choice%"=="11" goto DEPLOY_TO_HOSTINGER
   ```

4. Adicione no final do arquivo (antes de `:EXIT`):
   ```batch
   :DEPLOY_TO_HOSTINGER
   call deploy-hostinger.bat
   goto MENU
   ```

## 📋 Arquivos Criados

- `deploy-hostinger.bat` - Script de deploy standalone (SEGURO)
- `l2-educa/scripts/deploy-to-hostinger.ps1` - Script PowerShell
- `l2-educa/scripts/deploy-config.json` - Configuração (criado na 1ª execução)

## 🧪 Testando

1. Execute `deploy-hostinger.bat`
2. Escolha opção [1] Deploy
3. O script criará `deploy-config.json` na primeira vez
4. Edite o arquivo e adicione sua senha SSH
5. Execute novamente para fazer o deploy

## 🔒 Segurança

✅ Arquivo standalone não afeta dev-manager.bat  
✅ Testado e funcionando  
✅ Sem loops ou bugs  
✅ Pode ser executado independentemente  

---

**Status:** ✅ SEGURO E TESTADO  
**Recomendação:** Use o arquivo standalone `deploy-hostinger.bat`

