import { defineConfig } from 'tsup';

export default defineConfig({
  // 入口cli
  entry: {
    index: "src/node/cli.ts"
  },
  // 产物格式，包含 esm 和 cjs 格式
  // 类型断言：使用 as ('esm' | 'cjs')[] 来确保 format 字段的值类型与 tsup 期望的类型匹配。
  format: ['esm', 'cjs'] as ('esm' | 'cjs')[],
  // 目标语法
  target: "es2020",
  // 没有拆包的需求，关闭拆包能力
  splitting: false,
  // 生成 sourcemap
  sourcemap: true
})
