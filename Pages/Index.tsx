import { useEffect, useState } from 'react';
import SafeAppsSDK from '@safe-global/safe-apps-sdk';

const sdk = new SafeAppsSDK();

export default function Home() {
  const [safeInfo, setSafeInfo] = useState(null);

  useEffect(() => {
    sdk.getSafeInfo().then(info => {
      console.log("Safe Info:", info);
      setSafeInfo(info);
    });
  }, []);

  return (
    <div>
      <h1>Safe Wallet Pro</h1>
      {safeInfo ? (
        <div>
          <p><strong>Safe Address:</strong> {safeInfo.safeAddress}</p>
          <p><strong>Chain ID:</strong> {safeInfo.chainId}</p>
        </div>
      ) : (
        <p>Loading Safe info...</p>
      )}
    </div>
  );
}
