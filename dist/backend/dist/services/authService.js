"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_1 = require("../config/supabase");
const environment_1 = require("../config/environment");
const sanitization_1 = require("../utils/sanitization");
class AuthService {
    static async register(email, password, username) {
        const sanitizedEmail = (0, sanitization_1.sanitizeEmail)(email);
        const sanitizedUsername = (0, sanitization_1.sanitizeUsername)(username);
        if (!sanitizedEmail || !password || !sanitizedUsername) {
            throw new Error('Email, senha e username são obrigatórios');
        }
        if (password.length < 8) {
            throw new Error('Senha deve ter no mínimo 8 caracteres');
        }
        const { data: existingUser } = await supabase_1.supabaseAdmin
            .from('users')
            .select('username')
            .eq('username', sanitizedUsername)
            .single();
        if (existingUser) {
            throw new Error('Username já está em uso');
        }
        const { data: authData, error: authError } = await supabase_1.supabaseAdmin.auth.admin.createUser({
            email: sanitizedEmail,
            password,
            email_confirm: environment_1.env.NODE_ENV === 'development',
        });
        if (authError || !authData.user) {
            if (authError?.message.includes('already registered')) {
                throw new Error('Email já está cadastrado');
            }
            throw new Error(authError?.message || 'Erro ao registrar usuário');
        }
        const { data: userData, error: userError } = await supabase_1.supabaseAdmin
            .from('users')
            .insert([
            {
                id: authData.user.id,
                email: sanitizedEmail,
                username: sanitizedUsername,
            },
        ])
            .select()
            .single();
        if (userError) {
            await supabase_1.supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            throw new Error('Erro ao criar perfil do usuário');
        }
        await supabase_1.supabaseAdmin
            .from('user_profiles')
            .insert([{ user_id: authData.user.id }]);
        return userData;
    }
    static async login(email, password) {
        const sanitizedEmail = (0, sanitization_1.sanitizeEmail)(email);
        if (!sanitizedEmail || !password) {
            throw new Error('Email e senha são obrigatórios');
        }
        const { data, error } = await supabase_1.supabase.auth.signInWithPassword({
            email: sanitizedEmail,
            password,
        });
        if (error || !data.user || !data.session) {
            throw new Error('Email ou senha incorretos');
        }
        const { data: userData, error: userError } = await supabase_1.supabaseAdmin
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();
        if (userError || !userData) {
            throw new Error('Erro ao buscar dados do usuário');
        }
        const accessToken = this.generateAccessToken(data.user.id, sanitizedEmail);
        const refreshToken = this.generateRefreshToken(data.user.id);
        return {
            accessToken,
            refreshToken,
            user: userData,
        };
    }
    static async logout(_userId) {
        await supabase_1.supabase.auth.signOut();
    }
    static async refreshAccessToken(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, environment_1.env.JWT_SECRET);
            const { data: user } = await supabase_1.supabaseAdmin
                .from('users')
                .select('id, email')
                .eq('id', decoded.userId)
                .single();
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            const newAccessToken = this.generateAccessToken(user.id, user.email);
            return newAccessToken;
        }
        catch (error) {
            throw new Error('Refresh token inválido ou expirado');
        }
    }
    static async requestPasswordReset(email) {
        const sanitizedEmail = (0, sanitization_1.sanitizeEmail)(email);
        const { error } = await supabase_1.supabase.auth.resetPasswordForEmail(sanitizedEmail, {
            redirectTo: `${environment_1.env.FRONTEND_URL}/reset-password`,
        });
        if (error) {
            console.error('[AuthService] Password reset error:', error);
        }
    }
    static async resetPassword(newPassword) {
        if (newPassword.length < 8) {
            throw new Error('Nova senha deve ter no mínimo 8 caracteres');
        }
        const { error } = await supabase_1.supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            throw new Error('Erro ao redefinir senha');
        }
    }
    static async changePassword(userId, currentPassword, newPassword) {
        if (!currentPassword || !newPassword) {
            throw new Error('Senhas são obrigatórias');
        }
        if (newPassword.length < 8) {
            throw new Error('Nova senha deve ter no mínimo 8 caracteres');
        }
        const { data: user } = await supabase_1.supabaseAdmin
            .from('users')
            .select('email')
            .eq('id', userId)
            .single();
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const { error: signInError } = await supabase_1.supabase.auth.signInWithPassword({
            email: user.email,
            password: currentPassword,
        });
        if (signInError) {
            throw new Error('Senha atual incorreta');
        }
        const { error } = await supabase_1.supabaseAdmin.auth.admin.updateUserById(userId, {
            password: newPassword,
        });
        if (error) {
            throw new Error('Erro ao alterar senha');
        }
    }
    static async verifyEmail(token) {
        const { error } = await supabase_1.supabase.auth.verifyOtp({
            token_hash: token,
            type: 'email',
        });
        if (error) {
            throw new Error('Token de verificação inválido ou expirado');
        }
    }
    static async getUserById(userId) {
        const { data, error } = await supabase_1.supabaseAdmin
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            return null;
        }
        return data;
    }
    static async updateProfile(userId, profileData) {
        const sanitized = {};
        if (profileData.full_name) {
            sanitized.full_name = (0, sanitization_1.sanitizeString)(profileData.full_name);
        }
        if (profileData.bio) {
            sanitized.bio = (0, sanitization_1.sanitizeString)(profileData.bio);
        }
        if (profileData.avatar_url) {
            sanitized.avatar_url = profileData.avatar_url;
        }
        if (profileData.preferences) {
            sanitized.preferences = profileData.preferences;
        }
        const { data, error } = await supabase_1.supabaseAdmin
            .from('user_profiles')
            .update(sanitized)
            .eq('user_id', userId)
            .select()
            .single();
        if (error) {
            throw new Error('Erro ao atualizar perfil');
        }
        return data;
    }
    static async getUserProfile(userId) {
        const { data, error } = await supabase_1.supabaseAdmin
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (error) {
            return null;
        }
        return data;
    }
    static generateAccessToken(userId, email) {
        return jsonwebtoken_1.default.sign({ userId, email }, environment_1.env.JWT_SECRET, { expiresIn: environment_1.env.JWT_EXPIRES_IN });
    }
    static generateRefreshToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, environment_1.env.JWT_SECRET, { expiresIn: environment_1.env.REFRESH_TOKEN_EXPIRES_IN });
    }
    static async enable2FA(_userId) {
        throw new Error('2FA not yet implemented');
    }
    static async verify2FACode(_userId, _code) {
        throw new Error('2FA not yet implemented');
    }
    static async linkOAuthProvider(_userId, _provider, _providerUserId) {
        throw new Error('OAuth not yet implemented');
    }
    static async unlinkOAuthProvider(_userId, _provider) {
        throw new Error('OAuth not yet implemented');
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map