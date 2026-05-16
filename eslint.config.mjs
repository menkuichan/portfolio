import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // Ignore build output and dependency directories
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "next-env.d.ts", "**/*.d.ts"],
  },

  // Base recommended rules from ESLint
  js.configs.recommended,

  // TypeScript strict + stylistic
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // React + React Hooks
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        React: "readonly",
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      // Next.js doesn't need React in scope
      "react/react-in-jsx-scope": "off",
      // Next.js handles prop-types via TS
      "react/prop-types": "off",
      // Allow apostrophes in JSX text (e.g., "I'm")
      "react/no-unescaped-entities": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Next.js plugin rules (use flat configs directly — bypasses FlatCompat circular bug)
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Project-specific overrides
  {
    rules: {
      // Enforce type-only imports — works with tsconfig's verbatimModuleSyntax
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      // Allow underscore-prefixed unused (intentional skip)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Catch console.log; allow warn/error/info
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      // Allow empty arrow no-ops
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
    },
  },
];

export default config;
