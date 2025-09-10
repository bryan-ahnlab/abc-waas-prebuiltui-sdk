// src/components/Login.tsx

import { useCallback, useEffect } from "react";

import { useLogin } from "abc-waas-core-sdk";

import GoogleIcon from "@/assets/icons/providers/icon_google.svg";
import AppleIcon from "@/assets/icons/providers/icon_apple.svg";
import KakaoIcon from "@/assets/icons/providers/icon_kakao.svg";
import NaverIcon from "@/assets/icons/providers/icon_naver.svg";
import LineIcon from "@/assets/icons/providers/icon_line.svg";

import LoadingAnimation from "@/assets/animations/common/animation_loading.svg";

import { getGoogleToken, getGoogleTokeninfo } from "@/utilities/google";
import { getNaverToken, getNaverTokeninfo } from "@/utilities/naver";
import { getLineToken, getLineTokeninfo } from "@/utilities/line";
import {
  getKakaoToken,
  getKakaoTokeninfo,
  verifyKakaoToken,
} from "@/utilities/kakao";
import {
  createAppleClientSecret,
  getAppleToken,
  verifyAppleToken,
} from "@/utilities/apple";
import { generateUUID } from "@/utilities/common";

type Providers = "google" | "apple" | "kakao" | "naver" | "line";

const providers: {
  type: Providers;
  label: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
  border: string;
}[] = [
  {
    type: "google",
    label: "Google로 계속하기",
    icon: GoogleIcon,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0",
  },
  {
    type: "apple",
    label: "Apple로 계속하기",
    icon: AppleIcon,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0",
  },
  {
    type: "naver",
    label: "네이버로 계속하기",
    icon: NaverIcon,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0",
  },
  {
    type: "kakao",
    label: "카카오로 계속하기",
    icon: KakaoIcon,
    backgroundColor: "#FEE500",
    textColor: "#000000",
    hoverColor: "#ecd900",
    border: "1px solid #FEE500",
  },
  {
    type: "line",
    label: "LINE으로 계속하기",
    icon: LineIcon,
    backgroundColor: "#03C75A",
    textColor: "#ffffff",
    hoverColor: "#02b94e",
    border: "1px solid #03C75A",
  },
];

const metaContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "20px",
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
} as const;

