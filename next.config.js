/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Expose Safe-related environment variables to the client
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_SAFE_OWNER: process.env.NEXT_PUBLIC_SAFE_OWNER,
  },

  // Optimize builds
  swcMinify: true,

  // Allow external resources if you’re fetching Safe data, tokens, etc.
  images: {
    domains: [
      "safe.global",
      "assets.safe.global",
      "raw.githubusercontent.com"
    ]
  }
};

module.exports = nextConfig;
