'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UserGroupIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  SparklesIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

interface AboutClientProps {
  locale: string;
}

export default function AboutClient({ locale }: AboutClientProps) {
  const t = useTranslations('about_page');
  const isRTL = locale === 'ar';

  const stats = [
    { key: 'years_experience', value: '15+', icon: BuildingOfficeIcon },
    { key: 'completed_projects', value: '25+', icon: CheckCircleIcon },
    { key: 'satisfied_clients', value: '1000+', icon: UserGroupIcon },
    { key: 'awards_won', value: '8', icon: TrophyIcon },
  ];

  const values = [
    { key: 'belief', icon: HeartIcon, color: 'text-red-500 bg-red-50' },
    { key: 'quality', icon: ShieldCheckIcon, color: 'text-blue-500 bg-blue-50' },
    { key: 'trust', icon: CheckCircleIcon, color: 'text-green-500 bg-green-50' },
    { key: 'innovation', icon: LightBulbIcon, color: 'text-yellow-500 bg-yellow-50' },
    { key: 'sustainability', icon: GlobeAltIcon, color: 'text-teal-500 bg-teal-50' },
    { key: 'community', icon: UserGroupIcon, color: 'text-purple-500 bg-purple-50' },
  ];

  const leadership = [
    { key: 'ceo', image: '/images/team/ceo.jpg' },
    { key: 'coo', image: '/images/team/coo.jpg' },
    { key: 'cfo', image: '/images/team/cfo.jpg' },
  ];

  const achievements = ['award1', 'award2', 'award3', 'award4'];

  const qualityStandards = ['design', 'materials', 'construction', 'finishing'];

  const communityInitiatives = [
    { key: 'education', icon: AcademicCapIcon, color: 'text-blue-500 bg-blue-50' },
    { key: 'environment', icon: GlobeAltIcon, color: 'text-green-500 bg-green-50' },
    { key: 'employment', icon: UserGroupIcon, color: 'text-purple-500 bg-purple-50' },
    { key: 'charity', icon: HeartIcon, color: 'text-red-500 bg-red-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-saffron to-teal text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t('title')}
            </h1>
            <p 
              className="text-xl sm:text-2xl mb-8 opacity-90 max-w-4xl mx-auto"
            >
              {t('subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.key}
                  className="text-center"
                >
                  <div className="bg-white/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{t(stat.key)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Elements */}
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full"
        />
        <div
          className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full"
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Our Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={isRTL ? 'lg:order-2' : 'lg:order-1'}>
              <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-6 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {t('story_content.title')}
              </h2>
              <div className={`space-y-6 text-gray-700 ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                <p className="text-lg leading-relaxed">
                  {t('story_content.paragraph1')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('story_content.paragraph2')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('story_content.paragraph3')}
                </p>
              </div>
            </div>
            <div className={isRTL ? 'lg:order-1' : 'lg:order-2'}>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-saffron/20 to-teal/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-24 h-24 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-saffron">إ</span>
                    </div>
                    <p className="text-lg font-semibold">{t('our_story')}</p>
                  </div>
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-saffron rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <SparklesIcon className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vision & Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className={`flex items-center space-x-4 rtl:space-x-reverse mb-6 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="p-3 bg-saffron/10 rounded-xl">
                  <LightBulbIcon className="w-8 h-8 text-saffron" />
                </div>
                <h3 className={`text-2xl font-bold text-gray-900 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
                  {t('our_vision')}
                </h3>
              </div>
              <p className={`text-gray-700 leading-relaxed ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {t('vision_content.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className={`flex items-center space-x-4 rtl:space-x-reverse mb-6 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="p-3 bg-teal/10 rounded-xl">
                  <CheckCircleIcon className="w-8 h-8 text-teal" />
                </div>
                <h3 className={`text-2xl font-bold text-gray-900 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
                  {t('our_mission')}
                </h3>
              </div>
              <p className={`text-gray-700 leading-relaxed ${
                isRTL ? 'font-arabic text-right' : 'font-latin text-left'
              }`}>
                {t('mission_content.description')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('our_values')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`values_list.${value.key}.title`)}
                  </h3>
                  <p className={`text-gray-600 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`values_list.${value.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Leadership Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('leadership')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 bg-gradient-to-br from-saffron/20 to-teal/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserGroupIcon className="w-12 h-12 text-saffron" />
                    </div>
                    <p className="text-sm text-gray-600">{t(`leadership_team.${leader.key}.name`)}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`leadership_team.${leader.key}.name`)}
                  </h3>
                  <p className={`text-saffron font-semibold mb-3 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`leadership_team.${leader.key}.title`)}
                  </p>
                  <p className={`text-gray-600 text-sm ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`leadership_team.${leader.key}.bio`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('achievements')}
            </h2>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex items-start space-x-4 rtl:space-x-reverse ${
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-saffron/10 rounded-xl flex items-center justify-center">
                    <TrophyIcon className="w-6 h-6 text-saffron" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold text-gray-900 mb-2 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`achievements_list.${achievement}.title`)}
                  </h3>
                  <p className={`text-gray-600 ${
                    isRTL ? 'font-arabic text-right' : 'font-latin text-left'
                  }`}>
                    {t(`achievements_list.${achievement}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quality Standards Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('quality_standards')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {t('quality_standards_content.description')}
            </p>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-saffron/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-8 h-8 text-saffron" />
                </div>
                <h3 className={`text-lg font-bold text-gray-900 mb-3 ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
                  {t(`quality_standards_content.standards.${standard}.title`)}
                </h3>
                <p className={`text-gray-600 text-sm ${
                  isRTL ? 'font-arabic' : 'font-latin'
                }`}>
                  {t(`quality_standards_content.standards.${standard}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Responsibility Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-saffron/5 to-teal/5 rounded-3xl p-8 md:p-12"
        >
          <div className={`text-center mb-12 ${isRTL ? 'font-arabic' : 'font-latin'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('community_responsibility')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {t('community_content.description')}
            </p>
            <div className="w-24 h-1 bg-saffron mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityInitiatives.map((initiative, index) => {
              const IconComponent = initiative.icon;
              return (
                <motion.div
                  key={initiative.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 ${initiative.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`community_content.initiatives.${initiative.key}.title`)}
                  </h3>
                  <p className={`text-gray-600 ${
                    isRTL ? 'font-arabic' : 'font-latin'
                  }`}>
                    {t(`community_content.initiatives.${initiative.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
