"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const supabase_1 = require("../config/supabase");
class AuditService {
    static async logEvent(userId, action, ipAddress, userAgent, metadata) {
        try {
            const entry = {
                user_id: userId,
                action,
                ip_address: ipAddress,
                user_agent: userAgent,
                metadata,
                timestamp: new Date(),
            };
            const { error } = await supabase_1.supabaseAdmin
                .from('audit_logs')
                .insert([entry]);
            if (error) {
                console.error('[AuditService] Failed to log event:', error);
            }
        }
        catch (error) {
            console.error('[AuditService] Unexpected error logging event:', error);
        }
    }
    static async logLogin(userId, ipAddress, userAgent) {
        await this.logEvent(userId, 'LOGIN_SUCCESS', ipAddress, userAgent);
    }
    static async logLoginFailure(email, ipAddress, userAgent) {
        await this.logEvent('anonymous', 'LOGIN_FAILURE', ipAddress, userAgent, { email });
    }
    static async logRegistration(userId, ipAddress, userAgent) {
        await this.logEvent(userId, 'REGISTRATION', ipAddress, userAgent);
    }
    static async logLogout(userId, ipAddress, userAgent) {
        await this.logEvent(userId, 'LOGOUT', ipAddress, userAgent);
    }
    static async logPasswordChange(userId, ipAddress, userAgent) {
        await this.logEvent(userId, 'PASSWORD_CHANGE', ipAddress, userAgent);
    }
    static async logPasswordResetRequest(email, ipAddress, userAgent) {
        await this.logEvent('anonymous', 'PASSWORD_RESET_REQUEST', ipAddress, userAgent, { email });
    }
    static async logPasswordReset(userId, ipAddress, userAgent) {
        await this.logEvent(userId, 'PASSWORD_RESET_COMPLETE', ipAddress, userAgent);
    }
    static async logEmailVerification(userId, ipAddress, userAgent) {
        await this.logEvent(userId, 'EMAIL_VERIFIED', ipAddress, userAgent);
    }
    static async getUserAuditLogs(userId, limit = 50) {
        try {
            const { data, error } = await supabase_1.supabaseAdmin
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
        }
        catch (error) {
            console.error('[AuditService] Unexpected error fetching audit logs:', error);
            return [];
        }
    }
}
exports.AuditService = AuditService;
//# sourceMappingURL=auditService.js.map