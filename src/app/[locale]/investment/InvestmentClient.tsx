'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ROICalculator from '@/components/forms/ROICalculator';
import {
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  HomeIcon,
  GlobeAltIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CreditCardIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface InvestmentClientProps {
  locale: string;
}

export default function InvestmentClient({ locale }: InvestmentClientProps) {
  const t = useTranslations('investment_page');
  const isRTL = locale === 'ar';
  
  // State management
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeInvestmentType, setActiveInvestmentType] = useState<number | null>(null);
  
  // Refs for intersection observer
  const heroRef = useRef(null);
  const whyInvestRef = useRef(null);
  const investmentTypesRef = useRef(null);
  const calculatorRef = useRef(null);
  const financingRef = useRef(null);
  const stepsRef = useRef(null);
  
  // Intersection observer hooks
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const whyInvestInView = useInView(whyInvestRef, { once: true, amount: 0.2 });
  const typesInView = useInView(investmentTypesRef, { once: true, amount: 0.2 });
  const calculatorInView = useInView(calculatorRef, { once: true, amount: 0.2 });
  const financingInView = useInView(financingRef, { once: true, amount: 0.2 });
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });

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

  // Optimized action handlers
  const handleContactAdvisor = useCallback(() => {
    const message = encodeURIComponent(
      `${isRTL ? 'مرحباً، أريد استشارة حول الفرص الاستثمارية' : 'Hello, I would like consultation about investment opportunities'}`
    );
    const phoneNumber = '+201234567890';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  }, [isRTL]);

  const handleCallNow = useCallback(() => {
    const phoneNumber = '+201234567890';
    window.open(`tel:${phoneNumber}`, '_self');
  }, []);

  const handleDownloadGuide = useCallback(() => {
    // Enhanced download with analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        event_category: 'Investment Guide',
        event_label: 'Investment Guide Download',
        value: 1
      });
    }
    alert(locale === 'ar' ? 'سيتم تحميل دليل الاستثمار قريباً' : 'Investment guide download coming soon');
  }, [locale]);

  const whyInvestReasons = [
    { key: 'stable_market', icon: ArrowTrendingUpIcon, color: 'text-green-500 bg-green-50' },
    { key: 'high_returns', icon: CurrencyDollarIcon, color: 'text-blue-500 bg-blue-50' },
    { key: 'prime_locations', icon: MapPinIcon, color: 'text-red-500 bg-red-50' },
    { key: 'guaranteed_quality', icon: ShieldCheckIcon, color: 'text-purple-500 bg-purple-50' },
    { key: 'flexible_payment', icon: CalendarIcon, color: 'text-yellow-500 bg-yellow-50' },
    { key: 'expert_management', icon: UserGroupIcon, color: 'text-indigo-500 bg-indigo-50' },
  ];

  const investmentTypes = [
    { 
      key: 'residential', 
      icon: HomeIcon, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      key: 'commercial', 
      icon: BuildingOfficeIcon, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      key: 'land', 
      icon: GlobeAltIcon, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  const paymentPlans = [
    { key: 'cash_payment', icon: BanknotesIcon, highlight: true },
    { key: 'installments_2_years', icon: CalendarIcon },
    { key: 'installments_3_years', icon: CalendarIcon },
    { key: 'installments_5_years', icon: CalendarIcon },
  ];

  const banks = ['nbe', 'cib', 'banque_misr', 'alex_bank', 'faisal_bank'];

  const islamicFinancing = [
    { key: 'murabaha', icon: DocumentTextIcon },
    { key: 'ijara', icon: CreditCardIcon },
    { key: 'musharaka', icon: UserGroupIcon },
  ];

  const investmentSteps = [
    { key: 'step1', icon: PhoneIcon, color: 'text-blue-500' },
    { key: 'step2', icon: HomeIcon, color: 'text-green-500' },
    { key: 'step3', icon: BanknotesIcon, color: 'text-purple-500' },
    { key: 'step4', icon: ArrowTrendingUpIcon, color: 'text-orange-500' },
  ];

  const testimonials = ['testimonial1', 'testimonial2', 'testimonial3'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand/20 via-white to-sand/10">
      {/* Enhanced Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative bg-gradient-to-r from-saffron via-orange-500 to-teal text-white py-24 overflow-hidden"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Premium Background with Property Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/properties/villa-1.jpg)',
            filter: 'brightness(0.4) contrast(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-saffron/80 via-orange-500/70 to-teal/80"></div>
        
        {/* Enhanced floating elements */}
        <motion.div 
          className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, -360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <motion.div
              className="flex justify-center items-center space-x-4 rtl:space-x-reverse mb-8"
              variants={scaleIn}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-16 h-px bg-white/60"></div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
              </div>
              <div className="w-16 h-px bg-white/60"></div>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg"
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {isRTL ? 'استثمر بذكاء في العقارات' : 'Invest Smartly in Real Estate'}
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed text-shadow"
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {isRTL 
                ? 'عوائد مضمونة تصل إلى 18% سنوياً مع ضمانات الجودة والشفافية الكاملة' 
                : 'Guaranteed returns up to 18% annually with quality guarantees and complete transparency'
              }
            </motion.p>
            
            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={staggerContainer}
            >
              <motion.button
                onClick={handleContactAdvisor}
                className="bg-white text-saffron px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse shadow-xl hover:shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
                variants={scaleIn}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                aria-label={isRTL ? 'تواصل مع مستشار استثماري' : 'Contact investment advisor'}
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>{isRTL ? 'استشارة مجانية' : 'Free Consultation'}</span>
                <ArrowRightIcon className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <motion.button
                onClick={handleDownloadGuide}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-saffron transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse shadow-lg hover:shadow-xl backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30"
                variants={scaleIn}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                aria-label={isRTL ? 'تحميل دليل الاستثمار' : 'Download investment guide'}
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                <span>{isRTL ? 'دليل الاستثمار' : 'Investment Guide'}</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Stats Banner */}
            <motion.div 
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
            >
              {[
                { value: '18%', label: isRTL ? 'عائد سنوي' : 'Annual Return' },
                { value: '25+', label: isRTL ? 'مشروع' : 'Projects' },
                { value: '5000+', label: isRTL ? 'مستثمر راضي' : 'Happy Investors' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                  variants={scaleIn}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Premium Why Invest Section */}
        <motion.section
          ref={whyInvestRef}
          initial="hidden"
          animate={whyInvestInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50"
          role="region"
          aria-labelledby="why-invest-heading"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIzNCwgMTc5LCA4LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-saffron/10 border border-saffron/20 rounded-full mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="text-saffron font-semibold text-sm tracking-wide">
                  {isRTL ? 'لماذا تستثمر معنا' : 'WHY CHOOSE US'}
                </span>
              </motion.div>
              
              <h2 
                id="why-invest-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="block"
                >
                  {t('why_invest')}
                </motion.span>
              </h2>
              
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-saffron to-amber-400 mx-auto rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {isRTL 
                  ? 'اكتشف الفرص الاستثمارية الاستثنائية التي تقدمها إل إيمان للتطوير العقاري'
                  : 'Discover exceptional investment opportunities with El Eman Developments premium real estate portfolio'
                }
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {whyInvestReasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <motion.div
                    key={reason.key}
                    variants={itemVariants}
                    className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                      transition: { duration: 0.3 }
                    }}
                    role="article"
                    aria-labelledby={`reason-${reason.key}-title`}
                  >
                    <div className="relative">
                      <motion.div 
                        className={`w-20 h-20 ${reason.color} rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <IconComponent className="w-10 h-10 relative z-10" />
                      </motion.div>
                      
                      <h3 
                        id={`reason-${reason.key}-title`}
                        className={`text-2xl font-bold text-gray-900 mb-4 group-hover:text-saffron transition-colors duration-300 ${
                          isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                        }`}
                      >
                        {t(`why_invest_reasons.${reason.key}.title`)}
                      </h3>
                      
                      <p className={`text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 ${
                        isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                      }`}>
                        {t(`why_invest_reasons.${reason.key}.description`)}
                      </p>
                      
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron to-amber-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                        initial={false}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* CTA Section within Why Invest */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-saffron to-amber-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact-section');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label={isRTL ? 'ابدأ رحلة الاستثمار' : 'Start your investment journey'}
              >
                <span>{isRTL ? 'ابدأ رحلة الاستثمار' : 'Start Your Investment Journey'}</span>
                <ChevronRightIcon className={`w-5 h-5 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Premium Investment Types Section */}
        <motion.section
          ref={investmentTypesRef}
          className="relative py-20 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={typesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          role="region"
          aria-labelledby="investment-types-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-saffron/10 border border-saffron/20 rounded-full mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="text-saffron font-semibold text-sm tracking-wide">
                  {isRTL ? 'فرص الاستثمار' : 'INVESTMENT PORTFOLIO'}
                </span>
              </motion.div>
              
              <h2 
                id="investment-types-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              >
                {t('investment_opportunities')}
              </h2>
              
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-saffron to-amber-400 mx-auto rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
              
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {isRTL 
                  ? 'اختر من بين محفظة متنوعة من الاستثمارات العقارية المربحة'
                  : 'Choose from our diverse portfolio of profitable real estate investments'
                }
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {investmentTypes.map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <motion.div
                    key={type.key}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.2, 
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: true }}
                    className={`group relative ${type.bgColor} rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 backdrop-blur-sm overflow-hidden`}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    role="article"
                    aria-labelledby={`investment-type-${type.key}-title`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <motion.div 
                        className={`w-24 h-24 bg-gradient-to-r ${type.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                        whileHover={{ 
                          rotate: [0, 10, -10, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <IconComponent className="w-12 h-12 text-white relative z-10" />
                      </motion.div>
                      
                      <h3 
                        id={`investment-type-${type.key}-title`}
                        className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-saffron transition-colors duration-300 ${
                          isRTL ? 'font-arabic' : 'font-latin'
                        }`}
                      >
                        {t(`investment_types.${type.key}.title`)}
                      </h3>
                      
                      <p className={`text-gray-700 mb-8 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300 ${
                        isRTL ? 'font-arabic' : 'font-latin'
                      }`}>
                        {t(`investment_types.${type.key}.description`)}
                      </p>
                      
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                        initial={false}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Premium ROI Calculator Section */}
        <motion.section
          ref={calculatorRef}
          className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-saffron/5 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={calculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          role="region"
          aria-labelledby="roi-calculator-heading"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-saffron/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-saffron/10 border border-saffron/20 rounded-full mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <CurrencyDollarIcon className="w-4 h-4 text-saffron mr-2" />
                <span className="text-saffron font-semibold text-sm tracking-wide">
                  {isRTL ? 'احسب العائد' : 'CALCULATE RETURNS'}
                </span>
              </motion.div>
              
              <h2 
                id="roi-calculator-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              >
                {t('roi_calculator')}
              </h2>
              
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-saffron to-amber-400 mx-auto rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
              
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {isRTL 
                  ? 'اكتشف إمكانية العائد على الاستثمار مع حاسبة العائد المتقدمة'
                  : 'Discover your investment potential with our advanced ROI calculator'
                }
              </motion.p>
            </motion.div>

            <motion.div 
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-saffron to-amber-400 p-6"
                  initial={{ x: -100 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <CurrencyDollarIcon className="w-8 h-8 text-white" />
                    <h3 className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                      {isRTL ? 'حاسبة العائد على الاستثمار' : 'Investment Return Calculator'}
                    </h3>
                  </div>
                </motion.div>
                
                <div className="p-8">
                  <ROICalculator />
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: CheckCircleIcon,
                  title: isRTL ? 'حسابات دقيقة' : 'Accurate Calculations',
                  description: isRTL ? 'نتائج موثوقة ومحدثة' : 'Reliable & Updated Results'
                },
                {
                  icon: ShieldCheckIcon,
                  title: isRTL ? 'بيانات آمنة' : 'Secure Data',
                  description: isRTL ? 'حماية كاملة للمعلومات' : 'Complete Information Protection'
                },
                {
                  icon: StarIcon,
                  title: isRTL ? 'خبرة 15 عام' : '15 Years Experience',
                  description: isRTL ? 'خبرة مؤكدة في السوق' : 'Proven Market Expertise'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <item.icon className="w-12 h-12 text-saffron mx-auto mb-4" />
                  <h4 className={`text-lg font-bold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-gray-600 text-sm ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Investment Steps Section */}
        <motion.section
          ref={stepsRef}
          className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-saffron/5"
          initial={{ opacity: 0, y: 50 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          role="region"
          aria-labelledby="investment-process-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-saffron/10 border border-saffron/20 rounded-full mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <ArrowRightIcon className="w-4 h-4 text-saffron mr-2" />
                <span className="text-saffron font-semibold text-sm tracking-wide">
                  {isRTL ? 'خطوات الاستثمار' : 'INVESTMENT PROCESS'}
                </span>
              </motion.div>
              
              <h2 
                id="investment-process-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              >
                {t('investment_process.title')}
              </h2>
              
              <motion.div 
                className="w-32 h-1.5 bg-gradient-to-r from-saffron to-amber-400 mx-auto rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
              
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {isRTL 
                  ? 'اتبع هذه الخطوات البسيطة لبدء رحلتك الاستثمارية معنا'
                  : 'Follow these simple steps to begin your investment journey with us'
                }
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {investmentSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    viewport={{ once: true }}
                    className="group text-center relative"
                    role="article"
                    aria-labelledby={`step-${step.key}-title`}
                  >
                    {/* Connection Line */}
                    {index < investmentSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-saffron/60 to-transparent transform translate-x-4"></div>
                    )}
                    
                    <div className="relative mb-8">
                      <motion.div 
                        className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center mx-auto border-4 border-saffron/20 group-hover:border-saffron/40 transition-all duration-500 relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.25)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-saffron/10 to-amber-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <IconComponent className={`w-12 h-12 ${step.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                      </motion.div>
                      
                      <motion.div 
                        className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-saffron to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ rotate: 360 }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>
                    
                    <h3 
                      id={`step-${step.key}-title`}
                      className={`text-xl font-bold text-gray-900 mb-4 group-hover:text-saffron transition-colors duration-300 ${
                        isRTL ? 'font-arabic' : 'font-latin'
                      }`}
                    >
                      {t(`investment_process.${step.key}.title`)}
                    </h3>
                    
                    <p className={`text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {t(`investment_process.${step.key}.description`)}
                    </p>
                    
                    <motion.div
                      className="mt-6 w-16 h-1 bg-gradient-to-r from-saffron to-amber-400 mx-auto rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      initial={false}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Final CTA */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-gradient-to-r from-saffron to-amber-400 rounded-3xl p-8 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-2xl font-bold text-white mb-4 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                  {isRTL ? 'ابدأ استثمارك اليوم' : 'Start Your Investment Today'}
                </h3>
                <p className={`text-white/90 mb-6 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                  {isRTL 
                    ? 'انضم إلى آلاف المستثمرين الناجحين واحصل على عوائد مضمونة'
                    : 'Join thousands of successful investors and get guaranteed returns'
                  }
                </p>
                <motion.button
                  className={`inline-flex items-center px-8 py-4 bg-white text-saffron font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact-section');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  <span>{isRTL ? 'ابدأ الآن' : 'Get Started Now'}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>

    </div>)}


