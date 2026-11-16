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
      // Story removed on 3 Oct 2026 (it used an AI image). Send old links to Sports.
      {
        source: '/article/ben-stokes-retires-from-international-cricket-ending-a-defining-era-for-england',
        destination: '/category/sports',
        permanent: true,
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
    // Pages rendered on request read these content files at runtime, so ship
    // them with the serverless functions.
    outputFileTracingIncludes: {
      '/verify': ['./content/certificates/**/*', './content/authors/**/*', './content/settings/**/*'],
      '/search': ['./content/articles/**/*', './content/authors/**/*', './content/settings/**/*'],
      // Pages that refresh every 10 minutes (scheduled stories) read these at runtime.
      '/': ['./content/articles/**/*', './content/authors/**/*', './content/settings/**/*'],
      '/article/[slug]': ['./content/articles/**/*', './content/authors/**/*', './content/settings/**/*'],
      '/category/[slug]': ['./content/articles/**/*', './content/settings/**/*'],
      '/author/[slug]': ['./content/articles/**/*', './content/authors/**/*', './content/settings/**/*'],
      '/corrections': ['./content/articles/**/*', './content/settings/**/*'],
      '/rss.xml': ['./content/articles/**/*', './content/settings/**/*'],
      '/sitemap.xml': ['./content/articles/**/*', './content/authors/**/*'],
      '/news-sitemap.xml': ['./content/articles/**/*'],
    },
  },
};

module.exports = nextConfig;
