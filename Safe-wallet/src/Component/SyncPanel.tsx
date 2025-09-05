import React, { useState } from "react";
import { loadContract } from "../utils/contractLoader";
import { isSignerAuthorized } from "../utils/signerUtils";
import { ethers } from "ethers";

const SyncPanel = ({ signer }: { signer: ethers.Signer }) => {
  const [contractInfo, setContractInfo] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const contract = await loadContract(file);
    setContractInfo(contract);
  };

  const deployContract = async () => {
    const signerAddress = await signer.getAddress();
    if (!isSignerAuthorized(signerAddress)) {
      alert("Unauthorized signer");
      return;
    }

    const factory = new ethers.ContractFactory(
      contractInfo.abi,
      contractInfo.bytecode,
      signer
    );

    const contract = await factory.deploy();
    await contract.deployed();
    alert(`Contract deployed at: ${contract.address}`);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Sync Smart Contract</h2>
      <input type="file" accept=".json" onChange={handleUpload} />
      {contractInfo && (
        <div className="mt-4">
          <p><strong>Name:</strong> {contractInfo.name}</p>
          <p><strong>Version:</strong> {contractInfo.version}</p>
          <button
            onClick={deployContract}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Deploy Contract
          </button>
        </div>
      )}
    </div>
  );
};

export default SyncPanel;
