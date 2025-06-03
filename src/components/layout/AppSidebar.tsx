
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
import { Home, BookOpen, Users, Image as ImageIcon, FolderOpen, Mail, Cpu } from 'lucide-react';

const navItems = [
  { href: '/', label: 'School Overview', icon: Home },
  { href: '/admissions', label: 'Admissions', icon: BookOpen },
  { href: '/faculty', label: 'Faculty Directory', icon: Users },
  { href: '/school-life', label: 'School Life', icon: ImageIcon },
  { href: '/resources', label: 'Resources', icon: FolderOpen },
  { href: '/contact', label: 'Contact & Support', icon: Mail },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Cpu },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 h-16 flex items-center justify-end border-b">
        {/* School logo and name are now in PageHeader */}
        {/* Mobile SidebarTrigger is also handled by PageHeader */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
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
        <p className="text-sm font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden text-center">
          Himalaya Public School
        </p>
        <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden text-center">
          Inspiring Futures, Building Character.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
