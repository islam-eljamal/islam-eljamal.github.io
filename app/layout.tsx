import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';

const url = 'https://islam-eljamal.github.io';
const title = 'Islam El Jamal · Business operations, powered by AI';
const description =
  'Business Information Systems graduate and Master’s student in Berlin. Procurement, data and operations experience, and a native iPhone app built by directing AI agents.';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    siteName: 'Islam El Jamal',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Islam El Jamal, business operations powered by AI' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a09',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}",
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
