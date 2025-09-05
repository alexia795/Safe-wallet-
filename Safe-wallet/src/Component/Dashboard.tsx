import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const Dashboard = ({ signer }: { signer: ethers.Signer }) => {
  const [balance, setBalance] = useState<string>("0");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      const addr = await signer.getAddress();
      const provider = signer.provider;
      const bal = await provider?.getBalance(addr);
      setAddress(addr);
      setBalance(ethers.utils.formatEther(bal || 0));
    };

    fetchBalance();
  }, [signer]);

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Wallet Dashboard</h2>
      <p><strong>Signer Address:</strong> {address}</p>
      <p><strong>Balance:</strong> {balance} ETH</p>

      <div className="mt-4 text-sm text-gray-600">
        <p>More features coming soon: contract status, transaction history, and alerts.</p>
      </div>
    </div>
  );
};

export default Dashboard;
