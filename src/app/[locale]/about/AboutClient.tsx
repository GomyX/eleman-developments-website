'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { key: 'years_experience', value: '15+', icon: BuildingOfficeIcon, gradient: 'from-blue-500 to-blue-600' },
    { key: 'completed_projects', value: '25+', icon: CheckCircleIcon, gradient: 'from-green-500 to-green-600' },
    { key: 'satisfied_clients', value: '1000+', icon: UserGroupIcon, gradient: 'from-purple-500 to-purple-600' },
    { key: 'awards_won', value: '8', icon: TrophyIcon, gradient: 'from-yellow-500 to-yellow-600' },
  ];

  const values = [
    { 
      key: 'belief', 
      icon: HeartIcon, 
      color: 'text-red-500', 
      bgColor: 'bg-red-50', 
      borderColor: 'border-red-200',
      gradient: 'from-primary to-red-600'
    },
    { 
      key: 'quality', 
      icon: ShieldCheckIcon, 
      color: 'text-primary', 
      bgColor: 'bg-primary/10', 
      borderColor: 'border-primary/20',
      gradient: 'from-primary to-primary-dark'
    },
    { 
      key: 'trust', 
      icon: CheckCircleIcon, 
      color: 'text-secondary', 
      bgColor: 'bg-secondary/10', 
      borderColor: 'border-secondary/20',
      gradient: 'from-secondary to-secondary-light'
    },
    { 
      key: 'innovation', 
      icon: LightBulbIcon, 
      color: 'text-yellow-500', 
      bgColor: 'bg-yellow-50', 
      borderColor: 'border-yellow-200',
      gradient: 'from-yellow-500 to-primary'
    },
    { 
      key: 'sustainability', 
      icon: GlobeAltIcon, 
      color: 'text-secondary', 
      bgColor: 'bg-secondary/10', 
      borderColor: 'border-secondary/20',
      gradient: 'from-secondary to-teal-600'
    },
    { 
      key: 'community', 
      icon: UserGroupIcon, 
      color: 'text-primary', 
      bgColor: 'bg-primary/10', 
      borderColor: 'border-primary/20',
      gradient: 'from-primary to-secondary'
    },
  ];

  const testimonials = [
    {
      name: { ar: 'أحمد محمد', en: 'Ahmed Mohamed' },
      role: { ar: 'عميل راضٍ', en: 'Satisfied Client' },
      content: { 
        ar: 'تجربة رائعة مع الإيمان للتطوير. جودة عالية وخدمة متميزة.',
        en: 'Amazing experience with El Eman Developments. High quality and excellent service.'
      }
    },
    {
      name: { ar: 'فاطمة أحمد', en: 'Fatima Ahmed' },
      role: { ar: 'مالكة شقة', en: 'Apartment Owner' },
      content: { 
        ar: 'حققوا حلمي في الحصول على منزل العمر. فريق محترف ومتفهم.',
        en: 'They made my dream of getting a lifetime home come true. Professional and understanding team.'
      }
    },
    {
      name: { ar: 'محمد علي', en: 'Mohamed Ali' },
      role: { ar: 'مستثمر', en: 'Investor' },
      content: { 
        ar: 'استثمار آمن ومربح. الإيمان للتطوير شريك موثوق.',
        en: 'Safe and profitable investment. El Eman Developments is a trusted partner.'
      }
    }
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
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-white/10 rounded-full animate-bounce delay-300"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <div className="mb-6 overflow-hidden">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-light mb-6 transform transition-all duration-1000 delay-300 text-shadow-lg ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {isRTL ? 'عن الإيمان' : 'About El Eman'}
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
                  ? 'حيث يتشكل الإيمان - قصة نجاح مبنية على الثقة والجودة والابتكار' 
                  : 'Where Belief Takes Shape - A success story built on trust, quality, and innovation'
                }
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transform transition-all duration-1000 delay-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.key} className="text-center group">
                    <div className={`bg-gradient-to-r ${stat.gradient} rounded-2xl p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{stat.value}</div>
                    <div className="text-sm opacity-90 font-medium">{t(stat.key)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Our Story Section */}
        <section className={`transform transition-all duration-1000 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={isRTL ? 'lg:order-2' : 'lg:order-1'}>
              <div className="mb-6">
                <span className={`text-primary font-semibold tracking-widest uppercase text-sm ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                  {isRTL ? 'قصتنا' : 'Our Story'}
                </span>
              </div>
              <h2 className={`text-4xl sm:text-5xl font-light text-gray-900 mb-8 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
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
            </div>
            <div className={isRTL ? 'lg:order-1' : 'lg:order-2'}>
              <div className="relative">
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
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center animate-pulse">
                    <StarIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className={`transform transition-all duration-1000 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 group hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className={`flex items-center space-x-4 rtl:space-x-reverse mb-8 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <EyeIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-3xl font-bold text-gray-900 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
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
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 group hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className={`flex items-center space-x-4 rtl:space-x-reverse mb-8 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <RocketLaunchIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-3xl font-bold text-gray-900 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
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
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className={`transform transition-all duration-1000 delay-600 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              {isRTL ? 'قيمنا' : 'Our Values'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6 mt-4">
              {isRTL ? 'القيم التي تحركنا' : 'Values That Drive Us'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              {isRTL 
                ? 'القيم الأساسية التي تشكل ثقافتنا وتوجه كل قراراتنا وأعمالنا' 
                : 'Core values that shape our culture and guide all our decisions and actions'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.key}
                  className={`bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border-2 ${value.borderColor} group hover:scale-105 hover:-translate-y-2 transform`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
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
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={`transform transition-all duration-1000 delay-800 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className={`text-center mb-16 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">
              {isRTL ? 'آراء العملاء' : 'Client Testimonials'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6 mt-4">
              {isRTL ? 'ما يقوله عملاؤنا' : 'What Our Clients Say'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
              <div className="text-center">
                <div className="mb-8">
                  <p className={`text-2xl text-gray-700 leading-relaxed ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    "{testimonials[currentTestimonial].content[isRTL ? 'ar' : 'en']}"
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {testimonials[currentTestimonial].name[isRTL ? 'ar' : 'en'].charAt(0)}
                    </span>
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className={`text-xl font-bold text-gray-900 ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {testimonials[currentTestimonial].name[isRTL ? 'ar' : 'en']}
                    </h4>
                    <p className={`text-gray-600 ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {testimonials[currentTestimonial].role[isRTL ? 'ar' : 'en']}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse mt-8">
              <button
                onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
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
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ChevronRightIcon className="w-6 h-6 text-primary" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
