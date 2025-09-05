# 🚀 Ad Syntho Dashboard - Deployment Guide

This guide covers deploying the Ad Syntho Dashboard to production using various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository access
- Domain name (optional)
- API keys for external services

## 🔧 Environment Variables

Create a `.env.production` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Facebook Ads API
FACEBOOK_APP_ID="your-facebook-app-id"
FACEBOOK_APP_SECRET="your-facebook-app-secret"

# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN="your-google-ads-token"
GOOGLE_ADS_CLIENT_ID="your-google-ads-client-id"
GOOGLE_ADS_CLIENT_SECRET="your-google-ads-client-secret"
GOOGLE_ADS_REFRESH_TOKEN="your-google-ads-refresh-token"

# Monitoring (Optional)
SENTRY_DSN="your-sentry-dsn"
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add all production environment variables

3. **Database Setup**
   - Use Vercel Postgres or external database
   - Run migrations: `npx prisma db push`

4. **Custom Domain** (Optional)
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### Option 2: Docker Deployment

1. **Build and Run**
   ```bash
   # Build the Docker image
   docker build -t adsyntho-dashboard .
   
   # Run with Docker Compose
   docker-compose up -d
   ```

2. **Production Setup**
   ```bash
   # Update docker-compose.yml with production values
   # Set up reverse proxy (nginx/traefik)
   # Configure SSL certificates
   ```

### Option 3: Traditional VPS

1. **Server Setup**
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   npm install -g pm2
   
   # Clone repository
   git clone https://github.com/your-username/ad-syntho-dashboard.git
   cd ad-syntho-dashboard
   
   # Install dependencies
   npm ci --production
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "adsyntho" -- start
   pm2 save
   pm2 startup
   ```

2. **Database Setup**
   ```bash
   # Install PostgreSQL
   sudo apt-get install postgresql postgresql-contrib
   
   # Create database
   sudo -u postgres createdb adsyntho
   
   # Run migrations
   npx prisma db push
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔐 Security Checklist

- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Use HTTPS in production
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor error logs

## 📊 Monitoring Setup

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

### Analytics
- Google Analytics
- Vercel Analytics
- Custom event tracking

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

## 🗄️ Database Management

### Migrations
```bash
# Generate migration
npx prisma migrate dev --name migration-name

# Deploy migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Backups
```bash
# PostgreSQL backup
pg_dump adsyntho > backup.sql

# Restore
psql adsyntho < backup.sql
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check environment variables

2. **Database Connection**
   - Verify DATABASE_URL format
   - Check database server status
   - Run migrations

3. **API Errors**
   - Check API keys
   - Verify webhook URLs
   - Check rate limits

### Logs
```bash
# Vercel
vercel logs

# Docker
docker logs container-name

# PM2
pm2 logs adsyntho
```

## 📈 Performance Optimization

- Enable Next.js Image Optimization
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries
- Use Redis for session storage
- Enable compression

## 🔧 Maintenance

### Regular Tasks
- [ ] Update dependencies
- [ ] Monitor performance
- [ ] Check security updates
- [ ] Backup database
- [ ] Review error logs
- [ ] Update API keys

### Scaling
- Use load balancers
- Implement database read replicas
- Use Redis for caching
- Consider microservices architecture

## 📞 Support

For deployment issues:
- Check the logs first
- Review this documentation
- Contact support: support@adsyntho.com

---

**Happy Deploying! 🚀**