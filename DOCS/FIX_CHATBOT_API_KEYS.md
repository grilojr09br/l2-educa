# 🔧 Fix Chatbot API Keys - Quick Guide

## 🔴 Problem

The chatbot is showing this error:
```
POST https://openrouter.ai/api/v1/chat/completions 401 (Unauthorized)
API error: Error: no-available-keys
```

This means your OpenRouter API keys are **invalid or expired**.

---

## ✅ Solution

### Step 1: Get New Valid API Keys

1. **Go to OpenRouter:**
   - Visit: https://openrouter.ai/keys
   - Login to your account

2. **Create New Keys:**
   - Click "Create Key"
   - Give it a name (e.g., "L2 EDUCA Production")
   - Copy the key (starts with `sk-or-v1-...`)
   - Create 2-3 keys for rotation

3. **Add Credits (if needed):**
   - Go to: https://openrouter.ai/credits
   - Add some credits to your account
   - Even $5 goes a long way with free models

### Step 2: Update Your Build Script

Open the file `l2-educa/build-prod.bat` and **replace this line**:

```batch
REM Current (line 20):
set VITE_OPENROUTER_API_KEYS=YOUR_KEY_1_HERE,YOUR_KEY_2_HERE,YOUR_KEY_3_HERE
```

**Replace with your NEW keys:**

```batch
set VITE_OPENROUTER_API_KEYS=sk-or-v1-xxxxx,sk-or-v1-yyyyy,sk-or-v1-zzzzz
```

⚠️ **Important:**
- Separate multiple keys with commas (no spaces)
- Don't add quotes around the keys
- Use at least 2-3 keys for better rate limit handling

### Step 3: Rebuild the Production Version

1. **Open Command Prompt** in the project folder

2. **Run the build script:**
   ```bash
   cd l2-educa
   build-prod.bat
   ```

3. **Wait for build to complete** - You should see:
   ```
   Build complete! Files are in dist/ folder
   ```

### Step 4: Upload to Your Server

Upload the new `dist` folder to your hosting (replace the old `/l2` folder).

**Using FTP/cPanel:**
1. Connect to your server
2. Navigate to `public_html/l2/`
3. Delete old files
4. Upload new files from `l2-educa/dist/`

---

## 🧪 Test the Fix

1. **Clear browser cache** (Ctrl + Shift + Delete)
2. **Visit your site:** https://silviosuperandolimites.com.br/l2
3. **Open chatbot** and send a message
4. **Check console** - Should NOT show 401 errors anymore

---

## 📝 Alternative: Use .env.production File

Instead of editing `build-prod.bat`, you can create a `.env.production` file:

**Create:** `l2-educa/.env.production`

```env
# Production Environment Variables
VITE_BACKEND_URL=https://l2-educa-production.up.railway.app
VITE_SUPABASE_URL=https://usyqgsgdsppthjmvyjxf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeXFnc2dkc3BwdGhqbXZ5anhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODgzOTgsImV4cCI6MjA3Nzk2NDM5OH0.A9QBFHK3EJFuXXUtQSSoDTiIp2opr0xtoLVA__JEpfc

# OpenRouter API Keys (comma-separated, no spaces)
VITE_OPENROUTER_API_KEYS=sk-or-v1-xxxxx,sk-or-v1-yyyyy,sk-or-v1-zzzzz
VITE_OPENROUTER_MODEL=minimax/minimax-m2:free

# Site URL
VITE_SITE_URL=https://silviosuperandolimites.com.br/l2
```

Then just run:
```bash
npm run build
```

Vite will automatically use `.env.production` for production builds.

---

## 🔍 How to Verify Keys Are Working

### Test 1: Manual API Test

```bash
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer sk-or-v1-YOUR_KEY_HERE"
```

**Good response:**
```json
{
  "data": {
    "label": "Your Key Name",
    "usage": 0.00,
    "limit": null,
    "is_free_tier": false
  }
}
```

**Bad response (401):**
```json
{
  "error": {
    "message": "Invalid API key"
  }
}
```

### Test 2: Check Console After Build

After rebuilding, check the browser console:
- ✅ **Good:** No 401 errors, chatbot responds
- ❌ **Bad:** Still shows "401 Unauthorized"

---

## ⚠️ Common Mistakes

1. **Keys have spaces:**
   ```batch
   ❌ BAD: set VITE_OPENROUTER_API_KEYS=sk-or-v1-xxx, sk-or-v1-yyy
   ✅ GOOD: set VITE_OPENROUTER_API_KEYS=sk-or-v1-xxx,sk-or-v1-yyy
   ```

2. **Keys have quotes:**
   ```batch
   ❌ BAD: set VITE_OPENROUTER_API_KEYS="sk-or-v1-xxx"
   ✅ GOOD: set VITE_OPENROUTER_API_KEYS=sk-or-v1-xxx
   ```

3. **Not rebuilding after changes:**
   - API keys are **embedded during build time**
   - You MUST rebuild after changing keys
   - Just uploading the `.bat` file won't work

4. **Keys not activated on OpenRouter:**
   - Make sure you have credits
   - Check key status on dashboard
   - Verify key permissions

---

## 💰 About OpenRouter Credits

**Free Tier:**
- Some models are completely free (like `minimax/minimax-m2:free`)
- No credits needed for free models
- Check: https://openrouter.ai/models

**Paid Models:**
- Require credits in your account
- Very cheap (usually $0.001 per 1K tokens)
- $5 = thousands of messages

**Current Model:**
- You're using `minimax/minimax-m2:free` (FREE!)
- Should work without credits
- But you still need valid API keys

---

## 🆘 Still Not Working?

### Check These:

1. **Are keys valid?**
   - Test with curl command above
   - Check OpenRouter dashboard

2. **Did you rebuild?**
   - Run `build-prod.bat` again
   - Check if keys are in `dist/assets/*.js` files

3. **Did you upload correctly?**
   - Upload entire `dist` folder
   - Clear old files first

4. **Clear browser cache:**
   - Hard refresh: Ctrl + Shift + R
   - Or open in incognito mode

5. **Check model availability:**
   - Visit: https://openrouter.ai/models
   - Search for `minimax/minimax-m2`
   - Make sure it's still available

---

## 📞 Quick Commands Reference

```bash
# Navigate to frontend
cd l2-educa

# Build production (Windows)
build-prod.bat

# Build production (Cross-platform)
npm run build

# Test local build
npm run preview
```

---

**Once you update your API keys and rebuild, the chatbot should work perfectly!** 🎉

