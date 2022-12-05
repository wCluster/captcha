// rollup.config.js
import babel from 'rollup-plugin-babel'
import ts from "rollup-plugin-ts";
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss'
import url from 'postcss-url'

export default [{
    // 核心选项
    input: './src/lib/Captcha.tsx',  // 入口文件
    output:[ {
        file: './dist/cjs/captcha.js', // 出口文件
        format: 'cjs',  // commonjs 规范
        sourcemap:true
    },{
        file: './dist/umd/captcha.js', // 出口文件
        format: 'umd',  // commonjs 规范
        name: 'file',
        sourcemap:true
    },
    {
        file: './dist/esm/captcha.js', // 出口文件
        format: 'module',  // commonjs 规范
        sourcemap:true
    }],
    plugins: [
        postcss({ plugins: [
            url({
                url: "inline",
                maxSize: 10,
                fallback: "copy",
            })
        ] }),
        ts({
            tsconfig: "tsconfig.json"
        }),
        commonjs(),
        babel({
            exclude: ['node_modules/**'],
        })
    ],
    external: ['react'],
},{
    input: "./src/lib/Captcha.tsx",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    external: [/\.css$/],
    plugins: [dts()],
}]