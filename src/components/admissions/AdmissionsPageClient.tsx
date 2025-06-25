
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AdmissionFormComponent from "@/components/admissions/AdmissionForm";
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const QuestionSuggester = dynamic(() => import('@/components/ai/QuestionSuggester'), {
  loading: () => (
    <div className="my-8 p-4">
      <Skeleton className="h-10 w-1/3 mb-4" />
      <Skeleton className="h-6 w-2/3 mb-4" />
      <Skeleton className="h-10 w-48" />
    </div>
  ),
  ssr: false
});

const FloatingAIHelper = dynamic(() => import('@/components/ai/FloatingAIHelper'), { ssr: false });

interface AdmissionsPageClientProps {
  fullAdmissionsText: string;
}

export default function AdmissionsPageClient({ fullAdmissionsText }: AdmissionsPageClientProps) {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Admissions">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Online Admission Application</CardTitle>
            <CardDescription>Please fill out the form below to begin the admission process. All fields marked with * are required.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdmissionFormComponent />
          </CardContent>
        </Card>
      </SectionWrapper>

      <QuestionSuggester
        contentToAnalyze={fullAdmissionsText}
        suggestionType="admissions"
        title="Have Questions?"
        description="Based on the admissions info, you might want to ask..."
      />

      <FloatingAIHelper />
    </div>
  );
}
