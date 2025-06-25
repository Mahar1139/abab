import type { z } from 'zod';
import type { admissionFormSchema } from '@/lib/schemas/admission-schema'; 

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string; // imageUrl is optional
  dataAiHint?: string; // dataAiHint is optional
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string; 
  dataAiHint?: string;
}

export interface VideoItem {
  id: string;
  title?: string;
  description?: string;
  videoUrl: string;
}

export interface DownloadableResource {
  id:string;
  title: string;
  description: string;
  fileUrl: string; 
  icon: React.ElementType; 
}

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;

export interface AcademicProgram {
  id: string;
  level: string;
  title: string;
  description: string;
  keySubjects: string[];
  imageUrl: string;
  dataAiHint?: string;
  icon: React.ElementType;
}
