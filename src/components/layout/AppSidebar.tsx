"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  ImageIcon, 
  Cpu, 
  Brain,
  CalendarDays, 
  FileText,
  Settings,
  TrendingUp,
  School,
  BookCopy,
  GraduationCap
} from 'lucide-react';

export default function AppSidebar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { href: '/', label: t('nav.home'), icon: Home }, // Home
    { href: '/admissions', label: t('nav.admissions'), icon: BookOpen }, // Admissions
    { href: '/tech-programs', label: t('nav.tech'), icon: Cpu }, // Existing Tech Programs link
    { href: '/extramarks', label: t('nav.extramarks'), icon: GraduationCap },
    { href: '/faculty', label: t('nav.faculty'), icon: Users },
    { href: '/school-life', label: t('nav.schoolLife'), icon: ImageIcon },
    { href: '/events-calendar', label: t('nav.events'), icon: CalendarDays },
    { href: '/quiz', label: t('nav.quiz'), icon: Brain },
    { href: '/track-performance', label: t('nav.trackPerformance'), icon: TrendingUp },
  ];

  const displayedNavItems = navItems.filter(item => item.href !== '/developed-by'); // Keep this filter if /developed-by should not be in the sidebar

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 flex items-center justify-center border-b group-data-[collapsible=icon]:py-2">
            <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                <School className="w-8 h-8 text-sidebar-foreground" />
                <span className="text-xl font-bold text-sidebar-foreground">Himalaya Public School</span>
            </Link>
            <Link href="/" className="hidden group-data-[collapsible=icon]:flex">
                <School className="w-8 h-8 text-sidebar-foreground" />
            </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {displayedNavItems.map((item, index) => ( // Use index in key for uniqueness
              <SidebarMenuItem key={`${item.href}-${index}`}>
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
