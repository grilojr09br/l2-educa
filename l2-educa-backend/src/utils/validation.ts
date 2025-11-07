import { z } from 'zod';

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial');

// Email validation schema
export const emailSchema = z
  .string()
  .email('Email inválido')
  .min(1, 'Email é obrigatório');

// Username validation schema
export const usernameSchema = z
  .string()
  .min(3, 'Username deve ter no mínimo 3 caracteres')
  .max(30, 'Username deve ter no máximo 30 caracteres')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username deve conter apenas letras, números, _ e -');

// Registration validation schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});

// Login identifier schema (accepts email OR username)
export const loginIdentifierSchema = z
  .string()
  .min(1, 'Email ou username é obrigatório')
  .refine(
    (val) => {
      // If it contains @, validate as email
      if (val.includes('@')) {
        return emailSchema.safeParse(val).success;
      }
      // Otherwise validate as username
      return usernameSchema.safeParse(val).success;
    },
    { message: 'Email ou username inválido' }
  );

// Login validation schema (supports email OR username)
export const loginSchema = z.object({
  identifier: loginIdentifierSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Legacy login schema for backward compatibility
export const legacyLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

// Password reset confirm schema
export const passwordResetConfirmSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  newPassword: passwordSchema,
});

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: passwordSchema,
});

// Check user exists schema
export const checkUserExistsSchema = z.object({
  identifier: loginIdentifierSchema,
});

// Update profile schema (enhanced for chat)
export const updateProfileSchema = z.object({
  full_name: z.string().max(100).optional(),
  display_name: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
  preferences: z.record(z.string(), z.any()).optional(),
  status: z.enum(['online', 'offline', 'away']).optional(),
  show_online_status: z.boolean().optional(),
});

// Email verification schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
});

// Helper function to validate data
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

// Helper function to safely validate with error handling
export const safeValidate = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
};

