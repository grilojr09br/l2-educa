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
export declare const env: Environment;
export {};
//# sourceMappingURL=environment.d.ts.map