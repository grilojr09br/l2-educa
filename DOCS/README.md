# L2 EDUCA Backend Authentication Service

Secure, production-ready authentication backend built with Node.js, Express, TypeScript, and Supabase.

## 🚀 Features

- ✅ **Secure Authentication** - JWT-based with access and refresh tokens
- ✅ **Email/Password Registration** - With email verification
- ✅ **Password Management** - Change password, forgot password flow
- ✅ **Rate Limiting** - Protection against brute force attacks
- ✅ **Audit Logging** - Track all authentication events
- ✅ **Input Validation** - Zod schemas for all inputs
- ✅ **XSS Prevention** - Input sanitization
- ✅ **CORS Protection** - Whitelist-based origins
- ✅ **Security Headers** - Helmet.js configuration
- ✅ **Row Level Security** - Supabase RLS for data isolation
- 🔜 **2FA Support** - Ready for future implementation
- 🔜 **OAuth Integration** - Ready for Google, GitHub, etc.

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Supabase account and project

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

#### A. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and API keys

#### B. Run SQL Schema

Execute the SQL file in your Supabase SQL Editor:

```sql
-- See supabase-schema.sql for complete schema
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_KEY` - Service role key (from Supabase dashboard)
- `SUPABASE_ANON_KEY` - Anonymous key (from Supabase dashboard)
- `JWT_SECRET` - Generate a secure 64+ character random string

### 4. Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🚀 Running the Server

### Development

```bash
npm run dev
```

Server will start on `http://localhost:3001`

### Production

```bash
npm run build
npm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:3001/api/auth
```

### Endpoints

#### Public Endpoints

##### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "username": "johndoe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe"
    }
  },
  "message": "Usuário registrado com sucesso",
  "statusCode": 201
}
```

##### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe"
    }
  },
  "message": "Login realizado com sucesso",
  "statusCode": 200
}
```

**Note:** Refresh token is set as an HttpOnly cookie.

##### Refresh Token

```http
POST /api/auth/refresh-token
Cookie: refreshToken=...
```

##### Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

##### Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!"
}
```

##### Verify Email

```http
GET /api/auth/verify-email?token=verification_token
```

#### Protected Endpoints

**Note:** Include JWT token in Authorization header:
```
Authorization: Bearer <access_token>
```

##### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

##### Change Password

```http
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

##### Update Profile

```http
PATCH /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "John Doe",
  "bio": "Software developer",
  "avatar_url": "https://example.com/avatar.jpg",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

##### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Rate Limits

- **General endpoints:** 100 requests per 15 minutes
- **Login:** 5 requests per 15 minutes
- **Password reset:** 3 requests per hour

## 🔐 Security Features

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Token Management

- **Access Token:** Expires in 1 hour
- **Refresh Token:** Expires in 7 days, stored in HttpOnly cookie

### Protection Mechanisms

1. **Rate Limiting** - Prevent brute force attacks
2. **Input Validation** - Zod schemas for all inputs
3. **Input Sanitization** - Prevent XSS attacks
4. **SQL Injection Prevention** - Parameterized queries via Supabase
5. **CSRF Protection** - SameSite cookies
6. **Security Headers** - Helmet.js configuration
7. **CORS Protection** - Origin whitelist
8. **Audit Logging** - Track all authentication events

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Watch mode
npm run test:watch
```

## 📁 Project Structure

```
l2-educa-backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── environment.ts
│   │   └── supabase.ts
│   ├── middleware/       # Express middleware
│   │   ├── auth.ts
│   │   ├── rateLimiter.ts
│   │   └── errorHandler.ts
│   ├── services/         # Business logic
│   │   ├── authService.ts
│   │   └── auditService.ts
│   ├── controllers/      # Request handlers
│   │   └── authController.ts
│   ├── routes/           # API routes
│   │   └── auth.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── validation.ts
│   │   └── sanitization.ts
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── tests/                # Test files
│   ├── unit/
│   └── integration/
├── .env.example          # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🚢 Deployment

### Environment Variables for Production

Ensure the following are set in production:

```bash
NODE_ENV=production
JWT_SECRET=your_production_secret_here
FRONTEND_URL=https://your-frontend-domain.com
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Docker Deployment

```bash
# Build
docker build -t l2-educa-backend .

# Run
docker run -p 3001:3001 --env-file .env l2-educa-backend
```

### Security Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Enable HTTPS in production
- [ ] Configure proper CORS origins
- [ ] Enable email verification in Supabase
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Review and test rate limits
- [ ] Enable Supabase RLS policies
- [ ] Set up SSL certificates

## 🐛 Troubleshooting

### Common Issues

**Error: Missing environment variable**
- Ensure all required variables in `.env.example` are set in your `.env` file

**Error: JWT_SECRET must be at least 32 characters**
- Generate a new secret using the command in the setup section

**Error: Connection to Supabase failed**
- Verify your SUPABASE_URL and keys are correct
- Check if your Supabase project is active

**Error: CORS blocked**
- Add your frontend URL to ALLOWED_ORIGINS in `.env`

## 📖 Further Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zod Documentation](https://zod.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 👥 Authors

L2 EDUCA Team

## 🔮 Future Enhancements

- [ ] Two-Factor Authentication (2FA)
- [ ] OAuth Integration (Google, GitHub)
- [ ] Email templates customization
- [ ] Advanced audit logging dashboard
- [ ] User roles and permissions
- [ ] Account lockout after failed attempts
- [ ] Password history
- [ ] Session management dashboard

