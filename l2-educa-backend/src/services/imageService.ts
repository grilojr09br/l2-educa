/**
 * Image Processing Service
 * Handles image validation, optimization, and security
 */

import sharp from 'sharp';
import {
  ImageValidationResult,
  ImageMetadata,
  OptimizationOptions,
  OptimizedImageResult,
  IMAGE_SIGNATURES,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  AVATAR_MAX_WIDTH,
  AVATAR_MAX_HEIGHT,
  DEFAULT_QUALITY,
} from '../types/image.types';

/**
 * Validates image file by checking magic bytes (file signature)
 * This prevents malicious files disguised as images
 */
export async function validateImageFile(
  buffer: Buffer
): Promise<ImageValidationResult> {
  try {
    // Check buffer size
    if (buffer.length > MAX_IMAGE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${MAX_IMAGE_SIZE / 1024 / 1024}MB`,
      };
    }

    // Check if buffer is empty
    if (buffer.length === 0) {
      return {
        valid: false,
        error: 'Empty file',
      };
    }

    // Check file signature (magic bytes)
    let detectedType: string | undefined;
    for (const signature of IMAGE_SIGNATURES) {
      const matches = signature.bytes.every(
        (byte, index) => buffer[index] === byte
      );
      if (matches) {
        detectedType = signature.mimeType;
        break;
      }
    }

    if (!detectedType) {
      return {
        valid: false,
        error: 'Invalid image file. File signature not recognized.',
      };
    }

    // Verify with Sharp (additional validation)
    try {
      const metadata = await sharp(buffer).metadata();
      if (!metadata.format) {
        return {
          valid: false,
          error: 'Unable to read image format',
        };
      }

      const sharpMimeType = `image/${metadata.format}`;
      
      // Check if detected type matches Sharp's analysis
      if (
        !detectedType.includes(metadata.format) &&
        metadata.format !== 'jpeg' // JPEG can be detected as jpg
      ) {
        return {
          valid: false,
          error: 'File signature mismatch. Possible file manipulation.',
        };
      }

      return {
        valid: true,
        mimeType: sharpMimeType,
        detectedType,
      };
    } catch (sharpError) {
      return {
        valid: false,
        error: 'Corrupted or invalid image file',
      };
    }
  } catch (error) {
    console.error('Image validation error:', error);
    return {
      valid: false,
      error: 'Failed to validate image',
    };
  }
}

/**
 * Strips metadata from image (EXIF, ICC profiles, etc.)
 * This removes potentially sensitive information and malicious payloads
 */
export async function stripMetadata(buffer: Buffer): Promise<Buffer> {
  try {
    // Re-encode image without metadata
    const stripped = await sharp(buffer)
      .rotate() // Auto-rotate based on EXIF (before stripping)
      .withMetadata({
        // Remove all metadata except orientation fix
        exif: {},
      })
      .toBuffer();

    return stripped;
  } catch (error) {
    console.error('Metadata stripping error:', error);
    throw new Error('Failed to strip metadata');
  }
}

/**
 * Optimizes image with compression and resizing
 * Supports progressive quality reduction for large files
 */
export async function optimizeImage(
  buffer: Buffer,
  options: OptimizationOptions = {}
): Promise<OptimizedImageResult> {
  try {
    const {
      maxWidth = AVATAR_MAX_WIDTH,
      maxHeight = AVATAR_MAX_HEIGHT,
      quality = DEFAULT_QUALITY,
      format = 'jpeg',
      stripMetadata: strip = true,
    } = options;

    // Get original metadata
    const originalMetadata = await sharp(buffer).metadata();
    const originalSize = buffer.length;

    // Start with Sharp pipeline
    let pipeline = sharp(buffer);

    // Strip metadata if requested
    if (strip) {
      pipeline = pipeline.withMetadata({
        exif: {},
      });
    }

    // Resize if needed (maintain aspect ratio)
    if (
      originalMetadata.width &&
      originalMetadata.height &&
      (originalMetadata.width > maxWidth || originalMetadata.height > maxHeight)
    ) {
      pipeline = pipeline.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Apply format-specific optimization
    switch (format) {
      case 'jpeg':
        pipeline = pipeline.jpeg({
          quality,
          progressive: true,
          mozjpeg: true, // Use MozJPEG for better compression
        });
        break;
      case 'png':
        pipeline = pipeline.png({
          quality,
          compressionLevel: 9,
          progressive: true,
        });
        break;
      case 'webp':
        pipeline = pipeline.webp({
          quality,
          effort: 6,
        });
        break;
    }

    // Execute pipeline
    const optimizedBuffer = await pipeline.toBuffer();
    const optimizedMetadata = await sharp(optimizedBuffer).metadata();

    const optimizedSize = optimizedBuffer.length;
    const reductionPercentage =
      ((originalSize - optimizedSize) / originalSize) * 100;

    return {
      buffer: optimizedBuffer,
      metadata: {
        width: optimizedMetadata.width || 0,
        height: optimizedMetadata.height || 0,
        format: optimizedMetadata.format || format,
        size: optimizedSize,
        hasAlpha: optimizedMetadata.hasAlpha || false,
      },
      originalSize,
      optimizedSize,
      reductionPercentage,
    };
  } catch (error) {
    console.error('Image optimization error:', error);
    throw new Error('Failed to optimize image');
  }
}

/**
 * Main function to process avatar uploads
 * Validates, strips metadata, and optimizes in one pipeline
 */
export async function processAvatarUpload(
  buffer: Buffer
): Promise<OptimizedImageResult> {
  try {
    // Step 1: Validate file
    const validation = await validateImageFile(buffer);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid image file');
    }

    // Step 2: Strip metadata for security
    const cleanBuffer = await stripMetadata(buffer);

    // Step 3: Optimize with progressive quality
    let optimized: OptimizedImageResult;
    let currentQuality = DEFAULT_QUALITY;

    // Try optimization with progressive quality reduction
    do {
      optimized = await optimizeImage(cleanBuffer, {
        maxWidth: AVATAR_MAX_WIDTH,
        maxHeight: AVATAR_MAX_HEIGHT,
        quality: currentQuality,
        format: 'jpeg', // Always convert to JPEG for consistency
        stripMetadata: false, // Already stripped
      });

      // If file is still too large, reduce quality
      if (optimized.optimizedSize > 500 * 1024 && currentQuality > 60) {
        currentQuality -= 10;
      } else {
        break;
      }
    } while (currentQuality >= 60);

    console.log('Image processed:', {
      originalSize: `${(optimized.originalSize / 1024).toFixed(2)} KB`,
      optimizedSize: `${(optimized.optimizedSize / 1024).toFixed(2)} KB`,
      reduction: `${optimized.reductionPercentage.toFixed(1)}%`,
      dimensions: `${optimized.metadata.width}x${optimized.metadata.height}`,
    });

    return optimized;
  } catch (error) {
    console.error('Avatar processing error:', error);
    throw error;
  }
}

/**
 * Check if MIME type is allowed
 */
export function isAllowedImageType(mimeType: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(mimeType.toLowerCase());
}

/**
 * Get image metadata without processing
 */
export async function getImageMetadata(buffer: Buffer): Promise<ImageMetadata> {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'unknown',
      size: buffer.length,
      hasAlpha: metadata.hasAlpha || false,
    };
  } catch (error) {
    throw new Error('Failed to read image metadata');
  }
}

