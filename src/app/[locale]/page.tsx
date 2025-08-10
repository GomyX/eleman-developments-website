import { useTranslations } from 'next-intl';
import HeroSection from '@/components/sections/HeroSection';
import PropertySearch from '@/components/search/PropertySearch';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { routing } from '@/lib/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

// Required for static site generation with dynamic routes
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      {/* Hero Section with El Eman branding */}
      <HeroSection />
      
      {/* Property Search */}
      <section className="py-12 bg-sand/20">
        <div className="container mx-auto px-4">
          <PropertySearch />
        </div>
      </section>
      
      {/* Featured Projects */}
      <FeaturedProjects />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}