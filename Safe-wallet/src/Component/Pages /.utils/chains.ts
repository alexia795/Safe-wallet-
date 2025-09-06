import { ethers } from "ethers";

export const getProvider = (chain: string) => {
  const rpcMap: Record<string, string> = {
    ethereum: "https://mainnet.infura.io/v3/XuPZE3fUgxJ2AwDHYiSLzBVscOVcg9dy",
    polygon: "https://polygon-rpc.com",
    bsc: "https://bsc-dataseed.binance.org",
  };

  const rpcUrl = rpcMap[chain];
  if (!rpcUrl) throw new Error("Unsupported chain");

  return new ethers.providers.JsonRpcProvider(rpcUrl);
};
