import Safe, { SafeFactory } from "@safe-global/safe-core-sdk";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { ethers } from "ethers";

export const setupSafe = async (signer: ethers.Signer) => {
  const ethAdapter = new EthersAdapter({ ethers, signer });

  const safeFactory = await SafeFactory.create({ ethAdapter });

  const safeAccount = await safeFactory.deploySafe({
    safeAccountConfig: {
      owners: [await signer.getAddress()],
      threshold: 1,
    },
  });

  return safeAccount;
};
