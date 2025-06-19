
import type { FacultyMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FacultyCardProps {
  member: FacultyMember;
  // imageAspectRatio prop is no longer needed as logic is based on imageUrl presence
}

export default function FacultyCard({ member }: FacultyCardProps) {
  if (member.imageUrl) {
    // Special layout for Director (or any member with an image)
    return (
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-card text-card-foreground">
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          {/* Circular Image Container - Adjusted for responsiveness */}
          <div className="p-4 sm:p-6 flex-shrink-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md border-2 border-card-foreground/20">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                data-ai-hint={member.dataAiHint || "faculty member"}
                className="object-cover"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
              />
            </div>
          </div>

          {/* Text Content Container */}
          <div className="flex-grow p-4 pt-0 sm:p-6 sm:pt-4 text-center sm:text-left">
            <CardHeader className="p-0 mb-1 sm:mb-2">
              <CardTitle className="text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">{member.name}</CardTitle>
              <CardDescription className="text-md md:text-lg text-accent font-semibold">{member.title}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {member.bio}
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }

  // Standard text-only layout for other faculty members
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group bg-card text-card-foreground">
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
