
"use client";

import React, { useEffect } from 'react'; // Added useEffect
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';
import { School, Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter = pathname !== '/ai-assistant';

  useEffect(() => {
    if (pathname === '/faculty') {
      document.body.classList.add('faculty-theme-active');
    } else {
      document.body.classList.remove('faculty-theme-active');
    }
    // Cleanup function to remove class if component unmounts while on faculty page
    return () => {
      document.body.classList.remove('faculty-theme-active');
    };
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-y-auto animate-in fade-in-0 duration-500 ease-out">
          {children}
        </main>
        {showFooter && (
          <footer className="bg-card py-10 md:py-16 text-foreground">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                {/* Column 1: School Info */}
                <div className="space-y-3">
                  <Link href="/" className="flex items-center gap-2 mb-3">
                    <School className="w-10 h-10 text-accent" />
                    <h3 className="text-2xl font-bold text-foreground">Himalaya Public School</h3>
                  </Link>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    Our school is dedicated to providing the best possible education for our students, and we are proud to offer a range of programs that are designed to help them grow and develop in a safe and nurturing environment
                  </p>
                </div>

                {/* Column 2: Information */}
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold mb-4 text-foreground">Information</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><Link href="/" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> About Himalaya</Link></li>
                    <li><Link href="/admissions" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> Admissions</Link></li>
                    <li><Link href="/faculty" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> Our Faculty</Link></li>
                    <li><Link href="/school-life" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> School Life</Link></li>
                    <li><Link href="/contact" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> Contact Us</Link></li>
                  </ul>
                </div>

                {/* Column 3: Resources */}
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold mb-4 text-foreground">Resources</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><Link href="/resources" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> Downloads</Link></li>
                    <li><Link href="/ai-assistant" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> AI Assistant / FAQ</Link></li>
                    <li><Link href="/school-life#news" className="hover:text-accent transition-colors flex items-center text-foreground"><span className="text-accent mr-2">&gt;</span> News & Events</Link></li>
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center bg-accent text-accent-foreground py-3 px-5 rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium shadow-md"
                  >
                    <Mail className="w-5 h-5 mr-2.5 shrink-0" /> Complaint & Suggestion Box
                  </Link>
                </div>

                {/* Column 4: Contact */}
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold mb-4 text-foreground">Contact</h4>
                  <address className="not-italic text-sm space-y-3">
                    <p className="flex items-start text-foreground/90">
                      <MapPin className="w-5 h-5 mr-2.5 mt-0.5 shrink-0 text-accent" />
                      <span>Himalaya Public School <br />123 Education Lane, Knowledge City, KC 12345, India</span>
                    </p>
                    <p className="flex items-center text-foreground/90">
                      <Phone className="w-5 h-5 mr-2.5 shrink-0 text-accent" />
                      <span>+91 (123) 456-7890</span>
                    </p>
                    <p className="flex items-center text-foreground/90">
                      <Mail className="w-5 h-5 mr-2.5 shrink-0 text-accent" />
                      <span>info@himalayaschool.edu</span>
                    </p>
                  </address>
                  <div className="flex space-x-3 pt-3">
                    <Link href="#" aria-label="Facebook" className="p-2.5 bg-accent rounded-full hover:bg-accent/90 transition-colors">
                      <Facebook className="w-5 h-5 text-primary-foreground" />
                    </Link>
                    <Link href="#" aria-label="LinkedIn" className="p-2.5 bg-accent rounded-full hover:bg-accent/90 transition-colors">
                      <Linkedin className="w-5 h-5 text-primary-foreground" />
                    </Link>
                    <Link href="#" aria-label="Instagram" className="p-2.5 bg-sidebar-accent rounded-full hover:bg-sidebar-accent/90 transition-colors">
                      <Instagram className="w-5 h-5 text-primary-foreground" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-border/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/80">
                <p className="mb-2 md:mb-0">Himalaya Public School All rights reserved © {new Date().getFullYear()}</p>
                <div className="space-x-6">
                  <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-accent transition-colors">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </footer>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
