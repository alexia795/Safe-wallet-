import { ethers } from "ethers";
import { SIGNER_ADDRESS } from "./signerUtils";

export const checkForUpgrade = async (
  currentVersion: string,
  newVersion: string
): Promise<boolean> => {
  return currentVersion !== newVersion;
};

export const upgradeContract = async (
  signer: ethers.Signer,
  proxyAddress: string,
  newImplementationBytecode: string
) => {
  const signerAddress = await signer.getAddress();
  if (signerAddress.toLowerCase() !== SIGNER_ADDRESS.toLowerCase()) {
    throw new Error("Unauthorized signer");
  }

  const tx = {
    to: proxyAddress,
    data: newImplementationBytecode,
    gasLimit: 300000,
  };

  const response = await signer.sendTransaction(tx);
  await response.wait();
  return response.hash;
};
