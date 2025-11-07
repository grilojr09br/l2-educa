# 🚀 L2 EDUCA - Hostinger Deployment Guide

Complete step-by-step guide to deploy your L2 EDUCA application on Hostinger.

---

## 📋 Prerequisites

### What You Need:
- ✅ Hostinger VPS or Business hosting plan (with SSH access)
- ✅ Domain name configured
- ✅ Supabase project set up and running
- ✅ Production build ready (`dist/` folder)

### Required Hostinger Features:
- SSH/Terminal access
- Node.js support (v18+ recommended)
- Ability to run background processes (PM2)
- Web server (Apache/Nginx)

---

## 🎯 Step-by-Step Deployment

### **Step 1: Connect to Your Server via SSH**

```bash
ssh your-username@your-server-ip
```

Or use Hostinger's built-in terminal (hPanel → Advanced → Terminal)

---

### **Step 2: Install Node.js (if not installed)**

Check if Node.js is installed:
```bash
node --version
npm --version
```

If not installed, install Node.js 20.x:

```bash
# For Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

---

### **Step 3: Upload Your Backend Files**

#### Option A: Using SFTP/FTP Client (FileZilla, WinSCP)
1. Connect to your server using SFTP
2. Navigate to `/home/your-username/` (or wherever you want)
3. Create a folder: `l2-educa-backend`
4. Upload the entire contents of `dist/backend/` into this folder

#### Option B: Using Git (Recommended)
```bash
# On your server
cd /home/your-username/
git clone your-repository-url
cd your-repository-name/dist/backend
```

#### Option C: Using SCP from your local machine
```bash
# From your local machine (in project root)
scp -r dist/backend your-username@your-server-ip:/home/your-username/l2-educa-backend
```

**Your backend structure should look like:**
```
/home/your-username/l2-educa-backend/
├── dist/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── types/
│   └── utils/
├── package.json
├── package-lock.json
└── .env.example
```

---

### **Step 4: Install Backend Dependencies**

```bash
cd /home/your-username/l2-educa-backend
npm install --production
```

This will install only production dependencies (no dev tools).

---

### **Step 5: Configure Environment Variables**

Create your `.env` file:
```bash
nano .env
```

Add your production configuration:
```env
# Node Environment
NODE_ENV=production

# Server Configuration
PORT=3001
HOST=0.0.0.0

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-role-key

# CORS - Allow your frontend domain
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**🔐 Important Security Tips:**
- Generate a strong JWT_SECRET: `openssl rand -base64 32`
- Never commit `.env` to Git
- Keep your Supabase service key private

Save and exit (Ctrl+X, then Y, then Enter)

---

### **Step 6: Set Up PM2 (Process Manager)**

PM2 keeps your Node.js app running 24/7 and restarts it automatically if it crashes.

#### Install PM2 globally:
```bash
npm install -g pm2
```

#### Start your backend with PM2:
```bash
cd /home/your-username/l2-educa-backend
pm2 start dist/app.js --name "l2-educa-backend"
```

#### Configure PM2 to start on server reboot:
```bash
pm2 save
pm2 startup
# Follow the command that PM2 outputs
```

#### Useful PM2 Commands:
```bash
# View app status
pm2 status

# View logs (very useful for debugging!)
pm2 logs l2-educa-backend

# Restart the app
pm2 restart l2-educa-backend

# Stop the app
pm2 stop l2-educa-backend

# Delete from PM2
pm2 delete l2-educa-backend

# Monitor in real-time
pm2 monit
```

---

### **Step 7: Upload Frontend Files**

Your frontend goes in your domain's public directory (usually `public_html` or `www`).

#### Find your public directory:
```bash
# Usually one of these:
/home/your-username/public_html/
/home/your-username/domains/yourdomain.com/public_html/
/var/www/html/
```

#### Upload frontend files:

**Option A: Using SFTP/FTP**
1. Upload all contents from `dist/frontend/` to your public_html folder
2. Make sure `index.html` is in the root

**Option B: Using command line**
```bash
# On server
cd /home/your-username/public_html
# Remove default files
rm -rf *
# Upload your frontend (from local machine using scp)
```

**Your frontend structure:**
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── sw.js (service worker)
└── favicon.ico
```

---

### **Step 8: Configure Web Server**

#### **For Apache (Default on most Hostinger plans)**

Create/edit `.htaccess` in your `public_html`:

```bash
nano /home/your-username/public_html/.htaccess
```

Add this configuration:

```apache
# Enable Rewrite Engine
RewriteEngine On

# API Proxy - Forward /api requests to Node.js backend
RewriteCond %{REQUEST_URI} ^/api/(.*)$ [NC]
RewriteRule ^api/(.*)$ http://localhost:3001/api/$1 [P,L]

# SPA Routing - All other requests go to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security Headers
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Enable Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/json "access plus 0 seconds"
</IfModule>
```

**Enable required Apache modules** (may require support ticket):
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```

#### **For Nginx**

If using Nginx, create/edit config:

