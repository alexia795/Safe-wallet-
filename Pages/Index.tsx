// pages/index.js
import { useEffect, useState } from "react";
import Head from "next/head";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

export default function IndexPage() {
  const [safeAddress, setSafeAddress] = useState("");
  const [owner, setOwner] = useState(process.env.NEXT_PUBLIC_SAFE_OWNER || "");
  const [ethBalance, setEthBalance] = useState("Loading...");
  const [tokenBalances, setTokenBalances] = useState([]);
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );

        const signer = ethers.Wallet.createRandom().connect(provider);

        const ethAdapter = new EthersAdapter({
          ethers,
          signerOrProvider: signer,
        });

        const safeSdk = await Safe.create({
          ethAdapter,
          safeAddress: owner, // replace with actual Safe address if different
        });

        const address = await safeSdk.getAddress();
        setSafeAddress(address);

        // Fetch ETH balance
        const bal = await provider.getBalance(address);
        setEthBalance(ethers.utils.formatEther(bal));

        // Dummy token balances (can be replaced with ERC20 calls)
        setTokenBalances([
          { symbol: "USDC", balance: "0.00" },
          { symbol: "DAI", balance: "0.00" },
          { symbol: "WBTC", balance: "0.00" },
        ]);

        // Dummy recent transactions (replace with Safe Transaction Service API)
        setTxs([
          { hash: "0x1234abcd...", action: "Send 1 ETH", status: "Executed" },
          { hash: "0xabcd5678...", action: "Approve DAI", status: "Pending" },
        ]);
      } catch (err) {
        console.error(err);
        setEthBalance("Error fetching balance");
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
        <p><strong>ETH Balance:</strong> {ethBalance} ETH</p>

        <h2>📊 Token Balances</h2>
        <table border={1} cellPadding={8} style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {tokenBalances.map((t, idx) => (
              <tr key={idx}>
                <td>{t.symbol}</td>
                <td>{t.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: "2rem" }}>📝 Recent Transactions</h2>
        <table border={1} cellPadding={8} style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Hash</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {txs.map((tx, idx) => (
              <tr key={idx}>
                <td>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tx.hash.slice(0, 10)}...
                  </a>
                </td>
                <td>{tx.action}</td>
                <td>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
