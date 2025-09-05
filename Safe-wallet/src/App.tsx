import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SyncPanel from "./components/SyncPanel";

function App() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      if ((window as any).ethereum) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
      } else {
        alert("Please install MetaMask");
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Safe Wallet Dashboard</h1>
      {signer ? <SyncPanel signer={signer} /> : <p>Connecting wallet...</p>}
    </div>
  );
}

export default App;
