import { RpcNode } from "../type";

export const SUI_TESTNET_URL = "https://fullnode.testnet.sui.io/";

export const RPC_NODES: RpcNode[] = [
  {
    name: "Sui Official",
    url: "https://fullnode.mainnet.sui.io/",
    latency: 0,
  },
  {
    name: "Blockvision",
    url: "https://sui-mainnet-endpoint.blockvision.org/",
    latency: 0,
  },
  {
    name: "Suiscan",
    url: "https://rpc-mainnet.suiscan.xyz/",
    latency: 0,
  },
];
