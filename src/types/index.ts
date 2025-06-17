
import type { z } from 'zod';
import type { admissionFormSchema } from '@/lib/schemas/admission-schema'; // Updated import

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
  date?: string; 
  dataAiHint?: string;
}

export interface NewsArticle extends SchoolEvent {} 

export interface DownloadableResource {
  id:string;
  title: string;
  description: string;
  fileUrl: string; 
  icon: React.ElementType; 
}

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;
