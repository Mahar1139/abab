'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const TeacherConduitForm = dynamic(() => import('@/components/teacher-conduit/TeacherConduitForm'), {
  loading: () => (
    <SectionWrapper title="Teacher Conduit (NCERT Assistant)">
      <Card className="shadow-xl max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-24" />
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  ),
  ssr: false,
});


export default function TeacherConduitPage() {
  return (
    <div className="container mx-auto py-8">
        <TeacherConduitForm />
    </div>
  );
}
