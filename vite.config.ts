import { defineConfig, loadEnv } from 'vite'
import type { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import * as path from "node:path";
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
const baseConfig: UserConfigExport = {
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // Включите поддержку встроенного JavaScript
      },
    },
  },
}

export default (configEnv: ConfigEnv) => {
  // sample, can be removed
  setTimeout(() => {
    const envVariables = {...process.env, ...loadEnv(configEnv.mode, process.cwd())};

    const filteredData = Object.entries(envVariables)
      .filter(([key]) => /(NODE|VITE)/.test(key))
      .map(([key, value]) => {
        return {
          key: key.trim(),
          value: value?.trim().slice(0, 50),
        };
      });

    console.log("👋🏻🌎. ⬇️env variables, which contains VITE and NODE prefixes");
    filteredData.forEach(item => {
      console.log(`    key: ${item.key}, value: ${item.value}`);
    });
  }, 0);

  return defineConfig({ ...baseConfig })
}
