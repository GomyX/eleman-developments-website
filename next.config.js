/** @type {import('next').NextConfig} */
// TODO: Enable in Task 7 after creating i18n configuration
// const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Turbopack does not support experimental.typedRoutes in dev.
  // Keep it only for production builds.
  ...(isProd ? { experimental: { typedRoutes: true } } : {})
};

module.exports = nextConfig;
