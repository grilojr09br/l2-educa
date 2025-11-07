import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log error for debugging
  console.error('[Error]', {
    timestamp: new Date().toISOString(),
    method: _req.method,
    path: _req.path,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: 'Erro de validação',
      details: err.issues.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
      statusCode: 400,
    });
    return;
  }

  // Handle Supabase errors
  if (err.code && err.message) {
    let statusCode = 500;
    let message = err.message;

    // Map common Supabase error codes
    switch (err.code) {
      case '23505': // Unique violation
        statusCode = 409;
        message = 'Este valor já está em uso';
        break;
      case '23503': // Foreign key violation
        statusCode = 400;
        message = 'Referência inválida';
        break;
      case '42P01': // Undefined table
        statusCode = 500;
        message = 'Erro de configuração do banco de dados';
        break;
    }

    res.status(statusCode).json({
      success: false,
      error: message,
      statusCode,
    });
    return;
  }

  // Handle JWT errors (if not caught by auth middleware)
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      error: 'Token inválido',
      statusCode: 401,
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: 'Token expirado',
      statusCode: 401,
    });
    return;
  }

  // Handle custom application errors
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message || 'Erro na aplicação',
      statusCode: err.statusCode,
    });
    return;
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : err.message,
    statusCode: 500,
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    statusCode: 404,
  });
};

/**
 * Async error wrapper to catch errors in async route handlers
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

