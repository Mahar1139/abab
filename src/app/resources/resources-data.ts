import type { DownloadableResource } from '@/types';
import { CalendarDays, ListChecks, BookUser } from 'lucide-react';

export const resources: DownloadableResource[] = [
  {
    id: 'res1',
    title: 'Academic Calendar 2024-2025',
    description: 'Key dates, holidays, and examination schedules for the academic year.',
    fileUrl: '/downloads/academic-calendar.pdf', // Placeholder
    icon: CalendarDays,
  },
  {
    id: 'res2',
    title: 'Grade 5 Supply List',
    description: 'List of required stationery and materials for Grade 5 students.',
    fileUrl: '/downloads/grade5-supply-list.pdf', // Placeholder
    icon: ListChecks,
  },
  {
    id: 'res3',
    title: 'Parent-Student Handbook',
    description: 'Comprehensive guide to school policies, code of conduct, and important information.',
    fileUrl: '/downloads/parent-student-handbook.pdf', // Placeholder
    icon: BookUser,
  },
  {
    id: 'res4',
    title: 'Library Guidelines',
    description: 'Rules and procedures for using the school library resources.',
    fileUrl: '/downloads/library-guidelines.pdf', // Placeholder
    icon: BookUser,
  },
];
