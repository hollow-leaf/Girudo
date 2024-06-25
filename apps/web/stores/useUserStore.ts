import { create } from "zustand";
import { RPC_TESTNET_NODES } from "../constants/rpcNodeList";

interface UserState {
  rpcUrl: string;
  setRpcUrl: (newUrl: string) => void;
}

const useCoreUserStore = create<UserState>()((set) => ({
  rpcUrl: RPC_TESTNET_NODES[0]?.url ?? "https://fullnode.testnet.sui.io/", // defautl to testnet
  setRpcUrl: (newUrl) => set({ rpcUrl: newUrl }),
}));

export const useUserStore = () => {
  const store = useCoreUserStore();
  return { ...store };
};
