
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
import { Home, BookOpen, Users, Image as ImageIcon, FolderOpen, Mail, Cpu, School, Code2, Bot, Laptop, Brain } from 'lucide-react';

const navItems = [
  { href: '/', label: 'School Overview', icon: Home },
  { href: '/admissions', label: 'Admissions', icon: BookOpen },
  { href: '/faculty', label: 'Faculty Directory', icon: Users },
  { href: '/school-life', label: 'School Life', icon: ImageIcon },
  { href: '/resources', label: 'Resources', icon: FolderOpen },
  { href: '/coding-classes', label: 'Coding Classes', icon: Code2 },
  { href: '/robotics-classes', label: 'Robotics Classes', icon: Bot },
  { href: '/computer-classes', label: 'Computer Classes', icon: Laptop },
  { href: '/quiz', label: 'AI Quiz Challenge', icon: Brain },
  { href: '/contact', label: 'Contact & Support', icon: Mail },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Cpu },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex items-center justify-center border-b group-data-[collapsible=icon]:py-2">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <School className="w-6 h-6 text-sidebar-primary" />
          <h2 className="text-lg font-bold text-sidebar-foreground">
            Himalaya Public School
          </h2>
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex">
           <School className="w-6 h-6 text-sidebar-primary" />
        </div>
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
        <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden text-center">
          Himalaya Public School All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
