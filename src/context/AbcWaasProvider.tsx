// src/context/AbcWaasProvider.tsx

import React, { useState } from "react";
import { AbcWaasContext } from "@/context/AbcWaasContext";
import type { AbcWaasConfig } from "@/types/config";
import { AbcWaasProvider as AbcWaasSDKProvider } from "abc-waas-sdk";

interface Props {
  config: AbcWaasConfig;
  children: React.ReactNode;
}

export const AbcWaasProvider = ({ config, children }: Props) => {
  const [basicToken, setBasicToken] = useState<string | null>(null);

  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);

  const [abcAuth, setAbcAuth] = useState<any>(null);
  const [abcWallet, setAbcWallet] = useState<any>(null);
  const [abcUser, setAbcUser] = useState<any>(null);
  const [secureChannel, setSecureChannel] = useState<any>(null);

  // abc-waas-sdk config로 변환
  const abcWaasSDKConfig = {
    API_WAAS_MYABCWALLET_URL: config.API_WAAS_MYABCWALLET_URL,
    MW_MYABCWALLET_URL: config.MW_MYABCWALLET_URL,
    CLIENT_ID: config.CLIENT_ID,
    CLIENT_SECRET: config.CLIENT_SECRET,
  };

  return (
    <AbcWaasContext.Provider
      value={{
        config,

        basicToken,
        setBasicToken,

        email,
        setEmail,
        token,
        setToken,
        service,
        setService,

        abcAuth,
        setAbcAuth,
        abcWallet,
        setAbcWallet,
        abcUser,
        setAbcUser,
        secureChannel,
        setSecureChannel,
      }}
    >
      <AbcWaasSDKProvider config={abcWaasSDKConfig}>
        {children}
      </AbcWaasSDKProvider>
    </AbcWaasContext.Provider>
  );
};
