'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const navT = useTranslations('navigation');
  
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const quickLinks = [
    { key: 'home', href: '/' },
    { key: 'projects', href: '/projects' },
    { key: 'about', href: '/about' },
    { key: 'investment', href: '/investment' },
    { key: 'locations', href: '/locations' },
    { key: 'contact', href: '/contact' },
  ];

  const groupCompanies = [
    { name: t('contracting'), href: '#' },
    { name: t('capital'), href: '#' },
    { name: t('group'), href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'YouTube', href: '#', icon: '📺' },
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      label: t('phone'),
      value: '+20 123 456 7890',
      href: 'tel:+201234567890'
    },
    {
      icon: EnvelopeIcon,
      label: t('email'),
      value: 'info@elemangroup.com',
      href: 'mailto:info@elemangroup.com'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      label: t('whatsapp'),
      value: '+20 123 456 7890',
      href: 'https://wa.me/201234567890'
    },
    {
      icon: MapPinIcon,
      label: t('address'),
      value: t('address_text'),
      href: '#'
    },
  ];

  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <img 
                src="/images/brand/logo_png.png" 
                alt="El Eman Group Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              {t('description')}
            </p>
            
            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold mb-3">{t('follow_us')}</h4>
              <div className="flex space-x-3 rtl:space-x-reverse">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <span className="text-sm">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('quick_links')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors duration-200"
                  >
                    {navT(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* El Eman Group Ecosystem */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('el_eman_group')}</h4>
            <ul className="space-y-2">
              {groupCompanies.map((company, index) => (
                <li key={index}>
                  <a
                    href={company.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors duration-200"
                  >
                    {company.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('contact_info')}</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <li key={index}>
                    <a
                      href={contact.href}
                      className="flex items-start space-x-3 rtl:space-x-reverse text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors duration-200"
                    >
                      <IconComponent className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{contact.label}</div>
                        <div>{contact.value}</div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-80">
              © {currentYear} {t('company_name')}. {t('all_rights_reserved')}.
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <Link
                href={`/${locale}/privacy` as any}
                className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors duration-200"
              >
                {t('privacy_policy')}
              </Link>
              <Link
                href={`/${locale}/terms` as any}
                className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors duration-200"
              >
                {t('terms_conditions')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}