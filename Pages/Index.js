import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppKitProvider } from '@reown/appkit';

const metadata = {
  name: 'Safe Wallet Pro',
  url: 'https://appkit-lab.reown.com/library/multichain-all/',
  icons: ['https://appkit-lab.reown.com/library/multichain-all/logo.png'],
  redirect: {
    native: 'safewalletpro://',
    universal: 'https://appkit-lab.reown.com/library/multichain-all/',
    linkMode: true,
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppKitProvider
    projectId="8a81e704ed22e53debea9db88f91bfcb"
    metadata={metadata}
    options={{
      loginMethods: ['wallet'],
      theme: {
        colors: {
          primary: '#1e40af',
          background: '#f3f4f6',
          text: '#111827',
        },
        fontFamily: 'Inter, sans-serif',
      },
    }}
  >
    <App />
  </AppKitProvider>
);
