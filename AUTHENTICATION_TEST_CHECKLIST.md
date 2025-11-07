# 🔐 Authentication System Test Checklist

Enterprise-level authentication testing checklist for L2 EDUCA platform.

## ✅ Pre-Deployment Checklist

### Environment Configuration
- [ ] Backend .env file configured with production values
- [ ] Frontend .env.production file configured
- [ ] FRONTEND_URL set to `https://silviosuperandolimites.com.br`
- [ ] VITE_SITE_URL set to `https://silviosuperandolimites.com.br`
- [ ] Supabase Site URL updated in dashboard
- [ ] Supabase Redirect URLs configured correctly
- [ ] CORS configured for production domain
- [ ] JWT_SECRET is at least 32 characters
- [ ] All required environment variables present

### Database Setup
- [ ] Chat-ready profile fields added (run `enhance-profile-for-chat.sql`)
- [ ] RLS policies active on all tables
- [ ] Username change rate limiting configured
- [ ] Avatar storage bucket configured
- [ ] All indexes created

---

## 🧪 Seamless Login Flow Tests

### Test 1: New User Registration (Email Entry)
**Steps:**
1. Go to login page
2. Enter a new email address (not in system)
3. Click "Continuar"

**Expected:**
- [ ] System detects user doesn't exist
- [ ] Form smoothly transitions to registration fields
- [ ] Shows: Email (pre-filled), Username field, Password, Confirm Password
- [ ] "Cadastrando: [email]" message shown
- [ ] Back button visible

**Test Case 2a: Complete Registration**
4. Enter username (3-20 chars, alphanumeric + underscore)
5. Enter strong password (min 8 chars, upper, lower, number)
6. Confirm password
7. Click "Criar Conta"

**Expected:**
- [ ] Registration successful
- [ ] Verification message shown: "✅ Conta Criada!"
- [ ] Email sent with verification link
- [ ] Link in email points to `https://silviosuperandolimites.com.br/#/verify-email`

**Test Case 2b: Registration Validation**
- [ ] Username validation: Rejects < 3 or > 20 chars
- [ ] Username validation: Rejects special characters
- [ ] Password validation: Rejects < 8 chars
- [ ] Password validation: Requires uppercase letter
- [ ] Password validation: Requires lowercase letter
- [ ] Password validation: Requires number
- [ ] Confirm password: Rejects mismatch
- [ ] Error messages are clear and helpful

### Test 2: Existing User Login (Email Entry)
**Steps:**
1. Go to login page
2. Enter existing email address
3. Click "Continuar"

**Expected:**
- [ ] System detects user exists
- [ ] Form transitions to password field only
- [ ] Shows: "Bem-vindo de volta!" message
- [ ] Shows: "Entrando como: [email]"
- [ ] Password field auto-focused
- [ ] "Esqueceu sua senha?" link visible
- [ ] Back button visible

**Complete Login:**
4. Enter correct password
5. Click "Entrar"

**Expected:**
- [ ] Login successful
- [ ] Redirects to home/dashboard
- [ ] User session active
- [ ] Avatar loads if set

### Test 3: Username Login
**Steps:**
1. Go to login page
2. Enter existing username (not email)
3. Click "Continuar"

**Expected:**
- [ ] System detects user exists by username
- [ ] Icon changes from ✉️ to 👤
- [ ] Form transitions to password field
- [ ] Shows: "Bem-vindo de volta!"
- [ ] Shows: "Entrando como: [username]"

**Complete Login:**
4. Enter correct password
5. Click "Entrar"

**Expected:**
- [ ] Login successful (same as email login)
- [ ] System looks up email from username internally
- [ ] Authentication works correctly

### Test 4: Username Entry for Registration
**Steps:**
1. Go to login page
2. Enter username (without @)
3. Click "Continuar"

**Expected:**
- [ ] Error message: "Para criar uma conta, use um endereço de email válido"
- [ ] Does not proceed to registration
- [ ] User stays on identifier step

---

## 🔒 Security & Rate Limiting Tests

### Test 5: Failed Login Rate Limiting
**Steps:**
1. Enter existing email/username
2. Click "Continuar"
3. Enter wrong password 5 times

**Expected:**
- [ ] First 2 failures: Shows remaining attempts warning
- [ ] After 5 failures: Account locked for 10 minutes
- [ ] Shows: "🔒 Muitas tentativas. Aguarde X minutos."
- [ ] Login button disabled during lockout
- [ ] Timer counts down correctly

**Wait & Retry:**
4. Wait for lockout to expire (or clear localStorage)
5. Try again with correct password

**Expected:**
- [ ] Can login successfully after lockout expires
- [ ] Failed attempt counter reset

