import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

// Metadata for SEO when users land on root before redirect
export const metadata: Metadata = {
  title: 'El Eman Group | الإيمان جروب - Egypt\'s Leading Real Estate Developer',
  description: 'El Eman Group الإيمان جروب - Egypt\'s premier real estate developer. Luxury properties, premium developments in Cairo, New Capital, North Coast. Leading Egyptian property developer.',
  keywords: 'El Eman Group, الإيمان جروب, El Eman Egypt, Egyptian real estate, luxury properties Egypt, Cairo developments, New Capital properties, North Coast real estate, premium Egyptian developer',
  alternates: {
    canonical: 'https://developments.elemangroup.com',
    languages: {
      'ar-EG': '/ar',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'El Eman Group | الإيمان جروب - Egypt\'s Leading Real Estate Developer',
    description: 'El Eman Group - Premium real estate developments across Egypt. Luxury properties in Cairo, New Capital, and North Coast.',
    url: 'https://developments.elemangroup.com',
    siteName: 'El Eman Group',
    locale: 'ar_EG',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Root page - redirects to Arabic (default locale for Egyptian market)
export default function RootPage(): never {
  // Immediate redirect to Arabic homepage
  // This handles any direct access to root domain
  redirect('/ar');
}
