import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.VITE_CLERK_PUBLISHABLE_KEY': JSON.stringify('pk_test_aW1tZW5zZS1ncmFja2xlLTI0LmNsZXJrLmFjY291bnRzLmRldiQ'),
    'import.meta.env.VITE_CLERK_SECRET_KEY': JSON.stringify('sk_test_Da5TLNMHCM7mMFoawvfYuiL5KoEUzeCN8P7xOIohhn'),
  },
});
