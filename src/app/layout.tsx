
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

export const metadata: Metadata = {
  title: 'Himalaya Public School Hub',
  description: 'Welcome to Himalaya Public School',
  icons: {
    icon: {
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIATgCHAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYBBwj/xABBEAACAQMDAgQEAwcEAgIBAwUBAgMABBEFEiExQRMiUWEGFHGBMpGhFSNCscHR8DNS4fEkYgeCchZDoiU0Y4OS/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACoRAAICAgIBBAICAQUAAAAAAAABAhESIQMxQQQTFFEiYUJxgQUykbHw/aD/pSpUANJRx613zDtxSpUAOhsdK74uBjFKlQA3JbkVwRs3OaVKmA8RYHm5NO2iuUqAOqide9MMeT0pUqBCMWOSQKhMYrlKgBCANTxbLjmlSoAfHBGvB5qXCr0FKlSGc3LnGK62KVKmBwjIwBUTw56jJpUqAGm2B7ZprwAcYrlKkAJJYoxJIoVtMDEjjH0pUqdsVHBp6KMYJNSizULg4ApUqLYUMa3VBhcfWhXijXLZyx7UqVNCYLcPt/COlVd0HcE4pUqszZjtdSeS68IKxbooxVVJpl0ZW/wAGd+BzilSqRpHJdCu7YIZY0wecZ5oOa38MlZUZGPJUiuUqloENii4JxxjHFX3wrpk15e4SLpzuYcClSpJFNnp1vYPbwqI3UMvqvWpIm23CtKoyOCcdqVKqGXGI5UwmMY6ipILAL5q5SqCgxhhMdhUShiTt4xSpUAAMlfZkk5NBSvujJb8qVKqQmPgKE5HDd8GraKMGMY64rlKh9gjpZgcba71HNKlSGROAelMXKmlSpASli/8AapEjVMkjHrSpUAJZB2HSunnljSpUwInuFUkdvWow7SDG0AdaVKgBjoR7UhkKMZzSpUgGi4IfYRuP0p5mA6jFKlRYH//Z",
      type: 'image/jpeg',
    },
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
