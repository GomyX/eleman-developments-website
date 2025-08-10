'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import SearchFilters, { FilterState } from '@/components/search/SearchFilters';
import PropertySearch from '@/components/search/PropertySearch';
import {
  Bars3Icon,
  ViewColumnsIcon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

// Mock property data - in a real app, this would come from an API
const mockProperties = [
  {
    id: '1',
    slug: 'el-eman-heights-villa-1',
    title: { ar: 'فيلا مرتفعات الإيمان', en: 'El Eman Heights Villa' },
    location: { ar: 'القاهرة الجديدة', en: 'New Cairo' },
    startingPrice: 3500000,
    bedrooms: 4,
    area: 250,
    deliveryDate: '2025',
    image: '/images/properties/villa-1.jpg',
    status: 'available' as const,
    features: ['garden', 'parking', 'security'],
    projectName: { ar: 'مرتفعات الإيمان', en: 'El Eman Heights' },
    locationKey: 'new_cairo',
    propertyTypeKey: 'villa',
    priceRangeKey: '2m_to_5m',
    bedroomsKey: '4',
    areaRange: '200_300'
  },
  {
    id: '2',
    slug: 'belief-gardens-townhouse-1',
    title: { ar: 'تاون هاوس حدائق الإيمان', en: 'Belief Gardens Townhouse' },
    location: { ar: 'الشيخ زايد', en: 'Sheikh Zayed' },
    startingPrice: 2800000,
    bedrooms: 3,
    area: 180,
    deliveryDate: '2024',
    image: '/images/properties/townhouse-1.jpg',
    status: 'available' as const,
    features: ['balcony', 'parking', 'gym'],
    projectName: { ar: 'حدائق الإيمان', en: 'Belief Gardens' },
    locationKey: 'sheikh_zayed',
    propertyTypeKey: 'townhouse',
    priceRangeKey: '2m_to_5m',
    bedroomsKey: '3',
    areaRange: '100_200'
  },
  {
    id: '3',
    slug: 'eman-plaza-apartment-1',
    title: { ar: 'شقة بلازا الإيمان', en: 'Eman Plaza Apartment' },
    location: { ar: 'أكتوبر', en: 'October' },
    startingPrice: 2200000,
    bedrooms: 2,
    area: 120,
    deliveryDate: '2025',
    image: '/images/properties/apartment-1.jpg',
    status: 'available' as const,
    features: ['balcony', 'pool', 'gym'],
    projectName: { ar: 'بلازا الإيمان', en: 'Eman Plaza' },
    locationKey: 'october',
    propertyTypeKey: 'apartment',
    priceRangeKey: '2m_to_5m',
    bedroomsKey: '2',
    areaRange: '100_200'
  },
  {
    id: '4',
    slug: 'coastal-retreat-villa-1',
    title: { ar: 'فيلا منتجع الساحل', en: 'Coastal Retreat Villa' },
    location: { ar: 'الساحل الشمالي', en: 'North Coast' },
    startingPrice: 4500000,
    bedrooms: 5,
    area: 350,
    deliveryDate: '2026',
    image: '/images/properties/coastal-villa-1.jpg',
    status: 'coming_soon' as const,
    features: ['pool', 'garden', 'security'],
    projectName: { ar: 'منتجع الساحل', en: 'Coastal Retreat' },
    locationKey: 'north_coast',
    propertyTypeKey: 'villa',
    priceRangeKey: '2m_to_5m',
    bedroomsKey: '5_plus',
    areaRange: 'over_300'
  },
  {
    id: '5',
    slug: 'eman-plaza-penthouse-1',
    title: { ar: 'بنتهاوس بلازا الإيمان', en: 'Eman Plaza Penthouse' },
    location: { ar: 'أكتوبر', en: 'October' },
    startingPrice: 6500000,
    bedrooms: 4,
    area: 280,
    deliveryDate: '2025',
    image: '/images/properties/penthouse-1.jpg',
    status: 'available' as const,
    features: ['roof', 'pool', 'gym', 'security'],
    projectName: { ar: 'بلازا الإيمان', en: 'Eman Plaza' },
    locationKey: 'october',
    propertyTypeKey: 'penthouse',
    priceRangeKey: '5m_to_10m',
    bedroomsKey: '4',
    areaRange: '200_300'
  },
  {
    id: '6',
    slug: 'belief-gardens-duplex-1',
    title: { ar: 'دوبلكس حدائق الإيمان', en: 'Belief Gardens Duplex' },
    location: { ar: 'الشيخ زايد', en: 'Sheikh Zayed' },
    startingPrice: 3200000,
    bedrooms: 3,
    area: 200,
    deliveryDate: '2024',
    image: '/images/properties/duplex-1.jpg',
    status: 'available' as const,
    features: ['garden', 'parking', 'balcony'],
    projectName: { ar: 'حدائق الإيمان', en: 'Belief Gardens' },
    locationKey: 'sheikh_zayed',
    propertyTypeKey: 'duplex',
    priceRangeKey: '2m_to_5m',
    bedroomsKey: '3',
    areaRange: '200_300'
  }
];

interface ProjectsClientProps {
  locale: string;
}

export default function ProjectsClient({ locale }: ProjectsClientProps) {
  const t = useTranslations('projects_page');
  const isRTL = locale === 'ar';

  const [filters, setFilters] = useState<FilterState>({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    areaRange: '',
    deliveryYear: '',
    features: [],
    status: ''
  });

  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => {
      // Search query filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const titleMatch = property.title[locale as 'ar' | 'en'].toLowerCase().includes(searchLower);
        const locationMatch = property.location[locale as 'ar' | 'en'].toLowerCase().includes(searchLower);
        const projectMatch = property.projectName?.[locale as 'ar' | 'en']?.toLowerCase().includes(searchLower);
        if (!titleMatch && !locationMatch && !projectMatch) return false;
      }

      // Location filter
      if (filters.location && property.locationKey !== filters.location) return false;

      // Property type filter
      if (filters.propertyType && property.propertyTypeKey !== filters.propertyType) return false;

      // Price range filter
      if (filters.priceRange && property.priceRangeKey !== filters.priceRange) return false;

      // Bedrooms filter
      if (filters.bedrooms && property.bedroomsKey !== filters.bedrooms) return false;

      // Area range filter
      if (filters.areaRange && property.areaRange !== filters.areaRange) return false;

      // Status filter
      if (filters.status && property.status !== filters.status) return false;

      // Features filter
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every(feature => 
          property.features.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.startingPrice - b.startingPrice;
        case 'price_high':
          return b.startingPrice - a.startingPrice;
        case 'delivery_soon':
          return a.deliveryDate.localeCompare(b.deliveryDate);
        case 'delivery_late':
          return b.deliveryDate.localeCompare(a.deliveryDate);
        case 'location':
          return a.location[locale as 'ar' | 'en'].localeCompare(b.location[locale as 'ar' | 'en']);
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'featured':
        default:
          return 0; // Keep original order for featured
      }
    });

    return filtered;
  }, [filters, sortBy, searchQuery, locale]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProperties.length / itemsPerPage);
  const paginatedProperties = filteredAndSortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      areaRange: '',
      deliveryYear: '',
      features: [],
      status: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearch = (searchFilters: { query: string; location: string; propertyType: string; priceRange: string; bedrooms: string }) => {
    setSearchQuery(searchFilters.query);
    setFilters(prev => ({
      ...prev,
      location: searchFilters.location || '',
      propertyType: searchFilters.propertyType || '',
      priceRange: searchFilters.priceRange || '',
      bedrooms: searchFilters.bedrooms || ''
    }));
    setCurrentPage(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-saffron to-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-90">
              {t('subtitle')}
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <PropertySearch onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
              className="sticky top-4"
            />
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 ${
              isRTL ? 'sm:flex-row-reverse' : ''
            }`}>
              {/* Results Count */}
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-gray-600">
                  {t('showing_results', { 
                    count: paginatedProperties.length,
                    total: filteredAndSortedProperties.length 
                  })}
                </p>
              </div>

              {/* Sort and View Controls */}
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* Sort Dropdown */}
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <label className="text-sm text-gray-600 whitespace-nowrap">
                    {t('sort_by')}:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-saffron focus:border-saffron"
                  >
                    {Object.entries(t.raw('sort_options')).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value as string}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid'
                        ? 'bg-saffron text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title={locale === 'ar' ? 'عرض الشبكة' : 'Grid View'}
                  >
                    <ViewColumnsIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list'
                        ? 'bg-saffron text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title={locale === 'ar' ? 'عرض القائمة' : 'List View'}
                  >
                    <ListBulletIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {paginatedProperties.length > 0 ? (
              <>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }>
                  {paginatedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                      showFavorite={true}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {/* Previous Button */}
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        {isRTL ? 'التالي' : 'Previous'}
                      </button>

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-saffron text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      {/* Next Button */}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        {isRTL ? 'السابق' : 'Next'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AdjustmentsHorizontalIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
                  {t('no_results')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('no_results_message')}
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-saffron text-white px-6 py-3 rounded-lg font-semibold hover:bg-saffron/90 transition-colors duration-200"
                >
                  {t('clear_filters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
