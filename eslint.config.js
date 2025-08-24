// eslint.config.js (Flat config)

import js from '@eslint/js';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,

  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: ['node_modules', 'dist', 'build', 'coverage', 'vite.config.js'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
      prettier: pluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          // always try to resolve types under `<root>@types` directory even it doesn't contain source code
          alwaysTryTypes: true,
          project: './tsconfig.json', // or your tsconfig path
        },
      },
    },
    rules: {
      // TypeScript rules (if needed)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // React rules
      'react/react-in-jsx-scope': 'off',

      // Import rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/no-unused-modules': [1, { unusedExports: true }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@circle-vibe/shared',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@circle-vibe/components',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@core/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@features/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@api/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],

      // Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // A11y
      'jsx-a11y/alt-text': 'warn',

      // Prettier
      'prettier/prettier': 'error',
    },
  },
];
