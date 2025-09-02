'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  HomeIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

// Proper social media icons (using proper SVGs for better SEO)
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.017 0C8.396 0 7.872.013 6.289.072 4.712.131 3.67.334 2.793.63c-.9.3-1.613.743-2.357 1.488C.33 2.464.087 3.126-.013 4.047-.111 5.04-.013 5.655.072 8.289.013 7.872 0 8.396 0 12.017c0 3.624.013 4.09.072 5.673.061 1.577.264 2.619.56 3.496.3.9.743 1.613 1.488 2.357 1.137.744 1.8.987 2.72 1.087.993.098 1.608 0 5.242 0h5.673c1.577-.061 2.619-.264 3.496-.56.9-.3 1.613-.743 2.357-1.488.744-1.137.987-1.8 1.087-2.72.098-.993 0-1.608 0-5.242v-5.673c-.061-1.577-.264-2.619-.56-3.496-.3-.9-.743-1.613-1.488-2.357C21.464.33 20.802.087 19.881-.013 18.888-.111 18.273-.013 15.639.072 14.128.013 13.652 0 12.017 0zm0 2.16c3.504 0 3.92.016 5.3.075 1.28.058 1.976.27 2.438.448.613.238 1.051.523 1.51.982.459.46.744.897.982 1.51.178.462.39 1.158.448 2.438.059 1.38.075 1.796.075 5.3 0 3.504-.016 3.92-.075 5.3-.058 1.28-.27 1.976-.448 2.438-.238.613-.523 1.051-.982 1.51-.46.459-.897.744-1.51.982-.462.178-1.158.39-2.438.448-1.38.059-1.796.075-5.3.075-3.504 0-3.92-.016-5.3-.075-1.28-.058-1.976-.27-2.438-.448-.613-.238-1.051-.523-1.51-.982-.459-.46-.744-.897-.982-1.51-.178-.462-.39-1.158-.448-2.438C2.176 15.937 2.16 15.521 2.16 12.017c0-3.504.016-3.92.075-5.3.058-1.28.27-1.976.448-2.438.238-.613.523-1.051.982-1.51.46-.459.897-.744 1.51-.982.462-.178 1.158-.39 2.438-.448 1.38-.059 1.796-.075 5.3-.075zm0 3.68c-3.65 0-6.607 2.958-6.607 6.607 0 3.65 2.958 6.607 6.607 6.607 3.65 0 6.607-2.958 6.607-6.607 0-3.65-2.958-6.607-6.607-6.607zm0 10.887c-2.366 0-4.28-1.914-4.28-4.28 0-2.366 1.914-4.28 4.28-4.28 2.366 0 4.28 1.914 4.28 4.28 0 2.366-1.914 4.28-4.28 4.28zm8.4-11.845c0 .853-.69 1.543-1.543 1.543-.853 0-1.543-.69-1.543-1.543 0-.853.69-1.543 1.543-1.543.853 0 1.543.69 1.543 1.543z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const navT = useTranslations('navigation');
  
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const quickLinks = [
    { key: 'home', href: '/', icon: HomeIcon },
    { key: 'projects', href: '/projects', icon: BuildingOfficeIcon },
    { key: 'about', href: '/about', icon: BuildingOfficeIcon },
    { key: 'investment', href: '/investment', icon: BanknotesIcon },
    { key: 'contact', href: '/contact', icon: PhoneIcon },
  ];

  const groupCompanies = [
    { name: t('contracting'), href: '#', description: 'El Eman Contracting - Premium Construction Services' },
    { name: t('capital'), href: '#', description: 'El Eman Capital - Investment and Finance Solutions' },
    { name: t('group'), href: '#', description: 'El Eman Group - Integrated Real Estate Solutions' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/elemangroup', 
      icon: FacebookIcon, 
      color: 'hover:bg-blue-600',
      ariaLabel: locale === 'ar' ? 'تابعنا على فيسبوك' : 'Follow us on Facebook'
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/elemangroup', 
      icon: InstagramIcon, 
      color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500',
      ariaLabel: locale === 'ar' ? 'تابعنا على إنستجرام' : 'Follow us on Instagram'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/elemangroup', 
      icon: LinkedInIcon, 
      color: 'hover:bg-blue-700',
      ariaLabel: locale === 'ar' ? 'تابعنا على لينكد إن' : 'Follow us on LinkedIn'
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/@elemangroup', 
      icon: YouTubeIcon, 
      color: 'hover:bg-red-600',
      ariaLabel: locale === 'ar' ? 'اشترك في قناتنا' : 'Subscribe to our channel'
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/201234567890', 
      icon: WhatsAppIcon, 
      color: 'hover:bg-green-500',
      ariaLabel: locale === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'
    },
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      label: t('phone'),
      value: '+20 123 456 7890',
      href: 'tel:+201234567890',
      itemProp: 'telephone'
    },
    {
      icon: EnvelopeIcon,
      label: t('email'),
      value: 'info@elemangroup.com',
      href: 'mailto:info@elemangroup.com',
      itemProp: 'email'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      label: t('whatsapp'),
      value: '+20 123 456 7890',
      href: 'https://wa.me/201234567890',
      itemProp: 'telephone'
    },
    {
      icon: MapPinIcon,
      label: t('address'),
      value: t('address_text'),
      href: 'https://maps.google.com/?q=New+Cairo+Egypt',
      itemProp: 'address'
    },
  ];

  return (
    <>
      {/* SEO Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": locale === 'ar' ? "الإيمان للتطوير العقاري" : "El Eman Developments",
            "alternateName": "El Eman Group",
            "url": "https://developments.elemangroup.com",
            "logo": "https://developments.elemangroup.com/images/brand/logo_svg_ar.svg",
            "description": locale === 'ar' 
              ? "الإيمان للتطوير العقاري - المطور العقاري الرائد في مصر. مشاريع فاخرة في القاهرة الجديدة والشيخ زايد والساحل الشمالي."
              : "El Eman Developments - Egypt's premier real estate developer. Luxury projects in New Cairo, Sheikh Zayed, and North Coast.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+20-123-456-7890",
              "contactType": "customer service",
              "email": "info@elemangroup.com",
              "availableLanguage": ["Arabic", "English"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "New Cairo",
              "addressLocality": "Cairo",
              "addressRegion": "Cairo Governorate",
              "postalCode": "11835",
              "addressCountry": "EG"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "30.0444",
              "longitude": "31.2357"
            },
            "sameAs": [
              "https://facebook.com/elemangroup",
              "https://instagram.com/elemangroup",
              "https://linkedin.com/company/elemangroup",
              "https://youtube.com/@elemangroup"
            ],
            "priceRange": "$$$$",
            "currenciesAccepted": "EGP",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "areaServed": {
              "@type": "Country",
              "name": "Egypt"
            }
          })
        }}
      />

      <footer 
        className="bg-black text-white relative overflow-hidden" 
        itemScope 
        itemType="https://schema.org/RealEstateAgent"
        role="contentinfo"
        aria-label={locale === 'ar' ? 'معلومات الشركة وروابط التواصل' : 'Company information and contact links'}
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sand/15 rounded-full blur-3xl"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <div className="relative">
                  <img 
                    src="/images/brand/logo_svg_ar.svg" 
                    alt={locale === 'ar' ? "شعار مجموعة الإيمان" : "El Eman Group Logo"}
                    className="h-20 w-auto brightness-0 invert filter drop-shadow-lg"
                    itemProp="logo"
                    width="80"
                    height="80"
                  />
                  {/* Brand glow effect */}
                  <div className="absolute inset-0 h-20 w-20 bg-primary/30 rounded-full blur-xl -z-10"></div>
                </div>
              </div>
              
              <div itemProp="description">
                <p className="text-gray-300 mb-8 leading-relaxed text-lg font-medium">
                  {t('description')}
                </p>
              </div>
              
              {/* Enhanced Social Media Links */}
              <div>
                <h4 className="font-bold text-xl mb-6 text-gradient bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  {t('follow_us')}
                </h4>
                <div className="flex space-x-3 rtl:space-x-reverse" role="list" aria-label={locale === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media Links'}>
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className={`group relative w-12 h-12 bg-gray-800 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center hover:bg-primary hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 ${social.color}`}
                        aria-label={social.ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="listitem"
                      >
                        <IconComponent />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <nav aria-label={locale === 'ar' ? 'روابط سريعة' : 'Quick Navigation'}>
              <h4 className="font-bold text-xl mb-6 text-gradient bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                {t('quick_links')}
              </h4>
              <ul className="space-y-4" role="list">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.key} role="listitem">
                      <Link
                        href={`/${locale}${link.href}`}
                        className="group text-gray-300 hover:text-white hover:text-primary transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse text-lg font-medium"
                        aria-label={navT(link.key)}
                      >
                        <IconComponent className="w-4 h-4 text-primary/60 group-hover:text-primary group-hover:scale-125 transition-all duration-300" />
                        <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
                          {navT(link.key)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* El Eman Group Ecosystem */}
            <div>
              <h4 className="font-bold text-xl mb-6 text-gradient bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                {t('el_eman_group')}
              </h4>
              <ul className="space-y-4" role="list">
                {groupCompanies.map((company, index) => (
                  <li key={index} role="listitem">
                    <a
                      href={company.href}
                      className="group text-gray-300 hover:text-white hover:text-primary transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse text-lg font-medium"
                      title={company.description}
                      aria-label={company.description}
                    >
                      <span className="w-2 h-2 bg-sand/60 rounded-full group-hover:bg-sand group-hover:scale-125 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
                        {company.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div itemScope itemType="https://schema.org/ContactPoint">
              <h4 className="font-bold text-xl mb-6 text-gradient bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                {t('contact_info')}
              </h4>
              <address className="not-italic">
                <ul className="space-y-6" role="list">
                  {contactInfo.map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <li key={index} role="listitem">
                        <a
                          href={contact.href}
                          className="group flex items-start space-x-4 rtl:space-x-reverse text-gray-300 hover:text-white transition-all duration-300"
                          itemProp={contact.itemProp}
                          aria-label={`${contact.label}: ${contact.value}`}
                        >
                          <div className="w-12 h-12 bg-gray-800 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25 flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                              {contact.label}
                            </div>
                            <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                              {contact.value}
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </address>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="relative border-t border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-sand/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-gray-400 text-lg font-medium" itemProp="copyrightHolder">
                © {currentYear} <span itemProp="name">{t('company_name')}</span>. {t('all_rights_reserved')}.
              </div>
              <nav aria-label={locale === 'ar' ? 'السياسات والشروط' : 'Legal Links'}>
                <div className="flex space-x-8 rtl:space-x-reverse">
                  <Link
                    href={`/${locale}/privacy` as any}
                    className="group text-gray-400 hover:text-white hover:text-primary transition-all duration-300 text-lg font-medium relative"
                    aria-label={t('privacy_policy')}
                  >
                    <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
                      {t('privacy_policy')}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-sand group-hover:w-full transition-all duration-500"></div>
                  </Link>
                  <Link
                    href={`/${locale}/terms` as any}
                    className="group text-gray-400 hover:text-white hover:text-primary transition-all duration-300 text-lg font-medium relative"
                    aria-label={t('terms_conditions')}
                  >
                    <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
                      {t('terms_conditions')}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-sand group-hover:w-full transition-all duration-500"></div>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}