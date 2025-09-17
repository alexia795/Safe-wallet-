import { useEffect, useState } from "react";
import { ethers } from "ethers";

interface IndexProps {
  safeInfo: any;
  provider: ethers.BrowserProvider | ethers.JsonRpcProvider | null;
}

export default function Home({ safeInfo, provider }: IndexProps) {
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const loadBalance = async () => {
      if (provider && safeInfo?.safeAddress) {
        try {
          const rawBalance = await provider.getBalance(safeInfo.safeAddress);
          setBalance(ethers.formatEther(rawBalance));
        } catch (err) {
          console.error("Failed to load balance", err);
        }
      }
    };
    loadBalance();
  }, [provider, safeInfo]);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 Safe Wallet Pro</h1>
      {safeInfo ? (
        <div>
          <p><strong>Safe Address:</strong> {safeInfo.safeAddress}</p>
          <p><strong>Chain ID:</strong> {safeInfo.chainId}</p>
          <p><strong>Safe Owners:</strong> {safeInfo.owners?.join(", ")}</p>
          <p><strong>Balance:</strong> {balance ? `${balance} ETH` : "Loading..."}</p>
        </div>
      ) : (
        <p>Not running inside Safe. Using fallback RPC provider.</p>
      )}
    </main>
  );
}
