import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@shared": resolve("./src/_shared"),
      "@core": resolve("./src/_core"),
      "@features": resolve("./src/features"),
    },
  },
});
