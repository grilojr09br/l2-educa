import { User, AuthResponse, UserProfile, UpdateProfileRequest } from '../types';
export declare class AuthService {
    static register(email: string, password: string, username: string): Promise<User>;
    static login(email: string, password: string): Promise<AuthResponse>;
    static logout(_userId: string): Promise<void>;
    static refreshAccessToken(refreshToken: string): Promise<string>;
    static requestPasswordReset(email: string): Promise<void>;
    static resetPassword(newPassword: string): Promise<void>;
    static changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
    static verifyEmail(token: string): Promise<void>;
    static getUserById(userId: string): Promise<User | null>;
    static updateProfile(userId: string, profileData: UpdateProfileRequest): Promise<UserProfile>;
    static getUserProfile(userId: string): Promise<UserProfile | null>;
    private static generateAccessToken;
    private static generateRefreshToken;
    static enable2FA(_userId: string): Promise<{
        secret: string;
        qrCode: string;
    }>;
    static verify2FACode(_userId: string, _code: string): Promise<boolean>;
    static linkOAuthProvider(_userId: string, _provider: string, _providerUserId: string): Promise<void>;
    static unlinkOAuthProvider(_userId: string, _provider: string): Promise<void>;
}
//# sourceMappingURL=authService.d.ts.map