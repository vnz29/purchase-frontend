import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // use "@/..." imports
    },
  },
  build: {
    outDir: "dist", // Vercel expects dist
  },
  base: "/", // keep root path
});
