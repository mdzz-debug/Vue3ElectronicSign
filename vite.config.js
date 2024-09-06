import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        //这里必须引入vite-plugin-dts插件，否则不会生成d.ts文件
        dts({
            // 这里定义了需要生成d.ts文件的目录，如果有多个目录，可以使用数组
            include: ["src/packages/**/*.{vue,ts}"]
        }),
    ],
    // 打包配置
    build: {
        // 打包后的文件输出目录
        outDir: "dist",
        lib: {
            //指定组件编译入口文件
            entry: "./src/packages/index.ts",
            // 组件库名称
            name: "ElectronicSign",
            // 文件名称
            fileName: "electronic-sign",
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ["vue"],
            output: {
                exports: "named",
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
