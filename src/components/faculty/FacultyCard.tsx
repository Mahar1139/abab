
import type { FacultyMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FacultyCardProps {
  member: FacultyMember;
  imageAspectRatio?: 'square' | 'landscape';
}

export default function FacultyCard({ member, imageAspectRatio = 'square' }: FacultyCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {member.imageUrl && (
        <div
          className={cn(
            "relative w-full overflow-hidden",
            imageAspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square'
          )}
        >
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            data-ai-hint={member.dataAiHint || "faculty member"}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="p-4 md:p-6 text-center">
        <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">{member.name}</CardTitle>
        <CardDescription className="text-sm sm:text-base md:text-lg text-accent font-semibold">{member.title}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 flex-grow">
        <p className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed text-center">
          {member.bio}
        </p>
      </CardContent>
    </Card>
  );
}
