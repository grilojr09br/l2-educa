"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateEnvironment = () => {
    const required = [
        'SUPABASE_URL',
        'SUPABASE_SERVICE_KEY',
        'SUPABASE_ANON_KEY',
        'JWT_SECRET',
    ];
    for (const key of required) {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    }
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        throw new Error('JWT_SECRET must be at least 32 characters long');
    }
    return {
        PORT: parseInt(process.env.PORT || '3001', 10),
        NODE_ENV: process.env.NODE_ENV || 'development',
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
        FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
        ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:3000')
            .split(',')
            .map((origin) => origin.trim()),
    };
};
exports.env = validateEnvironment();
//# sourceMappingURL=environment.js.map