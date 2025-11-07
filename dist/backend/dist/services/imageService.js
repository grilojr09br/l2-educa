"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageFile = validateImageFile;
exports.stripMetadata = stripMetadata;
exports.optimizeImage = optimizeImage;
exports.processAvatarUpload = processAvatarUpload;
exports.isAllowedImageType = isAllowedImageType;
exports.getImageMetadata = getImageMetadata;
const sharp_1 = __importDefault(require("sharp"));
const image_types_1 = require("../types/image.types");
async function validateImageFile(buffer) {
    try {
        if (buffer.length > image_types_1.MAX_IMAGE_SIZE) {
            return {
                valid: false,
                error: `File too large. Maximum size: ${image_types_1.MAX_IMAGE_SIZE / 1024 / 1024}MB`,
            };
        }
        if (buffer.length === 0) {
            return {
                valid: false,
                error: 'Empty file',
            };
        }
        let detectedType;
        for (const signature of image_types_1.IMAGE_SIGNATURES) {
            const matches = signature.bytes.every((byte, index) => buffer[index] === byte);
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
        try {
            const metadata = await (0, sharp_1.default)(buffer).metadata();
            if (!metadata.format) {
                return {
                    valid: false,
                    error: 'Unable to read image format',
                };
            }
            const sharpMimeType = `image/${metadata.format}`;
            if (!detectedType.includes(metadata.format) &&
                metadata.format !== 'jpeg') {
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
        }
        catch (sharpError) {
            return {
                valid: false,
                error: 'Corrupted or invalid image file',
            };
        }
    }
    catch (error) {
        console.error('Image validation error:', error);
        return {
            valid: false,
            error: 'Failed to validate image',
        };
    }
}
async function stripMetadata(buffer) {
    try {
        const stripped = await (0, sharp_1.default)(buffer)
            .rotate()
            .withMetadata({
            exif: {},
        })
            .toBuffer();
        return stripped;
    }
    catch (error) {
        console.error('Metadata stripping error:', error);
        throw new Error('Failed to strip metadata');
    }
}
async function optimizeImage(buffer, options = {}) {
    try {
        const { maxWidth = image_types_1.AVATAR_MAX_WIDTH, maxHeight = image_types_1.AVATAR_MAX_HEIGHT, quality = image_types_1.DEFAULT_QUALITY, format = 'jpeg', stripMetadata: strip = true, } = options;
        const originalMetadata = await (0, sharp_1.default)(buffer).metadata();
        const originalSize = buffer.length;
        let pipeline = (0, sharp_1.default)(buffer);
        if (strip) {
            pipeline = pipeline.withMetadata({
                exif: {},
            });
        }
        if (originalMetadata.width &&
            originalMetadata.height &&
            (originalMetadata.width > maxWidth || originalMetadata.height > maxHeight)) {
            pipeline = pipeline.resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true,
            });
        }
        switch (format) {
            case 'jpeg':
                pipeline = pipeline.jpeg({
                    quality,
                    progressive: true,
                    mozjpeg: true,
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
        const optimizedBuffer = await pipeline.toBuffer();
        const optimizedMetadata = await (0, sharp_1.default)(optimizedBuffer).metadata();
        const optimizedSize = optimizedBuffer.length;
        const reductionPercentage = ((originalSize - optimizedSize) / originalSize) * 100;
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
    }
    catch (error) {
        console.error('Image optimization error:', error);
        throw new Error('Failed to optimize image');
    }
}
async function processAvatarUpload(buffer) {
    try {
        const validation = await validateImageFile(buffer);
        if (!validation.valid) {
            throw new Error(validation.error || 'Invalid image file');
        }
        const cleanBuffer = await stripMetadata(buffer);
        let optimized;
        let currentQuality = image_types_1.DEFAULT_QUALITY;
        do {
            optimized = await optimizeImage(cleanBuffer, {
                maxWidth: image_types_1.AVATAR_MAX_WIDTH,
                maxHeight: image_types_1.AVATAR_MAX_HEIGHT,
                quality: currentQuality,
                format: 'jpeg',
                stripMetadata: false,
            });
            if (optimized.optimizedSize > 500 * 1024 && currentQuality > 60) {
                currentQuality -= 10;
            }
            else {
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
    }
    catch (error) {
        console.error('Avatar processing error:', error);
        throw error;
    }
}
function isAllowedImageType(mimeType) {
    return image_types_1.ALLOWED_IMAGE_TYPES.includes(mimeType.toLowerCase());
}
async function getImageMetadata(buffer) {
    try {
        const metadata = await (0, sharp_1.default)(buffer).metadata();
        return {
            width: metadata.width || 0,
            height: metadata.height || 0,
            format: metadata.format || 'unknown',
            size: buffer.length,
            hasAlpha: metadata.hasAlpha || false,
        };
    }
    catch (error) {
        throw new Error('Failed to read image metadata');
    }
}
//# sourceMappingURL=imageService.js.map