import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Award, Users, Building, Target, Heart, Star } from 'lucide-react';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations('navigation');

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-warm-gold py-16">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('about')}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'جزء من مجموعة إيمان العريقة، نطور مشاريع سكنية فاخرة تجمع بين الأناقة والراحة'
                : 'Part of the prestigious El Eman Group, we develop luxury residential projects that combine elegance and comfort'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-6">
                {locale === 'ar' ? 'قصتنا' : 'Our Story'}
              </h2>
              <div className="space-y-4 text-charcoal leading-relaxed">
                <p>
                  {locale === 'ar'
                    ? 'تأسست إيمان ديفلوبمنتس كجزء من مجموعة إيمان العريقة في عام 1990، وبدأت رحلتها في تطوير العقارات الفاخرة في مصر. على مدار أكثر من 30 عاماً، اكتسبنا سمعة طيبة في تقديم مشاريع سكنية عالية الجودة تجمع بين الأناقة المعمارية والراحة العائلية.'
                    : 'El Eman Developments was established as part of the prestigious El Eman Group in 1990, beginning its journey in luxury real estate development in Egypt. Over more than 30 years, we have built a reputation for delivering high-quality residential projects that combine architectural elegance with family comfort.'
                  }
                </p>
                <p>
                  {locale === 'ar'
                    ? 'نؤمن بأن المنزل ليس مجرد مكان للعيش، بل هو مساحة تعكس هوية العائلة وأحلامها. لذلك نحرص على تطوير مشاريعنا بأعلى معايير الجودة والتصميم، مع التركيز على التفاصيل التي تجعل كل منزل مكاناً مثالياً للعائلة.'
                    : 'We believe that a home is not just a place to live, but a space that reflects the family\'s identity and dreams. Therefore, we ensure that our projects are developed with the highest quality and design standards, focusing on the details that make every home an ideal place for the family.'
                  }
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                alt="El Eman Developments Building"
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-pure-black mb-4">
                {locale === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? 'نسعى لأن نكون الشركة الرائدة في تطوير العقارات الفاخرة في مصر، مع التركيز على الابتكار والاستدامة وتقديم تجربة سكنية استثنائية لعملائنا.'
                  : 'We strive to be the leading company in luxury real estate development in Egypt, focusing on innovation, sustainability, and delivering an exceptional living experience for our clients.'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-pure-black mb-4">
                {locale === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? 'تطوير مشاريع سكنية فاخرة تجمع بين التصميم المبتكر والجودة العالية، مع توفير بيئة معيشية مثالية تلبي احتياجات العائلات المصرية المعاصرة.'
                  : 'To develop luxury residential projects that combine innovative design with high quality, providing an ideal living environment that meets the needs of contemporary Egyptian families.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-pure-black mb-4">
              {locale === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'القيم التي تقود عملنا وتشكل هويتنا'
                : 'The values that guide our work and shape our identity'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'التميز' : 'Excellence'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? 'نسعى للتميز في كل ما نقوم به، من التصميم إلى البناء إلى الخدمة'
                  : 'We strive for excellence in everything we do, from design to construction to service'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'الاهتمام بالعملاء' : 'Customer Care'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? 'نضع عملائنا في قلب كل قرار نتخذه ونحرص على رضاهم التام'
                  : 'We put our customers at the heart of every decision we make and ensure their complete satisfaction'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'الابتكار' : 'Innovation'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? 'نتبنى أحدث التقنيات والتصاميم لتقديم حلول مبتكرة'
                  : 'We adopt the latest technologies and designs to provide innovative solutions'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'الموثوقية' : 'Reliability'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? '30+ عاماً من الخبرة والموثوقية في سوق العقارات المصري'
                  : '30+ years of experience and reliability in the Egyptian real estate market'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'العمل الجماعي' : 'Teamwork'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? 'نؤمن بقوة العمل الجماعي والتعاون لتحقيق أفضل النتائج'
                  : 'We believe in the power of teamwork and collaboration to achieve the best results'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-pure-black mb-3">
                {locale === 'ar' ? 'الاستدامة' : 'Sustainability'}
              </h3>
              <p className="text-charcoal leading-relaxed">
                {locale === 'ar'
                  ? 'نلتزم بتطوير مشاريع مستدامة تحترم البيئة والمجتمع'
                  : 'We are committed to developing sustainable projects that respect the environment and society'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-warm-gold">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'أرقام تتحدث عن نجاحنا على مدار أكثر من 30 عاماً'
                : 'Numbers that speak of our success over more than 30 years'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
              <p className="text-lg">
                {locale === 'ar' ? 'عام من الخبرة' : 'Years of Experience'}
              </p>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <p className="text-lg">
                {locale === 'ar' ? 'مشروع مكتمل' : 'Completed Projects'}
              </p>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <p className="text-lg">
                {locale === 'ar' ? 'عميل راضي' : 'Happy Clients'}
              </p>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <p className="text-lg">
                {locale === 'ar' ? 'جائزة محققة' : 'Awards Won'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}