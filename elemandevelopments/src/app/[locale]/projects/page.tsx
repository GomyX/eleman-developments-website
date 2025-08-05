import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, MapPin, Building, Calendar } from 'lucide-react';
import { getAllProjects } from '@/data/projects';
import { formatPrice, formatDate } from '@/lib/utils';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-warm-gold py-16">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-light-gray">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal" size={20} />
                <input
                  type="text"
                  placeholder={t('filters.search')}
                  className="w-full pl-10 pr-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary text-sm">
                <Filter size={16} className="mr-2" />
                {t('filters.location')}
              </button>
              <button className="btn-secondary text-sm">
                <Building size={16} className="mr-2" />
                {t('filters.propertyType')}
              </button>
              <button className="btn-secondary text-sm">
                <MapPin size={16} className="mr-2" />
                {t('filters.priceRange')}
              </button>
              <button className="btn-secondary text-sm">
                <Calendar size={16} className="mr-2" />
                {t('filters.deliveryDate')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.name[locale]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'ready-for-delivery' 
                        ? 'bg-green-500 text-white' 
                        : project.status === 'under-construction'
                        ? 'bg-orange-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {project.status === 'ready-for-delivery' 
                        ? (locale === 'ar' ? 'جاهز للتسليم' : 'Ready for Delivery')
                        : project.status === 'under-construction'
                        ? (locale === 'ar' ? 'قيد الإنشاء' : 'Under Construction')
                        : (locale === 'ar' ? 'في التخطيط' : 'Planning')
                      }
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{project.name[locale]}</h3>
                    <p className="text-sm opacity-90">{project.location[locale]}</p>
                    <p className="text-lg font-semibold text-warm-gold mt-2">
                      {formatPrice(project.startingPrice, 'EGP')}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-charcoal mb-4 line-clamp-3">
                    {project.shortDescription[locale]}
                  </p>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="text-charcoal">
                      <span className="block font-medium">{locale === 'ar' ? 'إجمالي الوحدات' : 'Total Units'}</span>
                      <span className="text-warm-gold font-semibold">{project.totalUnits}</span>
                    </div>
                    <div className="text-charcoal">
                      <span className="block font-medium">{locale === 'ar' ? 'مساحة المشروع' : 'Project Area'}</span>
                      <span className="text-warm-gold font-semibold">{project.projectArea.toLocaleString()} {locale === 'ar' ? 'م²' : 'm²'}</span>
                    </div>
                    <div className="text-charcoal">
                      <span className="block font-medium">{locale === 'ar' ? 'تاريخ التسليم' : 'Delivery Date'}</span>
                      <span className="text-warm-gold font-semibold">{formatDate(project.deliveryDate, locale)}</span>
                    </div>
                    <div className="text-charcoal">
                      <span className="block font-medium">{locale === 'ar' ? 'يبدأ من' : 'Starting from'}</span>
                      <span className="text-warm-gold font-semibold">{formatPrice(project.startingPrice, 'EGP')}</span>
                    </div>
                  </div>

                  {/* Unit Types Preview */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-charcoal mb-2">
                      {locale === 'ar' ? 'أنواع الوحدات' : 'Unit Types'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.unitTypes.slice(0, 3).map((unit, index) => (
                        <span key={index} className="px-2 py-1 bg-light-gray text-charcoal text-xs rounded">
                          {unit.type}
                        </span>
                      ))}
                      {project.unitTypes.length > 3 && (
                        <span className="px-2 py-1 bg-warm-gold text-white text-xs rounded">
                          +{project.unitTypes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="btn-primary flex-1 text-center"
                    >
                      {locale === 'ar' ? 'استكشف المشروع' : 'Explore Project'}
                    </Link>
                    <Link
                      href={`/${locale}/contact`}
                      className="btn-secondary text-center px-4"
                    >
                      {locale === 'ar' ? 'احجز زيارة' : 'Schedule Visit'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}