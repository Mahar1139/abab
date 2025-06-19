
import Image from 'next/image';
import type { AcademicProgram } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface ProgramCardProps {
  program: AcademicProgram;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const IconComponent = program.icon;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={program.imageUrl}
          alt={program.title}
          fill
          data-ai-hint={program.dataAiHint}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          {IconComponent && (
            <div className="p-2 bg-primary/10 rounded-md">
              <IconComponent className="w-7 h-7 text-primary" />
            </div>
          )}
          <CardTitle className="text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">{program.level}</CardTitle>
        </div>
        <CardDescription className="text-base font-semibold text-secondary">{program.title}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 flex-grow">
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          {program.description}
        </p>
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Key Subjects:</h4>
          <div className="flex flex-wrap gap-2">
            {program.keySubjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
