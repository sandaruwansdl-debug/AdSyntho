export default function LandingPage() {
  return (
    <html>
      <head>
        <title>Ad Syntho - AI-Powered Ad Campaign Management</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          * { font-family: 'Inter', sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); }
          .gradient-text { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .floating { animation: floating 3s ease-in-out infinite; }
          @keyframes floating { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
          .btn-primary { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); transition: all 0.3s ease; }
          .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }
        `}</style>
      </head>
      <body className="bg-gray-50">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">A</div>
                <span className="ml-3 text-xl font-bold text-gray-900">Ad Syntho</span>
              </div>
              <div className="hidden md:block">
                <button className="btn-primary text-white px-6 py-2 rounded-lg font-medium" onClick={() => window.location.href = '/dashboard'}>
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-white relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <i className="fas fa-brain mr-2"></i>AI-Powered Platform
                </div>
              </div>
              <div className="floating mb-8">
                <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto">
                  <i className="fas fa-microchip text-4xl text-blue-600"></i>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight md:leading-[1.15] text-gray-900 mb-6">
                Unify Your
                <span className="block gradient-text">Paid Campaigns</span>
                with AI-Powered Insights
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Connect all your ad accounts and get actionable recommendations to optimize performance, 
                save time, and increase your return on ad spend by 25% on average.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg" onClick={() => window.location.href = '/dashboard'}>
                  <i className="fas fa-play mr-2"></i>
                  Start Free Trial
                </button>
                <button className="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all">
                  <i className="fas fa-video mr-2"></i>
                  Watch Demo
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">$2.5M</div>
                  <div className="text-gray-500">Ad Spend Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">25%</div>
                  <div className="text-gray-500">ROAS Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">10+</div>
                  <div className="text-gray-500">Hours Saved/Week</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to
                <span className="gradient-text">Optimize Your Ads</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI-powered platform provides comprehensive tools to manage, analyze, and optimize your advertising campaigns across all platforms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                  <i className="fas fa-microchip text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Unified Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  View all your campaigns across Facebook, Google Ads, and TikTok in one comprehensive dashboard with real-time data synchronization.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                  <i className="fas fa-brain text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Insights</h3>
                <p className="text-gray-600 mb-4">
                  Get actionable recommendations powered by advanced machine learning algorithms that analyze your campaign performance patterns.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                  <i className="fas fa-sync-alt text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Sync</h3>
                <p className="text-gray-600 mb-4">
                  Automatically sync your campaign data from all connected platforms with secure OAuth 2.0 integration and real-time updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block">Advertising Management?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 500+ marketing teams who are already saving time and increasing their ROAS with Ad Syntho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg" onClick={() => window.location.href = '/dashboard'}>
                Start Your Free Trial
              </button>
              <button className="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all">
                Schedule a Demo
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4">14-day free trial • No credit card required • Cancel anytime</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">A</div>
                  <span className="ml-3 text-xl font-bold">Ad Syntho</span>
                </div>
                <p className="text-gray-400">
                  AI-powered platform for unified ad campaign management and optimization.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Ad Syntho. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}