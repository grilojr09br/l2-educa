"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const environment_1 = require("./config/environment");
const PORT = environment_1.env.PORT;
const server = app_1.default.listen(PORT, () => {
    console.log('\n🚀 ========================================');
    console.log('   L2 EDUCA Backend Server');
    console.log('   ========================================');
    console.log(`   📍 Server running on: http://localhost:${PORT}`);
    console.log(`   📊 Environment: ${environment_1.env.NODE_ENV}`);
    console.log(`   🔐 Security: Enabled`);
    console.log(`   🌐 CORS: ${environment_1.env.ALLOWED_ORIGINS.join(', ')}`);
    console.log('   ========================================\n');
});
const gracefulShutdown = (signal) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
    setTimeout(() => {
        console.error('Forced shutdown after timeout.');
        process.exit(1);
    }, 10000);
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
});
exports.default = server;
//# sourceMappingURL=server.js.map