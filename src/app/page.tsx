import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

// Metadata for SEO when users land on root before redirect
export const metadata: Metadata = {
  title: 'El Eman Developments | الإيمان للتطوير العقاري',
  description: 'Premium real estate projects in Egypt | مشاريع عقارية متميزة في مصر',
  alternates: {
    languages: {
      'ar-EG': '/ar',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'El Eman Developments | الإيمان للتطوير العقاري',
    description: 'Where Belief Takes Shape | حيث يتشكل الإيمان',
    url: 'https://developments.elemangroup.com',
    siteName: 'El Eman Developments',
    locale: 'ar_EG',
    type: 'website',
  },
};

// Root page - redirects to Arabic (default locale for Egyptian market)
export default function RootPage() {
  // Immediate redirect to Arabic homepage
  // This handles any direct access to root domain
  redirect('/ar');
}
