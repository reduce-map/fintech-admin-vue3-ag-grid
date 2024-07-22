import { defineConfig } from 'vite'
import type { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
    console.groupCollapsed('Environment Variables')

    console.log(configEnv, 'configEnv')

    // console.table(
    //   Object.entries(getEnv(configEnv.mode)).map(([key, value]) => {
    //     return {
    //       'ENV VARIABLE': key,
    //       'Value': value,
    //       '🌎': '👋🏻'
    //     };
    //   })
    // );

    console.groupEnd()
  }, 0)

  return defineConfig({ ...baseConfig })
}
