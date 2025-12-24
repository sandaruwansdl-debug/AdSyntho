#!/bin/bash

# Script to trigger Vercel deployment
# This creates an empty commit to trigger a new deployment

echo "🔄 Triggering Vercel deployment..."
echo ""

# Create an empty commit to trigger deployment
git commit --allow-empty -m "Trigger Vercel deployment for new landing page"

# Push to trigger
echo "📤 Pushing to trigger deployment..."
git push origin main

echo ""
echo "✅ Push complete! Vercel should now start a new deployment."
echo "Check your Vercel dashboard for the new deployment."

