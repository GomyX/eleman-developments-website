'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ContactForm from '@/components/forms/ContactForm';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ContactClientProps {
  locale: string;
}

export default function ContactClient({ locale }: ContactClientProps) {
  const t = useTranslations('contact_page');
  const isRTL = locale === 'ar';

  const offices = [
    {
      key: 'main_office',
      icon: BuildingOfficeIcon,
      color: 'text-saffron bg-saffron/10'
    },
    {
      key: 'sheikh_zayed_office',
      icon: BuildingOfficeIcon,
      color: 'text-teal bg-teal/10'
    },
    {
      key: 'north_coast_office',
      icon: GlobeAltIcon,
      color: 'text-blue-500 bg-blue-50'
    }
  ];

  const quickContactMethods = [
    {
      key: 'whatsapp',
      icon: ChatBubbleLeftRightIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      action: () => {
        const message = encodeURIComponent(
          `${isRTL ? 'مرحباً، أود الاستفسار عن خدماتكم' : 'Hello, I would like to inquire about your services'}`
        );
        const phoneNumber = '+201234567890';
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      }
    },
    {
      key: 'call',
      icon: PhoneIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      action: () => {
        const phoneNumber = '+201234567890';
        window.open(`tel:${phoneNumber}`, '_self');
      }
    },
    {
      key: 'email',
      icon: EnvelopeIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      action: () => {
        const subject = encodeURIComponent(
          `${isRTL ? 'استفسار عن الخدمات' : 'Service Inquiry'}`
        );
        const body = encodeURIComponent(
          `${isRTL ? 'مرحباً،\n\nأود الاستفسار عن...' : 'Hello,\n\nI would like to inquire about...'}`
        );
        window.open(`mailto:info@elemangroup.com?subject=${subject}&body=${body}`, '_self');
      }
    },
    {
      key: 'visit',
      icon: MapPinIcon,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      action: () => {
        // Scroll to contact form
        const formElement = document.getElementById('contact-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  ];

  const faqQuestions = ['question1', 'question2', 'question3', 'question4', 'question5'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-teal via-blue-500 to-saffron text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero_title')}
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl mb-8 opacity-90 max-w-4xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero_description')}
            </motion.p>
          </div>
        </div>

        {/* Animated Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Quick Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('quick_contact.title')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {quickContactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.key}
                  variants={itemVariants}
                  className={`${method.bgColor} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  onClick={method.action}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`quick_contact.${method.key}.title`)}
                  </h3>
                  <p className={`text-gray-600 mb-4 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`quick_contact.${method.key}.description`)}
                  </p>
                  <button className="text-saffron font-semibold hover:text-saffron/80 transition-colors duration-200">
                    {t(`quick_contact.${method.key}.button`)}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Contact Form and Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Contact Form */}
          <div className="lg:col-span-2" id="contact-form">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className={`text-xl font-bold text-gray-900 mb-6 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {t('contact_info.title')}
              </h3>

              <div className="space-y-4">
                <div className={`flex items-start space-x-3 rtl:space-x-reverse ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <PhoneIcon className="w-5 h-5 text-saffron mt-1 flex-shrink-0" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="font-semibold text-gray-900">{t('contact_info.phone')}</p>
                    <p className="text-gray-600">+20 2 2615 3000</p>
                    <p className="text-gray-600">+20 100 123 4567</p>
                  </div>
                </div>

                <div className={`flex items-start space-x-3 rtl:space-x-reverse ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <EnvelopeIcon className="w-5 h-5 text-saffron mt-1 flex-shrink-0" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="font-semibold text-gray-900">{t('contact_info.email')}</p>
                    <p className="text-gray-600">info@elemangroup.com</p>
                    <p className="text-gray-600">sales@elemangroup.com</p>
                  </div>
                </div>

                <div className={`flex items-start space-x-3 rtl:space-x-reverse ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <ClockIcon className="w-5 h-5 text-saffron mt-1 flex-shrink-0" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="font-semibold text-gray-900">{t('contact_info.working_hours')}</p>
                    <p className="text-gray-600">
                      {locale === 'ar' ? 'الأحد - الخميس: 9:00 ص - 6:00 م' : 'Sunday - Thursday: 9:00 AM - 6:00 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className={`flex items-center space-x-3 rtl:space-x-reverse mb-3 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                <h4 className={`text-lg font-bold text-red-900 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
                  {t('emergency_contact.title')}
                </h4>
              </div>
              <p className={`text-red-800 mb-2 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {t('emergency_contact.description')}
              </p>
              <p className={`font-semibold text-red-900 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {t('emergency_contact.phone')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Office Locations Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('office_locations.title')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => {
              const IconComponent = office.icon;
              return (
                <motion.div
                  key={office.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 ${office.color} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-4 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`office_locations.${office.key}.title`)}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className={`flex items-start space-x-2 rtl:space-x-reverse ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <MapPinIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                      <p className={`text-gray-600 text-sm ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {t(`office_locations.${office.key}.address`)}
                      </p>
                    </div>
                    
                    <div className={`flex items-center space-x-2 rtl:space-x-reverse ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <PhoneIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        {t(`office_locations.${office.key}.phone`)}
                      </p>
                    </div>
                    
                    <div className={`flex items-start space-x-2 rtl:space-x-reverse ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <ClockIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                      <p className={`text-gray-600 text-sm ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {t(`office_locations.${office.key}.working_hours`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
        >
          <div className={`text-center mb-8 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('map.title')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          {/* Placeholder Map */}
          <div className="relative bg-gray-200 rounded-2xl h-96 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className={`text-gray-600 text-lg ${isRTL ? 'font-arabic' : 'font-latin'}`}>
                {locale === 'ar' ? 'خريطة تفاعلية قريباً' : 'Interactive Map Coming Soon'}
              </p>
              <div className="mt-4 space-x-4 rtl:space-x-reverse">
                <button className="bg-saffron text-white px-6 py-2 rounded-lg hover:bg-saffron/90 transition-colors duration-200">
                  {t('map.view_larger')}
                </button>
                <button className="border border-saffron text-saffron px-6 py-2 rounded-lg hover:bg-saffron/10 transition-colors duration-200">
                  {t('map.get_directions')}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-100 rounded-3xl p-8 md:p-12"
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('faq.title')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqQuestions.map((question, index) => (
              <motion.div
                key={question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className={`flex items-start space-x-4 rtl:space-x-reverse ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className="w-8 h-8 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-saffron" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h4 className={`text-lg font-bold text-gray-900 mb-3 ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {t(`faq.${question}.q`)}
                    </h4>
                    <p className={`text-gray-600 leading-relaxed ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {t(`faq.${question}.a`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

