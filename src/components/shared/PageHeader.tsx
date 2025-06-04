
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { Home, BookOpen, Users, Image as ImageIcon, FolderOpen, Mail, Cpu, Bot, School, Code2, Laptop, Brain } from 'lucide-react';

const navItems = [
  { href: '/', label: 'School Overview', icon: Home },
  { href: '/admissions', label: 'Admissions', icon: BookOpen },
  { href: '/faculty', label: 'Faculty Directory', icon: Users },
  { href: '/school-life', label: 'School Life', icon: ImageIcon },
  { href: '/resources', label: 'Resources', icon: FolderOpen },
  { href: '/coding-classes', label: 'Coding Classes', icon: Code2 },
  { href: '/robotics-classes', label: 'Robotics Classes', icon: Bot },
  { href: '/computer-classes', label: 'Computer Classes', icon: Laptop },
  { href: '/quiz', label: 'Quiz', icon: Brain },
  { href: '/contact', label: 'Contact & Support', icon: Mail },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Cpu },
];

export default function PageHeader() {
  const pathname = usePathname();
  
  let pageTitle = "Himalaya Public School";
  if (pathname === '/') {
    pageTitle = navItems.find(item => item.href === '/')?.label || "School Overview";
  } else {
    const matchedItem = navItems
      .filter(item => item.href !== '/') 
      .filter(item => pathname.startsWith(item.href))
      .sort((a, b) => b.href.length - a.href.length)[0]; 

    if (matchedItem) {
      pageTitle = matchedItem.label;
    }
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      {/* Left section: Mobile trigger and School Logo/Name */}
      <div className="flex items-center gap-3">
        {/* SidebarTrigger is now always visible */}
        <div className=""> 
          <SidebarTrigger />
        </div>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-accent transition-colors">
          <School className="h-7 w-7 text-accent" />
          <span className="font-headline hidden sm:inline">Himalaya Public School</span>
        </Link>
      </div>

      {/* Right section: Page Title */}
      <h1 className="text-lg md:text-xl font-semibold font-headline text-primary text-right truncate">
        {pageTitle}
      </h1>
    </header>
  );
}
