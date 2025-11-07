# 🚀 Supabase Configuration - Quick Reference

## Your Production URLs (Copy-Paste Ready)

### 📍 Important: Your site is at `/l2` subdirectory!
All URLs MUST include `/l2` in the path.

---

## 1. Supabase Dashboard Configuration

Go to: https://app.supabase.com → Your Project → **Settings** → **Authentication** → **URL Configuration**

### Site URL
```
https://silviosuperandolimites.com.br/l2
```

### Redirect URLs (Add all three)
```
https://silviosuperandolimites.com.br/l2#/verify-email
https://silviosuperandolimites.com.br/l2#/reset-password
https://silviosuperandolimites.com.br/l2/
```

---

## 2. Backend Environment Variables (Railway)

Set these in Railway Dashboard → Your Service → **Variables**:

```bash
FRONTEND_URL=https://silviosuperandolimites.com.br/l2
ALLOWED_ORIGINS=https://silviosuperandolimites.com.br
```

**Note:** 
- `FRONTEND_URL` includes `/l2` (for email redirects)
- `ALLOWED_ORIGINS` is just the domain (for CORS)

---

## 3. Frontend Environment (.env.production)

Create file `l2-educa/.env.production` with:

```bash
VITE_SITE_URL=https://silviosuperandolimites.com.br/l2
VITE_BACKEND_URL=https://your-backend-url.railway.app
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 4. Fixed SQL Migration Script

The script has been fixed to avoid the "IF NOT EXISTS" error with policies.

Run in Supabase SQL Editor:
- File: `l2-educa-backend/scripts/enhance-profile-for-chat.sql`
- The script now uses `DROP POLICY IF EXISTS` before creating policies

---

## ✅ Verification Checklist

After configuration:

1. **Test Email Links:**
   - Register a test account
   - Check email
   - Verify link format: `https://silviosuperandolimites.com.br/l2#/verify-email?token=...`
   - ✅ Must include `/l2` in path!
   - ✅ Must NOT be localhost!

2. **Test Login:**
   - Go to: `https://silviosuperandolimites.com.br/l2`
   - Try login with email
   - Try login with username
   - ✅ Both should work

3. **Check Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - ✅ No CORS errors
   - ✅ No 404 errors

---

## 🐛 Common Mistakes to Avoid

❌ **WRONG:** `https://silviosuperandolimites.com.br/#/verify-email`
✅ **CORRECT:** `https://silviosuperandolimites.com.br/l2#/verify-email`

❌ **WRONG:** Site URL without `/l2`
✅ **CORRECT:** Site URL with `/l2`

❌ **WRONG:** Using `CREATE POLICY IF NOT EXISTS`
✅ **CORRECT:** Using `DROP POLICY IF EXISTS` then `CREATE POLICY`

---

## 📝 Why `/l2`?

Your `vite.config.js` has:
```javascript
base: '/l2/'
```

This means your app is deployed in a subdirectory, not at the root. All URLs must match this configuration.

---

## 🆘 Still Having Issues?

### Email links go to localhost
→ Check Supabase Site URL includes `/l2`

### Email links missing `/l2`
→ Check all redirect URLs in Supabase include `/l2`

### CORS errors
→ Check Railway `ALLOWED_ORIGINS` is set to domain (without `/l2`)

### SQL policy error
→ Use the updated script with `DROP POLICY IF EXISTS`

---

**Last Updated:** November 7, 2025  
**Your Domain:** https://silviosuperandolimites.com.br/l2

