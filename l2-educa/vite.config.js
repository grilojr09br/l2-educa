import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  
  return {
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
    },
    // Validate environment variables on build
    {
      name: 'validate-env',
      configResolved(config) {
        const requiredVars = [
          'VITE_SUPABASE_URL',
          'VITE_SUPABASE_ANON_KEY',
        ];
        
        const missing = requiredVars.filter(v => !env[v]);
        
        console.log('\n🔧 Build Mode:', mode);
        console.log('📁 Looking for:', mode === 'production' ? '.env.production' : '.env');
        
        if (missing.length > 0) {
          console.warn('\n⚠️  WARNING: Missing environment variables:');
          missing.forEach(v => console.warn(`   - ${v}`));
          console.warn('⚠️  The build may not work correctly without these variables.');
          console.warn('⚠️  Copy env.example.txt to .env.production and fill in values.');
          console.warn('⚠️  Make sure the file is in the l2-educa/ directory (same as package.json)\n');
        }
        
        // Log loaded variables (without exposing sensitive data)
        console.log('\n✅ Environment variables status:');
        console.log(`   - VITE_SUPABASE_URL: ${env.VITE_SUPABASE_URL ? '✓ Loaded' : '✗ Missing'}`);
        console.log(`   - VITE_SUPABASE_ANON_KEY: ${env.VITE_SUPABASE_ANON_KEY ? '✓ Loaded' : '✗ Missing'}`);
        console.log(`   - VITE_BACKEND_URL: ${env.VITE_BACKEND_URL ? '✓ Loaded' : '⚠️  Using default'}`);
        console.log(`   - VITE_SITE_URL: ${env.VITE_SITE_URL ? '✓ Loaded' : '⚠️  Using default'}`);
        
        if (env.VITE_SUPABASE_URL) {
          console.log(`\n🔗 Supabase URL: ${env.VITE_SUPABASE_URL}`);
        }
        if (env.VITE_SITE_URL) {
          console.log(`🌐 Site URL: ${env.VITE_SITE_URL}`);
        }
        console.log(''); // Empty line for readability
      }
    }
  ],
  base: '/l2/', // Base path for subdirectory deployment
  build: {
    // Optimize for production with esbuild (faster and built-in)
    minify: 'esbuild',
    // Drop console and debugger statements in production
    ...(mode === 'production' && {
      esbuild: {
        drop: ['console', 'debugger'],
      },
    }),
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
}})
