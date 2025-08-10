'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export interface FilterState {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  areaRange: string;
  deliveryYear: string;
  features: string[];
  status: string;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function SearchFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle,
  className = ''
}: SearchFiltersProps) {
  const locale = useLocale();
  const t = useTranslations();
  const tPage = useTranslations('projects_page');
  const tSearch = useTranslations('search');
  
  const isRTL = locale === 'ar';

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['location', 'propertyType', 'priceRange']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const updateFilter = (key: keyof FilterState, value: string | string[]) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleFeature = (feature: string) => {
    const currentFeatures = filters.features || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    updateFilter('features', newFeatures);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  const FilterSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    sectionKey: string; 
    children: React.ReactNode; 
  }) => {
    const isExpanded = expandedSections.has(sectionKey);
    
    return (
      <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className={`flex items-center justify-between w-full py-2 text-left ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <span className="font-semibold text-gray-900">{title}</span>
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  const RadioOption = ({ 
    name, 
    value, 
    currentValue, 
    label, 
    onChange 
  }: { 
    name: string; 
    value: string; 
    currentValue: string; 
    label: string; 
    onChange: (value: string) => void; 
  }) => (
    <label className={`flex items-center space-x-3 rtl:space-x-reverse cursor-pointer ${
      isRTL ? 'flex-row-reverse' : 'flex-row'
    }`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={currentValue === value}
        onChange={(e) => onChange(e.target.value)}
        className="w-4 h-4 text-saffron border-gray-300 focus:ring-saffron"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  const CheckboxOption = ({ 
    value, 
    checked, 
    label, 
    onChange 
  }: { 
    value: string; 
    checked: boolean; 
    label: string; 
    onChange: (value: string) => void; 
  }) => (
    <label className={`flex items-center space-x-3 rtl:space-x-reverse cursor-pointer ${
      isRTL ? 'flex-row-reverse' : 'flex-row'
    }`}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-saffron border-gray-300 rounded focus:ring-saffron"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className={`flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <AdjustmentsHorizontalIcon className={`w-5 h-5 text-gray-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <span className="font-medium text-gray-700">
            {isOpen ? tPage('hide_filters') : tPage('show_filters')}
          </span>
          {hasActiveFilters && (
            <span className="bg-saffron text-white text-xs px-2 py-1 rounded-full ml-2 rtl:mr-2 rtl:ml-0">
              {Object.values(filters).filter(value => 
                Array.isArray(value) ? value.length > 0 : value !== ''
              ).length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`${className} ${isOpen ? 'block' : 'hidden lg:block'} bg-white rounded-lg shadow-lg p-6`}>
        {/* Header */}
        <div className={`flex items-center justify-between mb-6 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <div className={`flex items-center space-x-2 rtl:space-x-reverse ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <FunnelIcon className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">{tPage('filters')}</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-saffron hover:text-saffron/80 font-medium"
            >
              {tPage('reset_filters')}
            </button>
          )}
        </div>

        {/* Location Filter */}
        <FilterSection title={tPage('filter_labels.location')} sectionKey="location">
          <div className="space-y-2">
            <RadioOption
              name="location"
              value=""
              currentValue={filters.location}
              label={tSearch('any_location')}
              onChange={(value) => updateFilter('location', value)}
            />
            {Object.entries(tSearch.raw('locations')).map(([key, value]) => (
              <RadioOption
                key={key}
                name="location"
                value={key}
                currentValue={filters.location}
                label={value as string}
                onChange={(value) => updateFilter('location', value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Property Type Filter */}
        <FilterSection title={tPage('filter_labels.property_type')} sectionKey="propertyType">
          <div className="space-y-2">
            <RadioOption
              name="propertyType"
              value=""
              currentValue={filters.propertyType}
              label={tSearch('any_type')}
              onChange={(value) => updateFilter('propertyType', value)}
            />
            {Object.entries(tSearch.raw('property_types')).map(([key, value]) => (
              <RadioOption
                key={key}
                name="propertyType"
                value={key}
                currentValue={filters.propertyType}
                label={value as string}
                onChange={(value) => updateFilter('propertyType', value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection title={tPage('filter_labels.price_range')} sectionKey="priceRange">
          <div className="space-y-2">
            <RadioOption
              name="priceRange"
              value=""
              currentValue={filters.priceRange}
              label={tSearch('any_price')}
              onChange={(value) => updateFilter('priceRange', value)}
            />
            {Object.entries(tSearch.raw('price_ranges')).map(([key, value]) => (
              <RadioOption
                key={key}
                name="priceRange"
                value={key}
                currentValue={filters.priceRange}
                label={value as string}
                onChange={(value) => updateFilter('priceRange', value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Bedrooms Filter */}
        <FilterSection title={tPage('filter_labels.bedrooms')} sectionKey="bedrooms">
          <div className="space-y-2">
            <RadioOption
              name="bedrooms"
              value=""
              currentValue={filters.bedrooms}
              label={tSearch('any_bedrooms')}
              onChange={(value) => updateFilter('bedrooms', value)}
            />
            {Object.entries(tSearch.raw('bedrooms')).map(([key, value]) => (
              <RadioOption
                key={key}
                name="bedrooms"
                value={key}
                currentValue={filters.bedrooms}
                label={value as string}
                onChange={(value) => updateFilter('bedrooms', value)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Area Range Filter */}
        <FilterSection title={tPage('filter_labels.area_range')} sectionKey="areaRange">
          <div className="space-y-2">
            <RadioOption
              name="areaRange"
              value=""
              currentValue={filters.areaRange}
              label={locale === 'ar' ? 'أي مساحة' : 'Any Area'}
              onChange={(value) => updateFilter('areaRange', value)}
            />
            <RadioOption
              name="areaRange"
              value="under_100"
              currentValue={filters.areaRange}
              label={locale === 'ar' ? 'أقل من 100 م²' : 'Under 100 sqm'}
              onChange={(value) => updateFilter('areaRange', value)}
            />
            <RadioOption
              name="areaRange"
              value="100_200"
              currentValue={filters.areaRange}
              label={locale === 'ar' ? '100 - 200 م²' : '100 - 200 sqm'}
              onChange={(value) => updateFilter('areaRange', value)}
            />
            <RadioOption
              name="areaRange"
              value="200_300"
              currentValue={filters.areaRange}
              label={locale === 'ar' ? '200 - 300 م²' : '200 - 300 sqm'}
              onChange={(value) => updateFilter('areaRange', value)}
            />
            <RadioOption
              name="areaRange"
              value="over_300"
              currentValue={filters.areaRange}
              label={locale === 'ar' ? 'أكثر من 300 م²' : 'Over 300 sqm'}
              onChange={(value) => updateFilter('areaRange', value)}
            />
          </div>
        </FilterSection>

        {/* Status Filter */}
        <FilterSection title={tPage('filter_labels.status')} sectionKey="status">
          <div className="space-y-2">
            <RadioOption
              name="status"
              value=""
              currentValue={filters.status}
              label={locale === 'ar' ? 'جميع الحالات' : 'All Status'}
              onChange={(value) => updateFilter('status', value)}
            />
            <RadioOption
              name="status"
              value="available"
              currentValue={filters.status}
              label={locale === 'ar' ? 'متاح' : 'Available'}
              onChange={(value) => updateFilter('status', value)}
            />
            <RadioOption
              name="status"
              value="coming_soon"
              currentValue={filters.status}
              label={locale === 'ar' ? 'قريباً' : 'Coming Soon'}
              onChange={(value) => updateFilter('status', value)}
            />
          </div>
        </FilterSection>

        {/* Features Filter */}
        <FilterSection title={tPage('filter_labels.features')} sectionKey="features">
          <div className="space-y-2">
            {['garden', 'parking', 'balcony', 'roof', 'pool', 'gym', 'security'].map((feature) => (
              <CheckboxOption
                key={feature}
                value={feature}
                checked={filters.features.includes(feature)}
                label={t(`property_card.features.${feature}`) || feature}
                onChange={toggleFeature}
              />
            ))}
          </div>
        </FilterSection>

        {/* Mobile Apply Button */}
        <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onToggle}
            className="w-full bg-saffron text-white py-3 px-4 rounded-lg font-semibold hover:bg-saffron/90 transition-colors duration-200"
          >
            {tPage('apply_filters')}
          </button>
        </div>
      </div>
    </>
  );
}
