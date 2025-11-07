import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import {
  rateLimiterMiddleware,
  authRateLimiterMiddleware,
  strictRateLimiterMiddleware,
} from '../middleware/rateLimiter';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Public routes
router.post(
  '/register',
  rateLimiterMiddleware,
  asyncHandler(AuthController.register)
);

router.post(
  '/check-user',
  strictRateLimiterMiddleware, // Very strict to prevent user enumeration
  asyncHandler(AuthController.checkUserExists)
);

router.post(
  '/login',
  authRateLimiterMiddleware, // Stricter rate limit for login
  asyncHandler(AuthController.login)
);

router.post(
  '/forgot-password',
  strictRateLimiterMiddleware, // Very strict rate limit
  asyncHandler(AuthController.forgotPassword)
);

router.post(
  '/reset-password',
  rateLimiterMiddleware,
  asyncHandler(AuthController.resetPassword)
);

router.post(
  '/refresh-token',
  rateLimiterMiddleware,
  asyncHandler(AuthController.refreshToken)
);

router.get(
  '/verify-email',
  rateLimiterMiddleware,
  asyncHandler(AuthController.verifyEmail)
);

// Protected routes (require authentication)
router.post(
  '/logout',
  authMiddleware,
  asyncHandler(AuthController.logout)
);

router.post(
  '/change-password',
  authMiddleware,
  rateLimiterMiddleware,
  asyncHandler(AuthController.changePassword)
);

router.get(
  '/me',
  authMiddleware,
  asyncHandler(AuthController.getCurrentUser)
);

router.patch(
  '/profile',
  authMiddleware,
  rateLimiterMiddleware,
  asyncHandler(AuthController.updateProfile)
);

export default router;

