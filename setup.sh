#!/bin/bash

# Ad Syntho Dashboard Setup Script
echo "🚀 Setting up Ad Syntho Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp env.example .env.local
    echo "📝 Please update .env.local with your actual values"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

# Check if Docker is available for database setup
if command -v docker &> /dev/null; then
    echo "🐳 Docker detected. Setting up PostgreSQL database..."
    
    # Check if PostgreSQL container is already running
    if ! docker ps | grep -q "postgres"; then
        echo "Starting PostgreSQL container..."
        docker run --name ad-syntho-postgres \
            -e POSTGRES_PASSWORD=password \
            -e POSTGRES_DB=ad_syntho_db \
            -p 5432:5432 \
            -d postgres:15-alpine
        
        echo "⏳ Waiting for database to be ready..."
        sleep 10
    else
        echo "✅ PostgreSQL container already running"
    fi
    
    # Update .env.local with Docker database URL
    if grep -q "DATABASE_URL=" .env.local; then
        sed -i.bak 's|DATABASE_URL=.*|DATABASE_URL="postgresql://postgres:password@localhost:5432/ad_syntho_db"|' .env.local
        rm .env.local.bak
    fi
    
    # Run database migrations
    echo "🗄️  Running database migrations..."
    npx prisma db push
    
    # Seed the database
    echo "🌱 Seeding database with demo data..."
    npm run db:seed
    
    echo "✅ Database setup complete!"
else
    echo "⚠️  Docker not found. Please set up PostgreSQL manually and update .env.local"
fi

# Build the application
echo "🔨 Building the application..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "🎉 Ad Syntho Dashboard is ready!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API keys (Google, Facebook, OpenAI, etc.)"
echo "2. Start the development server: npm run dev"
echo "3. Open http://localhost:3000 to view the application"
echo ""
echo "📚 For more information, see DEPLOYMENT.md"
echo "🔧 For development, see README.md"