
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  Cpu, 
  School, 
  Brain,
  CalendarDays, 
  Award, 
  Library,
  Code // Added Code icon
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'School Overview', icon: Home },
  { href: '/admissions', label: 'Admissions', icon: BookOpen },
  { href: '/tech-programs', label: 'Tech Programs', icon: Cpu },
  { href: '/faculty', label: 'Faculty Directory', icon: Users },
  { href: '/school-life', label: 'School Life', icon: ImageIcon },
  { href: '/events-calendar', label: 'Events Calendar', icon: CalendarDays },
  { href: '/student-achievements', label: 'Student Achievements', icon: Award },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/quiz', label: 'AI Quiz Challenge', icon: Brain },
  // { href: '/developed-by', label: 'Developed By', icon: Code }, // Usually not in main nav
];

export default function AppSidebar() {
  const pathname = usePathname();

  // Filter out the '/developed-by' link for the sidebar display
  const displayedNavItems = navItems.filter(item => item.href !== '/developed-by');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex items-center justify-center border-b group-data-[collapsible=icon]:py-2">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <School className="w-6 h-6 text-sidebar-foreground" /> 
          <h2 className="text-lg font-bold text-sidebar-foreground">
            Himalaya Public School
          </h2>
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex">
           <School className="w-6 h-6 text-sidebar-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {displayedNavItems.map((item) => ( // Use displayedNavItems here
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
      <SidebarFooter className="p-4 flex flex-col gap-1 items-center border-t">
        <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden text-center">
          Himalaya Public School All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
