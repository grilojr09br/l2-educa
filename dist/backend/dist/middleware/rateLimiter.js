"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictRateLimiterMiddleware = exports.authRateLimiterMiddleware = exports.rateLimiterMiddleware = exports.strictRateLimiter = exports.authRateLimiter = exports.generalRateLimiter = void 0;
class RateLimiter {
    constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
        this.store = new Map();
        this.middleware = (req, res, next) => {
            const identifier = this.getIdentifier(req);
            const now = Date.now();
            let entry = this.store.get(identifier);
            if (!entry || now > entry.resetTime) {
                entry = {
                    count: 0,
                    resetTime: now + this.windowMs,
                };
            }
            entry.count++;
            if (entry.count > this.maxRequests) {
                res.status(429).json({
                    success: false,
                    error: 'Muitas requisições. Tente novamente mais tarde.',
                    statusCode: 429,
                    retryAfter: Math.ceil((entry.resetTime - now) / 1000),
                });
                return;
            }
            this.store.set(identifier, entry);
            res.setHeader('X-RateLimit-Limit', this.maxRequests.toString());
            res.setHeader('X-RateLimit-Remaining', (this.maxRequests - entry.count).toString());
            res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
            next();
        };
        this.windowMs = windowMs;
        this.maxRequests = maxRequests;
        setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.store.entries()) {
            if (now > entry.resetTime) {
                this.store.delete(key);
            }
        }
    }
    getIdentifier(req) {
        const forwarded = req.headers['x-forwarded-for'];
        if (typeof forwarded === 'string') {
            return forwarded.split(',')[0].trim();
        }
        return req.ip || req.socket.remoteAddress || 'unknown';
    }
}
exports.generalRateLimiter = new RateLimiter(15 * 60 * 1000, 100);
exports.authRateLimiter = new RateLimiter(15 * 60 * 1000, 5);
exports.strictRateLimiter = new RateLimiter(60 * 60 * 1000, 3);
exports.rateLimiterMiddleware = exports.generalRateLimiter.middleware;
exports.authRateLimiterMiddleware = exports.authRateLimiter.middleware;
exports.strictRateLimiterMiddleware = exports.strictRateLimiter.middleware;
//# sourceMappingURL=rateLimiter.js.map