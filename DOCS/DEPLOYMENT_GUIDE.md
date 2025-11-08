# 🚀 L2 EDUCA - Professional Deployment Guide

Complete guide for deploying your educational platform to production.

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Build Optimization](#build-optimization)
3. [Deployment Platforms](#deployment-platforms)
   - [Vercel (Recommended)](#1-vercel-recommended)
   - [Netlify](#2-netlify)
   - [GitHub Pages](#3-github-pages)
   - [AWS S3 + CloudFront](#4-aws-s3--cloudfront)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Performance Optimization](#performance-optimization)
6. [SEO Configuration](#seo-configuration)
7. [Monitoring & Analytics](#monitoring--analytics)

---

## 🔍 Pre-Deployment Checklist

### ✅ Code Quality

```bash
# 1. Test the build locally
npm run build
npm run preview

# 2. Check for console errors
# Open browser DevTools (F12) and check Console tab

# 3. Test all routes
# - http://localhost:4173/#/
# - http://localhost:4173/#/math
# - http://localhost:4173/#/math/numeros-complexos
# - http://localhost:4173/#/math/polinomios
# - http://localhost:4173/#/math/geometria-analitica

# 4. Test on mobile
# Use browser DevTools → Toggle device toolbar (Ctrl+Shift+M)
```

### ✅ Content Review

- [ ] All text is correctly spelled (Portuguese)
- [ ] All math formulas render correctly
- [ ] All images and icons load properly
- [ ] Loading screen displays correctly
- [ ] Navigation works on all pages
- [ ] Sidebar menu functions properly

### ✅ Performance Check

- [ ] Page loads in < 3 seconds
- [ ] Animations are smooth (60 FPS)
- [ ] No layout shifts (CLS)
- [ ] Images are optimized

---

## ⚙️ Build Optimization

### 1. Update `package.json`

```json
{
  "name": "l2-educa",
  "version": "2.0.0",
  "description": "L2 EDUCA - Centro de Conhecimento Universal",
  "homepage": "https://yourdomain.com",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build"
  }
}
```

### 2. Optimize `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'math-vendor': ['mathjs']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 3. Create `.env.production`

```env
VITE_APP_NAME=L2 EDUCA
VITE_APP_VERSION=2.0.0
```

---

## 🌐 Deployment Platforms

## 1. **Vercel** (Recommended) ⭐

**Best for:** React apps, automatic deployments, great performance

### Setup Steps:

#### A. Via Vercel Website (Easiest)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub/GitLab/Bitbucket

2. **Import Project**
   ```
   - Click "New Project"
   - Import your Git repository
   - Select "l2-educa" folder
   ```

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

#### B. Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from project folder
cd l2-educa
vercel

# Follow prompts:
# - Setup and deploy? Y
# - Which scope? Your account
# - Link to existing project? N
# - Project name? l2-educa
# - Directory? ./
# - Override settings? N

# Deploy to production
vercel --prod
```

### Vercel Configuration File

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Vercel URL:** `https://l2-educa.vercel.app`

---

## 2. **Netlify**

**Best for:** Simple deployment, form handling, serverless functions

### Setup Steps:

#### A. Via Netlify Website

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Deploy**
   ```
   - Click "Add new site" → "Import existing project"
   - Choose Git provider (GitHub)
   - Select repository
   ```

3. **Build Settings**
   ```
   Base directory: l2-educa (or leave blank)
   Build command: npm run build
   Publish directory: dist
   ```

4. **Deploy Site**
   - Click "Deploy site"
   - Wait for build
   - Site is live!

#### B. Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
cd l2-educa
netlify init

# Deploy
netlify deploy --prod
```

### Netlify Configuration File

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

**Netlify URL:** `https://l2-educa.netlify.app`

---

## 3. **GitHub Pages**

**Best for:** Free hosting, simple projects

### Setup Steps:

1. **Update `vite.config.js`**

```javascript
export default defineConfig({
  base: '/l2-educa/',  // Replace with your repo name
  plugins: [react()],
})
```

2. **Install gh-pages**

```bash
npm install --save-dev gh-pages
```

3. **Update `package.json`**

```json
{
  "homepage": "https://yourusername.github.io/l2-educa",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy**

```bash
npm run deploy
```

5. **Configure GitHub**
   - Go to repository Settings
   - Pages section
   - Source: gh-pages branch
   - Save

**GitHub Pages URL:** `https://yourusername.github.io/l2-educa`

---

## 4. **AWS S3 + CloudFront**

**Best for:** Enterprise, scalability, full control

### Setup Steps:

1. **Create S3 Bucket**

```bash
# Install AWS CLI
# Configure: aws configure

# Create bucket
aws s3 mb s3://l2-educa

# Enable static website hosting
aws s3 website s3://l2-educa/ \
  --index-document index.html \
  --error-document index.html
```

2. **Build and Upload**

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://l2-educa/ --delete
```

3. **Set Bucket Policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::l2-educa/*"
    }
  ]
}
```

4. **Create CloudFront Distribution**
   - Go to CloudFront console
   - Create distribution
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Deploy

**AWS URL:** `https://d1234567890.cloudfront.net`

---

## 🌍 Custom Domain Setup

### For Vercel:

1. Go to Project Settings → Domains
2. Add your domain: `www.l2educa.com`
3. Add DNS records provided by Vercel
4. Wait for SSL certificate (automatic)

### DNS Configuration:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## ⚡ Performance Optimization

### 1. Image Optimization

```bash
# Install image optimization tools
npm install -D vite-plugin-imagemin
```

**Update `vite.config.js`:**

```javascript
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: true }
        ]
      }
    })
  ]
})
```

### 2. Enable Compression

**Vercel** (automatic gzip/brotli)

**Netlify** `netlify.toml`:
```toml
[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true
```

### 3. Lazy Loading

Update routes in `App.jsx`:

```javascript
import { lazy, Suspense } from 'react';

const Terminal = lazy(() => import('./pages/Terminal'));
const MathSubject = lazy(() => import('./pages/MathSubject'));
// ... other imports

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Routes */}
      </Routes>
    </Suspense>
  );
}
```

---

## 🔍 SEO Configuration

### 1. Update `index.html`

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Meta Tags -->
    <title>L2 EDUCA - Centro de Conhecimento Universal</title>
    <meta name="description" content="Plataforma educacional interativa com conteúdo de matemática, física, química e muito mais. Aprenda de forma visual e envolvente." />
    <meta name="keywords" content="educação, matemática, física, química, biologia, ensino, aprendizado, L2 EDUCA" />
    <meta name="author" content="L2 EDUCA" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://l2educa.com/" />
    <meta property="og:title" content="L2 EDUCA - Centro de Conhecimento Universal" />
    <meta property="og:description" content="Plataforma educacional interativa com conteúdo de matemática, física, química e muito mais." />
    <meta property="og:image" content="https://l2educa.com/og-image.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://l2educa.com/" />
    <meta property="twitter:title" content="L2 EDUCA - Centro de Conhecimento Universal" />
    <meta property="twitter:description" content="Plataforma educacional interativa." />
    <meta property="twitter:image" content="https://l2educa.com/og-image.png" />
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#0a0a0a" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 2. Create `robots.txt` in `/public`

```txt
User-agent: *
Allow: /

Sitemap: https://l2educa.com/sitemap.xml
```

### 3. Create `sitemap.xml` in `/public`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://l2educa.com/</loc>
    <lastmod>2025-01-26</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://l2educa.com/#/math</loc>
    <lastmod>2025-01-26</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

---

## 📊 Monitoring & Analytics

### 1. Google Analytics 4

Add to `index.html` before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Vercel Analytics

```bash
npm install @vercel/analytics
```

**Update `App.jsx`:**

```javascript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Your app */}
      <Analytics />
    </>
  );
}
```

---

## 🔒 Security Best Practices

### 1. Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               img-src 'self' data: https:;">
```

### 2. HTTPS Only

All platforms (Vercel, Netlify, etc.) provide automatic HTTPS.

### 3. Environment Variables

Never commit sensitive data. Use platform environment variables.

---

## 📱 Post-Deployment Testing

### Checklist:

```bash
# 1. Test on multiple devices
- Desktop (Chrome, Firefox, Safari, Edge)
- Mobile (iOS Safari, Chrome Android)
- Tablet

# 2. Performance Testing
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

# 3. SEO Testing
- Google Search Console: https://search.google.com/search-console

# 4. Accessibility Testing
- WAVE: https://wave.webaim.org/
- Lighthouse (Chrome DevTools)
```

---

## 🎯 Deployment Commands Quick Reference

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# GitHub Pages
npm run deploy

# AWS S3
npm run build && aws s3 sync dist/ s3://l2-educa/ --delete
```

---

## 🆘 Troubleshooting

### Issue: 404 on page refresh

**Solution:** Ensure your hosting platform redirects all routes to `index.html`
- Vercel: Automatic
- Netlify: Use `_redirects` or `netlify.toml`
- S3: Set error document to `index.html`

### Issue: Slow loading

**Solution:** 
- Enable compression (gzip/brotli)
- Use lazy loading
- Optimize images
- Use CDN

### Issue: Math formulas not rendering

**Solution:** Ensure MathJax CDN is accessible:
```html
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>
```

---

## ✅ Success Checklist

- [ ] Site deployed and accessible
- [ ] All routes work correctly
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)
- [ ] Analytics installed
- [ ] Performance optimized (PageSpeed > 90)
- [ ] SEO meta tags added
- [ ] Sitemap submitted to Google
- [ ] Mobile responsive verified
- [ ] All functionality tested

---

## 📞 Support

**Platform Support:**
- Vercel: https://vercel.com/support
- Netlify: https://docs.netlify.com/
- GitHub: https://docs.github.com/pages

**L2 EDUCA Platform:** Design by L2

---

**Last Updated:** January 26, 2025  
**Version:** 2.0.0

