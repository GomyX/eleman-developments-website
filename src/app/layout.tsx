import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'El Eman Developments | الإيمان للتطوير العقاري',
  description: 'Premium real estate projects in Egypt | مشاريع عقارية متميزة في مصر',
  keywords: 'real estate Egypt, عقارات مصر, El Eman Developments, الإيمان للتطوير',
  authors: [{ name: 'El Eman Developments' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://developments.elemangroup.com',
    languages: {
      ar: 'https://developments.elemangroup.com/ar',
      en: 'https://developments.elemangroup.com/en'
    }
  },
  openGraph: {
    type: 'website',
    siteName: 'El Eman Developments',
    images: ['/images/brand/logo_png.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#E29578" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}