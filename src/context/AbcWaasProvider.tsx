// src/context/AbcWaasProvider.tsx

import React, { ReactNode, useState } from "react";
import { AbcWaasContext } from "@/context/AbcWaasContext";
import type { AbcWaasConfigType } from "@/types/config";
import { AbcWaasProvider as AbcWaasSDKProvider } from "abc-waas-core-sdk";

interface Props {
  config: AbcWaasConfigType;
  children: ReactNode;
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

  const coreConfig = {
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
      <AbcWaasSDKProvider config={coreConfig}>{children}</AbcWaasSDKProvider>
    </AbcWaasContext.Provider>
  );
};
