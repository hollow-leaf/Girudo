import { create } from "zustand";
import { RPC_TESTNET_NODES } from "../constants/rpcNodeList";
import { UserInfo } from "@/type";
import { saltByUserIdToken } from "@/services/serverless";
import { jwtDecode } from "jwt-decode";

interface UserState {
  rpcUrl: string;
  setRpcUrl: (newUrl: string) => void;
}

interface LoginState {
  userInfo: UserInfo;
  suiUserInfo: { jwt: string; salt: string };
  loginByJwt: (jwt: string) => void;
}

const useCoreUserStore = create<UserState>()((set) => ({
  rpcUrl: RPC_TESTNET_NODES[0]?.url ?? "https://fullnode.testnet.sui.io/", // defautl to testnet
  setRpcUrl: (newUrl) => set({ rpcUrl: newUrl }),
}));

const useCoreLoginStore = create<LoginState>()((set) => ({
  userInfo: { username: "", avater: "", email: "", suiAddress: "" },
  suiUserInfo: { jwt: "", salt: "" },
  loginByJwt: async (jwt) => {
    const decodedJwt = jwtDecode(jwt);
    if (typeof decodedJwt.sub != undefined) {
      const _userInfo = await saltByUserIdToken(decodedJwt.sub as string);
      sessionStorage.setItem("girudo-jwt", jwt);
      sessionStorage.setItem("girudo-salt", _userInfo.salt);
      set({
        userInfo: _userInfo.userInfo,
        suiUserInfo: { jwt: jwt, salt: _userInfo.salt },
      });
    }
  },
}));

export const useUserStore = () => {
  const store = useCoreUserStore();
  return { ...store };
};

export const useLoginStore = () => {
  const store = useCoreLoginStore();
  return { ...store };
};
