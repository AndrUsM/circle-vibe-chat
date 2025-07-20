module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/no-unused-modules': [1, { unusedExports: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
