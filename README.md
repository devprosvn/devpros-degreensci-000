# DeGreenSci - Decentralized Science Platform

A production-ready DeSci platform built on Sui blockchain, enabling researchers to mint, verify, and display Dynamic Data NFTs using real on-chain logic.

## 🌟 Features

- **Real Sui Blockchain Integration**: Connect to Sui Testnet with live RPC endpoints
- **Walrus Storage**: Decentralized file storage for research data
- **Dynamic Data NFTs**: Mint NFTs with metadata and royalty tracking
- **Wallet Support**: Multi-wallet support (Sui Wallet, Slush Wallet, Ethos Wallet)
- **Dashboard**: View all your minted NFTs and track royalties
- **Responsive Design**: Beautiful, scientific-themed UI with blue/green color scheme

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- A Sui wallet browser extension (Sui Wallet, Slush Wallet, or Ethos Wallet)
- Some SUI testnet tokens (get from [Sui Testnet Faucet](https://discord.com/channels/916379725201563759/971488439931392130))

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy the example environment file and configure:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your contract details:
   ```env
   VITE_PACKAGE_ID=0xb1aa5cf72d7c9e7e237c2ddcd785ceb7aacbef4229ee712ec05f9afb188b0ab9
   VITE_MODULE_NAME=degreensci
   VITE_NFT_REGISTRY=<YOUR_NFT_REGISTRY_OBJECT_ID>
   VITE_SUI_NETWORK=testnet
   VITE_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
   VITE_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
   ```

   **Important**: You must set `VITE_NFT_REGISTRY` to your deployed NFTRegistry shared object ID.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8080`

## 📋 Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the navbar
- Select your installed wallet extension
- Approve the connection request

### 2. Upload & Mint Data NFT
- Navigate to the Upload page
- Drag and drop your research file (PDF, JSON, CSV, or images)
- Add metadata description (title, abstract, methods, findings)
- Click "Upload to Walrus" to store your file
- Click "Verify & Mint Data NFT on Sui" to mint your NFT

### 3. View Your NFTs
- Navigate to the Dashboard
- View all your minted Data NFTs
- Track accumulated royalties
- Access files via Walrus CID

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # NFT dashboard with royalty tracking
│   ├── Footer.tsx             # Footer with logos
│   ├── Navbar.tsx             # Navigation with wallet connection
│   ├── UploadForm.tsx         # File upload to Walrus
│   ├── VerifyMintButton.tsx   # Mint NFT on Sui
│   └── WalletConnectButton.tsx # Wallet connection UI
├── config/
│   ├── abi.json               # Contract ABI
│   ├── contract.ts            # Contract configuration
│   └── env.ts                 # Environment variables
├── hooks/
│   └── useSuiClient.ts        # Sui client hook
├── pages/
│   ├── Upload.tsx             # Upload page
│   ├── DashboardPage.tsx      # Dashboard page
│   └── NotFound.tsx           # 404 page
├── assets/
│   ├── logo-degreensci.png    # Project logo
│   └── logo-devpros.png       # Team logo
└── App.tsx                    # Main app with routing
```

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + shadcn/ui components
- **Blockchain**: Sui blockchain (@mysten/sui, @mysten/dapp-kit)
- **Storage**: Walrus decentralized storage
- **State Management**: TanStack Query

## 📝 Contract Functions

The smart contract (`degreensci` module) provides:

- `mint_data_nft`: Mint a new Data NFT with Walrus CID and metadata
- `get_owner_nfts`: Get all NFT CIDs owned by an address
- `claim_royalty`: Claim accumulated royalties for an NFT
- `add_royalty`: Add royalty to an NFT
- `total_minted`: Get total number of minted NFTs
- `cid_exists`: Check if a CID already exists

## 🎨 Design System

The platform uses a scientific-themed design with:

- **Primary Blue**: `#4da2ff` - Main brand color
- **Secondary Blue**: `#6fbcf0` - Accent color
- **Green Accent**: `#7ba565` - Science/nature theme
- **Navy**: `#2c4a5c` - Professional depth
- **Background**: `#f7f7f7` - Clean, light background

All colors are defined as semantic tokens in `src/index.css` using HSL format.

## 🔐 Security Notes

- Never commit your `.env` file
- Always verify contract addresses before transactions
- Test thoroughly on testnet before mainnet deployment
- Keep your wallet seed phrase secure

## 🚢 Deployment

To deploy your app:

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `dist` folder contains your production-ready app

3. Deploy to your preferred hosting (Vercel, Netlify, etc.)

## 📚 Additional Resources

- [Sui Documentation](https://docs.sui.io/)
- [Walrus Storage](https://docs.walrus.site/)
- [@mysten/dapp-kit Guide](https://sdk.mystenlabs.com/dapp-kit)
- [DeGreenSci Project Page](https://lovable.dev/projects/d4482a13-4f14-4103-bb64-17dfc020f659)

## 👥 Team

**DevPros** - Building the future of decentralized science

## 📄 License

MIT License - feel free to use this project as a template for your own DeSci applications!

---

Built with ❤️ for the decentralized science community
