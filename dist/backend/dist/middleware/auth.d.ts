import { Request, Response, NextFunction } from 'express';
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const supabaseAuthMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const optionalAuthMiddleware: (req: Request, _res: Response, next: NextFunction) => void;
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map