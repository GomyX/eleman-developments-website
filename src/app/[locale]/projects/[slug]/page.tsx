import { Metadata } from 'next';
import PropertyDetailsClient from './PropertyDetailsClient';

// Mock property data - in a real app, this would come from an API or CMS
const getPropertyBySlug = async (slug: string) => {
  const properties = {
    'noor-villa': {
      id: '1',
      slug: 'noor-villa',
      title: { ar: 'فيلا نور', en: 'Noor Villa' },
      location: { ar: 'الريف الاوروبي - طريق اسكندريه الصحراوي', en: 'European Countryside' },
      startingPrice: 11000000,
      bedrooms: 8,
      bathrooms: 6,
      area: 825,
      builtArea: 420,
      poolArea: 60,
      gardenArea: 180,
      deliveryDate: '2025',
      floor: 'Ground + First + Second',
      finishing: { ar: 'تشطيب فاخر', en: 'Luxury Finishing' },
      view: { ar: 'حمام سباحة وحديقة', en: 'Pool & Garden View' },
      status: 'available' as const,
      features: ['pool', 'garden', 'parking', 'balcony'],
      projectName: { ar: 'مجموعة الإيمان', en: 'El Eman Group' },
      description: {
        ar: 'فيلا ٨٢٥م - مباني ٤٢٠م\nحمام سباحه ٦٠م له سقف مغطي متحرك للخصوصيه وستائر علي الجناب\nحديقه خاصه نجيله طبيعيه ١٨٠م\n\nالدور الارضي: ريسبشن ٣ قطع - حمام كبير- مطبخ كبير - غرفه ماستر - ٢ تراث\nالدور الثاني: ٤ غرف(منهم ٢ ماستر) ريسبشن - حمام- تراث كبير علي حمام السباحه - ٣ بلكونه\nالدور الثالث: ٢ غرفه منهم ١ ماستر - حمام - اوفيس - ريسبشن صغير - باقي المساحه تراث مكشوف علي حمام السباحه',
        en: '825m Villa - 420m Built Area\n60m Swimming Pool with movable covered roof for privacy and side curtains\n180m Private Garden with natural grass\n\nGround Floor: 3-piece reception - large bathroom - large kitchen - master room - 2 terraces\nSecond Floor: 4 rooms (2 masters) reception - bathroom - large terrace overlooking pool - 3 balconies\nThird Floor: 2 rooms (1 master) - bathroom - office - small reception - remaining area open terrace overlooking pool'
      },
      amenities: {
        unit: ['pool', 'garden', 'parking', 'balcony', 'terrace'],
        project: ['security', 'maintenance', 'landscaping'],
        nearby: ['schools', 'hospitals', 'shopping', 'transportation']
      },
      images: [
        { id: '1', url: '/images/properties/noor villa/1.jpg', alt: 'Noor Villa Main Facade View', type: 'image' as const },
        { id: '2', url: '/images/properties/noor villa/2.jpg', alt: 'Swimming Pool Area', type: 'image' as const },
        { id: '3', url: '/images/properties/noor villa/3.jpg', alt: 'Private Garden Landscape', type: 'image' as const },
        { id: '5', url: '/images/properties/noor villa/5.jpg', alt: 'Interior Living Space', type: 'image' as const },
        { id: '4', url: '/images/properties/noor villa/4.jpg', alt: 'Villa Exterior Side View', type: 'image' as const },
        { id: '6', url: '/images/properties/noor villa/6.jpg', alt: 'Elegant Living Room', type: 'image' as const },
        // { id: '8', url: '/images/properties/noor villa/8.jpg', alt: 'Modern Kitchen Design', type: 'image' as const },
        { id: '9', url: '/images/properties/noor villa/9.jpg', alt: 'Luxurious Master Bedroom', type: 'image' as const },
        // { id: '10', url: '/images/properties/noor villa/10.jpg', alt: 'Premium Bathroom Design', type: 'image' as const },
        { id: '11', url: '/images/properties/noor villa/11.jpg', alt: 'Scenic Balcony View', type: 'image' as const },
        // { id: '12', url: '/images/properties/noor villa/12.jpg', alt: 'Spacious Terrace Area', type: 'image' as const },
        // { id: '13', url: '/images/properties/noor villa/13.jpg', alt: 'Beautiful Night Illumination', type: 'image' as const },
        { id: '14', url: '/images/properties/noor villa/14.jpg', alt: 'Pool Area with Retractable Cover', type: 'image' as const },
        { id: '15', url: '/images/properties/noor villa/15.jpg', alt: 'Lush Garden Panoramic View', type: 'image' as const },
      ],
      coordinates: { lat: 30.0444, lng: 31.2357 },
      propertyId: 'o'
    },
    'luxury-villa-825': {
      id: '2',
      slug: 'luxury-villa-825',
      title: { ar: 'فيلا فاخرة ٨٢٥م', en: 'Luxury Villa 825m' },
      location: { ar: 'الريف الاوروبي', en: 'European Countryside' },
      startingPrice: 8500000,
      bedrooms: 8,
      bathrooms: 6,
      area: 825,
      builtArea: 420,
      poolArea: 60,
      gardenArea: 180,
      deliveryDate: '2025',
      floor: 'Ground + First + Second',
      finishing: { ar: 'تشطيب فاخر', en: 'Luxury Finishing' },
      view: { ar: 'حمام سباحة وحديقة', en: 'Pool & Garden View' },
      status: 'available' as const,
      features: ['pool', 'garden', 'parking', 'security', 'balcony'],
      projectName: { ar: 'مجموعة الإيمان', en: 'El Eman Group' },
      description: {
        ar: 'فيلا ٨٢٥م - مباني ٤٢٠م\nحمام سباحه ٦٠م له سقف مغطي متحرك للخصوصيه وستائر علي الجناب\nحديقه خاصه نجيله طبيعيه ١٨٠م\n\nالدور الارضي: ريسبشن ٣ قطع - حمام كبير- مطبخ كبير - غرفه ماستر - ٢ تراث\nالدور الثاني: ٤ غرف(منهم ٢ ماستر) ريسبشن - حمام- تراث كبير علي حمام السباحه - ٣ بلكونه\nالدور الثالث: ٢ غرفه منهم ١ ماستر - حمام - اوفيس - ريسبشن صغير - باقي المساحه تراث مكشوف علي حمام السباحه',
        en: '825m Villa - 420m Built Area\n60m Swimming Pool with movable covered roof for privacy and side curtains\n180m Private Garden with natural grass\n\nGround Floor: 3-piece reception - large bathroom - large kitchen - master room - 2 terraces\nSecond Floor: 4 rooms (2 masters) reception - bathroom - large terrace overlooking pool - 3 balconies\nThird Floor: 2 rooms (1 master) - bathroom - office - small reception - remaining area open terrace overlooking pool'
      },
      amenities: {
        unit: ['pool', 'garden', 'parking', 'balcony', 'security', 'terrace'],
        project: ['security', 'maintenance', 'landscaping'],
        nearby: ['schools', 'hospitals', 'shopping', 'transportation']
      },
      images: [
        { id: '1', url: '/images/properties/luxury-villa-825-main.jpg', alt: 'Villa Main View', type: 'image' as const },
        { id: '2', url: '/images/properties/luxury-villa-825-pool.jpg', alt: 'Swimming Pool', type: 'image' as const },
        { id: '3', url: '/images/properties/luxury-villa-825-garden.jpg', alt: 'Private Garden', type: 'image' as const },
        { id: '4', url: '/images/properties/luxury-villa-825-interior.jpg', alt: 'Interior View', type: 'image' as const },
        { id: '5', url: '/images/properties/luxury-villa-825-tour.mp4', alt: 'Virtual Tour', type: 'video' as const },
      ],
      coordinates: { lat: 30.0444, lng: 31.2357 }, // New Cairo coordinates
      propertyId: 'EG-LV-825'
    }
  };

  return properties[slug as keyof typeof properties] || null;
};

export function generateStaticParams() {
  // In a real app, this would fetch all property slugs from an API
  return [
    { locale: 'ar', slug: 'noor-villa' },
    { locale: 'en', slug: 'noor-villa' },
    { locale: 'ar', slug: 'luxury-villa-825' },
    { locale: 'en', slug: 'luxury-villa-825' },
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

