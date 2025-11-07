# 🔑 API Key Management Guide - L2 EDUCA

Complete guide to managing API keys securely for your deployment.

---

## 📊 Quick Reference: What's Secret vs Public

| Key | Location | Visibility | Security Level |
|-----|----------|------------|----------------|
| `SUPABASE_SERVICE_KEY` | Backend only | ⚠️ SECRET | Admin access - NEVER expose |
| `JWT_SECRET` | Backend only | ⚠️ SECRET | Signs tokens - NEVER expose |
| `SUPABASE_ANON_KEY` | Frontend + Backend | ✅ PUBLIC | Safe (protected by RLS) |
| `SUPABASE_URL` | Frontend + Backend | ✅ PUBLIC | Safe |
| `VITE_BACKEND_URL` | Frontend | ✅ PUBLIC | Safe |

---

## 🏗️ Current Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Frontend (Hostinger)                                        │
│ https://silviosuperandolimites.com.br/l2                   │
│                                                             │
│ Environment Variables (embedded in build):                 │
│ • VITE_SUPABASE_URL ────────────┐                         │
│ • VITE_SUPABASE_ANON_KEY ───────┼─→ ✅ Safe to expose    │
│ • VITE_BACKEND_URL ─────────────┤   (Protected by RLS)    │
│ • VITE_SITE_URL ────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ API Calls
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ Backend (Railway)                                           │
│ https://your-backend.railway.app                           │
│                                                             │
│ Environment Variables (runtime, secure):                   │
│ • SUPABASE_SERVICE_KEY ─────────┐                         │
│ • JWT_SECRET ───────────────────┼─→ ⚠️ MUST STAY SECRET  │
│ • SUPABASE_URL ─────────────────┤                         │
│ • SUPABASE_ANON_KEY ────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                    │
                    │ Admin API
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ Supabase Database                                           │
│                                                             │
│ Protected by:                                               │
│ • Row Level Security (RLS) policies                        │
│ • Authentication required for operations                   │
│ • Rate limiting                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security Model

### Why Frontend Keys Are Safe

**The Supabase Anon Key is designed to be public because:**

1. **RLS (Row Level Security) protects everything**
   ```sql
   -- Example: Users can only read their own data
   CREATE POLICY "Users can read own data" 
   ON users FOR SELECT 
   USING (auth.uid() = id);
   ```

2. **Authentication is required**
   - Users must login to access data
   - JWT tokens verify identity
   - Tokens are signed by your backend

3. **Rate limiting prevents abuse**
   - Supabase has built-in rate limits
   - Your backend adds additional limits
   - IP-based throttling

