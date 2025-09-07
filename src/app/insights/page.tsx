'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const dynamic = 'force-dynamic';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/DashboardLayout';

interface Insight {
  id: string;
  type: 'optimization' | 'opportunity' | 'alert' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action: string;
  isRead: boolean;
  isApplied: boolean;
  createdAt: string;
  data?: any;
  campaign?: {
    campaignName: string;
    platform: string;
  };
}

export default function InsightsPage() {
  const { data: session } = useSession();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'optimization' | 'opportunity' | 'alert' | 'trend'>('all');
  const [impactFilter, setImpactFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    if (session) {
      fetchInsights();
    }
  }, [session]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/insights');
      const data = await response.json();
      
      if (response.ok) {
        setInsights(data.insights);
      } else {
        console.error('Failed to fetch insights:', data.error);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (insightId: string) => {
    try {
      const response = await fetch(`/api/insights/${insightId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        setInsights(prev => prev.map(insight => 
          insight.id === insightId ? { ...insight, isRead: true } : insight
        ));
      }
    } catch (error) {
      console.error('Error marking insight as read:', error);
    }
  };

  const markAsApplied = async (insightId: string) => {
    try {
      const response = await fetch(`/api/insights/${insightId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApplied: true }),
      });

      if (response.ok) {
        setInsights(prev => prev.map(insight => 
          insight.id === insightId ? { ...insight, isApplied: true } : insight
        ));
      }
    } catch (error) {
      console.error('Error marking insight as applied:', error);
    }
  };

  const filteredInsights = insights.filter(insight => {
    const typeMatch = filter === 'all' || insight.type === filter;
    const impactMatch = impactFilter === 'all' || insight.impact === impactFilter;
    return typeMatch && impactMatch;
  });

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

  const unreadCount = insights.filter(insight => !insight.isRead).length;
  const highImpactCount = insights.filter(insight => insight.impact === 'high').length;

  if (loading) {
    return (
      <DashboardLayout currentPage="/insights">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="/insights">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            <p className="text-gray-600">Actionable recommendations powered by AI</p>
          </div>
          <button 
            onClick={fetchInsights}
            className="btn-secondary"
          >
            Refresh Insights
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Insights</p>
                <p className="text-2xl font-bold text-gray-900">{insights.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <LightBulbIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Impact</p>
                <p className="text-2xl font-bold text-gray-900">{highImpactCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="input-field w-auto"
            >
              <option value="all">All Types</option>
              <option value="optimization">Optimization</option>
              <option value="opportunity">Opportunity</option>
              <option value="alert">Alert</option>
              <option value="trend">Trend</option>
            </select>
            <select
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value as any)}
              className="input-field w-auto"
            >
              <option value="all">All Impact Levels</option>
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
          </div>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`card ${!insight.isRead ? 'border-l-4 border-l-primary-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(insight.type)}`}>
                    {getTypeIcon(insight.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    {insight.campaign && (
                      <p className="text-sm text-gray-500">
                        {insight.campaign.campaignName} • {insight.campaign.platform}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                    {insight.impact} impact
                  </span>
                  <span className="text-sm text-gray-500">
                    {insight.confidence}% confidence
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{insight.description}</p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Recommended Action:</h4>
                <p className="text-gray-700">{insight.action}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {new Date(insight.createdAt).toLocaleDateString()} at{' '}
                    {new Date(insight.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {!insight.isRead && (
                    <button
                      onClick={() => markAsRead(insight.id)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Mark as Read
                    </button>
                  )}
                  {!insight.isApplied && (
                    <button
                      onClick={() => markAsApplied(insight.id)}
                      className="btn-primary text-sm"
                    >
                      Apply Recommendation
                    </button>
                  )}
                  {insight.isApplied && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      Applied
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredInsights.length === 0 && (
          <div className="text-center py-12">
            <LightBulbIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No insights found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter !== 'all' || impactFilter !== 'all'
                ? 'Try adjusting your filters to see more insights.'
                : 'Connect your ad accounts to start receiving AI-powered insights.'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
