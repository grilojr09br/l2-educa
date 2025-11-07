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
export declare const IMAGE_SIGNATURES: FileSignature[];
export declare const ALLOWED_IMAGE_TYPES: string[];
export declare const MAX_IMAGE_SIZE: number;
export declare const AVATAR_MAX_WIDTH = 600;
export declare const AVATAR_MAX_HEIGHT = 600;
export declare const DEFAULT_QUALITY = 85;
//# sourceMappingURL=image.types.d.ts.map