import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  // UMD 版本 (未压缩)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-booster.js',
      format: 'umd',
      name: 'JsBooster',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  // UMD 版本 (压缩)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-booster.min.js',
      format: 'umd',
      name: 'JsBooster',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },
  // ESM 版本
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-booster.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  // CJS 版本
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-booster.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  }
];
