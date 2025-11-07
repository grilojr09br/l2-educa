"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.optionalAuthMiddleware = exports.supabaseAuthMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../config/environment");
const supabase_1 = require("../config/supabase");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Token não fornecido',
                statusCode: 401,
            });
            return;
        }
        const token = authHeader.substring(7);
        try {
            const decoded = jsonwebtoken_1.default.verify(token, environment_1.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                res.status(401).json({
                    success: false,
                    error: 'Token expirado',
                    statusCode: 401,
                });
                return;
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                res.status(403).json({
                    success: false,
                    error: 'Token inválido',
                    statusCode: 403,
                });
                return;
            }
            throw error;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erro ao verificar autenticação',
            statusCode: 500,
        });
    }
};
exports.authMiddleware = authMiddleware;
const supabaseAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Token não fornecido',
                statusCode: 401,
            });
            return;
        }
        const token = authHeader.substring(7);
        const { data: { user }, error } = await supabase_1.supabase.auth.getUser(token);
        if (error || !user) {
            res.status(403).json({
                success: false,
                error: 'Token inválido ou expirado',
                statusCode: 403,
            });
            return;
        }
        req.user = {
            id: user.id,
            userId: user.id,
            email: user.email || '',
            role: user.role || 'user',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600,
        };
        next();
    }
    catch (error) {
        console.error('Supabase auth error:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao verificar autenticação',
            statusCode: 500,
        });
    }
};
exports.supabaseAuthMiddleware = supabaseAuthMiddleware;
const optionalAuthMiddleware = (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            next();
            return;
        }
        const token = authHeader.substring(7);
        try {
            const decoded = jsonwebtoken_1.default.verify(token, environment_1.env.JWT_SECRET);
            req.user = decoded;
        }
        catch (error) {
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
exports.authenticateToken = exports.supabaseAuthMiddleware;
//# sourceMappingURL=auth.js.map