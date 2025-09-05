import { FacebookAdsApi, AdAccount, Campaign } from 'facebook-nodejs-business-sdk'

export class FacebookAPI {
  private api: FacebookAdsApi
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
    this.api = FacebookAdsApi.init(accessToken)
  }

  async getAdAccounts() {
    try {
      const user = await this.api.getUser()
      const adAccounts = await user.getAdAccounts(['id', 'name', 'account_status'])
      
      return adAccounts.map((account: any) => ({
        id: account.id,
        name: account.name,
        status: account.account_status,
        platform: 'facebook'
      }))
    } catch (error) {
      console.error('Facebook API Error:', error)
      throw new Error('Failed to fetch Facebook ad accounts')
    }
  }

  async getCampaigns(accountId: string) {
    try {
      const adAccount = new AdAccount(accountId)
      const campaigns = await adAccount.getCampaigns([
        'id', 'name', 'status', 'objective', 'daily_budget', 'lifetime_budget',
        'start_time', 'stop_time', 'created_time', 'updated_time'
      ])

      return campaigns.map((campaign: any) => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        objective: campaign.objective,
        budget: campaign.daily_budget || campaign.lifetime_budget,
        startDate: campaign.start_time,
        endDate: campaign.stop_time,
        platform: 'facebook'
      }))
    } catch (error) {
      console.error('Facebook Campaigns Error:', error)
      throw new Error('Failed to fetch Facebook campaigns')
    }
  }

  async getCampaignInsights(accountId: string, campaignId: string, dateRange: string = 'last_7d') {
    try {
      const adAccount = new AdAccount(accountId)
      const insights = await adAccount.getInsights([
        'campaign_id', 'campaign_name', 'impressions', 'clicks', 'spend',
        'actions', 'cost_per_action_type', 'ctr', 'cpc', 'cpm'
      ], {
        level: 'campaign',
        filtering: [{ field: 'campaign.id', operator: 'IN', value: [campaignId] }],
        time_range: { since: this.getDateRange(dateRange).since, until: this.getDateRange(dateRange).until }
      })

      if (insights.length === 0) return null

      const insight = insights[0]
      const actions = insight.actions || []
      const conversions = actions.find((action: any) => action.action_type === 'purchase')?.value || 0
      const revenue = conversions * 50 // Assuming $50 average order value

      return {
        impressions: parseInt(insight.impressions) || 0,
        clicks: parseInt(insight.clicks) || 0,
        spend: parseFloat(insight.spend) || 0,
        conversions: parseInt(conversions) || 0,
        revenue: revenue,
        ctr: parseFloat(insight.ctr) || 0,
        cpc: parseFloat(insight.cpc) || 0,
        cpa: parseFloat(insight.cost_per_action_type?.find((cpa: any) => cpa.action_type === 'purchase')?.value) || 0,
        roas: revenue / (parseFloat(insight.spend) || 1)
      }
    } catch (error) {
      console.error('Facebook Insights Error:', error)
      throw new Error('Failed to fetch Facebook campaign insights')
    }
  }

  private getDateRange(range: string) {
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
      since: since.toISOString().split('T')[0],
      until: now.toISOString().split('T')[0]
    }
  }

  async refreshToken() {
    // Implement token refresh logic
    // This would typically involve calling Facebook's token refresh endpoint
    return this.accessToken
  }
}
