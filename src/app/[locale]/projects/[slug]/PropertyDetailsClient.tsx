'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
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
  CheckCircleIcon,
  StarIcon,
  SparklesIcon,
  XMarkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid';

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

  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormType, setContactFormType] = useState<'visit' | 'call'>('visit');
  const heroIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const featuresIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Story journey data with alternating layout
  const storyJourney = [
    {
      title: { ar: 'من أول خطوة', en: 'From First Glance' },
      arabicText: 'فيلا على مساحة أرض ٨٢٥م ومباني ٤٢٠م… من أول خطوة هتحس إنك في بيت العمر.',
      englishText: 'An 825 sqm plot with 420 sqm built-up area… from the very first step, you\'ll feel at home.',
      image: property.images[0]?.url || '/images/properties/villa-facade.jpg',
      layout: 'left', // image left, text right
      facts: [
        { ar: '٨٢٥م² مساحة الأرض', en: '825 sqm plot area' },
        { ar: '٤٢٠م² مساحة البناء', en: '420 sqm built-up' },
        { ar: 'تصميم معماري فريد', en: 'Unique architectural design' }
      ]
    },
    {
      title: { ar: 'واحة الاسترخاء', en: 'Your Private Oasis' },
      arabicText: 'حديقة خاصة ١٨٠م بنجيل طبيعي وحمام سباحة ٦٠م بغطاء متحرك للخصوصية.',
      englishText: 'A private 180 sqm garden and 60 sqm pool with retractable roof for privacy.',
      image: property.images[1]?.url || '/images/properties/villa-pool.jpg',
      layout: 'right', // image right, text left
      facts: [
        { ar: '١٨٠م² حديقة خاصة', en: '180 sqm private garden' },
        { ar: '٦٠م² حمام سباحة', en: '60 sqm swimming pool' },
        { ar: 'غطاء متحرك للخصوصية', en: 'Retractable cover for privacy' }
      ]
    },
    {
      title: { ar: 'قلب البيت', en: 'Heart of Home' },
      arabicText: 'ريسبشن ٣ قطع، مطبخ فسيح، غرفة ماستر، تراسين على الحديقة.',
      englishText: '3-piece reception, spacious kitchen, master bedroom, and two terraces with garden views.',
      image: property.images[2]?.url || '/images/properties/villa-living.jpg',
      layout: 'left',
      facts: [
        { ar: '٣ قطع استقبال', en: '3 reception areas' },
        { ar: 'مطبخ فسيح مجهز', en: 'Fully equipped kitchen' },
        { ar: 'تراسين على الحديقة', en: '2 garden terraces' }
      ]
    },
    {
      title: { ar: 'ملاذ العائلة', en: 'Family Sanctuary' },
      arabicText: '٤ غرف (٢ ماستر)، ريسبشن عائلي، تراس كبير مطل على حمام السباحة.',
      englishText: '4 bedrooms (2 master), family reception, large terrace overlooking the pool.',
      image: property.images[3]?.url || '/images/properties/villa-bedrooms.jpg',
      layout: 'right',
      facts: [
        { ar: '٤ غرف نوم', en: '4 bedrooms' },
        { ar: '٢ غرف ماستر', en: '2 master suites' },
        { ar: 'ريسبشن عائلي', en: 'Family reception' }
      ]
    },
    {
      title: { ar: 'قمة الإلهام', en: 'Peak of Inspiration' },
      arabicText: 'غرفتين (منهم ماستر)، أوفيس للعمل، تراس مفتوح على حمام السباحة.',
      englishText: '2 bedrooms (1 master), home office, and an open terrace with pool view.',
      image: property.images[4]?.url || '/images/properties/villa-office.jpg',
      layout: 'left',
      facts: [
        { ar: '٢ غرف نوم', en: '2 bedrooms' },
        { ar: 'مكتب منزلي', en: 'Home office' },
        { ar: 'إطلالة بانورامية', en: 'Panoramic views' }
      ]
    }
  ];

  // Story slides data for the new format
  const storySlides = [
    {
      title: { ar: 'من أول خطوة', en: 'From First Glance' },
      mainText: { ar: 'فيلا على مساحة أرض ٨٢٥م ومباني ٤٢٠م… من أول خطوة هتحس إنك في بيت العمر.', en: 'An 825 sqm plot with 420 sqm built-up area… from the very first step, you\'ll feel at home.' },
      subText: { ar: 'تصميم معماري فريد يجمع بين الفخامة والراحة', en: 'Unique architectural design combining luxury and comfort' },
      image: property.images[0]?.url || '/images/properties/villa-facade.jpg',
      icon: HomeIcon,
      colorFrom: 'from-amber-400',
      colorTo: 'to-amber-600',
      features: [
        { ar: '٨٢٥م² مساحة الأرض', en: '825 sqm plot area' },
        { ar: '٤٢٠م² مساحة البناء', en: '420 sqm built-up' },
        { ar: 'تصميم معماري فريد', en: 'Unique architectural design' },
        { ar: 'واجهة حديثة أنيقة', en: 'Modern elegant facade' }
      ]
    },
    {
      title: { ar: 'واحة الاسترخاء', en: 'Your Private Oasis' },
      mainText: { ar: 'حديقة خاصة ١٨٠م بنجيل طبيعي وحمام سباحة ٦٠م بغطاء متحرك للخصوصية.', en: 'A private 180 sqm garden and 60 sqm pool with retractable roof for privacy.' },
      subText: { ar: 'مساحة خضراء للاستمتاع بالطبيعة والهدوء', en: 'Green space to enjoy nature and tranquility' },
      image: property.images[1]?.url || '/images/properties/villa-pool.jpg',
      icon: SparklesIcon,
      colorFrom: 'from-blue-400',
      colorTo: 'to-blue-600',
      features: [
        { ar: '١٨٠م² حديقة خاصة', en: '180 sqm private garden' },
        { ar: '٦٠م² حمام سباحة', en: '60 sqm swimming pool' },
        { ar: 'غطاء متحرك للخصوصية', en: 'Retractable cover for privacy' },
        { ar: 'إضاءة ليلية مميزة', en: 'Premium night lighting' }
      ]
    },
    {
      title: { ar: 'قلب البيت', en: 'Heart of Home' },
      mainText: { ar: 'ريسبشن ٣ قطع، مطبخ فسيح، غرفة ماستر، تراسين على الحديقة.', en: '3-piece reception, spacious kitchen, master bedroom, and two terraces with garden views.' },
      subText: { ar: 'مساحات معيشة مفتوحة تجمع العائلة', en: 'Open living spaces that bring the family together' },
      image: property.images[2]?.url || '/images/properties/villa-living.jpg',
      icon: BuildingOffice2Icon,
      colorFrom: 'from-green-400',
      colorTo: 'to-green-600',
      features: [
        { ar: '٣ قطع استقبال', en: '3 reception areas' },
        { ar: 'مطبخ فسيح مجهز', en: 'Fully equipped kitchen' },
        { ar: 'تراسين على الحديقة', en: '2 garden terraces' },
        { ar: 'إطلالات بانورامية', en: 'Panoramic views' }
      ]
    },
    {
      title: { ar: 'ملاذ العائلة', en: 'Family Sanctuary' },
      mainText: { ar: '٤ غرف (٢ ماستر)، ريسبشن عائلي، تراس كبير مطل على حمام السباحة.', en: '4 bedrooms (2 master), family reception, large terrace overlooking the pool.' },
      subText: { ar: 'مساحات خاصة للراحة والاستجمام', en: 'Private spaces for rest and relaxation' },
      image: property.images[3]?.url || '/images/properties/villa-bedrooms.jpg',
      icon: CubeIcon,
      colorFrom: 'from-purple-400',
      colorTo: 'to-purple-600',
      features: [
        { ar: '٤ غرف نوم', en: '4 bedrooms' },
        { ar: '٢ غرف ماستر', en: '2 master suites' },
        { ar: 'ريسبشن عائلي', en: 'Family reception' },
        { ar: 'تراس مع إطلالة', en: 'Terrace with view' }
      ]
    },
    {
      title: { ar: 'قمة الإلهام', en: 'Peak of Inspiration' },
      mainText: { ar: 'غرفتين (منهم ماستر)، أوفيس للعمل، تراس مفتوح على حمام السباحة.', en: '2 bedrooms (1 master), home office, and an open terrace with pool view.' },
      subText: { ar: 'مساحة عمل مثالية مع إطلالة رائعة', en: 'Perfect workspace with stunning views' },
      image: property.images[4]?.url || '/images/properties/villa-office.jpg',
      icon: EyeIcon,
      colorFrom: 'from-orange-400',
      colorTo: 'to-orange-600',
      features: [
        { ar: '٢ غرف نوم', en: '2 bedrooms' },
        { ar: 'مكتب منزلي', en: 'Home office' },
        { ar: 'إطلالة بانورامية', en: 'Panoramic views' },
        { ar: 'تراس مفتوح', en: 'Open terrace' }
      ]
    }
  ];

  // Villa features data for the slider
  const villaFeatures = [
    {
      id: 1,
      title: { 
        ar: 'في قلب مجتمع من القصور والفيلات الفاخرة', 
        en: 'Surrounded by luxurious castles and villas' 
      },
      description: { 
        ar: 'موقع استثنائي وسط أرقى المجتمعات السكنية', 
        en: 'Exceptional location among the finest residential communities' 
      },
      image: property.images[0]?.url || '/images/properties/villa-community.jpg',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 2,
      title: { 
        ar: 'حمام سباحة خاص للاستجمام والرفاهية', 
        en: 'Private swimming pool for relaxation and luxury' 
      },
      description: { 
        ar: 'مساحة مائية خاصة لقضاء أوقات لا تُنسى', 
        en: 'Private aquatic space for unforgettable moments' 
      },
      image: property.images[1]?.url || '/images/properties/villa-pool.jpg',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      title: { 
        ar: 'مكان هادئ بعيد عن الضوضاء', 
        en: 'A peaceful retreat away from the noise' 
      },
      description: { 
        ar: 'هدوء الطبيعة في قلب الريف الأوروبي', 
        en: 'Nature\'s tranquility in the heart of European countryside' 
      },
      image: property.images[2]?.url || '/images/properties/villa-garden.jpg',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      title: { 
        ar: 'خصوصية كاملة حتى داخل حمام السباحة', 
        en: 'Complete privacy even in the pool area' 
      },
      description: { 
        ar: 'سقف متحرك وستائر تضمن الخصوصية التامة', 
        en: 'Retractable roof and curtains ensure complete privacy' 
      },
      image: property.images[3]?.url || '/images/properties/villa-private-pool.jpg',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 5,
      title: { 
        ar: 'أفضل موقع في أجمل مناطق الريف الأوروبي', 
        en: 'Prime location in the finest European countryside' 
      },
      description: { 
        ar: 'إطلالات خلابة وطبيعة ساحرة تحيط بك', 
        en: 'Stunning views and enchanting nature surrounding you' 
      },
      image: property.images[4]?.url || '/images/properties/villa-location.jpg',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  // Navigation functions
  const goToPreviousStory = () => {
    setCurrentStoryIndex((prev) => prev > 0 ? prev - 1 : 0);
  };

  const goToNextStory = () => {
    setCurrentStoryIndex((prev) => prev < storySlides.length - 1 ? prev + 1 : prev);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  // Hero image auto-scroll
  useEffect(() => {
    if (property.images.length > 1) {
      heroIntervalRef.current = setInterval(() => {
        setCurrentHeroImageIndex((prev) => 
          prev === property.images.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    }
    
    return () => {
      if (heroIntervalRef.current) {
        clearInterval(heroIntervalRef.current);
      }
    };
  }, [property.images.length]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title[locale as 'ar' | 'en'],
        text: property.description[locale as 'ar' | 'en'],
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(locale === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
    }
  };

  const handleRequestVisit = (type: 'visit' | 'call') => {
    setContactFormType(type);
    setShowContactForm(true);
  };

  const handleSubmitContact = (data: { name: string; phone: string }) => {
    const action = contactFormType === 'visit' 
      ? (locale === 'ar' ? 'زيارة العقار' : 'property visit')
      : (locale === 'ar' ? 'مكالمة هاتفية' : 'phone call');
    
    alert(
      locale === 'ar' 
        ? `شكراً ${data.name}! سيتم التواصل معك قريباً لتنسيق ${action}`
        : `Thank you ${data.name}! We'll contact you soon to schedule your ${action}`
    );
    setShowContactForm(false);
  };

  return (
    
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section - Full-width Image Slider with Overlay */}
      <div className="relative h-screen overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {property.images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover scale-100 hover:scale-105 transition-transform duration-[5000ms] ease-out"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
          
          {/* Gradient Overlay - Reduced for better image visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        </div>

        {/* Social Share Icons - Top Right */}
        <div className="absolute top-6 right-6 z-20">
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-all duration-300 shadow-lg"
            >
              {isFavorite ? (
                <HeartSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-all duration-300 shadow-lg"
            >
              <ShareIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Hero Content - Right Bottom */}
        <div className="absolute bottom-0 right-0 z-10 p-6 sm:p-8 lg:p-12">
          <div className={`max-w-2xl ${isRTL ? 'text-right' : 'text-right'}`}>
            {/* Arabic Headline */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <span className="block text-white drop-shadow-2xl">
                {property.title.ar}
              </span>
            </h1>
            
            {/* English Headline */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-amber-100 mb-4 sm:mb-6 leading-relaxed drop-shadow-lg">
              {property.title.en}
            </h2>

            {/* Arabic Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-amber-200 mb-4 sm:mb-6 leading-relaxed drop-shadow-lg font-arabic">
              فيلا فاخرة بتصميم يجمع بين الفخامة والراحة – بيت العمر في انتظارك
            </p>

            {/* Price */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 mb-4 sm:mb-6 drop-shadow-2xl">
              {formatCurrency(property.startingPrice)}
            </div>

            {/* Location */}
            <div className={`flex items-center space-x-2 rtl:space-x-reverse mb-6 sm:mb-8 ${isRTL ? 'justify-end' : 'justify-end'}`}>
              <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow-lg" />
              <span className="text-lg sm:text-xl text-white drop-shadow-lg">
                {property.location[locale as 'ar' | 'en']}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Progress Bar (Continuous) */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 w-[86vw] max-w-md">
          <div
            role="progressbar"
            aria-label="Slide progress"
            aria-valuemin={0}
            aria-valuemax={property.images.length - 1}
            aria-valuenow={currentHeroImageIndex}
            className="h-1.5 sm:h-2 rounded-full bg-white/30 backdrop-blur-[2px] ring-1 ring-black/5"
          >
            <div
              className="h-full rounded-full bg-amber-400 transition-[width] duration-300"
              style={{
          width: `${((currentHeroImageIndex + 1) / property.images.length) * 100}%`,
              }}
            />
          </div>

          {/* (Optional) tiny labels */}
          <div className="mt-1 text-[10px] sm:text-xs text-white/80 text-center">
            {currentHeroImageIndex + 1} / {property.images.length}
          </div>
        </div>

        {/* Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentHeroImageIndex(prev => 
          prev === 0 ? property.images.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentHeroImageIndex(prev => 
          prev === property.images.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Touch Swipe Gesture Overlay */}
        <div
          className="absolute inset-0 z-10"
          onTouchStart={(e) => {
            const touchStartX = e.touches[0].clientX;
            e.currentTarget.setAttribute('data-touch-start', touchStartX.toString());
          }}
          onTouchEnd={(e) => {
            const touchStartX = parseFloat(e.currentTarget.getAttribute('data-touch-start') || '0');
            const touchEndX = e.changedTouches[0].clientX;
            const diffX = touchStartX - touchEndX;
            
            // Minimum swipe distance threshold
            if (Math.abs(diffX) > 50) {
              if (diffX > 0) {
          // Swiped left - go to next
          setCurrentHeroImageIndex(prev => 
            prev === property.images.length - 1 ? 0 : prev + 1
          );
              } else {
          // Swiped right - go to previous
          setCurrentHeroImageIndex(prev => 
            prev === 0 ? property.images.length - 1 : prev - 1
          );
              }
            }
          }}
        />

      </div>

      {/* Villa Features Section - Horizontal Scroll Cards */}
      <div className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {locale === 'ar' ? 'إيه اللي بيميز فيلا نور؟' : 'What makes Villa Nour special?'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Horizontal Scrolling Cards */}
          <div className="relative">
            {/* Horizontal scroll container */}
            <div className="overflow-x-auto scrollbar-hide pb-8">
              <div className={`flex space-x-8 rtl:space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'} px-4`} style={{ width: 'max-content' }}>
                {villaFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="group relative flex-shrink-0 cursor-pointer"
                    style={{ 
                      width: '320px', 
                      minWidth: '320px',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Card Container with Enhanced Hover Effects */}
                    <div className="relative transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4 group-hover:rotate-1">
                      {/* Main Card */}
                      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl group-hover:shadow-2xl transition-all duration-700">
                        {/* Image Container with Dynamic Effects */}
                        <div className="relative h-72 overflow-hidden rounded-t-3xl">
                          <Image
                            src={feature.image}
                            alt={feature.title[locale as 'ar' | 'en']}
                            fill
                            className="object-cover transition-all duration-1000 ease-out group-hover:scale-125 group-hover:rotate-2"
                            sizes="320px"
                          />
                          
                          {/* Dynamic Gradient Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 group-hover:opacity-40 transition-all duration-700`}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-700"></div>

                          {/* Animated Particles Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-300"></div>
                            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce delay-500"></div>
                          </div>

                          {/* Hover Overlay with Icon */}
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                <EyeIcon className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Section Below Image */}
                        <div className="p-6 bg-white transform transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-amber-50">
                          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                            {/* Title */}
                            <h3 className={`text-xl font-bold text-gray-900 mb-3 leading-tight transition-all duration-300 group-hover:text-amber-600 ${
                              isRTL ? 'font-arabic' : 'font-latin'
                            }`}>
                              {feature.title[locale as 'ar' | 'en']}
                            </h3>

                            {/* Description */}
                            <p className={`text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-800 ${
                              isRTL ? 'font-arabic text-base' : 'font-latin text-sm'
                            }`}>
                              {feature.description[locale as 'ar' | 'en']}
                            </p>
                          </div>

                          {/* Animated Bottom Border */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-300 rounded-b-3xl"></div>
                        </div>
                      </div>

                      {/* Enhanced Shadow Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/10 to-amber-600/10 -z-10 transform scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simplified Scroll Hint */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500 text-sm">
                <span className="select-none">
                  {locale === 'ar' ? 'اسحب للمزيد' : 'Scroll for more'}
                </span>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-150"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-300"></div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-amber-500 animate-bounce" />
              </div>
            </div>

            {/* Dynamic Scroll indicators */}
            {/* <div className="flex justify-center mt-6 space-x-2 rtl:space-x-reverse">
              {villaFeatures.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-amber-200 hover:bg-amber-400 transition-colors duration-300 cursor-pointer"
                />
              ))}
            </div> */}
          </div>

          {/* Call to Action */}
          {/* <div className="text-center mt-12 lg:mt-16">
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
              <button
                onClick={() => handleRequestVisit('visit')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                {locale === 'ar' ? 'احجز زيارتك الآن' : 'Book Your Visit Now'}
              </button>
              <button
                onClick={() => handleRequestVisit('call')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                {locale === 'ar' ? 'اطلب مكالمة' : 'Request Call'}
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Floating Action Buttons - Call & WhatsApp Only */}
      <div className="fixed bottom-6 right-6 z-5 flex flex-col space-y-3">
        <a
          href="tel:+201234567890"
          className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <PhoneIcon className="w-6 h-6" />
        </a>
        <a
          href="https://wa.me/+201234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </a>
      </div>

      {/* Desktop Sticky CTAs */}
      {/* <div className="hidden sm:block fixed top-1/2 right-6 transform -translate-y-1/2 z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-4 max-w-xs">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 mb-2">
              {formatCurrency(property.startingPrice)}
            </div>
            <p className="text-gray-600 text-sm">
              {locale === 'ar' ? 'ابدأ استثمارك اليوم' : 'Start your investment today'}
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => handleRequestVisit('call')}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>{locale === 'ar' ? 'طلب مكالمة' : 'Request Call'}</span>
            </button>
            
            <button
              onClick={() => handleRequestVisit('visit')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <CalendarIcon className="w-5 h-5" />
              <span>{locale === 'ar' ? 'حجز زيارة' : 'Book Visit'}</span>
            </button>
            
            <a
              href="https://wa.me/+201234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div> */}

      {/* Villa Details Feature Section */}
      {/* <div className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
                {locale === 'ar' ? 'تفاصيل تميز الفيلا' : 'Villa Distinctive Details'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </div> */}

      {/* 2. Storytelling Journey - Split Screen Layout */}
      <div className="py-16 lg:py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Villa Details Feature Title - Integrated Header */}
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-28">
          <div className="text-center">
            <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {locale === 'ar' ? 'تفاصيل تميز الفيلا' : 'Details that feature the villa'}
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full shadow-xl"></div>
            <p className={`mt-8 text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {locale === 'ar' 
                ? 'اكتشف رحلة استثنائية عبر تفاصيل الفيلا التي تجعلها بيت العمر'
                : 'Discover an exceptional journey through the villa details that make it the home of a lifetime'
              }
            </p>
          </div>
        </div>
        {storyJourney.map((story, index) => (
          <div key={index} className="mb-16 lg:mb-24">
            <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] ${
              story.layout === 'right' ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Image Section */}
              <div className={`relative overflow-hidden h-[300px] sm:h-[400px] lg:h-auto ${
                story.layout === 'right' ? 'lg:col-start-2' : ''
              }`}>
                <Image
                  src={story.image}
                  alt={story.title[locale as 'ar' | 'en']}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[3000ms] ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
                {/* Enhanced Image Overlay for black background contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 via-transparent to-transparent"></div>
              </div>

              {/* Text Section - Enhanced for black background */}
              <div className={`flex items-center px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-sm ${
                story.layout === 'right' ? 'lg:col-start-1' : ''
              }`}>
                <div className="max-w-xl mx-auto w-full">
                  {/* Section Number - Enhanced for dark background */}
                  <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-14 h-14 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg ring-4 ring-amber-400/20">
                      {index + 1}
                    </div>
                    <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
                      <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-lg"></div>
                    </div>
                  </div>

                  {/* Locale-based Title & Text - Enhanced for dark background */}
                  <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {story.title[locale as 'ar' | 'en']}
                    </h3>
                    <p className={`text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {locale === 'ar' ? story.arabicText : story.englishText}
                    </p>
                  </div>

                  {/* Facts List - Enhanced for dark background */}
                  <div className="space-y-4 mb-8">
                    {story.facts.map((fact, factIndex) => (
                      <div key={factIndex} className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                        <div className="w-7 h-7 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                          <CheckCircleIcon className="w-4 h-4 text-black" />
                        </div>
                        <div className={`${isRTL ? 'text-right' : 'text-left'} flex-1`}>
                          <p className={`font-medium text-gray-100 text-sm sm:text-base leading-relaxed ${
                            isRTL ? 'font-arabic' : 'font-latin'
                          }`}>
                            {fact[locale as 'ar' | 'en']}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons for this section - Enhanced for dark background */}
                  {index === storyJourney.length - 1 && (
                    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                      <button
                        onClick={() => handleRequestVisit('visit')}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base touch-manipulation ring-2 ring-amber-400/30 hover:ring-amber-400/50"
                      >
                        {locale === 'ar' ? 'احجز زيارتك الآن' : 'Book Your Visit Now'}
                      </button>
                      <button
                        onClick={() => handleRequestVisit('call')}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border-2 border-amber-400/50 hover:border-amber-400 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base touch-manipulation"
                      >
                        {locale === 'ar' ? 'اطلب مكالمة' : 'Request Call'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Emotional Closing Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          <Image
            src={property.images[property.images.length - 1]?.url || property.images[0]?.url || '/images/properties/villa-sunset.jpg'}
            alt="Villa at sunset"
            fill
            className="object-cover scale-110"
            sizes="100vw"
          />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/20"></div>
        </div>

        {/* Emotional Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Arabic Emotional Text */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-arabic drop-shadow-2xl">
            دي مش مجرد فيلا… دي حياة.
          </h2>
          
          {/* English Emotional Text */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-amber-100 mb-8 leading-relaxed font-latin drop-shadow-lg">
            This isn't just a villa… it's life itself.
          </h3>

          {/* Final Price Highlight */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl mb-8 max-w-2xl mx-auto border border-white/20">
            <div className="text-4xl sm:text-5xl font-bold text-amber-400 mb-4">
              {formatCurrency(property.startingPrice)}
            </div>
            <p className="text-white text-lg sm:text-xl">
              {locale === 'ar' ? 'استثمر في مستقبل عائلتك اليوم' : 'Invest in your family\'s future today'}
            </p>
          </div>

          {/* Final CTA */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse justify-center max-w-md mx-auto">
            <button
              onClick={() => handleRequestVisit('visit')}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform"
            >
              {locale === 'ar' ? 'احجز زيارتك الآن' : 'Book Your Visit Now'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Sticky Bottom Bar for Mobile */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 sm:hidden">
        <div className="flex">
          <a
            href="tel:+201234567890"
            className="flex-1 bg-amber-500 text-white py-4 text-center font-bold transition-colors hover:bg-amber-600 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <PhoneIcon className="w-5 h-5" />
            <span>{locale === 'ar' ? 'اتصل الآن' : 'Call Now'}</span>
          </a>
          <a
            href="https://wa.me/+201234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-4 text-center font-bold transition-colors hover:bg-green-600 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span>{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </a>
          <button
            onClick={() => handleRequestVisit('visit')}
            className="flex-1 bg-blue-500 text-white py-4 text-center font-bold transition-colors hover:bg-blue-600 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <CalendarIcon className="w-5 h-5" />
            <span>{locale === 'ar' ? 'احجز زيارة' : 'Book Visit'}</span>
          </button>
        </div>
      </div> */}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-6 text-white rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {contactFormType === 'visit' 
                      ? (locale === 'ar' ? 'طلب زيارة العقار' : 'Request Property Visit')
                      : (locale === 'ar' ? 'حجز مكالمة استشارية' : 'Book Consultation Call')
                    }
                  </h3>
                  <p className="text-amber-100 text-sm">
                    {locale === 'ar' 
                      ? 'املأ البيانات وسيتواصل معك أحد خبرائنا'
                      : 'Fill your details and our expert will contact you'
                    }
                  </p>
                </div>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-white hover:text-amber-200 transition-colors p-2"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <LeadCaptureForm
                propertyTitle={property.title[locale as 'ar' | 'en']}
                propertyId={property.propertyId}
              />
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Luxury Styling */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        .font-arabic {
          font-family: 'Cairo', 'Segoe UI', sans-serif;
        }
        
        .font-latin {
          font-family: 'Playfair Display', serif;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes smooth-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.1); }
        }
        
        .scale-110:hover {
          animation: smooth-zoom 20s ease-in-out infinite alternate;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Hide scrollbar for horizontal scroll */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth horizontal scroll */
        .overflow-x-auto {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Enhanced card animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Gradient text effect */
        .gradient-text {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Custom hover glow effect */
        .hover-glow:hover {
          filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.3));
        }
        
        /* Improved mobile card spacing */
        @media (max-width: 640px) {
          .flex.space-x-8 > * + * {
            margin-left: 1.5rem;
          }
          
          .flex.rtl\\:space-x-reverse.space-x-8 > * + * {
            margin-right: 1.5rem;
            margin-left: 0;
          }
        }
        
        /* Enhanced card animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Gradient text effect */
        .gradient-text {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Custom hover glow effect */
        .hover-glow:hover {
          filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.3));
        }
        
        /* Improved mobile card spacing */
        @media (max-width: 640px) {
          .flex.space-x-8 > * + * {
            margin-left: 1.5rem;
          }
          
          .flex.rtl\\:space-x-reverse.space-x-8 > * + * {
            margin-right: 1.5rem;
            margin-left: 0;
          }
        }
        
        /* Better mobile touch targets */
        @media (max-width: 640px) {
          button, a {
            min-height: 48px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
        }
        
        /* Mobile image optimization */
        @media (max-width: 640px) {
          .relative img {
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
          }
          
          /* Ensure images are visible on mobile */
          .relative {
            min-height: 200px;
          }
          
          /* Better touch targets */
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Improve text readability on mobile */
          .drop-shadow-2xl {
            filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.8));
          }
          
          /* Ensure bottom text doesn't get cut off */
          .absolute.bottom-0 {
            padding-bottom: 80px;
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1024px) {
          .relative img {
            object-fit: cover;
          }
        }
        
        /* RTL text alignment fixes */
        [dir="rtl"] .text-left {
          text-align: right;
        }
        
        [dir="rtl"] .flex-row {
          flex-direction: row-reverse;
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .bg-gradient-to-r {
            background: #d97706 !important;
          }
        }
      `}</style>
    </div>
  );
}

