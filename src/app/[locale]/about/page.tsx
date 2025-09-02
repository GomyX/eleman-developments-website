import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutClient from './AboutClient';

// Static params generation for better performance
export function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' }
  ];
}

// Enhanced metadata generation with comprehensive SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Validate locale
  if (!['ar', 'en'].includes(locale)) {
    notFound();
  }
  
  const isArabic = locale === 'ar';
  const baseUrl = 'https://developments.elemangroup.com';
  const currentUrl = `${baseUrl}/${locale}/about`;
  
  if (isArabic) {
    return {
      title: 'عن الإيمان للتطوير العقاري | قصة نجاح مبنية على الثقة والجودة والإيمان',
      description: 'اكتشف قصة الإيمان للتطوير العقاري، الشركة الرائدة في مجال التطوير العقاري في مصر. تعرف على رؤيتنا ومهمتنا وقيمنا وفريق القيادة المحترف وإنجازاتنا عبر أكثر من 15 عاماً من التميز.',
      keywords: [
        'عن الإيمان', 'الإيمان للتطوير العقاري', 'قصة الشركة', 'رؤية الإيمان', 'مهمة الإيمان',
        'فريق القيادة', 'قيم الشركة', 'إنجازات الإيمان', 'تاريخ الشركة', 'التطوير العقاري مصر',
        'شركة عقارات مصر', 'مطور عقاري رائد', 'جودة البناء', 'الثقة والشفافية',
        'خبرة 15 سنة', 'مشاريع مكتملة', 'عملاء راضيين', 'جوائز عقارية',
        'الاستدامة البيئية', 'المسؤولية المجتمعية', 'الابتكار العقاري'
      ],
      alternates: {
        canonical: currentUrl,
        languages: {
          'ar-EG': `${baseUrl}/ar/about`,
          'en-US': `${baseUrl}/en/about`,
          'x-default': `${baseUrl}/en/about`
        }
      },
      openGraph: {
        type: 'website',
        title: 'عن الإيمان للتطوير العقاري | قصة نجاح مبنية على الثقة والجودة',
        description: 'اكتشف قصة الإيمان للتطوير العقاري، الشركة الرائدة في التطوير العقاري في مصر مع أكثر من 15 عاماً من الخبرة والتميز',
        url: currentUrl,
        siteName: 'الإيمان للتطوير العقاري',
        locale: 'ar_EG',
        alternateLocale: 'en_US',
        images: [
          {
            url: '/images/about/about-hero-ar.jpg',
            width: 1200,
            height: 630,
            alt: 'عن الإيمان للتطوير العقاري - قصة نجاح',
            type: 'image/jpeg',
          },
          {
            url: '/images/brand/logo_svg_ar.svg',
            width: 800,
            height: 600,
            alt: 'شعار الإيمان للتطوير العقاري',
            type: 'image/png',
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'عن الإيمان للتطوير العقاري | قصة نجاح مبنية على الثقة',
        description: 'اكتشف قصة الإيمان للتطوير العقاري، الشركة الرائدة في التطوير العقاري في مصر',
        images: ['/images/about/about-hero-ar.jpg'],
        creator: '@elemangroup',
        site: '@elemangroup',
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
        'article:author': 'الإيمان للتطوير العقاري',
        'article:publisher': 'الإيمان جروب',
        'geo.region': 'EG-C',
        'geo.placename': 'القاهرة، مصر',
        'language': 'ar',
        'target-country': 'EG',
        'content-language': 'ar-EG',
        'audience': 'general',
        'distribution': 'global',
        'rating': 'general',
        'revisit-after': '7 days'
      }
    };
  }

  // English metadata
  return {
    title: 'About El Eman Developments | Egypt\'s Premier Real Estate Developer Since 2009',
    description: 'Discover El Eman Developments story, Egypt\'s leading real estate developer. Learn about our vision, mission, core values, professional leadership team, and achievements across 15+ years of excellence in premium property development.',
    keywords: [
      'About El Eman', 'El Eman Developments', 'company story', 'El Eman vision', 'El Eman mission',
      'leadership team', 'company values', 'El Eman achievements', 'company history', 'real estate development Egypt',
      'Egyptian real estate company', 'leading property developer', 'construction quality', 'trust and transparency',
      '15 years experience', 'completed projects', 'satisfied clients', 'real estate awards',
      'environmental sustainability', 'community responsibility', 'real estate innovation',
      'premium developments', 'luxury properties Egypt', 'Cairo developments', 'New Capital projects'
    ],
    alternates: {
      canonical: currentUrl,
      languages: {
        'ar-EG': `${baseUrl}/ar/about`,
        'en-US': `${baseUrl}/en/about`,
        'x-default': `${baseUrl}/en/about`
      }
    },
    openGraph: {
      type: 'website',
      title: 'About El Eman Developments | Egypt\'s Premier Real Estate Developer',
      description: 'Discover El Eman Developments story, Egypt\'s leading real estate developer with 15+ years of experience and excellence in premium property development',
      url: currentUrl,
      siteName: 'El Eman Developments',
      locale: 'en_US',
      alternateLocale: 'ar_EG',
      images: [
        {
          url: '/images/about/about-hero-en.jpg',
          width: 1200,
          height: 630,
          alt: 'About El Eman Developments - Success Story',
          type: 'image/jpeg',
        },
        {
          url: '/images/brand/logo_svg_ar.svg',
          width: 800,
          height: 600,
          alt: 'El Eman Developments Logo',
          type: 'image/png',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About El Eman Developments | Egypt\'s Premier Real Estate Developer',
      description: 'Discover El Eman Developments story, Egypt\'s leading real estate developer with 15+ years of excellence',
      images: ['/images/about/about-hero-en.jpg'],
      creator: '@elemangroup',
      site: '@elemangroup',
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
      'article:author': 'El Eman Developments',
      'article:publisher': 'El Eman Group',
      'geo.region': 'EG-C',
      'geo.placename': 'Cairo, Egypt',
      'language': 'en',
      'target-country': 'EG',
      'content-language': 'en-US',
      'audience': 'general',
      'distribution': 'global',
      'rating': 'general',
      'revisit-after': '7 days'
    }
  };
}

// Enhanced About page component with error handling and structured data
export default async function AboutPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  // Validate locale to prevent invalid pages
  if (!['ar', 'en'].includes(locale)) {
    notFound();
  }

  const isArabic = locale === 'ar';
  const baseUrl = 'https://developments.elemangroup.com';
  
  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": isArabic ? "الإيمان للتطوير العقاري" : "El Eman Developments",
        "alternateName": isArabic ? "الإيمان جروب" : "El Eman Group",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/images/brand/logo_svg_ar.svg`,
          "width": 800,
          "height": 600
        },
        "description": isArabic ? 
          "الشركة الرائدة في التطوير العقاري في مصر مع أكثر من 15 عاماً من الخبرة والتميز" :
          "Egypt's leading real estate developer with over 15 years of experience and excellence",
        "foundingDate": "2009",
        "founder": {
          "@type": "Person",
          "name": isArabic ? "أحمد الإيمان" : "Ahmed El Eman"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "EG",
          "addressLocality": isArabic ? "القاهرة الجديدة" : "New Cairo",
          "addressRegion": isArabic ? "محافظة القاهرة" : "Cairo Governorate"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+20-2-2615-3000",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"]
          }
        ],
        "sameAs": [
          "https://www.facebook.com/elemangroup",
          "https://www.instagram.com/elemangroup",
          "https://www.linkedin.com/company/el-eman-group",
          "https://twitter.com/elemangroup"
        ],
        "knowsAbout": [
          isArabic ? "التطوير العقاري" : "Real Estate Development",
          isArabic ? "البناء والتشييد" : "Construction",
          isArabic ? "إدارة المشاريع" : "Project Management",
          isArabic ? "التصميم المعماري" : "Architectural Design"
        ],
        "areaServed": [
          {
            "@type": "Place",
            "name": isArabic ? "القاهرة الجديدة" : "New Cairo"
          },
          {
            "@type": "Place",
            "name": isArabic ? "الشيخ زايد" : "Sheikh Zayed"
          },
          {
            "@type": "Place",
            "name": isArabic ? "الساحل الشمالي" : "North Coast"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${locale}/about#webpage`,
        "url": `${baseUrl}/${locale}/about`,
        "name": isArabic ? 
          "عن الإيمان للتطوير العقاري | قصة نجاح مبنية على الثقة والجودة" :
          "About El Eman Developments | Egypt's Premier Real Estate Developer",
        "description": isArabic ?
          "اكتشف قصة الإيمان للتطوير العقاري وتعرف على رؤيتنا ومهمتنا وقيمنا" :
          "Discover El Eman Developments story and learn about our vision, mission, and values",
        "inLanguage": isArabic ? "ar-EG" : "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/#organization`
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": isArabic ? "الرئيسية" : "Home",
              "item": `${baseUrl}/${locale}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": isArabic ? "عن الإيمان" : "About El Eman",
              "item": `${baseUrl}/${locale}/about`
            }
          ]
        }
      }
    ]
  };
  
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Main About Content */}
      <AboutClient locale={locale} />
    </>
  );
}
