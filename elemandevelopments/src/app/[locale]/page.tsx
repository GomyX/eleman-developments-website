import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Award, Users, Building } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import { formatPrice } from '@/lib/utils';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations('homepage');
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop"
            alt="El Eman Developments Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block">{t('hero.title')}</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal mt-2 text-warm-gold">
              {t('hero.subtitle')}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/${locale}/projects`} className="btn-primary text-lg px-8 py-4">
              {t('hero.cta.browseProjects')}
            </Link>
            <Link href={`/${locale}/contact`} className="btn-secondary text-lg px-8 py-4">
              {t('hero.cta.scheduleVisit')}
            </Link>
            <Link href="#" className="btn-ghost text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-pure-black">
              {t('hero.cta.downloadBrochure')}
            </Link>
            <Link href="#" className="btn-ghost text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-pure-black">
              {t('hero.cta.calculatePayment')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-4">
              {t('featuredProjects.title')}
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              {t('featuredProjects.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.name[locale]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-charcoal">
                      <span className="block">{project.totalUnits} {locale === 'ar' ? 'وحدة' : 'Units'}</span>
                      <span className="block">{project.projectArea.toLocaleString()} {locale === 'ar' ? 'م²' : 'm²'}</span>
                    </div>
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="btn-primary text-sm"
                    >
                      {t('featuredProjects.explore')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose El Eman Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-4">
              {t('whyChoose.title')}
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              {t('whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {t('whyChoose.features.trust.title')}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {t('whyChoose.features.trust.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {t('whyChoose.features.quality.title')}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {t('whyChoose.features.quality.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {t('whyChoose.features.heritage.title')}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {t('whyChoose.features.heritage.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="section-padding bg-warm-gold">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('successStories.title')}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {t('successStories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Cards */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center mr-3">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-pure-black">أحمد محمد</h4>
                  <p className="text-sm text-charcoal">عميل سابق</p>
                </div>
              </div>
              <p className="text-charcoal leading-relaxed">
                &ldquo;تجربة رائعة مع إيمان ديفلوبمنتس. الجودة والخدمة ممتازة، وأوصي بها بشدة.&rdquo;
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center mr-3">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-pure-black">سارة أحمد</h4>
                  <p className="text-sm text-charcoal">مستثمرة</p>
                </div>
              </div>
              <p className="text-charcoal leading-relaxed">
                &ldquo;استثمار ممتاز في مشاريع إيمان ديفلوبمنتس. العائد على الاستثمار يتجاوز التوقعات.&rdquo;
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center mr-3">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-pure-black">محمد علي</h4>
                  <p className="text-sm text-charcoal">مشتري منزل</p>
                </div>
              </div>
              <p className="text-charcoal leading-relaxed">
                &ldquo;منزلي الجديد في حدائق الزعفران يتجاوز كل توقعاتي. تصميم رائع وموقع مميز.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-2">
                {t('latestUpdates.title')}
              </h2>
              <p className="text-lg text-charcoal">
                {t('latestUpdates.subtitle')}
              </p>
            </div>
            <Link href="#" className="btn-secondary">
              {t('latestUpdates.viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Update Cards */}
            <div className="card p-6">
              <div className="w-full h-48 bg-warm-gold rounded-lg mb-4 flex items-center justify-center">
                <Building size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-2">
                {locale === 'ar' ? 'تقدم في بناء حدائق الزعفران' : 'Progress in Saffron Gardens Construction'}
              </h3>
              <p className="text-charcoal mb-4">
                {locale === 'ar' 
                  ? 'وصلت نسبة الإنجاز إلى 60% في مشروع حدائق الزعفران'
                  : 'Construction progress reached 60% in Saffron Gardens project'
                }
              </p>
              <span className="text-sm text-warm-gold font-medium">
                {locale === 'ar' ? 'منذ 3 أيام' : '3 days ago'}
              </span>
            </div>

            <div className="card p-6">
              <div className="w-full h-48 bg-warm-gold rounded-lg mb-4 flex items-center justify-center">
                <Award size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-2">
                {locale === 'ar' ? 'جائزة أفضل مطور عقاري' : 'Best Real Estate Developer Award'}
              </h3>
              <p className="text-charcoal mb-4">
                {locale === 'ar'
                  ? 'حصلت إيمان ديفلوبمنتس على جائزة أفضل مطور عقاري لعام 2024'
                  : 'El Eman Developments won the Best Real Estate Developer Award 2024'
                }
              </p>
              <span className="text-sm text-warm-gold font-medium">
                {locale === 'ar' ? 'منذ أسبوع' : '1 week ago'}
              </span>
            </div>

            <div className="card p-6">
              <div className="w-full h-48 bg-warm-gold rounded-lg mb-4 flex items-center justify-center">
                <Star size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-2">
                {locale === 'ar' ? 'افتتاح معرض جديد' : 'New Showroom Opening'}
              </h3>
              <p className="text-charcoal mb-4">
                {locale === 'ar'
                  ? 'افتتاح معرض إيمان ديفلوبمنتس الجديد في مدينة نصر'
                  : 'Opening of new El Eman Developments showroom in New Cairo'
                }
              </p>
              <span className="text-sm text-warm-gold font-medium">
                {locale === 'ar' ? 'منذ أسبوعين' : '2 weeks ago'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}