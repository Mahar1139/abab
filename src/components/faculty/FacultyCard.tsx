
import type { FacultyMember } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FacultyCardProps {
  member: FacultyMember;
}

export default function FacultyCard({ member }: FacultyCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="items-center p-4 md:p-6 bg-secondary/30">
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
