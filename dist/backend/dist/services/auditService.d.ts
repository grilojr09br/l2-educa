import { AuditLogEntry } from '../types';
export declare class AuditService {
    static logEvent(userId: string, action: string, ipAddress?: string, userAgent?: string, metadata?: Record<string, any>): Promise<void>;
    static logLogin(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static logLoginFailure(email: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static logRegistration(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static logLogout(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static logPasswordChange(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static logPasswordResetRequest(email: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static logPasswordReset(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static logEmailVerification(userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    static getUserAuditLogs(userId: string, limit?: number): Promise<AuditLogEntry[]>;
}
//# sourceMappingURL=auditService.d.ts.map