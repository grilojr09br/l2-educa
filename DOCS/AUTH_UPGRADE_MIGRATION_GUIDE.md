# 🚀 Authentication System Upgrade Migration Guide

Step-by-step guide to migrate from basic auth to enterprise-level authentication system.

---

## 📋 Overview

This upgrade includes:
- ✅ Seamless login flow (auto-detects new/existing users)
- ✅ Username OR email login support
- ✅ Production URL configuration for email confirmations
- ✅ Chat-ready profile fields (display_name, status, last_seen)
- ✅ Enhanced security and validation
- ✅ Environment variable management

**Estimated Time:** 30-45 minutes  
**Downtime Required:** No (zero-downtime deployment)  
**Rollback Time:** 5 minutes

---

## ⚠️ Pre-Migration Checklist

Before starting:
- [ ] **Backup database** (Supabase → Database → Backups → Create backup)
- [ ] **Document current .env files** (save copies)
- [ ] **Test in development first** (don't deploy to production immediately)
- [ ] **Notify users** (optional: brief maintenance window)
- [ ] **Have rollback plan ready** (see end of document)

---

## 📦 Step 1: Database Migration

### 1.1 Add Chat-Ready Profile Fields

**File:** `l2-educa-backend/scripts/enhance-profile-for-chat.sql`

**In Supabase Dashboard:**
1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in sidebar
4. Click **New Query**
5. Copy contents of `enhance-profile-for-chat.sql`
6. Paste into editor
7. Click **Run** (or press Ctrl+Enter)

**Expected output:**
```
Success. No rows returned.
```

**Verify migration:**
```sql
-- Run this in SQL Editor
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name IN ('display_name', 'status', 'last_seen', 'show_online_status');
```

**Expected:** 4 rows showing the new columns.

**If errors occur:**
- Check if columns already exist
- Check RLS policies don't conflict
- See rollback section

---

## 🔧 Step 2: Backend Updates

### 2.1 Update Code

**Pull latest code:**
```bash
cd l2-educa-backend
git pull origin main
```

**Install any new dependencies:**
```bash
npm install
```

**Build project:**
```bash
npm run build
```

**Expected:** Build succeeds without errors.

### 2.2 Update Environment Variables

**File:** `l2-educa-backend/.env`

**Add/Update these variables:**
```bash
# Production frontend URL (IMPORTANT!)
FRONTEND_URL=https://silviosuperandolimites.com.br

# Verify these are correct
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key-here
SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your-secret-here-min-32-chars

# CORS
ALLOWED_ORIGINS=https://silviosuperandolimites.com.br
```

**For Railway deployment:**
1. Go to Railway Dashboard
2. Click on your service
3. Go to **Variables** tab
4. Update `FRONTEND_URL` to `https://silviosuperandolimites.com.br`
5. Update `ALLOWED_ORIGINS` to `https://silviosuperandolimites.com.br`
6. Click **Deploy** (Railway will auto-restart)

### 2.3 Test Backend Locally

```bash
# Start backend
npm run dev

# In another terminal, test new endpoint
curl -X POST http://localhost:3001/api/auth/check-user \
  -H "Content-Type: application/json" \
  -d '{"identifier": "test@example.com"}'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "exists": false,
    "requiresRegistration": true,
    "identifierType": "email"
  }
}
```

---

## 🎨 Step 3: Frontend Updates

### 3.1 Update Code

```bash
cd l2-educa
git pull origin main
npm install
```

### 3.2 Create Environment Files

**Copy template:**
```bash
# Development
cp env.example.txt .env

# Production
cp env.example.txt .env.production
```

**Edit `.env.production`:**
```bash
# Your Railway backend URL
VITE_BACKEND_URL=https://your-backend.railway.app

# Supabase (same as backend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Production site URL (IMPORTANT!)
VITE_SITE_URL=https://silviosuperandolimites.com.br

# App config
VITE_APP_NAME=L2 EDUCA
VITE_APP_VERSION=1.0.0
VITE_ENV=production
```

### 3.3 Test Frontend Locally

```bash
# Start frontend
npm run dev

# Open browser to http://localhost:5173
```

**Test checklist:**
- [ ] Login page loads
- [ ] SeamlessLoginForm renders
- [ ] Can enter email
- [ ] Click "Continuar" works
- [ ] No console errors

### 3.4 Build for Production

```bash
npm run build
```

**Expected:**
```
✅ Environment variables loaded:
   - VITE_SUPABASE_URL: ✓
   - VITE_SUPABASE_ANON_KEY: ✓
   - VITE_BACKEND_URL: https://...
   - VITE_SITE_URL: https://silviosuperandolimites.com.br

✓ built in XXXXms
```

**If warnings about missing vars:**
- Double-check `.env.production` exists
- Ensure all VITE_ prefixed variables are set
- Rebuild after fixing

---

## 📧 Step 4: Supabase Configuration

### 4.1 Update Site URL

1. Go to Supabase Dashboard
2. **Settings** → **Authentication** → **URL Configuration**
3. **Site URL:** `https://silviosuperandolimites.com.br/l2`
   - ⚠️ **CRITICAL:** Include the `/l2` path!
4. Click **Save**

### 4.2 Update Redirect URLs

In the same section:

**Add these Redirect URLs:**
```
https://silviosuperandolimites.com.br/l2#/verify-email
https://silviosuperandolimites.com.br/l2#/reset-password
https://silviosuperandolimites.com.br/l2/
```

**IMPORTANT:** Each URL must include `/l2` before the hash (#) or trailing slash!

**Keep localhost URLs for development:**
```
http://localhost:5173/#/verify-email
http://localhost:5173/#/reset-password
http://localhost:5173/
```

*Note: You can have both production and development URLs configured.*

### 4.3 Verify Email Templates

1. **Authentication** → **Email Templates**
2. **Confirm signup** template
3. Check that `{{ .ConfirmationURL }}` variable is present
4. Optionally customize to Portuguese (see `SUPABASE_AUTH_CONFIG.md`)

### 4.4 Test Email Flow

1. Register new test account
2. Check email received
3. **CRITICAL:** Verify link points to `silviosuperandolimites.com.br/l2` (NOT localhost and MUST include `/l2`!)
4. Example correct link: `https://silviosuperandolimites.com.br/l2#/verify-email?token=...`
5. Click link, verify it redirects correctly to your site at `/l2`

---

## 🚀 Step 5: Deploy to Production

### 5.1 Deploy Backend (Railway)

**If using Railway:**
```bash
# Railway auto-deploys on git push
cd l2-educa-backend
git add .
git commit -m "Upgrade to enterprise auth system"
git push origin main
```

Railway automatically:
1. Detects push
2. Builds backend
3. Deploys with zero downtime
4. Uses environment variables you set earlier

**Monitor deployment:**
1. Railway Dashboard → Your service → **Deployments**
2. Watch logs for errors
3. Wait for "✓ Build successful"

**Verify deployment:**
```bash
# Test new endpoint
curl -X POST https://your-backend.railway.app/api/auth/check-user \
  -H "Content-Type: application/json" \
  -d '{"identifier": "test@example.com"}'
```

### 5.2 Deploy Frontend (Hostinger/Static Host)

**Build with production config:**
```bash
cd l2-educa
npm run build
```

**Upload to Hostinger:**
1. Connect via FTP (FileZilla, WinSCP, etc.)
2. Navigate to `public_html/`
3. **Backup current files** (download or rename folder)
4. Upload ALL files from `l2-educa/dist/`
5. Ensure `.htaccess` is uploaded (for SPA routing)

**Alternative: Use deployment script (if configured)**
```bash
npm run deploy:production
```

---

## ✅ Step 6: Post-Deployment Verification

### 6.1 Smoke Tests

**Test 1: New user registration**
1. Go to https://silviosuperandolimites.com.br/
2. Click Login
3. Enter new email
4. Should show registration form
5. Complete registration
6. **Check email** - verify link points to production URL
7. Click verification link
8. Should redirect to production site
9. Login with new account

**Test 2: Existing user login (email)**
1. Enter existing email
2. Should show password field only
3. Login successfully

**Test 3: Username login**
1. Enter existing username (no @)
2. Should show password field
3. Login successfully

**Test 4: Backend API**
```bash
curl https://your-backend.railway.app/api/health
```
Expected: `{"status":"ok"}`

### 6.2 Monitor for Issues

**First 24 hours:**
- Watch error logs (Railway Dashboard → Logs)
- Monitor Supabase logs (Dashboard → Logs)
- Check user reports
- Test authentication flows periodically

**Key metrics:**
- Login success rate
- Registration completion rate
- Email delivery rate
- Error rate in logs

---

## 🔄 Step 7: Update Existing Users (Optional)

If you have existing users, they may not have the new profile fields populated.

**Run this SQL to set defaults:**
```sql
-- Set default display_name for users who don't have one
UPDATE user_profiles 
SET display_name = COALESCE(full_name, 'Usuário')
WHERE display_name IS NULL;

-- Set default status
UPDATE user_profiles 
SET status = 'offline'
WHERE status IS NULL;

-- Set default last_seen
UPDATE user_profiles 
SET last_seen = NOW()
WHERE last_seen IS NULL;

-- Set default privacy setting
UPDATE user_profiles 
SET show_online_status = true
WHERE show_online_status IS NULL;
```

---

## 📚 Step 8: Update Documentation

### 8.1 Update Deployment Guides

**Edit these files:**
- `RAILWAY_DEPLOYMENT_GUIDE.md` - Add production URL config
- `SUPABASE_AUTH_CONFIG.md` - Update redirect URLs
- `README.md` - Document new features

### 8.2 Notify Team

**Inform developers:**
- New seamless login flow
- Username login support
- New environment variables required
- Profile fields added

**Inform support team:**
- Users can now login with username OR email
- New registration flow
- Email confirmation still required

---

## ⚡ Rollback Procedure

If something goes wrong, follow these steps to rollback:

### Quick Rollback (5 minutes)

**1. Revert Frontend:**
```bash
# On your hosting, restore backup folder
# OR re-upload old dist/ files
```

**2. Revert Backend (Railway):**
```bash
# Railway Dashboard → Deployments → Previous deployment → Redeploy
```

**3. Revert Supabase Config:**
- Site URL: Back to localhost or old URL
- Redirect URLs: Remove production URLs

### Database Rollback

**If you need to remove new columns:**
```sql
-- ONLY run if absolutely necessary
DROP TRIGGER IF EXISTS trigger_update_last_seen ON user_profiles;
DROP FUNCTION IF EXISTS update_last_seen_timestamp();
DROP INDEX IF EXISTS idx_user_profiles_status;
DROP INDEX IF EXISTS idx_user_profiles_last_seen;
DROP INDEX IF EXISTS idx_user_profiles_display_name;

ALTER TABLE user_profiles DROP COLUMN IF EXISTS display_name;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS status;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS last_seen;
ALTER TABLE user_profiles DROP COLUMN IF EXISTS show_online_status;
```

**⚠️ WARNING:** Dropping columns permanently deletes data!

---

## 🐛 Troubleshooting

### Issue: Email links still point to localhost

**Cause:** Supabase Site URL not updated.

**Fix:**
1. Supabase Dashboard → Settings → Authentication → URL Configuration
2. Update Site URL to `https://silviosuperandolimites.com.br`
3. Save
4. Test by requesting new verification email

### Issue: CORS errors in browser console

**Cause:** Backend ALLOWED_ORIGINS doesn't include frontend domain.

**Fix:**
1. Railway Dashboard → Variables
2. Update `ALLOWED_ORIGINS` to `https://silviosuperandolimites.com.br`
3. Redeploy

### Issue: "Missing environment variables" warning

**Cause:** `.env.production` not created or variables not set.

**Fix:**
1. Create `.env.production` from `env.example.txt`
2. Fill in all VITE_ variables
3. Rebuild: `npm run build`

### Issue: Check-user endpoint returns 404

**Cause:** Backend code not deployed or route not registered.

**Fix:**
1. Verify latest code pushed to Railway
2. Check deployment logs for build errors
3. Verify route in `l2-educa-backend/src/routes/auth.ts`

### Issue: Database migration fails

**Cause:** Columns may already exist or RLS conflict.

**Fix:**
1. Check if columns exist: `\d user_profiles` in SQL Editor
2. If exist, comment out `ALTER TABLE` commands
3. Re-run only the parts that failed

---

## 📞 Support

**Need help?**
- Check `AUTHENTICATION_TEST_CHECKLIST.md` for detailed tests
- Review `SUPABASE_AUTH_CONFIG.md` for Supabase setup
- Check Railway logs for backend errors
- Check browser console for frontend errors

**Emergency rollback:** Follow rollback procedure above.

---

## ✅ Post-Migration Checklist

After migration is complete and stable:
- [ ] All tests in `AUTHENTICATION_TEST_CHECKLIST.md` pass
- [ ] No errors in production logs
- [ ] Email confirmations work (verified link URLs)
- [ ] Users can login with both email and username
- [ ] New registrations working
- [ ] Profile editing works
- [ ] Chat-ready fields accessible
- [ ] Documentation updated
- [ ] Team notified
- [ ] Backup of working state taken

---

**Migration Version:** 1.0.0  
**Created:** November 7, 2025  
**Last Updated:** November 7, 2025

