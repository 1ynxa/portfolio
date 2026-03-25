import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProPeloton — Pro Cycling Team Management',
  description: 'All-in-one SaaS for professional cycling team operations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
