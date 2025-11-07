/**
 * Image Controller
 * Handles image optimization API endpoints
 */

import { Request, Response } from 'express';
import { processAvatarUpload } from '../services/imageService';

/**
 * POST /api/images/optimize-avatar
 * Optimizes avatar image with security validation
 */
export async function optimizeAvatar(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
      return;
    }

    // Check if file was uploaded
    if (!req.file) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'No image file provided',
      });
      return;
    }

    // Check file size
    if (!req.file.buffer || req.file.buffer.length === 0) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Empty file',
      });
      return;
    }

    console.log('Processing avatar upload:', {
      userId: req.user.id,
      originalSize: `${(req.file.size / 1024).toFixed(2)} KB`,
      mimeType: req.file.mimetype,
    });

    // Process the image
    const result = await processAvatarUpload(req.file.buffer);

    // Return optimized image as blob
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': result.optimizedSize.toString(),
      'X-Original-Size': result.originalSize.toString(),
      'X-Optimized-Size': result.optimizedSize.toString(),
      'X-Reduction': `${result.reductionPercentage.toFixed(1)}%`,
    });

    res.send(result.buffer);
  } catch (error: any) {
    console.error('Avatar optimization error:', error);
    
    // Send appropriate error response
    if (error.message?.includes('Invalid') || error.message?.includes('format')) {
      res.status(400).json({
        error: 'Bad Request',
        message: error.message || 'Invalid image file',
      });
    } else if (error.message?.includes('too large')) {
      res.status(413).json({
        error: 'Payload Too Large',
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to process image',
      });
    }
  }
}

/**
 * GET /api/images/health
 * Health check endpoint
 */
export async function healthCheck(_req: Request, res: Response): Promise<void> {
  res.json({
    status: 'ok',
    service: 'image-processing',
    timestamp: new Date().toISOString(),
  });
}

