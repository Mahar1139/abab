
"use client";

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';
import { School, Mail, BookOpen, Cpu } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import QuizAdDialog from '../shared/QuizAdDialog';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAdOpen, setIsAdOpen] = useState(false);

  useEffect(() => {
    // Prevent ad from showing if the user is already on the quiz page.
    if (pathname === '/quiz') {
      return;
    }

    const timer = setTimeout(() => {
      setIsAdOpen(true);
    }, 16000); // 16-second delay

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-y-auto animate-in fade-in-0 duration-500 ease-out">
          {children}
        </main>
        <QuizAdDialog open={isAdOpen} onOpenChange={setIsAdOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
