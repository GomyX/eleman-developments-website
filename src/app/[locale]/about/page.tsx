import { Metadata } from 'next';
import AboutClient from './AboutClient';

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
      title: 'عن الإيمان | الإيمان للتطوير العقاري',
      description: 'تعرف على قصة الإيمان للتطوير العقاري، رؤيتنا، مهمتنا، وفريق القيادة. حيث يتشكل الإيمان - قصة نجاح مبنية على الثقة والجودة',
      keywords: 'عن الإيمان, التطوير العقاري, قصة الشركة, رؤية الإيمان, فريق القيادة, مصر',
      openGraph: {
        title: 'عن الإيمان | الإيمان للتطوير العقاري',
        description: 'تعرف على قصة الإيمان للتطوير العقاري ورؤيتنا في بناء مجتمعات متميزة',
        locale: 'ar_EG',
      },
    };
  }

  return {
    title: 'About El Eman | El Eman Developments',
    description: 'Learn about El Eman Developments story, our vision, mission, and leadership team. Where Belief Takes Shape - A success story built on trust and quality',
    keywords: 'about el eman, real estate development, company story, el eman vision, leadership team, egypt',
    openGraph: {
      title: 'About El Eman | El Eman Developments',
      description: 'Learn about El Eman Developments story and our vision in building exceptional communities',
      locale: 'en_US',
    },
  };
}

export default async function AboutPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  return <AboutClient locale={locale} />;
}
