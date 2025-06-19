
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
        <div className="p-3 bg-primary text-primary-foreground rounded-full mb-3">
          <UserCircle2 className="w-10 h-10 md:w-12 md:h-12" />
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
