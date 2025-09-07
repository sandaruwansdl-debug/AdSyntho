import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FacebookAPI } from '@/lib/facebook-api'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json({ error: 'Authorization code required' }, { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/facebook`,
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()
    
    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 400 })
    }

    // Get user's ad accounts
    const facebookAPI = new FacebookAPI(tokenData.access_token)
    const adAccounts = await facebookAPI.getAdAccounts()

    // Save the first ad account
    if (adAccounts.length > 0) {
      const account = adAccounts[0]
      
      await prisma.adAccount.upsert({
        where: {
          userId_platform_accountId: {
            userId: session.user.id,
            platform: 'facebook',
            accountId: account.id
          }
        },
        update: {
          accessToken: tokenData.access_token,
          accountName: account.name,
          isActive: true,
          lastSyncAt: new Date(),
          syncStatus: 'success'
        },
        create: {
          userId: session.user.id,
          platform: 'facebook',
          accountId: account.id,
          accountName: account.name,
          accessToken: tokenData.access_token,
          isActive: true,
          lastSyncAt: new Date(),
          syncStatus: 'success'
        }
      })

      // Trigger initial data sync
      await syncFacebookData(session.user.id, account.id, tokenData.access_token)
    }

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?connected=facebook`)
  } catch (error) {
    console.error('Facebook OAuth Error:', error)
    return NextResponse.json({ error: 'Failed to connect Facebook account' }, { status: 500 })
  }
}

async function syncFacebookData(userId: string, accountId: string, accessToken: string) {
  try {
    const facebookAPI = new FacebookAPI(accessToken)
    const campaigns = await facebookAPI.getCampaigns(accountId)

    for (const campaign of campaigns) {
      const insights = await facebookAPI.getCampaignInsights(accountId, campaign.id)
      
      if (insights) {
        await prisma.campaign.upsert({
          where: {
            adAccountId_campaignId: {
              adAccountId: accountId,
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
            userId: userId,
            adAccountId: accountId,
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
      }
    }
  } catch (error) {
    console.error('Facebook sync error:', error)
  }
}
