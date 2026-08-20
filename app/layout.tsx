import './globals.css';
import type { Metadata, Viewport } from 'next';
import { StoreProvider } from '../context/store-context';
import { ScrollProgressBar } from '../components/scroll-progress';

export const metadata: Metadata = {
  title: 'EECO AROMATICS | We Care About You',
  description: 'EECO AROMATICS - We Care About You. Official store for Incense Sticks Packs, Incense Powder Packs, Air Fresheners, and Diffusers in Sri Lanka.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/eeco_logo.png" />
      </head>
      <body suppressHydrationWarning>
        <StoreProvider>
          <ScrollProgressBar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
