# 🚀 L2 EDUCA - Production Deployment Guide

Complete step-by-step guide to build and deploy your application.

---

## 📋 Prerequisites Checklist

Before building, ensure you have:
- [ ] Node.js installed (v18 or higher)
- [ ] NPM installed
- [ ] Supabase project set up
- [ ] Production domain/server ready
- [ ] SSL certificate (for HTTPS)

---

## 🔧 Step 1: Configure Environment Files

### Backend Environment (`.env`)

**Location:** `l2-educa-backend/.env`

```bash
# === Production Environment ===
NODE_ENV=production

# Server Configuration
PORT=3001

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-production
JWT_EXPIRES_IN=7d

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# CORS - Add your production domain
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting (requests per 15 minutes)
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=5

# Security
SESSION_TIMEOUT=3600000
BCRYPT_ROUNDS=12
```

**⚠️ Important Notes:**
- `JWT_SECRET` - Must be at least 32 characters, use a random string
- `SUPABASE_SERVICE_KEY` - Found in Supabase Dashboard → Settings → API
- `ALLOWED_ORIGINS` - Your production domain(s) only
- **NEVER commit `.env` to git!**

---

### Frontend Environment (`.env`)

**Location:** `l2-educa/.env`

```bash
# === Production Environment ===

# Backend API URL (your production backend)
VITE_BACKEND_URL=https://api.yourdomain.com

# Supabase Configuration (same as backend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_NAME=L2 EDUCA
VITE_APP_VERSION=1.0.0

# Environment
VITE_ENV=production
```

**⚠️ Important Notes:**
- `VITE_BACKEND_URL` - Your deployed backend URL
- Must use `VITE_` prefix (Vite requirement)
- These values are embedded in the build (not secret!)

---

## 🏗️ Step 2: Build Production Files

### Option A: Using Dev Manager (Easiest)

```batch
# Run the dev manager
dev-manager.bat

# Select option 4 or 5:
# [4] Build Production
# [5] Build and Zip Distribution
```

### Option B: Manual Build

**1. Build Backend:**
```bash
cd l2-educa-backend
npm install --production
npm run build
```

**Output:** `l2-educa-backend/dist/`

**2. Build Frontend:**
```bash
cd l2-educa
npm install
npm run build
```

**Output:** `l2-educa/dist/`

---

## 📦 Step 3: What Gets Built

### Backend Build Output (`l2-educa-backend/dist/`)

```
dist/
├── server.js          # Main server entry
├── app.js             # Express app
├── config/            # Configuration files
├── controllers/       # API controllers
├── middleware/        # Auth, rate limiting, etc.
├── routes/            # API routes
├── services/          # Business logic
├── types/             # TypeScript type definitions
└── utils/             # Utilities
```

### Frontend Build Output (`l2-educa/dist/`)

```
dist/
├── index.html         # Main HTML (entry point)
├── assets/
│   ├── index-[hash].js    # Bundled JavaScript
│   ├── index-[hash].css   # Bundled CSS
│   └── [images/fonts]     # Static assets
├── favicon.ico
└── manifest.json
```

---

## 🗄️ Step 4: Database Setup

Run these SQL scripts in **Supabase Dashboard → SQL Editor:**

### 1. Avatar Storage Setup
```bash
# File: l2-educa-backend/scripts/setup-avatar-storage.sql
```
Creates `avatars` bucket and RLS policies.

### 2. Username Change Tracking
```bash
# File: l2-educa-backend/scripts/setup-username-changes.sql
```
Adds username change tracking with rate limits.

### 3. Fix Avatar RLS (if needed)
```bash
# File: l2-educa-backend/scripts/fix-avatar-rls-policy.sql
```
Simplifies avatar upload security.

**Run Order:** 1 → 2 → 3

---

## 🌐 Step 5: Deploy Backend

### Option A: Node.js Server (VPS/Dedicated)

**1. Upload files to server:**
```bash
# Upload dist/ folder and package.json
scp -r l2-educa-backend/dist/* user@server:/var/www/backend/
scp l2-educa-backend/package.json user@server:/var/www/backend/
scp l2-educa-backend/.env user@server:/var/www/backend/
```

**2. Install dependencies on server:**
```bash
ssh user@server
cd /var/www/backend
npm install --production
```

**3. Start with PM2 (Process Manager):**
```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start dist/server.js --name "l2-educa-backend"

# Auto-restart on boot
pm2 startup
pm2 save

# Monitor
pm2 logs l2-educa-backend
pm2 status
```

**4. Configure Nginx (Reverse Proxy):**
```nginx
# /etc/nginx/sites-available/l2-educa-backend

server {
    listen 80;
    server_name api.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;
    
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/l2-educa-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Option B: Platform as a Service (Heroku, Railway, etc.)

**Heroku Example:**
```bash
# In l2-educa-backend directory
heroku create l2-educa-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set SUPABASE_URL=your-url
# ... etc

