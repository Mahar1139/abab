
"use client";

import React from 'react';
import Link from 'next/link';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';
import { School, Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <footer className="bg-card text-card-foreground border border-border rounded-lg m-4 p-6 md:p-8">
          <div className="container mx-auto px-0"> {/* Padding is on footer now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {/* Column 1: School Info */}
              <div className="space-y-3">
                <Link href="/" className="flex items-center gap-2 mb-3">
                  <School className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">Himalaya Public School</h3>
                </Link>
                <p className="text-sm leading-relaxed">
                  Dedicated to providing the best possible education, fostering growth and development in a safe, nurturing environment
                </p>
              </div>

              {/* Column 2: Information */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold mb-4">Information</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="hover:text-primary transition-colors">About Himalaya</Link></li>
                  <li><Link href="/admissions" className="hover:text-primary transition-colors">Admissions</Link></li>
                  <li><Link href="/faculty" className="hover:text-primary transition-colors">Our Faculty</Link></li>
                  <li><Link href="/school-life" className="hover:text-primary transition-colors">School Life</Link></li>
                  <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Column 3: Resources */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/resources" className="hover:text-primary transition-colors">Downloads</Link></li>
                  <li><Link href="/ai-assistant" className="hover:text-primary transition-colors">AI Assistant / FAQ</Link></li>
                  <li><Link href="/school-life#news" className="hover:text-primary transition-colors">News & Events</Link></li>
                </ul>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center bg-accent text-accent-foreground py-2.5 px-4 rounded-md hover:bg-accent/90 transition-colors text-sm font-medium shadow-md"
                >
                  <Mail className="w-4 h-4 mr-2 shrink-0" /> Complaint & Suggestion
                </Link>
              </div>

              {/* Column 4: Contact */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                <address className="not-italic text-sm space-y-2.5">
                  <p className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2.5 mt-0.5 shrink-0 text-primary" />
                    <span>123 Education Lane, Knowledge City, KC 12345, India</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2.5 shrink-0 text-primary" />
                    <span>+91 (123) 456-7890</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2.5 shrink-0 text-primary" />
                    <span>info@himalayaschool.edu</span>
                  </p>
                </address>
                <div className="flex space-x-4 pt-3">
                  <Link href="#" aria-label="Facebook" className="text-primary-foreground hover:text-primary transition-colors"><Facebook className="w-7 h-7" /></Link>
                  <Link href="#" aria-label="Instagram" className="text-primary-foreground hover:text-primary transition-colors"><Instagram className="w-7 h-7" /></Link>
                  <Link href="#" aria-label="LinkedIn" className="text-primary-foreground hover:text-primary transition-colors"><Linkedin className="w-7 h-7" /></Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border/20 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-card-foreground/70">
              <p className="mb-2 md:mb-0">Himalaya Public School All rights reserved © {new Date().getFullYear()}</p>
              <div className="space-x-4">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
