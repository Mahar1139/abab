
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, Image as ImageIcon, FolderOpen, Mail, BrainCircuit } from 'lucide-react';

const navItems = [
  { href: '/', label: 'School Overview', icon: Home },
  { href: '/admissions', label: 'Admissions', icon: BookOpen },
  { href: '/faculty', label: 'Faculty Directory', icon: Users },
  { href: '/school-life', label: 'School Life', icon: ImageIcon },
  { href: '/resources', label: 'Resources', icon: FolderOpen },
  { href: '/contact', label: 'Contact & Support', icon: Mail },
  { href: '/ai-assistant', label: 'AI Assistant', icon: BrainCircuit },
];

export default function PageHeader() {
  const pathname = usePathname();
  
  let pageTitle = "Himalaya Public School";
  if (pathname === '/') {
    pageTitle = navItems.find(item => item.href === '/')?.label || "School Overview";
  } else {
    // Find the item whose href is the longest prefix of the current pathname
    const matchedItem = navItems
      .filter(item => item.href !== '/') // Exclude the homepage for prefix matching
      .filter(item => pathname.startsWith(item.href))
      .sort((a, b) => b.href.length - a.href.length)[0]; // Get the longest match

    if (matchedItem) {
      pageTitle = matchedItem.label;
    }
  }


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-xl md:text-2xl font-semibold font-headline text-primary">
        {pageTitle}
      </h1>
    </header>
  );
}

