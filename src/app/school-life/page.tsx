
'use client';

import dynamic from 'next/dynamic';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryItems, videoItems } from "./school-life-data";
import type { SchoolEvent, VideoItem } from "@/types";
import { Images, Video } from "lucide-react";

// Dynamically import components to potentially resolve chunk loading issues.
// Provide a simple skeleton loader for a better user experience.
const GalleryImage = dynamic(() => import('@/components/school-life/GalleryImage'), {
  loading: () => <div className="aspect-square bg-muted rounded-lg animate-pulse" />,
  ssr: false,
});
const NewsItem = dynamic(() => import('@/components/school-life/NewsItem'), {
  loading: () => <div className="aspect-video bg-muted rounded-lg animate-pulse" />,
  ssr: false,
});


export default function SchoolLifePage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="A Glimpse into School Life">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
          Explore the vibrant activities, events, and achievements that make our school community special.
        </p>
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="gallery" className="py-3 text-base">
              <Images className="mr-2 h-5 w-5" /> Photo Gallery
            </TabsTrigger>
            <TabsTrigger value="videos" className="py-3 text-base">
              <Video className="mr-2 h-5 w-5" /> Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {galleryItems.map((item: SchoolEvent) => (
                <GalleryImage key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {videoItems.map((item: VideoItem) => (
                 <NewsItem key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SectionWrapper>
    </div>
  );
}
