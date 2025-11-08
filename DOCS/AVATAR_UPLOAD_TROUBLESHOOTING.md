# 🖼️ Avatar Upload Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: Backend Not Actually Running ⚠️

**Check if backend is running:**

```bash
# Test health endpoint
curl http://localhost:3001/health

# Expected response:
# {"status":"OK","timestamp":"...","environment":"development","version":"1.0.0"}
```

**If you get "Connection refused":**
```bash
cd l2-educa-backend
npm run dev
```

---

### Issue 2: Missing Dependencies 📦

**Install required packages:**

```bash
cd l2-educa-backend
npm install multer sharp @types/multer --save
```

**Check if installed:**
```bash
npm list multer sharp
```

---

### Issue 3: Port Conflict 🔌

**Check if port 3001 is in use:**

```powershell
# Windows
netstat -ano | findstr :3001

# If something is using it, kill the process or change port
```

**Use different port temporarily:**

In `l2-educa-backend/.env`:
```bash
PORT=3002
```

In `l2-educa/.env`:
```bash
VITE_BACKEND_URL=http://localhost:3002
```

Restart both servers.

---

### Issue 4: CORS Configuration 🌐

**Check backend console for CORS errors.**

Update `l2-educa-backend/.env`:
```bash
ALLOWED_ORIGINS=http://localhost:5173
```

Restart backend.

---

### Issue 5: Authentication Token Issue 🔐

**Test if token is being sent:**

Open browser DevTools → Network tab → Try upload → Check request:
- Headers should have: `Authorization: Bearer eyJhbG...`
- If missing, you're not logged in properly

**Fix:** Logout and login again.

---

### Issue 6: Multer/Sharp Not Installed 📸

**The backend needs these packages for image processing:**

```bash
cd l2-educa-backend

# Install image processing dependencies
npm install multer sharp
npm install --save-dev @types/multer

# Rebuild
npm run build
```

---

## 🧪 Step-by-Step Test

### Step 1: Verify Backend is Running

```bash
curl http://localhost:3001/health
```

✅ **Should return:** `{"status":"OK",...}`

❌ **If fails:** Start backend with `npm run dev`

---

### Step 2: Test Image Endpoint Health

```bash
curl http://localhost:3001/api/images/health
```

✅ **Should return:** `{"status":"ok","service":"image-processing",...}`

❌ **If fails:** Routes not properly mounted

---

### Step 3: Test With Auth Token

**Get your token from browser:**
1. Open DevTools (F12)
2. Console tab
3. Run: `localStorage.getItem('sb-<project>-auth-token')`
4. Or check Network tab → any request → Headers → Authorization

**Test upload endpoint:**
```bash
curl -X POST http://localhost:3001/api/images/optimize-avatar \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@path/to/test-image.jpg"
```

---

### Step 4: Check Browser Console

When you try to upload, check console for:

**Good signs:**
```
✅ Arquivo válido
📦 Comprimindo imagem (frontend)...
✅ Compressão frontend completa
🔐 Enviando para processamento backend...
```

**Bad signs:**
```
❌ Failed to load resource: net::ERR_CONNECTION_REFUSED
❌ CORS error
❌ 401 Unauthorized
```

---

## 🔧 Quick Fixes

### Fix 1: Reinstall Dependencies

```bash
cd l2-educa-backend
rm -rf node_modules package-lock.json
npm install
npm run build
npm run dev
```

### Fix 2: Check Environment Variables

```bash
# Backend should have:
cat l2-educa-backend/.env | grep SUPABASE
cat l2-educa-backend/.env | grep PORT

# Frontend should have:
cat l2-educa/.env | grep VITE_BACKEND_URL
```

### Fix 3: Restart Everything

```bash
# Kill all node processes
taskkill /F /IM node.exe

# Start backend
cd l2-educa-backend
npm run dev

# In new terminal, start frontend
cd l2-educa
npm run dev
```

---

## 🎯 Common Error Messages

### "Failed to fetch"
- Backend not running
- Wrong URL
- CORS issue

**Fix:** Verify backend running on correct port

---

### "401 Unauthorized"
- Token missing or invalid
- Not logged in

**Fix:** Logout, login again

---

### "413 Payload Too Large"
- File too big

**Fix:** Image must be < 50MB

---

### "400 Bad Request - No image file provided"
- FormData not properly formatted

**Fix:** Check AvatarUpload component sends `image` field

---

### "500 Internal Server Error"
- Sharp/Multer not installed
- Image processing failed

**Fix:** Install dependencies:
```bash
npm install multer sharp
```

---

## 📋 Checklist

Before uploading, verify:

- [ ] Backend running: `http://localhost:3001/health` works
- [ ] Image endpoint working: `http://localhost:3001/api/images/health` works
- [ ] Logged in (check localStorage has token)
- [ ] Dependencies installed: `multer`, `sharp`
- [ ] CORS configured: `ALLOWED_ORIGINS` in backend .env
- [ ] Correct port in frontend .env: `VITE_BACKEND_URL`
- [ ] No CORS errors in browser console
- [ ] File size < 50MB
- [ ] Image is valid format (jpg, png, webp, gif)

---

## 🚀 Full Reset Procedure

If nothing works, try this:

```bash
# 1. Stop everything
taskkill /F /IM node.exe

# 2. Clean backend
cd l2-educa-backend
rm -rf node_modules
npm install
npm run build

# 3. Start backend
npm run dev
# Leave this terminal open!

# 4. In NEW terminal, clean frontend
cd l2-educa
rm -rf node_modules .vite
npm install

# 5. Start frontend
npm run dev

# 6. Open browser: http://localhost:5173
# 7. Login
# 8. Go to profile
# 9. Try upload
```

---

## 📞 Still Not Working?

**Check backend logs when you try upload:**

The backend terminal should show:
```
Processing avatar upload: { userId: '...', originalSize: '... KB', mimeType: '...' }
```

**If you don't see this:**
- Request not reaching backend
- Check network tab in DevTools
- Look for the POST request
- Check its status code and response

**If you see error in backend logs:**
- Share the exact error message
- Might be Sharp installation issue
- Might be file permissions

---

**Last Updated:** November 7, 2025

