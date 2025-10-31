# 🚀 GitHub + Netlify Setup Guide

Quick guide to push Mintara to GitHub and deploy on Netlify.

---

## 📦 Step 1: Prepare Repository

### 1.1 Initialize Git (if not already)
```bash
git init
```

### 1.2 Check Status
```bash
git status
```

You should see:
- ✅ Modified files in red
- ✅ Untracked files in red
- ✅ `.gitignore` preventing `node_modules/`, `dist/`, `supabase/`, etc.

---

## 📤 Step 2: Commit & Push to GitHub

### 2.1 Add All Files
```bash
git add .
```

### 2.2 Commit
```bash
git commit -m "Mintara v2.0.0 - Production Ready

- Token deployment & management on Base Network
- 7 operations: Deploy, Mint, Burn, Update, Revoke, Info, Multisender
- Admin panel with real-time stats
- $MINTA reward system
- Whitepaper v3.1
- 8-language support
- 100% production ready"
```

### 2.3 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `mintara`
3. Description: `No-Code Token Builder on Base Network`
4. Public or Private: **Public** (recommended)
5. Do NOT initialize with README (we already have one)
6. Click **"Create repository"**

### 2.4 Add Remote & Push
```bash
# Replace 'yourusername' with your GitHub username
git remote add origin https://github.com/yourusername/mintara.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy on Netlify

### 3.1 Login to Netlify
Go to https://app.netlify.com and login with GitHub

### 3.2 Import Project
1. Click **"Add new site"**
2. Click **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select your **mintara** repository

### 3.3 Configure Build Settings

Netlify will auto-detect settings, verify they are:

```
Build command:    npm run build
Publish directory: dist
```

**Click "Deploy site"**

### 3.4 Wait for Build
- First build takes 2-3 minutes
- Watch build logs in real-time
- Green checkmark = success! ✅

---

## ✅ Step 4: Verify Deployment

### 4.1 Check Site URL
Netlify gives you a URL like:
```
https://fantastic-unicorn-123456.netlify.app
```

### 4.2 Test Pages
Visit:
- ✅ `/` - Landing page
- ✅ `/builder` - Token builder
- ✅ `/minta-token` - MINTA page
- ✅ `/whitepaper` - Whitepaper v3.1

### 4.3 Test Token Deployment
1. Connect MetaMask
2. Switch to Base Mainnet
3. Deploy a test token
4. Verify fee goes to admin wallet

---

## 🌍 Step 5: Add Custom Domain (Optional)

### 5.1 In Netlify Dashboard
1. Go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter: `mintara.xyz`
4. Click **"Verify"**

### 5.2 Configure DNS (at your domain registrar)

Add these DNS records:

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
Value: fantastic-unicorn-123456.netlify.app
TTL: 3600
```

### 5.3 Enable HTTPS
- Netlify automatically provisions SSL certificate
- Uses Let's Encrypt (free)
- Takes 5-10 minutes

### 5.4 Force HTTPS Redirect
Already configured in `netlify.toml`:
```toml
[[redirects]]
  from = "http://mintara.xyz/*"
  to = "https://mintara.xyz/:splat"
  status = 301
  force = true
```

---

## 🔄 Step 6: Continuous Deployment

### 6.1 How It Works
Every time you push to `main` branch:
1. GitHub notifies Netlify
2. Netlify pulls latest code
3. Runs `npm run build`
4. Deploys to production
5. Site updates automatically (2-3 minutes)

### 6.2 Make Updates
```bash
# Make changes to code
git add .
git commit -m "Update: description"
git push origin main

# Netlify automatically rebuilds!
```

### 6.3 View Deploy Logs
In Netlify dashboard:
- Go to **"Deploys"**
- Click on latest deploy
- View build logs in real-time

---

## 🔍 Step 7: Verify Everything Works

### Test Checklist

#### ✅ Homepage
- [ ] Stats showing (Tokens Created, Transactions, Active Users)
- [ ] All sections loading
- [ ] Links working
- [ ] Language switcher working

#### ✅ Builder Page
- [ ] Wallet connection working
- [ ] Network detection (Base Mainnet)
- [ ] All 7 operation cards visible
- [ ] Forms working

