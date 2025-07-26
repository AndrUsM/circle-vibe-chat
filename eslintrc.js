module.exports = {
  plugins: ["import"],
  rules: {
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/no-unused-modules": [1, { unusedExports: true }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
  plugins: ["import"],
  rules: {
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "@circle-vibe/shared",
            group: "external",
            position: "before",
          },
          {
            pattern: "@circle-vibe/components",
            group: "external",
            position: "before",
          },
          {
            pattern: "@shared/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@core/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@features/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@api/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
  },
};
