import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DisclaimerModal from '@/components/layout/DisclaimerModal';
import CustomCursor from '@/components/ui/CustomCursor';
import BackToTop from '@/components/ui/BackToTop';
import SmoothScroll from '@/components/animations/SmoothScroll';
import PageTransition from '@/components/animations/PageTransition';
import ScrollProgress from '@/components/animations/ScrollProgress';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Prime Law Bharat',
  description: 'Comprehensive Legal Solutions | Trusted Advocacy Across Forums in Maharashtra, Karnataka, Gujarat, Delhi, and Haryana.',
  openGraph: {
    title: 'Prime Law Bharat | Advocates & Legal Consultants',
    description: 'Comprehensive Legal Solutions | Trusted Advocacy Across Forums in Maharashtra, Karnataka, Gujarat, Delhi, and Haryana.',
    siteName: 'Prime Law Bharat',
  },
  twitter: {
    title: 'Prime Law Bharat | Advocates & Legal Consultants',
    description: 'Comprehensive Legal Solutions | Trusted Advocacy Across Forums in Maharashtra, Karnataka, Gujarat, Delhi, and Haryana.',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=5', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=5', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=5', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased bg-[#0F1B2D] text-white flex flex-col min-h-screen selection:bg-[#0B2A52]/20 selection:text-white`}>
        <CustomCursor />
        <PageTransition />
        <ScrollProgress />
        <SmoothScroll />
        <DisclaimerModal />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
