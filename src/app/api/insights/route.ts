import { NextResponse } from 'next/server';

export async function GET() {
  // Mock AI insights data
  const insights = [
    {
      id: '1',
      type: 'optimization',
      title: 'Campaign Performance Alert',
      description: 'Your Facebook campaign CTR has dropped 15% this week.',
      impact: 'high',
      confidence: 87,
      action: 'Review ad creatives and consider A/B testing',
      timestamp: new Date().toISOString(),
      data: {
        currentCTR: 1.2,
        previousCTR: 1.4,
        platformAverage: 1.8
      }
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Budget Optimization',
      description: 'Google Ads campaign is performing 25% above average.',
      impact: 'medium',
      confidence: 92,
      action: 'Consider increasing budget allocation',
      timestamp: new Date().toISOString(),
      data: {
        currentROAS: 3.2,
        averageROAS: 2.56
      }
    }
  ];

  return NextResponse.json({ insights });
}
