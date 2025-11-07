import { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  public middleware = (req: Request, res: Response, next: NextFunction): void => {
    const identifier = this.getIdentifier(req);
    const now = Date.now();
    
    let entry = this.store.get(identifier);

    // Reset if window has expired
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

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', this.maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', (this.maxRequests - entry.count).toString());
    res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());

    next();
  };

  private getIdentifier(req: Request): string {
    // Try to get real IP behind proxy
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return req.ip || req.socket.remoteAddress || 'unknown';
  }
}

// Create different rate limiters for different endpoints
export const generalRateLimiter = new RateLimiter(15 * 60 * 1000, 100); // 100 req per 15 min
export const authRateLimiter = new RateLimiter(15 * 60 * 1000, 10); // 10 req per 15 min (for login)
export const strictRateLimiter = new RateLimiter(15 * 60 * 1000, 20); // 20 req per 15 min (for testing - reduce in production!)

// Export middleware functions
export const rateLimiterMiddleware = generalRateLimiter.middleware;
export const authRateLimiterMiddleware = authRateLimiter.middleware;
export const strictRateLimiterMiddleware = strictRateLimiter.middleware;

