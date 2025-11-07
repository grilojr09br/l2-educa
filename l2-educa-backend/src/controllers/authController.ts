import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { AuditService } from '../services/auditService';
import {
  registerSchema,
  loginSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
  changePasswordSchema,
  updateProfileSchema,
  safeValidate,
} from '../utils/validation';
import { env } from '../config/environment';

/**
 * Authentication Controller
 */
export class AuthController {
  /**
   * Register new user
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const validation = safeValidate(registerSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: validation.errors.issues,
          statusCode: 400,
        });
        return;
      }

      const { email, password, username } = validation.data;

      // Register user
      const user = await AuthService.register(email, password, username);

      // Log registration
      await AuditService.logRegistration(
        user.id,
        req.ip,
        req.headers['user-agent']
      );

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        },
        message: 'Usuário registrado com sucesso',
        statusCode: 201,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao registrar',
        statusCode: 400,
      });
    }
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const validation = safeValidate(loginSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: validation.errors.issues,
          statusCode: 400,
        });
        return;
      }

      const { email, password } = validation.data;

      try {
        // Attempt login
        const response = await AuthService.login(email, password);

        // Set refresh token as httpOnly cookie
        res.cookie('refreshToken', response.refreshToken, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Log successful login
        await AuditService.logLogin(
          response.user.id,
          req.ip,
          req.headers['user-agent']
        );

        res.status(200).json({
          success: true,
          data: {
            accessToken: response.accessToken,
            user: {
              id: response.user.id,
              email: response.user.email,
              username: response.user.username,
            },
          },
          message: 'Login realizado com sucesso',
          statusCode: 200,
        });
      } catch (loginError) {
        // Log failed login
        await AuditService.logLoginFailure(
          email,
          req.ip,
          req.headers['user-agent']
        );
        throw loginError;
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
        statusCode: 401,
      });
    }
  }

  /**
   * Logout user
   */
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Usuário não autenticado',
          statusCode: 401,
        });
        return;
      }

      await AuthService.logout(req.user.userId);

      // Log logout
      await AuditService.logLogout(
        req.user.userId,
        req.ip,
        req.headers['user-agent']
      );

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso',
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao fazer logout',
        statusCode: 500,
      });
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          error: 'Refresh token não fornecido',
          statusCode: 401,
        });
        return;
      }

      const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

      res.status(200).json({
        success: true,
        data: { accessToken: newAccessToken },
        message: 'Token renovado com sucesso',
        statusCode: 200,
      });
    } catch (error) {
      res.clearCookie('refreshToken');
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao renovar token',
        statusCode: 401,
      });
    }
  }

  /**
   * Request password reset
   */
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const validation = safeValidate(passwordResetRequestSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: 'Email inválido',
          statusCode: 400,
        });
        return;
      }

      const { email } = validation.data;

      await AuthService.requestPasswordReset(email);

      // Log password reset request
      await AuditService.logPasswordResetRequest(
        email,
        req.ip,
        req.headers['user-agent']
      );

      // Always return success to prevent email enumeration
      res.status(200).json({
        success: true,
        message: 'Se o email existir, um link de recuperação será enviado',
        statusCode: 200,
      });
    } catch (error) {
      // Always return success for security
      res.status(200).json({
        success: true,
        message: 'Se o email existir, um link de recuperação será enviado',
        statusCode: 200,
      });
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const validation = safeValidate(passwordResetConfirmSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: validation.errors.issues,
          statusCode: 400,
        });
        return;
      }

      const { newPassword } = validation.data;

      await AuthService.resetPassword(newPassword);

      // Note: We can't log the user ID here as we don't have it from the token
      // The audit log would need to be done in the service layer with token decoding

      res.status(200).json({
        success: true,
        message: 'Senha redefinida com sucesso',
        statusCode: 200,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao redefinir senha',
        statusCode: 400,
      });
    }
  }

  /**
   * Change password (requires authentication)
   */
  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Usuário não autenticado',
          statusCode: 401,
        });
        return;
      }

      // Validate input
      const validation = safeValidate(changePasswordSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: validation.errors.issues,
          statusCode: 400,
        });
        return;
      }

      const { currentPassword, newPassword } = validation.data;

      await AuthService.changePassword(req.user.userId, currentPassword, newPassword);

      // Log password change
      await AuditService.logPasswordChange(
        req.user.userId,
        req.ip,
        req.headers['user-agent']
      );

      res.status(200).json({
        success: true,
        message: 'Senha alterada com sucesso',
        statusCode: 200,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao alterar senha',
        statusCode: 400,
      });
    }
  }

  /**
   * Verify email
   */
  static async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.query;

      if (!token || typeof token !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Token não fornecido',
          statusCode: 400,
        });
        return;
      }

      await AuthService.verifyEmail(token);

      res.status(200).json({
        success: true,
        message: 'Email verificado com sucesso',
        statusCode: 200,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao verificar email',
        statusCode: 400,
      });
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Usuário não autenticado',
          statusCode: 401,
        });
        return;
      }

      const user = await AuthService.getUserById(req.user.userId);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'Usuário não encontrado',
          statusCode: 404,
        });
        return;
      }

      const profile = await AuthService.getUserProfile(req.user.userId);

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            created_at: user.created_at,
          },
          profile,
        },
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar usuário',
        statusCode: 500,
      });
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Usuário não autenticado',
          statusCode: 401,
        });
        return;
      }

      // Validate input
      const validation = safeValidate(updateProfileSchema, req.body);
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: validation.errors.issues,
          statusCode: 400,
        });
        return;
      }

      const profile = await AuthService.updateProfile(req.user.userId, validation.data);

      res.status(200).json({
        success: true,
        data: { profile },
        message: 'Perfil atualizado com sucesso',
        statusCode: 200,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar perfil',
        statusCode: 400,
      });
    }
  }
}

