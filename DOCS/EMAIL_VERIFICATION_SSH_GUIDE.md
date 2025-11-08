# 🔐 Email Verification Management via SSH (Hostinger)

## 📋 Overview

This guide shows how to manage email verification settings directly on your Hostinger server via SSH. This is useful for production environments where you want to change settings without redeploying the entire application.

## 🚀 Quick Start

### Prerequisites
- SSH access to your Hostinger server
- Your application deployed on the server
- Basic SSH/terminal knowledge

### Method 1: Run Script Directly on Server

```bash
# 1. Connect to your server via SSH
ssh username@yourdomain.com

# 2. Navigate to your frontend build directory
cd /path/to/your/frontend/src/config

# 3. Make the script executable (first time only)
chmod +x ../../scripts/toggle-email-verification.sh

# 4. Run the script
cd ../../scripts
./toggle-email-verification.sh disable   # or enable
```

### Method 2: Run Script from Your Local Machine

```bash
# Upload script to server (if not already there)
scp l2-educa/scripts/toggle-email-verification.sh username@yourdomain.com:/path/to/app/scripts/

# Run script remotely
ssh username@yourdomain.com "cd /path/to/app/scripts && chmod +x toggle-email-verification.sh && ./toggle-email-verification.sh disable"
```

### Method 3: Edit Configuration File Directly

```bash
# 1. Connect via SSH
ssh username@yourdomain.com

# 2. Navigate to config directory
cd /path/to/your/frontend/src/config

# 3. Edit the file
nano emailVerification.js

# 4. Change values to true or false:
# REQUIRE_EMAIL_VERIFICATION: false,
# SHOW_LOGIN_NOTICE: false,
# SHOW_BANNER_WHEN_LOGGED_IN: false,
# BLOCK_ACCESS_UNTIL_VERIFIED: false,

# 5. Save and exit (Ctrl+X, then Y, then Enter)
```

## 📝 Script Commands

```bash
# Enable email verification
./toggle-email-verification.sh enable

# Disable email verification (default)
./toggle-email-verification.sh disable

# Check current status
./toggle-email-verification.sh status

# Show help
./toggle-email-verification.sh help
```

## 🎯 Complete Workflow Example

### Scenario: You want to disable email verification in production

```bash
# 1. Connect to Hostinger via SSH
ssh your_username@your_server.com

# 2. Navigate to your application
cd ~/public_html/l2-educa
# Or wherever your app is deployed, e.g.:
# cd /home/username/domains/yourdomain.com/public_html

# 3. Go to scripts directory
cd scripts

# 4. Make script executable (first time only)
chmod +x toggle-email-verification.sh

# 5. Run the script
./toggle-email-verification.sh disable

# 6. Verify the change
./toggle-email-verification.sh status

# 7. IMPORTANT: Clear browser cache or rebuild if needed
# For static builds, you may need to rebuild:
cd ..
npm run build  # Only if you're rebuilding on server
```

## 🔄 After Changing Settings

### For Static Builds (Recommended for Production)
If you've already built your app:

```bash
# Option 1: Rebuild the application (if you build on server)
cd /path/to/app
npm run build

# Option 2: Edit the already-built file
cd /path/to/app/dist/assets
# Find and edit the JavaScript bundle containing the config
# (This is more complex and not recommended)
```

### For Development Server
If running a dev server on your Hostinger:

```bash
# Restart the dev server
pm2 restart l2-educa-frontend
# or
npm run dev
```

### Best Practice
**Deploy with settings already configured:**
1. Change settings locally using dev-manager
2. Rebuild the application
3. Upload the new build to server

## 📁 File Locations on Hostinger

Typical Hostinger paths:

```bash
# Shared Hosting
~/public_html/
~/public_html/yourdomain.com/

# VPS/Cloud Hosting
/home/username/domains/yourdomain.com/public_html/
/var/www/html/
/var/www/yourdomain.com/

# Your config file will be at:
[base_path]/src/config/emailVerification.js

# Script location:
[base_path]/scripts/toggle-email-verification.sh
```

## 🛠️ Troubleshooting

### Issue: "Permission denied" when running script
```bash
# Solution: Make script executable
chmod +x toggle-email-verification.sh
```

