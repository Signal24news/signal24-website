import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SubscribePopup } from '@/components/SubscribePopup';
import { SITE, SOCIAL, AUTHORS } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'world news',
    'geopolitics',
    'Middle East news',
    'news explained',
    'global news',
    'AI news',
    'business news',
    'fact check',
    'Signal 24',
  ],
  authors: [{ name: 'Saad Ali', url: `${SITE.url}/author/saad-ali` }],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    creator: SITE.twitterHandle,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F0F' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: SITE.name,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: SITE.logo, width: 512, height: 512 },
  email: SITE.email,
  foundingDate: SITE.founded,
  founder: { '@type': 'Person', name: AUTHORS[0].name, url: `${SITE.url}/author/${AUTHORS[0].slug}` },
  sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.twitter, SOCIAL.threads, SOCIAL.linkedin],
  publishingPrinciples: `${SITE.url}/editorial-policy`,
  correctionsPolicy: `${SITE.url}/corrections`,
  verificationFactCheckingPolicy: `${SITE.url}/editorial-policy#verification`,
  ethicsPolicy: `${SITE.url}/editorial-policy`,
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'newsroom', email: SITE.email },
    { '@type': 'ContactPoint', contactType: 'news tips', email: SITE.tipsEmail },
    { '@type': 'ContactPoint', contactType: 'corrections', email: SITE.correctionsEmail },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  alternateName: 'Signal24',
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }}
        />
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <SubscribePopup delayMs={5000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
