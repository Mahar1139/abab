
import type { FacultyMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FacultyCardProps {
  member: FacultyMember;
  imageAspectRatio?: 'square' | 'landscape';
}

export default function FacultyCard({ member, imageAspectRatio = 'square' }: FacultyCardProps) {
  if (member.imageUrl) {
    // Special layout for members with an image (currently, only Director)
    return (
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-card text-card-foreground">
        <div className="flex flex-col items-center">
          {/* Image Container - Adjusted for responsiveness and double frame */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Double frame effect */}
            {/* Outer frame part 1 - slightly increased padding for a thicker frame */}
            <div className="p-3 bg-border shadow-md"> 
              {/* Gap between frames - slightly increased padding */}
              <div className="bg-card p-2"> 
                <div
                  className={cn(
                    "relative overflow-hidden border-4 border-primary", // Inner frame - increased border thickness
                    "w-56 sm:w-64 md:w-72 lg:w-80", 
                    imageAspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square'
                  )}
                >
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    data-ai-hint={member.dataAiHint || "faculty member"}
                    className="object-cover"
                    sizes={imageAspectRatio === 'landscape' ? 
                      "(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px" :
                      "(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Container */}
          <div className="flex-grow p-4 md:p-6 pt-0 text-center">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">{member.name}</CardTitle>
              <CardDescription className="text-md md:text-lg text-accent font-semibold">{member.title}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed whitespace-pre-line">
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
