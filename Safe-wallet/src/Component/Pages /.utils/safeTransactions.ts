import Safe from "@safe-global/safe-core-sdk";
import { ethers } from "ethers";

export const sendSafeTransaction = async (
  safe: Safe,
  to: string,
  value: string,
  data: string = "0x"
) => {
  const safeTransactionData = {
    to,
    value,
    data,
    operation: 0, // CALL
  };

  const safeTransaction = await safe.createTransaction({ safeTransactionData });
  const txHash = await safe.getTransactionHash(safeTransaction);
  const signerSignature = await safe.signTransaction(safeTransaction);

  const executeTxResponse = await safe.executeTransaction(safeTransaction);
  await executeTxResponse.transactionResponse?.wait();

  return txHash;
};
