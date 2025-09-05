import React, { useState } from "react";

const SettingsPanel = () => {
  const [autoApprove, setAutoApprove] = useState(true);
  const [gasLimit, setGasLimit] = useState("300000");
  const [upgradeMode, setUpgradeMode] = useState("auto");

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Wallet Settings</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Auto-Approve Transactions</label>
        <select
          value={autoApprove ? "enabled" : "disabled"}
          onChange={(e) => setAutoApprove(e.target.value === "enabled")}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Gas Limit</label>
        <input
          type="text"
          value={gasLimit}
          onChange={(e) => setGasLimit(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Contract Upgrade Mode</label>
        <select
          value={upgradeMode}
          onChange={(e) => setUpgradeMode(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="auto">Auto Upgrade</option>
          <option value="manual">Manual Upgrade</option>
        </select>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Note:</strong> These settings will apply to all contract interactions and deployments.</p>
      </div>
    </div>
  );
};

export default SettingsPanel;
