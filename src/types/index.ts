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
