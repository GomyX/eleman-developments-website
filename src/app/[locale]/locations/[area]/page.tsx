import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Mock area data - in a real app, this would come from an API or CMS
const getAreaBySlug = async (slug: string) => {
  const areas = {
    'new-cairo': {
      slug: 'new-cairo',
      name: { ar: 'القاهرة الجديدة', en: 'New Cairo' },
      description: {
        ar: 'منطقة راقية تضم أحدث المشاريع العقارية والمجمعات السكنية المتطورة',
        en: 'A premium area featuring the latest real estate projects and advanced residential compounds'
      }
    },
    'sheikh-zayed': {
      slug: 'sheikh-zayed',
      name: { ar: 'الشيخ زايد', en: 'Sheikh Zayed' },
      description: {
        ar: 'مدينة عصرية تجمع بين الهدوء والرفاهية مع مشاريع سكنية متنوعة',
        en: 'A modern city combining tranquility and luxury with diverse residential projects'
      }
    },
    'north-coast': {
      slug: 'north-coast',
      name: { ar: 'الساحل الشمالي', en: 'North Coast' },
      description: {
        ar: 'الوجهة السياحية الأولى بمصر مع شواطئ خلابة ومنتجعات فاخرة',
        en: 'Egypt\'s premier tourist destination with stunning beaches and luxury resorts'
      }
    }
  };

  return areas[slug as keyof typeof areas] || null;
};

export function generateStaticParams() {
  return [
    { locale: 'ar', area: 'new-cairo' },
    { locale: 'en', area: 'new-cairo' },
    { locale: 'ar', area: 'sheikh-zayed' },
    { locale: 'en', area: 'sheikh-zayed' },
    { locale: 'ar', area: 'north-coast' },
    { locale: 'en', area: 'north-coast' },
  ];
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; area: string }> 
}): Promise<Metadata> {
  const { locale, area } = await params;
  const areaData = await getAreaBySlug(area);

  if (!areaData) {
    return {
      title: 'Area Not Found',
      description: 'The requested area could not be found.'
    };
  }

  const name = areaData.name[locale as 'ar' | 'en'];
  const description = areaData.description[locale as 'ar' | 'en'];

  if (locale === 'ar') {
    return {
      title: `${name} | الإيمان للتطوير العقاري`,
      description: description,
      keywords: `عقارات, ${name}, الإيمان للتطوير العقاري, مشاريع عقارية`,
      openGraph: {
        title: `${name} | الإيمان للتطوير العقاري`,
        description: description,
        locale: 'ar_EG',
        type: 'website',
      },
    };
  }

  return {
    title: `${name} | El Eman Developments`,
    description: description,
    keywords: `real estate, ${name}, El Eman Developments, property projects`,
    openGraph: {
      title: `${name} | El Eman Developments`,
      description: description,
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function AreaPage({ 
  params 
}: { 
  params: Promise<{ locale: string; area: string }> 
}) {
  const { locale, area } = await params;
  const areaData = await getAreaBySlug(area);

  if (!areaData) {
    notFound();
  }

  const name = areaData.name[locale as 'ar' | 'en'];
  const description = areaData.description[locale as 'ar' | 'en'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand/10 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-eleman-gold mb-6">
            {name}
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {locale === 'ar' ? 'المشاريع المتاحة' : 'Available Projects'}
            </h2>
            <p className="text-gray-600">
              {locale === 'ar' 
                ? 'سيتم عرض المشاريع المتاحة في هذه المنطقة قريباً'
                : 'Available projects in this area will be displayed soon'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
