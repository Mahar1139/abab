
"use client";

import React from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';
import { School, Mail, BookOpen, Brain, MessageSquare } from 'lucide-react'; // Added MessageSquare for AI Assistant
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Show footer only on the homepage for now, or adjust as needed
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
          <footer className="bg-card py-6 md:py-8 border-t border-border/20 text-foreground">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left Side: School Name & Logo */}
                <Link href="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
                  <School className="w-6 h-6 text-accent" />
                  <span className="font-semibold text-md">Himalaya Public School</span>
                </Link>

                {/* Right Side: Action Links & Legal */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-3 md:gap-4">
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
                        <MessageSquare className="w-5 h-5" />
                        <span className="ml-1.5 hidden sm:inline">AI Helper</span>
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-xs text-foreground/70">
                      &copy; {new Date().getFullYear()} Himalaya Public School.
                    </p>
                    <div className="text-xs text-foreground/60 space-x-2">
                      <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
                      <span>&bull;</span>
                      <Link href="/terms-conditions" className="hover:text-accent transition-colors">Terms</Link>
                    </div>
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
