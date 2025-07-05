'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AdmissionFormComponent from "@/components/admissions/AdmissionForm";
import dynamic from 'next/dynamic';
import { BrainCircuit } from "lucide-react";

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

      <div className="my-8">
        <Card className="bg-secondary/20 border-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-secondary" />
              <span>Have Questions About the Form?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground/80">
              Our AI Assistant is here to help! If you have any questions about the admission process or are unsure about any of the fields in this form, just click the AI icon in the bottom-right corner of your screen.
            </p>
             <p className="text-sm text-muted-foreground mt-2 flex items-center">
              You can ask things like "What documents do I need?" or "What is the age criteria for Class 1?".
            </p>
          </CardContent>
        </Card>
      </div>

      <FloatingAIHelper />
    </div>
  );
}
