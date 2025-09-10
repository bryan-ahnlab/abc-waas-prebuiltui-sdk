// src/components/Logout.tsx

import { useLogin, useLogout } from "abc-waas-core-sdk";

import LoadingAnimation from "@/assets/animations/common/animation_loading.svg";

const buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  fontSize: "0.9rem",
  borderRadius: "30px",
  width: "100%",
  marginBottom: "16px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  wordBreak: "break-all",
  flexWrap: "wrap",
  gap: "12px",
  border: "1px solid #dadce0",
} as const;

const activeButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#ffffff",
  color: "#000000",
} as const;

const inactiveButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#f5f5f5",
  color: "#999999",
  cursor: "not-allowed",
  border: "1px solid #e0e0e0",
} as const;

export default function Logout() {
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

  const LOGOUT_BUTTON_TEXT = "로그아웃";

  return (
    <button
      onClick={handleLogout}
      disabled={loginInfo.status !== "SUCCESS" || logoutInfo.loading}
      style={
        loginInfo.status === "SUCCESS" ? activeButtonStyle : inactiveButtonStyle
      }
      onMouseEnter={(event) => {
        if (loginInfo.status === "SUCCESS" && !logoutInfo.loading) {
          event.currentTarget.style.backgroundColor = "#f7f7f7";
        }
      }}
      onMouseLeave={(event) => {
        if (loginInfo.status === "SUCCESS" && !logoutInfo.loading) {
          event.currentTarget.style.backgroundColor = "#ffffff";
        }
      }}
    >
      {logoutInfo.loading ? (
        <img
          src={LoadingAnimation}
          alt="loading"
          style={{ width: "24px", height: "24px" }}
        />
      ) : (
        LOGOUT_BUTTON_TEXT
      )}
    </button>
  );
}

export { Logout };
