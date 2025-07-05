'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ClassGalleryItem {
  src: string;
  alt: string;
  dataAiHint: string;
  colSpan?: number;
  rowSpan?: number;
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 grid-flow-row-dense">
        {images.map((image, index) => {
          const colSpanClass = image.colSpan === 2 ? 'sm:col-span-2' : '';
          const rowSpanClass = image.rowSpan === 2 ? 'sm:row-span-2' : '';
          const aspectClass = image.colSpan === 2 ? 'aspect-[2/1]' : 'aspect-square';
          
          return (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className={cn(
                  "group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer",
                  colSpanClass,
                  rowSpanClass,
                  aspectClass
                  )}>
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
              <DialogContent className="max-w-4xl w-auto p-0 bg-transparent border-none shadow-none">
                <DialogHeader className="sr-only">
                  <DialogTitle>{image.alt}</DialogTitle>
                </DialogHeader>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                  sizes="90vw"
                  data-ai-hint={image.dataAiHint}
                />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
