# 🚀 Mintara Deployment Guide (Updated)

**Complete guide to deploy Mintara on GitHub + Netlify**

---

## 📦 What You're Deploying

✅ **Mintara v2.0.0** - No-Code Token Builder  
✅ **Base Network** - Chain ID: 8453  
✅ **Fee System** - 1 USDC per operation (FREE for Token Info & Revoke)  
✅ **Admin Wallet** - `0x59B16A1c411536241390484C4Da404b365336b45`  
✅ **8 Languages** - EN, TR, AR, FR, DE, ES, ZH, HI  
✅ **Multi-Lingual Routes** - `/en/`, `/tr/`, etc.  

---

## 🚀 Step 1: GitHub Setup

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `mintara`
3. Description: `No-Code Token Builder on Base Network - 1 USDC per operation`
4. **Public** or **Private** (your choice)
5. Do NOT initialize with README (we already have one)
6. Click **"Create repository"**

### 1.2 Push Your Code

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init

# Add all files
git add .

# Commit
git commit -m "🚀 Mintara v2.0.0 - Production Ready

✅ Token deployment & management on Base Network
✅ Fee system: 1 USDC per operation
✅ FREE: Token Info & Revoke Ownership
✅ Admin panel with real-time stats
✅ $MINTA reward system (100 per deploy, 50 per operation)
✅ Whitepaper v3.1
✅ 8-language support with SEO-optimized routing
✅ AI NFT Builder (0.3 USDC per mint)
✅ 100% production ready"

# Add remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/mintara.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Netlify Deployment

### 2.1 Login to Netlify

Go to https://app.netlify.com and login with your GitHub account

### 2.2 Import Project

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub
4. Select your **mintara** repository

### 2.3 Configure Build Settings

