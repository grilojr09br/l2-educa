import { Request, Response, NextFunction } from 'express';
export declare const errorHandler: (err: any, _req: Request, res: Response, _next: NextFunction) => void;
export declare const notFoundHandler: (_req: Request, res: Response, _next: NextFunction) => void;
export declare const asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map