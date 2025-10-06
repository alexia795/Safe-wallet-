import { useEffect, useState } from 'react';
import SafeAppsSDK from '@safe-global/safe-apps-sdk';

const sdk = new SafeAppsSDK();

export default function Dashboard() {
  const [safeInfo, setSafeInfo] = useState(null);

  useEffect(() => {
    sdk.getSafeInfo().then(info => {
      setSafeInfo(info);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {safeInfo ? (
        <div className="space-y-2">
