import { z } from 'zod';
export declare const passwordSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const usernameSchema: z.ZodString;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const passwordResetRequestSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export declare const passwordResetConfirmSchema: z.ZodObject<{
    token: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const changePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const updateProfileSchema: z.ZodObject<{
    full_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    preferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export declare const emailVerificationSchema: z.ZodObject<{
    token: z.ZodString;
}, z.core.$strip>;
export declare const validate: <T>(schema: z.ZodSchema<T>, data: unknown) => T;
export declare const safeValidate: <T>(schema: z.ZodSchema<T>, data: unknown) => {
    success: true;
    data: T;
} | {
    success: false;
    errors: z.ZodError;
};
//# sourceMappingURL=validation.d.ts.map