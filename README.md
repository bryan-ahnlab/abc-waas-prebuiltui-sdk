# ABC WaaS Prebuilt UI SDK

ABC WaaS SDK를 위한 미리 만들어진 UI 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install abc-waas-prebuiltui-sdk
```

## 사용법

### 기본 설정

```tsx
import { PrebuiltUIProvider, Login } from "abc-waas-prebuiltui-sdk";

const config = {
  apiUrl: "https://api.abcwallet.com",
  mwUrl: "https://myabcwallet.com",
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
};

function App() {
  return (
    <PrebuiltUIProvider config={config}>
      <YourApp />
    </PrebuiltUIProvider>
  );
}
```

### 로그인 컴포넌트 사용

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

### 커스텀 훅 사용

```tsx
import { usePrebuiltUI } from "abc-waas-prebuiltui-sdk";

function CustomComponent() {
  const { config } = usePrebuiltUI();

  return (
    <div>
      <p>API URL: {config.apiUrl}</p>
    </div>
  );
}
```

## 지원하는 소셜 서비스

- Google
- Apple
- Naver
- Kakao
- LINE

## API

### AbcWaasProvider

| Prop   | Type            | Required | Description |
| ------ | --------------- | -------- | ----------- |
| config | `AbcWaasConfig` | ✅       | 설정 객체   |

### AbcWaasConfig

| Property                 | Type     | Required | Description       |
| ------------------------ | -------- | -------- | ----------------- |
| API_WAAS_MYABCWALLET_URL | `string` | ✅       | API 서버 URL      |
| MW_MYABCWALLET_URL       | `string` | ✅       | MW 서버 URL       |
| CLIENT_ID                | `string` | ✅       | 클라이언트 ID     |
| CLIENT_SECRET            | `string` | ✅       | 클라이언트 시크릿 |

## 개발

```bash
# 의존성 설치
npm install

# 개발 모드 (파일 감시)
npm run dev

# 빌드
npm run build
```

## 라이선스

MIT
