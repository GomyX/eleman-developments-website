import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_Arabic, Montserrat } from 'next/font/google';

// Optimized font loading
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-arabic',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-latin',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://developments.elemangroup.com'),
  title: {
    template: '%s | El Eman Developments | الإيمان للتطوير العقاري',
    default: 'El Eman Developments | الإيمان للتطوير العقاري - Premium Real Estate Egypt'
  },
  description: 'El Eman Developments الإيمان للتطوير العقاري - Egypt\'s premier real estate developer. Luxury properties in New Cairo, Sheikh Zayed, North Coast. Premium developments, villas, apartments with world-class amenities.',
  keywords: [
    'El Eman Developments', 'الإيمان للتطوير العقاري',
    'Egypt real estate', 'عقارات مصر', 'luxury properties Egypt',
    'New Cairo developments', 'Sheikh Zayed properties', 'North Coast real estate',
    'Egyptian property developer', 'premium developments Egypt',
    'villas Egypt', 'apartments Cairo', 'luxury compounds Egypt'
  ],
  authors: [{ name: 'El Eman Developments', url: 'https://developments.elemangroup.com' }],
  creator: 'El Eman Developments',
  publisher: 'El Eman Group',
  category: 'Real Estate Development',
  classification: 'Business',
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
  alternates: {
    canonical: 'https://developments.elemangroup.com',
    languages: {
      'ar-EG': 'https://developments.elemangroup.com/ar',
      'en-US': 'https://developments.elemangroup.com/en'
    }
  },
  openGraph: {
    type: 'website',
    siteName: 'El Eman Developments | الإيمان للتطوير العقاري',
    title: 'El Eman Developments | Egypt\'s Premier Real Estate Developer',
    description: 'Discover premium real estate developments across Egypt. Luxury villas, apartments, and compounds in New Cairo, Sheikh Zayed, and North Coast.',
    url: 'https://developments.elemangroup.com',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    images: [
      {
        url: '/images/brand/logo_png.png',
        width: 1200,
        height: 630,
        alt: 'El Eman Developments Logo',
        type: 'image/png',
      }
    ],
    countryName: 'Egypt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Eman Developments | Egypt\'s Premier Real Estate Developer',
    description: 'Premium real estate developments across Egypt. Luxury properties in Cairo, Sheikh Zayed, North Coast.',
    images: ['/images/brand/logo_png.png'],
    creator: '@elemangroup',
    site: '@elemangroup',
  },
  other: {
    'geo.region': 'EG-C',
    'geo.placename': 'Cairo, Egypt',
    'geo.position': '30.0444;31.2357',
    'ICBM': '30.0444, 31.2357',
    'language': 'ar,en',
    'target-country': 'EG',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E29578' },
    { media: '(prefers-color-scheme: dark)', color: '#006D77' }
  ]
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "El Eman Developments",
  "alternateName": "الإيمان للتطوير العقاري",
  "url": "https://developments.elemangroup.com",
  "logo": "https://developments.elemangroup.com/images/brand/logo_png.png",
  "description": "Egypt's premier real estate developer specializing in luxury properties and premium developments",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "EG",
    "addressLocality": "Cairo",
    "addressRegion": "Cairo Governorate"
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "New Cairo"
    },
    {
      "@type": "Place", 
      "name": "Sheikh Zayed"
    },
    {
      "@type": "Place",
      "name": "North Coast"
    }
  ],
  "serviceType": "Real Estate Development",
  "priceRange": "$$$$"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={`${notoSansArabic.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/brand/logo_png.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`antialiased bg-white text-gray-900 font-arabic`}>
        {children}
      </body>
    </html>
  );
}