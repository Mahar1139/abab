'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Card, CardHeader } from '@/components/ui/card';

const QuizComponent = dynamic(() => import('@/components/quiz/QuizComponent'), {
  loading: () => (
    <div className="container mx-auto py-8">
        <SectionWrapper title="AI Quiz Challenge">
            <Card className="shadow-xl">
                <CardHeader>
                    <Skeleton className="h-10 w-1/2 mb-2" />
                    <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <div className="min-h-[400px] p-6 flex flex-col items-center justify-center">
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-8 w-48" />
                </div>
            </Card>
        </SectionWrapper>
    </div>
  ),
  ssr: false, 
});

export default function QuizPage() {
  return <QuizComponent />;
}
