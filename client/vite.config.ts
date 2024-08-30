import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": {
      target: "http://18.118.138.138:8000",
      changeOrigin: true,
    },
  },
  server: {
    port: 3000,
  },
});
