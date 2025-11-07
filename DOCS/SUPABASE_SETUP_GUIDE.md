# Supabase Setup Guide for L2 EDUCA

Complete step-by-step guide to configure Supabase for the L2 EDUCA authentication system.

## 📋 Prerequisites

- A Supabase account (free tier is sufficient)
- Basic understanding of SQL
- The L2 EDUCA project files

## 🚀 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in or create an account
4. Click "New Project"
5. Fill in the details:
   - **Name**: `l2-educa-auth` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development
6. Click "Create new project"
7. Wait 2-3 minutes for project creation

## 🔑 Step 2: Get API Keys

1. In your Supabase dashboard, go to **Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy the following values:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: This is your `SUPABASE_ANON_KEY`
   - **service_role secret**: This is your `SUPABASE_SERVICE_KEY` ⚠️ **Keep this secret!**

4. Save these values - you'll need them for environment variables

## 🗄️ Step 3: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (in the sidebar)
2. Click **New Query**
3. Open the file `l2-educa-backend/supabase-schema.sql`
4. Copy ALL the contents of this file
5. Paste into the SQL Editor
6. Click **Run** (or press `Ctrl+Enter`)
7. Wait for execution to complete (should see "Success" message)

### What This Creates

The schema creates:
- `users` table - Basic user information
- `user_profiles` table - Extended user profiles
- `audit_logs` table - Authentication event logging
- `password_reset_tokens` table - For password reset flow
- `refresh_tokens` table - For token management
- `auth_methods` table - For future 2FA/OAuth
- Row Level Security (RLS) policies - Data isolation
- Helper functions and triggers

## 🔐 Step 4: Configure Authentication

### A. Enable Email/Password Authentication

1. Go to **Authentication** > **Providers** in sidebar
2. Find **Email** provider
3. Make sure it's **Enabled** (toggle should be ON)
4. Configuration options:

   **For Development:**
   - ✅ Enable Email provider
   - ✅ Confirm email: **Disabled** (for faster testing)
   - ✅ Secure email change: **Enabled**

   **For Production:**
   - ✅ Enable Email provider
   - ✅ Confirm email: **Enabled** (important!)
   - ✅ Secure email change: **Enabled**
   - ✅ Secure password change: **Enabled**

5. Click **Save**

### B. Configure Email Templates (Optional but Recommended)

1. Go to **Authentication** > **Email Templates**
2. Customize these templates:

   **Confirm signup**
   ```html
   <h2>Confirme seu email</h2>
   <p>Clique no link abaixo para confirmar seu email:</p>
   <p><a href="{{ .ConfirmationURL }}">Confirmar Email</a></p>
   ```

   **Reset password**
   ```html
   <h2>Redefinir senha</h2>
   <p>Você solicitou redefinir sua senha. Clique no link abaixo:</p>
   <p><a href="{{ .ConfirmationURL }}">Redefinir Senha</a></p>
   <p>Se você não solicitou isso, ignore este email.</p>
   ```

   **Magic Link**
   ```html
   <h2>Seu link de acesso</h2>
   <p>Clique no link abaixo para fazer login:</p>
   <p><a href="{{ .ConfirmationURL }}">Fazer Login</a></p>
   ```

### C. Configure URL Settings

1. Go to **Authentication** > **URL Configuration**
2. Set the following URLs:

   **Development:**
   - Site URL: `http://localhost:5173`
   - Redirect URLs: Add `http://localhost:5173/**`

   **Production** (when deploying):
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: Add `https://yourdomain.com/**`

3. Click **Save**

### D. Set Session Settings

1. Go to **Authentication** > **Settings**
2. Configure these options:

   - **JWT Expiry**: `3600` (1 hour)
   - **Refresh Token Expiry**: `604800` (7 days)
   - **Enable manual linking**: Optional
   - **Disable email signups**: Keep OFF

3. Click **Save**

## 🔒 Step 5: Verify Row Level Security

1. Go to **Authentication** > **Policies**
2. You should see policies for tables:
   - `users`
   - `user_profiles`
   - `audit_logs`
   - `password_reset_tokens`
   - `refresh_tokens`
   - `auth_methods`

3. Each table should have 2-4 policies enabled
4. If any are missing, re-run the schema SQL

### Test RLS is Working

1. Go to **Table Editor**
2. Click on `users` table
3. Try to insert a row manually
4. You should see an error (this is good! RLS is working)

## ⚙️ Step 6: Set Environment Variables

