import { cookies } from 'next/headers';
import { Noto_Serif, DM_Sans } from 'next/font/google';
import './globals.css';
import { NavbarShell } from '@/components/NavbarShell';
import type { Metadata } from 'next';

const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'Ken Research — Report Store',
  description: 'Browse syndicated market research reports across 50+ industries.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const variant =
    cookieStore.get('ds-variant')?.value === 'cinematic-dark' ? 'cinematic-dark' : 'editorial-light';

  return (
    <html lang="en" data-variant={variant} className={`${notoSerif.variable} ${dmSans.variable}`}>
      <body>
        <NavbarShell />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
