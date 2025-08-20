'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function HeroSection() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const isRTL = locale === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '',
      title: { ar: 'فيلا فاخرة ٨٢٥م', en: 'Luxury Villa 825m' },
      subtitle: { ar: 'حمام سباحة وحديقة خاصة', en: 'Swimming Pool & Private Garden' }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </div>
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`absolute ${isRTL ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300`}
      >
        {isRTL ? <ChevronRightIcon className="w-6 h-6 text-white" /> : <ChevronLeftIcon className="w-6 h-6 text-white" />}
      </button>
      <button
        onClick={nextSlide}
        className={`absolute ${isRTL ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300`}
      >
        {isRTL ? <ChevronLeftIcon className="w-6 h-6 text-white" /> : <ChevronRightIcon className="w-6 h-6 text-white" />}
      </button>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          {/* Dynamic Title */}
          <div className="mb-12">
            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-6 transition-all duration-1000 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {slides[currentSlide].title[locale as 'ar' | 'en']}
            </h1>
            <div className="w-16 h-px bg-primary mx-auto"></div>
          </div>

          {/* Dynamic Subtitle */}
          <div className="mb-16">
            <p className={`text-xl sm:text-2xl font-light max-w-3xl mx-auto leading-relaxed opacity-90 transition-all duration-1000 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {slides[currentSlide].subtitle[locale as 'ar' | 'en']}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href={`/${locale}/projects`}
              className="group bg-white/95 backdrop-blur-sm text-secondary px-10 py-4 text-lg font-medium tracking-wide hover:bg-white hover:scale-105 transition-all duration-500 flex items-center space-x-3 rtl:space-x-reverse min-w-[220px] justify-center shadow-2xl"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>{t('cta_browse')}</span>
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="group border border-white/50 text-white px-10 py-4 text-lg font-medium tracking-wide hover:bg-white/10 hover:border-white transition-all duration-500 flex items-center space-x-3 rtl:space-x-reverse min-w-[220px] justify-center backdrop-blur-sm"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span>{t('cta_schedule')}</span>
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 rtl:space-x-reverse mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


