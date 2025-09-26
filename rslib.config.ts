import { defineConfig } from '@rslib/core';

const sharedSource = {
  entry: {
    index: './src/index.ts',
  },
};

const dtsConfig = {
  distPath: 'dist/types',
};

export default defineConfig({
  lib: [
    {
      format: 'esm',
      source: sharedSource,
      output: {
        distPath: {
          root: 'dist/es',
        },
      },
      dts: dtsConfig,
    },
    {
      format: 'cjs',
      source: sharedSource,
      output: {
        distPath: {
          root: 'dist/lib',
        },
      },
      dts: dtsConfig,
    },
  ],
});
