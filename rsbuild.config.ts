import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
// @ts-ignore
import { resolve } from 'path';

const { publicVars } = loadEnv({ prefixes: ['VITE_APP_'] });

export default defineConfig({
  source: {
    entry: {
      index: './src/main.tsx',
    },
    define: publicVars,
  },

  output: {
    target: 'web',
    distPath: './dist',
    minify: true,
    filenameHash: true,
    manifest: false,
    polyfill: 'entry',
  },

  resolve: {
    alias: {
      '@shared': resolve('./src/_shared'),
      '@core': resolve('./src/_core'),
      '@features': resolve('./src/features'),
      '@api': resolve('./src/_api'),
    },
  },

  html: {
    template: './public/index.html',
  },

  server: {
    port: 5173,
    host: '0.0.0.0',
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  tools: {
    cssLoader: {
      modules: {
        exportLocalsConvention: 'camel-case',
        namedExport: true,
      },
    },
    rspack: {
      plugins: process.env.RS_DOCTOR ? [new RsdoctorRspackPlugin()] : [],
    },
  },

  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift('babel-plugin-react-compiler');
      },
    }),
    pluginSass(),
    pluginTypedCSSModules(),
  ],
});
