'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function HeroSection() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const isRTL = locale === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      image: '/images/properties/villa-1.jpg',
      title: { ar: 'حيث يتشكل الإيمان', en: 'Where Belief Takes Shape' },
      subtitle: { ar: 'مشاريع عقارية متميزة تجمع بين الجودة والثقة والإيمان', en: 'Premium real estate projects combining quality, trust, and belief' },
      accent: { ar: 'الثقة في كل تفصيلة', en: 'Trust in every detail' }
    },
    {
      image: '/images/properties/villa-2.jpg',
      title: { ar: 'الإيمان للتطوير العقاري', en: 'El Eman Developments' },
      subtitle: { ar: 'رؤية تتجسد في كل مشروع نبنيه', en: 'A vision embodied in every project we build' },
      accent: { ar: 'ريادة في التطوير', en: 'Leadership in development' }
    },
    {
      image: '/images/properties/villa-2-2.jpg',
      title: { ar: 'مبني على الإيمان', en: 'Built on Belief' },
      subtitle: { ar: 'نصنع أحلامكم السكنية بأعلى معايير الجودة', en: 'Creating your residential dreams with the highest quality standards' },
      accent: { ar: 'جودة لا تُضاهى', en: 'Unmatched quality' }
    },
    {
      image: '/images/properties/villa-2-inside.jpg',
      title: { ar: 'تصاميم داخلية راقية', en: 'Elegant Interior Designs' },
      subtitle: { ar: 'مساحات معيشة تعكس الأناقة والراحة', en: 'Living spaces that reflect elegance and comfort' },
      accent: { ar: 'فخامة في كل ركن', en: 'Luxury in every corner' }
    },
    {
      image: '/images/properties/villa-1-out.JPG',
      title: { ar: 'إطلالات خارجية مميزة', en: 'Distinguished Exterior Views' },
      subtitle: { ar: 'هندسة معمارية تحاكي أحدث التصاميم العالمية', en: 'Architecture that embraces the latest global designs' },
      accent: { ar: 'تصميم استثنائي', en: 'Exceptional design' }
    },
    {
      image: '/images/properties/villa-2-night.JPG',
      title: { ar: 'جمال يتألق في الليل', en: 'Beauty that Shines at Night' },
      subtitle: { ar: 'إضاءة مدروسة تبرز جمال التصميم', en: 'Thoughtful lighting that highlights design beauty' },
      accent: { ar: 'سحر الليل', en: 'Night magic' }
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 3000); // Increased to 6 seconds for better viewing
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Parallax Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ease-in-out transform ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear transform hover:scale-110"
            style={{ 
              backgroundImage: slide.image 
                ? `url(${slide.image})` 
                : 'linear-gradient(135deg, #E29578 0%, #006D77 100%)',
              filter: 'brightness(0.7) contrast(1.1)'
            }}
          />
        </div>
      ))}
      
      {/* Sophisticated Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent z-10" />

      {/* Elegant Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`absolute ${isRTL ? 'right-6 md:right-12' : 'left-6 md:left-12'} top-1/2 -translate-y-1/2 z-30 
          group p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 
          rounded-full transition-all duration-500 hover:scale-110 shadow-2xl`}
      >
        {isRTL ? 
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" /> : 
          <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" />
        }
      </button>
      <button
        onClick={nextSlide}
        className={`absolute ${isRTL ? 'left-6 md:left-12' : 'right-6 md:right-12'} top-1/2 -translate-y-1/2 z-30 
          group p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 
          rounded-full transition-all duration-500 hover:scale-110 shadow-2xl`}
      >
        {isRTL ? 
          <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" /> : 
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" />
        }
      </button>

      {/* Main Content with Enhanced Animations */}
      <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Accent Text */}
        <div className="mb-4 overflow-hidden">
          <p className={`text-primary font-medium tracking-widest uppercase text-sm md:text-base transform transition-all duration-1000 delay-200 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          } ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            {slides[currentSlide].accent[locale as 'ar' | 'en']}
          </p>
        </div>

        {/* Dynamic Title with Staggered Animation */}
        <div className="mb-8 overflow-hidden">
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-none mb-6 
            transform transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } ${isRTL ? 'font-arabic' : 'font-latin'} text-shadow-lg`}>
            {slides[currentSlide].title[locale as 'ar' | 'en']}
          </h1>
          
          {/* Elegant Divider */}
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
            <div className="w-12 h-px bg-primary"></div>
            <StarIcon className="w-4 h-4 text-primary" />
            <div className="w-12 h-px bg-primary"></div>
          </div>
        </div>

        {/* Dynamic Subtitle */}
        <div className="mb-12 overflow-hidden">
          <p className={`text-xl sm:text-2xl md:text-3xl font-light max-w-4xl mx-auto leading-relaxed opacity-90 
            transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } ${isRTL ? 'font-arabic' : 'font-latin'} text-shadow`}>
            {slides[currentSlide].subtitle[locale as 'ar' | 'en']}
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transform transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}>
          <Link
            href={`/${locale}/projects`}
            className="group relative bg-gradient-to-r from-primary to-primary-dark text-white px-12 py-5 text-lg font-semibold tracking-wide 
              hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1
              flex items-center space-x-3 rtl:space-x-reverse min-w-[280px] justify-center overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <MagnifyingGlassIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{t('cta_browse')}</span>
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="group relative border-2 border-white/50 text-white px-12 py-5 text-lg font-semibold tracking-wide 
              hover:bg-white hover:text-secondary hover:border-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-1
              flex items-center space-x-3 rtl:space-x-reverse min-w-[280px] justify-center backdrop-blur-sm rounded-lg overflow-hidden"
          >
            <CalendarDaysIcon className="w-5 h-5 transition-colors duration-300" />
            <span>{t('cta_schedule')}</span>
          </Link>
        </div>

        {/* Sophisticated Slide Indicators */}
        <div className={`flex justify-center items-center space-x-3 rtl:space-x-reverse transform transition-all duration-1000 delay-900 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative transition-all duration-500 group ${
                index === currentSlide 
                  ? 'w-12 h-3 bg-primary rounded-full' 
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full hover:scale-125'
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Slide Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300 ease-linear"
            style={{ 
              width: isPaused ? '100%' : `${((currentSlide + 1) / slides.length) * 100}%`,
              transition: isPaused ? 'none' : 'width 6s linear'
            }}
          ></div>
        </div>
      </div>

      {/* Pause/Play Indicator */}
      {isPaused && (
        <div className="absolute top-8 right-8 z-30 bg-black/50 backdrop-blur-sm rounded-full p-3">
          <PlayIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </section>
  );
}


