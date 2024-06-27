"use client";

import React, { useEffect, useMemo } from "react";
import { getFullnodeUrl } from "@mysten/sui/client";
import {
  lightTheme,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { type StateStorage } from "zustand/middleware";
import { useUserStore } from "@/stores/useUserStore";

type Props = {
  children: React.ReactNode;
};

const SuiWalletProvider = ({ children }: Props) => {
  const { rpcUrl } = useUserStore();

  const store = useMemo(
    () =>
      typeof window === "undefined" ? null : (localStorage as StateStorage),
    [],
  );

  const networks = {
    custom: { url: rpcUrl },
  };

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

export default SuiWalletProvider;
