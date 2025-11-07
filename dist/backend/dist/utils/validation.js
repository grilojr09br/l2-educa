"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidate = exports.validate = exports.emailVerificationSchema = exports.updateProfileSchema = exports.changePasswordSchema = exports.passwordResetConfirmSchema = exports.passwordResetRequestSchema = exports.loginSchema = exports.registerSchema = exports.usernameSchema = exports.emailSchema = exports.passwordSchema = void 0;
const zod_1 = require("zod");
exports.passwordSchema = zod_1.z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial');
exports.emailSchema = zod_1.z
    .string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório');
exports.usernameSchema = zod_1.z
    .string()
    .min(3, 'Username deve ter no mínimo 3 caracteres')
    .max(30, 'Username deve ter no máximo 30 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username deve conter apenas letras, números, _ e -');
exports.registerSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
    username: exports.usernameSchema,
});
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, 'Senha é obrigatória'),
});
exports.passwordResetRequestSchema = zod_1.z.object({
    email: exports.emailSchema,
});
exports.passwordResetConfirmSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token é obrigatório'),
    newPassword: exports.passwordSchema,
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: exports.passwordSchema,
});
exports.updateProfileSchema = zod_1.z.object({
    full_name: zod_1.z.string().max(100).optional(),
    bio: zod_1.z.string().max(500).optional(),
    avatar_url: zod_1.z.string().url().optional(),
    preferences: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
exports.emailVerificationSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token é obrigatório'),
});
const validate = (schema, data) => {
    return schema.parse(data);
};
exports.validate = validate;
const safeValidate = (schema, data) => {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
};
exports.safeValidate = safeValidate;
//# sourceMappingURL=validation.js.map