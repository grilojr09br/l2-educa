# 🚀 Hostinger Deployment Guide

## 📋 Overview

This guide explains how to automatically deploy your L2 EDUCA frontend to Hostinger using the built-in deployment tool in dev-manager.

## 🎯 Quick Start

### Step 1: First Time Setup

1. Run `dev-manager.bat`
2. Select `[11] 🚀 Deploy to Hostinger`
3. Select `[1] 🚀 Deploy Frontend to Hostinger`
4. The script will create a configuration file: `l2-educa/scripts/deploy-config.json`

### Step 2: Configure SSH Credentials

Edit the configuration file created in Step 1:

**Location:** `l2-educa/scripts/deploy-config.json`

```json
{
  "ssh_host": "45.152.46.119",
  "ssh_port": "65002",
  "ssh_user": "u511043813",
  "ssh_password": "YOUR_PASSWORD_HERE",
  "remote_path": "domains/silviosuperandolimites.com.br/public_html/l2",
  "local_dist_path": "dist"
}
```

**⚠️ IMPORTANT:** Replace `YOUR_PASSWORD_HERE` with your actual SSH password!

You can edit directly or use the dev-manager:
- Select `[11] Deploy to Hostinger` → `[3] Edit Configuration`

### Step 3: Install Required Tools

The script requires SSH/SCP tools. Choose one option:

#### Option 1: OpenSSH (Windows 10/11 - Recommended)

1. Open **Settings**
2. Go to **Apps** → **Optional Features**
3. Click **Add a feature**
4. Search for **OpenSSH Client**
5. Click **Install**
6. Restart your terminal

#### Option 2: PuTTY Suite

1. Download from https://www.putty.org/
2. Install PuTTY (includes pscp and plink)
3. Add to PATH or install to default location

### Step 4: Deploy!

1. Run `dev-manager.bat`
2. Select `[11] 🚀 Deploy to Hostinger`
3. Select `[1] 🚀 Deploy Frontend to Hostinger`
4. Type `yes` to confirm
5. Wait for deployment to complete

## 📝 What It Does

The deployment script automatically:

1. **Builds the frontend** - Runs `npm run build` in l2-educa folder
2. **Cleans remote directory** - Deletes old files in the server's l2 folder
3. **Uploads new files** - Copies all files from `dist/` to server
4. **Verifies deployment** - Checks if files were uploaded successfully

## 🔧 Configuration Options

### Configuration File Structure

```json
{
  "ssh_host": "45.152.46.119",          // Server IP address
  "ssh_port": "65002",                  // SSH port (usually 22 or 65002)
  "ssh_user": "u511043813",             // Your Hostinger username
  "ssh_password": "your_password",      // Your SSH/cPanel password
  "remote_path": "domains/silviosuperandolimites.com.br/public_html/l2",
  "local_dist_path": "dist"             // Local build folder
}
```

### Server Path Breakdown

```
ssh u511043813@45.152.46.119 -p 65002
  ↓
cd domains
  ↓
cd silviosuperandolimites.com.br
  ↓
cd public_html
  ↓
cd l2  ← Files are deployed here
```

**Full path:** `~/domains/silviosuperandolimites.com.br/public_html/l2/`

## 🎬 Usage Examples

### Deploy from Dev Manager

```
1. Run dev-manager.bat
2. Press [11]
3. Press [1]
4. Type: yes
5. Wait for completion
```

### Deploy via PowerShell Directly

```powershell
# From project root
cd l2-educa\scripts
powershell -ExecutionPolicy Bypass -File deploy-to-hostinger.ps1 -Action deploy
```

### Check Configuration

```powershell
# Show current settings
powershell -ExecutionPolicy Bypass -File deploy-to-hostinger.ps1 -Action config
```

## 🔒 Security Best Practices

### 1. **Secure Your Configuration File**

⚠️ **IMPORTANT:** The `deploy-config.json` contains your password!

Add to `.gitignore`:
```gitignore
# Deployment credentials
l2-educa/scripts/deploy-config.json
```

The file is already configured in `.gitignore`, but verify before committing!

### 2. **Use SSH Keys (Advanced)**

