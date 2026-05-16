/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  // Tailwind plugin auto-sorts className utilities into canonical order
  plugins: ["prettier-plugin-tailwindcss"],
  // Tell the plugin which functions also receive Tailwind class strings
  tailwindFunctions: ["clsx", "cva", "cn", "twMerge"],
};

export default config;
