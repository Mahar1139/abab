
'use client';

import type { FacultyMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FacultyCardProps {
  member: FacultyMember;
  imageAspectRatio?: 'square' | 'landscape';
}

export default function FacultyCard({ member, imageAspectRatio = 'square' }: FacultyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (member.imageUrl) {
    const characterLimit = 350; // Show a preview of ~350 characters
    const isLongBio = member.bio.length > characterLimit;

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const displayedBio = isLongBio && !isExpanded 
      ? `${member.bio.substring(0, characterLimit)}...`
      : member.bio;

    // Special layout for members with an image (currently, only Director)
    return (
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-card text-card-foreground">
        <div className="flex flex-col items-center">
          {/* Image Container - Simplified structure to fix parsing error */}
          <div className="p-4 sm:p-6 md:p-8">
            <div
              className={cn(
                "relative overflow-hidden border-4 border-primary p-1 bg-border shadow-md",
                "w-64 sm:w-72 md:w-80 lg:w-96", 
                imageAspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square'
              )}
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                data-ai-hint={member.dataAiHint || "faculty member"}
                className="object-cover border-2 border-card"
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, (min-width: 640px) 288px, 256px"
              />
            </div>
          </div>

          {/* Text Content Container */}
          <div className="flex-grow p-4 md:p-6 pt-0 text-center">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">{member.name}</CardTitle>
              <CardDescription className="text-md md:text-lg text-accent font-semibold">{member.title}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed whitespace-pre-line text-left">
                {displayedBio}
              </p>
              {isLongBio && (
                <Button onClick={toggleExpand} variant="link" className="mt-2 text-accent">
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Button>
              )}
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
    
