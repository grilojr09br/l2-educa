/**
 * Image Routes
 * API endpoints for image processing
 */

import { Router } from 'express';
import multer from 'multer';
import { optimizeAvatar, healthCheck } from '../controllers/imageController';
import { authenticateToken } from '../middleware/auth';
import { rateLimiterMiddleware } from '../middleware/rateLimiter';

const router = Router();

// Configure multer for memory storage (process in-memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
  fileFilter: (_req, file, cb) => {
    // Basic MIME type check (will be validated further in service)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  },
});

/**
 * POST /api/images/optimize-avatar
 * Optimize avatar image with security validation
 * Requires authentication
 */
router.post(
  '/optimize-avatar',
  authenticateToken,
  rateLimiterMiddleware,
  upload.single('image'),
  optimizeAvatar
);

/**
 * GET /api/images/health
 * Health check endpoint
 */
router.get('/health', healthCheck);

export default router;

