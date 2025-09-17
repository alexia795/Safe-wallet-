import { useEffect, useState } from 'react';
import SafeAppsSDK from '@safe-global/safe-apps-sdk';

const sdk = new SafeAppsSDK();

export default function AdminDashboard() {
  const [safeInfo, setSafeInfo] = useState(null);

  useEffect(() => {
    sdk.getSafeInfo().then(info => {
      setSafeInfo(info);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {safeInfo ? (
        <div className="space-y-2">
          <p><strong>Safe Address:</strong> {safeInfo.safeAddress}</p>
          <p><strong>Chain ID:</strong> {safeInfo.chainId}</p>
        </div>
      ) : (
        <p>Loading Safe info...</p>
      )}

      {/* Signer Management */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Signer Management</h2>
        {/* SignerManager component */}
      </div>

      {/* Verified Withdrawal Flow */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Withdrawal Controls</h2>
        {/* WithdrawalFlow component */}
      </div>

      {/* Analytics */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Analytics</h2>
        {/* Analytics component */}
      </div>
    </div>
  );
}
