import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/routing';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' 
      ? 'الإيمان للتطوير العقاري | مشاريع عقارية متميزة'
      : 'El Eman Developments | Premium Real Estate Projects',
    description: locale === 'ar'
      ? 'شركة الإيمان للتطوير العقاري - مشاريع سكنية واستثمارية متميزة في مصر'
      : 'El Eman Developments - Premium residential and investment projects in Egypt',
    keywords: locale === 'ar'
      ? 'عقارات مصر, الإيمان للتطوير, شقق للبيع, فيلا, استثمار عقاري'
      : 'Egypt real estate, El Eman Developments, apartments for sale, villas, property investment',
    alternates: {
      languages: {
        ar: '/ar',
        en: '/en'
      }
    },
    openGraph: {
      title: locale === 'ar' 
        ? 'الإيمان للتطوير العقاري'
        : 'El Eman Developments',
      description: locale === 'ar'
        ? 'مشاريع عقارية متميزة في مصر'
        : 'Premium real estate projects in Egypt',
      locale: locale,
      alternateLocale: locale === 'ar' ? 'en' : 'ar'
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'ar' | 'en')) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();
  
  return (
    <div 
      className={`min-h-screen flex flex-col ${
        locale === 'ar' ? 'font-arabic text-right' : 'font-sans text-left'
      }`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      lang={locale}
    >
      <NextIntlClientProvider messages={messages}>
        <Navigation />
        <main className="flex-grow bg-gradient-to-br from-sand/10 to-white">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}

