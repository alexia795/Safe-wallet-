// pages/index.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Dashboard from "../components/Dashboard";
import SyncPanel from "../components/SyncPanel";
import AddressBook from "../components/AddressBook";
import SettingsPanel from "../components/SettingsPanel";
import WithdrawPanel from "../components/WithdrawPanel";
import { setupSafe } from "../utils/safeSetup";
import { addLog } from "../utils/auditLog";
import { authenticateUser } from "../utils/auth";
import { getProvider } from "../utils/chains";

export default function Home() {
  const [signer, setSigner] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
      } else {
        alert("Please install MetaMask");
      }
    };

    connectWallet();
  }, []);

  useEffect(() => {
    const secureLogin = async () => {
      try {
        await authenticateUser();
        console.log("User authenticated");
      } catch (err) {
        console.error("Auth error:", err.message);
      }
    };

    secureLogin();
  }, []);

  useEffect(() => {
    const initSafe = async () => {
      if (signer) {
        const safeAccount = await setupSafe(signer);
        addLog("Safe Created", `Address: ${safeAccount.getAddress()}`);
        console.log("Safe wallet deployed:", safeAccount.getAddress());
      }
    };

    initSafe();
  }, [signer]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Safe Wallet Dashboard</h1>
      {signer ? (
        <>
          <Dashboard signer={signer} />
          <SyncPanel signer={signer} />
          <AddressBook setContacts={setContacts} />
          <SettingsPanel />
          <WithdrawPanel signer={signer} contacts={contacts} />
        </>
      ) : (
        <p>Connecting wallet...</p>
      )}
    </div>
  );
}
