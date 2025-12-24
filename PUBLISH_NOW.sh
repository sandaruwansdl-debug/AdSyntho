#!/bin/bash

# 🚀 Quick Publish Script for Ad Syntho Landing Page
# This script will help you publish your stunning landing page

echo "🎨 Ad Syntho Landing Page Publisher"
echo "====================================="
echo ""
echo "Your landing page is ready with:"
echo "  ✨ Animated hero section"
echo "  🎨 Modern gradient design"
echo "  📱 Fully responsive layout"
echo "  ⚡ Smooth animations"
echo ""
echo "📊 Status:"
git status --short
echo ""
echo "📦 Commits ready to push:"
git log origin/main..HEAD --oneline 2>/dev/null || git log --oneline -3
echo ""
echo "🔐 To publish, you need to push to GitHub."
echo ""
echo "OPTION 1: Use GitHub Personal Access Token (Recommended)"
echo "--------------------------------------------------------"
echo "1. Get token: https://github.com/settings/tokens"
echo "2. Select 'repo' scope"
echo "3. Run: ./push-with-token.sh YOUR_TOKEN"
echo ""
echo "OPTION 2: Manual Push"
echo "-------------------"
echo "Run: git push origin main"
echo "Then enter:"
echo "  Username: sandaruwansdl-debug"
echo "  Password: [your GitHub Personal Access Token]"
echo ""
echo "✅ Once pushed, Vercel will auto-deploy if connected!"
echo ""

