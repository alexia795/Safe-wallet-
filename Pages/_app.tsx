import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import SafeAppsSDK, { SafeInfo } from "@safe-global/safe-apps-sdk";
import SafeAppsProvider from "@safe-global/safe-apps-provider";
import { ethers } from "ethers";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [safeInfo, setSafeInfo] = useState<SafeInfo | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Initialize Safe SDK
        const appsSdk = new SafeAppsSDK();
        const info = await appsSdk.safe.getInfo();
        setSafeInfo(info);

        // Wrap Safe Apps Provider with ethers.js
        const safeProvider = new SafeAppsProvider(info, appsSdk);
        const ethersProvider = new ethers.BrowserProvider(safeProvider as any);
        setProvider(ethersProvider);
      } catch (err) {
        console.error("Not running inside Safe app, falling back to RPC", err);

        // Fallback provider using your RPC
        const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;
        const fallbackProvider = new ethers.JsonRpcProvider(rpcUrl);
        setProvider(fallbackProvider as any);
      }
    };

    init();
  }, []);

  return (
    <Component
      {...pageProps}
      safeInfo={safeInfo}
      provider={provider}
    />
  );
}
