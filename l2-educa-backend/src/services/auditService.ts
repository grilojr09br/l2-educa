import { supabaseAdmin } from '../config/supabase';
import { AuditLogEntry } from '../types';

/**
 * Audit Service for logging authentication events
 */
export class AuditService {
  /**
   * Log an authentication event
   */
  static async logEvent(
    userId: string,
    action: string,
    ipAddress?: string,
    userAgent?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const entry: AuditLogEntry = {
        user_id: userId,
        action,
        ip_address: ipAddress,
        user_agent: userAgent,
        metadata,
        timestamp: new Date(),
      };

      const { error } = await supabaseAdmin
        .from('audit_logs')
        .insert([entry]);

      if (error) {
        console.error('[AuditService] Failed to log event:', error);
        // Don't throw - logging should not break the application
      }
    } catch (error) {
      console.error('[AuditService] Unexpected error logging event:', error);
    }
  }

  /**
   * Log successful login
   */
  static async logLogin(
    userId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent(userId, 'LOGIN_SUCCESS', ipAddress, userAgent);
  }

  /**
   * Log failed login attempt
   */
  static async logLoginFailure(
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent('anonymous', 'LOGIN_FAILURE', ipAddress, userAgent, { email });
  }

  /**
   * Log successful registration
   */
  static async logRegistration(
    userId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent(userId, 'REGISTRATION', ipAddress, userAgent);
  }

  /**
   * Log logout
   */
  static async logLogout(
    userId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent(userId, 'LOGOUT', ipAddress, userAgent);
  }

  /**
   * Log password change
   */
  static async logPasswordChange(
    userId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent(userId, 'PASSWORD_CHANGE', ipAddress, userAgent);
  }

  /**
   * Log password reset request
   */
  static async logPasswordResetRequest(
    email: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent('anonymous', 'PASSWORD_RESET_REQUEST', ipAddress, userAgent, { email });
  }

  /**
   * Log password reset completion
   */
  static async logPasswordReset(
    userId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent(userId, 'PASSWORD_RESET_COMPLETE', ipAddress, userAgent);
  }

  /**
   * Log email verification
   */
  static async logEmailVerification(
    userId: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await this.logEvent(userId, 'EMAIL_VERIFIED', ipAddress, userAgent);
  }

  /**
   * Get recent audit logs for a user
   */
  static async getUserAuditLogs(
    userId: string,
    limit: number = 50
  ): Promise<AuditLogEntry[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('audit_logs')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[AuditService] Failed to fetch audit logs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('[AuditService] Unexpected error fetching audit logs:', error);
      return [];
    }
  }
}

