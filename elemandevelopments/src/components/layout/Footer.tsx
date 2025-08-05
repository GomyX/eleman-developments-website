'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('contact');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-charcoal text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-warm-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">إ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">El Eman Developments</h3>
                <p className="text-sm text-light-gray">Where Belief Takes Shape</p>
              </div>
            </div>
            <p className="text-sm text-light-gray leading-relaxed">
              {locale === 'ar' 
                ? 'جزء من مجموعة إيمان العريقة، نطور مشاريع سكنية فاخرة تجمع بين الأناقة والراحة في أفضل المواقع المميزة.'
                : 'Part of the prestigious El Eman Group, we develop luxury residential projects that combine elegance and comfort in the most distinguished locations.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-warm-gold">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-light-gray hover:text-warm-gold transition-colors text-sm">
                  {locale === 'ar' ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`} className="text-light-gray hover:text-warm-gold transition-colors text-sm">
                  {locale === 'ar' ? 'المشاريع' : 'Projects'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-light-gray hover:text-warm-gold transition-colors text-sm">
                  {locale === 'ar' ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/investment`} className="text-light-gray hover:text-warm-gold transition-colors text-sm">
                  {locale === 'ar' ? 'الاستثمار' : 'Investment'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-light-gray hover:text-warm-gold transition-colors text-sm">
                  {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-warm-gold">
              {t('title')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin size={16} className="text-warm-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-light-gray">
                    {locale === 'ar' 
                      ? 'برج إيمان، شارع النيل، القاهرة الجديدة، مصر'
                      : 'El Eman Tower, Nile Street, New Cairo, Egypt'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone size={16} className="text-warm-gold flex-shrink-0" />
                <a href="tel:+201234567890" className="text-sm text-light-gray hover:text-warm-gold transition-colors">
                  +20 123 456 7890
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail size={16} className="text-warm-gold flex-shrink-0" />
                <a href="mailto:info@elemandevelopments.com" className="text-sm text-light-gray hover:text-warm-gold transition-colors">
                  info@elemandevelopments.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-warm-gold">
              {locale === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h4>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="w-10 h-10 bg-warm-gold rounded-full flex items-center justify-center hover:bg-burnt-orange transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-warm-gold rounded-full flex items-center justify-center hover:bg-burnt-orange transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-warm-gold rounded-full flex items-center justify-center hover:bg-burnt-orange transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-warm-gold rounded-full flex items-center justify-center hover:bg-burnt-orange transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
            <div className="pt-4">
              <h5 className="font-medium text-sm mb-2">
                {locale === 'ar' ? 'النشرة الإخبارية' : 'Newsletter'}
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder={locale === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                  className="flex-1 px-3 py-2 text-sm bg-dark-gray border border-light-gray rounded-r-lg rtl:rounded-l-lg rtl:rounded-r-none focus:outline-none focus:border-warm-gold text-white placeholder-light-gray"
                />
                <button className="px-4 py-2 bg-warm-gold text-white text-sm font-medium rounded-l-lg rtl:rounded-r-lg rtl:rounded-l-none hover:bg-burnt-orange transition-colors">
                  {locale === 'ar' ? 'اشترك' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-gray py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-light-gray">
              <p>
                © {currentYear} El Eman Developments. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
              </p>
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse text-sm text-light-gray">
              <Link href="#" className="hover:text-warm-gold transition-colors">
                {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
              <Link href="#" className="hover:text-warm-gold transition-colors">
                {locale === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}
              </Link>
              <Link href="#" className="hover:text-warm-gold transition-colors">
                {locale === 'ar' ? 'خريطة الموقع' : 'Sitemap'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}