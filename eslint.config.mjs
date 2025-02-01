import boundaries from "eslint-plugin-boundaries";
import typescriptParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  {
    ignores: ["node_modules/**", "dist/**"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      boundaries,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...eslintPluginPrettierRecommended.rules,
      ...boundaries.configs.strict.rules,
      "prettier/prettier": [
        "error",
        {
          printWidth: 99,
          parser: "flow",
        },
      ],
      "no-undef": "error",
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      "boundaries/external": [
        2,
        {
          default: "allow",
          rules: [
            {
              from: ["shared"],
              disallow: ["@repo/feature-*", "zod"],
            },
          ],
        },
      ],
    },
    settings: {
      "boundaries/elements": [
        {
          type: "features",
          pattern: "src/packages/features/**",
        },
        {
          type: "shared",
          pattern: "src/packages/shared/**",
        },
      ],
      "boundaries/root-path": import.meta.dirname,
      "import/resolver": {
        // Not using the typescript resolver makes the disallow-rule "@repo/feature-*" work.
        // typescript: {
        //   alwaysTryTypes: true,
        // },
      },
    },
  },
];
