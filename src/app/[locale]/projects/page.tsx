import { useLocale, useTranslations } from 'next-intl';
import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' }
  ];
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'ar') {
    return {
      title: 'مشاريعنا | الإيمان للتطوير العقاري',
      description: 'اكتشف مجموعة متنوعة من المشاريع العقارية المتميزة من الإيمان للتطوير العقاري في مصر',
      keywords: 'عقارات, مشاريع عقارية, القاهرة الجديدة, الشيخ زايد, أكتوبر, الساحل الشمالي',
      openGraph: {
        title: 'مشاريعنا | الإيمان للتطوير العقاري',
        description: 'اكتشف مجموعة متنوعة من المشاريع العقارية المتميزة',
        locale: 'ar_EG',
      },
    };
  }

  return {
    title: 'Our Projects | El Eman Developments',
    description: 'Discover a diverse range of exceptional real estate developments from El Eman Developments in Egypt',
    keywords: 'real estate, property developments, New Cairo, Sheikh Zayed, October, North Coast',
    openGraph: {
      title: 'Our Projects | El Eman Developments',
      description: 'Discover a diverse range of exceptional real estate developments',
      locale: 'en_US',
    },
  };
}

export default async function ProjectsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  return <ProjectsClient locale={locale} />;
}
