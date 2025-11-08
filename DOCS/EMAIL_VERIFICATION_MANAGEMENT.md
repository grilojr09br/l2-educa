# 📧 Email Verification Management Guide

## 📋 Overview

This guide explains how to manage email verification settings in the L2 EDUCA platform. By default, **email verification is disabled**, allowing users to access the platform immediately after registration without verifying their email.

## 🎯 Quick Summary

- **Default State:** Email verification is **DISABLED** (users don't need to verify email)
- **Management Tool:** Dev Manager (option 9 → 6) or PowerShell script
- **Configuration File:** `l2-educa/src/config/emailVerification.js`
- **No UI Prompts:** With verification disabled, users won't see any verification notices or banners

## 🚀 How to Use

### Method 1: Using Dev Manager (Recommended)

1. Run `dev-manager.bat`
2. Select `[9] 🔧 Advanced Options`
3. Select `[6] 📧 Email Verification Settings`
4. Choose an option:
   - `[1]` - Enable email verification
   - `[2]` - Disable email verification (default)
   - `[3]` - Show current status
   - `[4]` - Show help
5. Restart the frontend server for changes to take effect

### Method 2: Using PowerShell Script Directly

```powershell
# Navigate to the script directory
cd l2-educa/scripts

# Enable email verification
powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 enable

# Disable email verification
powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 disable

# Check current status
powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 status
```

### Method 3: Manual Configuration

Edit `l2-educa/src/config/emailVerification.js` manually:

```javascript
export const EMAIL_VERIFICATION_CONFIG = {
  // Set to true to enable, false to disable
  REQUIRE_EMAIL_VERIFICATION: false,
  SHOW_LOGIN_NOTICE: false,
  SHOW_BANNER_WHEN_LOGGED_IN: false,
  BLOCK_ACCESS_UNTIL_VERIFIED: false,
};
```

## ⚙️ Configuration Options Explained

### `REQUIRE_EMAIL_VERIFICATION`
**Master toggle for email verification**
- `false` (default): Users can access the app without verifying email
- `true`: Email verification is required

### `SHOW_LOGIN_NOTICE`
**Show verification notice on login page after registration**
- `false` (default): No notice shown
- `true`: Notice appears on login page after user registers

### `SHOW_BANNER_WHEN_LOGGED_IN`
**Show banner at top of app for unverified users**
- `false` (default): No banner shown
- `true`: Banner appears for logged-in users with unverified email

### `BLOCK_ACCESS_UNTIL_VERIFIED`
**Block access to protected routes until email is verified**
- `false` (default): Access granted immediately
- `true`: Users must verify email before accessing protected content

## 🔄 After Changing Settings

**Important:** After changing email verification settings, you must:

1. **Save the configuration file** (if editing manually)
2. **Restart the frontend dev server**
   - Stop the current server (Ctrl+C)
   - Start it again using dev-manager or `npm run dev`
3. **Clear browser cache and localStorage** (REQUIRED!)
   - Open DevTools (F12)
   - Go to Application tab
   - Clear localStorage
   - Or use Ctrl+Shift+R for hard refresh
4. **Important:** Any users already registered may need to clear their browser cache

## 📊 Current Behavior (Verification Disabled)

When email verification is **disabled** (default):

✅ **What Users Experience:**
- Register with email and password
- **Automatically logged in** after registration (no verification screen)
- Immediately redirected to the app home page
- No verification notices or banners
- Full access to all features immediately
- Email still stored in database (can be enabled later)

❌ **What Users DON'T Experience:**
- No "verify your email" screen after registration
- No verification notices on login page
- No verification banners when logged in
- No access restrictions
- No email verification emails sent
- No redirect to verification page

## 🔐 Recommended Behavior (Verification Enabled)

When email verification is **enabled**:

✅ **What Users Experience:**
- Register with email and password
- Receive verification email
- See verification notice on login page
- See verification banner when logged in
- Must verify email to access protected content

📧 **Email Flow:**
1. User registers → Verification email sent
2. User clicks link in email → Email verified
3. User can now access all features

## 🎨 UI Components

### EmailVerificationNotice
**Location:** Login page  
**Purpose:** Informs users they need to verify email after registration  
**Visibility:** Only when `SHOW_LOGIN_NOTICE` is true

### EmailVerificationBanner
**Location:** Top of application (when logged in)  
**Purpose:** Reminds logged-in users to verify their email  
**Visibility:** Only when `SHOW_BANNER_WHEN_LOGGED_IN` is true

## 🛠️ Troubleshooting

### Changes not taking effect
**Solution:** Restart the frontend server and clear browser cache

### Script not found error
**Solution:** Ensure you're in the project root directory when running dev-manager

### PowerShell execution policy error
**Solution:** The script uses `-ExecutionPolicy Bypass`, which should work on most systems. If you still have issues, run PowerShell as Administrator.

### Configuration file not found
**Solution:** Ensure the file exists at `l2-educa/src/config/emailVerification.js`

## 🔧 Developer Notes

### Architecture
- **Configuration:** Centralized in `emailVerification.js`
- **Helper Functions:** Exported for easy component integration
- **Components:** Use helper functions to check settings
- **No Backend Changes:** Configuration is frontend-only

### Adding New Components
To respect email verification settings in new components:

```javascript
import { shouldShowVerificationBanner } from '../config/emailVerification';

// In your component
if (!shouldShowVerificationBanner()) {
  return null;
}
```

### Available Helper Functions
- `isEmailVerificationRequired()` - Check if verification is required
- `shouldShowLoginNotice()` - Check if login notice should show
- `shouldShowVerificationBanner()` - Check if banner should show
- `shouldBlockAccessUntilVerified()` - Check if access should be blocked

## 📝 Best Practices

1. **Development:** Keep verification disabled for easier testing
2. **Production:** Enable verification for security
3. **Testing:** Use the status command to verify settings before deployment
4. **Documentation:** Update team when changing verification settings

## 🎯 Common Use Cases

### Use Case 1: Local Development
**Setting:** Disabled (default)  
**Reason:** Faster testing, no email setup required

### Use Case 2: Staging Environment
**Setting:** Enabled  
**Reason:** Test email flows before production

### Use Case 3: Production
**Setting:** Enabled  
**Reason:** Verify user emails for security and communication

## 📞 Support

For issues or questions:
1. Check this documentation
2. Verify PowerShell is installed and working
3. Ensure you're in the correct directory
4. Check console for error messages
5. Verify configuration file exists and is readable

---

**Last Updated:** November 8, 2025  
**Version:** 1.0.0  
**Related Files:**
- `l2-educa/src/config/emailVerification.js`
- `l2-educa/scripts/toggle-email-verification.ps1`
- `dev-manager.bat`

