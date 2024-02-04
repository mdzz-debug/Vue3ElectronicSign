import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            less: {}
        }
    },
    build: {
        outDir: 'lib', // 库模式, 打包后文件夹
        lib: {
            entry: resolve(__dirname, './examples/packages'), // 入口
            name: 'ElectronicSign',
            fileName: 'electronic-sign', // 打包后名字
        }
    }
})
