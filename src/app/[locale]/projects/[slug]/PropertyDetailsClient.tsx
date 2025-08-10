'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import PropertyGallery from '@/components/property/PropertyGallery';
import PaymentCalculator from '@/components/forms/PaymentCalculator';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import PropertyCard from '@/components/property/PropertyCard';
import {
  MapPinIcon,
  HomeIcon,
  CalendarIcon,
  CubeIcon,
  BuildingOffice2Icon,
  EyeIcon,
  DocumentArrowDownIcon,
  ShareIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

interface PropertyData {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  location: { ar: string; en: string };
  startingPrice: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  builtArea: number;
  deliveryDate: string;
  floor: string;
  finishing: { ar: string; en: string };
  view: { ar: string; en: string };
  status: 'available' | 'sold_out' | 'coming_soon';
  features: string[];
  projectName: { ar: string; en: string };
  description: { ar: string; en: string };
  amenities: {
    unit: string[];
    project: string[];
    nearby: string[];
  };
  images: Array<{
    id: string;
    url: string;
    alt: string;
    type: 'image' | 'video' | '360';
  }>;
  coordinates: { lat: number; lng: number };
  propertyId: string;
}

interface PropertyDetailsClientProps {
  property: PropertyData;
  locale: string;
}

export default function PropertyDetailsClient({ property, locale }: PropertyDetailsClientProps) {
  const t = useTranslations('property_details');
  const tCard = useTranslations('property_card');
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const tabs = [
    { key: 'overview', label: t('overview'), icon: HomeIcon },
    { key: 'amenities', label: t('amenities'), icon: CheckCircleIcon },
    { key: 'location', label: t('location'), icon: MapPinIcon },
    { key: 'payment', label: t('payment_plan'), icon: CubeIcon },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title[locale as 'ar' | 'en'],
        text: property.description[locale as 'ar' | 'en'],
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(locale === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
    }
  };

  const handleDownloadBrochure = () => {
    // In a real app, this would trigger a PDF download
    alert(locale === 'ar' ? 'سيتم تحميل الكتيب قريباً' : 'Brochure download coming soon');
  };

  // Mock similar properties
  const similarProperties = [
    {
      id: '2',
      slug: 'belief-gardens-townhouse-1',
      title: { ar: 'تاون هاوس حدائق الإيمان', en: 'Belief Gardens Townhouse' },
      location: { ar: 'الشيخ زايد', en: 'Sheikh Zayed' },
      startingPrice: 2800000,
      bedrooms: 3,
      area: 180,
      deliveryDate: '2024',
      image: '/images/properties/townhouse-1.jpg',
      status: 'available' as const,
      features: ['balcony', 'parking', 'gym'],
      projectName: { ar: 'حدائق الإيمان', en: 'Belief Gardens' },
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className={`flex items-center space-x-2 rtl:space-x-reverse text-sm ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <Link href={"/" as any} className="text-gray-500 hover:text-saffron">
              {locale === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <Link href={"/projects" as any} className="text-gray-500 hover:text-saffron">
              {locale === 'ar' ? 'المشاريع' : 'Projects'}
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {property.title[locale as 'ar' | 'en']}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 ${
                isRTL ? 'sm:flex-row-reverse' : ''
              }`}>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <span className="bg-saffron/10 text-saffron px-3 py-1 rounded-full text-sm font-semibold">
                      {property.projectName[locale as 'ar' | 'en']}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.status === 'available' ? 'bg-green-100 text-green-800' :
                      property.status === 'sold_out' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status === 'available' ? (locale === 'ar' ? 'متاح' : 'Available') :
                       property.status === 'sold_out' ? (locale === 'ar' ? 'مباع' : 'Sold Out') :
                       (locale === 'ar' ? 'قريباً' : 'Coming Soon')}
                    </span>
                  </div>
                  <h1 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-2 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {property.title[locale as 'ar' | 'en']}
                  </h1>
                  <div className={`flex items-center space-x-2 rtl:space-x-reverse text-gray-600 mb-4 ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <MapPinIcon className="w-5 h-5" />
                    <span>{property.location[locale as 'ar' | 'en']}</span>
                  </div>
                  <p className={`text-gray-700 ${isRTL ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                    {property.description[locale as 'ar' | 'en']}
                  </p>
                </div>
                
                <div className={`flex-shrink-0 ${isRTL ? 'text-left' : 'text-right'}`}>
                  <div className="text-3xl font-bold text-saffron mb-2">
                    {formatCurrency(property.startingPrice)}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    {t('property_id')}: {property.propertyId}
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {isFavorite ? (
                        <HeartSolid className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <ShareIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={handleDownloadBrochure}
                      className="p-2 bg-saffron text-white rounded-lg hover:bg-saffron/90"
                    >
                      <DocumentArrowDownIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Gallery */}
            <PropertyGallery
              images={property.images}
              title={property.title[locale as 'ar' | 'en']}
            />

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                          activeTab === tab.key
                            ? 'border-saffron text-saffron'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Specifications Grid */}
                    <div>
                      <h3 className={`text-xl font-bold text-gray-900 mb-4 ${
                        isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                      }`}>
                        {t('specifications')}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <HomeIcon className="w-6 h-6 text-saffron mx-auto mb-2" />
                          <div className="font-bold text-gray-900">{property.bedrooms}</div>
                          <div className="text-sm text-gray-600">{t('bedrooms')}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="w-6 h-6 bg-saffron rounded mx-auto mb-2"></div>
                          <div className="font-bold text-gray-900">{property.bathrooms}</div>
                          <div className="text-sm text-gray-600">{t('bathrooms')}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <CubeIcon className="w-6 h-6 text-saffron mx-auto mb-2" />
                          <div className="font-bold text-gray-900">{property.area}</div>
                          <div className="text-sm text-gray-600">{locale === 'ar' ? 'م²' : 'sqm'}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <CalendarIcon className="w-6 h-6 text-saffron mx-auto mb-2" />
                          <div className="font-bold text-gray-900">{property.deliveryDate}</div>
                          <div className="text-sm text-gray-600">{t('delivery_date')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{locale === 'ar' ? 'تفاصيل إضافية' : 'Additional Details'}</h4>
                        <div className="space-y-2 text-sm">
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="text-gray-600">{t('built_area')}:</span>
                            <span className="font-medium">{property.builtArea} {locale === 'ar' ? 'م²' : 'sqm'}</span>
                          </div>
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="text-gray-600">{t('floor')}:</span>
                            <span className="font-medium">{property.floor}</span>
                          </div>
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="text-gray-600">{t('finishing')}:</span>
                            <span className="font-medium">{property.finishing[locale as 'ar' | 'en']}</span>
                          </div>
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="text-gray-600">{t('view')}:</span>
                            <span className="font-medium">{property.view[locale as 'ar' | 'en']}</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit Features */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('unit_features')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {property.features.map((feature, index) => (
                            <span
                              key={index}
                              className="bg-saffron/10 text-saffron px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tCard(`features.${feature}`) || feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Project Amenities */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('project_amenities')}</h4>
                        <ul className="space-y-2">
                          {property.amenities.project.map((amenity, index) => (
                            <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{tCard(`features.${amenity}`) || amenity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nearby Facilities */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('nearby_facilities')}</h4>
                        <ul className="space-y-2">
                          {property.amenities.nearby.map((facility, index) => (
                            <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{t(facility)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Unit Features */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('unit_features')}</h4>
                        <ul className="space-y-2">
                          {property.amenities.unit.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                              <CheckCircleIcon className="w-4 h-4 text-saffron" />
                              <span className="text-sm">{tCard(`features.${feature}`) || feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                  <div className="space-y-6">
                    {/* Map Placeholder */}
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPinIcon className="w-12 h-12 mx-auto mb-2" />
                        <p>{locale === 'ar' ? 'خريطة الموقع' : 'Location Map'}</p>
                        <p className="text-sm">{property.location[locale as 'ar' | 'en']}</p>
                      </div>
                    </div>
                    
                    {/* Location Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('transportation')}</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>{locale === 'ar' ? '10 دقائق من مطار القاهرة الجديدة' : '10 minutes from New Cairo Airport'}</li>
                          <li>{locale === 'ar' ? '15 دقيقة من التجمع الأول' : '15 minutes from First Settlement'}</li>
                          <li>{locale === 'ar' ? '20 دقيقة من وسط القاهرة' : '20 minutes from Downtown Cairo'}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t('nearby_facilities')}</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>{locale === 'ar' ? 'مدارس دولية في المنطقة' : 'International schools in the area'}</li>
                          <li>{locale === 'ar' ? 'مستشفيات ومراكز طبية' : 'Hospitals and medical centers'}</li>
                          <li>{locale === 'ar' ? 'مراكز تسوق ومطاعم' : 'Shopping centers and restaurants'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Tab */}
                {activeTab === 'payment' && (
                  <div>
                    <PaymentCalculator propertyPrice={property.startingPrice} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead Capture Form */}
            <LeadCaptureForm
              propertyTitle={property.title[locale as 'ar' | 'en']}
              propertyId={property.propertyId}
            />

            {/* Similar Properties */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className={`text-xl font-bold text-gray-900 mb-6 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {t('similar_properties')}
              </h3>
              <div className="space-y-4">
                {similarProperties.map((similarProperty) => (
                  <div key={similarProperty.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className={`font-semibold text-gray-900 mb-2 ${
                      isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                    }`}>
                      {similarProperty.title[locale as 'ar' | 'en']}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {similarProperty.location[locale as 'ar' | 'en']}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-saffron">
                        {formatCurrency(similarProperty.startingPrice)}
                      </span>
                      <Link
                        href={`/projects/${similarProperty.slug}` as any}
                        className="text-sm text-saffron hover:text-saffron/80"
                      >
                        {t('view_all_properties')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={"/projects" as any}
                className="block w-full text-center mt-6 py-2 border border-saffron text-saffron rounded-lg hover:bg-saffron hover:text-white transition-colors duration-200"
              >
                {t('view_all_properties')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