### Backend (.env in l2-educa-backend/)

Create or edit `.env` file:

```env
PORT=3001
NODE_ENV=development

# From Supabase Settings > API
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_secret_key_here
SUPABASE_ANON_KEY=your_anon_public_key_here

# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_generated_64_char_secret_here

JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env.local in l2-educa/)

Create or edit `.env.local` file:

```env
# From Supabase Settings > API
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here

# Backend API URL
VITE_API_URL=http://localhost:3001
```

## ✅ Step 7: Test the Setup

### A. Test Backend Connection

1. Start the backend:
   ```bash
   cd l2-educa-backend
   npm install
   npm run dev
   ```

2. You should see:
   ```
   🚀 ========================================
      L2 EDUCA Backend Server
      ========================================
      📍 Server running on: http://localhost:3001
      📊 Environment: development
      🔐 Security: Enabled
      🌐 CORS: http://localhost:5173
      ========================================
   ```

3. Test health endpoint:
   ```bash
   curl http://localhost:3001/health
   ```

   Should return:
   ```json
   {
     "status": "OK",
     "timestamp": "...",
     "environment": "development",
     "version": "1.0.0"
   }
   ```

### B. Test Frontend Connection

1. Start the frontend:
   ```bash
   cd l2-educa
   npm run dev
   ```

2. Open `http://localhost:5173`
3. Click "Cadastrar" in sidebar
4. Try registering a test user
5. Check if registration works

### C. Verify in Supabase Dashboard

1. Go to **Authentication** > **Users**
2. You should see your test user
3. Go to **Table Editor** > `users`
4. You should see the user record
5. Go to **Table Editor** > `audit_logs`
6. You should see registration log

## 🐛 Troubleshooting

### "Invalid JWT"
- Check SUPABASE_SERVICE_KEY is correct
- Verify JWT_SECRET is set and 64+ characters
- Ensure no extra spaces in environment variables

### "Row Level Security policy violation"
- Verify RLS policies were created (run schema again)
- Check that policies are enabled
- Ensure you're using service_role key in backend

### "Email not sending"
- Configure SMTP in Supabase Settings > Auth > SMTP Settings
- Or wait for Supabase's default email service to kick in
- Check spam folder

### "CORS error"
- Verify ALLOWED_ORIGINS in backend .env
- Check FRONTEND_URL is correct
- Ensure frontend is running on specified port

### Backend won't start
- Check all environment variables are set
- Verify Supabase URL and keys are correct
- Try running: `npm install` again

### Frontend can't connect to Supabase
- Verify VITE_SUPABASE_URL in .env.local
- Check VITE_SUPABASE_ANON_KEY (not service key!)
- Restart dev server after changing .env.local

## 📊 Step 8: Monitor Your Setup

### View Logs

1. **Auth Logs**: Authentication > Logs
2. **API Logs**: API > Logs
3. **Database Logs**: Database > Logs

### Check Usage

1. Go to **Settings** > **Usage**
2. Monitor:
   - API requests
   - Database size
   - Bandwidth
   - Authentication requests

### Backup Your Database

1. Go to **Database** > **Backups**
2. Free tier: Automatic daily backups (7 days retention)
3. For production: Upgrade for more frequent backups

## 🚀 Production Deployment Checklist

Before going to production:

- [ ] Enable email confirmation
- [ ] Set up custom SMTP (optional but recommended)
- [ ] Update Site URL to production domain
- [ ] Add production domain to Redirect URLs
- [ ] Change NODE_ENV to production
- [ ] Use strong, unique JWT_SECRET
- [ ] Review and test all RLS policies
- [ ] Set up database backups
- [ ] Configure monitoring and alerts
- [ ] Test password reset flow
- [ ] Test all authentication flows
- [ ] Review rate limiting settings
- [ ] Set up error logging (Sentry, etc.)

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## 🆘 Getting Help

If you encounter issues:

1. Check Supabase **Logs** section for errors
2. Review browser console for frontend errors
3. Check backend terminal for API errors
4. Verify all environment variables are correct
5. Consult Supabase Discord: https://discord.supabase.com
6. Review L2 EDUCA documentation

## 🎉 Success!

If you've completed all steps successfully:

✅ Supabase project is configured
✅ Database schema is set up
✅ Authentication is enabled
✅ RLS policies are active
✅ Backend and frontend are connected
✅ You can register and login users

You're ready to build amazing authenticated features in L2 EDUCA!

