"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, _req, res, _next) => {
    console.error('[Error]', {
        timestamp: new Date().toISOString(),
        method: _req.method,
        path: _req.path,
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            error: 'Erro de validação',
            details: err.issues.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            })),
            statusCode: 400,
        });
        return;
    }
    if (err.code && err.message) {
        let statusCode = 500;
        let message = err.message;
        switch (err.code) {
            case '23505':
                statusCode = 409;
                message = 'Este valor já está em uso';
                break;
            case '23503':
                statusCode = 400;
                message = 'Referência inválida';
                break;
            case '42P01':
                statusCode = 500;
                message = 'Erro de configuração do banco de dados';
                break;
        }
        res.status(statusCode).json({
            success: false,
            error: message,
            statusCode,
        });
        return;
    }
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            error: 'Token inválido',
            statusCode: 401,
        });
        return;
    }
    if (err.name === 'TokenExpiredError') {
        res.status(401).json({
            success: false,
            error: 'Token expirado',
            statusCode: 401,
        });
        return;
    }
    if (err.statusCode) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message || 'Erro na aplicação',
            statusCode: err.statusCode,
        });
        return;
    }
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Erro interno do servidor'
            : err.message,
        statusCode: 500,
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, res, _next) => {
    res.status(404).json({
        success: false,
        error: 'Rota não encontrada',
        statusCode: 404,
    });
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map