### Issue: "File not found"
```bash
# Solution: Check you're in the right directory
pwd  # Shows current directory
ls -la  # List files to verify

# Navigate to correct location
cd /path/to/your/app/scripts
```

### Issue: "sed: command not found"
```bash
# Solution: Install sed (usually pre-installed)
# On CentOS/RHEL:
sudo yum install sed

# On Ubuntu/Debian:
sudo apt-get install sed
```

### Issue: Changes not visible in browser
```bash
# Solution 1: Clear browser cache
# Press Ctrl+Shift+R in browser

# Solution 2: Check if file was actually modified
cat ../src/config/emailVerification.js | grep REQUIRE_EMAIL_VERIFICATION

# Solution 3: Rebuild the application if needed
cd ..
npm run build
```

## 💡 Best Practices for Production

### 1. **Use Version Control**
```bash
# Before making changes, create backup
cp src/config/emailVerification.js src/config/emailVerification.js.backup

# Or use git
git add .
git commit -m "backup: before changing email verification settings"
```

### 2. **Test in Staging First**
```bash
# Make changes in staging environment first
ssh staging@yourserver.com
cd /path/to/staging
./scripts/toggle-email-verification.sh disable

# Test thoroughly, then apply to production
```

### 3. **Document Changes**
```bash
# Create a log entry
echo "$(date): Email verification disabled by admin" >> ~/deployment.log
```

### 4. **Automate with CI/CD**
Instead of SSH, consider setting this in your deployment pipeline:

```yaml
# GitHub Actions example
- name: Configure Email Verification
  run: |
    cd l2-educa/scripts
    ./toggle-email-verification.sh disable
```

## 🔐 Security Considerations

1. **SSH Keys:** Use SSH keys instead of passwords
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ssh-copy-id username@yourserver.com
   ```

2. **Limited Access:** Only give SSH access to trusted administrators

3. **Backup:** Always backup before making changes
   ```bash
   cp emailVerification.js emailVerification.js.$(date +%Y%m%d_%H%M%S)
   ```

4. **Audit Trail:** Log all changes
   ```bash
   # Add to your script
   echo "$(date): Config changed by $(whoami)" >> /var/log/app-changes.log
   ```

## 📊 Common Production Scenarios

### Scenario 1: Launch Day - Disable Verification Temporarily
```bash
# Quick disable for smoother launch
ssh production "cd /path/to/app/scripts && ./toggle-email-verification.sh disable"
```

### Scenario 2: Enable Verification After Testing
```bash
# Enable after confirming email system works
ssh production "cd /path/to/app/scripts && ./toggle-email-verification.sh enable"
```

### Scenario 3: Emergency Disable
```bash
# If email service is down
ssh production "cd /path/to/app/scripts && ./toggle-email-verification.sh disable"
```

## 📞 Quick Reference Card

```bash
# === QUICK COMMANDS ===

# Connect
ssh user@server.com

# Navigate
cd ~/public_html/app/scripts

# Check Status
./toggle-email-verification.sh status

# Enable
./toggle-email-verification.sh enable

# Disable
./toggle-email-verification.sh disable

# Verify Change
cat ../src/config/emailVerification.js | grep REQUIRE

# Disconnect
exit
```

## 📝 One-Line Commands

```bash
# Check status remotely (no SSH session needed)
ssh user@server.com "cd /path/to/app/scripts && ./toggle-email-verification.sh status"

# Disable remotely
ssh user@server.com "cd /path/to/app/scripts && ./toggle-email-verification.sh disable"

# Enable remotely
ssh user@server.com "cd /path/to/app/scripts && ./toggle-email-verification.sh enable"
```

---

**Last Updated:** November 8, 2025  
**Version:** 1.0.0  
**Related Files:**
- `l2-educa/scripts/toggle-email-verification.sh` (Bash script for Linux/SSH)
- `l2-educa/src/config/emailVerification.js` (Configuration file)

**Related Documentation:**
- `EMAIL_VERIFICATION_MANAGEMENT.md` (Complete guide)
- `l2-educa/scripts/README.md` (Quick start guide)

