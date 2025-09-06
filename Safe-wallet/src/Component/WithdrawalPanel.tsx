import React, { useState } from "react";
import { ethers } from "ethers";
import { SIGNER_ADDRESS } from "../utils/signerUtils";

type Contact = {
  name: string;
  address: string;
  tag?: string;
};

const WithdrawPanel = ({
  signer,
  contacts,
}: {
  signer: ethers.Signer;
  contacts: Contact[];
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const sendFunds = async () => {
    const signerAddress = await signer.getAddress();
    if (signerAddress.toLowerCase() !== SIGNER_ADDRESS.toLowerCase()) {
      alert("Unauthorized signer");
      return;
    }

    try {
      const tx = await signer.sendTransaction({
        to: selectedAddress,
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      setTxHash(tx.hash);
    } catch (err) {
      alert("Transaction failed");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Withdraw Funds</h2>

      <label className="block mb-2 font-medium">Recipient</label>
      <select
        className="border rounded px-3 py-2 w-full mb-4"
        value={selectedAddress}
        onChange={(e) =>
