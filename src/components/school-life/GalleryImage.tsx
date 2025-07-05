import Image from 'next/image';
import type { SchoolEvent } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface GalleryImageProps {
  item: SchoolEvent;
}

export default function GalleryImage({ item }: GalleryImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                data-ai-hint={item.dataAiHint || "school event"}
              />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-auto p-0 bg-transparent border-none shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
          sizes="90vw"
          data-ai-hint={item.dataAiHint || "school event"}
        />
      </DialogContent>
    </Dialog>
  );
}
