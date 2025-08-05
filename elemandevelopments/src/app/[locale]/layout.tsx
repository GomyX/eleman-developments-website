import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getDirection, getFontFamily } from "@/lib/utils";

export const metadata: Metadata = {
  title: "El Eman Developments - Where Belief Takes Shape",
  description: "Luxury residential projects in Egypt. Discover our premium properties in New Cairo, North Coast, and Sheikh Zayed City.",
  keywords: "real estate, luxury properties, Egypt, New Cairo, North Coast, Sheikh Zayed, El Eman Developments",
  authors: [{ name: "El Eman Developments" }],
  openGraph: {
    title: "El Eman Developments - Where Belief Takes Shape",
    description: "Luxury residential projects in Egypt",
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = getDirection(locale);
  const fontFamily = getFontFamily(locale);

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontFamily} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header locale={locale} />
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
            <WhatsAppButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}