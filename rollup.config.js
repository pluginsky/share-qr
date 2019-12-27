import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

const plugins = [
  resolve(),
  typescript(),
  terser(),
  commonjs({
    include: 'node_modules/**'
  })
];

export default [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.js', format: 'cjs' },
    plugins
  },
  {
    input: 'src/background.ts',
    output: { file: 'dist/background.js', format: 'cjs' },
    plugins: [
      ...plugins,
      copy({
        targets: [
          { src: ['src/*.html', 'src/manifest.json'], dest: 'dist' },
          {
            src: 'src/icons/*',
            dest: 'dist/icons'
          }
        ]
      })
    ]
  }
];
