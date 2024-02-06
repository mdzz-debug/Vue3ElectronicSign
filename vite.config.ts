import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'lib', // 库模式, 打包后文件夹
        lib: {
            entry: resolve(__dirname, './examples/packages'), // 入口
            name: 'ElectronicSign',
            fileName: 'electronic-sign', // 打包后名字
        },
        rollupOptions: {
            external: ['vue', 'echarts', '@vueuse/core'], // 不想要打包的安装包
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                },
            },
        }
    }
})
