export default function LandingPage() {
  return (
    <div dangerouslySetInnerHTML={{
      __html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ad Syntho - AI-Powered Ad Campaign Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            font-family: 'Inter', sans-serif;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }
            50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
        }
        
        .slide-in {
            animation: slideIn 0.8s ease-out;
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .feature-card {
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        .stats-counter {
            font-variant-numeric: tabular-nums;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200" x-data="{ mobileMenuOpen: false }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        A
                    </div>
                    <span class="ml-3 text-xl font-bold text-gray-900">Ad Syntho</span>
                </div>
                
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="#features" class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                        <a href="#pricing" class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                        <a href="#testimonials" class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Testimonials</a>
                        <a href="#contact" class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                    </div>
                </div>
                
                <div class="hidden md:block">
                    <button class="btn-primary text-white px-6 py-2 rounded-lg font-medium" onclick="startFreeTrial()">
                        Start Free Trial
                    </button>
                </div>
                
                <div class="md:hidden">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 hover:text-gray-900">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Mobile menu -->
        <div x-show="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" class="block px-3 py-2 text-gray-600 hover:text-gray-900">Features</a>
                <a href="#pricing" class="block px-3 py-2 text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#testimonials" class="block px-3 py-2 text-gray-600 hover:text-gray-900">Testimonials</a>
                <a href="#contact" class="block px-3 py-2 text-gray-600 hover:text-gray-900">Contact</a>
                <button class="btn-primary text-white px-6 py-2 rounded-lg font-medium w-full mt-4" onclick="startFreeTrial()">
                    Start Free Trial
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-white relative overflow-hidden">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex justify-center mb-6"><div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"><i class="fas fa-brain mr-2"></i>AI-Powered Platform</div></div><div class="floating mb-8">
                    <div class="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto">
                        <i class="fas fa-microchip text-4xl text-blue-600"></i>
                    </div>
                </div>
                
                <h1 class="text-5xl md:text-7xl font-bold leading-tight md:leading-[1.15] text-gray-900 mb-6 slide-in">
                    Unify Your
                    <span class="block gradient-text bg-white">Paid Campaigns</span>
                    with AI-Powered Insights
                </h1>
                
                <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto slide-in">
                    Connect all your ad accounts and get actionable recommendations to optimize performance, 
                    save time, and increase your return on ad spend by 25% on average.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-in">
                    <button class="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg pulse-glow" onclick="startFreeTrial()">
                        <i class="fas fa-play mr-2"></i>
                        Start Free Trial
                    </button>
                    <button class="glass-effect border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                        <i class="fas fa-video mr-2"></i>
                        Watch Demo
                    </button>
                </div>
                
                <!-- Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto slide-in">
                    <div class="text-center">
                        <div class="text-3xl md:text-4xl font-bold text-gray-900 stats-counter" x-data="{ count: 0 }" x-init="setTimeout(() => { count = 500 }, 1000)" x-text="count">0</div>
                        <div class="text-gray-500">Active Users</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl md:text-4xl font-bold text-gray-900 stats-counter" x-data="{ count: 0 }" x-init="setTimeout(() => { count = 2.5 }, 1000)" x-text="count + 'M'">0</div>
                        <div class="text-gray-500">Ad Spend Managed</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl md:text-4xl font-bold text-gray-900 stats-counter" x-data="{ count: 0 }" x-init="setTimeout(() => { count = 25 }, 1000)" x-text="count + '%'">0</div>
                        <div class="text-gray-500">ROAS Improvement</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl md:text-4xl font-bold text-gray-900 stats-counter" x-data="{ count: 0 }" x-init="setTimeout(() => { count = 10 }, 1000)" x-text="count + '+'">0</div>
                        <div class="text-gray-500">Hours Saved/Week</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Floating elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full floating" style="animation-delay: 0s;"></div>
        <div class="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full floating" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full floating" style="animation-delay: 2s;"></div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Everything You Need to
                    <span class="gradient-text">Optimize Your Ads</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our AI-powered platform provides comprehensive tools to manage, analyze, and optimize your advertising campaigns across all platforms.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="feature-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div class="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-microchip text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Unified Dashboard</h3>
                    <p class="text-gray-600 mb-4">
                        View all your campaigns across Facebook, Google Ads, and TikTok in one comprehensive dashboard with real-time data synchronization.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Real-time KPI tracking</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Cross-platform comparison</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Custom reporting</li>
                    </ul>
                </div>
                
                <div class="feature-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div class="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-brain text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">AI-Powered Insights</h3>
                    <p class="text-gray-600 mb-4">
                        Get actionable recommendations powered by advanced machine learning algorithms that analyze your campaign performance patterns.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Performance optimization</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Budget allocation</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Audience insights</li>
                    </ul>
                </div>
                
                <div class="feature-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div class="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-sync-alt text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Real-time Sync</h3>
                    <p class="text-gray-600 mb-4">
                        Automatically sync your campaign data from all connected platforms with secure OAuth 2.0 integration and real-time updates.
                    </p>
                    <ul class="text-sm text-gray-500 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Secure API connections</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Live data updates</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Error monitoring</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 gradient-bg">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your
                <span class="block">Advertising Management?</span>
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join 500+ marketing teams who are already saving time and increasing their ROAS with Ad Syntho.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg" onclick="startFreeTrial()">
                    Start Your Free Trial
                </button>
                <button class="glass-effect border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                    Schedule a Demo
                </button>
            </div>
            <p class="text-white/70 text-sm mt-4">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            A
                        </div>
                        <span class="ml-3 text-xl font-bold">Ad Syntho</span>
                    </div>
                    <p class="text-gray-400">
                        AI-powered platform for unified ad campaign management and optimization.
                    </p>
                </div>
                
                <div>
                    <h3 class="font-semibold mb-4">Product</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Integrations</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">API</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-semibold mb-4">Company</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition-colors">About</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-semibold mb-4">Support</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Ad Syntho. All rights reserved.</p>
            </div>
        </div>
    </footer>
    <script>
        function startFreeTrial() {
            // Navigate to the dashboard page
            window.location.href = "/dashboard";
        }
        
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: "smooth"
            });
        }
        
        // Add smooth scrolling for navigation links
        document.addEventListener("DOMContentLoaded", function() {
            const navLinks = document.querySelectorAll("a[href^="#"]");
            navLinks.forEach(link => {
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute("href").substring(1);
                    scrollToSection(targetId);
                });
            });
        });
    </script>
</body>
</html>
      `
    }} />
  )
}