**With just the anon key, an attacker can:**
- ❌ Cannot read other users' data (RLS blocks it)
- ❌ Cannot modify other users' data (RLS blocks it)
- ❌ Cannot delete data (needs authentication + RLS)
- ❌ Cannot bypass authentication (JWT required)
- ✅ Can create an account (that's the point!)
- ✅ Can login with valid credentials (that's the point!)

---

## 📋 Step-by-Step: Setting Up Your Keys

### 1. Get Your Supabase Keys

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy these keys:

```bash
# Project URL
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# anon / public
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# ↑ This key is safe to expose in frontend

# service_role (shows with warning icon ⚠️)
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# ↑ This key is ADMIN - NEVER expose in frontend!
```

### 2. Generate JWT Secret

**Option A: PowerShell (Windows)**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 40 | % {[char]$_})
```

**Option B: Linux/Mac**
```bash
openssl rand -base64 32
```

**Option C: Online** (use reputable sites like https://1password.com/password-generator/)
- Select "Random Password"
- At least 32 characters
- Include letters, numbers, symbols

### 3. Backend Environment (Railway)

**Railway Dashboard → Your Service → Variables → Add Variable:**

```bash
NODE_ENV=production
PORT=3001

# Supabase
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...

# JWT
JWT_SECRET=your-40-character-random-string-here
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=https://silviosuperandolimites.com.br/l2

# CORS
ALLOWED_ORIGINS=https://silviosuperandolimites.com.br
```

**After adding all variables:**
- Click **Deploy** button
- Railway will restart with new environment

### 4. Frontend Environment (.env.production)

**Create file:** `l2-educa/.env.production`

```bash
# Backend API
VITE_BACKEND_URL=https://your-backend-name.railway.app

# Supabase (same URL and anon key as backend)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...

# Site Configuration
VITE_SITE_URL=https://silviosuperandolimites.com.br/l2
VITE_APP_NAME=L2 EDUCA
VITE_APP_VERSION=1.0.0
VITE_ENV=production
```

**⚠️ IMPORTANT:**
- File must be named exactly `.env.production`
- Must be in `l2-educa/` directory (same level as `package.json`)
- Never commit this file to git!

### 5. Verify .gitignore

Ensure `l2-educa/.gitignore` contains:

```
# Environment files
.env
.env.local
.env.production
.env.production.local
.env.*.local
```

---

## 🧪 Testing Your Setup

### Test 1: Build with Logging

```bash
cd l2-educa
npm run build
```

**Expected output:**
```
🔧 Build Mode: production
📁 Looking for: .env.production

✅ Environment variables status:
   - VITE_SUPABASE_URL: ✓ Loaded
   - VITE_SUPABASE_ANON_KEY: ✓ Loaded
   - VITE_BACKEND_URL: ✓ Loaded
   - VITE_SITE_URL: ✓ Loaded

🔗 Supabase URL: https://xxxxx.supabase.co
🌐 Site URL: https://silviosuperandolimites.com.br/l2

✓ built in 12.34s
```

**If you see `✗ Missing`:**
- Check `.env.production` exists
- Check it's in the correct directory
- Check variable names start with `VITE_`
- Check for typos

### Test 2: Inspect Built Files

```bash
# Check if variables are in the build
grep -r "supabase.co" l2-educa/dist/assets/

# You should see your Supabase URL in the JavaScript files
# This is normal and expected!
```

### Test 3: Browser Console

After deploying:
1. Open https://silviosuperandolimites.com.br/l2
2. Open DevTools (F12)
3. Console tab
4. Type: `import.meta.env`

**You should see:**
```javascript
{
  VITE_SUPABASE_URL: "https://xxxxx.supabase.co",
  VITE_SUPABASE_ANON_KEY: "eyJhbG...",
  VITE_BACKEND_URL: "https://...",
  VITE_SITE_URL: "https://silviosuperandolimites.com.br/l2"
}
```

✅ This is OK! These keys are meant to be visible.

---

## 🔄 Key Rotation (When to Change Keys)

### When to Rotate:

1. **Immediately:**
   - Service key was accidentally exposed
   - JWT secret was compromised
   - Suspicious activity detected

2. **Periodically (every 6-12 months):**
   - JWT_SECRET
   - SUPABASE_SERVICE_KEY (if possible)

3. **Never need to rotate:**
   - SUPABASE_ANON_KEY (unless project compromised)
   - SUPABASE_URL (stays the same)

### How to Rotate:

**Backend Keys (Railway):**
1. Generate new key
2. Update Railway variable
3. Click Deploy
4. Test immediately
5. Old key stops working instantly

**Frontend Keys:**
1. Update `.env.production`
2. Rebuild: `npm run build`
3. Upload new `dist/` to Hostinger
4. Test immediately

---

## 🐛 Troubleshooting

### Problem: "Missing environment variables" during build

**Cause:** `.env.production` not found or wrong location

**Solution:**
```bash
# Check if file exists
ls -la l2-educa/.env.production

# If missing, create it
cp l2-educa/env.example.txt l2-educa/.env.production
# Then edit with your real values

# Verify it's being used
cd l2-educa
npm run build
# Look for "📁 Looking for: .env.production" in output
```

### Problem: Keys work locally but not in production

**Cause:** Using `.env` (dev) instead of `.env.production`

**Solution:**
```bash
# Make sure .env.production exists
# Build explicitly for production
npm run build -- --mode production
```

### Problem: "Supabase client not initialized"

**Cause:** Keys not embedded in build

**Solution:**
1. Verify `.env.production` has all VITE_ variables
2. Rebuild: `npm run build`
3. Check build output for "✓ Loaded"
4. Re-upload `dist/` to Hostinger

### Problem: CORS errors in production

**Cause:** Backend `ALLOWED_ORIGINS` doesn't include your domain

**Solution:**
```bash
# Railway → Variables → Update:
ALLOWED_ORIGINS=https://silviosuperandolimites.com.br

# Then click Deploy
```

---

## 📚 Best Practices Checklist

- [ ] `.env.production` exists and has all required variables
- [ ] `.env*` files are in `.gitignore`
- [ ] Backend uses Railway environment variables
- [ ] `SUPABASE_SERVICE_KEY` only in backend
- [ ] `JWT_SECRET` only in backend
- [ ] Frontend only uses `VITE_` prefixed variables
- [ ] Build output shows "✓ Loaded" for all variables
- [ ] Keys stored in password manager (backup)
- [ ] Different keys for development vs production
- [ ] RLS policies active on all tables
- [ ] Rate limiting enabled

---

## 🆘 Need Help?

**Check build output:**
```bash
npm run build 2>&1 | grep -A 20 "Environment variables"
```

**Verify file location:**
```bash
# Should be in same directory as package.json
ls -la l2-educa/ | grep env
```

**Test environment variables:**
```bash
# In l2-educa directory
node -e "console.log(process.env.VITE_SUPABASE_URL)"
# Should print your URL
```

---

**Last Updated:** November 7, 2025  
**Your Setup:** Hostinger (frontend) + Railway (backend) + Supabase

