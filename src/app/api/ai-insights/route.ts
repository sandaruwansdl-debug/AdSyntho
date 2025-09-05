import { NextRequest, NextResponse } from 'next/server';
import { AIInsightsEngine, CampaignData } from '../../../lib/ai-insights';
import { APIErrorHandler, withErrorHandling } from '../../../lib/api-error-handler';

// Mock campaign data for demo
const mockCampaigns: CampaignData[] = [
  {
    id: '1',
    name: 'Facebook Summer Sale',
    platform: 'Facebook',
    spend: 2500,
    impressions: 125000,
    clicks: 1875,
    conversions: 94,
    revenue: 4700,
    ctr: 1.5,
    cpc: 1.33,
    cpa: 26.6,
    roas: 1.88,
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31')
  },
  {
    id: '2',
    name: 'Google Search Campaign',
    platform: 'Google Ads',
    spend: 1800,
    impressions: 45000,
    clicks: 2250,
    conversions: 135,
    revenue: 5400,
    ctr: 5.0,
    cpc: 0.8,
    cpa: 13.3,
    roas: 3.0,
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31')
  },
  {
    id: '3',
    name: 'TikTok Brand Awareness',
    platform: 'TikTok',
    spend: 1200,
    impressions: 200000,
    clicks: 2400,
    conversions: 48,
    revenue: 1920,
    ctr: 1.2,
    cpc: 0.5,
    cpa: 25.0,
    roas: 1.6,
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31')
  },
  {
    id: '4',
    name: 'Facebook Retargeting',
    platform: 'Facebook',
    spend: 800,
    impressions: 35000,
    clicks: 1050,
    conversions: 84,
    revenue: 3360,
    ctr: 3.0,
    cpc: 0.76,
    cpa: 9.5,
    roas: 4.2,
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31')
  },
  {
    id: '5',
    name: 'Google Display Network',
    platform: 'Google Ads',
    spend: 600,
    impressions: 80000,
    clicks: 800,
    conversions: 16,
    revenue: 480,
    ctr: 1.0,
    cpc: 0.75,
    cpa: 37.5,
    roas: 0.8,
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31')
  }
];

export const GET = withErrorHandling(async (request: NextRequest) => {
  const apiErrorHandler = APIErrorHandler.getInstance();
  
  // For demo purposes, use a mock user ID
  const userId = 'demo-user-1';
  
  // Initialize AI insights engine
  const insightsEngine = new AIInsightsEngine(userId);
  
  // Generate insights from mock campaign data
  const insights = await insightsEngine.generateInsights(mockCampaigns);
  
  // Save insights to database (optional for demo)
  // await insightsEngine.saveInsights(insights);
  
  const data = {
    insights,
    campaigns: mockCampaigns,
    summary: {
      totalCampaigns: mockCampaigns.length,
      totalSpend: mockCampaigns.reduce((sum, c) => sum + c.spend, 0),
      totalRevenue: mockCampaigns.reduce((sum, c) => sum + c.revenue, 0),
      avgROAS: mockCampaigns.reduce((sum, c) => sum + c.roas, 0) / mockCampaigns.length,
      highImpactInsights: insights.filter(i => i.impact === 'high').length,
      mediumImpactInsights: insights.filter(i => i.impact === 'medium').length,
      lowImpactInsights: insights.filter(i => i.impact === 'low').length
    }
  };
  
  return apiErrorHandler.success(data, 'AI insights generated successfully');
});

export const POST = withErrorHandling(async (request: NextRequest) => {
  const apiErrorHandler = APIErrorHandler.getInstance();
  
  const body = await request.json();
  const { campaigns, userId } = body;
  
  if (!campaigns || !Array.isArray(campaigns)) {
    return apiErrorHandler.validationError({
      campaigns: ['Campaign data is required and must be an array']
    });
  }
  
  const user = userId || 'demo-user-1';
  const insightsEngine = new AIInsightsEngine(user);
  
  // Generate insights from provided campaign data
  const insights = await insightsEngine.generateInsights(campaigns);
  
  // Save insights to database
  await insightsEngine.saveInsights(insights);
  
  const data = {
    insights,
    summary: {
      totalInsights: insights.length,
      highImpactInsights: insights.filter(i => i.impact === 'high').length,
      mediumImpactInsights: insights.filter(i => i.impact === 'medium').length,
      lowImpactInsights: insights.filter(i => i.impact === 'low').length
    }
  };
  
  return apiErrorHandler.success(data, 'AI insights processed successfully');
});