For better security, use SSH keys instead of password:

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519
   ```

2. Copy to server:
   ```bash
   ssh-copy-id -p 65002 u511043813@45.152.46.119
   ```

3. Update script to use key-based auth (remove password requirement)

### 3. **Restrict File Permissions**

On server, ensure proper permissions:
```bash
chmod 755 ~/domains/silviosuperandolimites.com.br/public_html/l2
chmod 644 ~/domains/silviosuperandolimites.com.br/public_html/l2/*
```

## 🐛 Troubleshooting

### Issue: "Missing required tools"

**Solution:** Install OpenSSH or PuTTY (see Step 3 above)

**Verify installation:**
```powershell
# Check if OpenSSH is installed
ssh -V

# Check if PuTTY is installed
pscp
```

### Issue: "Configuration file not found"

**Solution:** Run deployment once to create default config

```powershell
cd l2-educa\scripts
powershell -ExecutionPolicy Bypass -File deploy-to-hostinger.ps1 -Action deploy
```

### Issue: "Build failed"

**Causes:**
- Node modules not installed
- Build errors in code
- Out of disk space

**Solution:**
```bash
cd l2-educa
npm install
npm run build
```

Check console for specific build errors.

### Issue: "SSH connection failed"

**Causes:**
- Wrong password in config
- Server is down
- Firewall blocking port 65002
- Wrong SSH credentials

**Solution:**
1. Test SSH connection manually:
   ```bash
   ssh -p 65002 u511043813@45.152.46.119
   ```

2. Verify credentials in Hostinger cPanel

3. Check if port 65002 is open:
   ```powershell
   Test-NetConnection -ComputerName 45.152.46.119 -Port 65002
   ```

### Issue: "Permission denied"

**Solution:**
1. Verify SSH user has write permissions
2. Check folder ownership on server:
   ```bash
   ls -la ~/domains/silviosuperandolimites.com.br/public_html/
   ```
3. Contact Hostinger support if needed

### Issue: "Files not updating in browser"

**Solution:**
1. **Clear browser cache** (Ctrl+Shift+R)
2. **Check file timestamps** on server
3. **Verify upload:** Check server via SSH
   ```bash
   ls -lt ~/domains/silviosuperandolimites.com.br/public_html/l2/
   ```

## 📊 Deployment Checklist

Before deploying, verify:

- [ ] All changes committed to Git
- [ ] Build works locally (`npm run build`)
- [ ] Configuration file has correct password
- [ ] SSH/SCP tools installed
- [ ] Email verification settings configured
- [ ] Environment variables set (if needed)
- [ ] .gitignore includes deploy-config.json

After deploying, verify:

- [ ] Site loads at https://silviosuperandolimites.com.br/l2/
- [ ] No console errors (F12)
- [ ] Login/Register works
- [ ] All pages accessible
- [ ] Images and assets load
- [ ] Mobile responsive
- [ ] SSL certificate valid

## 🎯 Deployment Workflow

### Development to Production

```
Local Development
  ↓
1. Make changes
  ↓
2. Test locally (npm run dev)
  ↓
3. Commit to Git
  ↓
4. Run deployment (dev-manager option 11)
  ↓
5. Verify on production
  ↓
6. Monitor for issues
```

### Recommended Frequency

- **Development:** Deploy after significant features
- **Bug fixes:** Deploy immediately after testing
- **Regular updates:** Weekly/bi-weekly
- **Security updates:** Deploy ASAP

## 🔄 Rollback Strategy

If deployment breaks something:

### Option 1: Deploy Previous Version

```bash
# Checkout previous commit
git checkout HEAD~1

# Deploy old version
# Run dev-manager option 11

# Return to latest
git checkout main
```

### Option 2: Manual Restoration

1. Connect via SSH
2. Restore from backup (if you have one)
3. Or manually fix files on server

### Option 3: Local Fix and Redeploy

1. Fix the issue locally
2. Test thoroughly
3. Deploy fixed version immediately

## 📞 Support & Help

### Common Commands

```bash
# Test SSH connection
ssh -p 65002 u511043813@45.152.46.119

# List files on server
ssh -p 65002 u511043813@45.152.46.119 "ls -la domains/silviosuperandolimites.com.br/public_html/l2"

# Check disk space
ssh -p 65002 u511043813@45.152.46.119 "df -h"

# View error logs (if Apache/Nginx)
ssh -p 65002 u511043813@45.152.46.119 "tail -f domains/silviosuperandolimites.com.br/logs/error_log"
```

### Get Help

1. Check deployment logs in terminal
2. Verify configuration file
3. Test SSH connection manually
4. Check Hostinger service status
5. Contact Hostinger support if server-related

## 📝 Advanced Usage

### Deploy Specific Build

```powershell
# Build first
cd l2-educa
npm run build

# Deploy using script
cd scripts
powershell -ExecutionPolicy Bypass -File deploy-to-hostinger.ps1
```

### Custom Remote Path

Edit `deploy-config.json`:
```json
{
  "remote_path": "domains/yourdomain.com/public_html/custom/path"
}
```

### Deploy to Multiple Servers

Create multiple config files:
- `deploy-config-production.json`
- `deploy-config-staging.json`

Modify script to accept config file parameter.

---

**Last Updated:** November 8, 2025  
**Version:** 1.0.0  
**Tested On:** Windows 10/11, Hostinger Shared Hosting  

**⚠️ Important Security Notice:**
Never commit `deploy-config.json` to Git! Always keep credentials secure.

