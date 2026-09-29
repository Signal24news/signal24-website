/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    // Old sections from the first version of the site.
    return [
      { source: '/category/pakistan', destination: '/category/world', permanent: true },
      { source: '/category/tech', destination: '/category/ai-tech', permanent: true },
      { source: '/category/world-news', destination: '/category/world', permanent: true },
      { source: '/editorial', destination: '/editorial-policy', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
    ];
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
