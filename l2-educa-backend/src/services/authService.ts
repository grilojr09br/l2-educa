import jwt from 'jsonwebtoken';
import { supabase, supabaseAdmin } from '../config/supabase';
import { env } from '../config/environment';
import { User, AuthResponse, UserProfile, UpdateProfileRequest } from '../types';
// import { AuditService } from './auditService';
import { sanitizeEmail, sanitizeUsername, sanitizeString } from '../utils/sanitization';

/**
 * Authentication Service
 */
export class AuthService {
  /**
   * Register a new user
   */
  static async register(
    email: string,
    password: string,
    username: string
  ): Promise<User> {
    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedUsername = sanitizeUsername(username);

    // Validate inputs
    if (!sanitizedEmail || !password || !sanitizedUsername) {
      throw new Error('Email, senha e username são obrigatórios');
    }

    if (password.length < 8) {
      throw new Error('Senha deve ter no mínimo 8 caracteres');
    }

    // Check if username is already taken
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('username')
      .eq('username', sanitizedUsername)
      .single();

    if (existingUser) {
      throw new Error('Username já está em uso');
    }

    // Register user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: sanitizedEmail,
      password,
      email_confirm: env.NODE_ENV === 'development', // Auto-confirm in dev
    });

    if (authError || !authData.user) {
      if (authError?.message.includes('already registered')) {
        throw new Error('Email já está cadastrado');
      }
      throw new Error(authError?.message || 'Erro ao registrar usuário');
    }

    // Create user profile in users table
    const { data: userData, error: userError } = await supabaseAdmin
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
      // Rollback: delete auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error('Erro ao criar perfil do usuário');
    }

    // Create empty user profile
    await supabaseAdmin
      .from('user_profiles')
      .insert([{ user_id: authData.user.id }]);

    return userData;
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    // Sanitize email
    const sanitizedEmail = sanitizeEmail(email);

    // Validate inputs
    if (!sanitizedEmail || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password,
    });

    if (error || !data.user || !data.session) {
      throw new Error('Email ou senha incorretos');
    }

    // Fetch user data
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError || !userData) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    // Generate JWT tokens
    const accessToken = this.generateAccessToken(data.user.id, sanitizedEmail);
    const refreshToken = this.generateRefreshToken(data.user.id);

    return {
      accessToken,
      refreshToken,
      user: userData,
    };
  }

  /**
   * Logout user
   */
  static async logout(_userId: string): Promise<void> {
    await supabase.auth.signOut();
  }

  /**
   * Refresh access token
   */
  static async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = jwt.verify(refreshToken, env.JWT_SECRET) as any;

      // Verify user still exists
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('id, email')
        .eq('id', decoded.userId)
        .single();

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const newAccessToken = this.generateAccessToken(user.id, user.email);
      return newAccessToken;
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<void> {
    const sanitizedEmail = sanitizeEmail(email);

    // Use Supabase's built-in password reset
    const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
      redirectTo: `${env.FRONTEND_URL}/reset-password`,
    });

    if (error) {
      // Don't reveal if email exists or not for security
      console.error('[AuthService] Password reset error:', error);
    }

    // Always return success to prevent email enumeration
  }

  /**
   * Reset password with token
   */
  static async resetPassword(newPassword: string): Promise<void> {
    if (newPassword.length < 8) {
      throw new Error('Nova senha deve ter no mínimo 8 caracteres');
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error('Erro ao redefinir senha');
    }
  }

  /**
   * Change password (requires current password)
   */
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    if (!currentPassword || !newPassword) {
      throw new Error('Senhas são obrigatórias');
    }

    if (newPassword.length < 8) {
      throw new Error('Nova senha deve ter no mínimo 8 caracteres');
    }

    // Get user email
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verify current password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      throw new Error('Senha atual incorreta');
    }

    // Update password using admin API
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) {
      throw new Error('Erro ao alterar senha');
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<void> {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) {
      throw new Error('Token de verificação inválido ou expirado');
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string,
    profileData: UpdateProfileRequest
  ): Promise<UserProfile> {
    // Sanitize inputs
    const sanitized: any = {};
    if (profileData.full_name) {
      sanitized.full_name = sanitizeString(profileData.full_name);
    }
    if (profileData.bio) {
      sanitized.bio = sanitizeString(profileData.bio);
    }
    if (profileData.avatar_url) {
      sanitized.avatar_url = profileData.avatar_url;
    }
    if (profileData.preferences) {
      sanitized.preferences = profileData.preferences;
    }

    const { data, error } = await supabaseAdmin
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

  /**
   * Get user profile
   */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  /**
   * Generate access token (short-lived)
   */
  private static generateAccessToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );
  }

  /**
   * Generate refresh token (long-lived)
   */
  private static generateRefreshToken(userId: string): string {
    return jwt.sign(
      { userId },
      env.JWT_SECRET,
      { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN } as jwt.SignOptions
    );
  }

  // ============ FUTURE FEATURE STUBS ============

  /**
   * Enable 2FA for user (STUB for future implementation)
   */
  static async enable2FA(_userId: string): Promise<{ secret: string; qrCode: string }> {
    throw new Error('2FA not yet implemented');
  }

  /**
   * Verify 2FA code (STUB for future implementation)
   */
  static async verify2FACode(_userId: string, _code: string): Promise<boolean> {
    throw new Error('2FA not yet implemented');
  }

  /**
   * Link OAuth provider (STUB for future implementation)
   */
  static async linkOAuthProvider(
    _userId: string,
    _provider: string,
    _providerUserId: string
  ): Promise<void> {
    throw new Error('OAuth not yet implemented');
  }

  /**
   * Unlink OAuth provider (STUB for future implementation)
   */
  static async unlinkOAuthProvider(_userId: string, _provider: string): Promise<void> {
    throw new Error('OAuth not yet implemented');
  }
}

