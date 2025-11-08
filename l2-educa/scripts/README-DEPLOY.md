# 🚀 Deploy to Hostinger - Quick Guide

## ⚡ Quick Start

### 1. First Time Setup

Run dev-manager and select option **[11] Deploy to Hostinger** → **[1] Deploy**

This will create `deploy-config.json` with default settings.

### 2. Add Your Password

Edit the file: `l2-educa/scripts/deploy-config.json`

```json
{
  "ssh_host": "45.152.46.119",
  "ssh_port": "65002",
  "ssh_user": "u511043813",
  "ssh_password": "PUT_YOUR_PASSWORD_HERE",  ← Change this!
  "remote_path": "domains/silviosuperandolimites.com.br/public_html/l2",
  "local_dist_path": "dist"
}
```

**OR** use dev-manager: Option [11] → [3] Edit Configuration

### 3. Install SSH Tools

**Windows 10/11 (Recommended):**
- Settings → Apps → Optional Features
- Add: **OpenSSH Client**
- Restart terminal

**Alternative: Install PuTTY**
- Download from https://www.putty.org/
- Includes pscp and plink tools

### 4. Deploy!

```
1. Run dev-manager.bat
2. Select [11] Deploy to Hostinger
3. Select [1] Deploy Frontend
4. Type "yes" to confirm
5. Wait for completion
```

## 🎯 What Happens

1. ✅ Builds your frontend (`npm run build`)
2. ✅ Connects to Hostinger via SSH
3. ✅ Clears old files from server
4. ✅ Uploads new files from `dist/`
5. ✅ Verifies deployment

## 📝 Server Details

- **Host:** 45.152.46.119
- **Port:** 65002
- **User:** u511043813
- **Path:** `domains/silviosuperandolimites.com.br/public_html/l2`
- **Live URL:** https://silviosuperandolimites.com.br/l2/

## ⚠️ Important

- ⚠️ **NEVER commit** `deploy-config.json` to Git!
- ⚠️ File is in `.gitignore` by default
- ⚠️ Always test locally before deploying
- ⚠️ Deployment **deletes** old files on server

## 🐛 Troubleshooting

### "Missing required tools"
→ Install OpenSSH or PuTTY (see step 3)

### "SSH connection failed"
→ Check password in deploy-config.json
→ Test connection: `ssh -p 65002 u511043813@45.152.46.119`

### "Build failed"
→ Run `npm install` in l2-educa folder
→ Fix any build errors first

### "Permission denied"
→ Verify SSH credentials
→ Check Hostinger account status

## 📚 Full Documentation

See: `DOCS/HOSTINGER_DEPLOYMENT_GUIDE.md` for complete guide

## 🔒 Security

✅ Configuration file is in `.gitignore`  
✅ Never share your password  
✅ Use SSH keys for better security (advanced)  

---

**Quick Commands:**

```powershell
# Deploy via PowerShell directly
cd l2-educa\scripts
powershell -ExecutionPolicy Bypass -File deploy-to-hostinger.ps1

# Show config
powershell -ExecutionPolicy Bypass -File deploy-to-hostinger.ps1 -Action config

# Test SSH connection
ssh -p 65002 u511043813@45.152.46.119
```