```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Frontend - Serve static files
    root /home/your-username/public_html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # API Proxy - Forward to Node.js backend
    location /api/ {
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

    # SPA routing - All other requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

### **Step 9: Set Up SSL Certificate (HTTPS)**

**Using Let's Encrypt (Free SSL):**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache  # For Apache
# OR
sudo apt install certbot python3-certbot-nginx   # For Nginx

# Get certificate
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
# OR
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (certbot sets this up automatically, but verify)
sudo certbot renew --dry-run
```

**Using Hostinger's SSL (in hPanel):**
1. Go to hPanel → SSL
2. Install SSL for your domain
3. Force HTTPS redirect

---

### **Step 10: Set Up Supabase Database**

Run these SQL scripts in Supabase SQL Editor (in order):

1. **`l2-educa-backend/scripts/setup-avatar-storage.sql`**
   - Creates avatars bucket
   - Sets up RLS policies

2. **`l2-educa-backend/scripts/setup-username-changes.sql`**
   - Adds username functionality
   - Creates rate limiting tables

3. **`l2-educa-backend/scripts/fix-avatar-rls-policy.sql`**
   - Fixes any RLS issues (if needed)

---

### **Step 11: Update Frontend Configuration**

Your frontend may have environment variables. If using Vite, check if you need to rebuild with production URLs.

If needed, update `.env` in your frontend source:
```env
VITE_BACKEND_URL=https://yourdomain.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then rebuild and re-upload frontend:
```bash
# On local machine
cd l2-educa
npm run build
# Upload new dist folder
```

---

### **Step 12: Test Your Deployment**

#### Backend Health Check:
```bash
curl https://yourdomain.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-11-07T...",
  "environment": "production",
  "version": "1.0.0"
}
```

#### Frontend Test:
1. Visit `https://yourdomain.com`
2. Should load the login page
3. Try registering a new user
4. Test image upload
5. Check all pages

#### Check Backend Logs:
```bash
pm2 logs l2-educa-backend
```

---

## 🔧 Troubleshooting

### Backend not starting:
```bash
# Check PM2 logs
pm2 logs l2-educa-backend

# Check if port 3001 is in use
sudo lsof -i :3001

# Restart the app
pm2 restart l2-educa-backend
```

### API requests failing (CORS errors):
- Check `ALLOWED_ORIGINS` in backend `.env`
- Should include your domain: `https://yourdomain.com`
- Restart backend after changing: `pm2 restart l2-educa-backend`

### 502 Bad Gateway:
- Backend is not running: `pm2 status`
- Check backend logs: `pm2 logs l2-educa-backend`
- Verify proxy configuration in web server

### Database connection errors:
- Verify Supabase keys in `.env`
- Check Supabase project is active
- Ensure RLS policies are set up correctly

### Image uploads failing:
- Check Supabase storage bucket exists
- Verify RLS policies are correct
- Check backend logs for errors

---

## 📊 Monitoring & Maintenance

### View Backend Logs:
```bash
pm2 logs l2-educa-backend --lines 100
```

### Monitor Performance:
```bash
pm2 monit
```

### Update Application:
```bash
# Pull latest code
cd /home/your-username/your-repo
git pull origin main

# Rebuild (if needed)
cd l2-educa-backend
npm run build

# Copy to production location
cp -r dist/* /home/your-username/l2-educa-backend/dist/

# Restart backend
pm2 restart l2-educa-backend

# Update frontend
cd ../l2-educa
npm run build
cp -r dist/* /home/your-username/public_html/
```

### Backup Strategy:
```bash
# Backup backend
tar -czf l2-educa-backend-backup-$(date +%Y%m%d).tar.gz /home/your-username/l2-educa-backend

# Backup frontend
tar -czf l2-educa-frontend-backup-$(date +%Y%m%d).tar.gz /home/your-username/public_html
```

---

## 🎯 Quick Reference

### Important Paths:
```
Backend:  /home/your-username/l2-educa-backend/
Frontend: /home/your-username/public_html/
Logs:     pm2 logs l2-educa-backend
Config:   /home/your-username/l2-educa-backend/.env
```

### Key Commands:
```bash
# Backend
pm2 status                          # Check status
pm2 restart l2-educa-backend        # Restart
pm2 logs l2-educa-backend           # View logs

# Web Server
sudo systemctl restart apache2      # Restart Apache
sudo systemctl restart nginx        # Restart Nginx

# SSL
sudo certbot renew                  # Renew SSL
```

### Support Resources:
- Hostinger Knowledge Base: https://support.hostinger.com
- Supabase Docs: https://supabase.com/docs
- PM2 Docs: https://pm2.keymetrics.io

---

## ✅ Deployment Checklist

- [ ] Node.js installed on server
- [ ] Backend files uploaded
- [ ] npm packages installed
- [ ] .env file configured
- [ ] PM2 running backend
- [ ] Frontend files uploaded to public_html
- [ ] Web server configured (.htaccess or nginx config)
- [ ] SSL certificate installed
- [ ] Supabase database scripts executed
- [ ] API health check passes
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] Login/logout works
- [ ] Image upload works
- [ ] All pages accessible

---

## 🎉 Deployment Complete!

Your L2 EDUCA application should now be live at `https://yourdomain.com`!

If you encounter any issues, check the troubleshooting section or review the logs.

**Happy Teaching! 🚀📚**

