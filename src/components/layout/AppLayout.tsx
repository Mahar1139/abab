
"use client";

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import PageHeader from '../shared/PageHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <PageHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <footer className="p-4 text-center text-sm text-muted-foreground border-t">
          Himalaya Public School All rights reserved © {new Date().getFullYear()}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
