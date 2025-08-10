'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  CalendarDaysIcon, 
  DocumentArrowDownIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

export default function HeroSection() {
  const locale = useLocale();
  const t = useTranslations('hero');
  
  const isRTL = locale === 'ar';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Saffron Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron via-saffron/90 to-saffron/80">
        {/* Brand Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white/50 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-white/30 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-white/20 rounded-full animate-pulse delay-500"></div>
        </div>
        
        {/* Arabic Calligraphy Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute top-1/4 ${isRTL ? 'right-10' : 'left-10'} text-9xl font-bold text-white select-none`}>
            إ
          </div>
          <div className={`absolute bottom-1/4 ${isRTL ? 'left-10' : 'right-10'} text-6xl font-bold text-white select-none`}>
            الإيمان
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {t('title')}
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Subtitle */}
          <div className="mb-12">
            <p className={`text-lg sm:text-xl md:text-2xl font-medium max-w-4xl mx-auto leading-relaxed opacity-95 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {t('subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto">
            {/* Browse Properties - Primary CTA */}
            <Link
              href={`/${locale}/projects`}
              className="group bg-white text-saffron px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse min-w-[200px] justify-center"
            >
              <MagnifyingGlassIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <span>{t('cta_browse')}</span>
            </Link>

            {/* Schedule Visit - Secondary CTA */}
            <Link
              href={`/${locale}/contact`}
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-saffron transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse min-w-[200px] justify-center"
            >
              <CalendarDaysIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <span>{t('cta_schedule')}</span>
            </Link>

            {/* Download Brochure - Tertiary CTA */}
            <button className="group bg-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal/90 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse min-w-[200px] justify-center">
              <DocumentArrowDownIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <span>{t('cta_download')}</span>
            </button>
          </div>

          {/* Video Play Button - Optional */}
          <div className="mt-16">
            <button
              className="group bg-white/10 backdrop-blur-sm border border-white/30 rounded-full p-6 hover:bg-white/20 transition-all duration-300"
              aria-label="Play company video"
            >
              <PlayIcon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-200 ml-1" />
            </button>
            <p className="mt-4 text-sm opacity-80 font-medium">
              {isRTL ? 'شاهد قصة الإيمان' : 'Watch Our Story'}
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2" />
            </div>
            <p className="mt-2 text-xs opacity-60">
              {isRTL ? 'اكتشف المزيد' : 'Discover More'}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/15 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/25 rounded-full" />
      </div>
    </section>
  );
}
