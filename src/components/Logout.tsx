// src/components/Logout.tsx

import { useEffect, useState } from "react";

import { useLogin, useLogout } from "abc-waas-core-sdk";

import LoadingAnimation from "@/assets/animations/common/animation_loading.svg";

type Language = "ko" | "en";

const buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 16px",
  fontSize: "0.9rem",
  borderRadius: "30px",
  width: "100%",
  cursor: "pointer",
  transition: "all 0.1s ease-in-out",
  wordBreak: "break-all",
  flexWrap: "wrap",
  gap: "12px",
} as const;

const activeButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#3A49FD",
  color: "#ffffff",
  border: "1px solid #3A49FD",
  cursor: "pointer",
  wordBreak: "keep-all",
} as const;

const inactiveButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#ffffff",
  color: "#666666",
  border: "1px solid #dadce0",
  cursor: "not-allowed",
  wordBreak: "keep-all",
} as const;

export default function Logout() {
  const [language, setLanguage] = useState<Language>(
    (sessionStorage.getItem("language") as Language) || "ko"
  );

  const { logoutV2, logoutInfo, setLogoutInfo } = useLogout();
  const { loginInfo } = useLogin();

  const handleLogout = async () => {
    if (loginInfo.status !== "SUCCESS" || logoutInfo.loading) return;

    try {
      setLogoutInfo({
        loading: true,
        error: logoutInfo.error,
        status: logoutInfo.status,
      });
      await logoutV2();
    } catch (error: any) {
      setLogoutInfo({
        loading: false,
        error: error,
        status: "FAILURE",
      });
    }
  };

  const LOGOUT_BUTTON_TEXT = {
    ko: "로그아웃",
    en: "Logout",
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loginInfo.status !== "SUCCESS" || logoutInfo.loading}
      style={
        loginInfo.status === "SUCCESS" ? activeButtonStyle : inactiveButtonStyle
      }
    >
      {logoutInfo.loading ? (
        <img
          src={LoadingAnimation}
          alt="loading"
          style={{ width: "24px", height: "24px" }}
        />
      ) : (
        LOGOUT_BUTTON_TEXT[language]
      )}
    </button>
  );
}

export { Logout };
