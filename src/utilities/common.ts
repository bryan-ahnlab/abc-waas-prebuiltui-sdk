// src/utilities/common.ts

/**
 * 크로스 브라우저 호환성을 가진 UUID v4 생성 함수
 * crypto.randomUUID()가 지원되지 않는 브라우저를 위한 폴백 구현
 */
export const generateUUID = (): string => {
  // crypto.randomUUID()가 지원되는 경우 사용
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // crypto.getRandomValues가 지원되는 경우 사용
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);

    // UUID v4 형식으로 변환
    array[6] = (array[6] & 0x0f) | 0x40; // version 4
    array[8] = (array[8] & 0x3f) | 0x80; // variant

    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
  }

  // Math.random 사용 (보안성은 낮지만 호환성 보장)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
