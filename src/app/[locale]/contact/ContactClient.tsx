'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  QuestionMarkCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface ContactClientProps {
  locale: string;
}

export default function ContactClient({ locale }: ContactClientProps) {
  const t = useTranslations('contact_page');
  const isRTL = locale === 'ar';
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Refs for intersection observer
  const heroRef = useRef(null);
  const quickContactRef = useRef(null); 
  const benefitsRef = useRef(null);
  const officesRef = useRef(null); 
  const formRef = useRef(null); 
  
  // Intersection observer hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const quickContactInView = useInView(quickContactRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const officesInView = useInView(officesRef, { once: true, amount: 0.2 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 60 
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const slideInLeft = {
    hidden: { 
      opacity: 0, 
      x: -60 
    },
    visible: { 
      opacity: 1, 
      x: 0
    }
  };

  const scaleIn = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  };

  // Optimized contact action handlers
  const handleWhatsAppContact = useCallback(() => {
    const message = encodeURIComponent(
      `${isRTL ? 'مرحباً، أود جدولة زيارة لمعاينة العقارات' : 'Hello, I would like to schedule a property visit'}`
    );
    const phoneNumber = '+201234567890';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  }, [isRTL]);

  const handlePhoneContact = useCallback(() => {
    const phoneNumber = '+201234567890';
    window.open(`tel:${phoneNumber}`, '_self');
  }, []);

  const handleEmailContact = useCallback(() => {
    const subject = encodeURIComponent(
      `${isRTL ? 'طلب جدولة زيارة - الإيمان للتطوير' : 'Visit Scheduling Request - El Eman Developments'}`
    );
    const body = encodeURIComponent(
      `${isRTL ? 'مرحباً،\n\nأود جدولة زيارة لمعاينة العقارات المتاحة. يرجى التواصل معي لتحديد موعد مناسب.' : 'Hello,\n\nI would like to schedule a visit to view available properties. Please contact me to arrange a suitable appointment.'}`
    );
    window.open(`mailto:info@elemangroup.com?subject=${subject}&body=${body}`, '_self');
  }, [isRTL]);

  const quickContactMethods = [
    {
      key: 'whatsapp',
      icon: ChatBubbleLeftRightIcon,
      gradient: 'from-green-500 to-emerald-600',
      bgColor: 'bg-sand/50',
      borderColor: 'border-green-200',
      hoverBg: 'hover:bg-sand/70',
      action: handleWhatsAppContact,
      ariaLabel: isRTL ? 'تواصل عبر الواتساب' : 'Contact via WhatsApp'
    },
    {
      key: 'call',
      icon: PhoneIcon,
      gradient: 'from-primary to-primary-dark',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      hoverBg: 'hover:bg-primary/20',
      action: handlePhoneContact,
      ariaLabel: isRTL ? 'اتصال هاتفي مباشر' : 'Direct phone call'
    },
    {
      key: 'email',
      icon: EnvelopeIcon,
      gradient: 'from-secondary to-secondary-light',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      hoverBg: 'hover:bg-secondary/20',
      action: handleEmailContact,
      ariaLabel: isRTL ? 'إرسال بريد إلكتروني' : 'Send email'
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
      gradient: 'from-secondary to-secondary-light',
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
    <div className="min-h-screen bg-gradient-to-br from-sand/20 via-white to-sand/10">
      {/* Enhanced Hero Section with Framer Motion */}
      <motion.section 
        ref={heroRef}
        className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-24 overflow-hidden"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Property Background Image with enhanced overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/properties/villa-2.jpg)',
            filter: 'brightness(0.3) contrast(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary-dark/70 to-secondary/80"></div>
        
        {/* Enhanced floating elements with proper animations */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 text-shadow-lg"
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </motion.h1>
            
            <motion.div 
              className="flex justify-center items-center space-x-4 rtl:space-x-reverse mb-8"
              variants={scaleIn}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-16 h-px bg-white"></div>
              <StarIcon className="w-6 h-6 text-white" />
              <div className="w-16 h-px bg-white"></div>
            </motion.div>
            
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl font-light opacity-90 max-w-4xl mx-auto leading-relaxed text-shadow"
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {isRTL 
                ? 'نحن هنا لخدمتكم ومساعدتكم في تحقيق أحلامكم العقارية. تواصلوا معنا بأي طريقة تناسبكم' 
                : 'We are here to serve you and help you achieve your real estate dreams. Contact us in any way that suits you'
              }
            </motion.p>

            {/* Enhanced Property Showcase Badge */}
            <motion.div 
              className="mt-12 inline-flex items-center space-x-3 rtl:space-x-reverse bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              variants={scaleIn}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <BuildingOfficeIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-white">
                {isRTL ? 'مشاريع الإيمان للتطوير العقاري' : 'El Eman Development Projects'}
              </span>
              <ArrowRightIcon className={`w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Enhanced Quick Contact Methods */}
        <motion.section 
          ref={quickContactRef}
          className="mb-20"
          initial="hidden"
          animate={quickContactInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
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
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {quickContactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.key}
                  className={`${method.bgColor} ${method.borderColor} ${method.hoverBg} 
                    border-2 rounded-3xl p-8 text-center transition-all duration-500 cursor-pointer group
                    hover:shadow-2xl card-elegant focus:outline-none focus:ring-4 focus:ring-primary/20
                    transform hover:scale-105 hover:-translate-y-2`}
                  variants={scaleIn}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={method.action}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={method.ariaLabel}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      method.action();
                    }
                  }}
                >
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 
                      group-hover:scale-110 transition-transform duration-300 shadow-lg ${
                      activeCard === index ? 'animate-pulse' : ''
                    }`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
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
                  <motion.div 
                    className={`text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <span>{isRTL ? 'انقر للتواصل' : 'Click to connect'}</span>
                    <ArrowRightIcon className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Enhanced Why Choose Us Section */}
        <motion.section 
          ref={benefitsRef}
          className="mb-20"
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              {isRTL ? 'لماذا تختار الإيمان؟' : 'Why Choose El Eman?'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              {isRTL 
                ? 'نتميز بالخبرة والمصداقية والالتزام بتقديم أفضل الخدمات العقارية' 
                : 'We excel in experience, credibility, and commitment to providing the best real estate services'
              }
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100 group card-elegant focus:outline-none focus:ring-4 focus:ring-primary/20"
                  variants={scaleIn}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  tabIndex={0}
                  role="article"
                  aria-label={benefit.title[locale as 'ar' | 'en']}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    whileHover={{ 
                      rotate: 10,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className={`text-2xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {benefit.title[locale as 'ar' | 'en']}
                  </h3>
                  <p className={`text-gray-600 text-lg leading-relaxed ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {benefit.description[locale as 'ar' | 'en']}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Enhanced Office Locations */}
        <motion.section 
          ref={officesRef}
          className="mb-20"
          initial="hidden"
          animate={officesInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              {isRTL ? 'مواقعنا' : 'Our Locations'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              {isRTL 
                ? 'زوروا مكاتبنا في المواقع المختارة بعناية لخدمتكم بشكل أفضل' 
                : 'Visit our offices in carefully selected locations to serve you better'
              }
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {offices.map((office, index) => {
              const IconComponent = office.icon;
              return (
                <motion.div
                  key={office.key}
                  className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 group card-elegant focus:outline-none focus:ring-4 focus:ring-primary/20"
                  variants={slideInLeft}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  tabIndex={0}
                  role="article"
                  aria-label={`${office.location[locale as 'ar' | 'en']} office location`}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${office.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    whileHover={{ 
                      rotate: -10,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className={`text-2xl font-semibold text-gray-900 mb-6 group-hover:text-primary transition-colors duration-300 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {office.location[locale as 'ar' | 'en']}
                  </h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors"
                      whileHover={{ x: isRTL ? -5 : 5 }}
                    >
                      <MapPinIcon className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-primary flex-shrink-0" />
                      <span className={`${isRTL ? 'font-arabic' : 'font-latin'} text-lg`}>
                        {office.address[locale as 'ar' | 'en']}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors"
                      whileHover={{ x: isRTL ? -5 : 5 }}
                    >
                      <PhoneIcon className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:${office.phone}`}
                        className="text-lg hover:text-primary transition-colors duration-200 hover:underline"
                        aria-label={`Call ${office.location[locale as 'ar' | 'en']} office`}
                      >
                        {office.phone}
                      </a>
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors"
                      whileHover={{ x: isRTL ? -5 : 5 }}
                    >
                      <ClockIcon className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-primary flex-shrink-0" />
                      <span className={`${isRTL ? 'font-arabic' : 'font-latin'} text-lg`}>
                        {office.hours[locale as 'ar' | 'en']}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Enhanced Contact Form Section */}
        <motion.section 
          ref={formRef}
          className="mb-20"
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
              {isRTL ? 'أرسل لنا رسالة' : 'Send Us a Message'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              {isRTL 
                ? 'املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن' 
                : 'Fill out the form below and we will get back to you as soon as possible'
              }
            </p>
          </motion.div>

          <motion.div 
            className="max-w-6xl mx-auto"
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Enhanced Contact Form */}
              <motion.div 
                className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 card-elegant"
                variants={slideInLeft}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`mb-6 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {isRTL ? 'نموذج التواصل' : 'Contact Form'}
                  </h3>
                  <p className="text-gray-600">
                    {isRTL ? 'نحن نضمن الرد خلال 24 ساعة' : 'We guarantee a response within 24 hours'}
                  </p>
                </div>
                <ContactForm />
              </motion.div>

              {/* Enhanced Additional Contact Info */}
              <motion.div 
                className="space-y-8"
                variants={fadeInUp}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Premium Information Card */}
                <motion.div 
                  className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-3xl p-8 card-elegant"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <h3 className={`text-2xl font-bold mb-6 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                    {isRTL ? 'معلومات إضافية' : 'Additional Information'}
                  </h3>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center space-x-4 rtl:space-x-reverse"
                      whileHover={{ x: isRTL ? -8 : 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ClockIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{isRTL ? 'ساعات العمل' : 'Working Hours'}</p>
                        <p className="text-white/90">{isRTL ? 'يومياً: 10 ص - 10 م' : 'Daily: 10 AM - 10 PM'}</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-4 rtl:space-x-reverse"
                      whileHover={{ x: isRTL ? -8 : 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CalendarDaysIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{isRTL ? 'المواعيد' : 'Appointments'}</p>
                        <p className="text-white/90">{isRTL ? 'بموعد مسبق أو زيارة مباشرة' : 'By appointment or walk-in'}</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-4 rtl:space-x-reverse"
                      whileHover={{ x: isRTL ? -8 : 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <GlobeAltIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{isRTL ? 'الموقع الإلكتروني' : 'Website'}</p>
                        <a 
                          href="https://developments.elemangroup.com" 
                          className="text-white/90 hover:text-white hover:underline transition-all duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit our website"
                        >
                          developments.elemangroup.com
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Important Note */}
                <motion.div 
                  className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-8 border border-secondary/20 card-elegant"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                      {isRTL ? 'ملاحظة مهمة' : 'Important Note'}
                    </h3>
                  </div>
                  <p className={`text-gray-700 leading-relaxed text-lg ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                    {isRTL 
                      ? 'فريقنا من الخبراء العقاريين متاح لخدمتكم وتقديم الاستشارات المتخصصة على مدار الساعة. نحن نضمن الرد على جميع الاستفسارات خلال 24 ساعة مع ضمان أعلى مستويات الجودة والمهنية.' 
                      : 'Our team of real estate experts is available to serve you and provide specialized consultations around the clock. We guarantee a response to all inquiries within 24 hours with the highest levels of quality and professionalism.'
                    }
                  </p>
                </motion.div>

                {/* Service Guarantee Badge */}
                <motion.div 
                  className="bg-white rounded-2xl p-6 border-2 border-primary/20 shadow-lg"
                  whileHover={{ 
                    borderColor: 'rgb(var(--color-primary))',
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className={`font-semibold text-gray-900 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                        {isRTL ? 'ضمان الخدمة المتميزة' : 'Premium Service Guarantee'}
                      </p>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                        {isRTL ? '100% رضا العملاء مضمون' : '100% Customer Satisfaction Guaranteed'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}



