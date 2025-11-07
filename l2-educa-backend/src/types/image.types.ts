/**
 * Image Processing Types
 * Type definitions for image optimization and security
 */

export interface ImageValidationResult {
  valid: boolean;
  mimeType?: string;
  detectedType?: string;
  error?: string;
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  hasAlpha: boolean;
}

export interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  stripMetadata?: boolean;
}

export interface OptimizedImageResult {
  buffer: Buffer;
  metadata: ImageMetadata;
  originalSize: number;
  optimizedSize: number;
  reductionPercentage: number;
}

export interface FileSignature {
  bytes: number[];
  mimeType: string;
  extension: string;
}

// Magic byte signatures for image file types
export const IMAGE_SIGNATURES: FileSignature[] = [
  {
    bytes: [0xff, 0xd8, 0xff],
    mimeType: 'image/jpeg',
    extension: 'jpg',
  },
  {
    bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    mimeType: 'image/png',
    extension: 'png',
  },
  {
    bytes: [0x52, 0x49, 0x46, 0x46], // RIFF
    mimeType: 'image/webp',
    extension: 'webp',
  },
  {
    bytes: [0x47, 0x49, 0x46, 0x38], // GIF8
    mimeType: 'image/gif',
    extension: 'gif',
  },
];

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
export const AVATAR_MAX_WIDTH = 600;
export const AVATAR_MAX_HEIGHT = 600;
export const DEFAULT_QUALITY = 85;

