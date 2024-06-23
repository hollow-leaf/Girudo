import { create } from "zustand";
import { SUI_TESTNET_URL } from "../constants/rpcNodeList";

interface UserState {
  rpcUrl: string;
  setRpcUrl: (newUrl: string) => void;
}

const useCoreUserStore = create<UserState>()((set) => ({
  rpcUrl: SUI_TESTNET_URL,
  setRpcUrl: (newUrl) => set({ rpcUrl: newUrl }),
}));

export const useUserStore = () => {
  const store = useCoreUserStore();
  return { ...store };
};
