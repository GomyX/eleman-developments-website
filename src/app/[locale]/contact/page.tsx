import { Metadata } from 'next';
import ContactClient from './ContactClient';

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
  try {
    const { locale } = await params;
    
    const metadata = {
      ar: {
        title: 'تواصل معنا | الإيمان للتطوير العقاري',
        description: 'تواصل مع فريق الإيمان للتطوير العقاري. نحن هنا لمساعدتك في العثور على العقار المثالي.',
        keywords: 'تواصل, الإيمان للتطوير, عقارات, القاهرة الجديدة, الشيخ زايد',
        openGraph: {
          title: 'تواصل معنا | الإيمان للتطوير العقاري',
          description: 'فريقنا المحترف جاهز لمساعدتك في كل خطوة من رحلة العقار الخاص بك',
          locale: 'ar_EG',
        },
      },
      en: {
        title: 'Contact Us | El Eman Developments',
        description: 'Get in touch with El Eman Developments team. We\'re here to help you find the perfect property.',
        keywords: 'contact, el eman developments, real estate, new cairo, sheikh zayed',
        openGraph: {
          title: 'Contact Us | El Eman Developments',
          description: 'Our professional team is ready to assist you at every step of your real estate journey',
          locale: 'en_US',
        },
      }
    };

    return metadata[locale as 'ar' | 'en'] || metadata.ar;
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return default Arabic metadata
    return {
      title: 'تواصل معنا | الإيمان للتطوير العقاري',
      description: 'تواصل مع فريق الإيمان للتطوير العقاري',
    };
  }
}

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  try {
    const { locale } = await params;
    
    // Validate locale before proceeding
    if (!['ar', 'en'].includes(locale)) {
      throw new Error(`Invalid locale: ${locale}`);
    }
    
    return <ContactClient locale={locale} />;
  } catch (error) {
    console.error('Error in ContactPage:', error);
    // Return a fallback or redirect
    return <ContactClient locale="ar" />; // Default to Arabic
  }
}

