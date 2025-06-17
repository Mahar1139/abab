
import Image from 'next/image';
import type { FacultyMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle2 } from 'lucide-react';

interface FacultyCardProps {
  member: FacultyMember;
}

export default function FacultyCard({ member }: FacultyCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="items-center p-4 md:p-6 bg-secondary/30">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary mb-3">
          <Image 
            src={member.imageUrl} 
            alt={member.name} 
            fill
            data-ai-hint={member.dataAiHint || "portrait professional"}
            className="object-cover"
          />
        </div>
        <CardTitle className="text-xl md:text-2xl text-primary text-center">{member.name}</CardTitle>
        <CardDescription className="text-sm text-accent text-center font-semibold">{member.title}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 flex-grow">
        <p className="text-base text-foreground/80 leading-relaxed">
          {member.bio}
        </p>
      </CardContent>
    </Card>
  );
}
