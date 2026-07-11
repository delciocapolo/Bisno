// @ts-check
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const globals = require("globals");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = tseslint.config(
  // ignorados globalmente
  {
    ignores: [
      "dist/",
      "node_modules/",
      "**/*.d.ts",
      "coverage/",
      "src/infrastructure/sequelize/migrations/**",
      "src/infrastructure/sequelize/seeders/**",
    ],
  },

  js.configs.recommended,
  prettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // TypeScript — só ficheiros .ts
  {
    files: ["**/*.ts"],
    extends: [tseslint.configs.recommended, tseslint.configs.strict],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "preserve-caught-error": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      "no-extra-semi": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/require-await": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // ficheiros .cjs e .js — sem regras TypeScript
  {
    files: ["**/*.cjs", "**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      "no-console": "off",
    },
  },
);
