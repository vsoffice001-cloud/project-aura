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
      <body className="font-body">
        <AuraBeacon />
        {children}
      </body>
    </html>
  );
}
