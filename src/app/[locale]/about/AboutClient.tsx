'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef } from 'react';
import {
  HeartIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UserGroupIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  SparklesIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
  EyeIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface AboutClientProps {
  locale: string;
}

// Animation variants with simplified transitions
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

// Data arrays
const leadership = [
  { key: 'ceo' },
  { key: 'cto' },
  { key: 'coo' }
];

const achievements = [
  'innovation_award',
  'sustainability_certificate',
  'client_satisfaction',
  'industry_recognition'
];

const qualityStandards = [
  'iso_certification',
  'quality_assurance',
  'environmental_standards',
  'safety_protocols'
];

const communityInitiatives = [
  {
    key: 'education',
    icon: AcademicCapIcon,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    key: 'environment',
    icon: GlobeAltIcon,
    color: 'bg-green-100 text-green-600'
  },
  { 
    key: 'community',
    icon: UserGroupIcon,
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    key: 'innovation',
    icon: LightBulbIcon,
    color: 'bg-yellow-100 text-yellow-600'
  }
]; 
    
export default function AboutClient({ locale }: AboutClientProps) {
  const t = useTranslations('about_page');
  const isRTL = locale === 'ar';
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Refs for intersection observer 
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Animation controls
  const heroControls = useAnimation();
  const storyControls = useAnimation();
  const visionControls = useAnimation();
  const valuesControls = useAnimation();
  const testimonialsControls = useAnimation();

  // Intersection observers
  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true });
  const visionInView = useInView(visionRef, { once: true });
  const valuesInView = useInView(valuesRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Trigger animations when in view
  useEffect(() => {
    if (heroInView) heroControls.start('visible');
  }, [heroInView, heroControls]);

  useEffect(() => {
    if (storyInView) storyControls.start('visible');
  }, [storyInView, storyControls]);

  useEffect(() => {
    if (visionInView) visionControls.start('visible');
  }, [visionInView, visionControls]);

  useEffect(() => {
    if (valuesInView) valuesControls.start('visible');
  }, [valuesInView, valuesControls]);

  useEffect(() => {
    if (testimonialsInView) testimonialsControls.start('visible');
  }, [testimonialsInView, testimonialsControls]);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation for testimonials
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    } else if (e.key === 'ArrowRight') {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const stats = [
    { 
      key: 'years_experience', 
      value: '15+', 
      icon: BuildingOfficeIcon, 
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
      ariaLabel: isRTL ? 'سنة خبرة' : 'Years of experience'
    },
    { 
      key: 'completed_projects', 
      value: '25+', 
      icon: CheckCircleIcon, 
      gradient: 'bg-gradient-to-r from-green-500 to-green-600',
      ariaLabel: isRTL ? 'مشروع مكتمل' : 'Completed projects'
    },
    { 
      key: 'satisfied_clients', 
      value: '1000+', 
      icon: UserGroupIcon, 
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
      ariaLabel: isRTL ? 'عميل راضي' : 'Satisfied clients'
    },
    { 
      key: 'awards_won', 
      value: '8', 
      icon: TrophyIcon, 
      gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      ariaLabel: isRTL ? 'جوائز حصلنا عليها' : 'Awards won'
    },
  ];

  const values = [
    { 
      key: 'belief', 
      icon: HeartIcon, 
      gradient: 'from-primary to-red-600',
      borderColor: 'border-primary/20',
      bgColor: 'hover:bg-primary/5'
    },
    { 
      key: 'quality', 
      icon: ShieldCheckIcon, 
      gradient: 'from-primary to-primary-dark',
      borderColor: 'border-primary/20',
      bgColor: 'hover:bg-primary/5'
    },
    { 
      key: 'trust', 
      icon: CheckCircleIcon, 
      gradient: 'from-secondary to-secondary-light',
      borderColor: 'border-secondary/20',
      bgColor: 'hover:bg-secondary/5'
    },
    { 
      key: 'innovation', 
      icon: LightBulbIcon, 
      gradient: 'from-yellow-500 to-primary',
      borderColor: 'border-yellow-200',
      bgColor: 'hover:bg-yellow-50'
    },
    { 
      key: 'sustainability', 
      icon: GlobeAltIcon, 
      gradient: 'from-secondary to-teal-600',
      borderColor: 'border-secondary/20',
      bgColor: 'hover:bg-secondary/5'
    },
    { 
      key: 'community', 
      icon: UserGroupIcon, 
      gradient: 'from-primary to-secondary',
      borderColor: 'border-primary/20',
      bgColor: 'hover:bg-primary/5'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: { ar: 'أحمد محمد', en: 'Ahmed Mohamed' },
      role: { ar: 'عميل راضٍ', en: 'Satisfied Client' },
      content: { 
        ar: 'تجربة رائعة مع الإيمان للتطوير. جودة عالية وخدمة متميزة في كل التفاصيل. أنصح بالتعامل معهم.',
        en: 'Amazing experience with El Eman Developments. High quality and excellent service in every detail. I highly recommend them.'
      },
      rating: 5,
      project: { ar: 'مرتفعات الإيمان', en: 'El Eman Heights' }
    },
    {
      id: 2,
      name: { ar: 'فاطمة أحمد', en: 'Fatima Ahmed' },
      role: { ar: 'مالكة شقة', en: 'Apartment Owner' },
      content: { 
        ar: 'حققوا حلمي في الحصول على منزل العمر. فريق محترف ومتفهم ودعم مستمر حتى بعد التسليم.',
        en: 'They made my dream of getting a lifetime home come true. Professional and understanding team with continuous support even after delivery.'
      },
      rating: 5,
      project: { ar: 'حدائق الإيمان', en: 'Belief Gardens' }
    },
    {
      id: 3,
      name: { ar: 'محمد علي', en: 'Mohamed Ali' },
      role: { ar: 'مستثمر', en: 'Investor' },
      content: { 
        ar: 'استثمار آمن ومربح مع الإيمان للتطوير. شفافية كاملة في التعامل وعوائد ممتازة.',
        en: 'Safe and profitable investment with El Eman Developments. Complete transparency in dealings and excellent returns.'
      },
      rating: 5,
      project: { ar: 'بلازا الإيمان', en: 'Eman Plaza' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-25 to-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": isRTL ? "الإيمان للتطوير العقاري" : "El Eman Developments",
            "description": isRTL ? 
              "شركة رائدة في التطوير العقاري في مصر تقدم مشاريع سكنية متميزة" : 
              "Leading real estate development company in Egypt offering distinguished residential projects",
            "foundingDate": "2009",
            "numberOfEmployees": "100+",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "EG",
              "addressLocality": "Cairo"
            },
            "review": testimonials.map(testimonial => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": testimonial.name[isRTL ? 'ar' : 'en']
              },
              "reviewBody": testimonial.content[isRTL ? 'ar' : 'en'],
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating,
                "bestRating": 5
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-24 overflow-hidden"
        role="banner"
        aria-label={isRTL ? "قسم البطل - عن الإيمان" : "Hero section - About El Eman"}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements with reduced motion support */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse-subtle"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-pulse-subtle delay-300"></div>
          <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-white/10 rounded-full animate-float delay-500"></div>
        </div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate={heroControls}
          variants={staggerContainer}
        >
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <motion.div 
              className="mb-6" 
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 text-shadow-lg">
                {isRTL ? 'عن الإيمان' : 'About El Eman'}
              </h1>
            </motion.div>
            
            <motion.div 
              className="flex justify-center items-center space-x-4 rtl:space-x-reverse mb-8"
              variants={scaleIn}
              aria-hidden="true"
            >
              <div className="w-16 h-px bg-white"></div>
              <StarIcon className="w-6 h-6 text-white" />
              <div className="w-16 h-px bg-white"></div>
            </motion.div>
            
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl font-light opacity-90 max-w-4xl mx-auto leading-relaxed text-shadow"
              variants={fadeInUp}
            >
              {isRTL 
                ? 'حيث يتشكل الإيمان - قصة نجاح مبنية على الثقة والجودة والابتكار' 
                : 'Where Belief Takes Shape - A success story built on trust, quality, and innovation'
              }
            </motion.p>

            {/* Enhanced Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div 
                    key={stat.key} 
                    className="text-center group"
                    variants={scaleIn}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className={`${stat.gradient} rounded-2xl p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl card-elegant`}
                      role="img"
                      aria-label={stat.ariaLabel}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{stat.value}</div>
                    <div className="text-sm opacity-90 font-medium">{t(stat.key)}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Our Story Section */}
        <section 
          ref={storyRef}
          className="scroll-mt-20"
          role="region"
          aria-labelledby="story-heading"
        >
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            animate={storyControls}
            variants={staggerContainer}
          >
            <motion.div 
              className={isRTL ? 'lg:order-2' : 'lg:order-1'} 
              variants={slideInLeft}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="mb-6">
                <span className={`text-primary font-semibold tracking-widest uppercase text-sm ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                  {isRTL ? 'قصتنا' : 'Our Story'}
                </span>
              </div>
              <h2 
                id="story-heading"
                className={`text-4xl sm:text-5xl font-light text-gray-900 mb-8 ${
                  isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                }`}
              >
                {isRTL ? 'رحلة مليئة بالإنجازات' : 'A Journey Full of Achievements'}
              </h2>
              <div className={`space-y-6 text-gray-700 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                <p className="text-lg leading-relaxed">
                  {isRTL 
                    ? 'بدأت رحلة الإيمان للتطوير العقاري من حلم بسيط: بناء مجتمعات تجمع بين الجودة والأناقة والراحة. اليوم، نفخر بكوننا من الرواد في مجال التطوير العقاري في مصر.'
                    : 'El Eman Developments journey started with a simple dream: building communities that combine quality, elegance, and comfort. Today, we proudly stand as pioneers in real estate development in Egypt.'
                  }
                </p>
                <p className="text-lg leading-relaxed">
                  {isRTL 
                    ? 'مع أكثر من 15 عاماً من الخبرة، حققنا أكثر من 25 مشروعاً متميزاً، وكسبنا ثقة أكثر من 1000 عميل راضٍ. نؤمن أن كل مشروع هو قصة نجاح جديدة.'
                    : 'With over 15 years of experience, we have completed more than 25 distinguished projects and gained the trust of over 1000 satisfied clients. We believe every project is a new success story.'
                  }
                </p>
                <p className="text-lg leading-relaxed">
                  {isRTL 
                    ? 'رؤيتنا لا تقتصر على البناء فقط، بل تمتد لخلق أنماط حياة متميزة تلبي تطلعات عملائنا وتحقق أحلامهم السكنية.'
                    : 'Our vision extends beyond just building; we create distinctive lifestyles that meet our clients\' aspirations and realize their residential dreams.'
                  }
                </p>
              </div>
            </motion.div>
            <motion.div 
              className={isRTL ? 'lg:order-1' : 'lg:order-2'}
              variants={scaleIn}
            >
              <div className="relative" role="img" aria-label={isRTL ? "رمز قصة الإيمان" : "El Eman story symbol"}>
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                  <div className="text-center text-gray-600 z-10">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <span className="text-6xl font-bold text-white">إ</span>
                    </div>
                    <p className="text-xl font-semibold">{isRTL ? 'قصة الإيمان' : 'El Eman Story'}</p>
                  </div>
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-spin-slow">
                    <SparklesIcon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center animate-pulse-subtle">
                    <StarIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Vision & Mission Section */}
        <section 
          ref={visionRef}
          className="scroll-mt-20"
          role="region"
          aria-labelledby="vision-mission-heading"
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="hidden"
            animate={visionControls}
            variants={staggerContainer}
          >
            <motion.div 
              className="card-elegant p-10 group hover:shadow-3xl transition-all duration-500 hover:scale-105"
              variants={fadeInUp}
            >
              <div className={`flex items-center space-x-4 rtl:space-x-reverse mb-8 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <EyeIcon className="w-10 h-10 text-white" />
                </div>
                <h3 
                  id="vision-heading"
                  className={`text-3xl font-bold text-gray-900 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}
                >
                  {isRTL ? 'رؤيتنا' : 'Our Vision'}
                </h3>
              </div>
              <p className={`text-gray-700 leading-relaxed text-lg ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {isRTL 
                  ? 'أن نكون الشركة الرائدة في مجال التطوير العقاري في مصر والشرق الأوسط، ونحقق التميز في كل مشروع نبنيه، مع الالتزام بأعلى معايير الجودة والاستدامة.' 
                  : 'To be the leading real estate development company in Egypt and the Middle East, achieving excellence in every project we build, while committing to the highest standards of quality and sustainability.'
                }
              </p>
            </motion.div>

            <motion.div 
              className="card-elegant p-10 group hover:shadow-3xl transition-all duration-500 hover:scale-105"
              variants={fadeInUp}
            >
              <div className={`flex items-center space-x-4 rtl:space-x-reverse mb-8 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <RocketLaunchIcon className="w-10 h-10 text-white" />
                </div>
                <h3 
                  id="mission-heading"
                  className={`text-3xl font-bold text-gray-900 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}
                >
                  {isRTL ? 'مهمتنا' : 'Our Mission'}
                </h3>
              </div>
              <p className={`text-gray-700 leading-relaxed text-lg ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {isRTL 
                  ? 'خلق مجتمعات سكنية متميزة تجمع بين الجودة والراحة والاستدامة، وتقديم تجربة استثنائية لعملائنا من خلال الابتكار والالتزام بالتميز في كل ما نقوم به.' 
                  : 'Creating distinguished residential communities that combine quality, comfort, and sustainability, providing an exceptional experience for our clients through innovation and commitment to excellence in everything we do.'
                }
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Our Values Section */}
        <section 
          ref={valuesRef}
          className="scroll-mt-20"
          role="region"
          aria-labelledby="values-heading"
        >
          <motion.div 
            className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
            initial="hidden"
            animate={valuesControls}
            variants={fadeInUp}
          >
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              {isRTL ? 'قيمنا' : 'Our Values'}
            </span>
            <h2 
              id="values-heading"
              className="text-4xl sm:text-5xl font-light text-gray-900 mb-6 mt-4"
            >
              {isRTL ? 'القيم التي تحركنا' : 'Values That Drive Us'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              {isRTL 
                ? 'القيم الأساسية التي تشكل ثقافتنا وتوجه كل قراراتنا وأعمالنا' 
                : 'Core values that shape our culture and guide all our decisions and actions'
              }
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={valuesControls}
            variants={staggerContainer}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.article
                  key={value.key}
                  className={`bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 ${value.borderColor} group hover:scale-105 hover:-translate-y-2 transform ${value.bgColor}`}
                  variants={scaleIn}
                  whileHover={{ y: -8 }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`text-2xl font-semibold text-gray-900 mb-4 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {isRTL ? 
                      (value.key === 'belief' ? 'الإيمان' : 
                       value.key === 'quality' ? 'الجودة' : 
                       value.key === 'trust' ? 'الثقة' : 
                       value.key === 'innovation' ? 'الابتكار' : 
                       value.key === 'sustainability' ? 'الاستدامة' : 'المجتمع') :
                      (value.key === 'belief' ? 'Belief' : 
                       value.key === 'quality' ? 'Quality' : 
                       value.key === 'trust' ? 'Trust' : 
                       value.key === 'innovation' ? 'Innovation' : 
                       value.key === 'sustainability' ? 'Sustainability' : 'Community')
                    }
                  </h3>
                  <p className={`text-gray-600 leading-relaxed ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {isRTL ? 
                      (value.key === 'belief' ? 'نؤمن بقدرتنا على تحقيق الأحلام وبناء المستقبل' : 
                       value.key === 'quality' ? 'نلتزم بأعلى معايير الجودة في كل ما نقوم به' : 
                       value.key === 'trust' ? 'نبني علاقات طويلة الأمد مع عملائنا قائمة على الثقة' : 
                       value.key === 'innovation' ? 'نسعى للابتكار والتطوير المستمر في جميع مشاريعنا' : 
                       value.key === 'sustainability' ? 'نحرص على الاستدامة البيئية في جميع أعمالنا' : 'نساهم في بناء مجتمعات أفضل للجميع') :
                      (value.key === 'belief' ? 'We believe in our ability to achieve dreams and build the future' : 
                       value.key === 'quality' ? 'We commit to the highest quality standards in everything we do' : 
                       value.key === 'trust' ? 'We build long-term relationships with our clients based on trust' : 
                       value.key === 'innovation' ? 'We strive for innovation and continuous development in all our projects' : 
                       value.key === 'sustainability' ? 'We ensure environmental sustainability in all our work' : 'We contribute to building better communities for everyone')
                    }
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section 
          ref={testimonialsRef}
          className="scroll-mt-20"
          role="region"
          aria-labelledby="testimonials-heading"
        >
          <motion.div 
            className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}
            initial="hidden"
            animate={testimonialsControls}
            variants={fadeInUp}
          >
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              {isRTL ? 'آراء العملاء' : 'Client Testimonials'}
            </span>
            <h2 
              id="testimonials-heading"
              className="text-4xl sm:text-5xl font-light text-gray-900 mb-6 mt-4"
            >
              {isRTL ? 'ما يقوله عملاؤنا' : 'What Our Clients Say'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            className="relative max-w-4xl mx-auto"
            initial="hidden"
            animate={testimonialsControls}
            variants={scaleIn}
          >
            <div 
              className="card-elegant p-12 border border-gray-100"
              role="tabpanel"
              aria-labelledby={`testimonial-${currentTestimonial}`}
            >
              <div className="text-center">
                <div className="mb-8">
                  <p className={`text-2xl text-gray-700 leading-relaxed ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    "{testimonials[currentTestimonial].content[isRTL ? 'ar' : 'en']}"
                  </p>
                  <div className="flex justify-center mt-4" aria-label={isRTL ? 'تقييم العميل' : 'Client rating'}>
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <div 
                    className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center"
                    role="img"
                    aria-label={`${testimonials[currentTestimonial].name[isRTL ? 'ar' : 'en']} avatar`}
                  >
                    <span className="text-xl font-bold text-white">
                      {testimonials[currentTestimonial].name[isRTL ? 'ar' : 'en'].charAt(0)}
                    </span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 
                      id={`testimonial-${currentTestimonial}`}
                      className={`text-xl font-bold text-gray-900 ${
                        isRTL ? 'font-arabic' : 'font-latin'
                      }`}
                    >
                      {testimonials[currentTestimonial].name[isRTL ? 'ar' : 'en']}
                    </h4>
                    <p className={`text-gray-600 ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {testimonials[currentTestimonial].role[isRTL ? 'ar' : 'en']}
                    </p>
                    <p className={`text-sm text-primary font-medium ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {testimonials[currentTestimonial].project[isRTL ? 'ar' : 'en']}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div 
              className="flex justify-center items-center space-x-4 rtl:space-x-reverse mt-8"
              role="tablist"
              aria-label={isRTL ? 'التنقل بين آراء العملاء' : 'Testimonials navigation'}
            >
              <button
                onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 btn-primary"
                aria-label={isRTL ? 'الشهادة السابقة' : 'Previous testimonial'}
              >
                <ChevronLeftIcon className="w-6 h-6 text-primary" />
              </button>
              
              <div className="flex space-x-2 rtl:space-x-reverse">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                    role="tab"
                    aria-selected={index === currentTestimonial}
                    aria-label={`${isRTL ? 'شهادة' : 'Testimonial'} ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 btn-primary"
                aria-label={isRTL ? 'الشهادة التالية' : 'Next testimonial'}
              >
                <ChevronRightIcon className="w-6 h-6 text-primary" />
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
