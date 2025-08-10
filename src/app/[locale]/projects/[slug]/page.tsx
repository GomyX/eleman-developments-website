import { Metadata } from 'next';
import PropertyDetailsClient from './PropertyDetailsClient';

// Mock property data - in a real app, this would come from an API or CMS
const getPropertyBySlug = async (slug: string) => {
  const properties = {
    'el-eman-heights-villa-1': {
      id: '1',
      slug: 'el-eman-heights-villa-1',
      title: { ar: 'فيلا مرتفعات الإيمان', en: 'El Eman Heights Villa' },
      location: { ar: 'القاهرة الجديدة', en: 'New Cairo' },
      startingPrice: 3500000,
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      builtArea: 200,
      deliveryDate: '2025',
      floor: 'Ground + First',
      finishing: { ar: 'تشطيب كامل', en: 'Fully Finished' },
      view: { ar: 'حديقة ومناظر طبيعية', en: 'Garden & Landscape View' },
      status: 'available' as const,
      features: ['garden', 'parking', 'security'],
      projectName: { ar: 'مرتفعات الإيمان', en: 'El Eman Heights' },
      description: {
        ar: 'فيلا فاخرة في مرتفعات الإيمان بالقاهرة الجديدة، تتميز بالتصميم العصري والمساحات الواسعة. تحتوي على 4 غرف نوم و 3 حمامات مع حديقة خاصة وموقف سيارات.',
        en: 'Luxury villa in El Eman Heights, New Cairo, featuring modern design and spacious areas. Contains 4 bedrooms and 3 bathrooms with private garden and parking space.'
      },
      amenities: {
        unit: ['garden', 'parking', 'balcony', 'security'],
        project: ['pool', 'gym', 'security', 'playground', 'mosque', 'commercial_area'],
        nearby: ['schools', 'hospitals', 'shopping', 'transportation']
      },
      images: [
        { id: '1', url: '/images/properties/villa-1-main.jpg', alt: 'Villa Main View', type: 'image' as const },
        { id: '2', url: '/images/properties/villa-1-living.jpg', alt: 'Living Room', type: 'image' as const },
        { id: '3', url: '/images/properties/villa-1-bedroom.jpg', alt: 'Master Bedroom', type: 'image' as const },
        { id: '4', url: '/images/properties/villa-1-garden.jpg', alt: 'Private Garden', type: 'image' as const },
        { id: '5', url: '/images/properties/villa-1-tour.mp4', alt: 'Virtual Tour', type: 'video' as const },
      ],
      coordinates: { lat: 30.0444, lng: 31.2357 }, // New Cairo coordinates
      propertyId: 'EH-V-001'
    }
  };

  return properties[slug as keyof typeof properties] || null;
};

export function generateStaticParams() {
  // In a real app, this would fetch all property slugs from an API
  return [
    { locale: 'ar', slug: 'el-eman-heights-villa-1' },
    { locale: 'en', slug: 'el-eman-heights-villa-1' },
  ];
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found',
      description: 'The requested property could not be found.'
    };
  }

  const title = property.title[locale as 'ar' | 'en'];
  const location = property.location[locale as 'ar' | 'en'];
  const description = property.description[locale as 'ar' | 'en'];

  if (locale === 'ar') {
    return {
      title: `${title} | الإيمان للتطوير العقاري`,
      description: description,
      keywords: `عقارات, فيلا, ${location}, الإيمان للتطوير العقاري`,
      openGraph: {
        title: `${title} | الإيمان للتطوير العقاري`,
        description: description,
        locale: 'ar_EG',
        type: 'website',
      },
    };
  }

  return {
    title: `${title} | El Eman Developments`,
    description: description,
    keywords: `real estate, villa, ${location}, El Eman Developments`,
    openGraph: {
      title: `${title} | El Eman Developments`,
      description: description,
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function PropertyDetailsPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'العقار غير موجود' : 'Property Not Found'}
          </h1>
          <p className="text-gray-600">
            {locale === 'ar' 
              ? 'العقار المطلوب غير موجود أو تم حذفه'
              : 'The requested property was not found or has been removed'
            }
          </p>
        </div>
      </div>
    );
  }

  return <PropertyDetailsClient property={property} locale={locale} />;
}

