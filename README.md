# Safe Wallet Pro

Safe Wallet Pro is an advanced multi-signature digital wallet for managing crypto assets with enterprise-grade security.

## 🔐 Features

- Auto-approve transactions
- Contract sync and upgrade logic
- Address book integration
- Withdrawal flow with signer verification
- Dashboard with wallet balance
- Settings panel for gas limits and preferences

## 🚀 Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Launches the app locally |
| `npm run build` | Builds the app for production |
| `npm test` | Runs tests |
| `npm run eject` | Ejects from Create React App (optional) |

## 📦 Deployment

Use [Vercel](https://vercel.com) for fast deployment. Add a `vercel.json` file with:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
