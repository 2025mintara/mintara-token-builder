#!/bin/bash

# 🚀 Mintara Quick Deploy Script
# Deploys Mintara to GitHub + Netlify

echo "🚀 Mintara Deployment Script"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if git is initialized
echo -e "${BLUE}Step 1: Checking git status...${NC}"
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Git not initialized. Initializing...${NC}"
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
else
    echo -e "${GREEN}✅ Git already initialized${NC}"
fi
echo ""

# Step 2: Get GitHub username
echo -e "${BLUE}Step 2: GitHub Setup${NC}"
read -p "Enter your GitHub username: " GITHUB_USERNAME
if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ Error: GitHub username required${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Username: $GITHUB_USERNAME${NC}"
echo ""

# Step 3: Check for remote
echo -e "${BLUE}Step 3: Configuring git remote...${NC}"
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}Remote 'origin' already exists. Removing...${NC}"
    git remote remove origin
fi

GITHUB_URL="https://github.com/$GITHUB_USERNAME/mintara.git"
git remote add origin $GITHUB_URL
echo -e "${GREEN}✅ Remote added: $GITHUB_URL${NC}"
echo ""

# Step 4: Add files
echo -e "${BLUE}Step 4: Adding files...${NC}"
git add .
echo -e "${GREEN}✅ Files staged${NC}"
echo ""

# Step 5: Commit
echo -e "${BLUE}Step 5: Creating commit...${NC}"
git commit -m "🚀 Mintara v2.0.0 - Production Ready

✅ Token deployment & management on Base Network
✅ Fee system: 1 USDC per operation
✅ FREE: Token Info & Revoke Ownership
✅ Admin panel with real-time stats
✅ \$MINTA reward system (100 per deploy, 50 per operation)
✅ Whitepaper v3.1
✅ 8-language support with SEO-optimized routing
✅ AI NFT Builder (0.3 USDC per mint)
✅ 100% production ready"
echo -e "${GREEN}✅ Commit created${NC}"
echo ""

# Step 6: Set branch to main
echo -e "${BLUE}Step 6: Setting branch to main...${NC}"
git branch -M main
echo -e "${GREEN}✅ Branch set to main${NC}"
echo ""

# Step 7: Push to GitHub
echo -e "${BLUE}Step 7: Pushing to GitHub...${NC}"
echo -e "${YELLOW}⚠️  You may need to authenticate with GitHub${NC}"
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}❌ Push failed. Please check your GitHub authentication.${NC}"
    echo -e "${YELLOW}💡 Tip: You may need to create the repository first at:${NC}"
    echo -e "   https://github.com/new"
    exit 1
fi
echo ""

# Step 8: Next steps
echo -e "${GREEN}🎉 GitHub deployment complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Go to https://app.netlify.com"
echo -e "2. Click 'Add new site' → 'Import from GitHub'"
echo -e "3. Select your 'mintara' repository"
echo -e "4. Configure build settings:"
echo -e "   Build command: ${YELLOW}npm run build${NC}"
echo -e "   Publish directory: ${YELLOW}dist${NC}"
echo -e "5. Click 'Deploy site'"
echo ""
echo -e "${BLUE}Repository URL:${NC}"
echo -e "https://github.com/$GITHUB_USERNAME/mintara"
echo ""
echo -e "${GREEN}✅ All done! Happy deploying! 🚀${NC}"
