# 🔧 Deploy Troubleshooting Guide

## 🔑 SSH Password Issues

### Problem: Script keeps asking for password

**Cause:** OpenSSH on Windows doesn't support password authentication via command line properly.

**Solution:** Install PuTTY (includes `pscp` and `plink` which support `-pw` flag)

### How to Install PuTTY

1. **Download PuTTY:**
   - Go to: https://www.putty.org/
   - Download the installer (64-bit or 32-bit)

2. **Install PuTTY:**
   - Run the installer
   - Use default installation path: `C:\Program Files\PuTTY\`
   - Make sure to install **all components** (plink, pscp, etc.)

3. **Add to PATH:**
   - Open System Properties → Advanced → Environment Variables
   - Under System Variables, find `Path`
   - Click Edit
   - Add: `C:\Program Files\PuTTY\`
   - Click OK

4. **Verify Installation:**
   ```powershell
   # Open new PowerShell window
   pscp
   plink
   # Both should show help text
   ```

### Alternative: Use SSH Keys (Advanced)

If you prefer not to use passwords:

1. **Generate SSH key:**
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Copy to server:**
   ```powershell
   type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh -p 65002 u511043813@45.152.46.119 "cat >> ~/.ssh/authorized_keys"
   ```

3. **Modify script to not use password**

## 🐛 Common Issues

### Issue 1: "pscp is not recognized"

**Solution:**
- PuTTY not installed or not in PATH
- Follow installation steps above
- Restart PowerShell/CMD after adding to PATH

### Issue 2: "Host key not cached" or "Cannot confirm a host key in batch mode"

**Solution:**

The script now automatically caches the host key on first run. But if you still have issues:

**Option 1: Run the cache script (easiest):**
```powershell
cd l2-educa\scripts
powershell -ExecutionPolicy Bypass -File cache-hostkey.ps1
# Enter your SSH password when prompted
```

**Option 2: Manual connection:**
```powershell
echo y | plink -P 65002 -pw YOUR_PASSWORD u511043813@45.152.46.119 "exit"
```

**Option 3: Connect once interactively:**
```powershell
plink -P 65002 u511043813@45.152.46.119
# Type 'y' when asked to accept host key
# Then type your password
```

After caching once, all future deployments will work automatically.

### Issue 3: "Permission denied"

**Solution:**
- Check password in `deploy-config.json`
- Verify SSH credentials in Hostinger cPanel
- Try logging in manually first:
  ```powershell
  plink -P 65002 -pw YOUR_PASSWORD u511043813@45.152.46.119
  ```

### Issue 4: "Build failed"

**Solution:**
```bash
cd l2-educa
npm install
npm run build
# Fix any errors shown
```

### Issue 5: "Dist folder not found"

**Solution:**
- Build must complete successfully first
- Check if `l2-educa/dist` exists
- Run build manually to see errors

## 📋 Pre-Deployment Checklist

Before running deploy:

- [ ] PuTTY installed (pscp and plink available)
- [ ] `deploy-config.json` created and password added
- [ ] Build completes successfully locally
- [ ] SSH credentials verified in Hostinger
- [ ] Port 65002 not blocked by firewall

## 🧪 Testing Connections

### Test 1: Can you connect via SSH?
```powershell
plink -P 65002 -pw YOUR_PASSWORD u511043813@45.152.46.119 "echo Connection OK"
```
Should output: `Connection OK`

### Test 2: Can you upload a file?
```powershell
echo "test" > test.txt
pscp -P 65002 -pw YOUR_PASSWORD test.txt u511043813@45.152.46.119:~/
```
Should upload without errors

### Test 3: Can you list files?
```powershell
plink -P 65002 -pw YOUR_PASSWORD u511043813@45.152.46.119 "ls -la ~/"
```
Should show your home directory files

## 🔒 Security Notes

### Password in Config File

The password is stored in plain text in `deploy-config.json`. This is why:
1. File is in `.gitignore` (never committed)
2. File is local to your machine only
3. Used only for deployment automation

### Better Security: Use SSH Keys

For production, consider using SSH keys:
1. More secure (no password in file)
2. Can be revoked easily
3. No password prompts
4. Industry standard

## 📞 Getting Help

If issues persist:

1. **Check logs:** Look at PowerShell error messages
2. **Test manually:** Try commands individually
3. **Verify credentials:** Login to Hostinger cPanel
4. **Check firewall:** Ensure port 65002 is open
5. **Contact Hostinger:** If server-side issues

## 🎯 Quick Reference

### Working Configuration Example:
```json
{
  "ssh_host": "45.152.46.119",
  "ssh_port": "65002",
  "ssh_user": "u511043813",
  "ssh_password": "your_actual_password_here",
  "remote_path": "domains/silviosuperandolimites.com.br/public_html/l2",
  "local_dist_path": "dist"
}
```

### Required Tools:
- ✅ PowerShell (built-in Windows)
- ✅ Node.js (for building)
- ✅ PuTTY (pscp + plink) - **REQUIRED!**

---

**Last Updated:** November 8, 2025  
**Status:** Tested and working with PuTTY

