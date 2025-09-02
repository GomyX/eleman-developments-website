/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = withNextIntl({
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    // Allow builds to pass even with ESLint errors (per Next.js docs)
    // https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
    ignoreDuringBuilds: true
  },
  // Turbopack does not support experimental.typedRoutes in dev.
  // Keep it only for production builds.
  ...(isProd ? { experimental: { typedRoutes: true } } : {}),
  
  // Skip build static generation for problematic paths during development
  skipMiddlewareUrlNormalize: true,
});

module.exports = nextConfig;
