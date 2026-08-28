// ESLint flat config — AG Appliance Service
// Author: Avijit Ghosh
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    "node_modules/**",
    "logs/**",
    "next-env.d.ts",
  ]),

  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  ...pluginQuery.configs["flat/recommended"],

  // TypeScript-aware rules (type-checked where a tsconfig is available)
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "unused-imports": unusedImports,
    },
    rules: {
      // --- code smell / hygiene -----------------------------------------
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "off",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-nested-ternary": "off", // common & readable in JSX (loading ? … : empty ? … : rows)
      "no-else-return": ["warn", { allowElseIf: false }],
      "no-lonely-if": "warn",
      "no-unneeded-ternary": "warn",
      "no-duplicate-imports": "error",
      "no-implicit-coercion": "warn",
      "no-param-reassign": ["error", { props: false }],
      "no-return-await": "warn",
      "no-throw-literal": "error",
      complexity: ["warn", 20],
      "max-depth": ["warn", 4],
      "max-params": ["warn", 5],
      "max-lines-per-function": [
        "warn",
        { max: 300, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],

      // --- unused code ---------------------------------------------------
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],

      // --- typescript ----------------------------------------------------
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/naming-convention": [
        "warn",
        { selector: "typeLike", format: ["PascalCase"] },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
      ],

      // --- react ---------------------------------------------------------
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
      "react/no-array-index-key": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // --- imports -------------------------------------------------------
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-default-export": "off",
    },
  },

  // Plain JS / config files: no type-aware rules
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },

  // Next.js requires default exports for routes/layouts/config
  {
    files: [
      "src/app/**/{page,layout,loading,error,not-found,template,default,route}.{ts,tsx}",
      "src/middleware.ts",
      "src/proxy.ts",
      "*.config.{ts,mjs,js}",
    ],
    rules: { "import/no-default-export": "off" },
  },

  // Generated shadcn/ui files + scripts: relax stylistic rules
  {
    files: ["src/components/ui/**", "src/hooks/use-mobile.ts", "scripts/**"],
    rules: {
      "import/order": "off",
      "no-console": "off",
      "max-lines-per-function": "off",
      eqeqeq: "off",
      "no-implicit-coercion": "off",
      "no-param-reassign": "off",
      "react/no-array-index-key": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // Prettier must be last so it can disable conflicting stylistic rules
  prettierRecommended,
]);
