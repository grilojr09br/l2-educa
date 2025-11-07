# 🚂 Railway Deployment Guide - L2 EDUCA Backend

Complete step-by-step guide to deploy your L2 EDUCA backend to Railway.

---

## 📋 What You Need

- ✅ GitHub account with your code pushed
- ✅ Railway account (free tier available)
- ✅ Supabase project (for database/auth)
- ✅ 10 minutes

---

## Part 1: Prepare Your Code

### **Step 1: Push Configuration Files to GitHub**

I've created Railway configuration files for you:
- `railway.json` - Main Railway config
- `nixpacks.toml` - Build configuration
- `Procfile` - Process definition

Push these to GitHub:

```bash
git add railway.json nixpacks.toml Procfile
git commit -m "Add Railway deployment configuration"
git push
```

---

## Part 2: Create Railway Account

1. **Go to Railway:** https://railway.app
2. **Click "Login"** → Choose **"Login with GitHub"**
3. **Authorize Railway** to access your GitHub repositories
4. ✅ You're logged in!

---

## Part 3: Deploy Backend to Railway

### **Step 1: Create New Project**

1. **Click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Choose your repository:** `your-username/l2-educa`
4. **Click "Deploy Now"**

Railway will start building your backend! 🚀

---

### **Step 2: Configure Environment Variables**

Railway needs your environment variables. Add them now:

1. **Click on your service** (the deployed app)
2. **Click "Variables"** tab
3. **Click "+ New Variable"** and add each one:

**Required Variables:**

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Where to get these values:**

#### **Supabase Credentials:**
1. Go to your Supabase project: https://supabase.com/dashboard
2. Go to **Settings** → **API**
3. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

#### **IMPORTANT: Production Domain Configuration**
- `FRONTEND_URL` must be set to `https://silviosuperandolimites.com.br/l2`
- **Note the `/l2` path** - this matches your deployment subdirectory
- This is critical for email confirmation links to work correctly
- Email links will redirect to this URL after verification

#### **JWT Secret:**
Generate a secure random string (min 32 characters):

```bash
# Windows PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Mac/Linux
openssl rand -base64 32

# Or use a password generator online
```

#### **CORS Origin:**
- **If using Hostinger:** `https://yourdomain.com`
- **If using Vercel:** `https://your-app.vercel.app`
- **For testing:** `http://localhost:5173`

---

### **Step 3: Get Your Backend URL**

After deployment completes:

1. **Click "Settings"** tab
2. **Find "Domains"** section
3. **Copy the Railway URL:**
   ```
   https://your-app-production.up.railway.app
   ```
4. **Save this URL** - you'll need it for frontend configuration!

---

### **Step 4: Verify Deployment**

Test if your backend is running:

```bash
# Replace with your actual Railway URL
curl https://your-app-production.up.railway.app/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "L2 EDUCA API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

✅ If you see this, your backend is live!

---

## Part 4: Configure Frontend to Use Railway Backend

Now update your frontend to point to the Railway backend:

### **Step 1: Update Frontend Environment**

Edit `l2-educa/.env.production`:

```env
# Replace with your actual Railway URL
VITE_API_URL=https://your-app-production.up.railway.app

# Your Supabase credentials (same as backend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

### **Step 2: Rebuild Frontend**

```bash
# Navigate to frontend directory
cd l2-educa

# Install dependencies (if needed)
npm install

# Build for production
npm run build
```

This creates an optimized build in `l2-educa/dist/` folder.

---

### **Step 3: Deploy Frontend to Hostinger**

1. **Connect to Hostinger via FTP:**
   - Host: `ftp.yourdomain.com`
   - Username: your FTP username
   - Password: your FTP password

2. **Upload files:**
   - Upload ALL files from `l2-educa/dist/` to `public_html/`
   - ⚠️ Make sure to upload the `.htaccess` file too!

3. **Create `.htaccess` file** (if not exists) in `public_html/`:

