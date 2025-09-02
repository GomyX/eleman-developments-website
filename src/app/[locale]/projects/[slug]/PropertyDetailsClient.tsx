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
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormType, setContactFormType] = useState<'visit' | 'call'>('visit');
  const heroIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
        setCurrentImageIndex((prev) => 
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
          {property.images.slice(0, 4).map((image, index) => (
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
                className="object-cover scale-105"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        {/* Social Share Icons - Top Right */}
        <div className="absolute top-6 right-6 z-20">
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              {isFavorite ? (
                <HeartSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <ShareIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Hero Content - Centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6 max-w-4xl">
            {/* Arabic Headline */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              <span className="block text-white drop-shadow-lg">
                {property.title.ar}
              </span>
            </h1>
            
            {/* English Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-amber-100 mb-6 leading-relaxed">
              {property.title.en}
            </h2>

            {/* Price */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-8 drop-shadow-lg">
              {formatCurrency(property.startingPrice)}
            </div>

            {/* Location */}
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-8">
              <MapPinIcon className="w-6 h-6 text-amber-300" />
              <span className="text-xl text-white">
                {property.location[locale as 'ar' | 'en']}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2 rtl:space-x-reverse">
            {property.images.slice(0, 4).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentHeroImageIndex 
                    ? 'bg-amber-400 scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA Buttons - Always Visible */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 sm:hidden">
        <a
          href="https://wa.me/+201234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </a>
        <button
          onClick={() => handleRequestVisit('call')}
          className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <PhoneIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleRequestVisit('visit')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <CalendarIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sticky CTAs */}
      <div className="hidden sm:block fixed top-1/2 right-6 transform -translate-y-1/2 z-50">
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
      </div>
      {/* 2. Storytelling Journey - Split Screen Layout */}
      <div className="py-16 lg:py-24">
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
                {/* Image Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
              </div>

              {/* Text Section */}
              <div className={`flex items-center px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white ${
                story.layout === 'right' ? 'lg:col-start-1' : ''
              }`}>
                <div className="max-w-xl mx-auto w-full">
                  {/* Section Number */}
                  <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <div className={`${isRTL ? 'mr-4' : 'ml-4'}`}>
                      <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Arabic Title & Text */}
                  <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 font-arabic leading-tight">
                      {story.title.ar}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-arabic">
                      {story.arabicText}
                    </p>
                  </div>

                  {/* English Title & Text */}
                  <div className="mb-8 text-left">
                    <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-gray-800 mb-3 font-latin">
                      {story.title.en}
                    </h4>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed font-latin">
                      {story.englishText}
                    </p>
                  </div>

                  {/* Facts List */}
                  <div className="space-y-3 mb-8">
                    {story.facts.map((fact, factIndex) => (
                      <div key={factIndex} className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                        <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircleIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className={`${isRTL ? 'text-right' : 'text-left'} flex-1`}>
                          <p className={`font-medium text-gray-800 text-sm sm:text-base ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                            {fact.ar}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 font-latin mt-1">
                            {fact.en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons for this section */}
                  {index === storyJourney.length - 1 && (
                    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                      <button
                        onClick={() => handleRequestVisit('visit')}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base touch-manipulation"
                      >
                        {locale === 'ar' ? 'احجز زيارتك الآن' : 'Book Your Visit Now'}
                      </button>
                      <button
                        onClick={() => handleRequestVisit('call')}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base touch-manipulation"
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 sm:hidden">
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
      </div>

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

