import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  PORT: number;
  NODE_ENV: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  SUPABASE_ANON_KEY: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
  FRONTEND_URL: string;
  ALLOWED_ORIGINS: string[];
}

const validateEnvironment = (): Environment => {
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
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    FRONTEND_URL: process.env.FRONTEND_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://silviosuperandolimites.com.br/l2' 
        : 'http://localhost:5173'),
    ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || 
      (process.env.NODE_ENV === 'production'
        ? 'https://silviosuperandolimites.com.br'
        : 'http://localhost:5173,http://localhost:3000'))
      .split(',')
      .map((origin) => origin.trim()),
  };
};

export const env = validateEnvironment();

