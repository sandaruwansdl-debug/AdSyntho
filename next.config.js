/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'adsyntho.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  trailingSlash: false,
}

module.exports = nextConfig
