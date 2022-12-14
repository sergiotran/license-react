import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { realSPAFallback } from "./plugins/real-spa-fallback";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Pages(), realSPAFallback()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
