import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { ToastProvider } from '@/lib/context/ToastContext';
import { LoadingProvider } from '@/lib/context/LoadingContext';
import { domainConfig } from '@/lib/domain.config';

import { FinancialProvider } from '@/lib/context/FinancialContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: domainConfig.brand.name || 'SurvivalRun',
  description: domainConfig.brand.tagline || 'Broke But Functional — Survive the Month',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#FAFAF7] text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white min-h-screen">
        <AuthProvider>
          <FinancialProvider>
            <ToastProvider>
              <LoadingProvider>
                {children}
              </LoadingProvider>
            </ToastProvider>
          </FinancialProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
