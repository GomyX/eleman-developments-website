'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  type: 'image' | 'video' | '360';
  thumbnail?: string;
}

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
  className?: string;
}

export default function PropertyGallery({ images, title, className = '' }: PropertyGalleryProps) {
  const locale = useLocale();
  const t = useTranslations('property_details');
  const isRTL = locale === 'ar';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Mock images if none provided
  const galleryImages = images.length > 0 ? images : [
    { id: '1', url: '/images/properties/placeholder-1.jpg', alt: title, type: 'image' as const },
    { id: '2', url: '/images/properties/placeholder-2.jpg', alt: title, type: 'image' as const },
    { id: '3', url: '/images/properties/placeholder-3.jpg', alt: title, type: 'image' as const },
    { id: '4', url: '/images/properties/placeholder-4.jpg', alt: title, type: 'image' as const },
    { id: '5', url: '/images/properties/placeholder-5.jpg', alt: title, type: 'video' as const },
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayIcon className="w-8 h-8" />;
      case '360':
        return <div className="text-xs font-bold">360°</div>;
      default:
        return <MagnifyingGlassPlusIcon className="w-8 h-8" />;
    }
  };

  return (
    <div className={className}>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gray-200">
          {galleryImages.length > 0 ? (
            <>
              <div className="w-full h-full bg-gradient-to-br from-saffron/20 to-teal/20 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-saffron">إ</span>
                  </div>
                  <p className="text-sm">{title}</p>
                  <p className="text-xs mt-1">Image {currentIndex + 1} of {galleryImages.length}</p>
                </div>
              </div>
              
              {/* Media Type Indicator */}
              <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-lg">
                {getMediaIcon(galleryImages[currentIndex].type)}
              </div>

              {/* Zoom Button */}
              <button
                onClick={() => openLightbox(currentIndex)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors duration-200"
              >
                <MagnifyingGlassPlusIcon className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={isRTL ? nextImage : prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={isRTL ? prevImage : nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-gray-600">إ</span>
                </div>
                <p className="text-sm">{t('gallery')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {galleryImages.length > 1 && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    currentIndex === index
                      ? 'border-saffron ring-2 ring-saffron/20'
                      : 'border-gray-300 hover:border-saffron/50'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-saffron/10 to-teal/10 flex items-center justify-center">
                    <div className="text-center">
                      {getMediaIcon(image.type)}
                      <div className="text-xs mt-1">{index + 1}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Lightbox Navigation */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={isRTL ? nextLightboxImage : prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors duration-200"
              >
                <ChevronLeftIcon className="w-8 h-8" />
              </button>
              <button
                onClick={isRTL ? prevLightboxImage : nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors duration-200"
              >
                <ChevronRightIcon className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Lightbox Content */}
          <div className="relative max-w-7xl max-h-[90vh] mx-4">
            <div className="relative w-full h-full bg-gradient-to-br from-saffron/20 to-teal/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-white">إ</span>
                </div>
                <p className="text-lg mb-2">{title}</p>
                <p className="text-sm opacity-80">
                  {t('gallery')} - {lightboxIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </div>

            {/* Lightbox Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Keyboard Navigation Hint */}
          <div className="absolute bottom-4 left-4 text-white/70 text-sm">
            {isRTL ? 'استخدم الأسهم للتنقل' : 'Use arrow keys to navigate'}
          </div>
        </div>
      )}
    </div>
  );
}

