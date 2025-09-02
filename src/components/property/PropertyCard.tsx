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
    default: 'bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-eleman-gold/30 transform hover:-translate-y-2',
    compact: 'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden group border border-gray-100 hover:border-eleman-gold/20 transform hover:-translate-y-1',
    featured: 'bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-600 overflow-hidden group border-2 border-eleman-gold/20 hover:border-eleman-gold/40 transform hover:-translate-y-3 relative'
  };

  const imageHeight = {
    default: 'h-52 sm:h-60',
    compact: 'h-44',
    featured: 'h-68 sm:h-80'
  };

  return (
    <div className={`${cardClasses[variant]} relative`}>
      {/* Featured badge for featured variant */}
      {variant === 'featured' && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-eleman-gold to-eleman-dark-gold text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
          {locale === 'ar' ? 'مميز' : 'FEATURED'}
        </div>
      )}

      {/* Property Image */}
      <div className={`relative ${imageHeight[variant]} overflow-hidden`}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
        
        {/* Image or Placeholder */}
        {!imageError && property.image ? (
          <Image
            src={property.image}
            alt={locale === 'ar' ? property.title.ar : property.title.en}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-eleman-gold/15 via-white to-eleman-dark-gold/15 flex items-center justify-center relative">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 border border-eleman-gold rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-6 h-6 bg-eleman-gold/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-eleman-gold/30 rounded-full"></div>
            </div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-eleman-gold to-eleman-dark-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl">
                <span className="text-3xl font-bold text-white">إ</span>
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">
                {locale === 'ar' ? property.title.ar : property.title.en}
              </h4>
              <p className="text-sm text-gray-600 font-medium">
                {locale === 'ar' ? 'صورة قادمة قريباً' : 'Image coming soon'}
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Status Badge */}
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-20`}>
          <div className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${getStatusColor(property.status)}`}>
            {getStatusIcon(property.status)}
            <span>{t(property.status)}</span>
          </div>
        </div>

        {/* Enhanced Favorite Button */}
        {showFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 z-20`}
          >
            {isFavorite ? (
              <HeartSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutline className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
        )}

        {/* Enhanced Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-15">
          <div className="flex space-x-4 rtl:space-x-reverse transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse shadow-lg hover:shadow-xl transform hover:scale-110"
              title={t('whatsapp')}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handlePhoneClick}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse shadow-lg hover:shadow-xl transform hover:scale-110"
              title={t('call_now')}
            >
              <PhoneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Property Details */}
      <div className={`${variant === 'featured' ? 'p-8' : 'p-6'} relative`}>
        {/* Project Name with enhanced styling */}
        {property.projectName && (
          <div className="mb-3">
            <span className={`inline-flex items-center text-sm text-eleman-gold font-bold px-3 py-1 bg-eleman-gold/10 rounded-full border border-eleman-gold/20 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <div className="w-2 h-2 bg-eleman-gold rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
              {locale === 'ar' ? property.projectName.ar : property.projectName.en}
            </span>
          </div>
        )}

        {/* Property Title with better typography */}
        <h3 className={`${variant === 'featured' ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-3 leading-tight group-hover:text-eleman-gold transition-colors duration-300 ${
          isRTL ? 'font-arabic text-right' : 'font-latin text-left'
        }`}>
          {locale === 'ar' ? property.title.ar : property.title.en}
        </h3>

        {/* Enhanced Location */}
        <div className={`flex items-center text-gray-600 mb-5 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <div className="p-1.5 bg-gray-100 rounded-full mr-2 rtl:mr-0 rtl:ml-2 group-hover:bg-eleman-gold/10 transition-colors duration-300">
            <MapPinIcon className="w-4 h-4 text-gray-500 group-hover:text-eleman-gold transition-colors duration-300" />
          </div>
          <span className="text-sm font-medium">
            {locale === 'ar' ? property.location.ar : property.location.en}
          </span>
        </div>

        {/* Enhanced Key Details */}
        <div className={`grid grid-cols-3 gap-4 mb-6 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}>
          {/* Bedrooms */}
          <div className={`text-center p-3 bg-gray-50 rounded-xl hover:bg-eleman-gold/5 transition-colors duration-300 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <div className="p-2 bg-white rounded-lg shadow-sm mx-auto mb-2 w-fit">
              <HomeIcon className="w-5 h-5 text-eleman-gold mx-auto" />
            </div>
            <p className="font-bold text-gray-900 text-lg">{property.bedrooms}</p>
            <p className="text-gray-600 font-medium text-xs">{t('bedrooms')}</p>
          </div>

          {/* Area */}
          <div className={`text-center p-3 bg-gray-50 rounded-xl hover:bg-eleman-gold/5 transition-colors duration-300 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <div className="p-2 bg-white rounded-lg shadow-sm mx-auto mb-2 w-fit">
              <div className="w-5 h-5 bg-eleman-gold rounded mx-auto"></div>
            </div>
            <p className="font-bold text-gray-900 text-lg">{property.area}</p>
            <p className="text-gray-600 font-medium text-xs">{t('sqm')}</p>
          </div>

          {/* Delivery */}
          <div className={`text-center p-3 bg-gray-50 rounded-xl hover:bg-eleman-gold/5 transition-colors duration-300 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <div className="p-2 bg-white rounded-lg shadow-sm mx-auto mb-2 w-fit">
              <CalendarIcon className="w-5 h-5 text-eleman-gold mx-auto" />
            </div>
            <p className="font-bold text-gray-900 text-lg">{property.deliveryDate}</p>
            <p className="text-gray-600 font-medium text-xs">{t('delivery')}</p>
          </div>
        </div>

        {/* Enhanced Features */}
        {property.features && property.features.length > 0 && (
          <div className="mb-6">
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-eleman-gold/10 to-eleman-dark-gold/10 text-gray-800 text-xs px-3 py-2 rounded-full font-medium border border-eleman-gold/20 hover:border-eleman-gold/40 hover:bg-eleman-gold/20 transition-all duration-300"
                >
                  {t(`features.${feature}`) || feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="text-xs text-gray-600 px-3 py-2 font-medium bg-gray-100 rounded-full">
                  +{property.features.length - 3} {isRTL ? 'أخرى' : 'more'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Price Section */}
        <div className={`mb-6 p-4 bg-gradient-to-r from-gray-50 to-eleman-gold/5 rounded-xl border border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-xs text-gray-600 mb-1 font-medium uppercase tracking-wide">{t('starting_from')}</p>
          <p className={`${variant === 'featured' ? 'text-3xl' : 'text-2xl'} font-bold text-transparent bg-gradient-to-r from-eleman-gold to-eleman-dark-gold bg-clip-text ${
            isRTL ? 'font-arabic' : 'font-latin'
          }`}>
            {formatPrice(property.startingPrice)}
          </p>
        </div>

        {/* Enhanced Action Buttons */}
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            onClick={handleWhatsAppClick}
            className="group flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse transform hover:scale-[1.02] relative overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <ChatBubbleLeftRightIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{t('book_visit')}</span>
          </button>
          
          <Link
            href={`/projects/${property.slug}` as any}
            className="group flex-1 bg-eleman-gold hover:bg-eleman-dark-gold text-white py-4 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse hover:shadow-lg transform hover:scale-[1.02] relative overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10">{t('learn_more')}</span>
            <div className="relative z-10">
              {isRTL ? (
                <ArrowLeftIcon className="w-4 h-4" />
              ) : (
                <ArrowRightIcon className="w-4 h-4" />
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