Netlify will auto-detect these settings (verify they're correct):

```
Build command:     npm run build
Publish directory: dist
```

**Click "Deploy site"**

### 2.4 Wait for Build

- First build takes 2-3 minutes
- Watch build logs in real-time
- ✅ Green checkmark = success!

Your site is now live at: `https://random-name-123.netlify.app`

---

## ✅ Step 3: Verify Deployment

### 3.1 Test All Pages

Visit these URLs:
- ✅ `/` - Landing page
- ✅ `/en/` - English version
- ✅ `/tr/` - Turkish version
- ✅ `/builder` - Token builder
- ✅ `/minta-token` - MINTA token info
- ✅ `/whitepaper` - Whitepaper v3.1
- ✅ `/ai-nft-builder` - AI NFT Builder

### 3.2 Test Token Deployment

1. Connect MetaMask
2. Switch to Base Mainnet (Chain ID: 8453)
3. Make sure you have 1 USDC + some ETH for gas
4. Deploy a test token
5. Verify:
   - ✅ 1 USDC fee collected by admin wallet
   - ✅ Token deployed on Base
   - ✅ Transaction on BaseScan
   - ✅ Token auto-added to wallet
   - ✅ Token in "My Deployed Tokens" list

### 3.3 Test All Operations

- ✅ **Deploy** (1 USDC) - Create token
- ✅ **Mint** (1 USDC) - Increase supply
- ✅ **Burn** (1 USDC) - Decrease supply
- ✅ **Multisend** (1 USDC) - Bulk distribution
- ✅ **Token Info** (FREE) - View details
- ✅ **Revoke Ownership** (FREE) - Make immutable

### 3.4 Admin Panel (If You're Admin)

If you're using admin wallet (`0x59B16...6b45`):
- ✅ Admin panel should be visible
- ✅ Stats showing correctly
- ✅ $MINTA Calculator working
- ✅ BaseScan Lookup functional

---

## 🌍 Step 4: Custom Domain (Optional)

### 4.1 Add Domain in Netlify

1. Go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain: `mintara.xyz`
4. Click **"Verify"**

### 4.2 Configure DNS

At your domain registrar (e.g., Namecheap, GoDaddy):

**For root domain (mintara.xyz):**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: your-site.netlify.app
TTL: 3600
```

### 4.3 Enable HTTPS

- Netlify automatically provisions SSL certificate
- Uses Let's Encrypt (free)
- Takes 5-10 minutes
- HTTPS redirect already configured in `netlify.toml`

---

## 🔄 Step 5: Continuous Deployment

### How It Works

Every time you push to `main` branch:
1. GitHub notifies Netlify
2. Netlify pulls latest code
3. Runs `npm run build`
4. Deploys to production
5. Site updates automatically (2-3 minutes)

### Making Updates

```bash
# Make changes to your code
vim components/SomeComponent.tsx

# Commit and push
git add .
git commit -m "Update: improved UI"
git push origin main

# Netlify automatically rebuilds and deploys!
```

---

## 🐛 Troubleshooting

### Build Failed?

**Check Node version:**
```bash
node --version  # Should be 18.x or higher
```

In Netlify dashboard:
1. Go to **Site settings** → **Build & deploy**
2. Set **Node version**: `18`
3. Redeploy

**Check build logs:**
- Click on failed deploy
- View full logs
- Look for error messages

### 404 Errors?

Make sure these files exist:
- ✅ `/netlify.toml` (redirects configured)
- ✅ `/public/robots.txt`
- ✅ `/public/sitemap.xml`

### Fee Not Working?

1. Check admin wallet address in code:
   - Should be `0x59B16A1c411536241390484C4Da404b365336b45`
2. Verify you have 1 USDC in your wallet
3. Check USDC contract address for Base Network
4. View transaction on BaseScan

---

## 📊 Fee Structure Summary

| Operation | Fee | Goes To | $MINTA Reward |
|-----------|-----|---------|---------------|
| Deploy Token | 1 USDC | Admin | 100 |
| Mint Tokens | 1 USDC | Admin | 50 |
| Burn Tokens | 1 USDC | Admin | 50 |
| Multisender | 1 USDC | Admin | 50 |
| **Token Info** | **FREE** | - | **0** |
| **Revoke Ownership** | **FREE** | - | **0** |
| AI NFT Mint | 0.3 USDC | Admin | TBD |

**Admin Wallet:** `0x59B16A1c411536241390484C4Da404b365336b45`

---

## 🔐 Security Checklist

✅ **HTTPS enabled** - Automatic via Netlify  
✅ **Security headers** - Configured in `netlify.toml`  
✅ **CSP configured** - Content Security Policy set  
✅ **No API keys needed** - Pure frontend + blockchain  
✅ **No environment variables** - All config in code  
✅ **Admin wallet hardcoded** - No risk of exposure  

---

## 📱 SEO & Social

### Already Configured:
✅ **Sitemap** - `/sitemap.xml` and `/sitemap.html`  
✅ **Robots.txt** - Search engine friendly  
✅ **Meta tags** - All pages optimized  
✅ **Schema.org** - Structured data for SEO  
✅ **Open Graph** - Social media previews  
✅ **Farcaster Frame** - Frame metadata ready  

### Submit To:
- Google Search Console
- Bing Webmaster Tools
- Base Network Showcase
- DeFi Llama

---

## 🎉 You're Live!

Your Mintara instance is now:

✅ Live on Netlify  
✅ Automatically deploying from GitHub  
✅ HTTPS enabled  
✅ All features working  
✅ Ready for production  
✅ Multi-lingual routing  
✅ SEO optimized  

**Next Steps:**
1. ✅ Test with real wallet
2. ✅ Deploy test token
3. ✅ Share on Twitter/Farcaster
4. ✅ Submit to Base showcase
5. ✅ Monitor admin panel

---

## 📞 Support

**Deployment Issues:**
- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://answers.netlify.com

**Mintara Issues:**
- GitHub Issues: (your repo)
- Twitter: @MintaraToken
- Email: support@mintara.xyz

---

<div align="center">

**🚀 MINTARA - LIVE ON BASE NETWORK! 🚀**

**Create Your Token on Base — No Code Needed**  
**1 USDC per operation • FREE Token Info & Revoke**

[Website](https://mintara.xyz) • [Twitter](https://twitter.com/MintaraToken) • [GitHub](https://github.com/yourusername/mintara)

</div>
