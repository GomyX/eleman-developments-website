import { Metadata } from 'next';
import ContactClient from './ContactClient';

export function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' }
  ];
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  try {
    const { locale } = await params;
    
    // Base URL for absolute URLs
    const baseUrl = 'https://developments.elemangroup.com';
    const currentPath = `/${locale}/contact`;
    const canonicalUrl = `${baseUrl}${currentPath}`;
    
    const metadata = {
      ar: {
        title: 'تواصل معنا | الإيمان للتطوير العقاري - استشارات عقارية مجانية',
        description: 'تواصل مع خبراء الإيمان للتطوير العقاري للحصول على استشارة مجانية. خدمة عملاء متميزة، مواعيد مرنة، واستشارات عقارية شاملة في مصر.',
        keywords: 'تواصل الإيمان للتطوير, استشارة عقارية مجانية, خدمة عملاء عقارية, مواعيد معاينة عقارية, الإيمان العقارية مصر, تواصل مطورين عقاريين, الريف الأوروبي مكتب, 6 أكتوبر عقارات',
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
          },
        },
        openGraph: {
          title: 'تواصل معنا | الإيمان للتطوير العقاري - استشارات عقارية مجانية',
          description: 'فريقنا من الخبراء العقاريين جاهز لتقديم الاستشارة المجانية ومساعدتك في العثور على العقار المثالي. خدمة متميزة وثقة راسخة منذ عقود.',
          url: canonicalUrl,
          siteName: 'الإيمان للتطوير العقاري',
          locale: 'ar_EG',
          type: 'website',
          images: [
            {
              url: `${baseUrl}/images/properties/villa-2.jpg`,
              width: 1200,
              height: 630,
              alt: 'تواصل مع الإيمان للتطوير العقاري',
            },
            {
              url: `${baseUrl}/images/brand/logo_svg_ar.svg`,
              width: 800,
              height: 600,
              alt: 'شعار الإيمان للتطوير العقاري',
            }
          ],
        },
        twitter: {
          card: 'summary_large_image',
          site: '@elemangroup',
          creator: '@elemangroup',
          title: 'تواصل معنا | الإيمان للتطوير العقاري',
          description: 'استشارات عقارية مجانية من خبراء الإيمان للتطوير العقاري',
          images: [`${baseUrl}/images/properties/villa-2.jpg`],
        },
        alternates: {
          canonical: canonicalUrl,
          languages: {
            'ar-EG': `${baseUrl}/ar/contact`,
            'en-US': `${baseUrl}/en/contact`,
          },
        },
        other: {
          'geo.region': 'EG-C',
          'geo.placename': 'Cairo',
          'geo.position': '30.0444;31.2357',
          'ICBM': '30.0444, 31.2357',
          'business:contact_data:street_address': 'الريف الأوروبي، الشيخ زايد',
          'business:contact_data:locality': 'الجيزة',
          'business:contact_data:region': 'الجيزة',
          'business:contact_data:postal_code': '12588',
          'business:contact_data:country_name': 'مصر',
          'business:contact_data:phone_number': '+201234567890',
          'business:contact_data:website': baseUrl,
        },
      },
      en: {
        title: 'Contact Us | El Eman Developments - Free Real Estate Consultation',
        description: 'Contact El Eman Developments experts for free consultation. Premium customer service, flexible appointments, and comprehensive real estate advisory in Egypt.',
        keywords: 'el eman developments contact, free real estate consultation, property customer service, real estate appointments, eman real estate egypt, contact developers, european countryside office, 6 october properties',
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
          },
        },
        openGraph: {
          title: 'Contact Us | El Eman Developments - Free Real Estate Consultation',
          description: 'Our team of real estate experts is ready to provide free consultation and help you find the perfect property. Premium service with decades of trust.',
          url: canonicalUrl,
          siteName: 'El Eman Developments',
          locale: 'en_US',
          type: 'website',
          images: [
            {
              url: `${baseUrl}/images/properties/villa-2.jpg`,
              width: 1200,
              height: 630,
              alt: 'Contact El Eman Developments',
            },
            {
              url: `${baseUrl}/images/brand/logo_svg_ar.svg`,
              width: 800,
              height: 600,
              alt: 'El Eman Developments Logo',
            }
          ],
        },
        twitter: {
          card: 'summary_large_image',
          site: '@elemangroup',
          creator: '@elemangroup',
          title: 'Contact Us | El Eman Developments',
          description: 'Free real estate consultation from El Eman Developments experts',
          images: [`${baseUrl}/images/properties/villa-2.jpg`],
        },
        alternates: {
          canonical: canonicalUrl,
          languages: {
            'ar-EG': `${baseUrl}/ar/contact`,
            'en-US': `${baseUrl}/en/contact`,
          },
        },
        other: {
          'geo.region': 'EG-C',
          'geo.placename': 'Cairo',
          'geo.position': '30.0444;31.2357',
          'ICBM': '30.0444, 31.2357',
          'business:contact_data:street_address': 'European Countryside, Sheikh Zayed',
          'business:contact_data:locality': 'Giza',
          'business:contact_data:region': 'Giza',
          'business:contact_data:postal_code': '12588',
          'business:contact_data:country_name': 'Egypt',
          'business:contact_data:phone_number': '+201234567890',
          'business:contact_data:website': baseUrl,
        },
      }
    };

    return metadata[locale as 'ar' | 'en'] || metadata.ar;
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return comprehensive default metadata
    return {
      title: 'تواصل معنا | الإيمان للتطوير العقاري',
      description: 'تواصل مع فريق الإيمان للتطوير العقاري للحصول على استشارة عقارية مجانية',
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  try {
    const { locale } = await params;
    
    // Validate locale before proceeding
    if (!['ar', 'en'].includes(locale)) {
      throw new Error(`Invalid locale: ${locale}`);
    }

    // Generate structured data for contact page
    const baseUrl = 'https://developments.elemangroup.com';
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${baseUrl}/${locale}/contact#webpage`,
      url: `${baseUrl}/${locale}/contact`,
      name: locale === 'ar' ? 'تواصل مع الإيمان للتطوير العقاري' : 'Contact El Eman Developments',
      description: locale === 'ar' 
        ? 'صفحة التواصل مع فريق الإيمان للتطوير العقاري للحصول على استشارة عقارية مجانية وخدمات متميزة'
        : 'Contact page for El Eman Developments team to get free real estate consultation and premium services',
      inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: locale === 'ar' ? 'الإيمان للتطوير العقاري' : 'El Eman Developments'
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'ar' ? 'الرئيسية' : 'Home',
            item: `${baseUrl}/${locale}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'ar' ? 'تواصل معنا' : 'Contact Us',
            item: `${baseUrl}/${locale}/contact`
          }
        ]
      },
      mainEntity: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: locale === 'ar' ? 'الإيمان للتطوير العقاري' : 'El Eman Developments',
        alternateName: 'El Eman Group',
        url: baseUrl,
        logo: `${baseUrl}/images/brand/logo_svg_ar.svg`,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+201234567890',
            contactType: 'customer service',
            availableLanguage: ['Arabic', 'English'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '10:00',
              closes: '22:00'
            }
          }
        ],
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: locale === 'ar' ? 'الريف الأوروبي' : 'European Countryside',
            addressLocality: locale === 'ar' ? 'الشيخ زايد' : 'Sheikh Zayed',
            addressRegion: locale === 'ar' ? 'الجيزة' : 'Giza',
            postalCode: '12588',
            addressCountry: 'EG'
          },
          {
            '@type': 'PostalAddress',
            streetAddress: '6 October',
            addressLocality: '6 October',
            addressRegion: locale === 'ar' ? 'الجيزة' : 'Giza',
            postalCode: '12573',
            addressCountry: 'EG'
          }
        ]
      }
    };
    
    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
        <ContactClient locale={locale} />
      </>
    );
  } catch (error) {
    console.error('Error in ContactPage:', error);
    // Return a fallback with basic structured data
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'تواصل مع الإيمان للتطوير العقاري',
              description: 'صفحة التواصل مع الإيمان للتطوير العقاري'
            }, null, 2),
          }}
        />
        <ContactClient locale="ar" />
      </>
    );
  }
}

