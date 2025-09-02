import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

// Enhanced metadata for SEO when users land on root before redirect
export const metadata: Metadata = {
  title: 'El Eman Group | الإيمان جروب - Egypt\'s Leading Real Estate Developer',
  description: 'El Eman Group الإيمان جروب - Egypt\'s premier real estate developer since 2010. Discover luxury properties, premium developments in New Cairo, Sheikh Zayed, North Coast. Award-winning Egyptian property developer with world-class amenities and flexible payment plans.',
  keywords: [
    'El Eman Group', 'الإيمان جروب', 'El Eman Egypt', 'El Eman Developments',
    'Egyptian real estate', 'luxury properties Egypt', 'Cairo developments', 
    'New Capital properties', 'Sheikh Zayed real estate', 'North Coast properties',
    'premium Egyptian developer', 'luxury villas Egypt', 'apartments Cairo',
    'real estate investment Egypt', 'Egyptian property market', 'compound Egypt',
    'تطوير عقاري مصر', 'عقارات فاخرة مصر', 'فلل للبيع مصر', 'شقق للبيع القاهرة'
  ],
  alternates: {
    canonical: 'https://developments.elemangroup.com',
    languages: {
      'ar-EG': 'https://developments.elemangroup.com/ar',
      'en-US': 'https://developments.elemangroup.com/en',
    },
  },
  openGraph: {
    title: 'El Eman Group | الإيمان جروب - Egypt\'s Leading Real Estate Developer',
    description: 'Discover premium real estate developments across Egypt. Luxury properties in New Cairo, Sheikh Zayed, and North Coast with world-class amenities.',
    url: 'https://developments.elemangroup.com',
    siteName: 'El Eman Group',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/brand/logo_svg_ar.svg',
        width: 1200,
        height: 630,
        alt: 'El Eman Group - Egypt\'s Premier Real Estate Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Eman Group - Egypt\'s Leading Real Estate Developer',
    description: 'Premium real estate developments across Egypt. Luxury properties with world-class amenities.',
    images: ['/images/brand/logo_svg_ar.svg'],
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
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Egypt',
    'target-country': 'EG',
    'language': 'ar,en',
  }
};

// Root page - redirects to Arabic (default locale for Egyptian market)
export default function RootPage(): never {
  // Immediate redirect to Arabic homepage
  // This handles any direct access to root domain
  redirect('/ar');
}
