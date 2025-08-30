'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const locale = useLocale();
  const t = useTranslations('contact_page.contact_form');
  const isRTL = locale === 'ar';

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      {/* Header */}
      <div className={`text-center mb-8 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {t('title')}
        </h3>
        <p className="text-gray-600 text-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* Contact Information Display */}
      <div className="text-center py-8">
        <p className={`text-gray-600 text-lg mb-6 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
          {t('contact_info_message') || (locale === 'ar' ? 'يمكنك التواصل معنا مباشرة من خلال المعلومات أدناه' : 'You can contact us directly using the information below')}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <PhoneIcon className="w-6 h-6 text-primary" />
            <span className="text-gray-700 font-medium">+965 123 456 789</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <EnvelopeIcon className="w-6 h-6 text-primary" />
            <span className="text-gray-700 font-medium">info@eleman.com</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary" />
            <span className="text-gray-700 font-medium">WhatsApp: +965 987 654 321</span>
          </div>
        </div>
      </div>
    </div>
  );
}