```apache
# Enable Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect HTTP to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # SPA Routing - redirect all requests to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

---

### **Step 4: Update CORS on Railway**

Go back to Railway and update the `CORS_ORIGIN` variable:

1. **Railway Dashboard** → Your service → **Variables**
2. **Find `CORS_ORIGIN`** → Click edit
3. **Update to your domain:**
   ```
   https://yourdomain.com
   ```
4. **Click "Deploy"** to restart with new config

---

## Part 5: Configure Supabase for Production

**CRITICAL STEP** - Email confirmations won't work without this!

### **Update Supabase URLs**

1. Go to Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Go to **Settings** → **Authentication** → **URL Configuration**

4. **Site URL:** Enter `https://silviosuperandolimites.com.br/l2`
   - ⚠️ **CRITICAL:** Include the `/l2` path!

5. **Redirect URLs:** Add these:
   ```
   https://silviosuperandolimites.com.br/l2#/verify-email
   https://silviosuperandolimites.com.br/l2#/reset-password
   https://silviosuperandolimites.com.br/l2/
   ```
   - ⚠️ **Note:** Each URL must include `/l2` before the hash or trailing slash

6. Click **Save**

7. **Verify:** Register a test account and check that the verification email links point to `silviosuperandolimites.com.br/l2` (NOT localhost and MUST include /l2!)

---

## Part 6: Test Complete Setup

### **Test 1: Backend Health Check**

```bash
curl https://your-app-production.up.railway.app/api/health
```

✅ Should return: `{"status":"ok"}`

---

### **Test 2: Frontend Loading**

1. Open your website: `https://silviosuperandolimites.com.br/l2`
2. Open browser console (F12)
3. Check for errors
4. ✅ Should load without CORS errors

---

### **Test 3: Seamless Login Flow**

1. Go to login page
2. Enter a new email (not registered yet)
3. Click "Continuar"
4. ✅ Should show registration form (username, password fields)

5. Fill in details and create account
6. ✅ Should show "Conta Criada!" message

### **Test 4: Email Verification (CRITICAL)**

1. Check your email inbox (and spam!)
2. ✅ Verification email received
3. **CHECK THE LINK:** Should be `https://silviosuperandolimites.com.br/l2#/verify-email?token=...`
4. ✅ **MUST include `/l2` in the path!**
5. ✅ **NOT localhost!**
6. Click the link
7. ✅ Should redirect to your production site at `/l2`
8. ✅ Should show "Email verificado com sucesso!"

### **Test 5: Login with Email/Username**

1. Try logging in with your email
2. ✅ Should work
3. Logout
4. Try logging in with your username (without @)
5. ✅ Should also work!

### **Test 6: Profile & Avatar**

1. Go to profile page
2. Edit your profile
3. Upload an avatar
4. ✅ Everything should save correctly

---

## 🎯 Quick Reference

### **Your URLs:**

```
Backend (Railway):  https://your-app-production.up.railway.app
Frontend (Hostinger): https://yourdomain.com
Supabase:            https://your-project.supabase.co
```

### **Key Files:**

```
Configuration:
  - railway.json       → Railway build config
  - nixpacks.toml      → Nixpacks build config
  - Procfile           → Process definition

Frontend:
  - l2-educa/.env.production → Production environment variables
  - l2-educa/dist/           → Built files (upload to Hostinger)

Backend:
  - l2-educa-backend/.env    → Backend environment (DO NOT commit!)
```

---

## 🔧 Common Issues & Solutions

### **Problem: "Application failed to respond"**

**Cause:** Backend not starting properly.

**Solution:**
```bash
# Check Railway logs
# Railway Dashboard → Your service → "Deployments" tab → Click latest deployment → "View Logs"

# Common issues:
# - Missing environment variables
# - PORT not set correctly
# - Build failed
```

---

### **Problem: CORS errors in browser**

**Cause:** `CORS_ORIGIN` doesn't match frontend domain.

