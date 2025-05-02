import { terser } from 'rollup-plugin-terser';

export default [
  // UMD 版本 (未压缩)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-boost.js',
      format: 'umd',
      name: 'JsBoost',
      sourcemap: true
    }
  },
  // UMD 版本 (压缩)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-boost.min.js',
      format: 'umd',
      name: 'JsBoost',
      sourcemap: true
    },
    plugins: [terser()]
  },
  // ESM 版本
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-boost.esm.js',
      format: 'esm',
      sourcemap: true
    }
  },
  // CJS 版本
  {
    input: 'src/index.js',
    output: {
      file: 'dist/js-boost.cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  }
];
