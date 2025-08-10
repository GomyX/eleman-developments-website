'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, LanguageIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const isRTL = locale === 'ar';

  const navigationItems = [
    { key: 'home', href: '/' as const },
    { key: 'projects', href: '/projects' as const },
    { key: 'about', href: '/about' as const },
    { key: 'investment', href: '/investment' as const },
    { key: 'locations', href: '/locations' as const },
    { key: 'contact', href: '/contact' as const },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);

  const switchLanguage = (newLocale: string) => {
    // Create a URL with the new locale
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === locale) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    window.location.href = `/${segments.join('/')}`;
  };

  return (
    <nav className="bg-saffron shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${locale}` as any} className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-saffron font-bold text-xl">إ</span>
              </div>
              <div className="text-white">
                <div className="font-bold text-lg leading-tight">
                  {isRTL ? 'الإيمان للتطوير' : 'El Eman'}
                </div>
                <div className="text-sm opacity-90">
                  {isRTL ? 'العقاري' : 'Developments'}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}` as any}
                  className={`text-white hover:text-sand transition-colors duration-200 font-medium ${
                    pathname === `/${locale}${item.href}` ? 'text-sand border-b-2 border-sand' : ''
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 rtl:space-x-reverse text-white hover:text-sand transition-colors duration-200"
                aria-label="Change language"
              >
                <LanguageIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{locale.toUpperCase()}</span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className={`absolute top-full mt-2 bg-white rounded-md shadow-lg py-1 z-50 ${
                  isRTL ? 'left-0' : 'right-0'
                }`}>
                  <button
                    onClick={() => {
                      switchLanguage('ar');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sand transition-colors ${
                      locale === 'ar' ? 'bg-sand font-medium' : ''
                    }`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('en');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sand transition-colors ${
                      locale === 'en' ? 'bg-sand font-medium' : ''
                    }`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button - positioned for Arabic thumbs (right side) */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-sand transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-saffron border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}` as any}
                className={`block px-3 py-2 text-white hover:text-sand hover:bg-white/10 rounded-md transition-colors duration-200 font-medium ${
                  pathname === `/${locale}${item.href}` ? 'text-sand bg-white/10' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop for language menu */}
      {isLanguageMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageMenuOpen(false)}
        />
      )}
    </nav>
  );
}