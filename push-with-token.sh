#!/bin/bash

# Quick deployment script using GitHub token
# Usage: ./push-with-token.sh YOUR_GITHUB_TOKEN

if [ -z "$1" ]; then
    echo "❌ Error: GitHub token required"
    echo ""
    echo "Usage: ./push-with-token.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "To get a token:"
    echo "1. Go to: https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Select 'repo' scope"
    echo "4. Copy the token"
    exit 1
fi

TOKEN=$1
REPO_URL="https://${TOKEN}@github.com/sandaruwansdl-debug/AdSyntho.git"

echo "🚀 Pushing to GitHub..."
git remote set-url origin $REPO_URL
git push origin main

# Reset to original URL (without token)
git remote set-url origin https://github.com/sandaruwansdl-debug/AdSyntho.git

echo ""
echo "✅ Done! If Vercel is connected, your site will deploy automatically."

