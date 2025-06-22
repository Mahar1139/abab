
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
    // 1. Prevent ad from showing if the user is already on the quiz page.
    if (pathname === '/quiz') {
      return;
    }

    const AD_STORAGE_KEY = 'hpsAdViewData';
    const MAX_VIEWS_PER_DAY = 2;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    try {
      const storedDataRaw = localStorage.getItem(AD_STORAGE_KEY);
      let adData = { date: today, count: 0 };

      if (storedDataRaw) {
        const parsedData = JSON.parse(storedDataRaw);
        // 2. If it's a new day, the date won't match, so adData remains reset.
        if (parsedData.date === today) {
          adData = parsedData;
        }
      }
      
      // 3. Check if the view limit has been reached for today.
      if (adData.count < MAX_VIEWS_PER_DAY) {
        const timer = setTimeout(() => {
          setIsAdOpen(true);
          // 4. When the ad is shown, increment the count and save it back to localStorage.
          const currentCount = adData.count;
          const newData = { date: today, count: currentCount + 1 };
          localStorage.setItem(AD_STORAGE_KEY, JSON.stringify(newData));
        }, 16000); // 16-second delay

        // Cleanup the timer if the component unmounts or pathname changes
        return () => clearTimeout(timer);
      }
    } catch (error) {
      // Fallback for environments where localStorage is not available (e.g., private browsing)
      console.error("Could not access localStorage for ad frequency capping:", error);
      const timer = setTimeout(() => {
        setIsAdOpen(true);
      }, 16000);
      return () => clearTimeout(timer);
    }
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
