
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SettingsDialog } from '@/components/settings/SettingsDialog';
import { useTranslation } from '@/hooks/use-translation';
import { 
  Home, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  Cpu, 
  Brain,
  CalendarDays, 
  Award, 
  Library,
  Settings,
  Code,
  TrendingUp
} from 'lucide-react';

export default function AppSidebar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/admissions', label: t('nav.admissions'), icon: BookOpen },
    { href: '/tech-programs', label: t('nav.tech'), icon: Cpu },
    { href: '/faculty', label: t('nav.faculty'), icon: Users },
    { href: '/school-life', label: t('nav.schoolLife'), icon: ImageIcon },
    { href: '/events-calendar', label: t('nav.events'), icon: CalendarDays },
    { href: '/student-achievements', label: t('nav.achievements'), icon: Award },
    { href: '/library', label: t('nav.library'), icon: Library },
    { href: '/quiz', label: t('nav.quiz'), icon: Brain },
    { href: '/track-performance', label: t('nav.trackPerformance'), icon: TrendingUp },
  ];

  const displayedNavItems = navItems.filter(item => item.href !== '/developed-by');

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 flex items-center justify-center border-b group-data-[collapsible=icon]:py-2">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Image
              src="https://placehold.co/128x32.png"
              alt="Himalaya Public School Logo"
              width={128}
              height={32}
              className="h-8 w-auto rounded-md"
              data-ai-hint="school logo"
            />
            <h2 className="text-lg font-bold text-sidebar-foreground">
              Himalaya Public School
            </h2>
          </div>
          <div className="hidden group-data-[collapsible=icon]:flex">
            <Image
              src="https://placehold.co/40x40.png"
              alt="Himalaya Public School Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md"
              data-ai-hint="school logo"
            />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {displayedNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Button
                  asChild
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={`w-full justify-start group-data-[collapsible=icon]:justify-center ${pathname === item.href ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </Button>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 flex flex-col gap-1 border-t">
           <Button
            variant="ghost"
            onClick={() => setIsSettingsOpen(true)}
            className="w-full justify-start group-data-[collapsible=icon]:justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Settings className="w-5 h-5" />
            <span className="group-data-[collapsible=icon]:hidden">{t('settings.title')}</span>
          </Button>
          <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden text-center pt-2">
            Himalaya Public School All rights reserved.
          </p>
        </SidebarFooter>
      </Sidebar>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}
