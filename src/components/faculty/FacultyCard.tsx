
import type { FacultyMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface FacultyCardProps {
  member: FacultyMember;
}

export default function FacultyCard({ member }: FacultyCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {member.imageUrl && (
        <div className="flex justify-center py-6"> {/* Container for the circular image, with vertical padding */}
          <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border-2 border-secondary"> {/* Circular image container */}
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              data-ai-hint={member.dataAiHint}
              className="object-cover"
            />
          </div>
        </div>
      )}
      <CardHeader className={`items-center text-center px-4 md:px-6 pb-4 ${member.imageUrl ? 'pt-2 md:pt-3' : 'pt-6'}`}> {/* Conditional top padding */}
        <CardTitle className="text-xl md:text-2xl text-primary">{member.name}</CardTitle>
        <CardDescription className="text-sm text-accent font-semibold">{member.title}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 flex-grow"> {/* pt-0 to bring bio closer to header */}
        <p className="text-base text-foreground/80 leading-relaxed text-center"> {/* Centered bio */}
          {member.bio}
        </p>
      </CardContent>
    </Card>
  );
}
