import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'dist',  // Ensure correct output directory
  },
  server: {
    historyApiFallback: true, // This helps in local development
  },
  preview: {
    historyApiFallback: true, // Ensures the build preview works correctly
  }
});
