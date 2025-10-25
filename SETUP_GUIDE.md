# DeGreenSci Setup Guide

Complete guide for setting up and deploying the DeGreenSci platform.

## Prerequisites

### 1. Install Required Software

- **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/)
- **Sui Wallet**: Install browser extension from [Chrome Web Store](https://chromewebstore.google.com/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)

### 2. Get Testnet Tokens

1. Install Sui Wallet browser extension
2. Create a new wallet (save your recovery phrase securely!)
3. Copy your wallet address
4. Join [Sui Discord](https://discord.gg/sui)
5. Go to `#testnet-faucet` channel
6. Type: `!faucet <YOUR_WALLET_ADDRESS>`
7. Wait for confirmation (you should receive SUI tokens)

## Initial Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd degreensci

# Install dependencies
npm install
```

### Step 2: Deploy Smart Contract (First Time Only)

If you haven't deployed the contract yet, you need to:

1. Install Sui CLI:
   ```bash
   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
   ```

2. Initialize Sui project and deploy:
   ```bash
   sui client publish --gas-budget 100000000
   ```

3. Save the following from the output:
   - **Package ID**: The contract package ID (starts with `0x...`)
   - **NFTRegistry Object ID**: The shared object ID for NFTRegistry

### Step 3: Configure Environment

Create `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your contract details:

```env
# Your deployed contract package ID
VITE_PACKAGE_ID=0xb1aa5cf72d7c9e7e237c2ddcd785ceb7aacbef4229ee712ec05f9afb188b0ab9

# Module name (usually 'degreensci')
VITE_MODULE_NAME=degreensci

# IMPORTANT: NFTRegistry shared object ID from deployment
VITE_NFT_REGISTRY=<PASTE_YOUR_REGISTRY_OBJECT_ID_HERE>

# Network (testnet or mainnet)
VITE_SUI_NETWORK=testnet

# Walrus endpoints (testnet)
VITE_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
VITE_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
```

**Critical**: Without `VITE_NFT_REGISTRY`, the minting functionality won't work!

### Step 4: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:8080`

## Testing the Platform

### Test Flow

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Approve connection in wallet popup
   - Your address should appear in the navbar

2. **Upload File**
   - Go to Upload page
   - Drag and drop a PDF, JSON, CSV, or image file
   - Add metadata description
   - Click "Upload to Walrus"
   - Wait for upload confirmation (you'll get a Walrus CID)

3. **Mint NFT**
   - After successful upload, click "Verify & Mint Data NFT on Sui"
   - Approve transaction in wallet
   - Wait for confirmation
   - You should see a success toast

4. **View Dashboard**
   - Go to Dashboard page
   - See your minted NFTs
   - View CIDs and metadata
   - Check accumulated royalties

## Common Issues & Solutions

### Issue: "NFT Registry not configured" error

**Solution**: Make sure you set `VITE_NFT_REGISTRY` in your `.env` file with the correct object ID from deployment.

### Issue: Wallet won't connect

**Solutions**:
- Refresh the page
- Make sure wallet extension is installed and unlocked
- Try disconnecting and reconnecting
- Clear browser cache

### Issue: Upload to Walrus fails

**Solutions**:
- Check your internet connection
- Verify Walrus testnet is operational
- Try uploading a smaller file first
- Check browser console for detailed errors

### Issue: Transaction fails

**Solutions**:
- Ensure you have enough SUI tokens for gas
- Verify contract address is correct
- Check that the CID doesn't already exist
- Look at transaction details in Sui Explorer

### Issue: Build errors

**Solutions**:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

## Production Deployment

### Step 1: Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Step 2: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file

### Alternative: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Configure environment variables in Netlify dashboard

## Mainnet Deployment

When ready for mainnet:

1. **Deploy contract to mainnet**:
   ```bash
   sui client publish --gas-budget 100000000
   ```

2. **Update environment variables**:
   ```env
   VITE_SUI_NETWORK=mainnet
   VITE_PACKAGE_ID=<NEW_MAINNET_PACKAGE_ID>
   VITE_NFT_REGISTRY=<NEW_MAINNET_REGISTRY_ID>
   VITE_WALRUS_PUBLISHER_URL=https://publisher.walrus.space
   VITE_WALRUS_AGGREGATOR_URL=https://aggregator.walrus.space
   ```

3. **Rebuild and redeploy**:
   ```bash
   npm run build
   vercel --prod
   ```

## Monitoring & Analytics

### Check Contract Events

Use Sui Explorer to monitor:
- DataNFTMinted events
- RoyaltyClaimed events
- Total minted NFTs

### View Transactions

Go to [Sui Testnet Explorer](https://suiexplorer.com/?network=testnet) and search:
- Your wallet address
- Contract package ID
- Transaction digests

## Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Use environment variables in CI/CD

2. **Verify transactions**
   - Always check transaction details before approving
   - Verify contract addresses

3. **Test thoroughly**
   - Test all features on testnet first
   - Try edge cases (large files, duplicate CIDs, etc.)

4. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

## Getting Help

- **Documentation**: [Sui Docs](https://docs.sui.io/)
- **Discord**: [Sui Discord](https://discord.gg/sui)
- **GitHub Issues**: Report bugs in the repository
- **Stack Overflow**: Tag questions with `sui` and `blockchain`

## Next Steps

After successful setup:

1. ✅ Customize branding (logos, colors)
2. ✅ Add more metadata fields
3. ✅ Implement royalty claiming UI
4. ✅ Add search and filter to dashboard
5. ✅ Integrate with IPFS as backup storage
6. ✅ Add email notifications
7. ✅ Implement batch minting

---

**Need more help?** Contact the DevPros team or check the main README.md
