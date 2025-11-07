/**
 * Profile Routes
 * API endpoints for user profile management
 */

import { Router } from 'express';
import { updateUsername, getUsernameStatus } from '../controllers/profileController';
import { supabaseAuthMiddleware } from '../middleware/auth';
import { rateLimiterMiddleware } from '../middleware/rateLimiter';

const router = Router();

/**
 * PATCH /api/profile/username
 * Update username (limited to 2 changes per week)
 */
router.patch(
  '/username',
  supabaseAuthMiddleware,
  rateLimiterMiddleware,
  updateUsername
);

/**
 * GET /api/profile/username-status
 * Get username change status
 */
router.get(
  '/username-status',
  supabaseAuthMiddleware,
  getUsernameStatus
);

export default router;

