
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppLayout from '@/components/layout/AppLayout';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { LanguageProvider } from '@/context/LanguageContext';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '700'],
  display: 'swap',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  weight: ['400', '700'],
  display: 'swap',
});

// Using an inline SVG for a circular favicon. This avoids needing a separate file.
const circularFaviconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='#1A5276'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' font-size='40' font-weight='bold' fill='white' font-family='sans-serif'>HPS</text></svg>`;
const dataUri = `data:image/svg+xml,${circularFaviconSvg.replace(/#/g, '%23')}`;


export const metadata: Metadata = {
  title: 'Himalaya Public School Hub',
  description: 'Welcome to Himalaya Public School',
  icons: {
    icon: dataUri,
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${ptSans.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="red"
            disableTransitionOnChange
            themes={['light', 'dark', 'forest', 'red']}
          >
            <AppLayout>
              {children}
            </AppLayout>
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
