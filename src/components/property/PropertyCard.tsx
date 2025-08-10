'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPinIcon, 
  HomeIcon,
  CalendarIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartOutline
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';
import { useState } from 'react';

export interface PropertyCardProps {
  property: {
    id: string;
    slug: string;
    title: {
      ar: string;
      en: string;
    };
    location: {
      ar: string;
      en: string;
    };
    startingPrice: number;
    bedrooms: number;
    area: number;
    deliveryDate: string;
    image: string;
    status: 'available' | 'sold_out' | 'coming_soon';
    features?: string[];
    projectName?: {
      ar: string;
      en: string;
    };
    whatsappNumber?: string;
    phoneNumber?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  showFavorite?: boolean;
  onFavoriteClick?: (propertyId: string) => void;
  isFavorite?: boolean;
}

export default function PropertyCard({ 
  property, 
  variant = 'default',
  showFavorite = false,
  onFavoriteClick,
  isFavorite = false
}: PropertyCardProps) {
  const locale = useLocale();
  const t = useTranslations('property_card');
  
  const isRTL = locale === 'ar';
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      const millions = price / 1000000;
      return `${millions.toFixed(1)} ${t('million_egp')}`;
    }
    return `${price.toLocaleString()} ${t('egp')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'sold_out':
        return 'bg-red-100 text-red-800';
      case 'coming_soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircleIcon className="w-3 h-3" />;
      case 'sold_out':
        return <XCircleIcon className="w-3 h-3" />;
      case 'coming_soon':
        return <ClockIcon className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleWhatsAppClick = () => {
    const title = locale === 'ar' ? property.title.ar : property.title.en;
    const location = locale === 'ar' ? property.location.ar : property.location.en;
    const message = encodeURIComponent(
      `${isRTL ? 'مرحباً، أريد الاستفسار عن' : 'Hello, I would like to inquire about'} ${title} ${isRTL ? 'في' : 'in'} ${location}`
    );
    const phoneNumber = property.whatsappNumber || '+201234567890';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handlePhoneClick = () => {
    const phoneNumber = property.phoneNumber || '+201234567890';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteClick) {
      onFavoriteClick(property.id);
    }
  };

  const cardClasses = {
    default: 'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group',
    compact: 'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group',
    featured: 'bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-saffron/20'
  };

  const imageHeight = {
    default: 'h-48 sm:h-56',
    compact: 'h-40',
    featured: 'h-64 sm:h-72'
  };

  return (
    <div className={cardClasses[variant]}>
      {/* Property Image */}
      <div className={`relative ${imageHeight[variant]} overflow-hidden`}>
        {/* Image or Placeholder */}
        {!imageError && property.image ? (
          <Image
            src={property.image}
            alt={locale === 'ar' ? property.title.ar : property.title.en}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-saffron/20 to-teal/20 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-saffron">إ</span>
              </div>
              <p className="text-sm">{locale === 'ar' ? property.title.ar : property.title.en}</p>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <div className={`flex items-center space-x-1 rtl:space-x-reverse px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.status)}`}>
            {getStatusIcon(property.status)}
            <span>{t(property.status)}</span>
          </div>
        </div>

        {/* Favorite Button */}
        {showFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200`}
          >
            {isFavorite ? (
              <HeartSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutline className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
              title={t('whatsapp')}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handlePhoneClick}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
              title={t('call_now')}
            >
              <PhoneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className={variant === 'featured' ? 'p-8' : 'p-6'}>
        {/* Project Name (if provided) */}
        {property.projectName && (
          <p className={`text-sm text-saffron font-semibold mb-2 ${
            isRTL ? 'font-arabic text-right' : 'font-latin text-left'
          }`}>
            {locale === 'ar' ? property.projectName.ar : property.projectName.en}
          </p>
        )}

        {/* Property Title */}
        <h3 className={`${variant === 'featured' ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-2 ${
          isRTL ? 'font-arabic text-right' : 'font-latin text-left'
        }`}>
          {locale === 'ar' ? property.title.ar : property.title.en}
        </h3>

        {/* Location */}
        <div className={`flex items-center text-gray-600 mb-4 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <MapPinIcon className={`w-4 h-4 ${isRTL ? 'mr-0 ml-2' : 'mr-2 ml-0'}`} />
          <span className="text-sm">
            {locale === 'ar' ? property.location.ar : property.location.en}
          </span>
        </div>

        {/* Key Details */}
        <div className={`grid grid-cols-3 gap-4 mb-4 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
          {/* Bedrooms */}
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <HomeIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="font-semibold text-gray-900">{property.bedrooms}</p>
            <p className="text-gray-600">{t('bedrooms')}</p>
          </div>

          {/* Area */}
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <div className="w-5 h-5 bg-gray-400 rounded mx-auto mb-1"></div>
            <p className="font-semibold text-gray-900">{property.area}</p>
            <p className="text-gray-600">{t('sqm')}</p>
          </div>

          {/* Delivery */}
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <CalendarIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="font-semibold text-gray-900">{property.deliveryDate}</p>
            <p className="text-gray-600">{t('delivery')}</p>
          </div>
        </div>

        {/* Features (if provided) */}
        {property.features && property.features.length > 0 && (
          <div className="mb-4">
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-sand text-teal text-xs px-2 py-1 rounded-full font-medium"
                >
                  {t(`features.${feature}`) || feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{property.features.length - 3} {isRTL ? 'أخرى' : 'more'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-xs text-gray-500 mb-1">{t('starting_from')}</p>
          <p className={`${variant === 'featured' ? 'text-2xl' : 'text-xl'} font-bold text-saffron ${
            isRTL ? 'font-arabic' : 'font-latin'
          }`}>
            {formatPrice(property.startingPrice)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-saffron text-white py-3 px-4 rounded-lg font-semibold hover:bg-saffron/90 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            <span>{t('book_visit')}</span>
          </button>
          
          <Link
            href={`/projects/${property.slug}` as any}
            className="flex-1 bg-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal/90 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <span>{t('learn_more')}</span>
            {isRTL ? (
              <ArrowLeftIcon className="w-4 h-4" />
            ) : (
              <ArrowRightIcon className="w-4 h-4" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
