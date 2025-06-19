
"use client";

import React from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';
import { School, Mail, BookOpen, Cpu } from 'lucide-react'; // Changed Brain to Cpu
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter = pathname === '/'; 

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-y-auto animate-in fade-in-0 duration-500 ease-out">
          {children}
        </main>
        {showFooter && (
          <footer className="bg-card py-6 border-t border-border text-foreground">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Left: School Identity */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <Link href="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors mb-2">
                    <School className="w-7 h-7 text-primary" />
                    <span className="font-semibold text-xl font-headline">Himalaya Public School</span>
                  </Link>
                  <p className="text-xs text-foreground/70">
                    Nurturing potential, inspiring futures.
                  </p>
                </div>

                {/* Center: Quick Links (Optional, kept minimal for this design) */}
                <div className="flex justify-center items-center gap-4">
                   <Button variant="ghost" size="sm" asChild className="text-foreground/80 hover:text-accent px-2">
                      <Link href="/admissions" aria-label="Admissions">
                        <BookOpen className="w-5 h-5" />
                        <span className="ml-1.5 hidden sm:inline">Admissions</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="text-foreground/80 hover:text-accent px-2">
                      <Link href="/contact" aria-label="Contact Us">
                        <Mail className="w-5 h-5" />
                        <span className="ml-1.5 hidden sm:inline">Contact</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="text-foreground/80 hover:text-accent px-2">
                      <Link href="/ai-assistant" aria-label="AI Assistant">
                        <Cpu className="w-5 h-5" /> {/* Changed Brain to Cpu */}
                        <span className="ml-1.5 hidden sm:inline">AI Helper</span>
                      </Link>
                    </Button>
                </div>

                {/* Right: Copyright and Legal */}
                <div className="text-center md:text-right text-xs text-foreground/70">
                  <p>&copy; {new Date().getFullYear()} Himalaya Public School.</p>
                  <div className="space-x-2 mt-1">
                    <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
                    <span>&bull;</span>
                    <Link href="/terms-conditions" className="hover:text-accent transition-colors">Terms</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
