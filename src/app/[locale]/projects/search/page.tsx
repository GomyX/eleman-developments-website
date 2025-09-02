import { Metadata } from 'next';
import PropertySearch from '@/components/search/PropertySearch';

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
  const { locale } = await params;
  
  if (locale === 'ar') {
    return {
      title: 'بحث في العقارات | الإيمان للتطوير العقاري',
      description: 'ابحث عن العقار المثالي من مجموعة واسعة من المشاريع العقارية المتميزة',
      keywords: 'بحث عقارات, شقق للبيع, فيلا, استثمار عقاري, الإيمان للتطوير',
      openGraph: {
        title: 'بحث في العقارات | الإيمان للتطوير العقاري',
        description: 'ابحث عن العقار المثالي من مجموعة واسعة من المشاريع العقارية المتميزة',
        locale: 'ar_EG',
      },
    };
  }

  return {
    title: 'Property Search | El Eman Developments',
    description: 'Search for your ideal property from our wide range of exceptional real estate projects',
    keywords: 'property search, apartments for sale, villas, real estate investment, El Eman Developments',
    openGraph: {
      title: 'Property Search | El Eman Developments',
      description: 'Search for your ideal property from our wide range of exceptional real estate projects',
      locale: 'en_US',
    },
  };
}

export default async function SearchPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sand/10 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-eleman-gold mb-4">
              {locale === 'ar' ? 'البحث في العقارات' : 'Property Search'}
            </h1>
            <p className="text-lg text-gray-700">
              {locale === 'ar' 
                ? 'ابحث عن العقار المثالي الذي يناسب احتياجاتك'
                : 'Find the perfect property that matches your needs'
              }
            </p>
          </div>
          
          <PropertySearch />
          
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {locale === 'ar' ? 'نتائج البحث' : 'Search Results'}
            </h2>
            <p className="text-gray-600">
              {locale === 'ar' 
                ? 'استخدم أدوات البحث أعلاه للعثور على العقارات المتاحة'
                : 'Use the search tools above to find available properties'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
