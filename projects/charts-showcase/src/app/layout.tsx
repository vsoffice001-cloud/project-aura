/**
 * charts-showcase · Root layout
 *
 * WHY  · Minimal shell — imports DS fonts (Noto Serif + DM Sans via Google Fonts)
 *        and applies DS editorial-light variant by default.
 *
 * HOW  · Next 15 App Router. No nav / footer — showcase is a pure demo canvas.
 */

import type { Metadata } from 'next';
import { Noto_Serif, DM_Sans } from 'next/font/google';
import './globals.css';
import { AuraBeacon } from './aura-beacon';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ken Research · Chart Library Showcase',
  description: 'Live preview of all charts and tables from @kenresearch/design-system/charts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${dmSans.variable}`}>
      <head>
        {/* G.5: Declare support for both schemes — browser native controls + scrollbars
            adapt to the active surface without flash. Mitigates theme-switch flicker
            for system-level UI elements (scrollbars, form inputs). */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-body">
        <AuraBeacon />
        {children}
      </body>
    </html>
  );
}
