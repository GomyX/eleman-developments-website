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
      nameKey: 'luxury_villa_825',
      locationKey: 'luxury_villa_825',
      descriptionKey: 'luxury_villa_825',
      startingPrice: '8500000',
      image: '/images/properties/luxury-villa-825.jpg',
      slug: 'luxury-villa-825'
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
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${
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
        <div className="flex justify-center mb-12">
          <div className="max-w-md w-full">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-saffron/20 to-teal/20 flex items-center justify-center">
                    {/* Placeholder for project image */}
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-saffron">إ</span>
                      </div>
                      <p className="text-sm">{locale === 'ar' ? 'فيلا فاخرة ٨٢٥م' : 'Luxury Villa 825m'}</p>
                    </div>
                  </div>
                  
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
                    {locale === 'ar' ? 'فيلا فاخرة ٨٢٥م' : 'Luxury Villa 825m'}
                  </h3>

                  {/* Location */}
                  <div className={`flex items-center text-gray-600 mb-3 ${
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <MapPinIcon className={`w-4 h-4 ${isRTL ? 'mr-0 ml-1' : 'mr-1 ml-0'}`} />
                    <span className="text-sm">
                      {locale === 'ar' ? 'القاهرة الجديدة' : 'New Cairo'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-gray-600 text-sm mb-4 line-clamp-2 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {locale === 'ar' 
                      ? 'فيلا فاخرة ٨٢٥م مع حمام سباحة ٦٠م وحديقة خاصة ١٨٠م'
                      : 'Luxury 825m villa with 60m swimming pool and 180m private garden'
                    }
                  </p>

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
            className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal/90 shadow-lg hover:shadow-xl transition-all duration-300"
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

