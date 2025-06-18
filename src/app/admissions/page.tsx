
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
      <SectionWrapper title="Admissions at Himalaya Public School">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Online Admission Form</CardTitle>
            <CardDescription>Please fill out the form below to apply for admission to Himalaya Public School.</CardDescription>
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
        title="Questions About Admissions?"
        description="While filling the form or thinking about admissions, you might have some questions. Our AI can help suggest a few relevant ones based on general admission topics."
      />

      <FloatingAIHelper />
    </div>
  );
}
