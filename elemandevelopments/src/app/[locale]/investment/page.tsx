import { getTranslations } from 'next-intl/server';
import { TrendingUp, DollarSign, BarChart3, Target, Users, Building } from 'lucide-react';

interface InvestmentPageProps {
  params: Promise<{ locale: string }>;
}

export default async function InvestmentPage({ params }: InvestmentPageProps) {
  const { locale } = await params;
  const t = await getTranslations('navigation');

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-warm-gold py-16">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('investment')}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'فرص استثمارية مميزة في العقارات الفاخرة مع عوائد مرتفعة'
                : 'Distinguished investment opportunities in luxury real estate with high returns'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Investment Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-6">
                {locale === 'ar' ? 'لماذا تستثمر مع إيمان ديفلوبمنتس؟' : 'Why Invest with El Eman Developments?'}
              </h2>
              <div className="space-y-4 text-charcoal leading-relaxed">
                <p>
                  {locale === 'ar'
                    ? 'نقدم فرص استثمارية فريدة في سوق العقارات المصري، مع ضمان عوائد مرتفعة ومخاطر منخفضة. خبرتنا التي تمتد لأكثر من 30 عاماً في السوق المصري تجعلنا الخيار الأمثل للمستثمرين.'
                    : 'We offer unique investment opportunities in the Egyptian real estate market, with guaranteed high returns and low risks. Our 30+ years of experience in the Egyptian market makes us the ideal choice for investors.'
                  }
                </p>
                <p>
                  {locale === 'ar'
                    ? 'نحرص على اختيار أفضل المواقع وأكثرها نمواً، مع تطوير مشاريع عالية الجودة تضمن زيادة قيمة الاستثمار مع مرور الوقت.'
                    : 'We carefully select the best and most growing locations, developing high-quality projects that ensure increased investment value over time.'
                  }
                </p>
              </div>
            </div>
            <div className="bg-off-white rounded-xl p-8">
              <h3 className="text-2xl font-bold text-pure-black mb-6">
                {locale === 'ar' ? 'مزايا الاستثمار' : 'Investment Benefits'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-warm-gold rounded-full flex items-center justify-center">
                    <TrendingUp size={16} className="text-white" />
                  </div>
                  <span className="text-charcoal">
                    {locale === 'ar' ? 'عوائد مرتفعة تصل إلى 25% سنوياً' : 'High returns up to 25% annually'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-warm-gold rounded-full flex items-center justify-center">
                    <Target size={16} className="text-white" />
                  </div>
                  <span className="text-charcoal">
                    {locale === 'ar' ? 'مواقع استراتيجية في أفضل المناطق' : 'Strategic locations in the best areas'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-warm-gold rounded-full flex items-center justify-center">
                    <Building size={16} className="text-white" />
                  </div>
                  <span className="text-charcoal">
                    {locale === 'ar' ? 'جودة عالية في البناء والتشطيبات' : 'High quality in construction and finishing'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-warm-gold rounded-full flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <span className="text-charcoal">
                    {locale === 'ar' ? 'فريق متخصص في إدارة الاستثمارات' : 'Specialized team in investment management'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-4">
              {locale === 'ar' ? 'فرص الاستثمار الحالية' : 'Current Investment Opportunities'}
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'اكتشف مشاريعنا الاستثمارية المميزة مع عوائد مرتفعة'
                : 'Discover our distinguished investment projects with high returns'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Investment Project 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mb-4">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'حدائق الزعفران' : 'Saffron Gardens'}
              </h3>
              <div className="space-y-2 text-sm text-charcoal mb-4">
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'الموقع:' : 'Location:'}</span>
                  <span className="font-medium">{locale === 'ar' ? 'مدينة نصر الجديدة' : 'New Cairo'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'نوع الاستثمار:' : 'Investment Type:'}</span>
                  <span className="font-medium">{locale === 'ar' ? 'وحدات سكنية' : 'Residential Units'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'العائد المتوقع:' : 'Expected Return:'}</span>
                  <span className="font-medium text-green-600">25% سنوياً</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'مدة الاستثمار:' : 'Investment Period:'}</span>
                  <span className="font-medium">3-5 سنوات</span>
                </div>
              </div>
              <button className="btn-primary w-full">
                {locale === 'ar' ? 'استثمر الآن' : 'Invest Now'}
              </button>
            </div>

            {/* Investment Project 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mb-4">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'منتجع الرمال الذهبية' : 'Golden Sands Resort'}
              </h3>
              <div className="space-y-2 text-sm text-charcoal mb-4">
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'الموقع:' : 'Location:'}</span>
                  <span className="font-medium">{locale === 'ar' ? 'الساحل الشمالي' : 'North Coast'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'نوع الاستثمار:' : 'Investment Type:'}</span>
                  <span className="font-medium">{locale === 'ar' ? 'فيلات وشاليهات' : 'Villas & Chalets'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'العائد المتوقع:' : 'Expected Return:'}</span>
                  <span className="font-medium text-green-600">30% سنوياً</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'مدة الاستثمار:' : 'Investment Period:'}</span>
                  <span className="font-medium">4-6 سنوات</span>
                </div>
              </div>
              <button className="btn-primary w-full">
                {locale === 'ar' ? 'استثمر الآن' : 'Invest Now'}
              </button>
            </div>

            {/* Investment Project 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mb-4">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'مرتفعات الزمرد' : 'Emerald Heights'}
              </h3>
              <div className="space-y-2 text-sm text-charcoal mb-4">
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'الموقع:' : 'Location:'}</span>
                  <span className="font-medium">{locale === 'ar' ? 'الشيخ زايد' : 'Sheikh Zayed'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'نوع الاستثمار:' : 'Investment Type:'}</span>
                  <span className="font-medium">{locale === 'ar' ? 'أبراج سكنية' : 'Residential Towers'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'العائد المتوقع:' : 'Expected Return:'}</span>
                  <span className="font-medium text-green-600">22% سنوياً</span>
                </div>
                <div className="flex justify-between">
                  <span>{locale === 'ar' ? 'مدة الاستثمار:' : 'Investment Period:'}</span>
                  <span className="font-medium">2-4 سنوات</span>
                </div>
              </div>
              <button className="btn-primary w-full">
                {locale === 'ar' ? 'استثمر الآن' : 'Invest Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-4">
              {locale === 'ar' ? 'تحليل السوق' : 'Market Analysis'}
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'فهم السوق المصري وفرص النمو المستقبلية'
                : 'Understanding the Egyptian market and future growth opportunities'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-2">
                {locale === 'ar' ? 'نمو السوق' : 'Market Growth'}
              </h3>
              <p className="text-3xl font-bold text-warm-gold mb-2">15%</p>
              <p className="text-charcoal text-sm">
                {locale === 'ar' ? 'معدل النمو السنوي' : 'Annual Growth Rate'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-2">
                {locale === 'ar' ? 'قيمة السوق' : 'Market Value'}
              </h3>
              <p className="text-3xl font-bold text-warm-gold mb-2">$50B</p>
              <p className="text-charcoal text-sm">
                {locale === 'ar' ? 'إجمالي قيمة السوق' : 'Total Market Value'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-2">
                {locale === 'ar' ? 'العائد المتوسط' : 'Average Return'}
              </h3>
              <p className="text-3xl font-bold text-warm-gold mb-2">25%</p>
              <p className="text-charcoal text-sm">
                {locale === 'ar' ? 'العائد السنوي المتوسط' : 'Average Annual Return'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-2">
                {locale === 'ar' ? 'الطلب' : 'Demand'}
              </h3>
              <p className="text-3xl font-bold text-warm-gold mb-2">+20%</p>
              <p className="text-charcoal text-sm">
                {locale === 'ar' ? 'زيادة في الطلب' : 'Increase in Demand'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="section-padding bg-warm-gold">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'ar' ? 'حاسبة الاستثمار' : 'Investment Calculator'}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'احسب عائد استثمارك المتوقع'
                : 'Calculate your expected investment return'
              }
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {locale === 'ar' ? 'مبلغ الاستثمار' : 'Investment Amount'}
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold"
                  placeholder="1,000,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {locale === 'ar' ? 'مدة الاستثمار (سنوات)' : 'Investment Period (Years)'}
                </label>
                <select className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-warm-gold">
                  <option value="3">3 {locale === 'ar' ? 'سنوات' : 'Years'}</option>
                  <option value="5">5 {locale === 'ar' ? 'سنوات' : 'Years'}</option>
                  <option value="7">7 {locale === 'ar' ? 'سنوات' : 'Years'}</option>
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-off-white rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-charcoal">{locale === 'ar' ? 'العائد المتوقع' : 'Expected Return'}</p>
                  <p className="text-2xl font-bold text-warm-gold">2,500,000 EGP</p>
                </div>
                <div>
                  <p className="text-sm text-charcoal">{locale === 'ar' ? 'العائد السنوي' : 'Annual Return'}</p>
                  <p className="text-2xl font-bold text-warm-gold">25%</p>
                </div>
              </div>
            </div>

            <button className="btn-primary w-full mt-6">
              {locale === 'ar' ? 'احسب الاستثمار' : 'Calculate Investment'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}