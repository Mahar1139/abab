
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestAdmissionQuestions } from "@/ai/flows/suggest-admission-questions";
import { fullAdmissionsText } from "./admission-content";
import FloatingAIHelper from "@/components/ai/FloatingAIHelper";
import AdmissionFormComponent from "@/components/admissions/AdmissionForm";
import { useTranslation } from "@/hooks/use-translation";

export default function AdmissionsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title={t('admissionspage.title')}>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{t('admissionspage.form.title')}</CardTitle>
            <CardDescription>{t('admissionspage.form.desc')}</CardDescription>
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
        title={t('admissionspage.suggester.title')}
        description={t('admissionspage.suggester.desc')}
      />

      <FloatingAIHelper />
    </div>
  );
}
