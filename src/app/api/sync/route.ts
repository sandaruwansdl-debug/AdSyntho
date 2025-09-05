import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FacebookAPI } from '@/lib/facebook-api'
import { GoogleAdsAPI } from '@/lib/google-ads-api'
import { AIInsightsEngine } from '@/lib/ai-insights'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platform, accountId } = await request.json()

    // Get the ad account
    const adAccount = await prisma.adAccount.findFirst({
      where: {
        userId: session.user.id,
        platform: platform,
        accountId: accountId,
        isActive: true
      }
    })

    if (!adAccount) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    // Update sync status
    await prisma.adAccount.update({
      where: { id: adAccount.id },
      data: { syncStatus: 'syncing' }
    })

    let campaigns: any[] = []

    // Sync based on platform
    switch (platform) {
      case 'facebook':
        campaigns = await syncFacebookAccount(adAccount)
        break
      case 'google':
        campaigns = await syncGoogleAccount(adAccount)
        break
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }

    // Generate AI insights
    if (campaigns.length > 0) {
      const aiEngine = new AIInsightsEngine(session.user.id)
      const insights = await aiEngine.generateInsights(campaigns)
      await aiEngine.saveInsights(insights)
    }

    // Update sync status
    await prisma.adAccount.update({
      where: { id: adAccount.id },
      data: { 
        syncStatus: 'success',
        lastSyncAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      campaignsSynced: campaigns.length,
      message: `Successfully synced ${campaigns.length} campaigns from ${platform}`
    })

  } catch (error) {
    console.error('Sync error:', error)
    
    // Update sync status to error
    const session = await getServerSession(authOptions)
    if (session?.user?.id) {
      await prisma.adAccount.updateMany({
        where: { 
          userId: session.user.id,
          syncStatus: 'syncing'
        },
        data: { syncStatus: 'error' }
      })
    }

    return NextResponse.json({ 
      error: 'Failed to sync account data' 
    }, { status: 500 })
  }
}

async function syncFacebookAccount(adAccount: any) {
  const facebookAPI = new FacebookAPI(adAccount.accessToken)
  const campaigns = await facebookAPI.getCampaigns(adAccount.accountId)
  
  const syncedCampaigns = []

  for (const campaign of campaigns) {
    const insights = await facebookAPI.getCampaignInsights(adAccount.accountId, campaign.id)
    
    if (insights) {
      const syncedCampaign = await prisma.campaign.upsert({
        where: {
          adAccountId_campaignId: {
            adAccountId: adAccount.id,
            campaignId: campaign.id
          }
        },
        update: {
          spend: insights.spend,
          impressions: insights.impressions,
          clicks: insights.clicks,
          conversions: insights.conversions,
          revenue: insights.revenue,
          ctr: insights.ctr,
          cpc: insights.cpc,
          cpa: insights.cpa,
          roas: insights.roas,
          lastUpdated: new Date()
        },
        create: {
          userId: adAccount.userId,
          adAccountId: adAccount.id,
          platform: 'facebook',
          campaignId: campaign.id,
          campaignName: campaign.name,
          status: campaign.status,
          objective: campaign.objective,
          budget: campaign.budget,
          spend: insights.spend,
          impressions: insights.impressions,
          clicks: insights.clicks,
          conversions: insights.conversions,
          revenue: insights.revenue,
          ctr: insights.ctr,
          cpc: insights.cpc,
          cpa: insights.cpa,
          roas: insights.roas,
          startDate: campaign.startDate,
          endDate: campaign.endDate
        }
      })

      syncedCampaigns.push({
        id: syncedCampaign.id,
        name: syncedCampaign.campaignName,
        platform: syncedCampaign.platform,
        spend: syncedCampaign.spend,
        impressions: syncedCampaign.impressions,
        clicks: syncedCampaign.clicks,
        conversions: syncedCampaign.conversions,
        revenue: syncedCampaign.revenue,
        ctr: syncedCampaign.ctr,
        cpc: syncedCampaign.cpc,
        cpa: syncedCampaign.cpa,
        roas: syncedCampaign.roas,
        status: syncedCampaign.status
      })
    }
  }

  return syncedCampaigns
}

async function syncGoogleAccount(adAccount: any) {
  const googleAPI = new GoogleAdsAPI(adAccount.accessToken, adAccount.accountId)
  const campaigns = await googleAPI.getCampaigns()
  
  const syncedCampaigns = []

  for (const campaign of campaigns) {
    const insights = await googleAPI.getCampaignInsights(campaign.id)
    
    if (insights) {
      const syncedCampaign = await prisma.campaign.upsert({
        where: {
          adAccountId_campaignId: {
            adAccountId: adAccount.id,
            campaignId: campaign.id
          }
        },
        update: {
          spend: insights.spend,
          impressions: insights.impressions,
          clicks: insights.clicks,
          conversions: insights.conversions,
          revenue: insights.revenue,
          ctr: insights.ctr,
          cpc: insights.cpc,
          cpa: insights.cpa,
          roas: insights.roas,
          lastUpdated: new Date()
        },
        create: {
          userId: adAccount.userId,
          adAccountId: adAccount.id,
          platform: 'google',
          campaignId: campaign.id,
          campaignName: campaign.name,
          status: campaign.status,
          objective: campaign.objective,
          budget: campaign.budget,
          spend: insights.spend,
          impressions: insights.impressions,
          clicks: insights.clicks,
          conversions: insights.conversions,
          revenue: insights.revenue,
          ctr: insights.ctr,
          cpc: insights.cpc,
          cpa: insights.cpa,
          roas: insights.roas,
          startDate: campaign.startDate,
          endDate: campaign.endDate
        }
      })

      syncedCampaigns.push({
        id: syncedCampaign.id,
        name: syncedCampaign.campaignName,
        platform: syncedCampaign.platform,
        spend: syncedCampaign.spend,
        impressions: syncedCampaign.impressions,
        clicks: syncedCampaign.clicks,
        conversions: syncedCampaign.conversions,
        revenue: syncedCampaign.revenue,
        ctr: syncedCampaign.ctr,
        cpc: syncedCampaign.cpc,
        cpa: syncedCampaign.cpa,
        roas: syncedCampaign.roas,
        status: syncedCampaign.status
      })
    }
  }

  return syncedCampaigns
}
