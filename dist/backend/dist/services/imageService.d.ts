import { ImageValidationResult, ImageMetadata, OptimizationOptions, OptimizedImageResult } from '../types/image.types';
export declare function validateImageFile(buffer: Buffer): Promise<ImageValidationResult>;
export declare function stripMetadata(buffer: Buffer): Promise<Buffer>;
export declare function optimizeImage(buffer: Buffer, options?: OptimizationOptions): Promise<OptimizedImageResult>;
export declare function processAvatarUpload(buffer: Buffer): Promise<OptimizedImageResult>;
export declare function isAllowedImageType(mimeType: string): boolean;
export declare function getImageMetadata(buffer: Buffer): Promise<ImageMetadata>;
//# sourceMappingURL=imageService.d.ts.map