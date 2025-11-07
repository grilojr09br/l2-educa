# 📦 Backend Installation Guide

## Quick Start

### Install Dependencies

```bash
cd l2-educa-backend
npm install
```

This will install all required packages including the new image processing dependencies:
- `sharp@^0.33.0` - High-performance image processing
- `multer@^1.4.5-lts.1` - File upload handling

### Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

### Setup Supabase Storage

1. Open your Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `scripts/setup-avatar-storage.sql`
4. Click "Run"
5. Verify you see "Setup complete" message

### Verify Installation

Check if image optimization endpoint is working:

```bash
curl http://localhost:3001/api/images/health
```

Should return:
```json
{
  "status": "ok",
  "service": "image-processing",
  "timestamp": "2025-11-07T..."
}
```

## Production Deployment

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables

Ensure these are set in production:
```bash
NODE_ENV=production
JWT_SECRET=<your-secret>
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_KEY=<your-service-key>
SUPABASE_ANON_KEY=<your-anon-key>
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## Dependencies

### Core Dependencies
- `express` - Web framework
- `@supabase/supabase-js` - Supabase client
- `sharp` ⭐ NEW - Image processing
- `multer` ⭐ NEW - File uploads
- `helmet` - Security headers
- `cors` - Cross-origin requests
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `zod` - Schema validation

### Dev Dependencies
- `typescript` - Type safety
- `ts-node-dev` - Development server
- `@types/*` - TypeScript definitions
- `jest` - Testing
- `eslint` - Linting
- `prettier` - Code formatting

## Troubleshooting

### Sharp Installation Issues

If Sharp fails to install:

**On Windows:**
```bash
npm install --ignore-scripts
npm rebuild sharp
```

**On Linux:**
```bash
# Install build tools
sudo apt-get install -y build-essential libvips-dev

# Then install
npm install
```

**On macOS:**
```bash
# Install with Homebrew
brew install vips

# Then install
npm install
```

### Memory Issues

Sharp can use significant memory for large images. In production:

```javascript
// Add to server.ts if needed
process.env.UV_THREADPOOL_SIZE = '4'; // Adjust based on CPU cores
```

### Port Already in Use

```bash
# Find process using port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev
```

## Testing

### Run Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# Watch mode
npm run test:watch
```

### Manual API Testing

Use the provided Postman collection or curl:

```bash
# Health check
curl http://localhost:3001/health

# Image optimization (requires auth token)
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@path/to/image.jpg" \
  http://localhost:3001/api/images/optimize-avatar
```

## Performance Notes

### Sharp Performance
- Fast: ~50-200ms for typical avatar (1-5MB)
- Memory: ~200-500MB per concurrent request
- CPU: Utilizes multiple cores efficiently

### Recommendations
- Deploy with at least 1GB RAM
- Enable Node.js clustering for multi-core utilization
- Consider CDN for serving optimized images
- Monitor Sharp process memory usage

## Support

For issues:
1. Check logs: `tail -f logs/error.log`
2. Review troubleshooting section above
3. Check Sharp documentation: https://sharp.pixelplumbing.com/
4. Check backend code comments

---

✅ Installation complete! Your backend is ready to process images securely.

