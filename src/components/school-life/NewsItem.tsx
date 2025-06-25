'use client';

import type { VideoItem as VideoItemType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface VideoItemProps {
  item: VideoItemType;
}

export default function NewsItem({ item }: VideoItemProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          <iframe
            src={item.videoUrl}
            title={item.title || "Himalaya Public School Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