#### ✅ Token Deployment
- [ ] Deploy test token
- [ ] Fee transaction (0.00002 ETH → admin)
- [ ] Contract deployed on Base
- [ ] Transaction on BaseScan
- [ ] Token auto-added to wallet
- [ ] Token in "My Deployed Tokens" list

#### ✅ Token Management
- [ ] Mint: working + fee
- [ ] Burn: working + fee
- [ ] Update Metadata: working + fee
- [ ] Multisender: working + fee
- [ ] Token Info: working (FREE)
- [ ] Revoke Ownership: working (FREE)

#### ✅ Admin Panel (if admin wallet)
- [ ] Shows for 0x59B16...6b45
- [ ] Stats accurate
- [ ] $MINTA Calculator working
- [ ] BaseScan Lookup working

#### ✅ MINTA Token Page
- [ ] Reward tiers correct:
  - 🥉 Deploy: 100 $MINTA
  - 🥈 Paid ops: 50 $MINTA
  - 🥇 Free ops: 0 $MINTA
- [ ] Video playing

#### ✅ Whitepaper Page
- [ ] Version 3.1 shown
- [ ] Total Supply: 100M MINTA
- [ ] Tokenomics table correct
- [ ] @MintaraToken link working

---

## 🐛 Troubleshooting

### Build Failed?

**Error: "Node version mismatch"**
```bash
# In netlify.toml, verify:
[build.environment]
  NODE_VERSION = "18"
```

**Error: "Module not found"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix: update dependencies"
git push
```

### 404 Errors?

**Check `/public/_redirects` exists:**
```
/*    /index.html   200
```

This file MUST be in `/public/` directory.

### Headers Not Working?

**Check `/public/_headers` exists** with correct format (no file extension).

### CSS Not Loading?

**Check build output:**
- Should see `dist/assets/index-[hash].css`
- Vite should bundle correctly
- No PostCSS errors in logs

---

## 📊 Monitoring

### Netlify Analytics (Free Tier)
Enable in dashboard to track:
- Page views
- Unique visitors
- Top pages
- Traffic sources

### GitHub Actions (Optional)
Already have CI/CD through Netlify, no need for GitHub Actions.

---

## 🔐 Security

### Already Configured:
✅ HTTPS automatic  
✅ Security headers in netlify.toml  
✅ CSP configured  
✅ No secrets needed  
✅ No environment variables  

### No API Keys Needed:
❌ No Supabase  
❌ No backend services  
❌ No external APIs  
✅ Pure frontend + blockchain  

---

## 💡 Tips

### 1. Branch Protection
Protect `main` branch:
1. Go to GitHub repo → Settings → Branches
2. Add rule for `main`
3. Enable "Require pull request reviews"
4. Enable "Require status checks to pass"

### 2. Deploy Previews
Every PR automatically gets a preview URL:
```
https://deploy-preview-123--mintara.netlify.app
```

### 3. Environment-Specific Config
Not needed for Mintara (no env vars), but available in Netlify:
- **Production:** main branch
- **Preview:** pull requests
- **Branch deploys:** other branches

### 4. Rollback
If deployment breaks:
1. Go to Netlify → Deploys
2. Find last working deploy
3. Click "Publish deploy"
4. Instant rollback!

---

## 📞 Support

### Netlify Issues:
- Docs: https://docs.netlify.com
- Community: https://answers.netlify.com
- Status: https://netlifystatus.com

### GitHub Issues:
- Create issues in your repo
- Use labels: bug, feature, documentation

### Mintara Issues:
- Twitter: @MintaraToken
- Email: support@mintara.xyz

---

## 🎉 You're Live!

**Congratulations!** Your Mintara instance is now:

✅ Live on Netlify  
✅ Automatically deploying from GitHub  
✅ HTTPS enabled  
✅ All features working  
✅ Ready for production  

**Next Steps:**
1. Test all features with real wallet
2. Deploy test token on Base Mainnet
3. Share on Twitter/Farcaster
4. Submit to Base Network showcase

---

<div align="center">

**🚀 MINTARA - LIVE ON BASE NETWORK! 🚀**

[GitHub](https://github.com/yourusername/mintara) • [Twitter](https://twitter.com/MintaraToken) • [Website](https://mintara.xyz)

</div>
