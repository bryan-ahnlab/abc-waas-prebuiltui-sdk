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
- 🔒 **보안 강화**: 암호학적으로 안전한 UUID 생성
- 🌍 **다국어 지원**: 한국어/영어 언어 전환 기능
- 🎯 **커스텀 Hook**: 언어 관리를 위한 `useLanguage` Hook 제공

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

### 기본 사용법

```tsx
import React from "react";
import {
  AbcWaasProvider,
  Login,
  Logout,
  useLogin,
  useLogout,
  useLanguage,
} from "abc-waas-prebuiltui-sdk";

const config = {
  API_WAAS_MYABCWALLET_URL:
    process.env.REACT_APP_API_WAAS_MYABCWALLET_URI || "",
  MW_MYABCWALLET_URL: process.env.REACT_APP_MW_MYABCWALLET_URI || "",
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || "",
  CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET || "",
};

function App() {
  return (
    <AbcWaasProvider config={config}>
      <div className="App">
        <Login />
        <Logout />
      </div>
    </AbcWaasProvider>
  );
}

export default App;
```

### 로그인 상태 확인

```tsx
import { useLogin } from "abc-waas-prebuiltui-sdk";

function UserStatus() {
  const { loginInfo } = useLogin();

  if (loginInfo.loading) {
    return <div>로그인 중...</div>;
  }

  if (loginInfo.status === "SUCCESS") {
    return <div>로그인 성공!</div>;
  }

  if (loginInfo.error) {
    return <div>오류: {loginInfo.error.message}</div>;
  }

  return <div>로그인이 필요합니다.</div>;
}
```

## 🔧 API Reference

### Components

#### `<Login />`

로그인 UI 컴포넌트입니다. 5개의 소셜 로그인 버튼과 언어 전환 기능을 제공합니다.

**Props**: 없음

**Features**:

- Google, Apple, Naver, Kakao, LINE 소셜 로그인
- 한국어/영어 언어 전환
- 로딩 상태 표시
- 에러 메시지 표시
- 반응형 디자인

#### `<Logout />`

로그아웃 버튼 컴포넌트입니다.

**Props**: 없음

**Features**:

- 로그인 상태에 따른 활성화/비활성화
- 로딩 상태 표시
- 다국어 지원

### Hooks

#### `useLogin()`

로그인 관련 상태와 함수를 제공합니다.

**Returns**:

```typescript
{
  loginV2: (email: string, token: string, provider: string) => Promise<void>;
  loginInfo: {
    loading: boolean;
    error: Error | null;
    status: 'IDLE' | 'SUCCESS' | 'FAILURE';
  };
  setLoginInfo: (info: LoginInfo) => void;
  service: string;
}
```

#### `useLogout()`

로그아웃 관련 상태와 함수를 제공합니다.

**Returns**:

```typescript
{
  logoutV2: () => Promise<void>;
  logoutInfo: {
    loading: boolean;
    error: Error | null;
    status: 'IDLE' | 'SUCCESS' | 'FAILURE';
  };
  setLogoutInfo: (info: LogoutInfo) => void;
}
```

#### `useLanguage()`

언어 관리 Hook입니다.

**Returns**:

```typescript
{
  language: 'ko' | 'en';
  setLanguage: (language: 'ko' | 'en') => void;
}
```

**Features**:

- localStorage를 통한 언어 설정 저장
- 다른 탭 간 언어 설정 동기화
- 기본값: 'ko' (한국어)

## ⚙️ 환경 변수 설정

### Google OAuth

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### Apple OAuth

```env
REACT_APP_APPLE_CLIENT_ID=your_apple_client_id
REACT_APP_APPLE_REDIRECT_URI=http://localhost:3000/auth/apple/callback
REACT_APP_APPLE_TEAM_ID=your_apple_team_id
REACT_APP_APPLE_KEY_ID=your_apple_key_id
REACT_APP_APPLE_PRIVATE_KEY=your_apple_private_key
```

### Naver OAuth

```env
REACT_APP_NAVER_CLIENT_ID=your_naver_client_id
REACT_APP_NAVER_CLIENT_SECRET=your_naver_client_secret
REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000/auth/naver/callback
```

### Kakao OAuth

```env
REACT_APP_KAKAO_REST_API_KEY=your_kakao_rest_api_key
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
```

### LINE OAuth

```env
REACT_APP_LINE_CLIENT_ID=your_line_client_id
REACT_APP_LINE_CLIENT_SECRET=your_line_client_secret
REACT_APP_LINE_REDIRECT_URI=http://localhost:3000/auth/line/callback
```

## 🌐 지원하는 소셜 서비스

### Google

- **스코프**: `https://www.googleapis.com/auth/userinfo.email`
- **인증 방식**: OAuth 2.0 Authorization Code Flow
- **토큰 타입**: ID Token

### Apple

- **스코프**: `name email`
- **인증 방식**: OAuth 2.0 with PKCE
- **토큰 타입**: ID Token + Authorization Code

### Naver

