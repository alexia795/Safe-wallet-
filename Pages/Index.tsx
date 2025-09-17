// pages/index.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

const IndexPage = () => {
  const [safeAddress, setSafeAddress] = useState<string>("");
  const [owner, setOwner] = useState<string>(
    process.env.NEXT_PUBLIC_SAFE_OWNER || ""
  );
  const [balance, setBalance] = useState<string>("Loading...");

  useEffect(() => {
    const init = async () => {
      try {
        // Setup provider with your Alchemy RPC
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );

        // Example signer (read-only with random wallet here)
        const signer = ethers.Wallet.createRandom().connect(provider);

        const ethAdapter = new EthersAdapter({
          ethers,
          signerOrProvider: signer,
        });

        // Attach Safe instance
        const safeSdk = await Safe.create({
          ethAdapter,
          safeAddress: owner, // Using your owner address (can swap to Safe address if needed)
        });

        const address = await safeSdk.getAddress();
        setSafeAddress(address);

        // Fetch ETH balance
        const bal = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(bal));
      } catch (err) {
        console.error(err);
        setBalance("Error fetching balance");
      }
    };

    init();
  }, [owner]);

  return (
    <>
      <Head>
        <title>Safe Wallet Pro</title>
      </Head>
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>🚀 Safe Wallet Pro</h1>
        <p><strong>Network:</strong> {process.env.NEXT_PUBLIC_NETWORK}</p>
        <p><strong>Owner Address:</strong> {owner}</p>
        <p><strong>Safe Address:</strong> {safeAddress}</p>
        <p><strong>ETH Balance:</strong> {balance} ETH</p>
      </main>
    </>
  );
};

export default IndexPage;
