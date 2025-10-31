# 🚀 Mintara - No-Code Token Builder on Base Network

**Create Your Token on Base — No Code Needed**

[![Website](https://img.shields.io/badge/Website-mintara.xyz-0052FF)](https://mintara.xyz)
[![Version](https://img.shields.io/badge/Version-2.0.0_Production-0052FF)](https://mintara.xyz)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Base Network](https://img.shields.io/badge/Chain-Base_Mainnet-0052FF)](https://base.org)
[![Fee](https://img.shields.io/badge/Fee-1_USDC-00D1FF)](https://mintara.xyz)
[![Twitter](https://img.shields.io/badge/Twitter-@MintaraToken-1DA1F2)](https://twitter.com/MintaraToken)

---

## 🎯 What is Mintara?

Mintara is the **easiest way to create and manage ERC-20 tokens on Base Network** without writing a single line of code. Deploy professional-grade smart contracts in seconds, manage your token lifecycle, and earn **$MINTA rewards** for every operation.

### 🌟 Key Features

- ✅ **No-Code Token Creation** - Deploy ERC-20 tokens on Base in seconds
- ✅ **Ultra-Low Fees** - Only 1 USDC per paid operation
- ✅ **2 Free Operations** - Token Info & Revoke Ownership (completely free)
- ✅ **Full Token Management** - Mint, Burn, Update Metadata, Multisender
- ✅ **$MINTA Rewards** - Earn 100 $MINTA per deploy, 50 per operation
- ✅ **12+ Wallet Support** - MetaMask, Coinbase, Rainbow, WalletConnect, and more
- ✅ **8 Languages** - EN, TR, AR, FR, DE, ES, ZH, HI
- ✅ **Real-Time Stats** - Track tokens created, transactions, and active users
- ✅ **Admin Panel** - For admin wallet with analytics and BaseScan lookup

---

## 🔧 Token Management Tools

### 1. 🚀 **Token Deploy** (Fee: 1 USDC)
- Deploy custom ERC-20 tokens on Base Network (Chain ID: 8453)
- Set name, symbol, decimals, initial supply, and logo
- Auto-add to wallet (MetaMask/Coinbase)
- BaseScan verification ready
- **Reward: 100 $MINTA**

### 2. 🪙 **Mint Tokens** (Fee: 1 USDC)
- Increase token supply
- Owner-only operation
- Send minted tokens to any address
- **Reward: 50 $MINTA**

### 3. 🔥 **Burn Tokens** (Fee: 1 USDC)
- Permanently remove tokens from circulation
- Updates burned amount tracker
- Decreases total supply
- **Reward: 50 $MINTA**

### 4. 🎨 **Update Metadata** (Fee: 1 USDC)
- Change token name, symbol, or logo
- Owner-only operation
- Updates in all wallets
- **Reward: 50 $MINTA**

### 5. 📤 **Multisender** (Fee: 1 USDC)
- Send tokens to multiple addresses in one transaction
- Save on gas fees
- Perfect for airdrops
- **Reward: 50 $MINTA**

### 6. 📊 **Token Info** (FREE!)
- View token details: name, symbol, decimals
- Check total supply and burned amount
- See owner address
- No wallet connection required
- **Reward: 0 $MINTA**

### 7. 🛡️ **Revoke Ownership** (FREE!)
- Make token immutable (cannot mint/burn anymore)
- Irreversible operation
- Increases trust
- **Reward: 0 $MINTA**

---

## 💰 Fee Structure

All **paid operations** charge **1 USDC** and send **100% of fees** to admin wallet:

```
Admin Wallet: 0x59B16A1c411536241390484C4Da404b365336b45
```

| Operation | Fee | Reward | Description |
|-----------|-----|--------|-------------|
| Token Deploy | 1 USDC | 100 $MINTA | Deploy new ERC-20 token |
| Mint Tokens | 1 USDC | 50 $MINTA | Increase supply |
| Burn Tokens | 1 USDC | 50 $MINTA | Decrease supply |
| Update Metadata | 1 USDC | 50 $MINTA | Change name/symbol/logo |
| Multisender | 1 USDC | 50 $MINTA | Bulk token distribution |
| **Token Info** | **FREE** | **0 $MINTA** | View token details |
| **Revoke Ownership** | **FREE** | **0 $MINTA** | Make token immutable |

---

## 🪙 $MINTA Token Airdrop

Earn **$MINTA tokens** for every operation on Mintara:

### Reward Tiers

🥉 **Token Deploy** - 100 $MINTA per deployment  
🥈 **Paid Operations** - 50 $MINTA each (Mint, Burn, Update, Multisender)  
🥇 **Free Operations** - 0 $MINTA (Token Info, Revoke Ownership)

### Airdrop Details
- **Total Supply:** 100,000,000 $MINTA
- **Airdrop Allocation:** 25% (25,000,000 $MINTA)
- **Distribution:** Q1 2026 (Manual based on on-chain activity)
- **Tracking:** All operations logged in admin panel

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Blockchain:** ethers.js v6 (Base Network integration)
- **UI:** Tailwind CSS + shadcn/ui components
- **Routing:** React Router v6
- **State:** React hooks (useState, useCallback, useEffect)
- **Storage:** localStorage for deployed tokens & transaction history
- **i18n:** Custom translation system (8 languages)
- **SEO:** React Helmet + Schema.org structured data
- **Deployment:** Netlify (with _headers & _redirects)

---

## 📦 Installation & Development

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Base Mainnet ETH for testing

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/mintara.git
cd mintara

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Environment Setup

No `.env` file needed! All configuration is in:
- `/config/networks.ts` - Network configurations
- `/hooks/useBlockchain.ts` - Smart contract logic

---

## 🚀 Deployment

### Automated Deployment

```bash
chmod +x DEPLOY_PRODUCTION.sh
./DEPLOY_PRODUCTION.sh
```

### Manual Deployment

```bash
npm install
npm run build
netlify deploy --prod --dir=dist
```

### Post-Deployment Checklist

✅ Test token deployment on Base Mainnet  
✅ Verify fee transaction goes to admin wallet  
✅ Test all 7 operations (Deploy, Mint, Burn, Update, Revoke, Info, Multisender)  
✅ Check landing page stats update  
✅ Verify admin panel with admin wallet  
✅ Test whitepaper page (v3.1)  
✅ Test MINTA token page (updated rewards)  

---

## 🎨 Features in Detail

### Real-Time Stats
Landing page displays **real stats** from localStorage:
- **Tokens Created** - Total tokens deployed by all users
- **Transactions** - Total deployment count
- **Active Users** - Unique deployer wallet addresses

### Admin Panel
For admin wallet (`0x59B16A1c411536241390484C4Da404b365336b45`):
- Total deployed tokens count
- Total transactions count
- Unique deployers count
- Total fees collected
- $MINTA Airdrop Calculator
- BaseScan Transaction Lookup

### BaseScan Integration
- All transactions viewable on https://basescan.org
- Automatic contract verification (manual for now)
- Direct links to contracts and transactions

### Auto-Add to Wallet
After deploying a token:
- Automatically added to MetaMask/Coinbase Wallet
- Uses `wallet_watchAsset` RPC method
- Includes logo, decimals, symbol

---

## 📚 Documentation

- [Whitepaper v3.1](https://mintara.xyz/whitepaper) - Full technical documentation
- [MINTA Token Info](https://mintara.xyz/minta-token) - Reward system details
- [Airdrop Features](./AIRDROP_AND_BASESCAN_FEATURES.md) - Admin panel & airdrop guide

---

## 🌐 Live Application

- **Website:** https://mintara.xyz
- **Token Builder:** https://mintara.xyz/builder
- **MINTA Token:** https://mintara.xyz/minta-token
- **Whitepaper:** https://mintara.xyz/whitepaper
- **Twitter:** [@MintaraToken](https://twitter.com/MintaraToken)

---

## 🔐 Smart Contract

### BaseERC20 Features
- Standard ERC-20 implementation
- Minting capability (owner-only)
- Burning capability (owner-only)
- Ownership transfer & renouncement
- Metadata updates (name, symbol, logo)
- Event logging for all operations

### Contract Code
See `/contracts/BaseERC20.ts` for complete contract code including:
- Solidity source
- ABI (Application Binary Interface)
- Bytecode
- Constructor parameters

---

## 🌍 Supported Languages

- 🇬🇧 English (EN)
- 🇹🇷 Turkish (TR)
- 🇸🇦 Arabic (AR)
- 🇫🇷 French (FR)
- 🇩🇪 German (DE)
- 🇪🇸 Spanish (ES)
- 🇨🇳 Chinese (ZH)
- 🇮🇳 Hindi (HI)

---

## 💼 Supported Wallets

### Popular Wallets
- MetaMask
- Coinbase Wallet
- Rainbow
- Trust Wallet
- WalletConnect (v2)
- And 7+ more...

### Wallet Detection
Automatic detection for installed browser extension wallets with fallback to WalletConnect for mobile/other wallets.

---

## 📊 Project Structure

```
mintara/
├── components/          # React components
│   ├── JettonGenerator.tsx
│   ├── MintTokens.tsx
│   ├── BurnTokens.tsx
│   ├── UpdateMetadata.tsx
│   ├── RevokeOwnership.tsx
│   ├── TokenInfo.tsx
│   ├── Multisender.tsx
│   ├── AdminPanel.tsx
│   ├── DeployedTokensList.tsx
│   ├── TransactionHistory.tsx
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── BuilderPage.tsx
│   ├── MintaTokenPage.tsx
│   └── WhitepaperPage.tsx
├── hooks/              # Custom React hooks
│   ├── useBlockchain.ts  # Main blockchain logic
│   ├── useWallet.ts      # Wallet connection
│   ├── useLanguage.ts    # i18n
│   └── useStats.ts       # Stats tracking
├── config/
│   └── networks.ts     # Network configurations
├── contracts/
│   └── BaseERC20.ts    # Smart contract code
├── translations/
│   └── translations.ts # 8-language support
├── public/
│   ├── _headers        # Netlify security headers
│   ├── _redirects      # SPA routing
│   └── ...             # SEO files
└── DEPLOY_PRODUCTION.sh # Deployment script
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Wrong network" error**
- Make sure you're on Base Mainnet (Chain ID: 8453)
- Switch network in MetaMask: Settings → Networks → Add Base Mainnet

**2. "Insufficient funds" error**
- You need 1 USDC for paid operations
- Plus some ETH for gas fees (~$0.50)

**3. Token not showing in wallet**
- Click "Add to Wallet" button after deployment
- Or manually add: Settings → Import Tokens → Enter contract address

**4. Transaction failed**
- Check you have enough ETH for gas
- Verify you're the token owner (for mint/burn/update)
- Make sure ownership not revoked

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 📞 Contact & Support

- **Website:** https://mintara.xyz
- **Twitter:** [@MintaraToken](https://twitter.com/MintaraToken)
- **Email:** support@mintara.xyz
- **GitHub Issues:** For bug reports and feature requests

---

## 🙏 Acknowledgments

- **Base Network** - For the amazing L2 infrastructure
- **Coinbase** - For Base and Coinbase Wallet support
- **ethers.js** - For the excellent Web3 library
- **shadcn/ui** - For the beautiful UI components
- **Mintara Community** - For testing and feedback

---

## 📈 Roadmap

### Q4 2025 ✅
- [x] Beta Launch on Base Mainnet
- [x] Token deployment & management tools
- [x] 8-language support
- [x] Real-time stats tracking
- [x] Admin panel

### Q1 2026 🔜
- [ ] $MINTA Token Airdrop
- [ ] User growth campaign
- [ ] Enhanced analytics dashboard

### Q2 2026 🔮
- [ ] AI optimization module (gas tuning, safety checks)
- [ ] Automatic BaseScan verification
- [ ] Advanced token templates

### Q3 2026 🔮
- [ ] Mintara Dashboard (analytics for deployed tokens)
- [ ] Token portfolio tracking
- [ ] Cross-token analytics

### Q4 2026 🔮
- [ ] Staking & reward system for MINTA holders
- [ ] Governance features
- [ ] Community voting

### 2027+ 🔮
- [ ] Multi-chain expansion (Arbitrum, Optimism)
- [ ] DePIN integration
- [ ] IVO Launchpad

---

<div align="center">

**Built with ❤️ for the Base Network community**

[Website](https://mintara.xyz) • [Twitter](https://twitter.com/MintaraToken) • [Whitepaper](https://mintara.xyz/whitepaper)

</div>