- **스코프**: 기본 (이메일 정보)
- **인증 방식**: OAuth 2.0 Authorization Code Flow
- **토큰 타입**: Access Token

### Kakao

- **스코프**: `account_email openid`
- **인증 방식**: OAuth 2.0 Authorization Code Flow
- **토큰 타입**: ID Token + Access Token

### LINE

- **스코프**: `profile openid email`
- **인증 방식**: OAuth 2.0 Authorization Code Flow
- **토큰 타입**: ID Token

## 🎯 커스텀 Hook

### useLanguage Hook

언어 관리를 위한 커스텀 Hook입니다.

```tsx
import { useLanguage } from "abc-waas-prebuiltui-sdk";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <p>현재 언어: {language === "ko" ? "한국어" : "English"}</p>
      <button onClick={() => setLanguage("ko")}>한국어</button>
      <button onClick={() => setLanguage("en")}>English</button>
    </div>
  );
}
```

**특징**:

- localStorage를 통한 언어 설정 영구 저장
- 다른 탭에서 언어 변경 시 자동 동기화
- SSR 안전성 보장 (window 객체 체크)

## 🏗️ 아키텍처

### 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── Login.tsx       # 로그인 컴포넌트
│   └── Logout.tsx      # 로그아웃 컴포넌트
├── hooks/              # 커스텀 Hook
│   ├── useLanguage.ts  # 언어 관리 Hook
│   └── index.ts        # Hook 내보내기
├── utilities/          # 유틸리티 함수
│   ├── common.ts       # 공통 함수 (UUID 생성 등)
│   ├── google.ts       # Google OAuth 처리
│   ├── apple.ts        # Apple OAuth 처리
│   ├── naver.ts        # Naver OAuth 처리
│   ├── kakao.ts        # Kakao OAuth 처리
│   └── line.ts         # LINE OAuth 처리
├── types/              # 타입 정의
│   ├── language.ts     # 언어 타입
│   └── svg.d.ts        # SVG 모듈 타입
├── assets/             # 정적 자산
│   ├── icons/          # 아이콘 파일
│   └── animations/     # 애니메이션 파일
└── index.ts            # 메인 내보내기
```

### 빌드 설정

- **번들러**: tsup
- **형식**: ESM + CJS
- **타입**: TypeScript 선언 파일 자동 생성
- **최적화**: Tree shaking, 코드 분할
- **외부 의존성**: React, React-DOM

### 보안 기능

- **UUID 생성**: 크로스 브라우저 호환 UUID v4 생성
- **OAuth 상태 검증**: CSRF 공격 방지
- **토큰 검증**: 각 소셜 서비스별 토큰 검증
- **환경 변수**: 민감한 정보 환경 변수로 관리

## 🛠️ 개발 가이드

### 로컬 개발 환경 설정

1. **저장소 클론**

```bash
git clone https://github.com/your-org/abc-waas-prebuiltui-sdk.git
cd abc-waas-prebuiltui-sdk
```

2. **의존성 설치**

```bash
npm install
```

3. **빌드**

```bash
npm run build
```

### 새로운 소셜 서비스 추가

1. `src/utilities/` 디렉토리에 새로운 OAuth 처리 파일 생성
2. `src/components/Login.tsx`에 새로운 프로바이더 추가
3. 환경 변수 설정 가이드 업데이트

### 스타일 커스터마이징

현재 컴포넌트는 인라인 스타일을 사용합니다. 커스터마이징이 필요한 경우:

1. CSS-in-JS 라이브러리 사용
2. CSS 모듈 사용
3. styled-components 사용

## 🐛 문제 해결

### 자주 발생하는 문제

#### 1. 환경 변수가 인식되지 않는 경우

```bash
# .env 파일이 프로젝트 루트에 있는지 확인
# 환경 변수명이 REACT_APP_ 접두사로 시작하는지 확인
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
```

#### 2. OAuth 리다이렉트 URI 오류

```bash
# 각 소셜 서비스의 개발자 콘솔에서 리다이렉트 URI가 정확히 설정되었는지 확인
# 로컬 개발: http://localhost:3000/auth/[provider]/callback
# 프로덕션: https://yourdomain.com/auth/[provider]/callback
```

#### 3. CORS 오류

```bash
# 백엔드 서버에서 CORS 설정 확인
# 프론트엔드 도메인이 허용 목록에 포함되어 있는지 확인
```

#### 4. TypeScript 타입 오류

```bash
# 타입 정의 파일이 올바르게 생성되었는지 확인
npm run build
# dist/index.d.ts 파일 확인
```

### 디버깅 팁

1. **브라우저 개발자 도구**에서 네트워크 탭 확인
2. **콘솔 로그**에서 에러 메시지 확인
3. **localStorage**에서 저장된 상태 확인
4. **환경 변수**가 올바르게 로드되었는지 확인

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
- **이슈**: [GitHub Issues](https://github.com/your-org/abc-waas-prebuiltui-sdk/issues)
- **문서**: [API Documentation](https://docs.example.com)

---

**ABC WaaS Prebuilt UI SDK** - 안전하고 간편한 소셜 로그인 솔루션
