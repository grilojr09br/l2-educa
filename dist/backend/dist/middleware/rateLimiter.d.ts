import { Request, Response, NextFunction } from 'express';
declare class RateLimiter {
    private store;
    private windowMs;
    private maxRequests;
    constructor(windowMs?: number, maxRequests?: number);
    private cleanup;
    middleware: (req: Request, res: Response, next: NextFunction) => void;
    private getIdentifier;
}
export declare const generalRateLimiter: RateLimiter;
export declare const authRateLimiter: RateLimiter;
export declare const strictRateLimiter: RateLimiter;
export declare const rateLimiterMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const authRateLimiterMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const strictRateLimiterMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=rateLimiter.d.ts.map