**Solution:**
1. Check `CORS_ORIGIN` in Railway variables
2. Make sure it matches your frontend domain EXACTLY
3. Include `https://` prefix
4. No trailing slash

```env
# ✅ Correct
CORS_ORIGIN=https://yourdomain.com

# ❌ Wrong
CORS_ORIGIN=yourdomain.com
CORS_ORIGIN=https://yourdomain.com/
```

---

### **Problem: "Cannot connect to backend"**

**Cause:** Frontend environment variables not set correctly.

**Solution:**
1. Check `l2-educa/.env.production`
2. Verify `VITE_API_URL` points to Railway URL
3. Rebuild frontend: `npm run build`
4. Re-upload to Hostinger

---

### **Problem: Images not uploading**

**Cause:** Supabase bucket not configured.

**Solution:**
1. Run SQL scripts in Supabase SQL Editor:
   - `l2-educa-backend/scripts/setup-avatar-storage.sql`
2. Verify bucket exists: Supabase → Storage → "avatars" bucket
3. Check RLS policies are enabled

---

### **Problem: Login works but data doesn't save**

**Cause:** Database tables or RLS policies not set up.

**Solution:**
1. Run SQL scripts in Supabase:
   - `setup-avatar-storage.sql`
   - `setup-username-changes.sql`
   - `fix-avatar-rls-policy.sql`
2. Verify tables exist: Supabase → Table Editor

---

### **Problem: Build fails on Railway**

**Cause:** TypeScript errors or missing dependencies.

**Solution:**
```bash
# Test build locally first
cd l2-educa-backend
npm install
npm run build

# Fix any TypeScript errors
# Then commit and push
git add .
git commit -m "Fix build errors"
git push
```

Railway auto-deploys on every push!

---

## 🚀 Auto-Deploy Workflow

Once set up, your deployment is automatic:

```bash
# 1. Make changes to your code
# 2. Commit and push to GitHub
git add .
git commit -m "Add new feature"
git push

# 3. Railway automatically:
#    ✅ Detects the push
#    ✅ Builds the backend
#    ✅ Deploys to production
#    ✅ Zero downtime!

# 4. For frontend changes:
cd l2-educa
npm run build

# 5. Upload dist/ to Hostinger via FTP
```

---

## 💰 Railway Pricing

**Free Tier:**
- ✅ $5 in credits per month (no credit card required)
- ✅ Enough for ~500 hours of runtime
- ✅ Perfect for development and small projects

**If you exceed free tier:**
- Pay-as-you-go: ~$0.000231/GB-hr
- Typical cost: $5-15/month for production apps

**Pro Tier ($20/month):**
- ✅ $20 in credits included
- ✅ Priority support
- ✅ More resources

---

## 📊 Monitoring Your App

### **View Logs:**
1. Railway Dashboard → Your service
2. Click "Deployments" tab
3. Click on latest deployment
4. "View Logs"

### **Check Metrics:**
1. Railway Dashboard → Your service
2. Click "Metrics" tab
3. See CPU, Memory, Network usage

### **Set Up Alerts:**
1. Railway Dashboard → Project Settings
2. "Notifications"
3. Add webhook or email alerts

---

## 🎉 You're Done!

Your L2 EDUCA platform is now live with:

- ✅ **Backend on Railway** - Auto-scaling, auto-deploy
- ✅ **Frontend on Hostinger** - Fast static hosting
- ✅ **Database on Supabase** - Managed PostgreSQL
- ✅ **Auth on Supabase** - Secure authentication
- ✅ **Storage on Supabase** - Avatar uploads

**Total Monthly Cost:**
- Railway: $0-5 (free tier)
- Hostinger: Your existing plan
- Supabase: $0 (free tier)
- **Total: $0-5/month!** 🎯

---

## 📚 Next Steps

1. ✅ Set up custom domain on Railway (optional)
2. ✅ Configure SSL certificates
3. ✅ Set up monitoring/alerts
4. ✅ Add staging environment
5. ✅ Configure backup strategy

**Need help with any of these?** Just ask! 🚀

