import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
};

export default withNextIntl(nextConfig);