export default function Login() {
  const location = {
    search: window.location.search,
    hash: window.location.hash,
    pathname: window.location.pathname,
  };

  const { loginV2, loginInfo, setLoginInfo, service } = useLogin();

  const handleRedirect = useCallback((provider: Providers) => {
    localStorage.setItem("provider", provider);

    if (provider === "google") {
      if (
        !process.env.REACT_APP_GOOGLE_CLIENT_ID ||
        !process.env.REACT_APP_GOOGLE_REDIRECT_URI
      ) {
        throw new Error("Google client ID or redirect URI is not set.");
      }

      const state = generateUUID();
      localStorage.setItem("google_oauth_state", state);

      const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      url.searchParams.set("client_id", process.env.REACT_APP_GOOGLE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_GOOGLE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set(
        "scope",
        "https://www.googleapis.com/auth/userinfo.email"
      );
      url.searchParams.set("prompt", "consent");
      url.searchParams.set("access_type", "offline");
      url.searchParams.set("state", state);

      window.location.href = url.toString();
    } else if (provider === "apple") {
      if (
        !process.env.REACT_APP_APPLE_CLIENT_ID ||
        !process.env.REACT_APP_APPLE_REDIRECT_URI
      ) {
        throw new Error("Apple client ID or redirect URI is not set.");
      }

      const state = generateUUID();
      localStorage.setItem("apple_oauth_state", state);

      const url = new URL("https://appleid.apple.com/auth/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_APPLE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_APPLE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code id_token");
      url.searchParams.set("scope", ""); // name email
      url.searchParams.set("response_mode", "fragment"); // from_post
      url.searchParams.set("state", state);

      window.location.href = url.toString();
    } else if (provider === "naver") {
      if (
        !process.env.REACT_APP_NAVER_CLIENT_ID ||
        !process.env.REACT_APP_NAVER_REDIRECT_URI
      ) {
        throw new Error("Naver client ID or redirect URI is not set.");
      }

      const state = generateUUID();
      localStorage.setItem("naver_oauth_state", state);

      const url = new URL("https://nid.naver.com/oauth2.0/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_NAVER_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_NAVER_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("state", state);

      window.location.href = url.toString();
    } else if (provider === "kakao") {
      if (
        !process.env.REACT_APP_KAKAO_REST_API_KEY ||
        !process.env.REACT_APP_KAKAO_REDIRECT_URI
      ) {
        throw new Error("Kakao client ID or redirect URI is not set.");
      }

      const state = generateUUID();
      localStorage.setItem("kakao_oauth_state", state);

      const url = new URL("https://kauth.kakao.com/oauth/authorize");
      url.searchParams.set(
        "client_id",
        process.env.REACT_APP_KAKAO_REST_API_KEY
      );
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_KAKAO_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("scope", "account_email openid");
      url.searchParams.set("state", state);

      window.location.href = url.toString();
    } else if (provider === "line") {
      if (
        !process.env.REACT_APP_LINE_CLIENT_ID ||
        !process.env.REACT_APP_LINE_REDIRECT_URI
      ) {
        throw new Error("Line client ID or redirect URI is not set.");
      }

      const state = generateUUID();
      localStorage.setItem("line_oauth_state", state);

      const url = new URL("https://access.line.me/oauth2/v2.1/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_LINE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_LINE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("scope", "profile openid email");
      url.searchParams.set("state", state);

      window.location.href = url.toString();
    }
  }, []);

  const handleCallback = useCallback(
    async (provider: string, data: any) => {
      try {
        setLoginInfo({ loading: true, error: null, status: null });

        if (provider === "google") {
          if (
            !process.env.REACT_APP_GOOGLE_CLIENT_ID ||
            !process.env.REACT_APP_GOOGLE_CLIENT_SECRET ||
            !process.env.REACT_APP_GOOGLE_REDIRECT_URI
          ) {
            throw new Error(
              "Google client ID, client secret or redirect URI is not set."
            );
          }

          const { code } = data;

          const getGoogleTokenData = await getGoogleToken(
            code,
            process.env.REACT_APP_GOOGLE_CLIENT_ID,
            process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            process.env.REACT_APP_GOOGLE_REDIRECT_URI
          );

          const getGoogleTokeninfoData = await getGoogleTokeninfo(
            getGoogleTokenData.id_token
          );

          await loginV2(
            getGoogleTokeninfoData.email,
            getGoogleTokenData.id_token,
            provider
          );
        } else if (provider === "apple") {
          if (
            !process.env.REACT_APP_APPLE_CLIENT_ID ||
            !process.env.REACT_APP_APPLE_REDIRECT_URI ||
            !process.env.REACT_APP_APPLE_TEAM_ID ||
            !process.env.REACT_APP_APPLE_KEY_ID ||
            !process.env.REACT_APP_APPLE_PRIVATE_KEY
          ) {
            throw new Error(
              "Apple client ID, redirect URI, team ID, key ID or private key is not set."
            );
          }

          const { code, id_token } = data;

          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );

          const APPLE_CLIENT_SECRET = await createAppleClientSecret(
            id_token,
            process.env.REACT_APP_APPLE_PRIVATE_KEY,
            process.env.REACT_APP_APPLE_TEAM_ID,
            process.env.REACT_APP_APPLE_KEY_ID
          );

          const getAppleTokenData = await getAppleToken(
            code,
            process.env.REACT_APP_APPLE_CLIENT_ID,
            APPLE_CLIENT_SECRET,
            process.env.REACT_APP_APPLE_REDIRECT_URI
          );

          const getAppleDecodedTokenData = JSON.parse(
            atob(getAppleTokenData?.id_token?.split(".")[1])
          );

          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );

          await loginV2(
            getAppleDecodedTokenData.email,
            getAppleTokenData.id_token,
            provider
          );
        } else if (provider === "naver") {
          if (
            !process.env.REACT_APP_NAVER_CLIENT_ID ||
            !process.env.REACT_APP_NAVER_CLIENT_SECRET ||
            !process.env.REACT_APP_NAVER_REDIRECT_URI
          ) {
            throw new Error(
              "Naver client ID, client secret or redirect URI is not set."
            );
          }

          const { code } = data;

          const getNaverTokenData = await getNaverToken(
            code,
            process.env.REACT_APP_NAVER_CLIENT_ID,
            process.env.REACT_APP_NAVER_CLIENT_SECRET,
            process.env.REACT_APP_NAVER_REDIRECT_URI
          );

          const getNaverTokeninfoData = await getNaverTokeninfo(
            getNaverTokenData.access_token
          );

          await loginV2(
            getNaverTokeninfoData.response.email,
            getNaverTokenData.access_token,
            provider
          );
        } else if (provider === "kakao") {
          if (
            !process.env.REACT_APP_KAKAO_REST_API_KEY ||
            !process.env.REACT_APP_KAKAO_REDIRECT_URI
          ) {
            throw new Error("Kakao client ID or redirect URI is not set.");
          }

          const { code } = data;

          const getKakaoTokenData = await getKakaoToken(
            code,
            process.env.REACT_APP_KAKAO_REST_API_KEY,
            process.env.REACT_APP_KAKAO_REDIRECT_URI
          );

          await verifyKakaoToken(
            getKakaoTokenData.id_token,
            process.env.REACT_APP_KAKAO_REST_API_KEY
          );

          const getKakaoTokeninfoData = await getKakaoTokeninfo(
            getKakaoTokenData.access_token
          );

          await loginV2(
            getKakaoTokeninfoData.kakao_account.email,
            getKakaoTokenData.id_token,
            provider
          );
        } else if (provider === "line") {
          if (
            !process.env.REACT_APP_LINE_CLIENT_ID ||
            !process.env.REACT_APP_LINE_CLIENT_SECRET ||
            !process.env.REACT_APP_LINE_REDIRECT_URI
          ) {
            throw new Error(
              "Line client ID, client secret or redirect URI is not set."
            );
          }

          const { code } = data;

          const getLineTokenData = await getLineToken(
            code,
            process.env.REACT_APP_LINE_CLIENT_ID,
            process.env.REACT_APP_LINE_CLIENT_SECRET,
            process.env.REACT_APP_LINE_REDIRECT_URI
          );

          const getLineTokeninfoData = await getLineTokeninfo(
            getLineTokenData.id_token,
            process.env.REACT_APP_LINE_CLIENT_ID
          );

          await loginV2(
            getLineTokeninfoData.email,
            getLineTokenData.id_token,
            provider
          );
        } else {
          throw new Error("Invalid provider.");
        }
      } catch (error: any) {
        if (error) {
          setLoginInfo({ loading: false, error: error, status: null });
        }
      } finally {
        setLoginInfo({ loading: false, error: null, status: null });
      }
    },
    [loginV2, setLoginInfo]
  );

  useEffect(() => {
    const provider = localStorage.getItem("provider");

    if (provider === "google") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("google_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "apple") {
      const hashParams = new URLSearchParams(location.hash.slice(1));

      const code = hashParams.get("code");
      const id_token = hashParams.get("id_token");

      const returnedState = hashParams.get("state");
      const storedState = localStorage.getItem("apple_oauth_state");

      const data = {
        code,
        id_token,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "naver") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("naver_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "kakao") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("kakao_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "line") {
      const params = new URLSearchParams(location.search);

      const code = params.get("code");

      const returnedState = params.get("state");
      const storedState = localStorage.getItem("line_oauth_state");

      const data = {
        code,
      };

      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    }
  }, [location.search, location.hash]);

  return (
    <div style={metaContainerStyle}>
      <div style={containerStyle}>
        <div style={titleContainerStyle}>
          <span
            style={{
              textAlign: "center",
              marginBottom: "36px",
              fontSize: "18px",
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
          {providers.map((item) => (
            <button
              key={item.type}
              onClick={() => handleRedirect(item.type)}
              disabled={loginInfo.loading}
              style={{
                ...buttonBaseStyle,
                backgroundColor: item.backgroundColor,
                color: item.textColor,
                border: item.border,
              }}
              onMouseEnter={(event) =>
                (event.currentTarget.style.backgroundColor = item.hoverColor)
              }
              onMouseLeave={(event) =>
                (event.currentTarget.style.backgroundColor =
                  item.backgroundColor)
              }
            >
              {loginInfo.loading && service === item.type ? (
                <img
                  src={LoadingAnimation}
                  alt="loading"
                  style={{ width: "24px", height: "24px" }}
                />
              ) : (
                <>
                  <img
                    src={item.icon}
                    alt={`${item.type} icon`}
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  {item.label}
                </>
              )}
            </button>
          ))}

          {/* Error Message */}
          <div
            style={{
              width: "100%",
              minHeight: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loginInfo.error?.message && (
              <span
                style={{
                  color: "red",
                  textAlign: "center",
                  display: "block",
                  width: "100%",
                  marginBottom: "24px",
                  fontSize: "12px",
                }}
              >
                {loginInfo.error.message}
              </span>
            )}
          </div>
          {/*  */}

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

export { Login };
