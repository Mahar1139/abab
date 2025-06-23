
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from 'next/link';
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
  { href: '/developed-by', label: 'Developed By', icon: Code }, // Added for page title
];

export default function PageHeader() {
  const pathname = usePathname();
  
  let pageTitle = "Himalaya Public School";
  // Ensure '/' is matched first for the homepage title specifically.
  if (pathname === '/') {
    pageTitle = navItems.find(item => item.href === '/')?.label || "School Overview";
  } else {
    // For other pages, find the longest matching path to handle nested routes correctly.
    const matchedItem = navItems
      .filter(item => item.href !== '/') // Exclude homepage from this specific logic
      .filter(item => pathname.startsWith(item.href))
      .sort((a, b) => b.href.length - a.href.length)[0]; // Sort by length to get most specific match

    if (matchedItem) {
      pageTitle = matchedItem.label;
    } else if (pathname.startsWith('/contact')) {
      pageTitle = "Contact & Support";
    }
    // If no specific match, it retains "Himalaya Public School" or you could set a default like "Page"
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/60 backdrop-blur-sm px-4 md:px-6">
      {/* Left section: Mobile trigger and School Logo/Name */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <div className=""> 
          <SidebarTrigger />
        </div>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-accent transition-colors">
          <School className="h-6 w-6 text-accent" />
          <span className="font-headline hidden sm:inline">Himalaya Public School</span>
        </Link>
      </div>

      {/* Right section: Page Title, wrapped for better flex handling */}
      <div className="min-w-0 flex-1">
        <h1 className="text-lg md:text-xl font-semibold font-headline text-primary text-right truncate">
          {pageTitle}
        </h1>
      </div>
    </header>
  );
}
