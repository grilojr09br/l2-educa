import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment';
import { supabase } from '../config/supabase';
import { TokenPayload } from '../types';

/**
 * Authentication middleware to verify JWT tokens
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Token não fornecido',
        statusCode: 401,
      });
      return;
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          success: false,
          error: 'Token expirado',
          statusCode: 401,
        });
        return;
      }

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(403).json({
          success: false,
          error: 'Token inválido',
          statusCode: 403,
        });
        return;
      }

      throw error;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar autenticação',
      statusCode: 500,
    });
  }
};

/**
 * Supabase token authentication middleware
 * Validates Supabase JWT tokens directly
 */
export const supabaseAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Token não fornecido',
        statusCode: 401,
      });
      return;
    }

    const token = authHeader.substring(7);

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(403).json({
        success: false,
        error: 'Token inválido ou expirado',
        statusCode: 403,
      });
      return;
    }

    // Add user info to request
    req.user = {
      id: user.id,
      userId: user.id,
      email: user.email || '',
      role: user.role || 'user',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    };

    next();
  } catch (error) {
    console.error('Supabase auth error:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar autenticação',
      statusCode: 500,
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token provided
 * Useful for endpoints that work differently for authenticated vs unauthenticated users
 */
export const optionalAuthMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
      req.user = decoded;
    } catch (error) {
      // Silently ignore invalid tokens for optional auth
    }

    next();
  } catch (error) {
    next();
  }
};

// Alias for consistency with other parts of the codebase
export const authenticateToken = supabaseAuthMiddleware;

