
"use client";

import React from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';
import { School, Mail, BookOpen, Cpu } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // showFooter variable and its logic removed

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-y-auto animate-in fade-in-0 duration-500 ease-out">
          {children}
        </main>
        {/* Footer block and its conditional rendering removed */}
      </SidebarInset>
    </SidebarProvider>
  );
}

