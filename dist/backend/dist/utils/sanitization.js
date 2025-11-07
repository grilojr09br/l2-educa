"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectXss = exports.detectSqlInjection = exports.sanitizeUrl = exports.sanitizeObject = exports.sanitizeUsername = exports.sanitizeEmail = exports.sanitizeString = exports.escapeHtml = exports.stripHtml = void 0;
const stripHtml = (input) => {
    return input.replace(/<[^>]*>/g, '');
};
exports.stripHtml = stripHtml;
const escapeHtml = (input) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    return input.replace(/[&<>"'/]/g, (char) => map[char]);
};
exports.escapeHtml = escapeHtml;
const sanitizeString = (input) => {
    if (typeof input !== 'string') {
        return '';
    }
    return (0, exports.stripHtml)(input).trim();
};
exports.sanitizeString = sanitizeString;
const sanitizeEmail = (email) => {
    if (typeof email !== 'string') {
        return '';
    }
    return email.toLowerCase().trim();
};
exports.sanitizeEmail = sanitizeEmail;
const sanitizeUsername = (username) => {
    if (typeof username !== 'string') {
        return '';
    }
    return username.replace(/[^a-zA-Z0-9_-]/g, '').trim();
};
exports.sanitizeUsername = sanitizeUsername;
const sanitizeObject = (obj) => {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitized[key] = (0, exports.sanitizeString)(value);
        }
        else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            sanitized[key] = (0, exports.sanitizeObject)(value);
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
};
exports.sanitizeObject = sanitizeObject;
const sanitizeUrl = (url) => {
    try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return null;
        }
        return parsed.toString();
    }
    catch {
        return null;
    }
};
exports.sanitizeUrl = sanitizeUrl;
const detectSqlInjection = (input) => {
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|SCRIPT|JAVASCRIPT|UNION)\b)/i,
        /(--|\;|\*|\/\*|\*\/)/,
        /(\bOR\b.*=.*)/i,
        /(\bAND\b.*=.*)/i,
    ];
    return sqlPatterns.some((pattern) => pattern.test(input));
};
exports.detectSqlInjection = detectSqlInjection;
const detectXss = (input) => {
    const xssPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
    ];
    return xssPatterns.some((pattern) => pattern.test(input));
};
exports.detectXss = detectXss;
//# sourceMappingURL=sanitization.js.map