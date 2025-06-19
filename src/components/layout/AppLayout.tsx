
"use client";

import React from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';
import { School, Mail, MapPin, Phone, ChevronRight } from 'lucide-react';

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
          <footer className="bg-card py-10 md:py-16 text-foreground">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {/* Column 1: School Identity & Tagline */}
                <div className="space-y-3">
                  <Link href="/" className="flex items-center gap-2 mb-3">
                    <School className="w-8 h-8 text-accent" />
                    <h3 className="text-xl font-bold text-foreground">Himalaya Public School</h3>
                  </Link>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    Nurturing potential, inspiring futures.
                  </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Explore</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/academic-programs" className="hover:text-accent transition-colors flex items-center text-foreground"><ChevronRight className="w-4 h-4 mr-1.5 text-accent/70 shrink-0" />Academic Programs</Link></li>
                    <li><Link href="/admissions" className="hover:text-accent transition-colors flex items-center text-foreground"><ChevronRight className="w-4 h-4 mr-1.5 text-accent/70 shrink-0" />Admissions Process</Link></li>
                    <li><Link href="/faculty" className="hover:text-accent transition-colors flex items-center text-foreground"><ChevronRight className="w-4 h-4 mr-1.5 text-accent/70 shrink-0" />Our Educators</Link></li>
                    <li><Link href="/contact" className="hover:text-accent transition-colors flex items-center text-foreground"><ChevronRight className="w-4 h-4 mr-1.5 text-accent/70 shrink-0" />Get In Touch</Link></li>
                  </ul>
                </div>

                {/* Column 3: Contact Details */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Contact Us</h4>
                  <address className="not-italic text-sm space-y-2.5">
                    <p className="flex items-start text-foreground/90">
                      <MapPin className="w-4 h-4 mr-2.5 mt-0.5 shrink-0 text-accent" />
                      <span>123 Education Lane, Knowledge City, KC 12345, India</span>
                    </p>
                    <p className="flex items-center text-foreground/90">
                      <Phone className="w-4 h-4 mr-2.5 shrink-0 text-accent" />
                      <span>+91 (123) 456-7890</span>
                    </p>
                    <p className="flex items-center text-foreground/90">
                      <Mail className="w-4 h-4 mr-2.5 shrink-0 text-accent" />
                      <span>info@himalayaschool.edu</span>
                    </p>
                  </address>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-border/20 pt-6 mt-6 text-center">
                <p className="text-xs text-foreground/70 mb-1">
                  &copy; {new Date().getFullYear()} Himalaya Public School. All Rights Reserved.
                </p>
                <div className="space-x-3 text-xs text-foreground/70">
                  <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                  <span className="text-foreground/50">|</span>
                  <Link href="/terms-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link>
                </div>
              </div>
            </div>
          </footer>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
