import { RpcNode } from "../type";

export const RPC_TESTNET_NODES: RpcNode[] = [
  {
    name: "Sui Official",
    url: "https://fullnode.testnet.sui.io/",
    latency: 0,
  },
  {
    name: "Blockvision",
    url: "https://sui-testnet-endpoint.blockvision.org/",
    latency: 0,
  },
  {
    name: "Suiscan",
    url: "https://rpc-testnet.suiscan.xyz/",
    latency: 0,
  },
];

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
