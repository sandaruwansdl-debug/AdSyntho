import OpenAI from 'openai'
import { prisma } from './prisma'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface CampaignData {
  id: string
  name: string
  platform: string
  spend: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  ctr: number
  cpc: number
  cpa: number
  roas: number
  status: string
  startDate?: Date
  endDate?: Date
}

export interface InsightData {
  type: 'optimization' | 'opportunity' | 'alert' | 'trend'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  action: string
  data?: any
}

export class AIInsightsEngine {
  private userId: string

  constructor(userId: string) {
    this.userId = userId
  }

  async generateInsights(campaigns: CampaignData[]): Promise<InsightData[]> {
    const insights: InsightData[] = []

    // Analyze each campaign
    for (const campaign of campaigns) {
      const campaignInsights = await this.analyzeCampaign(campaign, campaigns)
      insights.push(...campaignInsights)
    }

    // Generate cross-platform insights
    const crossPlatformInsights = await this.analyzeCrossPlatform(campaigns)
    insights.push(...crossPlatformInsights)

    // Generate budget optimization insights
    const budgetInsights = await this.analyzeBudgetOptimization(campaigns)
    insights.push(...budgetInsights)

    // Sort by impact and confidence
    return insights.sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 }
      const impactDiff = impactOrder[b.impact] - impactOrder[a.impact]
      if (impactDiff !== 0) return impactDiff
      return b.confidence - a.confidence
    })
  }

  private async analyzeCampaign(campaign: CampaignData, allCampaigns: CampaignData[]): Promise<InsightData[]> {
    const insights: InsightData[] = []

    // CTR Analysis
    if (campaign.ctr < 1.0) {
      insights.push({
        type: 'alert',
        title: 'Low Click-Through Rate Alert',
        description: `Campaign "${campaign.name}" has a CTR of ${campaign.ctr.toFixed(2)}%, which is below the platform average. This indicates potential ad fatigue or poor targeting.`,
        impact: 'high',
        confidence: 85,
        action: 'Consider refreshing ad creatives, testing new audiences, or adjusting bid strategies.',
        data: {
          currentCTR: campaign.ctr,
          platformAverage: this.getPlatformAverage(campaign.platform, 'ctr', allCampaigns),
          campaignId: campaign.id
        }
      })
    }

    // ROAS Analysis
    if (campaign.roas < 2.0) {
      insights.push({
        type: 'optimization',
        title: 'Low Return on Ad Spend',
        description: `Campaign "${campaign.name}" has a ROAS of ${campaign.roas.toFixed(2)}x, which is below the recommended 2.0x threshold.`,
        impact: 'high',
        confidence: 90,
        action: 'Review targeting, ad copy, and landing page experience. Consider pausing underperforming ad sets.',
        data: {
          currentROAS: campaign.roas,
          recommendedROAS: 2.0,
          campaignId: campaign.id
        }
      })
    }

    // High Performance Opportunity
    if (campaign.roas > 3.0 && campaign.spend < 1000) {
      insights.push({
        type: 'opportunity',
        title: 'High-Performing Campaign Opportunity',
        description: `Campaign "${campaign.name}" is performing exceptionally well with a ROAS of ${campaign.roas.toFixed(2)}x. Consider scaling up.`,
        impact: 'medium',
        confidence: 88,
        action: 'Gradually increase budget by 20-30% while monitoring performance. Test similar audiences.',
        data: {
          currentROAS: campaign.roas,
          currentSpend: campaign.spend,
          potentialIncrease: campaign.spend * 0.25,
          campaignId: campaign.id
        }
      })
    }

    // Ad Fatigue Detection
    if (campaign.impressions > 100000 && campaign.ctr < 1.5) {
      insights.push({
        type: 'alert',
        title: 'Potential Ad Fatigue Detected',
        description: `Campaign "${campaign.name}" has high impressions (${campaign.impressions.toLocaleString()}) but declining CTR, indicating possible ad fatigue.`,
        impact: 'medium',
        confidence: 75,
        action: 'Refresh ad creatives, test new formats, or rotate ad variations more frequently.',
        data: {
          impressions: campaign.impressions,
          ctr: campaign.ctr,
          campaignId: campaign.id
        }
      })
    }

    return insights
  }

  private async analyzeCrossPlatform(campaigns: CampaignData[]): Promise<InsightData[]> {
    const insights: InsightData[] = []
    
    // Group by platform
    const platformGroups = campaigns.reduce((acc, campaign) => {
      if (!acc[campaign.platform]) acc[campaign.platform] = []
      acc[campaign.platform].push(campaign)
      return acc
    }, {} as Record<string, CampaignData[]>)

    const platforms = Object.keys(platformGroups)
    if (platforms.length < 2) return insights

    // Find best performing platform
    const platformPerformance = platforms.map(platform => {
      const platformCampaigns = platformGroups[platform]
      const avgROAS = platformCampaigns.reduce((sum, c) => sum + c.roas, 0) / platformCampaigns.length
      const totalSpend = platformCampaigns.reduce((sum, c) => sum + c.spend, 0)
      return { platform, avgROAS, totalSpend }
    })

    const bestPlatform = platformPerformance.reduce((best, current) => 
      current.avgROAS > best.avgROAS ? current : best
    )

    if (bestPlatform.avgROAS > 2.5) {
      insights.push({
        type: 'opportunity',
        title: 'Platform Performance Optimization',
        description: `${bestPlatform.platform} is your best-performing platform with an average ROAS of ${bestPlatform.avgROAS.toFixed(2)}x. Consider reallocating budget.`,
        impact: 'medium',
        confidence: 82,
        action: `Consider shifting 10-20% of budget from lower-performing platforms to ${bestPlatform.platform}.`,
        data: {
          bestPlatform: bestPlatform.platform,
          avgROAS: bestPlatform.avgROAS,
          totalSpend: bestPlatform.totalSpend
        }
      })
    }

    return insights
  }

  private async analyzeBudgetOptimization(campaigns: CampaignData[]): Promise<InsightData[]> {
    const insights: InsightData[] = []
    
    const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0)
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0)
    const overallROAS = totalRevenue / totalSpend

    // Budget allocation analysis
    const highPerformers = campaigns.filter(c => c.roas > 2.5)
    const lowPerformers = campaigns.filter(c => c.roas < 1.5)

    if (highPerformers.length > 0 && lowPerformers.length > 0) {
      const highPerformerSpend = highPerformers.reduce((sum, c) => sum + c.spend, 0)
      const lowPerformerSpend = lowPerformers.reduce((sum, c) => sum + c.spend, 0)

      if (lowPerformerSpend > highPerformerSpend) {
        insights.push({
          type: 'optimization',
          title: 'Budget Reallocation Opportunity',
          description: `You're spending more on low-performing campaigns (${lowPerformerSpend.toLocaleString()}) than high-performing ones (${highPerformerSpend.toLocaleString()}).`,
          impact: 'high',
          confidence: 90,
          action: 'Consider pausing or reducing budget for low-performing campaigns and increasing budget for high-performing ones.',
          data: {
            highPerformerSpend,
            lowPerformerSpend,
            potentialSavings: lowPerformerSpend * 0.3
          }
        })
      }
    }

    return insights
  }

  private getPlatformAverage(platform: string, metric: string, campaigns: CampaignData[]): number {
    const platformCampaigns = campaigns.filter(c => c.platform === platform)
    if (platformCampaigns.length === 0) return 0

    const sum = platformCampaigns.reduce((acc, c) => acc + (c as any)[metric], 0)
    return sum / platformCampaigns.length
  }

  async saveInsights(insights: InsightData[], campaignId?: string) {
    const insightRecords = insights.map(insight => ({
      userId: this.userId,
      campaignId: campaignId || null,
      type: insight.type,
      title: insight.title,
      description: insight.description,
      impact: insight.impact,
      confidence: insight.confidence,
      action: insight.action,
      data: insight.data || {}
    }))

    await prisma.insight.createMany({
      data: insightRecords
    })
  }
}
