import Image from 'next/image';
import type { SchoolEvent } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
          <CardFooter className="p-4 bg-card">
            <h3 className="text-lg font-semibold text-primary truncate group-hover:text-accent transition-colors">{item.title}</h3>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-2 sm:p-4">
        <DialogHeader className="sr-only">
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
        <div className="relative w-full" style={{ paddingTop: '66.66%' }}>
          <Image 
            src={item.imageUrl} 
            alt={item.title} 
            fill
            className="object-contain"
            sizes="90vw"
            data-ai-hint={item.dataAiHint || "school event"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
