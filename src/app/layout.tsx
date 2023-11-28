import Navigation from '@components/navigation';
import ThemeProvider from '@theme/ThemeProvider';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import './globals.css';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  noStore();
  return (
    <html lang="th">
      <body>
        <Navigation />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