# Deploy
git subtree push --prefix l2-educa-backend heroku main
```

---

## 🎨 Step 6: Deploy Frontend

### Option A: Static Hosting (Netlify, Vercel, Cloudflare Pages)

**Netlify Example:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd l2-educa/dist
netlify deploy --prod
```

**Configuration File (netlify.toml):**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option B: Traditional Web Server (Nginx)

**1. Upload dist files:**
```bash
scp -r l2-educa/dist/* user@server:/var/www/html/l2-educa/
```

**2. Configure Nginx:**
```nginx
# /etc/nginx/sites-available/l2-educa-frontend

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;
    
    root /var/www/html/l2-educa;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable and reload:
```bash
sudo ln -s /etc/nginx/sites-available/l2-educa-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Step 7: Post-Deployment Verification

### Backend Health Check
```bash
curl https://api.yourdomain.com/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2025-11-07T...",
  "environment": "production",
  "version": "1.0.0"
}
```

### Frontend Check
```bash
curl https://yourdomain.com

# Should return HTML with <title>L2 EDUCA</title>
```

### Test API Connection
1. Open frontend: https://yourdomain.com
2. Try to register/login
3. Check browser console for errors
4. Test avatar upload
5. Test username change

---

## 🔒 Security Checklist

Before going live:

- [ ] `.env` files NOT in git
- [ ] Strong JWT secret (32+ chars)
- [ ] HTTPS enabled (SSL certificates)
- [ ] CORS configured (only your domain)
- [ ] Rate limiting enabled
- [ ] Supabase RLS policies active
- [ ] Database backups configured
- [ ] Monitoring set up (PM2, logs)
- [ ] Firewall configured (only ports 80, 443, 22)
- [ ] Regular updates scheduled

---

## 📊 Monitoring & Maintenance

### PM2 Commands
```bash
pm2 status                    # Check status
pm2 logs l2-educa-backend     # View logs
pm2 restart l2-educa-backend  # Restart app
pm2 stop l2-educa-backend     # Stop app
pm2 delete l2-educa-backend   # Remove from PM2
```

### Log Files
```bash
# PM2 logs
~/.pm2/logs/

# Nginx logs
/var/log/nginx/access.log
/var/log/nginx/error.log

# Check logs
tail -f ~/.pm2/logs/l2-educa-backend-out.log
tail -f ~/.pm2/logs/l2-educa-backend-error.log
```

### Backups
```bash
# Database backups (Supabase has automatic backups)
# Manual backup via Supabase Dashboard → Database → Backups

# File backups
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/
```

---

## 🔄 Update Procedure

When updating the app:

```bash
# 1. Build new version locally
dev-manager.bat → [4] Build Production

# 2. Backup current version
ssh user@server
cp -r /var/www/backend /var/www/backend.backup

# 3. Upload new files
scp -r dist/* user@server:/var/www/backend/dist/

# 4. Restart
pm2 restart l2-educa-backend

# 5. Verify
curl https://api.yourdomain.com/health

# 6. Rollback if needed
mv /var/www/backend.backup /var/www/backend
pm2 restart l2-educa-backend
```

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check logs
pm2 logs l2-educa-backend

# Common issues:
# - Wrong .env values
# - Port 3001 in use
# - Missing dependencies

# Fix:
cd /var/www/backend
npm install --production
pm2 restart l2-educa-backend
```

### Frontend shows blank page
```bash
# Check:
# 1. VITE_BACKEND_URL in .env is correct
# 2. CORS allows your frontend domain
# 3. Browser console for errors

# Rebuild with correct .env:
cd l2-educa
npm run build
# Re-upload dist/
```

### CORS errors
```bash
# Backend .env must include:
ALLOWED_ORIGINS=https://yourdomain.com

# Restart backend after changing
pm2 restart l2-educa-backend
```

---

## 📞 Quick Reference

| Component | Location | Port | URL |
|-----------|----------|------|-----|
| Backend Dev | localhost | 3001 | http://localhost:3001 |
| Frontend Dev | localhost | 5173 | http://localhost:5173 |
| Backend Prod | Your server | 3001 | https://api.yourdomain.com |
| Frontend Prod | Your server | 80/443 | https://yourdomain.com |

---

## ✅ Deployment Complete!

Your L2 EDUCA platform is now live! 🎉

**Next Steps:**
1. Monitor logs for first 24 hours
2. Test all features thoroughly
3. Set up automated backups
4. Configure monitoring/alerts
5. Document your specific setup

**Support:**
- Check logs first
- Review this guide
- Test in dev environment first
- Keep backups before changes

---

**Last Updated:** November 2025  
**Version:** 1.0.0

