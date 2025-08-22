// tsup.config.ts

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    resolve: true,
  },
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  sourcemap: true,
});
