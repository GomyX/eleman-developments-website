'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SearchFilters {
  query: string;
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

interface PropertySearchProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

export default function PropertySearch({ onSearch, className = '' }: PropertySearchProps) {
  const locale = useLocale();
  const t = useTranslations('search');
  
  const isRTL = locale === 'ar';

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });

  const locations = [
    { key: 'new_cairo', value: 'new_cairo' },
    { key: 'sheikh_zayed', value: 'sheikh_zayed' },
    { key: 'october', value: 'october' },
    { key: 'north_coast', value: 'north_coast' }
  ];

  const propertyTypes = [
    { key: 'apartment', value: 'apartment' },
    { key: 'villa', value: 'villa' },
    { key: 'townhouse', value: 'townhouse' },
    { key: 'duplex', value: 'duplex' },
    { key: 'penthouse', value: 'penthouse' }
  ];

  const priceRanges = [
    { key: 'under_2m', value: 'under_2m' },
    { key: '2m_to_5m', value: '2m_to_5m' },
    { key: '5m_to_10m', value: '5m_to_10m' },
    { key: '10m_to_20m', value: '10m_to_20m' },
    { key: 'over_20m', value: 'over_20m' }
  ];

  const bedroomOptions = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5_plus', value: '5_plus' }
  ];

  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: '',
      location: '',
      propertyType: '',
      priceRange: '',
      bedrooms: ''
    };
    setFilters(clearedFilters);
    onSearch?.(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t('placeholder')}
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className={`block w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-colors duration-200 text-gray-900 placeholder-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Location Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPinIcon className="w-4 h-4 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
            {t('filter_location')}
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className={`block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-colors duration-200 text-gray-900 bg-white ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">{t('any_location')}</option>
            {locations.map((location) => (
              <option key={location.key} value={location.value}>
                {t(`locations.${location.key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <HomeIcon className="w-4 h-4 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
            {t('filter_type')}
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className={`block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-colors duration-200 text-gray-900 bg-white ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">{t('any_type')}</option>
            {propertyTypes.map((type) => (
              <option key={type.key} value={type.value}>
                {t(`property_types.${type.key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CurrencyDollarIcon className="w-4 h-4 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
            {t('filter_price')}
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className={`block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-colors duration-200 text-gray-900 bg-white ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">{t('any_price')}</option>
            {priceRanges.map((range) => (
              <option key={range.key} value={range.value}>
                {t(`price_ranges.${range.key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UserGroupIcon className="w-4 h-4 inline-block mr-1 rtl:ml-1 rtl:mr-0" />
            {t('filter_bedrooms')}
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            className={`block w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-colors duration-200 text-gray-900 bg-white ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">{t('any_bedrooms')}</option>
            {bedroomOptions.map((option) => (
              <option key={option.key} value={option.value}>
                {t(`bedrooms.${option.key}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleSearch}
          className="flex-1 bg-saffron text-white px-6 py-3 rounded-lg font-semibold hover:bg-saffron/90 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          <span>{t('search_button')}</span>
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="sm:flex-shrink-0 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <XMarkIcon className="w-5 h-5" />
            <span>{t('clear_filters')}</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.query && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-saffron/10 text-saffron border border-saffron/20">
                {filters.query}
                <button
                  onClick={() => handleFilterChange('query', '')}
                  className="ml-2 rtl:mr-2 rtl:ml-0"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal/10 text-teal border border-teal/20">
                {t(`locations.${filters.location}`)}
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="ml-2 rtl:mr-2 rtl:ml-0"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.propertyType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-saffron/10 text-saffron border border-saffron/20">
                {t(`property_types.${filters.propertyType}`)}
                <button
                  onClick={() => handleFilterChange('propertyType', '')}
                  className="ml-2 rtl:mr-2 rtl:ml-0"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.priceRange && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal/10 text-teal border border-teal/20">
                {t(`price_ranges.${filters.priceRange}`)}
                <button
                  onClick={() => handleFilterChange('priceRange', '')}
                  className="ml-2 rtl:mr-2 rtl:ml-0"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.bedrooms && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-saffron/10 text-saffron border border-saffron/20">
                {t(`bedrooms.${filters.bedrooms}`)}
                <button
                  onClick={() => handleFilterChange('bedrooms', '')}
                  className="ml-2 rtl:mr-2 rtl:ml-0"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
