
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestAdmissionQuestions } from "@/ai/flows/suggest-admission-questions";
import { fullAdmissionsText } from "./admission-content";
import FloatingAIHelper from "@/components/ai/FloatingAIHelper";
import AdmissionFormComponent from "@/components/admissions/AdmissionForm";

export default function AdmissionsPage() {
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
        suggestionFn={suggestAdmissionQuestions}
        inputKey="admissionsInfo"
        title="Have Questions?"
        description="Based on the admissions info, you might want to ask..."
      />

      <FloatingAIHelper />
    </div>
  );
}
