'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';

const platforms = [
  {
    id: 'facebook',
    name: 'Facebook Ads',
    description: 'Connect your Facebook Ads account to sync campaigns, ads, and performance data.',
    icon: '📘',
    color: '#1877F2',
    status: 'connected'
  },
  {
    id: 'google',
    name: 'Google Ads',
    description: 'Sync your Google Ads campaigns, keywords, and conversion data.',
    icon: '🔍',
    color: '#4285F4',
    status: 'pending'
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads',
    description: 'Connect TikTok Ads to monitor video performance and audience insights.',
    icon: '🎵',
    color: '#000000',
    status: 'disconnected'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    description: 'Sync LinkedIn campaign data for B2B marketing insights.',
    icon: '💼',
    color: '#0A66C2',
    status: 'disconnected'
  },
  {
    id: 'twitter',
    name: 'Twitter Ads',
    description: 'Connect Twitter Ads for social media campaign monitoring.',
    icon: '🐦',
    color: '#1DA1F2',
    status: 'disconnected'
  },
  {
    id: 'snapchat',
    name: 'Snapchat Ads',
    description: 'Sync Snapchat campaign data for mobile-first audience insights.',
    icon: '👻',
    color: '#FFFC00',
    status: 'disconnected'
  }
];

export default function ConnectAccountsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (platformId: string) => {
    setIsConnecting(true);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnecting(false);
    setSelectedPlatform(platformId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Connected
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <InformationCircleIcon className="h-3 w-3 mr-1" />
            Not Connected
          </span>
        );
    }
  };

  return (
    <DashboardLayout currentPage="/connect-accounts">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Connect Your Advertising Accounts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your ad accounts to start getting unified insights, AI-powered recommendations, 
            and comprehensive campaign performance analysis.
          </p>
        </div>

        {/* Connection Status Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Connection Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-gray-600">Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">4</div>
              <div className="text-sm text-gray-600">Not Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">6</div>
              <div className="text-sm text-gray-600">Total Platforms</div>
            </div>
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${platform.color}20` }}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    {getStatusBadge(platform.status)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{platform.description}</p>
              
              {platform.status === 'connected' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Sync:</span>
                    <span className="text-gray-900">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Campaigns:</span>
                    <span className="text-gray-900">12 active</span>
                  </div>
                  <button className="w-full btn-secondary text-sm">
                    Manage Connection
                  </button>
                </div>
              ) : platform.status === 'pending' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-yellow-600">Awaiting approval</span>
                  </div>
                  <button className="w-full btn-secondary text-sm">
                    Check Status
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleConnect(platform.id)}
                  disabled={isConnecting}
                  className="w-full btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Account'}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Connect Multiple Accounts?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unified Reporting</h3>
              <p className="text-gray-600 text-sm">
                View all your campaigns in one dashboard with consistent metrics and KPIs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cross-Platform Insights</h3>
              <p className="text-gray-600 text-sm">
                Compare performance across platforms and identify optimization opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Optimization</h3>
              <p className="text-gray-600 text-sm">
                Get intelligent recommendations based on data from all connected accounts.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Need help connecting your accounts? Our team is here to assist you.
          </p>
          <button className="btn-secondary">
            Contact Support
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
