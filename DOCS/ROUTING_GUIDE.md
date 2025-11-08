# Routing Configuration Guide

## Current Setup: HashRouter ✅

The app now uses **HashRouter** for routing, which works perfectly for static hosting without any server configuration.

### How It Works
- URLs will have a hash: `http://yoursite.com/#/numeros-complexos`
- All routes work immediately without server configuration
- Perfect for: GitHub Pages, Netlify, Vercel, or any static hosting

### URLs Format
```
Homepage:              http://yoursite.com/#/
Complex Numbers:       http://yoursite.com/#/numeros-complexos
Polynomials:           http://yoursite.com/#/polinomios
Analytic Geometry:     http://yoursite.com/#/geometria-analitica
```

---

## Alternative: BrowserRouter (Clean URLs)

If you prefer clean URLs without the hash (`/numeros-complexos` instead of `/#/numeros-complexos`), you can use **BrowserRouter**, but you'll need server-side configuration.

### Step 1: Change Router Type
In `src/App.jsx`, change:
```javascript
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
```
to:
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```

### Step 2: Configure Your Hosting

#### For Netlify
Create `public/_redirects`:
```
/*    /index.html   200
```

#### For Vercel
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### For GitHub Pages
Add this to your `vite.config.js`:
```javascript
export default defineConfig({
  base: '/l2-educa/',
  // ... rest of config
})
```
And use HashRouter (GitHub Pages doesn't support BrowserRouter rewrites easily).

#### For Apache Server
Create `.htaccess` in your dist folder:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### For Nginx
Add to your server config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Recommendation

**Keep HashRouter** unless you have a specific reason to use clean URLs and can configure your server. It's simpler, more portable, and works everywhere without configuration.

## Testing Locally

To test the production build locally:
```bash
npm run build
npm run preview
```

Then open the URL shown in the terminal (usually `http://localhost:4173`).

