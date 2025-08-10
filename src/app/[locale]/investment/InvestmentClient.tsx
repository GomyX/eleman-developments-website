'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ROICalculator from '@/components/forms/ROICalculator';
import {
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  HomeIcon,
  GlobeAltIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CreditCardIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface InvestmentClientProps {
  locale: string;
}

export default function InvestmentClient({ locale }: InvestmentClientProps) {
  const t = useTranslations('investment_page');
  const isRTL = locale === 'ar';

  const whyInvestReasons = [
    { key: 'stable_market', icon: ArrowTrendingUpIcon, color: 'text-green-500 bg-green-50' },
    { key: 'high_returns', icon: CurrencyDollarIcon, color: 'text-blue-500 bg-blue-50' },
    { key: 'prime_locations', icon: MapPinIcon, color: 'text-red-500 bg-red-50' },
    { key: 'guaranteed_quality', icon: ShieldCheckIcon, color: 'text-purple-500 bg-purple-50' },
    { key: 'flexible_payment', icon: CalendarIcon, color: 'text-yellow-500 bg-yellow-50' },
    { key: 'expert_management', icon: UserGroupIcon, color: 'text-indigo-500 bg-indigo-50' },
  ];

  const investmentTypes = [
    { 
      key: 'residential', 
      icon: HomeIcon, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      key: 'commercial', 
      icon: BuildingOfficeIcon, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      key: 'land', 
      icon: GlobeAltIcon, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  const paymentPlans = [
    { key: 'cash_payment', icon: BanknotesIcon, highlight: true },
    { key: 'installments_2_years', icon: CalendarIcon },
    { key: 'installments_3_years', icon: CalendarIcon },
    { key: 'installments_5_years', icon: CalendarIcon },
  ];

  const banks = ['nbe', 'cib', 'banque_misr', 'alex_bank', 'faisal_bank'];

  const islamicFinancing = [
    { key: 'murabaha', icon: DocumentTextIcon },
    { key: 'ijara', icon: CreditCardIcon },
    { key: 'musharaka', icon: UserGroupIcon },
  ];

  const investmentSteps = [
    { key: 'step1', icon: PhoneIcon, color: 'text-blue-500' },
    { key: 'step2', icon: HomeIcon, color: 'text-green-500' },
    { key: 'step3', icon: BanknotesIcon, color: 'text-purple-500' },
    { key: 'step4', icon: ArrowTrendingUpIcon, color: 'text-orange-500' },
  ];

  const testimonials = ['testimonial1', 'testimonial2', 'testimonial3'];

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

  const handleContactAdvisor = () => {
    const message = encodeURIComponent(
      `${isRTL ? 'مرحباً، أريد استشارة حول الفرص الاستثمارية' : 'Hello, I would like consultation about investment opportunities'}`
    );
    const phoneNumber = '+201234567890';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCallNow = () => {
    const phoneNumber = '+201234567890';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleDownloadGuide = () => {
    alert(locale === 'ar' ? 'سيتم تحميل دليل الاستثمار قريباً' : 'Investment guide download coming soon');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-saffron via-orange-500 to-teal text-white py-20 overflow-hidden"
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
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                onClick={handleContactAdvisor}
                className="bg-white text-saffron px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>{t('contact_advisor')}</span>
              </button>
              <button
                onClick={handleDownloadGuide}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-saffron transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                <span>{t('download_guide')}</span>
              </button>
            </motion.div>
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
        {/* Why Invest Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('why_invest')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyInvestReasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={reason.key}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 ${reason.color} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`why_invest_reasons.${reason.key}.title`)}
                  </h3>
                  <p className={`text-gray-600 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`why_invest_reasons.${reason.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Investment Types Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('investment_opportunities')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <motion.div
                  key={type.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`${type.bgColor} rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`investment_types.${type.key}.title`)}
                  </h3>
                  <p className={`text-gray-700 mb-6 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`investment_types.${type.key}.description`)}
                  </p>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <span className="text-sm text-gray-600">
                        {locale === 'ar' ? 'العائد المتوقع:' : 'Expected ROI:'}
                      </span>
                      <span className="font-bold text-green-600">
                        {t(`investment_types.${type.key}.roi_range`)}
                      </span>
                    </div>
                    <div className={`flex justify-between items-center ${
                      isRTL ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <span className="text-sm text-gray-600">
                        {locale === 'ar' ? 'أقل استثمار:' : 'Min Investment:'}
                      </span>
                      <span className="font-bold text-saffron">
                        {t(`investment_types.${type.key}.min_investment`)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ROI Calculator Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('roi_calculator')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <ROICalculator />
          </div>
        </motion.section>

        {/* Payment Plans Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('payment_plans.title')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl border-2 text-center hover:shadow-lg transition-all duration-300 ${
                    plan.highlight 
                      ? 'border-saffron bg-saffron/5' 
                      : 'border-gray-200 hover:border-saffron/50'
                  }`}
                >
                  <IconComponent className={`w-12 h-12 mx-auto mb-4 ${
                    plan.highlight ? 'text-saffron' : 'text-gray-600'
                  }`} />
                  <h3 className={`text-lg font-bold text-gray-900 mb-2 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`payment_plans.${plan.key}.title`)}
                  </h3>
                  {plan.key === 'cash_payment' ? (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {t(`payment_plans.${plan.key}.discount`)}
                    </div>
                  ) : (
                    <div className="text-saffron font-semibold mb-2">
                      {t(`payment_plans.${plan.key}.down_payment`)}
                    </div>
                  )}
                  <p className={`text-gray-600 text-sm ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`payment_plans.${plan.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Banking Partnerships Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('financing_partners.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {t('financing_partners.description')}
            </p>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {banks.map((bank, index) => (
              <motion.div
                key={bank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BanknotesIcon className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className={`text-sm font-semibold text-gray-900 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
                  {t(`financing_partners.banks.${bank}`)}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Islamic Financing Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-teal/5 to-green/5 rounded-3xl p-8 md:p-12"
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('islamic_financing_details.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {t('islamic_financing_details.description')}
            </p>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {islamicFinancing.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={option.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-teal" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`islamic_financing_details.${option.key}.title`)}
                  </h3>
                  <p className={`text-gray-600 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`islamic_financing_details.${option.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Investment Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('investment_process.title')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investmentSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto border-4 border-gray-100`}>
                      <IconComponent className={`w-10 h-10 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-saffron rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`investment_process.${step.key}.title`)}
                  </h3>
                  <p className={`text-gray-600 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`investment_process.${step.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`text-gray-700 mb-6 italic ${
                  isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                }`}>
                  "{t(`testimonials.${testimonial}.text`)}"
                </p>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                    <UserGroupIcon className="w-6 h-6 text-saffron" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h4 className={`font-bold text-gray-900 ${
                      isRTL ? 'font-arabic' : 'font-latin'
                    }`}>
                      {t(`testimonials.${testimonial}.name`)}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t(`testimonials.${testimonial}.role`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-saffron to-teal rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
            isRTL ? 'font-arabic' : 'font-latin'
          }`}>
            {t('cta.title')}
          </h2>
          <p className={`text-xl mb-8 opacity-90 max-w-3xl mx-auto ${
            isRTL ? 'font-arabic' : 'font-latin'
          }`}>
            {t('cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleContactAdvisor}
              className="bg-white text-saffron px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>{t('cta.schedule_meeting')}</span>
            </button>
            <button
              onClick={handleCallNow}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-saffron transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>{t('cta.call_now')}</span>
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
