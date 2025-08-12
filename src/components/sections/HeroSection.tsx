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
      {/* YouTube Background Video */}
      <iframe
        className="absolute inset-0 w-full h-full object-cover scale-150"
        src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10">
        {/* Subtle Brand Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute top-1/4 ${isRTL ? 'right-10' : 'left-10'} text-6xl font-light text-white select-none`}>
            إ
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-6 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {t('title')}
            </h1>
            <div className="w-16 h-px bg-primary mx-auto"></div>
          </div>

          {/* Subtitle */}
          <div className="mb-16">
            <p className={`text-xl sm:text-2xl font-light max-w-3xl mx-auto leading-relaxed opacity-90 ${
              isRTL ? 'font-arabic' : 'font-latin'
            }`}>
              {t('subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Browse Properties - Primary CTA */}
            <Link
              href={`/${locale}/projects`}
              className="group bg-white/95 backdrop-blur-sm text-secondary px-10 py-4 text-lg font-medium tracking-wide hover:bg-white hover:scale-105 transition-all duration-500 flex items-center space-x-3 rtl:space-x-reverse min-w-[220px] justify-center shadow-2xl"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>{t('cta_browse')}</span>
            </Link>

            {/* Schedule Visit - Secondary CTA */}
            <Link
              href={`/${locale}/contact`}
              className="group border border-white/50 text-white px-10 py-4 text-lg font-medium tracking-wide hover:bg-white/10 hover:border-white transition-all duration-500 flex items-center space-x-3 rtl:space-x-reverse min-w-[220px] justify-center backdrop-blur-sm"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span>{t('cta_schedule')}</span>
            </Link>
          </div>



          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-px h-16 bg-white/30 animate-pulse"></div>
            <p className="mt-4 text-xs opacity-60 font-light tracking-widest uppercase">
              {isRTL ? 'اكتشف المزيد' : 'Discover More'}
            </p>
          </div>
        </div>
      </div>


    </section>
  );
}


