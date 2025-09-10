// src/components/Logout.tsx

import { useState } from "react";

import { useLogin, useLogout } from "abc-waas-core-sdk";

import LoadingAnimation from "@/assets/animations/common/animation_loading.svg";

const metaContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "20px 0",
  boxSizing: "border-box",
} as const;

const containerStyle = {
  width: "100%",
  maxWidth: "340px",
  boxSizing: "border-box",
  padding: "40px 30px",
  borderRadius: "30px",
  color: "#333",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
  backgroundColor: "#ffffff",
} as const;

const titleContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
} as const;

const contentContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
} as const;

const buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  fontSize: "16px",
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

const logoutButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#ffffff",
  color: "#000000",
} as const;

const confirmButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#dc3545",
  color: "#ffffff",
  border: "1px solid #dc3545",
} as const;

const cancelButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: "#6c757d",
  color: "#ffffff",
  border: "1px solid #6c757d",
} as const;

export default function Logout() {
  const { logoutV2, logoutInfo, setLogoutInfo } = useLogout();
  const { loginInfo } = useLogin();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutV2();
      setShowConfirm(false);
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // If user is not logged in, show message
  if (loginInfo.status !== "SUCCESS") {
    return (
      <div style={metaContainerStyle}>
        <div style={containerStyle}>
          <div style={titleContainerStyle}>
            <span
              style={{
                textAlign: "center",
                marginBottom: "36px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333333",
                whiteSpace: "pre-line",
                lineHeight: "1.5",
              }}
            >
              {"AhnLab Blockchain Company\nWallet-as-a-Service"}
            </span>
          </div>

          <div style={contentContainerStyle}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "24px",
                fontSize: "16px",
                color: "#666666",
              }}
            >
              로그인되지 않은 상태입니다.
            </div>

            {/* Copyright */}
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              <span
                style={{
                  color: "#666666",
                  textAlign: "center",
                  display: "block",
                  width: "100%",
                  fontSize: "10px",
                }}
              >
                © AhnLab Blockchain Company. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={metaContainerStyle}>
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span
            style={{
              textAlign: "center",
              marginBottom: "36px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#333333",
              whiteSpace: "pre-line",
              lineHeight: "1.5",
            }}
          >
            {"AhnLab Blockchain Company\nWallet-as-a-Service"}
          </span>
        </div>

        <div style={contentContainerStyle}>
          {/* User Info */}
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: "24px",
              padding: "16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              fontSize: "14px",
              color: "#333333",
            }}
          >
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              로그인된 계정
            </div>
            <div style={{ marginBottom: "4px" }}>
              로그아웃을 진행하시겠습니까?
            </div>
          </div>

          {!showConfirm ? (
            // Logout Button
            <button
              onClick={handleLogoutClick}
              disabled={logoutInfo.loading}
              style={logoutButtonStyle}
              onMouseEnter={(event) =>
                (event.currentTarget.style.backgroundColor = "#f7f7f7")
              }
              onMouseLeave={(event) =>
                (event.currentTarget.style.backgroundColor = "#ffffff")
              }
            >
              {logoutInfo.loading ? (
                <img
                  src={LoadingAnimation}
                  alt="loading"
                  style={{ width: "24px", height: "24px" }}
                />
              ) : (
                "로그아웃"
              )}
            </button>
          ) : (
            // Confirmation Buttons
            <>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "24px",
                  fontSize: "16px",
                  color: "#333333",
                }}
              >
                정말 로그아웃하시겠습니까?
              </div>

              <button
                onClick={handleLogout}
                disabled={logoutInfo.loading}
                style={confirmButtonStyle}
                onMouseEnter={(event) =>
                  (event.currentTarget.style.backgroundColor = "#bb2d3b")
                }
                onMouseLeave={(event) =>
                  (event.currentTarget.style.backgroundColor = "#dc3545")
                }
              >
                {logoutInfo.loading ? (
                  <img
                    src={LoadingAnimation}
                    alt="loading"
                    style={{ width: "24px", height: "24px" }}
                  />
                ) : (
                  "확인"
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={logoutInfo.loading}
                style={cancelButtonStyle}
                onMouseEnter={(event) =>
                  (event.currentTarget.style.backgroundColor = "#5c636a")
                }
                onMouseLeave={(event) =>
                  (event.currentTarget.style.backgroundColor = "#6c757d")
                }
              >
                취소
              </button>
            </>
          )}

          {/* Error Message */}
          <div
            style={{
              width: "100%",
              minHeight: "31px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {logoutInfo.error?.message && (
              <span
                style={{
                  color: "red",
                  textAlign: "center",
                  display: "block",
                  width: "100%",
                  marginBottom: "12px",
                  fontSize: "12px",
                }}
              >
                {logoutInfo.error.message}
              </span>
            )}
          </div>

          {/* Copyright */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#666666",
                textAlign: "center",
                display: "block",
                width: "100%",
                fontSize: "10px",
              }}
            >
              © AhnLab Blockchain Company. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Logout };
