import type { Metadata } from 'next';
import { DM_Sans, Noto_Serif } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Ken Research — Market Intelligence',
  description:
    'Premium market research reports across 300+ industries. Access in-depth sizing, competitor analysis, and forecasts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  );
}
