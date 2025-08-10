import { Metadata } from 'next';
import InvestmentClient from './InvestmentClient';

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
      title: 'الاستثمار | الإيمان للتطوير العقاري',
      description: 'اكتشف فرص استثمارية متميزة في العقارات المصرية مع عوائد عالية وضمانات الجودة. حاسبة العائد على الاستثمار وخيارات التمويل الإسلامي',
      keywords: 'استثمار عقاري, عوائد استثمارية, تمويل إسلامي, عقارات مصر, الإيمان للتطوير',
      openGraph: {
        title: 'الاستثمار | الإيمان للتطوير العقاري',
        description: 'استثمر بذكاء في العقارات المصرية مع عوائد تصل إلى 18% سنوياً',
        locale: 'ar_EG',
      },
    };
  }

  return {
    title: 'Investment | El Eman Developments',
    description: 'Discover exceptional investment opportunities in Egyptian real estate with high returns and quality guarantees. ROI calculator and Islamic financing options',
    keywords: 'real estate investment, investment returns, islamic financing, egypt properties, el eman developments',
    openGraph: {
      title: 'Investment | El Eman Developments',
      description: 'Invest smartly in Egyptian real estate with returns up to 18% annually',
      locale: 'en_US',
    },
  };
}

export default async function InvestmentPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  return <InvestmentClient locale={locale} />;
}
