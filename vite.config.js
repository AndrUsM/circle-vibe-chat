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
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@shared": resolve("./src/_shared"),
      "@core": resolve("./src/_core"),
      "@features": resolve("./src/features"),
      "@api": resolve("./src/_api"),
    },
  },
});
