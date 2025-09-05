'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChartBarIcon, UserCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    // Simulate demo login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect directly to dashboard - no authentication needed
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <ChartBarIcon className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Demo Mode
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Experience Ad Syntho with demo data - No password required!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white py-8 px-6 shadow-lg rounded-lg"
        >
          <div className="text-center mb-6">
            <UserCircleIcon className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Demo User</h3>
            <p className="text-sm text-gray-500">demo@adsyntho.com</p>
            <p className="text-xs text-green-600 mt-1">✓ No password required</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">What you'll see:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Sample campaigns from Facebook, Google, and TikTok</li>
                <li>• AI-powered insights and recommendations</li>
                <li>• Performance metrics and analytics</li>
                <li>• Account connection interface</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading Demo...
              </>
            ) : (
              <>
                Enter Demo Mode
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              This is a demo - no real authentication required!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}