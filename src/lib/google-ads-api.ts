import { GoogleAdsApi, Customer } from 'google-ads-api'

export class GoogleAdsAPI {
  private client: GoogleAdsApi
  private customerId: string

  constructor(accessToken: string, customerId: string) {
    this.customerId = customerId
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    })
  }

  async getCampaigns() {
    try {
      const customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      })

      const campaigns = await customer.query(`
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign_budget.amount_micros,
          campaign.start_date,
          campaign.end_date
        FROM campaign
        WHERE campaign.status != 'REMOVED'
        ORDER BY campaign.name
      `)

      return campaigns.map((campaign: any) => ({
        id: campaign.campaign.id.toString(),
        name: campaign.campaign.name,
        status: campaign.campaign.status,
        objective: campaign.campaign.advertising_channel_type,
        budget: campaign.campaign_budget?.amount_micros ? campaign.campaign_budget.amount_micros / 1000000 : 0,
        startDate: campaign.campaign.start_date,
        endDate: campaign.campaign.end_date,
        platform: 'google'
      }))
    } catch (error) {
      console.error('Google Ads API Error:', error)
      throw new Error('Failed to fetch Google Ads campaigns')
    }
  }

  async getCampaignInsights(campaignId: string, dateRange: string = 'last_7d') {
    try {
      const customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      })

      const dateRangeClause = this.getDateRangeClause(dateRange)

      const insights = await customer.query(`
        SELECT 
          campaign.id,
          campaign.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value,
          metrics.ctr,
          metrics.average_cpc,
          metrics.cost_per_conversion
        FROM campaign
        WHERE campaign.id = ${campaignId}
        AND segments.date BETWEEN '${dateRangeClause.since}' AND '${dateRangeClause.until}'
      `)

      if (insights.length === 0) return null

      const insight = insights[0]
      const metrics = insight.metrics || {}
      const spend = metrics.cost_micros ? metrics.cost_micros / 1000000 : 0
      const revenue = metrics.conversions_value || 0

      return {
        impressions: parseInt(metrics.impressions?.toString() || '0') || 0,
        clicks: parseInt(metrics.clicks?.toString() || '0') || 0,
        spend: spend,
        conversions: parseInt(metrics.conversions?.toString() || '0') || 0,
        revenue: revenue,
        ctr: parseFloat(metrics.ctr?.toString() || '0') || 0,
        cpc: parseFloat(metrics.average_cpc?.toString() || '0') || 0,
        cpa: parseFloat(metrics.cost_per_conversion?.toString() || '0') || 0,
        roas: revenue / (spend || 1)
      }
    } catch (error) {
      console.error('Google Ads Insights Error:', error)
      throw new Error('Failed to fetch Google Ads campaign insights')
    }
  }

  private getDateRangeClause(range: string) {
    const now = new Date()
    const since = new Date()
    
    switch (range) {
      case 'last_7d':
        since.setDate(now.getDate() - 7)
        break
      case 'last_30d':
        since.setDate(now.getDate() - 30)
        break
      case 'last_90d':
        since.setDate(now.getDate() - 90)
        break
      default:
        since.setDate(now.getDate() - 7)
    }

    return {
      since: since.toISOString().split('T')[0].replace(/-/g, ''),
      until: now.toISOString().split('T')[0].replace(/-/g, '')
    }
  }
}
