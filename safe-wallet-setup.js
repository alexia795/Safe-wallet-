import { ethers } from 'ethers';
import Safe, { SafeFactory } from '@safe-global/safe-core-sdk';
import EthersAdapter from '@safe-global/safe-ethers-lib';

async function setupSafe() {
  // 1. Connect to MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  // 2. Create Ethers Adapter
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  // 3. Connect to your existing Safe
  const safeAddress = "0xD73760435Eaea302Ce83eae00c0376c6811846d7";
  const safeSdk = await Safe.create({
    ethAdapter,
    safeAddress,
  });

  console.log("✅ Connected to Safe:", await safeSdk.getAddress());

  // 4. Prepare a transaction (sending 0.01 ETH)
  const transactionData = {
    to: "0xRecipientAddress", // Replace with actual recipient
    value: ethers.utils.parseEther("0.01").toString(),
    data: "0x",
  };

  // 5. Create the Safe transaction
  const safeTransaction = await safeSdk.createTransaction({
    safeTransactionData: transactionData,
  });

  // 6. Execute the transaction
  const txResponse = await safeSdk.executeTransaction(safeTransaction);
  console.log("🚀 Transaction submitted:", txResponse);
}
