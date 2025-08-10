'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface LeadCaptureFormProps {
  propertyTitle: string;
  propertyId?: string;
  className?: string;
  onSubmit?: (formData: FormData) => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredTime: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function LeadCaptureForm({ 
  propertyTitle, 
  propertyId, 
  className = '',
  onSubmit 
}: LeadCaptureFormProps) {
  const locale = useLocale();
  const t = useTranslations('property_details.lead_form');
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredTime: 'morning'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = locale === 'ar' ? 'الاسم يجب أن يكون أكثر من حرفين' : 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = locale === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!/^(\+20|0)?1[0125]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = locale === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid Egyptian phone number';
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `${isRTL ? 'مرحباً، أريد الاستفسار عن' : 'Hello, I would like to inquire about'} ${propertyTitle}`
    );
    const phoneNumber = '+201234567890'; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    const phoneNumber = '+201234567890'; // Replace with actual phone number
    window.open(`tel:${phoneNumber}`, '_self');
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h3 className={`text-xl font-bold text-gray-900 mb-2 ${
          isRTL ? 'font-arabic' : 'font-latin'
        }`}>
          {locale === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Request Submitted Successfully!'}
        </h3>
        <p className="text-gray-600 mb-6">
          {locale === 'ar' 
            ? 'سيتواصل معك فريقنا خلال 24 ساعة لتأكيد موعد الزيارة'
            : 'Our team will contact you within 24 hours to confirm your visit'
          }
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              phone: '',
              email: '',
              message: '',
              preferredTime: 'morning'
            });
          }}
          className="text-saffron hover:text-saffron/80 font-semibold"
        >
          {locale === 'ar' ? 'إرسال طلب آخر' : 'Submit Another Request'}
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className={`text-center mb-6 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t('title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('subtitle')}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('name')} *
          </label>
          <div className="relative">
            <UserIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
              isRTL ? 'right-3' : 'left-3'
            }`} />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full border rounded-lg py-3 pr-10 pl-4 focus:ring-saffron focus:border-saffron ${
                isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'
              } ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={locale === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('phone')} *
          </label>
          <div className="relative">
            <PhoneIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
              isRTL ? 'right-3' : 'left-3'
            }`} />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full border rounded-lg py-3 pr-10 pl-4 focus:ring-saffron focus:border-saffron ${
                isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'
              } ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={locale === 'ar' ? '01xxxxxxxxx' : '01xxxxxxxxx'}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('email')}
          </label>
          <div className="relative">
            <EnvelopeIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
              isRTL ? 'right-3' : 'left-3'
            }`} />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full border rounded-lg py-3 pr-10 pl-4 focus:ring-saffron focus:border-saffron ${
                isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'
              } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={locale === 'ar' ? 'example@email.com' : 'example@email.com'}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Preferred Time */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('preferred_time')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['morning', 'afternoon', 'evening'].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleInputChange('preferredTime', time)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                  formData.preferredTime === time
                    ? 'border-saffron bg-saffron/5 text-saffron'
                    : 'border-gray-200 hover:border-saffron/50 text-gray-700'
                }`}
              >
                <ClockIcon className="w-4 h-4 mx-auto mb-1" />
                {t(time)}
              </button>
            ))}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('message')}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={3}
            className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron resize-none ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            placeholder={locale === 'ar' 
              ? 'أي استفسارات إضافية أو متطلبات خاصة...' 
              : 'Any additional questions or special requirements...'
            }
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-saffron text-white py-3 px-6 rounded-lg font-bold hover:bg-saffron/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{locale === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...'}</span>
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-5 h-5" />
              <span>{t('submit')}</span>
            </>
          )}
        </button>

        {/* Alternative Contact Methods */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className={`text-center text-sm text-gray-600 mb-4 ${
            isRTL ? 'font-arabic' : 'font-latin'
          }`}>
            {locale === 'ar' ? 'أو تواصل معنا مباشرة' : 'Or contact us directly'}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>{t('whatsapp')}</span>
            </button>
            <button
              type="button"
              onClick={handleCallClick}
              className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>{t('call_now')}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

