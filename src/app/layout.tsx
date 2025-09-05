import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ad Syntho - AI-Powered Campaign Dashboard',
  description: 'Unify your paid campaigns with AI-powered insights and actionable recommendations',
  keywords: ['advertising', 'dashboard', 'AI', 'campaigns', 'marketing', 'analytics'],
  authors: [{ name: 'Ad Syntho Team' }],
  creator: 'Ad Syntho',
  publisher: 'Ad Syntho',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://adsyntho.com'),
  openGraph: {
    title: 'Ad Syntho - AI-Powered Campaign Dashboard',
    description: 'Unify your paid campaigns with AI-powered insights and actionable recommendations',
    url: 'https://adsyntho.com',
    siteName: 'Ad Syntho',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ad Syntho Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ad Syntho - AI-Powered Campaign Dashboard',
    description: 'Unify your paid campaigns with AI-powered insights and actionable recommendations',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}