### Test 6: User Enumeration Protection
**Steps:**
1. Try to check if email exists via /check-user endpoint multiple times

**Expected:**
- [ ] Rate limiting active on check-user endpoint
- [ ] Generic error messages (doesn't reveal if user exists on errors)
- [ ] Strict rate limit (lower than login attempts)

### Test 7: Session Security
**Steps:**
1. Login successfully
2. Leave browser idle for session timeout period
3. Try to access protected page

**Expected:**
- [ ] Session expires after 24 hours of inactivity
- [ ] Warning shown 5 minutes before expiry (if implemented)
- [ ] Redirects to login page
- [ ] Shows appropriate message

---

## 📧 Email Verification Tests

### Test 8: Email Confirmation Flow
**Steps:**
1. Register new account
2. Check email inbox (and spam folder)

**Expected:**
- [ ] Verification email received within 1 minute
- [ ] Email in Portuguese (if configured)
- [ ] Subject line appropriate
- [ ] Link format: `https://silviosuperandolimites.com.br/#/verify-email?token=...`
- [ ] **NOT localhost!**

**Click Link:**
3. Click verification link in email

**Expected:**
- [ ] Redirects to production site
- [ ] Shows "Email verificado com sucesso!"
- [ ] Can now login successfully
- [ ] `email_confirmed_at` timestamp set in database

### Test 9: Login Before Verification
**Steps:**
1. Register account but don't verify
2. Try to login with correct credentials

**Expected:**
- [ ] Login blocked
- [ ] Error: "Por favor, verifique seu email antes de fazer login."
- [ ] Shows option to resend verification email

### Test 10: Resend Verification Email
**Steps:**
1. On verification notice, click "Reenviar email"

**Expected:**
- [ ] New email sent
- [ ] Success message shown
- [ ] Link in new email also points to production URL

---

## 🔑 Password Reset Tests

### Test 11: Forgot Password Flow
**Steps:**
1. Click "Esqueceu sua senha?"
2. Enter email address
3. Submit

**Expected:**
- [ ] Always shows success (even if email doesn't exist - security)
- [ ] Message: "Se o email existir, um link de recuperação será enviado"
- [ ] Email received (if exists)
- [ ] Reset link: `https://silviosuperandolimites.com.br/#/reset-password?token=...`
- [ ] **NOT localhost!**

**Reset Password:**
4. Click link in email
5. Enter new password
6. Submit

**Expected:**
- [ ] Password reset successful
- [ ] Can login with new password
- [ ] Old password no longer works

---

## 👤 Profile Editing Tests

### Test 12: Basic Profile Updates
**Steps:**
1. Login
2. Go to profile page
3. Click "Editar Perfil"
4. Update full_name
5. Update bio
6. Click "Salvar Alterações"

**Expected:**
- [ ] Updates save successfully
- [ ] Success message shown
- [ ] Data persists after refresh
- [ ] No errors in console

### Test 13: Display Name (Chat-Ready)
**Steps:**
1. Edit profile
2. Add display_name field
3. Save

**Expected:**
- [ ] display_name field available
- [ ] Saves separately from full_name
- [ ] Min 2, max 50 characters enforced
- [ ] Character counter shown

### Test 14: Username Change with Rate Limit
**Steps:**
1. Edit profile
2. Change username (1st time this week)
3. Save

**Expected:**
- [ ] Username changes successfully
- [ ] Shows: "X alterações restantes esta semana"
- [ ] Can change again (2nd time)

**Exceed Limit:**
3. Try to change username 3rd time in same week

**Expected:**
- [ ] Error: "Você atingiu o limite de 2 alterações por semana"
- [ ] Shows next available change date
- [ ] Username field disabled

### Test 15: Online Status (Chat-Ready)
**Steps:**
1. Edit profile
2. Toggle "Mostrar status online" setting
3. Save

**Expected:**
- [ ] Setting saved
- [ ] `show_online_status` boolean updated in database
- [ ] `status` field exists (online/offline/away)
- [ ] `last_seen` timestamp updated

### Test 16: Avatar Upload
**Steps:**
1. Edit profile
2. Upload new avatar image
3. Save

**Expected:**
- [ ] Image uploads to Supabase storage
- [ ] Thumbnail generated
- [ ] Avatar URL updated in database
- [ ] Avatar displays immediately
- [ ] Old avatar cleaned up (if replaced)

---

## 🌐 Production Environment Tests

### Test 17: Environment Variables Load Correctly
**Steps:**
1. Build production: `npm run build`
2. Check console output

**Expected:**
- [ ] Build succeeds without warnings
- [ ] Environment validation plugin runs
- [ ] Shows: "✅ Environment variables loaded:"
- [ ] All required vars show checkmark (✓)
- [ ] No missing variable warnings

### Test 18: Production URLs Correct
**Steps:**
1. Check network tab in browser DevTools
2. Trigger various auth operations

**Expected:**
- [ ] API calls go to Railway backend URL (not localhost)
- [ ] Email redirects use `silviosuperandolimites.com.br`
- [ ] No mixed content warnings (HTTP/HTTPS)
- [ ] All requests use HTTPS

### Test 19: CORS Configuration
**Steps:**
1. Access site from production domain
2. Login and perform actions

**Expected:**
- [ ] No CORS errors in console
- [ ] Backend accepts requests from production domain
- [ ] OPTIONS preflight requests succeed

---

## 🔄 Backward Compatibility Tests

### Test 20: Legacy Login Format
**Steps:**
1. Make API call with old format: `{ "email": "user@example.com", "password": "pass" }`

**Expected:**
- [ ] Still works (backward compatible)
- [ ] Converts to new format internally
- [ ] Returns same response format

---

## 📱 Mobile/Responsive Tests

### Test 21: Mobile Login Flow
**Steps:**
1. Open site on mobile device (or DevTools mobile view)
2. Go through complete login flow

**Expected:**
- [ ] Form fully responsive
- [ ] Touch targets adequate size (min 44x44px)
- [ ] Keyboard opens appropriately
- [ ] No horizontal scrolling
- [ ] Back button easily clickable
- [ ] Error messages readable

---

## 🚨 Error Handling Tests

### Test 22: Network Failures
**Steps:**
1. Disable network
2. Try to login

**Expected:**
- [ ] Graceful error message
- [ ] "Erro de conexão. Verifique sua internet."
- [ ] No console crashes
- [ ] Can retry after reconnection

### Test 23: Invalid Tokens
**Steps:**
1. Manually edit verification/reset token in URL
2. Try to use it

**Expected:**
- [ ] Error: "Token de verificação inválido ou expirado"
- [ ] Doesn't crash
- [ ] Option to request new token

---

## 📊 Database Integrity Tests

### Test 24: Concurrent Profile Updates
**Steps:**
1. Open profile in two browser tabs
2. Edit different fields in each
3. Save both (race condition)

**Expected:**
- [ ] Optimistic locking prevents data loss
- [ ] Last write wins OR error shown
- [ ] No silent data corruption
- [ ] Transaction rollback on failure

### Test 25: Orphaned Records Check
**Steps:**
1. Check database for consistency

**Expected Query:**
```sql
-- Users without profiles
SELECT u.id, u.email 
FROM users u 
LEFT JOIN user_profiles up ON u.id = up.user_id 
WHERE up.user_id IS NULL;
```

**Expected:**
- [ ] No orphaned user records
- [ ] All users have matching profiles
- [ ] All profiles have matching users

---

## 🎯 Performance Tests

### Test 26: Login Speed
**Steps:**
1. Measure time from "Entrar" click to dashboard load

**Expected:**
- [ ] < 2 seconds on fast connection
- [ ] < 5 seconds on 3G
- [ ] Progress indicators shown
- [ ] No blocking operations

---

## 📝 Logging & Monitoring

### Test 27: Audit Logs
**Steps:**
1. Perform various auth actions
2. Check database audit logs

**Expected:**
- [ ] All login attempts logged (success & failure)
- [ ] Registration logged with timestamp
- [ ] Password changes logged
- [ ] IP address recorded
- [ ] User agent recorded
- [ ] No sensitive data (passwords) in logs

---

## ✅ Final Deployment Checklist

Before going live:
- [ ] All tests above pass
- [ ] Database migrations run successfully
- [ ] Backup of current database taken
- [ ] Rollback plan documented
- [ ] Monitoring/alerts configured
- [ ] Error tracking enabled (Sentry, etc.)
- [ ] Rate limiting tested under load
- [ ] Email delivery working (not landing in spam)
- [ ] SSL certificates valid
- [ ] All secrets rotated for production
- [ ] Team notified of deployment
- [ ] Documentation updated
- [ ] Support team briefed on new features

---

## 🐛 Known Issues / Limitations

Document any known issues here:
- [ ] None currently

---

## 📞 Support Contacts

- Backend Issues: [Your backend lead]
- Frontend Issues: [Your frontend lead]
- Database Issues: [Your DB admin]
- Infrastructure: [Your DevOps]

---

**Last Updated:** November 7, 2025  
**Test Environment:** Production  
**Tester:** _____________  
**Date Tested:** _____________

