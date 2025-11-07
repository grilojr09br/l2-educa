export interface User {
  id: string;
  email: string;
  username: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  user_id: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
}

export interface AuthRequest {
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  emailVerified?: boolean;
}

export interface TokenPayload {
  id: string;
  userId: string;
  email: string;
  role?: string;
  iat: number;
  exp: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface AuditLogEntry {
  user_id: string;
  action: string;
  ip_address?: string;
  user_agent?: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileRequest {
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

