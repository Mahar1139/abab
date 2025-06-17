
import type { z } from 'zod'; // Added for Zod types if needed elsewhere
import type { admissionFormSchema } from '@/components/admissions/AdmissionForm'; // For AdmissionFormData

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string; // Optional date for events or news
  dataAiHint?: string;
}

export interface NewsArticle extends SchoolEvent {} // News can share event structure

export interface DownloadableResource {
  id:string;
  title: string;
  description: string;
  fileUrl: string; // Placeholder URL for download
  icon: React.ElementType; // Lucide icon component
}

// Type for Admission Form Data, inferred from Zod schema
export type AdmissionFormData = z.infer<typeof admissionFormSchema>;
