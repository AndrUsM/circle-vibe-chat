import js from '@eslint/js';
// import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.recommended,
  {
    files: ['**/*.{ts,js,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // Add your custom rules here
    },
  },
];