import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  outDir: 'dist',
  target: 'node18',
  tsconfig: 'tsconfig.build.json',
  external: ['react', 'react-dom']
});
