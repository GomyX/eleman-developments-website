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

  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormType, setContactFormType] = useState<'visit' | 'call'>('visit');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Touch gesture constants
  const minSwipeDistance = 50;

  // Story slides data
  const storySlides = [
    {
      title: { ar: 'من أول خطوة', en: 'From First Glance' },
      mainText: { 
        ar: 'فيلا على مساحة أرض ٨٢٥م ومباني ٤٢٠م… من أول خطوة هتحس إنك في بيت العمر.',
        en: 'An 825 sqm plot with 420 sqm built-up area… from the very first step, you\'ll feel at home.'
      },
      subText: {
        ar: 'تصميم معماري يجمع بين الأناقة والعملية، مع واجهة تترك انطباعاً لا يُنسى.',
        en: 'Architectural design that blends elegance with functionality, featuring a facade that leaves an unforgettable impression.'
      },
      image: property.images[0]?.url || '/images/properties/villa-facade.jpg',
      icon: HomeIcon,
      colorFrom: 'from-amber-400',
      colorTo: 'to-amber-600',
      features: [
        { ar: '٨٢٥م² مساحة الأرض', en: '825 sqm plot area' },
        { ar: '٤٢٠م² مساحة البناء', en: '420 sqm built-up' },
        { ar: 'تصميم معماري فريد', en: 'Unique architectural design' },
        { ar: 'واجهة مميزة', en: 'Distinguished facade' }
      ]
    },
    {
      title: { ar: 'واحة الاسترخاء', en: 'Your Private Oasis' },
      mainText: {
        ar: 'حديقة خاصة ١٨٠م بنجيل طبيعي وحمام سباحة ٦٠م بغطاء متحرك للخصوصية.',
        en: 'A private 180 sqm garden and 60 sqm pool with retractable roof for privacy.'
      },
      subText: {
        ar: 'تخيل صباحك مع قهوتك المفضلة بجانب المسبح، أو أمسيات العائلة تحت النجوم.',
        en: 'Imagine your morning coffee by the pool, or family evenings under the stars.'
      },
      image: property.images[1]?.url || '/images/properties/villa-pool.jpg',
      icon: HeartIcon,
      colorFrom: 'from-blue-400',
      colorTo: 'to-blue-600',
      features: [
        { ar: '١٨٠م² حديقة خاصة', en: '180 sqm private garden' },
        { ar: '٦٠م² حمام سباحة', en: '60 sqm swimming pool' },
        { ar: 'غطاء متحرك', en: 'Retractable cover' },
        { ar: 'مساحات جلوس متنوعة', en: 'Multiple seating areas' }
      ]
    },
    {
      title: { ar: 'قلب البيت', en: 'Heart of Home' },
      mainText: {
        ar: 'ريسبشن ٣ قطع، مطبخ فسيح، غرفة ماستر، تراسين على الحديقة.',
        en: '3-piece reception, spacious kitchen, master bedroom, and two terraces with garden views.'
      },
      subText: {
        ar: 'الدور الأرضي مصمم للحياة العائلية والضيافة. مساحات مفتوحة تتدفق بسلاسة من الداخل للخارج.',
        en: 'The ground floor is designed for family life and hospitality. Open spaces that flow seamlessly from inside to outside.'
      },
      image: property.images[2]?.url || '/images/properties/villa-living.jpg',
      icon: BuildingOffice2Icon,
      colorFrom: 'from-green-400',
      colorTo: 'to-green-600',
      features: [
        { ar: '٣ قطع استقبال', en: '3 reception areas' },
        { ar: 'مطبخ فسيح', en: 'Spacious kitchen' },
        { ar: 'غرفة ماستر', en: 'Master bedroom' },
        { ar: 'تراسين على الحديقة', en: '2 garden terraces' }
      ]
    },
    {
      title: { ar: 'ملاذ العائلة', en: 'Family Sanctuary' },
      mainText: {
        ar: '٤ غرف (٢ ماستر)، ريسبشن عائلي، تراس كبير مطل على حمام السباحة.',
        en: '4 bedrooms (2 master), family reception, large terrace overlooking the pool.'
      },
      subText: {
        ar: 'هنا حيث تبدأ أحلام أطفالك وتنتهي أيامك بسكينة. مساحات مخصصة للخصوصية والراحة.',
        en: 'Here where your children\'s dreams begin and your days end in peace. Spaces dedicated to privacy and comfort.'
      },
      image: property.images[3]?.url || '/images/properties/villa-bedrooms.jpg',
      icon: HeartIcon,
      colorFrom: 'from-purple-400',
      colorTo: 'to-purple-600',
      features: [
        { ar: '٤ غرف نوم', en: '4 bedrooms' },
        { ar: '٢ غرف ماستر', en: '2 master suites' },
        { ar: 'ريسبشن عائلي', en: 'Family reception' },
        { ar: '٣ بلكونات', en: '3 balconies' }
      ]
    },
    {
      title: { ar: 'قمة الإلهام', en: 'Peak of Inspiration' },
      mainText: {
        ar: 'غرفتين (منهم ماستر)، أوفيس للعمل، تراس مفتوح على حمام السباحة.',
        en: '2 bedrooms (1 master), home office, and an open terrace with pool view.'
      },
      subText: {
        ar: 'الدور الأخير هو مكان الإلهام والإبداع. مكتب منزلي مع إطلالة بانورامية.',
        en: 'The top floor is where inspiration and creativity flourish. A home office with panoramic views.'
      },
      image: property.images[4]?.url || '/images/properties/villa-office.jpg',
      icon: EyeIcon,
      colorFrom: 'from-indigo-400',
      colorTo: 'to-indigo-600',
      features: [
        { ar: '٢ غرف نوم', en: '2 bedrooms' },
        { ar: 'غرفة ماستر', en: '1 master suite' },
        { ar: 'مكتب منزلي', en: 'Home office' },
        { ar: 'إطلالة بانورامية', en: 'Panoramic views' }
      ]
    }
  ];

  // Story navigation functions
  const goToNextStory = () => {
    setCurrentStoryIndex((prev) => 
      prev === storySlides.length - 1 ? prev : prev + 1
    );
  };

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prev) => 
      prev === 0 ? prev : prev - 1
    );
  };

  // Touch gesture handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentStoryIndex < storySlides.length - 1) {
      goToNextStory();
    }
    if (isRightSwipe && currentStoryIndex > 0) {
      goToPreviousStory();
    }
  };

  // Auto-scroll through images
  useEffect(() => {
    if (property.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === property.images.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [property.images.length]);

  // Scroll handler to show/hide gallery
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show gallery when user scrolls past 80% of the hero section
      setShowGallery(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pause auto-scroll on hover
  const handleImageHover = (hovered: boolean) => {
    setIsImageHovered(hovered);
    if (hovered && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else if (!hovered && property.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === property.images.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
  };

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

  const handleRequestVisit = (type: 'visit' | 'call') => {
    setContactFormType(type);
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  const handleSubmitContact = (data: { name: string; phone: string }) => {
    // In a real app, this would submit the contact request
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

  // Contact Form Component
  const ContactFormModal = () => {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.name && formData.phone) {
        handleSubmitContact(formData);
        setFormData({ name: '', phone: '' });
      }
    };

    if (!showContactForm) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-6 text-white rounded-t-2xl">
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-2 ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                {locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
                placeholder={locale === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-2 ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
                placeholder={locale === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
              />
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse pt-4">
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-bold"
              >
                {contactFormType === 'visit'
                  ? (locale === 'ar' ? 'طلب الزيارة' : 'Request Visit')
                  : (locale === 'ar' ? 'حجز المكالمة' : 'Book Call')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/20 to-gray-50">
      {/* Sticky WhatsApp & Phone */}
      <div className="fixed bottom-4 right-4 z-[90] flex flex-col space-y-3">
        <a
          href="https://wa.me/+201234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
        <a
          href="tel:+201234567890"
          className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </a>
      </div>
      {/* Hero Section with Dynamic Background Images */}
      <div className="relative h-screen overflow-hidden z-50">
        {/* Dynamic Background Images */}
        <div className="absolute inset-0">
          {property.images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover scale-110 animate-slow-zoom"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
          {/* Gradient Overlay - Enhanced for mobile readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 sm:from-black/80 sm:via-black/40 sm:to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-8 sm:pb-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-end">
              {/* Property Info */}
              <div className="text-white">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3 sm:mb-4 flex-wrap gap-2">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
                    <SparklesIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    {property.projectName[locale as 'ar' | 'en']}
                  </span>
                  <span className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg ${
                    property.status === 'available' ? 'bg-green-500 text-white' :
                    property.status === 'sold_out' ? 'bg-red-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {property.status === 'available' ? (locale === 'ar' ? 'متاح' : 'Available') :
                     property.status === 'sold_out' ? (locale === 'ar' ? 'مباع' : 'Sold Out') :
                     (locale === 'ar' ? 'قريباً' : 'Coming Soon')}
                  </span>
                </div>
                
                <h1 className={`text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent leading-tight ${
                  isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                }`}>
                  {property.title[locale as 'ar' | 'en']}
                </h1>
                
                {/* Emotional Headline */}
                <div className={`mb-4 sm:mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-lg sm:text-xl lg:text-2xl text-amber-100 font-medium leading-relaxed">
                    {locale === 'ar' 
                      ? 'فيلا فاخرة بتصميم يجمع بين الفخامة والراحة – بيت العمر في انتظارك'
                      : 'A luxury villa where elegance meets comfort – your forever home awaits.'
                    }
                  </p>
                </div>
                
                <div className={`flex items-center space-x-2 rtl:space-x-reverse mb-4 sm:mb-6 ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className="bg-amber-400/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full">
                    <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  </div>
                  <span className="text-lg sm:text-xl text-amber-100">
                    {locale === 'ar' ? 'الريف الأوروبي' : 'European Countryside'}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse mb-8 sm:mb-12">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    {formatCurrency(property.startingPrice)}
                  </div>
                  <div className="text-amber-200 text-sm sm:text-lg">
                    {t('property_id')}: {property.propertyId}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Mobile optimized */}
              <div className={`${isRTL ? 'text-left' : 'text-right'} mt-4 lg:mt-0`}>
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20">
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    <div className="flex space-x-2 sm:space-x-3 rtl:space-x-reverse">
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="flex-1 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm border border-white/30 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 touch-manipulation"
                      >
                        {isFavorite ? (
                          <HeartSolid className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 mx-auto" />
                        ) : (
                          <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
                        )}
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex-1 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm border border-white/30 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 touch-manipulation"
                      >
                        <ShareIcon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
                      </button>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => handleRequestVisit('visit')}
                        className="flex-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 rtl:space-x-reverse touch-manipulation active:scale-95"
                      >
                        <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{locale === 'ar' ? 'طلب زيارة' : 'Request Visit'}</span>
                      </button>
                      <button
                        onClick={() => handleRequestVisit('call')}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 rtl:space-x-reverse touch-manipulation active:scale-95"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span>{locale === 'ar' ? 'حجز مكالمة' : 'Book Call'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Navigation Dots - Enhanced mobile scaling */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-1 sm:space-x-2 rtl:space-x-reverse">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentImageIndex 
                    ? 'bg-amber-400 scale-125 sm:scale-150 shadow-lg ring-2 ring-white/30' 
                    : 'bg-white/50 hover:bg-white/80 active:bg-white/90 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>



      {/* Storytelling Journey - Mobile-First Slide Format */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-16">
        <div className="relative">
          {/* Mobile-Optimized Navigation Header */}
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <div className={`text-center sm:text-left mb-2 sm:mb-3 ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
              <h2 className={`text-lg xs:text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 sm:mb-2 ${
                isRTL ? 'font-arabic' : 'font-latin'
              }`}>
                {locale === 'ar' ? 'رحلة عبر الفيلا' : 'Villa Journey'}
              </h2>
              
              {/* Mobile Progress Bar */}
              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 rtl:space-x-reverse">
                <span className="text-xs sm:text-sm text-gray-600">
                  {locale === 'ar' ? `${currentStoryIndex + 1} من ${storySlides.length}` : `${currentStoryIndex + 1} of ${storySlides.length}`}
                </span>
                <div className="flex-1 max-w-24 xs:max-w-28 sm:max-w-32 lg:max-w-40 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStoryIndex + 1) / storySlides.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center sm:justify-end space-x-2 sm:space-x-3 rtl:space-x-reverse">
              <button
                onClick={goToPreviousStory}
                disabled={currentStoryIndex === 0}
                className={`p-2 sm:p-3 rounded-full transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] ${
                  currentStoryIndex === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50 shadow-md hover:shadow-lg active:scale-95'
                }`}
              >
                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={goToNextStory}
                disabled={currentStoryIndex === storySlides.length - 1}
                className={`p-2 sm:p-3 rounded-full transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] ${
                  currentStoryIndex === storySlides.length - 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50 shadow-md hover:shadow-lg active:scale-95'
                }`}
              >
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Mobile-First Slide Container with Touch Support */}
          <div 
            className="relative h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl sm:rounded-2xl shadow-xl bg-gradient-to-br from-gray-900 via-black to-gray-800"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Image with Mobile-Optimized Loading */}
            <div className="absolute inset-0 transition-all duration-700 ease-out">
              <Image
                src={storySlides[currentStoryIndex]?.image || property.images[0]?.url || '/images/properties/villa-facade.jpg'}
                alt={storySlides[currentStoryIndex]?.title[locale as 'ar' | 'en'] || 'Villa'}
                fill
                className="object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                priority
              />
            </div>
            
            {/* Mobile-Optimized Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent sm:from-black/80 sm:via-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
            
            {/* Mobile-First Content Layout */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
              {/* Icon and Title - Mobile Optimized */}
              <div className="mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${storySlides[currentStoryIndex]?.colorFrom} ${storySlides[currentStoryIndex]?.colorTo} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}>
                    {storySlides[currentStoryIndex]?.icon && (() => {
                      const IconComponent = storySlides[currentStoryIndex].icon;
                      return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight ${
                      isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                    }`}>
                      {storySlides[currentStoryIndex]?.title[locale as 'ar' | 'en']}
                    </h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                      <div className={`h-0.5 bg-gradient-to-r ${storySlides[currentStoryIndex]?.colorFrom} ${storySlides[currentStoryIndex]?.colorTo} rounded-full transition-all duration-500`} 
                           style={{ width: '30px' }}></div>
                      <span className="text-amber-200 text-xs">
                        {currentStoryIndex + 1}/{storySlides.length}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Main Content - Mobile Responsive */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <p className={`text-xs xs:text-sm sm:text-base md:text-lg text-white leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {storySlides[currentStoryIndex]?.mainText[locale as 'ar' | 'en']}
                  </p>
                  <p className={`text-xs sm:text-sm text-gray-200 leading-relaxed ${isRTL ? 'text-right' : 'text-left'} line-clamp-2 sm:line-clamp-none`}>
                    {storySlides[currentStoryIndex]?.subText[locale as 'ar' | 'en']}
                  </p>
                </div>
                
                {/* Mobile Features Grid */}
                {storySlides[currentStoryIndex]?.features && (
                  <div className="mb-3 sm:mb-4">
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3">
                      {storySlides[currentStoryIndex].features.slice(0, 4).map((feature: any, index: number) => (
                        <div key={index} 
                             className="flex items-center space-x-1.5 sm:space-x-2 rtl:space-x-reverse bg-white/10 backdrop-blur-sm p-1.5 sm:p-2 lg:p-3 rounded-md sm:rounded-lg">
                          <div className={`w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 bg-gradient-to-r ${storySlides[currentStoryIndex]?.colorFrom} ${storySlides[currentStoryIndex]?.colorTo} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <CheckCircleIcon className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-3 sm:h-3 text-white" />
                          </div>
                          <span className="text-white text-xs sm:text-sm font-medium leading-tight">
                            {feature[locale as 'ar' | 'en']}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mobile Action Buttons */}
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleRequestVisit('visit')}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 xs:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg font-bold text-xs xs:text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
                  >
                    {locale === 'ar' ? 'احجز زيارة' : 'Book Visit'}
                  </button>
                  <button
                    onClick={() => handleRequestVisit('call')}
                    className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 xs:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg font-bold text-xs xs:text-sm sm:text-base transition-all duration-300 active:scale-95 touch-manipulation"
                  >
                    {locale === 'ar' ? 'اتصل بنا' : 'Call Us'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scalable Mobile-Friendly Slide Indicators */}
          <div className="flex justify-center mt-3 sm:mt-4 lg:mt-6 space-x-1.5 sm:space-x-2 rtl:space-x-reverse">
            {storySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStoryIndex(index)}
                className={`transition-all duration-300 rounded-full touch-manipulation ${
                  index === currentStoryIndex 
                    ? 'w-4 h-2 xs:w-5 xs:h-2.5 sm:w-6 sm:h-3 bg-gradient-to-r from-amber-500 to-orange-500 shadow-md ring-1 ring-amber-200' 
                    : 'w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-gray-300 hover:bg-amber-300'
                }`}
              />
            ))}
          </div>
          
          {/* Simplified Mobile Navigation */}
          <div className="mt-3 sm:mt-4 lg:mt-6">
            {/* Mobile Slide Thumbnails */}
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <div className="flex space-x-2 sm:space-x-3 rtl:space-x-reverse px-1" style={{ width: 'max-content' }}>
                {storySlides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={`flex-shrink-0 w-16 xs:w-20 sm:w-24 lg:w-32 p-1.5 sm:p-2 lg:p-3 rounded-md sm:rounded-lg transition-all duration-300 text-left touch-manipulation ${
                      index === currentStoryIndex 
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 sm:border-2 shadow-sm sm:shadow-md' 
                        : 'bg-white border border-gray-200 hover:bg-amber-25 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md sm:rounded-lg flex items-center justify-center transition-all duration-300 ${
                        index === currentStoryIndex 
                          ? `bg-gradient-to-r ${slide.colorFrom} ${slide.colorTo}` 
                          : 'bg-gray-200'
                      }`}>
                        {slide.icon && (() => {
                          const IconComponent = slide.icon;
                          return <IconComponent className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />;
                        })()}
                      </div>
                      <div className="text-center">
                        <span className={`text-xs font-bold block ${
                          index === currentStoryIndex ? 'text-amber-700' : 'text-gray-600'
                        }`}>
                          {index + 1}
                        </span>
                        <h4 className={`text-xs leading-tight line-clamp-2 font-medium ${
                          index === currentStoryIndex ? 'text-amber-700' : 'text-gray-700'
                        }`}>
                          {slide.title[locale as 'ar' | 'en']}
                        </h4>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Swipe Hint for Mobile */}
            <div className="flex sm:hidden justify-center mt-2">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-gray-400 text-xs">
                <div className="flex space-x-0.5">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>{locale === 'ar' ? 'اسحب للتنقل' : 'Swipe to navigate'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emotional Closing Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-16">
        <div className="text-center space-y-8 py-16 px-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {locale === 'ar' ? 'هذا ليس مجرد بيت' : 'This Isn\'t Just a House'}
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
              {locale === 'ar'
                ? 'دي مش مجرد فيلا… دي مساحة للحياة والذكريات والاستثمار في مستقبل عيلتك.'
                : 'This isn\'t just a villa… it\'s a space for living, creating memories, and investing in your family\'s future.'
              }
            </p>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
              <div className="text-center space-y-4">
                <div className="text-4xl sm:text-5xl font-bold text-amber-600">
                  {formatCurrency(property.startingPrice)}
                </div>
                <p className="text-red-600 font-semibold text-lg">
                  {locale === 'ar' ? 'احجز زيارتك الآن – الوحدات محدودة' : 'Book your private tour today – limited availability'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <button
                onClick={() => handleRequestVisit('visit')}
                className="w-full sm:flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {locale === 'ar' ? 'احجز زيارتك الآن' : 'Book Your Visit Now'}
              </button>
              <button
                onClick={() => handleRequestVisit('call')}
                className="w-full sm:flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {locale === 'ar' ? 'اتصل بنا الآن' : 'Call Us Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={closeContactForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {contactFormType === 'visit' 
                  ? (locale === 'ar' ? 'احجز زيارتك' : 'Book Your Visit')
                  : (locale === 'ar' ? 'اطلب مكالمة' : 'Request a Call')
                }
              </h3>
              <p className="text-gray-600">
                {locale === 'ar' 
                  ? 'املأ النموذج وسنتواصل معك قريباً' 
                  : 'Fill the form and we\'ll contact you soon'
                }
              </p>
            </div>
            <LeadCaptureForm
              propertyTitle={property.title[locale as 'ar' | 'en']}
              propertyId={property.propertyId}
            />
          </div>
        </div>
      )}

      {/* Mobile-First Enhanced CSS */}
      <style jsx>{`
        /* Core animations optimized for mobile */
        @keyframes slow-zoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
        @keyframes mobile-slide-in {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        @keyframes mobile-fade-up {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        .animate-mobile-slide-in {
          animation: mobile-slide-in 0.4s ease-out forwards;
        }
        .animate-mobile-fade-up {
          animation: mobile-fade-up 0.3s ease-out forwards;
        }
        
        /* Mobile scrolling optimization */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Line clamp utility for mobile */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Mobile-first optimizations */
        @media (max-width: 640px) {
          /* Touch optimizations */
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
          
          /* Slower animations to reduce battery drain */
          .animate-slow-zoom {
            animation-duration: 25s;
          }
          
          /* Minimum touch targets */
          button, a, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Better scrolling performance */
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
          
          /* Prevent zoom on form inputs */
          input, textarea, select {
            font-size: 16px !important;
            transform: translateZ(0);
          }
          
          /* Optimize background attachments */
          .bg-fixed {
            background-attachment: scroll;
          }
          
          /* Better mobile spacing */
          .mobile-spacing > * + * {
            margin-top: 0.75rem;
          }
          
          /* Mobile text optimization */
          .mobile-text-base {
            font-size: 0.875rem;
            line-height: 1.4;
          }
          
          /* Mobile gradient overlay improvement */
          .mobile-gradient {
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.95) 0%,
              rgba(0, 0, 0, 0.8) 25%,
              rgba(0, 0, 0, 0.6) 50%,
              rgba(0, 0, 0, 0.3) 75%,
              rgba(0, 0, 0, 0.1) 100%
            );
          }
          
          /* Improve button press feedback */
          button:active, [role="button"]:active {
            transform: scale(0.97);
            transition: transform 0.1s ease-out;
          }
        }
        
        /* Extra small screens (xs breakpoint - 475px and below) */
        @media (max-width: 475px) {
          .xs-text-xs {
            font-size: 0.75rem;
          }
          
          .xs-text-sm {
            font-size: 0.875rem;
          }
          
          .xs-text-base {
            font-size: 1rem;
          }
          
          .xs-p-1 {
            padding: 0.25rem;
          }
          
          .xs-p-2 {
            padding: 0.5rem;
          }
          
          .xs-space-y-1 > * + * {
            margin-top: 0.25rem;
          }
          
          .xs-space-y-2 > * + * {
            margin-top: 0.5rem;
          }
          
          .xs-w-16 {
            width: 4rem;
          }
          
          .xs-w-20 {
            width: 5rem;
          }
          
          .xs-h-2 {
            height: 0.5rem;
          }
          
          .xs-h-2\.5 {
            height: 0.625rem;
          }
          
          .xs-h-3 {
            height: 0.75rem;
          }
          
          .xs-h-3\.5 {
            height: 0.875rem;
          }
          
          .xs-h-4 {
            height: 1rem;
          }
          
          .xs-h-7 {
            height: 1.75rem;
          }
          
          .xs-w-2 {
            width: 0.5rem;
          }
          
          .xs-w-2\.5 {
            width: 0.625rem;
          }
          
          .xs-w-3 {
            width: 0.75rem;
          }
          
          .xs-w-3\.5 {
            width: 0.875rem;
          }
          
          .xs-w-4 {
            width: 1rem;
          }
          
          .xs-w-5 {
            width: 1.25rem;
          }
          
          .xs-w-7 {
            width: 1.75rem;
          }
          
          .xs-max-w-28 {
            max-width: 7rem;
          }
        }
        
        /* Small tablet optimization */
        @media (min-width: 641px) and (max-width: 768px) {
          .animate-slow-zoom {
            animation-duration: 22s;
          }
        }
        
        /* Reduce motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-slow-zoom,
          .animate-mobile-slide-in,
          .animate-mobile-fade-up {
            animation: none !important;
          }
          
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
        
        /* Enhanced accessibility */
        @media (prefers-contrast: high) {
          .text-gray-200 {
            color: #f3f4f6;
          }
          .text-gray-600 {
            color: #374151;
          }
        }
        
        /* Focus styles for keyboard navigation */
        button:focus-visible, 
        a:focus-visible,
        [role="button"]:focus-visible {
          outline: 3px solid #f59e0b;
          outline-offset: 2px;
          border-radius: 0.5rem;
        }
        
        /* Backdrop blur fallback */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-sm {
            background-color: rgba(255, 255, 255, 0.1);
          }
          .backdrop-blur-md {
            background-color: rgba(255, 255, 255, 0.15);
          }
        }
        
        /* Performance optimization */
        .will-change-transform {
          will-change: transform;
        }
        
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
