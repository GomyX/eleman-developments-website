'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import ContactForm from '@/components/forms/ContactForm';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  StarIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface ContactClientProps {
  locale: string;
}

export default function ContactClient({ locale }: ContactClientProps) {
  const t = useTranslations('contact_page');
  const isRTL = locale === 'ar';
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const quickContactMethods = [
    {
      key: 'whatsapp',
      icon: ChatBubbleLeftRightIcon,
      gradient: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBg: 'hover:bg-green-100',
      action: () => {
        const message = encodeURIComponent(
          `${isRTL ? 'مرحباً، أود جدولة زيارة لمعاينة العقارات' : 'Hello, I would like to schedule a property visit'}`
        );
        const phoneNumber = '+201234567890';
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      }
    },
    {
      key: 'call',
      icon: PhoneIcon,
      gradient: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      action: () => {
        const phoneNumber = '+201234567890';
        window.open(`tel:${phoneNumber}`, '_self');
      }
    },
    {
      key: 'email',
      icon: EnvelopeIcon,
      gradient: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-100',
      action: () => {
        const subject = encodeURIComponent(
          `${isRTL ? 'طلب جدولة زيارة - الإيمان للتطوير' : 'Visit Scheduling Request - El Eman Developments'}`
        );
        const body = encodeURIComponent(
          `${isRTL ? 'مرحباً،\n\nأود جدولة زيارة لمعاينة العقارات المتاحة. يرجى التواصل معي لتحديد موعد مناسب.' : 'Hello,\n\nI would like to schedule a visit to view available properties. Please contact me to arrange a suitable appointment.'}`
        );
        window.open(`mailto:info@elemangroup.com?subject=${subject}&body=${body}`, '_self');
      }
    }
  ];

  const offices = [
    {
      key: 'european_countryside',
      icon: BuildingOfficeIcon,
      gradient: 'from-primary to-primary-dark',
      location: { ar: 'الريف الأوروبي', en: 'European Countryside' },
      address: { ar: 'الريف الأوروبي', en: 'European Countryside' },
      phone: '+20 2 1234 5678',
      hours: { ar: 'يومياً: 10 ص - 10 م', en: 'Daily: 10 AM - 10 PM' }
    },
    {
      key: 'six_october',
      icon: BuildingOfficeIcon,
      gradient: 'from-teal-500 to-teal-700',
      location: { ar: '6 أكتوبر', en: '6 October' },
      address: { ar: '6 أكتوبر', en: '6 October' },
      phone: '+20 2 3876 5432',
      hours: { ar: 'يومياً: 10 ص - 10 م', en: 'Daily: 10 AM - 10 PM' }
    }
  ];

  const benefits = [
    {
      icon: UserGroupIcon,
      title: { ar: 'خبراء متخصصون', en: 'Expert Specialists' },
      description: { ar: 'فريق من الخبراء لمساعدتك في اختيار العقار المثالي', en: 'Team of experts to help you choose the perfect property' }
    },
    {
      icon: CheckCircleIcon,
      title: { ar: 'ضمان الجودة', en: 'Quality Assurance' },
      description: { ar: 'جميع مشاريعنا تتم بأعلى معايير الجودة', en: 'All our projects are built with the highest quality standards' }
    },
    {
      icon: HeartIcon,
      title: { ar: 'خدمة مميزة', en: 'Premium Service' },
      description: { ar: 'نقدم خدمة شخصية مصممة خصيصاً لاحتياجاتك', en: 'We provide personalized service tailored to your needs' }
    }
  ];

  const faqQuestions = [
    'what_is_el_eman',
    'how_to_schedule_visit',
    'payment_options',
    'project_delivery'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-24 overflow-hidden transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <div className="mb-6 overflow-hidden">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-light mb-6 transform transition-all duration-1000 delay-300 text-shadow-lg ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {isRTL ? 'تواصل معنا' : 'Contact Us'}
              </h1>
            </div>
            
            <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse mb-8">
              <div className="w-16 h-px bg-white"></div>
              <StarIcon className="w-6 h-6 text-white" />
              <div className="w-16 h-px bg-white"></div>
            </div>
            
            <div className="overflow-hidden">
              <p className={`text-xl sm:text-2xl md:text-3xl font-light opacity-90 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 text-shadow ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {isRTL 
                  ? 'نحن هنا لخدمتكم ومساعدتكم في تحقيق أحلامكم العقارية. تواصلوا معنا بأي طريقة تناسبكم' 
                  : 'We are here to serve you and help you achieve your real estate dreams. Contact us in any way that suits you'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Quick Contact Methods */}
        <section className={`mb-20 transform transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              {isRTL ? 'طرق التواصل السريع' : 'Quick Contact Methods'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              {isRTL 
                ? 'اختر الطريقة الأنسب لك للتواصل معنا وجدولة زيارتك' 
                : 'Choose the most convenient way to contact us and schedule your visit'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickContactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={method.key}
                  className={`${method.bgColor} ${method.borderColor} ${method.hoverBg} 
                    border-2 rounded-3xl p-8 text-center transition-all duration-500 cursor-pointer group
                    hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transform
                    ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                  onClick={method.action}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 
                    group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                    activeCard === index ? 'animate-pulse' : ''
                  }`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`text-2xl font-semibold text-gray-900 mb-4 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {isRTL ? 
                      (method.key === 'whatsapp' ? 'واتساب' : 
                       method.key === 'call' ? 'اتصال مباشر' : 
                       'البريد الإلكتروني') :
                      (method.key === 'whatsapp' ? 'WhatsApp' : 
                       method.key === 'call' ? 'Direct Call' : 
                       'Email')
                    }
                  </h3>
                  <p className={`text-gray-600 mb-6 text-lg leading-relaxed ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {isRTL ? 
                      (method.key === 'whatsapp' ? 'تواصل فوري ومرن' : 
                       method.key === 'call' ? 'استشارة مباشرة' : 
                       'تواصل رسمي ومفصل') :
                      (method.key === 'whatsapp' ? 'Instant & flexible communication' : 
                       method.key === 'call' ? 'Direct consultation' : 
                       'Formal & detailed communication')
                    }
                  </p>
                  <div className={`text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {isRTL ? 'انقر للتواصل' : 'Click to connect'}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={`mb-20 transform transition-all duration-1000 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              {isRTL ? 'لماذا تختار الإيمان؟' : 'Why Choose El Eman?'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:scale-105 transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-semibold text-gray-900 mb-4 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {benefit.title[locale as 'ar' | 'en']}
                  </h3>
                  <p className={`text-gray-600 text-lg leading-relaxed ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {benefit.description[locale as 'ar' | 'en']}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Office Locations */}
        <section className={`mb-20 transform transition-all duration-1000 delay-1200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              {isRTL ? 'مواقعنا' : 'Our Locations'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {offices.map((office, index) => {
              const IconComponent = office.icon;
              return (
                <div
                  key={office.key}
                  className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:scale-105 transform"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${office.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-semibold text-gray-900 mb-4 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {office.location[locale as 'ar' | 'en']}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-primary" />
                      <span className={isRTL ? 'font-arabic' : 'font-latin'}>
                        {office.address[locale as 'ar' | 'en']}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <PhoneIcon className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-primary" />
                      <span>{office.phone}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

