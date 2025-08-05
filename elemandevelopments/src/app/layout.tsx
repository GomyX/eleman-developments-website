import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
