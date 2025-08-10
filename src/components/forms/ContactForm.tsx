'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: string;
  contactTime: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const locale = useLocale();
  const t = useTranslations('contact_page.contact_form');
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'phone',
    contactTime: 'morning'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const subjects = ['general', 'property', 'investment', 'visit', 'financing', 'complaint'];
  const contactMethods = ['phone', 'email', 'whatsapp'];
  const contactTimes = ['morning', 'afternoon', 'evening'];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = locale === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = locale === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = locale === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid phone number';
    }

    if (!formData.subject) {
      newErrors.subject = locale === 'ar' ? 'الموضوع مطلوب' : 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = locale === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = locale === 'ar' ? 'الرسالة قصيرة جداً' : 'Message is too short';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'phone',
        contactTime: 'morning'
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3 rtl:space-x-reverse">
          <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
          <p className={`text-green-800 ${isRTL ? 'font-arabic text-right' : 'font-latin text-left'}`}>
            {t('success')}
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 rtl:space-x-reverse">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
          <p className={`text-red-800 ${isRTL ? 'font-arabic text-right' : 'font-latin text-left'}`}>
            {t('error')}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('name')} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
                isRTL ? 'right-3' : 'left-3'
              }`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t('name_placeholder')}
                className={`w-full border rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron transition-colors duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } ${isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'}`}
              />
            </div>
            {errors.name && (
              <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <EnvelopeIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
                isRTL ? 'right-3' : 'left-3'
              }`} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t('email_placeholder')}
                className={`w-full border rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron transition-colors duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } ${isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'}`}
              />
            </div>
            {errors.email && (
              <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone and Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Field */}
          <div>
            <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('phone')} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <PhoneIcon className={`absolute top-3 w-5 h-5 text-gray-400 ${
                isRTL ? 'right-3' : 'left-3'
              }`} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t('phone_placeholder')}
                className={`w-full border rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron transition-colors duration-200 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } ${isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-10 pr-4'}`}
              />
            </div>
            {errors.phone && (
              <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('subject')} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`w-full border rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron transition-colors duration-200 ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              } ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <option value="">{t('subject_placeholder')}</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {t(`subjects.${subject}`)}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className={`block text-sm font-semibold text-gray-700 mb-2 ${
            isRTL ? 'text-right' : 'text-left'
          }`}>
            {t('message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder={t('message_placeholder')}
            rows={5}
            className={`w-full border rounded-lg py-3 px-4 focus:ring-saffron focus:border-saffron transition-colors duration-200 resize-vertical ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } ${isRTL ? 'text-right' : 'text-left'}`}
          />
          {errors.message && (
            <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'text-right' : 'text-left'}`}>
              {errors.message}
            </p>
          )}
        </div>

        {/* Preferred Contact Method and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preferred Contact Method */}
          <div>
            <label className={`block text-sm font-semibold text-gray-700 mb-3 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('preferred_contact')}
            </label>
            <div className="space-y-2">
              {contactMethods.map((method) => (
                <label key={method} className={`flex items-center cursor-pointer ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={formData.preferredContact === method}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className="w-4 h-4 text-saffron border-gray-300 focus:ring-saffron"
                  />
                  <span className={`text-gray-700 ${
                    isRTL ? 'mr-3' : 'ml-3'
                  }`}>
                    {t(`contact_methods.${method}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Contact Time */}
          <div>
            <label className={`block text-sm font-semibold text-gray-700 mb-3 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('contact_time')}
            </label>
            <div className="space-y-2">
              {contactTimes.map((time) => (
                <label key={time} className={`flex items-center cursor-pointer ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <input
                    type="radio"
                    name="contactTime"
                    value={time}
                    checked={formData.contactTime === time}
                    onChange={(e) => handleInputChange('contactTime', e.target.value)}
                    className="w-4 h-4 text-saffron border-gray-300 focus:ring-saffron"
                  />
                  <span className={`text-gray-700 ${
                    isRTL ? 'mr-3' : 'ml-3'
                  }`}>
                    {t(`contact_times.${time}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-saffron text-white py-4 px-6 rounded-lg font-bold hover:bg-saffron/90 focus:ring-4 focus:ring-saffron/20 transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{t('sending')}</span>
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>{t('submit')}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

