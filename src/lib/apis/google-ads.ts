import { GoogleAdsApi } from 'google-ads-api';

export class GoogleAdsService {
  private client: GoogleAdsApi;
  private customerId: string;

  constructor(accessToken: string, customerId: string) {
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    });
    this.customerId = customerId;
  }

  async getCampaigns() {
    try {
      const customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      });

      const campaigns = await customer.query(`
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value
        FROM campaign
        WHERE campaign.status = 'ENABLED'
        ORDER BY metrics.impressions DESC
        LIMIT 100
      `);

      return campaigns.map(campaign => ({
        id: campaign.campaign?.id || '',
        name: campaign.campaign?.name || '',
        status: campaign.campaign?.status || '',
        type: campaign.campaign?.advertising_channel_type || '',
        impressions: campaign.metrics?.impressions || 0,
        clicks: campaign.metrics?.clicks || 0,
        cost: (campaign.metrics?.cost_micros || 0) / 1000000,
        conversions: campaign.metrics?.conversions || 0,
        conversionValue: campaign.metrics?.conversions_value || 0,
        platform: 'google_ads'
      }));
    } catch (error) {
      console.error('Google Ads API Error:', error);
      throw new Error('Failed to fetch Google Ads campaigns');
    }
  }
}
