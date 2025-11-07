"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const auditService_1 = require("../services/auditService");
const validation_1 = require("../utils/validation");
const environment_1 = require("../config/environment");
class AuthController {
    static async register(req, res) {
        try {
            const validation = (0, validation_1.safeValidate)(validation_1.registerSchema, req.body);
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
            const user = await authService_1.AuthService.register(email, password, username);
            await auditService_1.AuditService.logRegistration(user.id, req.ip, req.headers['user-agent']);
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
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro ao registrar',
                statusCode: 400,
            });
        }
    }
    static async login(req, res) {
        try {
            const validation = (0, validation_1.safeValidate)(validation_1.loginSchema, req.body);
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
                const response = await authService_1.AuthService.login(email, password);
                res.cookie('refreshToken', response.refreshToken, {
                    httpOnly: true,
                    secure: environment_1.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                await auditService_1.AuditService.logLogin(response.user.id, req.ip, req.headers['user-agent']);
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
            }
            catch (loginError) {
                await auditService_1.AuditService.logLoginFailure(email, req.ip, req.headers['user-agent']);
                throw loginError;
            }
        }
        catch (error) {
            res.status(401).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro ao fazer login',
                statusCode: 401,
            });
        }
    }
    static async logout(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: 'Usuário não autenticado',
                    statusCode: 401,
                });
                return;
            }
            await authService_1.AuthService.logout(req.user.userId);
            await auditService_1.AuditService.logLogout(req.user.userId, req.ip, req.headers['user-agent']);
            res.clearCookie('refreshToken');
            res.status(200).json({
                success: true,
                message: 'Logout realizado com sucesso',
                statusCode: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: 'Erro ao fazer logout',
                statusCode: 500,
            });
        }
    }
    static async refreshToken(req, res) {
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
            const newAccessToken = await authService_1.AuthService.refreshAccessToken(refreshToken);
            res.status(200).json({
                success: true,
                data: { accessToken: newAccessToken },
                message: 'Token renovado com sucesso',
                statusCode: 200,
            });
        }
        catch (error) {
            res.clearCookie('refreshToken');
            res.status(401).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro ao renovar token',
                statusCode: 401,
            });
        }
    }
    static async forgotPassword(req, res) {
        try {
            const validation = (0, validation_1.safeValidate)(validation_1.passwordResetRequestSchema, req.body);
            if (!validation.success) {
                res.status(400).json({
                    success: false,
                    error: 'Email inválido',
                    statusCode: 400,
                });
                return;
            }
            const { email } = validation.data;
            await authService_1.AuthService.requestPasswordReset(email);
            await auditService_1.AuditService.logPasswordResetRequest(email, req.ip, req.headers['user-agent']);
            res.status(200).json({
                success: true,
                message: 'Se o email existir, um link de recuperação será enviado',
                statusCode: 200,
            });
        }
        catch (error) {
            res.status(200).json({
                success: true,
                message: 'Se o email existir, um link de recuperação será enviado',
                statusCode: 200,
            });
        }
    }
    static async resetPassword(req, res) {
        try {
            const validation = (0, validation_1.safeValidate)(validation_1.passwordResetConfirmSchema, req.body);
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
            await authService_1.AuthService.resetPassword(newPassword);
            res.status(200).json({
                success: true,
                message: 'Senha redefinida com sucesso',
                statusCode: 200,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro ao redefinir senha',
                statusCode: 400,
            });
        }
    }
    static async changePassword(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: 'Usuário não autenticado',
                    statusCode: 401,
                });
                return;
            }
            const validation = (0, validation_1.safeValidate)(validation_1.changePasswordSchema, req.body);
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
            await authService_1.AuthService.changePassword(req.user.userId, currentPassword, newPassword);
            await auditService_1.AuditService.logPasswordChange(req.user.userId, req.ip, req.headers['user-agent']);
            res.status(200).json({
                success: true,
                message: 'Senha alterada com sucesso',
                statusCode: 200,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro ao alterar senha',
                statusCode: 400,
            });
        }
    }
    static async verifyEmail(req, res) {
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
            await authService_1.AuthService.verifyEmail(token);
            res.status(200).json({
                success: true,
                message: 'Email verificado com sucesso',
                statusCode: 200,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro ao verificar email',
                statusCode: 400,
            });
        }
    }
    static async getCurrentUser(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: 'Usuário não autenticado',
                    statusCode: 401,
                });
                return;
            }
            const user = await authService_1.AuthService.getUserById(req.user.userId);
            if (!user) {
                res.status(404).json({
                    success: false,
                    error: 'Usuário não encontrado',
                    statusCode: 404,
                });
                return;
            }
            const profile = await authService_1.AuthService.getUserProfile(req.user.userId);
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: 'Erro ao buscar usuário',
                statusCode: 500,
            });
        }
    }
    static async updateProfile(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: 'Usuário não autenticado',
                    statusCode: 401,
                });
                return;
            }
            const validation = (0, validation_1.safeValidate)(validation_1.updateProfileSchema, req.body);
            if (!validation.success) {
                res.status(400).json({
                    success: false,
                    error: 'Dados inválidos',
                    details: validation.errors.issues,
                    statusCode: 400,
                });
                return;
            }
            const profile = await authService_1.AuthService.updateProfile(req.user.userId, validation.data);
            res.status(200).json({
                success: true,
                data: { profile },
                message: 'Perfil atualizado com sucesso',
                statusCode: 200,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro ao atualizar perfil',
                statusCode: 400,
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map