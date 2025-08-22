# ABC WaaS Prebuilt UI SDK

ABC WaaS SDK를 위한 미리 만들어진 UI 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install abc-waas-prebuiltui-sdk
```

## 사용법

### 기본 설정

```tsx
import { AbcWaasProvider } from "abc-waas-sdk";
import { LoginButton, LoginModal, WalletInfo } from "abc-waas-prebuiltui-sdk";

const config = {
  API_WAAS_MYABCWALLET_URL: "https://api.abcwallet.com",
  MW_MYABCWALLET_URL: "https://myabcwallet.com",
  CLIENT_ID: "your_client_id",
  CLIENT_SECRET: "your_client_secret",
};

function App() {
  return (
    <AbcWaasProvider config={config}>
      <YourApp />
    </AbcWaasProvider>
  );
}
```

### 로그인 버튼

```tsx
import { LoginButton } from "abc-waas-prebuiltui-sdk";

function LoginPage() {
  const handleSuccess = (result) => {
    console.log("로그인 성공:", result);
  };

  const handleError = (error) => {
    console.error("로그인 실패:", error);
  };

  return (
    <div>
      <LoginButton
        service="google"
        onSuccess={handleSuccess}
        onError={handleError}
      />
      <LoginButton
        service="kakao"
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}
```

### 로그인 모달

```tsx
import { useState } from "react";
import { LoginModal } from "abc-waas-prebuiltui-sdk";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>지갑 연결하기</button>

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(result) => {
          console.log("로그인 성공:", result);
          setIsModalOpen(false);
        }}
        onError={(error) => {
          console.error("로그인 실패:", error);
        }}
        services={["google", "kakao", "naver"]} // 원하는 서비스만 표시
      />
    </div>
  );
}
```

### 지갑 정보 표시

```tsx
import { WalletInfo } from "abc-waas-prebuiltui-sdk";

function Dashboard() {
  return (
    <div>
      <h1>내 지갑</h1>
      <WalletInfo
        showBalance={true}
        showAddress={true}
        className="custom-wallet-info"
      />
    </div>
  );
}
```

### 커스텀 훅 사용

```tsx
import { useAbcPrebuiltUI } from "abc-waas-prebuiltui-sdk";

function CustomLogin() {
  const { login, logout, isLoggedIn, isLoading, error, user } =
    useAbcPrebuiltUI();

  const handleGoogleLogin = async () => {
    // 실제 구현에서는 Google SDK에서 토큰을 받아야 함
    const token = "google_token";
    const email = "user@gmail.com";

    try {
      await login("google", token, email);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <p>환영합니다, {user?.email}!</p>
        <button onClick={logout}>로그아웃</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleGoogleLogin} disabled={isLoading}>
        {isLoading ? "처리 중..." : "Google로 로그인"}
      </button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
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

## 컴포넌트 API

### LoginButton

| Prop      | Type                                                  | Required | Description      |
| --------- | ----------------------------------------------------- | -------- | ---------------- |
| service   | `'google' \| 'apple' \| 'naver' \| 'kakao' \| 'line'` | ✅       | 소셜 서비스 타입 |
| onSuccess | `(result: any) => void`                               | ❌       | 로그인 성공 콜백 |
| onError   | `(error: Error) => void`                              | ❌       | 로그인 실패 콜백 |
| disabled  | `boolean`                                             | ❌       | 버튼 비활성화    |
| className | `string`                                              | ❌       | 추가 CSS 클래스  |
| children  | `React.ReactNode`                                     | ❌       | 커스텀 텍스트    |

### LoginModal

| Prop      | Type                     | Required | Description        |
| --------- | ------------------------ | -------- | ------------------ |
| isOpen    | `boolean`                | ✅       | 모달 열림 상태     |
| onClose   | `() => void`             | ✅       | 모달 닫기 콜백     |
| onSuccess | `(result: any) => void`  | ❌       | 로그인 성공 콜백   |
| onError   | `(error: Error) => void` | ❌       | 로그인 실패 콜백   |
| services  | `SocialService[]`        | ❌       | 표시할 서비스 목록 |

### WalletInfo

| Prop        | Type      | Required | Description                 |
| ----------- | --------- | -------- | --------------------------- |
| showBalance | `boolean` | ❌       | 잔액 표시 여부 (기본: true) |
| showAddress | `boolean` | ❌       | 주소 표시 여부 (기본: true) |
| className   | `string`  | ❌       | 추가 CSS 클래스             |

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
