#!/bin/bash

# Ad Syntho - Deployment Script
# This script helps deploy your changes to GitHub

echo "🚀 Ad Syntho Deployment Script"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check git status
echo "📋 Checking git status..."
git status --short

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "⚠️  You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Update landing page and styles" || echo "No new changes to commit"
fi

# Try to push
echo ""
echo "📤 Attempting to push to GitHub..."
echo ""

# Method 1: Try with existing credentials
if git push origin main 2>&1 | grep -q "fatal"; then
    echo ""
    echo "🔐 Authentication required"
    echo ""
    echo "To complete the deployment, you have two options:"
    echo ""
    echo "OPTION 1: Use GitHub Personal Access Token"
    echo "-------------------------------------------"
    echo "1. Create a token at: https://github.com/settings/tokens"
    echo "2. Select 'repo' scope"
    echo "3. Copy the token"
    echo "4. Run: GIT_ASKPASS=echo git -c credential.helper='!f() { echo username=sandaruwansdl-debug; echo password=YOUR_TOKEN; }; f' push origin main"
    echo "   (Replace YOUR_TOKEN with your actual token)"
    echo ""
    echo "OPTION 2: Use GitHub CLI"
    echo "-----------------------"
    echo "1. Install: brew install gh"
    echo "2. Authenticate: gh auth login"
    echo "3. Push: gh repo sync"
    echo ""
    echo "OPTION 3: Manual Push"
    echo "-------------------"
    echo "Run: git push origin main"
    echo "Then enter your GitHub username and Personal Access Token when prompted"
    echo ""
    exit 1
else
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your landing page changes are now being deployed!"
    echo "If Vercel is connected, deployment should start automatically."
    echo ""
    exit 0
fi

