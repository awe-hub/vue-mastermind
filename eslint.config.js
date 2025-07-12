import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,vue}"], 
    ignores: ["dist/**"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    rules: { 
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^props$" }]
    }
  },
  { files: ["**/*.{js,mjs,cjs,vue}"], languageOptions: { globals: globals.browser } },
  pluginVue.configs["flat/essential"],
]);
