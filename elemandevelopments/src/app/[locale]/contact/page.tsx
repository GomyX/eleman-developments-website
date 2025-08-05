import { getTranslations } from 'next-intl/server';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-warm-gold py-16">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-pure-black mb-6">
                {locale === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold"
                      placeholder={t('form.name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold"
                      placeholder={t('form.email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold"
                    placeholder={t('form.phone')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    {t('form.inquiryType')}
                  </label>
                  <select className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold">
                    <option value="">{locale === 'ar' ? 'اختر نوع الاستفسار' : 'Select inquiry type'}</option>
                    <option value="general">{locale === 'ar' ? 'استفسار عام' : 'General Inquiry'}</option>
                    <option value="project">{locale === 'ar' ? 'استفسار عن مشروع' : 'Project Inquiry'}</option>
                    <option value="investment">{locale === 'ar' ? 'استفسار استثماري' : 'Investment Inquiry'}</option>
                    <option value="visit">{locale === 'ar' ? 'حجز زيارة' : 'Schedule Visit'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold resize-none"
                    placeholder={t('form.message')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  {t('form.submit')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Locations */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-pure-black mb-6">
                  {locale === 'ar' ? 'مكاتبنا' : 'Our Offices'}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-pure-black mb-2">
                        {locale === 'ar' ? 'المكتب الرئيسي' : 'Main Office'}
                      </h4>
                      <p className="text-charcoal leading-relaxed">
                        {locale === 'ar' 
                          ? 'برج إيمان، شارع النيل، القاهرة الجديدة، مصر'
                          : 'El Eman Tower, Nile Street, New Cairo, Egypt'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-pure-black mb-2">
                        {locale === 'ar' ? 'معرض المشاريع' : 'Project Showroom'}
                      </h4>
                      <p className="text-charcoal leading-relaxed">
                        {locale === 'ar'
                          ? 'شارع التسعين، مدينة نصر الجديدة، القاهرة'
                          : '90th Street, New Cairo, Cairo'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-pure-black mb-6">
                  {t('info.address')}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Phone size={20} className="text-warm-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-pure-black">{t('info.phone')}</p>
                      <a href="tel:+201234567890" className="text-charcoal hover:text-warm-gold transition-colors">
                        +20 123 456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Mail size={20} className="text-warm-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-pure-black">{t('info.email')}</p>
                      <a href="mailto:info@elemandevelopments.com" className="text-charcoal hover:text-warm-gold transition-colors">
                        info@elemandevelopments.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Clock size={20} className="text-warm-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-pure-black">{t('info.workingHours')}</p>
                      <p className="text-charcoal">
                        {locale === 'ar' 
                          ? 'الأحد - الخميس: 9:00 ص - 6:00 م'
                          : 'Sunday - Thursday: 9:00 AM - 6:00 PM'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-warm-gold rounded-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  {locale === 'ar' ? 'للحالات العاجلة' : 'Emergency Contact'}
                </h3>
                <p className="mb-4">
                  {locale === 'ar'
                    ? 'للاستفسارات العاجلة، يمكنك الاتصال بنا على مدار الساعة'
                    : 'For urgent inquiries, you can contact us 24/7'
                  }
                </p>
                <a 
                  href="tel:+201234567890" 
                  className="inline-flex items-center bg-white text-warm-gold px-6 py-3 rounded-lg font-semibold hover:bg-burnt-orange hover:text-white transition-colors"
                >
                  <Phone size={20} className="mr-2" />
                  {locale === 'ar' ? 'اتصل الآن' : 'Call Now'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}