import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const platform = searchParams.get('platform')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: any = {
      userId: session.user.id
    }

    if (platform && platform !== 'all') {
      where.platform = platform
    }

    if (status && status !== 'all') {
      where.status = status
    }

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        include: {
          adAccount: {
            select: {
              accountName: true,
              platform: true
            }
          },
          _count: {
            select: {
              insights: true
            }
          }
        },
        orderBy: {
          lastUpdated: 'desc'
        },
        take: limit,
        skip: offset
      }),
      prisma.campaign.count({ where })
    ])

    // Calculate aggregated metrics
    const aggregatedMetrics = await prisma.campaign.aggregate({
      where,
      _sum: {
        spend: true,
        revenue: true,
        impressions: true,
        clicks: true,
        conversions: true
      },
      _avg: {
        ctr: true,
        cpc: true,
        cpa: true,
        roas: true
      }
    })

    return NextResponse.json({
      campaigns,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      metrics: {
        totalSpend: aggregatedMetrics._sum.spend || 0,
        totalRevenue: aggregatedMetrics._sum.revenue || 0,
        totalImpressions: aggregatedMetrics._sum.impressions || 0,
        totalClicks: aggregatedMetrics._sum.clicks || 0,
        totalConversions: aggregatedMetrics._sum.conversions || 0,
        avgCTR: aggregatedMetrics._avg.ctr || 0,
        avgCPC: aggregatedMetrics._avg.cpc || 0,
        avgCPA: aggregatedMetrics._avg.cpa || 0,
        avgROAS: aggregatedMetrics._avg.roas || 0
      }
    })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      adAccountId,
      platform,
      campaignId,
      campaignName,
      status,
      objective,
      budget,
      startDate,
      endDate
    } = await request.json()

    // Validate required fields
    if (!adAccountId || !platform || !campaignId || !campaignName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify ad account belongs to user
    const adAccount = await prisma.adAccount.findFirst({
      where: {
        id: adAccountId,
        userId: session.user.id,
        isActive: true
      }
    })

    if (!adAccount) {
      return NextResponse.json({ error: 'Ad account not found' }, { status: 404 })
    }

    // Create campaign
    const campaign = await prisma.campaign.create({
      data: {
        userId: session.user.id,
        adAccountId: adAccountId,
        platform: platform,
        campaignId: campaignId,
        campaignName: campaignName,
        status: status || 'active',
        objective: objective,
        budget: budget,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null
      }
    })

    return NextResponse.json({
      success: true,
      campaign,
      message: 'Campaign created successfully'
    })
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
