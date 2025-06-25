'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ClassGalleryItem {
  src: string;
  alt: string;
  dataAiHint: string;
}

interface ClassGalleryProps {
  images: ClassGalleryItem[];
  galleryTitle?: string;
}

export default function ClassGallery({ images, galleryTitle = "Glimpses from Our Classes" }: ClassGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <SectionWrapper title={galleryTitle} className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  data-ai-hint={image.dataAiHint}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-2 sm:p-4">
              <div className="relative w-full" style={{ paddingTop: '66.66%' }}>
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill
                  className="object-contain"
                  sizes="90vw"
                  data-ai-hint={image.dataAiHint}
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </SectionWrapper>
  );
}
