import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@adsyntho.com' },
    update: {},
    create: {
      email: 'demo@adsyntho.com',
      name: 'Demo User',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    },
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Create demo ad accounts
  const facebookAccount = await prisma.adAccount.upsert({
    where: {
      userId_platform_accountId: {
        userId: demoUser.id,
        platform: 'facebook',
        accountId: 'act_123456789'
      }
    },
    update: {},
    create: {
      userId: demoUser.id,
      platform: 'facebook',
      accountId: 'act_123456789',
      accountName: 'Demo Facebook Account',
      accessToken: 'demo_access_token',
      isActive: true,
      lastSyncAt: new Date(),
      syncStatus: 'success'
    }
  })

  const googleAccount = await prisma.adAccount.upsert({
    where: {
      userId_platform_accountId: {
        userId: demoUser.id,
        platform: 'google',
        accountId: '123-456-7890'
      }
    },
    update: {},
    create: {
      userId: demoUser.id,
      platform: 'google',
      accountId: '123-456-7890',
      accountName: 'Demo Google Ads Account',
      accessToken: 'demo_access_token',
      isActive: true,
      lastSyncAt: new Date(),
      syncStatus: 'success'
    }
  })

  console.log('✅ Created demo ad accounts')

  // Create demo campaigns
  const campaigns = [
    {
      userId: demoUser.id,
      adAccountId: facebookAccount.id,
      platform: 'facebook',
      campaignId: '120330000000000001',
      campaignName: 'Summer Sale 2024',
      status: 'active',
      objective: 'CONVERSIONS',
      budget: 100,
      spend: 2500,
      impressions: 125000,
      clicks: 2500,
      conversions: 125,
      revenue: 6250,
      ctr: 2.0,
      cpc: 1.0,
      cpa: 20.0,
      roas: 2.5,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31')
    },
    {
      userId: demoUser.id,
      adAccountId: googleAccount.id,
      platform: 'google',
      campaignId: '12345678901',
      campaignName: 'Brand Awareness Q2',
      status: 'active',
      objective: 'SEARCH',
      budget: 80,
      spend: 1800,
      impressions: 89000,
      clicks: 1780,
      conversions: 89,
      revenue: 4450,
      ctr: 2.0,
      cpc: 1.01,
      cpa: 20.2,
      roas: 2.47,
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-06-30')
    },
    {
      userId: demoUser.id,
      adAccountId: facebookAccount.id,
      platform: 'facebook',
      campaignId: '120330000000000002',
      campaignName: 'Product Launch',
      status: 'active',
      objective: 'TRAFFIC',
      budget: 60,
      spend: 1200,
      impressions: 95000,
      clicks: 1900,
      conversions: 76,
      revenue: 3040,
      ctr: 2.0,
      cpc: 0.63,
      cpa: 15.8,
      roas: 2.53,
      startDate: new Date('2024-05-15'),
      endDate: new Date('2024-07-15')
    }
  ]

  for (const campaignData of campaigns) {
    await prisma.campaign.upsert({
      where: {
        adAccountId_campaignId: {
          adAccountId: campaignData.adAccountId,
          campaignId: campaignData.campaignId
        }
      },
      update: {},
      create: campaignData
    })
  }

  console.log('✅ Created demo campaigns')

  // Create demo insights
  const insights = [
    {
      userId: demoUser.id,
      campaignId: null,
      type: 'optimization',
      title: 'Campaign Performance Alert',
      description: 'Your Facebook campaign "Summer Sale 2024" has shown a 15% decrease in CTR over the last 7 days. This is below the platform average.',
      impact: 'high',
      confidence: 87,
      action: 'Review ad creatives and consider A/B testing new variations',
      data: JSON.stringify({
        currentCTR: 1.2,
        previousCTR: 1.4,
        platformAverage: 1.8,
        trend: 'declining'
      })
    },
    {
      userId: demoUser.id,
      campaignId: null,
      type: 'opportunity',
      title: 'Budget Optimization Opportunity',
      description: 'Google Ads campaign "Brand Awareness Q2" is performing 25% above average with a ROAS of 2.47x. Consider increasing budget allocation.',
      impact: 'medium',
      confidence: 92,
      action: 'Increase daily budget by 20% and monitor performance',
      data: JSON.stringify({
        currentROAS: 2.47,
        averageROAS: 2.0,
        budgetUtilization: 85,
        recommendation: 'increase_budget'
      })
    },
    {
      userId: demoUser.id,
      type: 'trend',
      title: 'Cross-Platform Performance Analysis',
      description: 'Facebook campaigns are outperforming Google Ads by 15% in terms of ROAS. Consider reallocating budget.',
      impact: 'medium',
      confidence: 78,
      action: 'Shift 10-15% of Google Ads budget to Facebook campaigns',
      data: JSON.stringify({
        facebookROAS: 2.5,
        googleROAS: 2.47,
        performanceGap: 0.15
      })
    }
  ]

  for (const insightData of insights) {
    await prisma.insight.create({
      data: insightData
    })
  }

  console.log('✅ Created demo insights')

  // Create subscription
  await prisma.subscription.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      plan: 'pro',
      status: 'active',
      stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    }
  })

  console.log('✅ Created demo subscription')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
