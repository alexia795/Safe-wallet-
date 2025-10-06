// pages/_app.js
import { AppKitProvider } from '@reown/appkit';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/globals.css'; // Adjust if needed

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

function MyApp({ Component, pageProps }) {
  return (
    <AppKitProvider
      projectId="8a81e704ed22e53debea9db88f91bfcb"
      metadata={metadata}
      options={{ loginMethods: ['wallet', 'email', 'google'] }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <Component {...pageProps} />
    </AppKitProvider>
  );
}

export default MyApp;
