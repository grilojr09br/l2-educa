import app from './app';
import { env } from './config/environment';

const PORT = env.PORT;

// Start server
const server = app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log('   L2 EDUCA Backend Server');
  console.log('   ========================================');
  console.log(`   📍 Server running on: http://localhost:${PORT}`);
  console.log(`   📊 Environment: ${env.NODE_ENV}`);
  console.log(`   🔐 Security: Enabled`);
  console.log(`   🌐 CORS: ${env.ALLOWED_ORIGINS.join(', ')}`);
  console.log('   ========================================\n');
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

export default server;

