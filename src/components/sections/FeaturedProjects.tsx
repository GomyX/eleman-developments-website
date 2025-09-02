'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPinIcon, 
  ArrowRightIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

interface Project {
  id: string;
  nameKey: string;
  locationKey: string;
  descriptionKey: string;
  startingPrice: string;
  image: string;
  slug: string;
}

export default function FeaturedProjects() {
  const locale = useLocale();
  const t = useTranslations('featured_projects');
  
  const isRTL = locale === 'ar';

  // Sample projects data - in a real app, this would come from an API or CMS
  const projects: Project[] = [
    {
      id: '1',
      nameKey: 'noor_villa',
      locationKey: 'noor_villa',
      descriptionKey: 'noor_villa',
      startingPrice: '8500000',
      image: '/images/properties/noor villa/1.jpg',
      slug: 'noor-villa'
    },
    {
      id: '2',
      nameKey: 'modern_penthouse',
      locationKey: 'modern_penthouse',
      descriptionKey: 'modern_penthouse',
      startingPrice: '12000000',
      image: '/images/properties/villa-2-2.jpg',
      slug: 'modern-penthouse'
    }
  ];

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    if (numPrice >= 1000000) {
      return `${(numPrice / 1000000).toFixed(1)}M`;
    }
    return numPrice.toLocaleString();
  };

  return (
    <section className="py-16 bg-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 text-center ${
            isRTL ? 'font-arabic' : 'font-latin'
          }`}>
            {t('title')}
          </h2>
          <p className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 ${
            isRTL ? 'font-arabic' : 'font-latin'
          }`}>
            {t('subtitle')}
          </p>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="mb-12">
          <div className="w-full space-y-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group w-full"
              >
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Project ${project.id}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="bg-white text-saffron px-6 py-2 rounded-full font-semibold hover:bg-saffron hover:text-white transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <span>{t('learn_more')}</span>
                      {isRTL ? (
                        <ArrowLeftIcon className="w-4 h-4" />
                      ) : (
                        <ArrowRightIcon className="w-4 h-4" />
                      )}
                    </Link>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  {/* Project Name */}
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {project.id === '1' 
                      ? (locale === 'ar' ? 'فيلا فاخرة ٨٢٥م' : 'Luxury Villa 825m')
                      : project.id === '2'
                      ? (locale === 'ar' ? 'بنتهاوس عصري' : 'Modern Penthouse')
                      : (locale === 'ar' ? 'كمبوند عائلي' : 'Family Compound')
                    }
                  </h3>

                  {/* Location */}
                  <div className={`flex items-center text-gray-600 mb-3 ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <MapPinIcon className={`w-4 h-4 ${isRTL ? 'mr-0 ml-1' : 'mr-1 ml-0'}`} />
                    <span className="text-sm">
                      {project.id === '1'
                        ? (locale === 'ar' ? 'القاهرة الجديدة' : 'New Cairo')
                        : project.id === '2'
                        ? (locale === 'ar' ? 'الشيخ زايد' : 'Sheikh Zayed')
                        : (locale === 'ar' ? 'الرحاب' : 'Rehab City')
                      }
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {project.id === '1' 
                      ? (locale === 'ar' ? 'فيلا نور' : 'Noor Villa')
                      : (locale === 'ar' ? 'بنتهاوس عصري' : 'Modern Penthouse')
                    }
                  </h3>

                  {/* Location */}
                  <div className={`flex items-center text-gray-600 mb-3 ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <MapPinIcon className={`w-4 h-4 ${isRTL ? 'mr-0 ml-1' : 'mr-1 ml-0'}`} />
                    <span className="text-sm">
                      {project.id === '1'
                        ? (locale === 'ar' ? 'القاهرة الجديدة' : 'New Cairo')
                        : (locale === 'ar' ? 'الشيخ زايد' : 'Sheikh Zayed')
                      }
                    </span>
                  </div>

                  {/* Description */}
                  <div className={`text-gray-600 text-sm mb-4 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {project.id === '1' ? (
                      locale === 'ar' ? (
                        <div className="space-y-2">
                          <p>مباني ٤٢٠م • حمام سباحة ٦٠م مع سقف مغطى متحرك • حديقة خاصة نجيلة طبيعية ١٨٠م</p>
                          <p className="text-xs">الدور الأرضي: ريسبشن ٣ قطع - حمام كبير - مطبخ كبير - غرفة ماستر - ٢ تراس</p>
                          <p className="text-xs">الدور الثاني: ٤ غرف (منهم ٢ ماستر) - ريسبشن - حمام - تراس كبير على حمام السباحة - ٣ بلكونة</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p>Built area 420m • 60m swimming pool with movable covered roof • Private natural grass garden 180m</p>
                          <p className="text-xs">Ground floor: 3-piece reception - large bathroom - large kitchen - master room - 2 terraces</p>
                          <p className="text-xs">Second floor: 4 rooms (2 master) - reception - bathroom - large terrace overlooking pool - 3 balconies</p>
                        </div>
                      )
                    ) : (
                      locale === 'ar'
                        ? 'بنتهاوس عصري مع إطلالة بانورامية وتراس واسع'
                        : 'Modern penthouse with panoramic views and spacious terrace'
                    )}
                  </div>

                  {/* Price */}
                  <div className={`flex items-center justify-between ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <p className="text-xs text-gray-500 mb-1">{t('starting_from')}</p>
                      <p className="text-lg font-bold text-saffron">
                        {formatPrice(project.startingPrice)} {locale === 'ar' ? 'جنيه' : 'EGP'}
                      </p>
                    </div>
                    
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="bg-saffron text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-saffron/90 transition-colors duration-200 flex items-center space-x-1 rtl:space-x-reverse"
                    >
                      <span>{t('learn_more')}</span>
                      {isRTL ? (
                        <ArrowLeftIcon className="w-3 h-3" />
                      ) : (
                        <ArrowRightIcon className="w-3 h-3" />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>{t('view_all')}</span>
            {isRTL ? (
              <ArrowLeftIcon className="w-5 h-5" />
            ) : (
              <ArrowRightIcon className="w-5 h-5" />
            )}
          </Link>
        </div>
      </div>
    </section>
  );
}



 