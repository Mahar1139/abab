
import Image from 'next/image';
import type { SchoolEvent } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface GalleryImageProps {
  item: SchoolEvent;
}

export default function GalleryImage({ item }: GalleryImageProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Image 
            src={item.imageUrl} 
            alt={item.title} 
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={item.dataAiHint || "school event"}
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-card">
        <h3 className="text-lg font-semibold text-primary truncate group-hover:text-accent transition-colors">{item.title}</h3>
      </CardFooter>
    </Card>
  );
}
