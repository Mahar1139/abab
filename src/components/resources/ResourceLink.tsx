import type { DownloadableResource } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import Link from 'next/link';

interface ResourceLinkProps {
  resource: DownloadableResource;
}

export default function ResourceLink({ resource }: ResourceLinkProps) {
  const IconComponent = resource.icon;
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <div className="p-3 bg-primary/10 rounded-lg">
         <IconComponent className="w-8 h-8 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl text-primary">{resource.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base text-foreground/80 leading-relaxed">
          {resource.description}
        </CardDescription>
      </CardContent>
      <div className="p-4 pt-0">
         {/* In a real app, this would be a direct download link or a page leading to it.
             For now, using a simple anchor tag.
          */}
        <Button asChild className="w-full">
          <Link href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" /> Download
          </Link>
        </Button>
      </div>
    </Card>
  );
}
