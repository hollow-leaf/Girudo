"use client";

import React, { useEffect, useMemo } from "react";
import { getFullnodeUrl } from "@mysten/sui/client";
import {
  lightTheme,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { type StateStorage } from "zustand/middleware";
import { useLoginStore, useUserStore } from "@/stores/useUserStore";

type Props = {
  children: React.ReactNode;
};

const SuiWalletProvider = ({ children }: Props) => {
  const { rpcUrl } = useUserStore();
  const { loginByJwt } = useLoginStore();

  const store = useMemo(
    () =>
      typeof window === "undefined" ? null : (localStorage as StateStorage),
    [],
  );

  const networks = {
    custom: { url: rpcUrl },
  };

  //check whether the jwt and salt exist in localStorage or sessionStorage, if exist login.
  useEffect(() => {
    const loginData = lsAndSsLoginDataCheck()
    if(loginData.jwt == "") return
    loginByJwt(loginData.jwt)
  }, [])

  return (
    <SuiClientProvider networks={networks} defaultNetwork="custom">
      <WalletProvider
        theme={lightTheme}
        autoConnect={true}
        storage={store}
        storageKey="sui-wallet"
        preferredWallets={["Sui Wallet"]}
      >
        {children}
      </WalletProvider>
    </SuiClientProvider>
  );
};

function lsAndSsLoginDataCheck(): {jwt: string, salt: string} {
  const jwtL = localStorage.getItem("girudo-jwt")
  const saltL = localStorage.getItem("girudo-salt")
  if(jwtL && saltL) return {jwt: jwtL, salt: saltL}

  const jwtS = sessionStorage.getItem("girudo-jwt")
  const saltS = sessionStorage.getItem("girudo-salt")
  if(jwtS && saltS) return {jwt: jwtS, salt: saltS}

  return {jwt: "", salt: ""}
}

export default SuiWalletProvider;
