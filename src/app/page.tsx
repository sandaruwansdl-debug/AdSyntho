'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  LightBulbIcon, 
  CogIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleGetStarted = () => {
    // Direct access to dashboard - no authentication
    router.push('/dashboard-direct');
  };

  const handleStartTrial = () => {
    if (email) {
      // In production, this would handle email signup
      console.log('Email signup:', email);
      router.push('/dashboard-direct');
    } else {
      // Direct access to dashboard
      router.push('/dashboard-direct');
    }
  };

  const features = [
    {
      icon: ChartBarIcon,
      title: 'Unified Dashboard',
      description: 'Connect all your ad accounts and view performance in one place'
    },
    {
      icon: LightBulbIcon,
      title: 'AI-Powered Insights',
      description: 'Get actionable recommendations to optimize your campaigns'
    },
    {
      icon: CogIcon,
      title: 'Smart Automation',
      description: 'Automate routine tasks and focus on strategy'
    }
  ];

  const benefits = [
    'Save 10+ hours per week on campaign analysis',
    'Increase ROAS by 25% with AI insights',
    'Connect unlimited ad accounts',
    'Real-time performance monitoring'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <Head>
        <title>Ad Syntho - AI-Powered Campaign Dashboard</title>
        <meta name="description" content="Unify your paid campaigns with AI-powered insights and actionable recommendations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Ad Syntho</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
              <button onClick={handleGetStarted} className="btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Unify Your
              <span className="text-primary-600"> Paid Campaigns</span>
              <br />
              with AI-Powered Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect all your ad accounts and get actionable recommendations to optimize performance, 
              save time, and increase your return on ad spend.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field max-w-md"
              />
              <button onClick={handleStartTrial} className="btn-primary flex items-center">
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                14-day free trial
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to scale your campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From unified reporting to AI-powered optimization, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why marketers choose Ad Syntho
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleGetStarted} className="btn-primary mt-8">Learn More</button>
            </div>
            <div className="relative">
              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <StarIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Recommendation</h4>
                    <p className="text-sm text-gray-500">Based on your campaign data</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Your Facebook campaign CTR is 15% below average. Consider testing new ad creatives 
                  and adjusting your targeting to improve engagement."
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Generated 2 hours ago</span>
                  <span className="text-primary-600">View Details →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your campaigns?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of marketers who are already saving time and improving performance.
          </p>
          <button onClick={handleStartTrial} className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">Ad Syntho</span>
              </div>
              <p className="text-gray-400">
                AI-powered dashboard for unified campaign management and optimization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ad Syntho. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
