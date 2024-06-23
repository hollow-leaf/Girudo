"use client";

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useResolveSuiNSName } from "@mysten/dapp-kit";

import { useUserStore } from "@/stores/useUserStore";

interface IAppContextProps {
  walletAddress: string | undefined;
  suiName: string | null | undefined;
}

const AppContext = createContext<IAppContextProps>({
  walletAddress: undefined,
  suiName: undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props: PropsWithChildren) => {
  const client = useSuiClient();
  const account = useCurrentAccount();

  const { rpcUrl } = useUserStore();

  const walletAddress = useMemo(() => {
    return account?.address;
  }, [account]);

  const { data: suiName } = useResolveSuiNSName(walletAddress);

  return (
    <>
      <AppContext.Provider
        value={{
          walletAddress,
          suiName,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};
