import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.WEATHERBIT_API_KEY": JSON.stringify(env.WEATHERBIT_API_KEY),
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
