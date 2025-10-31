# 🚀 Mintara - Netlify Deployment Guide

**Fast deployment to Netlify via GitHub integration**

---

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Netlify account (free tier works!)
- ✅ Git installed locally

---

## 🚀 Quick Deployment (3 Steps)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Mintara v2.0.0 - Production Ready"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/mintara.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and login
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select your **mintara** repository
5. Configure build settings:

```
Build command:    npm run build
Publish directory: dist
```

6. Click **"Deploy site"**

### Step 3: Add Custom Domain (Optional)

1. In Netlify dashboard, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain: `mintara.xyz`
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

---

## ⚙️ Build Configuration

Netlify will automatically detect these settings from your project:

### From `package.json`:
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite",
    "preview": "vite preview"
  }
}
```

### From `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### From `/public/_headers`:
Security headers are automatically applied:
- X-Frame-Options: DENY
- Content-Security-Policy configured
- Cache-Control for assets

---

## 🔍 Verification After Deployment

### 1. Check Homepage
```
✅ Visit: https://your-site.netlify.app
✅ Verify: Landing page loads
✅ Check: Stats showing correctly
```

### 2. Test Token Builder
```
✅ Visit: /builder
✅ Connect: MetaMask wallet
✅ Verify: Base Network (Chain ID: 8453)
```

### 3. Check All Pages
```
✅ / (landing)
✅ /builder
✅ /minta-token
✅ /whitepaper
```

### 4. Test Token Deployment
```
✅ Deploy a test token
✅ Verify: Fee goes to admin (0x59B16...6b45)
✅ Check: Token added to wallet
✅ Confirm: Transaction on BaseScan
```

---

## 🎯 Environment Variables (None Required!)

Mintara doesn't need any environment variables because:
- ✅ No API keys needed
- ✅ No backend services
- ✅ Pure frontend + blockchain interaction
- ✅ All config in code (Base Network only)

---

## 🔧 Troubleshooting

### Build Failed?

**Check Node version:**
```bash
node --version  # Should be 18.x or higher
```

**In Netlify dashboard:**
1. Go to **Site settings** → **Build & deploy**
2. Set **Node version**: `18` or `20`
3. Redeploy

### 404 Errors?

**Make sure `/public/_redirects` exists:**
```
/*    /index.html   200
```

This enables SPA routing (React Router).

### CSS Not Loading?

**Check build output in Netlify logs:**
- Should see `dist/assets/*.css` files
- Vite should bundle correctly
- No PostCSS errors

---

## 📊 Netlify Dashboard Features

### Deploy Previews
- Every PR gets a preview URL
- Test before merging to main

### Functions (Not Used)
- Mintara is pure frontend
- No serverless functions needed

### Analytics (Optional)
- Enable in Netlify dashboard
- Track page views, visitors

### Forms (Not Used)
- No contact forms in Mintara

---

## 🚀 Continuous Deployment

After initial setup, every push to `main` branch automatically:
1. ✅ Triggers Netlify build
2. ✅ Runs `npm run build`
3. ✅ Deploys to production
4. ✅ Updates live site

---

## 💰 Cost

**FREE TIER INCLUDES:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Custom domain support
- Deploy previews

**More than enough for Mintara!**

---

## 🔐 Security

### Already Configured:
✅ HTTPS enabled automatically  
✅ Security headers in `/public/_headers`  
✅ CSP configured  
✅ XSS protection enabled  

### No Secrets Needed:
❌ No API keys to configure  
❌ No environment variables  
❌ No database connections  

---

## 📱 Custom Domain Setup

### 1. Add Domain in Netlify
```
Domain settings → Add custom domain → mintara.xyz
```

### 2. Configure DNS (at your registrar)
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify load balancer)

Type: CNAME
Name: www
Value: your-site.netlify.app
```

### 3. Wait for DNS Propagation
- Usually takes 5-30 minutes
- Can take up to 48 hours

### 4. Enable HTTPS
- Automatic with Let's Encrypt
- No configuration needed

---

## 🎉 You're Live!

After deployment, your site will be live at:
- **Netlify URL:** `https://mintara.netlify.app`
- **Custom Domain:** `https://mintara.xyz` (if configured)

**All features working:**
✅ Token deployment on Base Network  
✅ All 7 management operations  
✅ Admin panel (for 0x59B16...6b45)  
✅ Real-time stats tracking  
✅ $MINTA reward system  
✅ 8-language support  

---

## 📞 Support

**Netlify Issues:**
- Docs: https://docs.netlify.com
- Support: https://answers.netlify.com

**Mintara Issues:**
- GitHub Issues: (your repo)
- Twitter: @MintaraToken
- Email: support@mintara.xyz

---

## 🔄 Update Deployment

To deploy updates:

```bash
# Make changes to code
git add .
git commit -m "Update: description of changes"
git push origin main

# Netlify automatically rebuilds and deploys!
```

---

<div align="center">

**🚀 MINTARA - READY FOR LAUNCH! 🚀**

Built with ❤️ for Base Network

[GitHub](https://github.com/yourusername/mintara) • [Twitter](https://twitter.com/MintaraToken) • [Website](https://mintara.xyz)

</div>
