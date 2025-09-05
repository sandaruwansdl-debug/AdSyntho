// Demo data for Ad Syntho Dashboard
// This file contains sample data to demonstrate the system capabilities

export const demoCampaigns = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    platform: 'Facebook',
    status: 'active',
    spend: 2500,
    impressions: 125000,
    clicks: 2500,
    conversions: 125,
    revenue: 6250,
    ctr: 2.0,
    cpc: 1.0,
    cpa: 20.0,
    roas: 2.5,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    targetAudience: '18-45, Interest in fashion',
    adCreatives: ['Creative A', 'Creative B', 'Creative C']
  },
  {
    id: '2',
    name: 'Brand Awareness Q2',
    platform: 'Google Ads',
    status: 'active',
    spend: 1800,
    impressions: 89000,
    clicks: 1780,
    conversions: 89,
    revenue: 4450,
    ctr: 2.0,
    cpc: 1.01,
    cpa: 20.2,
    roas: 2.47,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    targetAudience: 'Search intent, Brand keywords',
    adCreatives: ['Text Ad 1', 'Text Ad 2']
  },
  {
    id: '3',
    name: 'Product Launch',
    platform: 'TikTok',
    status: 'active',
    spend: 1200,
    impressions: 95000,
    clicks: 1900,
    conversions: 76,
    revenue: 3040,
    ctr: 2.0,
    cpc: 0.63,
    cpa: 15.8,
    roas: 2.53,
    startDate: '2024-05-15',
    endDate: '2024-07-15',
    targetAudience: 'Gen Z, 18-24, Creative content',
    adCreatives: ['Creative A', 'Creative B', 'Creative C']
  }
];

export const demoAIInsights = [
  {
    id: '1',
    type: 'optimization',
    title: 'Campaign Performance Alert',
    description: 'Your Facebook campaign "Summer Sale 2024" has shown a 15% decrease in CTR over the last 7 days. This is below the platform average and indicates potential ad fatigue.',
    impact: 'high',
    confidence: 87,
    action: 'Review ad creatives and consider A/B testing new variations',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    data: {
      currentCTR: 1.2,
      previousCTR: 1.4,
      platformAverage: 1.8,
      trend: 'declining',
      recommendation: 'refresh_creatives'
    }
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Budget Optimization Opportunity',
    description: 'Google Ads campaign "Brand Keywords" is performing 25% above average with a ROAS of 3.2x. Consider increasing budget allocation to capitalize on this performance.',
    impact: 'medium',
    confidence: 92,
    action: 'Increase daily budget by 20% and monitor performance',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    data: {
      currentROAS: 3.2,
      averageROAS: 2.56,
      budgetUtilization: 85,
      recommendation: 'increase_budget',
      potentialRevenue: 5340
    }
  }
];

export const demoPerformanceData = {
  daily: [
    { date: '2024-06-01', spend: 800, revenue: 2000, roas: 2.5, impressions: 40000, clicks: 800 },
    { date: '2024-06-02', spend: 750, revenue: 1850, roas: 2.47, impressions: 37500, clicks: 750 },
    { date: '2024-06-03', spend: 900, revenue: 2200, roas: 2.44, impressions: 45000, clicks: 900 },
    { date: '2024-06-04', spend: 850, revenue: 2100, roas: 2.47, impressions: 42500, clicks: 850 },
    { date: '2024-06-05', spend: 950, revenue: 2350, roas: 2.47, impressions: 47500, clicks: 950 },
    { date: '2024-06-06', spend: 700, revenue: 1750, roas: 2.5, impressions: 35000, clicks: 700 },
    { date: '2024-06-07', spend: 650, revenue: 1600, roas: 2.46, impressions: 32500, clicks: 650 }
  ]
};

export const demoPlatformData = [
  { name: 'Facebook', value: 45, color: '#1877F2', spend: 11250, revenue: 28125, roas: 2.5 },
  { name: 'Google Ads', value: 35, color: '#4285F4', spend: 8750, revenue: 21875, roas: 2.5 },
  { name: 'TikTok', value: 20, color: '#000000', spend: 5000, revenue: 12500, roas: 2.5 }
];
