# Authentication Integration Guide - L2 EDUCA

## ✅ Implementation Complete

The authentication system has been successfully integrated into the L2 EDUCA platform with the following components:

### Backend (l2-educa-backend/)
- ✅ Full TypeScript backend with Express
- ✅ Supabase integration with RLS
- ✅ JWT token authentication
- ✅ Rate limiting and security middleware
- ✅ Password reset and email verification
- ✅ Audit logging system
- ✅ Comprehensive validation and sanitization

### Frontend (l2-educa/src/)
- ✅ AuthContext with full authentication flow
- ✅ Login, Register, Forgot Password, Reset Password forms
- ✅ Protected routes
- ✅ Profile page with edit functionality
- ✅ Sidebar integration with login/logout buttons
- ✅ Beautiful glassmorphic design matching L2 EDUCA aesthetic

## 🚀 Setup Instructions

### 1. Backend Setup

#### A. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and API keys from Settings > API
3. In the SQL Editor, run the schema from `l2-educa-backend/supabase-schema.sql`

#### B. Configure Backend

```bash
cd l2-educa-backend
npm install
```

Create `.env` file with your credentials:

```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
JWT_SECRET=generate_a_secure_64_char_random_string
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### C. Start Backend

```bash
npm run dev
```

Server will start on `http://localhost:3001`

### 2. Frontend Setup

#### A. Configure Frontend

```bash
cd l2-educa
```

Create `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:3001
```

#### B. Start Frontend

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## 📖 Using the Authentication System

### For Users

1. **Register**: Go to `/register` or click "Cadastrar" in the sidebar
2. **Login**: Go to `/login` or click "Entrar" in the sidebar
3. **Profile**: Click your username in the sidebar when logged in
4. **Logout**: Click "Sair" in the sidebar
5. **Forgot Password**: Click "Esqueceu sua senha?" on login page

### For Developers

#### Check Authentication Status

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return <div>Welcome, {user.username}!</div>;
}
```

#### Protect a Route

```jsx
import ProtectedRoute from './components/auth/ProtectedRoute';

<Route path="/protected-page" element={
  <ProtectedRoute>
    <MyProtectedPage />
  </ProtectedRoute>
} />
```

#### Login/Logout Programmatically

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { login, logout, register } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      // Success!
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register('user@example.com', 'password', 'username');
      // Success!
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

## 🎨 UI Components

All authentication forms use the l2-educa glassmorphic design:

- **Glass cards** with backdrop blur
- **Aurora background** on auth pages
- **Gradient buttons** matching the platform aesthetic
- **Smooth animations** and transitions
- **Fully responsive** on all devices

## 🔒 Security Features

### Implemented

- ✅ **Password Requirements**: 8+ chars, uppercase, lowercase, number, special char
- ✅ **Rate Limiting**: 5 login attempts per 15 minutes
- ✅ **JWT Tokens**: Access (1h) + Refresh (7d) tokens
- ✅ **HttpOnly Cookies**: Refresh token stored securely
- ✅ **Input Validation**: Zod schemas on frontend and backend
- ✅ **XSS Prevention**: Input sanitization
- ✅ **CSRF Protection**: SameSite cookies
- ✅ **Row Level Security**: Supabase RLS policies
- ✅ **Audit Logging**: All auth events logged

### Future Enhancements (Prepared)

- 🔜 **Two-Factor Authentication (2FA)**
- 🔜 **OAuth Integration** (Google, GitHub)
- 🔜 **Account lockout** after failed attempts
- 🔜 **Password history** prevention

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env.local` is created in l2-educa folder
- Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set

### Backend Connection Failed
- Verify backend is running on port 3001
- Check VITE_API_URL in frontend `.env.local`
- Ensure CORS is configured for your frontend URL

### Email Not Sending
- Configure SMTP settings in Supabase dashboard
- Or use Supabase's built-in email service
- Check Authentication > Email Templates in Supabase

### Tokens Not Working
- Verify JWT_SECRET is set and is 64+ characters
- Check token expiration settings
- Ensure cookies are enabled in browser

## 📚 API Endpoints

See `l2-educa-backend/README.md` for complete API documentation.

### Quick Reference

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (protected)
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/change-password` - Change password (protected)
- `GET /api/auth/me` - Get current user (protected)
- `PATCH /api/auth/profile` - Update profile (protected)

## 🎯 Next Steps

1. **Test the authentication flow**:
   - Register a new account
   - Login with the account
   - Access profile page
   - Update profile information
   - Test logout

2. **Customize for your needs**:
   - Add more profile fields in `user_profiles` table
   - Implement role-based access control
   - Add 2FA when ready
   - Integrate OAuth providers

3. **Deploy to production**:
   - Set NODE_ENV=production
   - Enable email verification
   - Configure production Supabase instance
   - Set up HTTPS
   - Configure proper CORS origins

## 📞 Support

For issues or questions:
1. Check the backend README: `l2-educa-backend/README.md`
2. Review Supabase documentation: https://supabase.com/docs
3. Check browser console for errors
4. Verify all environment variables are set correctly

## 🎉 Congratulations!

Your L2 EDUCA platform now has a complete, secure authentication system ready for production use!

