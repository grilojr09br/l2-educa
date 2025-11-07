import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Copy service worker to dist after build
    {
      name: 'copy-sw',
      closeBundle() {
        try {
          copyFileSync('public/sw.js', 'dist/sw.js');
          console.log('✅ Service Worker copied to dist/');
        } catch (e) {
          console.warn('⚠️ Failed to copy Service Worker:', e.message);
        }
      }
    },
    // Ensure admin files are excluded from production builds
    {
      name: 'exclude-admin-from-prod',
      resolveId(id) {
        if (mode === 'production') {
          if (id.includes('/pages/AdminPanel') || 
              id.includes('/contexts/AdminContext') ||
              id.includes('/components/AdminGuard')) {
            console.log('🚫 Excluding admin file from production:', id);
            return { id: 'virtual:empty', external: true };
          }
        }
        return null;
      }
    }
  ],
  base: '/l2/', // Base path for subdirectory deployment
  build: {
    // Optimize for production with esbuild (faster and built-in)
    minify: 'esbuild',
    // Better code splitting for optimal caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React and related libraries
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Math libraries
            if (id.includes('mathjs')) {
              return 'math-vendor';
            }
            // Other vendors
            return 'vendor';
          }
          // Page-based code splitting
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0];
            return `page-${pageName.toLowerCase()}`;
          }
          // Component-based splitting for large components
          if (id.includes('/components/')) {
            // Keep small components together
            if (id.includes('MathFormula') || id.includes('InlineFormula') || id.includes('ExpandableFormula')) {
              return 'math-components';
            }
          }
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // No source maps in production for smaller builds
    sourcemap: false,
    // Asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
    // Output directory
    outDir: 'dist',
    // Clean output directory before build
    emptyOutDir: true,
    // Target modern browsers for better optimization
    target: 'es2015',
    // CSS code splitting
    cssCodeSplit: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'mathjs']
  },
  // Server configuration for development
  server: {
    hmr: {
      overlay: true
    }
  },
  // Define environment variables
  define: {
    'import.meta.env.MODE': JSON.stringify(mode)
  }
}))
