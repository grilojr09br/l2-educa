# L2 EDUCA - Production Build

**Build Date:** 07/11/2025 12:05:04,67
**Version:** 1.0.0

## 📦 Package Contents

- `backend/` - Backend Node.js application
- `frontend/` - Frontend static files

## 🚀 Hostinger Deployment Guide

### Step 1: Upload Files

1. Upload `backend/` folder to your server (e.g., `/home/username/l2-educa-backend`)
2. Upload `frontend/` folder contents to your public_html or domain root

### Step 2: Backend Setup

```bash
cd /path/to/backend
npm install --production
```

Create `.env` file in backend folder:
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-secret-key-here
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
ALLOWED_ORIGINS=https://yourdomain.com
```

### Step 3: Start Backend with PM2

```bash
npm install -g pm2
pm2 start dist/app.js --name "l2-educa-backend"
pm2 save
pm2 startup
```

### Step 4: Configure Nginx (or Apache)

#### Nginx Example:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/frontend;
    index index.html;

    # Frontend - serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 5: Database Setup

Run these SQL scripts in Supabase SQL Editor (from your dev repo):
1. `l2-educa-backend/scripts/setup-avatar-storage.sql`
2. `l2-educa-backend/scripts/setup-username-changes.sql`
3. `l2-educa-backend/scripts/fix-avatar-rls-policy.sql`

### Step 6: SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com
```

## 📋 Pre-Deployment Checklist

- [ ] Upload all files to Hostinger
- [ ] Install Node.js dependencies in backend folder
- [ ] Create and configure backend .env file
- [ ] Run Supabase SQL scripts
- [ ] Start backend with PM2
- [ ] Configure web server (Nginx/Apache)
- [ ] Set up SSL certificate
- [ ] Test all functionality
- [ ] Configure domain DNS

## 🔍 Verify Deployment

1. Backend health check: `curl https://yourdomain.com/api/health`
2. Frontend loads correctly in browser
3. User registration/login works
4. Image uploads work
5. All pages accessible

## 📞 Support

For issues, check:
- Backend logs: `pm2 logs l2-educa-backend`
- Web server logs: `/var/log/nginx/error.log`
- Supabase logs in dashboard

**Happy Deploying 🚀**
