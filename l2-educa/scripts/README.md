# 📧 Email Verification Toggle Script

## Quick Start

This script allows you to easily enable or disable email verification for the L2 EDUCA platform.

### Using Dev Manager (Easiest)

1. Run `dev-manager.bat` from project root
2. Select `[9] Advanced Options`
3. Select `[6] Email Verification Settings`
4. Choose your action

### Using PowerShell Directly

```powershell
# Disable email verification (default)
powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 disable

# Enable email verification
powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 enable

# Check current status
powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 status

# Show help
powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 help
```

## What It Does

- **Enable:** Users must verify their email before accessing the app
- **Disable:** Users can access the app immediately after registration (default)

## After Running

**Important:** Restart your frontend dev server for changes to take effect!

```bash
# Stop current server (Ctrl+C) and restart
npm run dev
```

## Documentation

For complete documentation, see: `DOCS/EMAIL_VERIFICATION_MANAGEMENT.md`

## Default Setting

By default, email verification is **DISABLED** for easier development and testing.


