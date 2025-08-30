import { Metadata } from 'next';
import InvestmentClient from './InvestmentClient';

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
    const currentPath = `/${locale}/investment`;
    const canonicalUrl = `${baseUrl}${currentPath}`;
    
    const metadata = {
      ar: {
        title: 'الاستثمار العقاري | الإيمان للتطوير - عوائد تصل إلى 18% سنوياً',
        description: 'اكتشف أفضل الفرص الاستثمارية في العقارات المصرية مع الإيمان للتطوير. عوائد مضمونة تصل إلى 18% سنوياً، تمويل إسلامي، وحاسبة العائد على الاستثمار المجانية.',
        keywords: 'استثمار عقاري مصر, عوائد استثمارية عالية, تمويل إسلامي عقارات, حاسبة ROI عقارية, الإيمان للتطوير استثمار, عقارات الشيخ زايد استثمار, القاهرة الجديدة استثمار, عوائد 18 بالمئة عقارات, مشاركة إسلامية عقارية',
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
          title: 'الاستثمار العقاري | الإيمان للتطوير - عوائد تصل إلى 18% سنوياً',
          description: 'استثمر بذكاء في العقارات المصرية مع ضمانات الجودة وعوائد مضمونة. حاسبة العائد على الاستثمار وخيارات التمويل الإسلامي المتاحة.',
          url: canonicalUrl,
          siteName: 'الإيمان للتطوير العقاري',
          locale: 'ar_EG',
          type: 'website',
          images: [
            {
              url: `${baseUrl}/images/properties/villa-1.jpg`,
              width: 1200,
              height: 630,
              alt: 'الاستثمار العقاري مع الإيمان للتطوير',
            },
            {
              url: `${baseUrl}/images/brand/logo_png.png`,
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
          title: 'الاستثمار العقاري | الإيمان للتطوير',
          description: 'عوائد استثمارية تصل إلى 18% سنوياً في العقارات المصرية',
          images: [`${baseUrl}/images/properties/villa-1.jpg`],
        },
        alternates: {
          canonical: canonicalUrl,
          languages: {
            'ar-EG': `${baseUrl}/ar/investment`,
            'en-US': `${baseUrl}/en/investment`,
          },
        },
        other: {
          'geo.region': 'EG-C',
          'geo.placename': 'Cairo',
          'geo.position': '30.0444;31.2357',
          'ICBM': '30.0444, 31.2357',
          'investment:returns': 'up to 18% annually',
          'investment:type': 'real estate',
          'investment:currency': 'EGP',
          'investment:financing': 'Islamic compliant',
        },
      },
      en: {
        title: 'Real Estate Investment | El Eman Developments - Up to 18% Annual Returns',
        description: 'Discover the best investment opportunities in Egyptian real estate with El Eman Developments. Guaranteed returns up to 18% annually, Islamic financing, and free ROI calculator.',
        keywords: 'egypt real estate investment, high investment returns, islamic real estate financing, real estate ROI calculator, el eman developments investment, sheikh zayed investment properties, new cairo investment, 18 percent returns real estate, islamic partnership real estate',
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
          title: 'Real Estate Investment | El Eman Developments - Up to 18% Annual Returns',
          description: 'Invest smartly in Egyptian real estate with quality guarantees and guaranteed returns. ROI calculator and Islamic financing options available.',
          url: canonicalUrl,
          siteName: 'El Eman Developments',
          locale: 'en_US',
          type: 'website',
          images: [
            {
              url: `${baseUrl}/images/properties/villa-1.jpg`,
              width: 1200,
              height: 630,
              alt: 'Real Estate Investment with El Eman Developments',
            },
            {
              url: `${baseUrl}/images/brand/logo_png.png`,
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
          title: 'Real Estate Investment | El Eman Developments',
          description: 'Investment returns up to 18% annually in Egyptian real estate',
          images: [`${baseUrl}/images/properties/villa-1.jpg`],
        },
        alternates: {
          canonical: canonicalUrl,
          languages: {
            'ar-EG': `${baseUrl}/ar/investment`,
            'en-US': `${baseUrl}/en/investment`,
          },
        },
        other: {
          'geo.region': 'EG-C',
          'geo.placename': 'Cairo',
          'geo.position': '30.0444;31.2357',
          'ICBM': '30.0444, 31.2357',
          'investment:returns': 'up to 18% annually',
          'investment:type': 'real estate',
          'investment:currency': 'EGP',
          'investment:financing': 'Islamic compliant',
        },
      }
    };

    return metadata[locale as 'ar' | 'en'] || metadata.ar;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'الاستثمار العقاري | الإيمان للتطوير',
      description: 'فرص استثمارية متميزة في العقارات المصرية مع عوائد عالية',
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function InvestmentPage({ 
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

    // Generate structured data for investment page
    const baseUrl = 'https://developments.elemangroup.com';
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': ['WebPage', 'InvestmentPage'],
      '@id': `${baseUrl}/${locale}/investment#webpage`,
      url: `${baseUrl}/${locale}/investment`,
      name: locale === 'ar' ? 'الاستثمار العقاري مع الإيمان للتطوير' : 'Real Estate Investment with El Eman Developments',
      description: locale === 'ar' 
        ? 'صفحة الاستثمار العقاري مع الإيمان للتطوير للحصول على أفضل الفرص الاستثمارية وعوائد تصل إلى 18% سنوياً'
        : 'Real Estate Investment page with El Eman Developments to get the best investment opportunities with returns up to 18% annually',
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
            name: locale === 'ar' ? 'الاستثمار العقاري' : 'Real Estate Investment',
            item: `${baseUrl}/${locale}/investment`
          }
        ]
      },
      mainEntity: {
        '@type': 'Investment',
        name: locale === 'ar' ? 'الاستثمار العقاري مع الإيمان للتطوير' : 'Real Estate Investment with El Eman Developments',
        description: locale === 'ar' 
          ? 'فرص استثمارية متميزة في العقارات المصرية مع عوائد مضمونة تصل إلى 18% سنوياً'
          : 'Exceptional investment opportunities in Egyptian real estate with guaranteed returns up to 18% annually',
        investmentType: 'Real Estate',
        expectedReturn: {
          '@type': 'MonetaryAmount',
          currency: 'EGP',
          value: '18',
          description: locale === 'ar' ? 'نسبة العائد السنوي' : 'Annual return percentage'
        },
        provider: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
          name: locale === 'ar' ? 'الإيمان للتطوير العقاري' : 'El Eman Developments',
          url: baseUrl,
          logo: `${baseUrl}/images/brand/logo_png.png`,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+201234567890',
            contactType: 'investment consultation',
            availableLanguage: ['Arabic', 'English']
          }
        },
        offers: [
          {
            '@type': 'Offer',
            name: locale === 'ar' ? 'استشارة استثمارية مجانية' : 'Free Investment Consultation',
            price: '0',
            priceCurrency: 'EGP',
            availability: 'InStock',
            validFrom: '2025-01-01',
            description: locale === 'ar' ? 'استشارة مجانية حول أفضل الفرص الاستثمارية' : 'Free consultation about the best investment opportunities'
          },
          {
            '@type': 'Offer',
            name: locale === 'ar' ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator',
            price: '0',
            priceCurrency: 'EGP',
            availability: 'InStock',
            description: locale === 'ar' ? 'حاسبة مجانية لحساب العائد على الاستثمار العقاري' : 'Free calculator to calculate real estate investment returns'
          }
        ]
      },
      financialProduct: {
        '@type': 'FinancialProduct',
        name: locale === 'ar' ? 'التمويل الإسلامي العقاري' : 'Islamic Real Estate Financing',
        description: locale === 'ar' ? 'خيارات تمويل إسلامية متنوعة للاستثمار العقاري' : 'Various Islamic financing options for real estate investment',
        provider: {
          '@type': 'Organization',
          name: locale === 'ar' ? 'الإيمان للتطوير العقاري' : 'El Eman Developments'
        }
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
        <InvestmentClient locale={locale} />
      </>
    );
  } catch (error) {
    console.error('Error in InvestmentPage:', error);
    // Return a fallback with basic structured data
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'InvestmentPage',
              name: 'الاستثمار العقاري مع الإيمان للتطوير',
              description: 'فرص استثمارية متميزة في العقارات المصرية'
            }, null, 2),
          }}
        />
        <InvestmentClient locale="ar" />
      </>
    );
  }
};

