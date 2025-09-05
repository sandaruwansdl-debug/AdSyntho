'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Insight {
  type: 'optimization' | 'opportunity' | 'alert' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action: string;
  data?: any;
}

interface AIInsightsData {
  insights: Insight[];
  summary: {
    totalCampaigns: number;
    totalSpend: number;
    totalRevenue: number;
    avgROAS: number;
    highImpactInsights: number;
    mediumImpactInsights: number;
    lowImpactInsights: number;
  };
}

export default function EnhancedAIInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [summary, setSummary] = useState<AIInsightsData['summary'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ai-insights');
      const data = await response.json();
      
      if (data.success) {
        setInsights(data.insights);
        setSummary(data.summary);
      } else {
        setError(data.error || 'Failed to fetch AI insights');
      }
    } catch (err) {
      setError('Failed to connect to AI insights service');
      console.error('Error fetching AI insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'opportunity':
        return <ArrowTrendingUpIcon className="h-5 w-5" />;
      case 'optimization':
        return <ChartBarIcon className="h-5 w-5" />;
      case 'trend':
        return <ArrowTrendingDownIcon className="h-5 w-5" />;
      default:
        return <LightBulbIcon className="h-5 w-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-red-500 bg-red-50 text-red-800';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'low':
        return 'border-blue-500 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredInsights = (insights || []).filter(insight => {
    if (selectedFilter === 'all') return true;
    return insight.impact === selectedFilter;
  });

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating AI insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Insights</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchAIInsights}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <SparklesIcon className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Total Insights</p>
            <p className="text-2xl font-bold text-gray-900">{insights?.length || 0}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">High Impact</p>
            <p className="text-2xl font-bold text-red-600">{summary.highImpactInsights}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <ArrowTrendingUpIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Medium Impact</p>
            <p className="text-2xl font-bold text-yellow-600">{summary.mediumImpactInsights}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Low Impact</p>
            <p className="text-2xl font-bold text-blue-600">{summary.lowImpactInsights}</p>
          </motion.div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
          AI-Powered Insights & Recommendations
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as any)}
            className="input-field w-auto text-sm"
          >
            <option value="all">All Insights</option>
            <option value="high">High Impact</option>
            <option value="medium">Medium Impact</option>
            <option value="low">Low Impact</option>
          </select>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <div className="card text-center py-12">
            <LightBulbIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Insights Found</h3>
            <p className="text-gray-600">Try adjusting your filter or check back later for new insights.</p>
          </div>
        ) : (
          filteredInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card border-l-4 ${getImpactColor(insight.impact)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                        {insight.impact} impact
                      </span>
                      <span className={`text-xs ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  Just now
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{insight.description}</p>
              
              <div className="bg-white/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">Recommended Action:</p>
                <p className="text-sm text-gray-700">{insight.action}</p>
              </div>
              
              {insight.data && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <details className="text-sm">
                    <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                      View Technical Details
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(insight.data, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <div className="text-center pt-4">
        <button 
          onClick={fetchAIInsights}
          className="btn-primary flex items-center mx-auto"
        >
          <SparklesIcon className="h-5 w-5 mr-2" />
          Refresh AI Insights
        </button>
      </div>
    </div>
  );
}
