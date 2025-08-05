'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('projects'), href: `/${locale}/projects` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('investment'), href: `/${locale}/investment` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="bg-warm-gold text-white py-2 px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="hidden md:block">El Eman Developments</span>
              <span className="md:hidden">El Eman</span>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <a 
                href="tel:+201234567890" 
                className="flex items-center space-x-1 rtl:space-x-reverse hover:text-burnt-orange transition-colors"
              >
                <Phone size={14} />
                <span className="hidden sm:block">+20 123 456 7890</span>
              </a>
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 rtl:space-x-reverse hover:text-burnt-orange transition-colors"
              >
                <Globe size={14} />
                <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-warm-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">إ</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-pure-black">El Eman Developments</h1>
                <p className="text-xs text-charcoal">Where Belief Takes Shape</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'nav-link text-sm font-medium transition-colors duration-300',
                    isActive(item.href) && 'nav-link-active'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary text-sm"
              >
                {t('contact')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-warm-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-light-gray">
            <nav className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block py-2 text-base font-medium transition-colors duration-300',
                    isActive(item.href) 
                      ? 'text-warm-gold' 
                      : 'text-charcoal hover:text-warm-gold'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-light-gray">
                <Link
                  href={`/${locale}/contact`}
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}