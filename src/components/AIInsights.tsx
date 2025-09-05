import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LightBulbIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Insight {
  id: string;
  type: 'optimization' | 'opportunity' | 'alert' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action: string;
  timestamp: Date;
  data?: any;
}

interface AIInsightsProps {
  campaignId?: string;
  platform?: string;
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'optimization',
    title: 'Campaign Performance Alert',
    description: 'Your Facebook campaign "Summer Sale 2024" has shown a 15% decrease in CTR over the last 7 days. This is below the platform average.',
    impact: 'high',
    confidence: 87,
    action: 'Review ad creatives and consider A/B testing new variations',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    data: {
      currentCTR: 1.2,
      previousCTR: 1.4,
      platformAverage: 1.8,
      trend: 'declining'
    }
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Budget Optimization Opportunity',
    description: 'Google Ads campaign "Brand Keywords" is performing 25% above average with a ROAS of 3.2x. Consider increasing budget allocation.',
    impact: 'medium',
    confidence: 92,
    action: 'Increase daily budget by 20% and monitor performance',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    data: {
      currentROAS: 3.2,
      averageROAS: 2.56,
      budgetUtilization: 85,
      recommendation: 'increase_budget'
    }
  }
];

export default function AIInsights({ campaignId, platform }: AIInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [filter, setFilter] = useState<'all' | 'optimization' | 'opportunity' | 'alert' | 'trend'>('all');

  useEffect(() => {
    setTimeout(() => {
      setInsights(mockInsights);
      setLoading(false);
    }, 1000);
  }, [campaignId, platform]);

  const filteredInsights = insights.filter(insight => 
    filter === 'all' || insight.type === filter
  );

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <ChartBarIcon className="h-5 w-5" />;
      case 'opportunity': return <ArrowTrendingUpIcon className="h-5 w-5" />;
      case 'alert': return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'trend': return <InformationCircleIcon className="h-5 w-5" />;
      default: return <LightBulbIcon className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-blue-100 text-blue-600';
      case 'opportunity': return 'bg-green-100 text-green-600';
      case 'alert': return 'bg-red-100 text-red-600';
      case 'trend': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
            <LightBulbIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
            <p className="text-sm text-gray-500">
              {insights.length} actionable recommendations based on your data
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="input-field w-auto text-sm"
          >
            <option value="all">All Types</option>
            <option value="optimization">Optimization</option>
            <option value="opportunity">Opportunity</option>
            <option value="alert">Alert</option>
            <option value="trend">Trend</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedInsight(insight)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(insight.type)}`}>
                  {getTypeIcon(insight.type)}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                  {insight.impact} impact
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {insight.confidence}% confidence
                </div>
                <div className="text-xs text-gray-400 flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {insight.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-600 font-medium">
                {insight.action}
              </span>
              <span className="text-xs text-gray-400">
                {Math.floor((Date.now() - insight.timestamp.getTime()) / (1000 * 60 * 60))}h ago
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
