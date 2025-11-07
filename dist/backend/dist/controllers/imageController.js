"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeAvatar = optimizeAvatar;
exports.healthCheck = healthCheck;
const imageService_1 = require("../services/imageService");
async function optimizeAvatar(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Authentication required',
            });
            return;
        }
        if (!req.file) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'No image file provided',
            });
            return;
        }
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
        const result = await (0, imageService_1.processAvatarUpload)(req.file.buffer);
        res.set({
            'Content-Type': 'image/jpeg',
            'Content-Length': result.optimizedSize.toString(),
            'X-Original-Size': result.originalSize.toString(),
            'X-Optimized-Size': result.optimizedSize.toString(),
            'X-Reduction': `${result.reductionPercentage.toFixed(1)}%`,
        });
        res.send(result.buffer);
    }
    catch (error) {
        console.error('Avatar optimization error:', error);
        if (error.message?.includes('Invalid') || error.message?.includes('format')) {
            res.status(400).json({
                error: 'Bad Request',
                message: error.message || 'Invalid image file',
            });
        }
        else if (error.message?.includes('too large')) {
            res.status(413).json({
                error: 'Payload Too Large',
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Failed to process image',
            });
        }
    }
}
async function healthCheck(_req, res) {
    res.json({
        status: 'ok',
        service: 'image-processing',
        timestamp: new Date().toISOString(),
    });
}
//# sourceMappingURL=imageController.js.map