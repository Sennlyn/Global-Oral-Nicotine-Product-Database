import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", ".next-gh-pages-build/**", ".next-gh-pages-build-*/**", ".next-validation/**", ".next-i18n-dev/**", ".next-i18n-build/**", ".next-taxonomy-build/**", "out/**", "build/**", "next-env.d.ts"]),
]);
