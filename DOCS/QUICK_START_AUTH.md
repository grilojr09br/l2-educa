# Quick Start Guide - L2 EDUCA Authentication

Get your authentication system running in 15 minutes!

## 🎯 What You'll Do

1. Create Supabase project (5 min)
2. Setup backend (5 min)
3. Setup frontend (3 min)
4. Test everything (2 min)

## ⚡ Step 1: Supabase (5 minutes)

### A. Create Project
1. Go to [supabase.com](https://supabase.com)
2. Sign in/up
3. Click "New Project"
4. Name: `l2-educa-auth`
5. Choose region, generate password
6. Wait 2-3 minutes

### B. Get API Keys
1. Go to Settings > API
2. Copy:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key

### C. Run Database Schema
1. Go to SQL Editor
2. Click "New Query"
3. Open: `l2-educa-backend/supabase-schema.sql`
4. Copy ALL contents
5. Paste and click "Run"

### D. Enable Email Auth
1. Go to Authentication > Providers
2. Enable "Email" provider
3. Disable "Confirm email" (for dev)
4. Save

## 🖥️ Step 2: Backend (5 minutes)

```bash
cd l2-educa-backend
npm install
```

Create `.env` file:

```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=paste_your_project_url_here
SUPABASE_SERVICE_KEY=paste_service_role_key_here
SUPABASE_ANON_KEY=paste_anon_key_here
JWT_SECRET=run_command_below_to_generate
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173
```

Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy output and paste as JWT_SECRET.

Start backend:
```bash
npm run dev
```

Should see:
```
🚀 Server running on: http://localhost:3001
```

## 🌐 Step 3: Frontend (3 minutes)

```bash
cd ../l2-educa
```

Create `.env.local` file:

```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_anon_key_here
VITE_API_URL=http://localhost:3001
```

Start frontend:
```bash
npm run dev
```

## ✅ Step 4: Test (2 minutes)

1. Open http://localhost:5173
2. Click hamburger menu (☰)
3. Click "Cadastrar"
4. Fill form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test123!@#`
   - Confirm password: `Test123!@#`
5. Click "Criar conta"
6. Should see success message
7. Auto-redirects to login
8. Login with same credentials
9. Should see your profile in sidebar
10. Click profile to edit info
11. Click "Sair" to logout

## 🎉 Success!

If all steps worked:
- ✅ Backend is running
- ✅ Frontend is connected
- ✅ Authentication works
- ✅ You can register/login/logout

## 🐛 Quick Fixes

**Backend won't start:**
- Check all env vars are set
- Verify Supabase keys are correct
- Run `npm install` again

**Frontend can't connect:**
- Restart frontend after creating .env.local
- Check VITE_SUPABASE_ANON_KEY (not service key!)
- Verify backend is running on port 3001

**Can't register:**
- Check backend terminal for errors
- Verify Supabase SQL schema ran successfully
- Check Supabase Authentication > Users dashboard

## 📚 Next Steps

1. **Read Full Docs:**
   - `SUPABASE_SETUP_GUIDE.md` - Detailed Supabase setup
   - `AUTH_INTEGRATION_GUIDE.md` - How to use the auth system
   - `BACKEND_AUTH_IMPLEMENTATION_SUMMARY.md` - What was built

2. **Customize:**
   - Add more profile fields
   - Customize email templates
   - Modify UI styling

3. **Deploy:**
   - Deploy backend (Railway, Heroku, etc.)
   - Deploy frontend (Vercel, Netlify, etc.)
   - Enable email verification for production

## 🆘 Need Help?

- Check `SUPABASE_SETUP_GUIDE.md` for detailed troubleshooting
- Review browser console for errors
- Check backend terminal for API errors
- Verify environment variables

---

**Total Time**: ~15 minutes
**Status**: Ready to build! 🚀

