"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_QUALITY = exports.AVATAR_MAX_HEIGHT = exports.AVATAR_MAX_WIDTH = exports.MAX_IMAGE_SIZE = exports.ALLOWED_IMAGE_TYPES = exports.IMAGE_SIGNATURES = void 0;
exports.IMAGE_SIGNATURES = [
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
        bytes: [0x52, 0x49, 0x46, 0x46],
        mimeType: 'image/webp',
        extension: 'webp',
    },
    {
        bytes: [0x47, 0x49, 0x46, 0x38],
        mimeType: 'image/gif',
        extension: 'gif',
    },
];
exports.ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
];
exports.MAX_IMAGE_SIZE = 50 * 1024 * 1024;
exports.AVATAR_MAX_WIDTH = 600;
exports.AVATAR_MAX_HEIGHT = 600;
exports.DEFAULT_QUALITY = 85;
//# sourceMappingURL=image.types.js.map