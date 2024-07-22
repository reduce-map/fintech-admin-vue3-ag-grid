import { defineConfig } from 'vite'
import type { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
import fs from "fs";
import dotenv from 'dotenv'

interface ENV {
  [key: string]: string;
}

const getEnv = (mode: string): ENV => {
  const envFileName = `.env.${mode}`;
  const envObject: ENV = {};

  if (fs.existsSync(envFileName)) {
    try {
      const envConfig = dotenv.parse(fs.readFileSync(envFileName));
      return { ...envObject, ...envConfig };
    } catch (error) {
      console.error(`Error reading ${envFileName}:`, error);
    }
  } else {
    console.warn(`Environment file ${envFileName} does not exist.`);
  }

  return envObject;
};

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
}

export default (configEnv: ConfigEnv) => {
  setTimeout(() => {
    console.groupCollapsed('Environment Variables');

    console.log(configEnv, 'configEnv');

    console.table(
      Object.entries(getEnv(configEnv.mode)).map(([key, value]) => {
        return {
          'ENV VARIABLE': key,
          'Value': value,
          '🌎': '👋🏻'
        };
      })
    );

    console.groupEnd();
  }, 0)

  return defineConfig({ ...baseConfig })
}
