// tsup.config.ts

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // 번들 시작점
  format: ["esm", "cjs"], // ESM과 CommonJS 모두 지원
  dts: {
    resolve: true, // 타입 정의(d.ts)를 자동 생성하면서 외부 타입도 포함
  },
  clean: true, // 빌드 전에 dist 폴더 정리
  external: ["react", "react-dom"],
  treeshake: true,
  sourcemap: true,
  // SVG 파일을 URL로 처리
  loader: {
    ".svg": "dataurl",
  },
  // 정적 파일 복사
  onSuccess: "cp -r src/assets dist/",
});
