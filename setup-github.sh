#!/bin/bash

# GitHub Setup Script for Ad Syntho Dashboard
echo "🚀 Setting up GitHub repository for Ad Syntho Dashboard..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Please run 'git init' first."
    exit 1
fi

# Get repository name from user
echo ""
echo "📝 Please provide your GitHub repository details:"
echo ""

read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name (default: ad-syntho-dashboard): " REPO_NAME

# Set default repository name if empty
if [ -z "$REPO_NAME" ]; then
    REPO_NAME="ad-syntho-dashboard"
fi

echo ""
echo "🔗 Repository URL will be: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Setup cancelled."
    exit 1
fi

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

echo ""
echo "✅ Git configuration complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named: $REPO_NAME"
echo "3. Make it public or private (your choice)"
echo "4. DON'T initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
echo "6. Then run this command to push your code:"
echo "   git push -u origin main"
echo ""
echo "🎉 Your repository will be ready!"

# Optional: Try to push (will fail if repo doesn't exist yet)
echo ""
read -p "Do you want to try pushing now? (y/n): " PUSH_NOW

if [ "$PUSH_NOW" = "y" ] || [ "$PUSH_NOW" = "Y" ]; then
    echo "🚀 Attempting to push to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 Your repository is live at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    else
        echo "❌ Push failed. Please create the repository on GitHub first, then run:"
        echo "   git push -u origin main"
    fi
fi

echo ""
echo "🎯 Manual steps remaining:"
echo "1. Create GitHub repository"
echo "2. Push code to GitHub"
echo "3. Set up environment variables"
echo "4. Deploy to production"
echo ""
echo "📖 See MANUAL_COMPLETION_CHECKLIST.md for detailed instructions"
