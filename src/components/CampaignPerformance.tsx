import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ChartBarIcon, 
  EyeIcon, 
  CursorArrowRaysIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

interface CampaignData {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'completed';
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

const mockCampaigns: CampaignData[] = [
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
    roas: 2.5
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
    roas: 2.47
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
    roas: 2.53
  }
];

const performanceData = [
  { date: 'Mon', spend: 800, revenue: 2000, roas: 2.5 },
  { date: 'Tue', spend: 750, revenue: 1850, roas: 2.47 },
  { date: 'Wed', spend: 900, revenue: 2200, roas: 2.44 },
  { date: 'Thu', spend: 850, revenue: 2100, roas: 2.47 },
  { date: 'Fri', spend: 950, revenue: 2350, roas: 2.47 },
  { date: 'Sat', spend: 700, revenue: 1750, roas: 2.5 },
  { date: 'Sun', spend: 650, revenue: 1600, roas: 2.46 }
];

const platformData = [
  { name: 'Facebook', value: 45, color: '#1877F2' },
  { name: 'Google Ads', value: 35, color: '#4285F4' },
  { name: 'TikTok', value: 20, color: '#000000' }
];

export default function CampaignPerformance() {
  const [selectedMetric, setSelectedMetric] = useState('roas');
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const totalSpend = mockCampaigns.reduce((sum, campaign) => sum + campaign.spend, 0);
  const totalRevenue = mockCampaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const totalImpressions = mockCampaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = mockCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalConversions = mockCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const avgROAS = totalRevenue / totalSpend;
  const avgCTR = (totalClicks / totalImpressions) * 100;
  const avgCPC = totalSpend / totalClicks;
  const avgCPA = totalSpend / totalConversions;

  const metrics = [
    {
      label: 'Total Spend',
      value: `$${totalSpend.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: CurrencyDollarIcon
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+18.2%',
      changeType: 'positive',
      icon: ShoppingCartIcon
    },
    {
      label: 'Avg ROAS',
      value: `${avgROAS.toFixed(2)}x`,
      change: '+8.3%',
      changeType: 'positive',
      icon: ChartBarIcon
    },
    {
      label: 'Avg CTR',
      value: `${avgCTR.toFixed(2)}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: CursorArrowRaysIcon
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <metric.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="input-field w-auto text-sm"
            >
              <option value="roas">ROAS</option>
              <option value="spend">Spend</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Campaigns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROAS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.platform}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${campaign.spend.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${campaign.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.roas.toFixed(2)}x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.ctr.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
