# Quick Test Guide - Authentication Improvements

## Pre-Test Setup

1. **Restart the development server**:
   ```bash
   npm run dev
   ```

2. **Clear browser data**:
   - Press `Ctrl + Shift + Delete`
   - Clear: Cookies, Cache, LocalStorage
   - Or use: `localStorage.clear()` in console

3. **Open Console (F12)**:
   - Keep it open to see logs
   - Look for emoji indicators: 🔍 📦 ✅ ❌

---

## Test 1: Registration Flow (NEW UX)

### Steps:
1. Go to `/register`
2. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test1234!` (watch password strength meter)
   - Confirm password: `Test1234!`
3. Click "Criar conta"

### Expected Result:
✅ **Success Modal appears** with:
- Green check icon
- "Conta criada com sucesso!" title
- Your email address displayed
- 3 step-by-step instructions
- "Go to Login" button
- "Redirecting in 5 seconds" message

### What to Check:
- [ ] Modal has smooth slide-in animation
- [ ] Email address is correct
- [ ] Button is clickable
- [ ] Auto-redirects after 5 seconds (or click button)
- [ ] Console shows: `✅ Registration successful`

---

## Test 2: Login Page - Verification Notice

### Steps:
1. After redirect (or go to `/login`)
2. Look at the page

### Expected Result:
✅ **Blue verification notice appears** above login form showing:
- Email icon
- "Verifique seu email" title
- Your email address
- "Reenviar email" button
- Close (X) button

### What to Check:
- [ ] Notice is visible and styled correctly
- [ ] Email matches what you registered with
- [ ] Can dismiss with X button
- [ ] "Reenviar email" button works (shows success message)
- [ ] Mobile responsive (try narrow window)

---

## Test 3: Login Blocked for Unverified Users

### Steps:
1. On login page, enter credentials:
   - Email: `test@example.com`
   - Password: `Test1234!`
2. Click "Entrar"

### Expected Result:
❌ **Login is BLOCKED** with error:
- "Por favor, verifique seu email antes de fazer login. Verifique sua caixa de entrada."
- User stays on login page
- Verification notice still visible

### What to Check:
- [ ] Error message appears in red
- [ ] Form doesn't navigate away
- [ ] No timeout warnings in console
- [ ] Console shows: `⚠️ Email not verified`

---

## Test 4: Login Success (Verified User)

### Setup:
For this test, you need a user with verified email. Options:
- **Option A**: Verify the email manually in Supabase dashboard
- **Option B**: Create a new user and manually set `email_confirmed_at` in database
- **Option C**: Use an existing verified account

### Steps:
1. Login with verified credentials
2. Click "Entrar"

### Expected Result:
✅ **Login succeeds**:
- Redirects to home (`/`) in <1 second
- No timeout warnings
- Aurora background visible
- Sidebar accessible

### What to Check:
- [ ] Redirect is fast (<1 second)
- [ ] No errors in console
- [ ] Console shows: `✅ Login successful: { emailVerified: true }`
- [ ] Verification notice automatically hidden
- [ ] Can access protected pages

---

## Test 5: Chatbot Hidden on Auth Pages

### Steps:
1. Visit these pages:
   - `/login`
   - `/register`
   - `/forgot-password`
   - `/verify-email`
2. Look for AI chatbot icon (bottom right)

### Expected Result:
✅ **No chatbot visible** on any auth pages

### Then:
1. Login successfully
2. Go to home `/`
3. Check for chatbot

### Expected Result:
✅ **Chatbot visible** on protected pages

---

## Test 6: No Infinite Loading

### Steps:
1. Start from logged out state
2. Go to any protected route (e.g., `/math`)
3. Watch the page

### Expected Result:
✅ **Redirect to login immediately**:
- No "Verificando autenticação..." for more than 1 second
- No timeout warnings
- Clean redirect

### What to Check:
- [ ] No infinite loading screen
- [ ] Console shows: `🔍 Initial session check...`
- [ ] Console shows: `ℹ️ No active session` or similar
- [ ] Redirects to `/login` quickly

---

## Test 7: Page Refresh Persistence

### Steps:
1. Login successfully
2. Navigate to any page (e.g., `/math`)
3. Press `F5` (refresh)

### Expected Result:
✅ **Stays logged in**:
- Page reloads
- No redirect to login
- Content loads normally
- Session persists

### What to Check:
- [ ] No logout after refresh
- [ ] Console shows: `📦 Session found: { hasSession: true }`
- [ ] User data loaded correctly
- [ ] Avatar visible (if set)

---

## Test 8: Mobile Responsiveness

### Steps:
1. Open Dev Tools (`F12`)
2. Toggle device toolbar (mobile view)
3. Try:
   - Registration modal
   - Verification notice
   - Login form

### Expected Result:
✅ **All components responsive**:
- Modal fits screen
- Notice stacks vertically
- Buttons full width
- Text readable
- No horizontal scroll

---

## Common Issues & Solutions

### Issue: Verification notice doesn't show
**Solution**: Check localStorage in console:
```javascript
localStorage.getItem('emailVerificationPending') // should be 'true'
localStorage.getItem('emailVerificationEmail') // should be your email
```

### Issue: Login still has timeout warning
**Solution**: Hard refresh:
```
Ctrl + Shift + R
```
Or clear cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

### Issue: Success modal not appearing
**Solution**: Check console for errors. Verify Material Icons are loaded.

### Issue: Can't test verified user login
**Solution**: In Supabase dashboard:
1. Go to Authentication > Users
2. Find your user
3. Check "Email Confirmed" column
4. Or manually update:
   ```sql
   UPDATE auth.users 
   SET email_confirmed_at = now() 
   WHERE email = 'test@example.com';
   ```

---

## Console Logs Reference

### Successful Registration:
```
✅ Registration successful
📧 Email verification sent
```

### Unverified Login Attempt:
```
🔐 Attempting login...
✅ Login successful: { emailVerified: false }
⚠️ Email not verified
```

### Verified Login Success:
```
🔐 Attempting login...
✅ Login successful: { emailVerified: true }
🚀 Redirecting to: /
🛡️ ProtectedRoute Check: { isAuthenticated: true }
✅ Access granted to: /
```

### Initial Load (No Session):
```
🔍 Initial session check...
📦 Session found: { hasSession: false }
ℹ️ No active session
```

---

## Success Criteria

All tests should pass with:
- ✅ No errors in console
- ✅ Fast loading (<2 seconds)
- ✅ Smooth animations
- ✅ Clear user feedback
- ✅ Responsive design
- ✅ Persistent sessions
- ✅ Email verification workflow working

---

## Report Issues

If any test fails, provide:
1. Which test number failed
2. Screenshot of the issue
3. Console logs (full output)
4. Browser and version
5. Steps to reproduce

---

**Ready to test!** 🚀

Start with Test 1 and work through sequentially for best results.





