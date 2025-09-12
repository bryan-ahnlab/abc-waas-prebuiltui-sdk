# ABC WaaS Prebuilt UI SDK

[![npm version](https://badge.fury.io/js/abc-waas-prebuiltui-sdk.svg)](https://badge.fury.io/js/abc-waas-prebuiltui-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

ABC WaaS SDK를 위한 미리 만들어진 UI 컴포넌트 라이브러리입니다. `abc-waas-core-sdk`의 모든 기능을 포함하며, 별도로 `abc-waas-core-sdk`를 설치할 필요가 없습니다.

## ✨ 주요 기능

- 🔐 **5개 소셜 로그인 지원**: Google, Apple, Naver, Kakao, LINE
- 🎨 **완성된 UI 컴포넌트**: 별도 스타일링 없이 바로 사용 가능
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🚀 **TypeScript 지원**: 완벽한 타입 안전성
- 🔧 **간편한 설정**: 환경 변수만으로 모든 기능 사용 가능
- 📦 **번들 최적화**: Tree shaking과 코드 분할 지원
- 🌐 **크로스 브라우저 호환성**: 모든 브라우저에서 안전하게 작동
- 🔒 **보안 강화**: 암호학적으로 안전한 UUID 생성 및 JWT 토큰 검증
- 🌍 **다국어 지원**: 한국어/영어 언어 전환 기능
- 🎯 **커스텀 Hook**: 언어 관리를 위한 `useLanguage` Hook 제공
- 🔄 **실시간 상태 관리**: 로그인/로그아웃 상태 실시간 추적
- 🎭 **로딩 애니메이션**: 사용자 경험을 향상시키는 로딩 상태 표시

## 📋 목차

- [설치](#설치)
- [빠른 시작](#빠른-시작)
- [사용법](#사용법)
- [API Reference](#api-reference)
- [환경 변수 설정](#환경-변수-설정)
- [지원하는 소셜 서비스](#지원하는-소셜-서비스)
- [커스텀 Hook](#커스텀-hook)
- [아키텍처](#아키텍처)
- [개발 가이드](#개발-가이드)
- [문제 해결](#문제-해결)
- [라이선스](#라이선스)

## 🚀 설치

```bash
npm install abc-waas-prebuiltui-sdk
```

또는

```bash
yarn add abc-waas-prebuiltui-sdk
```

또는

```bash
pnpm add abc-waas-prebuiltui-sdk
```

## 🏃‍♂️ 빠른 시작

### 1. Provider 설정

```tsx
import React from "react";
import { AbcWaasProvider } from "abc-waas-prebuiltui-sdk";

const config = {
  API_WAAS_MYABCWALLET_URL: "https://dev-api.waas.myabcwallet.com",
  MW_MYABCWALLET_URL: "https://mw.myabcwallet.com",
  CLIENT_ID: "your_client_id_here",
  CLIENT_SECRET: "your_client_secret_here",
};

function App() {
  return (
    <AbcWaasProvider config={config}>
      <YourApp />
    </AbcWaasProvider>
  );
}

export default App;
```

### 2. 로그인 컴포넌트 사용

```tsx
import { Login } from "abc-waas-prebuiltui-sdk";

function LoginPage() {
  return <Login />;
}
```

### 3. 로그아웃 컴포넌트 사용

```tsx
import { Logout } from "abc-waas-prebuiltui-sdk";

function UserProfile() {
  return <Logout />;
}
```

## 📖 사용법

### 기본 컴포넌트

#### Login 컴포넌트

로그인 페이지에서 사용할 수 있는 완성된 로그인 UI입니다.

```tsx
import { Login } from "abc-waas-prebuiltui-sdk";

function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>
      <Login />
    </div>
  );
}
```

**특징:**

- 5개 소셜 로그인 제공자 지원 (Google, Apple, Naver, Kakao, LINE)
- 언어 전환 기능 (한국어/영어)
- 로딩 상태 표시
- 반응형 디자인
- 브랜드 일관성 유지

#### Logout 컴포넌트

사용자 프로필이나 설정 페이지에서 사용할 수 있는 로그아웃 버튼입니다.

```tsx
import { Logout } from "abc-waas-prebuiltui-sdk";

function UserProfile() {
  return (
    <div>
      <h2>사용자 정보</h2>
      <Logout />
    </div>
  );
}
```

**특징:**

- 로그인 상태에 따른 버튼 활성화/비활성화
- 로딩 상태 표시
- 다국어 지원

### 커스텀 Hook

#### useLanguage Hook

언어 설정을 관리하는 Hook입니다.

```tsx
import { useLanguage } from "abc-waas-prebuiltui-sdk";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <p>현재 언어: {language}</p>
      <button onClick={() => setLanguage("ko")}>한국어</button>
      <button onClick={() => setLanguage("en")}>English</button>
    </div>
  );
}
```

**기능:**

- 현재 언어 상태 관리
- 언어 변경 함수 제공
- localStorage를 통한 언어 설정 영구 저장
- 브라우저 간 언어 설정 동기화

## 🔧 API Reference

### 컴포넌트

#### `<Login />`

로그인 UI 컴포넌트

**Props:** 없음 (환경 변수로 설정)

**환경 변수:**

- `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth 클라이언트 ID
- `REACT_APP_GOOGLE_REDIRECT_URI`: Google OAuth 리다이렉트 URI
- `REACT_APP_APPLE_CLIENT_ID`: Apple OAuth 클라이언트 ID
- `REACT_APP_APPLE_REDIRECT_URI`: Apple OAuth 리다이렉트 URI
- `REACT_APP_NAVER_CLIENT_ID`: Naver OAuth 클라이언트 ID
- `REACT_APP_NAVER_REDIRECT_URI`: Naver OAuth 리다이렉트 URI
- `REACT_APP_KAKAO_CLIENT_ID`: Kakao OAuth 클라이언트 ID
- `REACT_APP_KAKAO_REDIRECT_URI`: Kakao OAuth 리다이렉트 URI
- `REACT_APP_LINE_CLIENT_ID`: LINE OAuth 클라이언트 ID
- `REACT_APP_LINE_REDIRECT_URI`: LINE OAuth 리다이렉트 URI

#### `<Logout />`

로그아웃 버튼 컴포넌트

**Props:** 없음

### Hook

#### `useLanguage()`

언어 설정을 관리하는 Hook

**반환값:**

```typescript
{
  language: "ko" | "en";
  setLanguage: (language: "ko" | "en") => void;
}
```

### 타입

#### `UseLanguageType`

```typescript
type UseLanguageType = "ko" | "en";
```

## 🌍 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```env
# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Apple OAuth
REACT_APP_APPLE_CLIENT_ID=your_apple_client_id
REACT_APP_APPLE_REDIRECT_URI=http://localhost:3000/auth/apple/callback

# Naver OAuth
REACT_APP_NAVER_CLIENT_ID=your_naver_client_id
REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000/auth/naver/callback

# Kakao OAuth
REACT_APP_KAKAO_CLIENT_ID=your_kakao_client_id
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback

# LINE OAuth
REACT_APP_LINE_CLIENT_ID=your_line_client_id
REACT_APP_LINE_REDIRECT_URI=http://localhost:3000/auth/line/callback
```

## 🔐 지원하는 소셜 서비스

### Google

- **OAuth 2.0** 기반 인증
- **이메일 정보** 수집
- **토큰 검증** 및 사용자 정보 조회

### Apple

- **Sign in with Apple** 지원
- **JWT 토큰 검증**
- **프라이버시 보호** 이메일 지원

### Naver

- **네이버 아이디로 로그인** 지원
- **OAuth 2.0** 기반 인증
- **사용자 프로필** 정보 수집

### Kakao

- **카카오 로그인** 지원
- **JWT 토큰 검증**
- **사용자 정보** 및 **이메일** 수집

### LINE

- **LINE 로그인** 지원
- **OAuth 2.0** 기반 인증
- **프로필 정보** 수집

## 🏗️ 아키텍처

### 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── Login.tsx       # 로그인 컴포넌트
│   └── Logout.tsx      # 로그아웃 컴포넌트
├── hooks/              # 커스텀 Hook
│   └── useLanguage.ts  # 언어 관리 Hook
├── types/              # TypeScript 타입 정의
│   ├── language.ts     # 언어 타입
│   └── svg.d.ts        # SVG 모듈 타입
├── utilities/          # 유틸리티 함수
│   ├── common.ts       # 공통 유틸리티
│   ├── google.ts       # Google OAuth 유틸리티
│   ├── apple.ts        # Apple OAuth 유틸리티
│   ├── naver.ts        # Naver OAuth 유틸리티
│   ├── kakao.ts        # Kakao OAuth 유틸리티
│   └── line.ts         # LINE OAuth 유틸리티
├── assets/             # 정적 자산
│   ├── icons/          # 아이콘 파일
│   └── animations/     # 애니메이션 파일
└── index.ts            # 메인 진입점
```

### 핵심 기능

1. **OAuth 2.0 플로우**: 각 소셜 서비스의 OAuth 2.0 인증 플로우 구현
2. **JWT 토큰 검증**: Apple, Kakao 등에서 제공하는 JWT 토큰 검증
3. **상태 관리**: 로그인/로그아웃 상태 실시간 관리
4. **다국어 지원**: 한국어/영어 언어 전환 기능
5. **보안**: 암호학적으로 안전한 UUID 생성 및 토큰 검증

### 의존성

- **abc-waas-core-sdk**: 핵심 WaaS 기능
- **jose**: JWT 토큰 검증
- **react**: UI 프레임워크
- **typescript**: 타입 안전성

## 🛠️ 개발 가이드

### 빌드 설정

이 프로젝트는 `tsup`을 사용하여 빌드됩니다:

```bash
npm run build
```

**빌드 옵션:**

- **ESM/CJS** 양쪽 형식 지원
- **TypeScript 선언 파일** 자동 생성
- **Tree shaking** 최적화
- **소스맵** 생성
- **SVG 파일** 데이터 URL로 변환

### 개발 환경 설정

1. **의존성 설치**:

```bash
npm install
```

2. **환경 변수 설정**:
   `.env` 파일에 필요한 OAuth 설정 추가

3. **개발 서버 실행**:

```bash
npm start
```

### 코드 스타일

- **TypeScript** 엄격 모드 사용
- **함수형 컴포넌트** 및 **Hook** 사용
- **인라인 스타일** 사용 (CSS-in-JS)
- **명확한 타입 정의** 및 **JSDoc** 주석

## 🔍 문제 해결

### 자주 발생하는 문제

#### 1. OAuth 리다이렉트 오류

**문제**: OAuth 인증 후 리다이렉트가 실패합니다.

**해결책**:

- 환경 변수의 리다이렉트 URI가 OAuth 앱 설정과 일치하는지 확인
- HTTPS 사용 (프로덕션 환경)
- 도메인 설정 확인

#### 2. CORS 오류

**문제**: 브라우저에서 CORS 오류가 발생합니다.

**해결책**:

- 백엔드 서버에서 CORS 설정 확인
- 프록시 서버 사용 고려

#### 3. 토큰 검증 실패

**문제**: JWT 토큰 검증이 실패합니다.

**해결책**:

- 클라이언트 ID/시크릿 확인
- 토큰 만료 시간 확인
- 서명 검증 설정 확인

#### 4. 언어 설정이 저장되지 않음

**문제**: 언어 설정이 새로고침 후 초기화됩니다.

**해결책**:

- 브라우저의 localStorage 지원 확인
- 프라이빗 모드에서의 제한 확인

### 디버깅 팁

1. **브라우저 개발자 도구** 활용
2. **네트워크 탭**에서 OAuth 요청 확인
3. **콘솔 로그** 확인
4. **환경 변수** 설정 확인

## 📄 라이선스

MIT License

Copyright (c) 2024 AhnLab Blockchain Company

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

- **이메일**: dev.pyoungwoo@gmail.com
- **문서**: [공식 문서](https://github.com/your-org/abc-waas-prebuiltui-sdk)
- **이슈**: [GitHub Issues](https://github.com/your-org/abc-waas-prebuiltui-sdk/issues)

---

**ABC WaaS Prebuilt UI SDK**로 빠르고 안전한 소셜 로그인을 구현해보세요! 🚀
