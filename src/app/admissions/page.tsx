
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, CheckCircle, CalendarDays, ClipboardEdit } from "lucide-react";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestAdmissionQuestions } from "@/ai/flows/suggest-admission-questions";
import { admissionsContent, fullAdmissionsText } from "./admission-content";
import FloatingAIHelper from "@/components/ai/FloatingAIHelper";
import AdmissionFormComponent from "@/components/admissions/AdmissionForm";

export default function AdmissionsPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Admissions at Himalaya Public School">
        <Tabs defaultValue="criteria" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-6 gap-2">
            <TabsTrigger 
              value="criteria" 
              className="py-3 text-base whitespace-normal h-auto text-center justify-center md:text-left md:justify-start"
            >
              <CheckCircle className="mr-2 h-5 w-5 shrink-0" /> Admission Criteria
            </TabsTrigger>
            <TabsTrigger 
              value="procedure" 
              className="py-3 text-base whitespace-normal h-auto text-center justify-center md:text-left md:justify-start"
            >
              <ScrollText className="mr-2 h-5 w-5 shrink-0" /> Application Procedure
            </TabsTrigger>
            <TabsTrigger 
              value="deadlines" 
              className="py-3 text-base whitespace-normal h-auto text-center justify-center md:text-left md:justify-start"
            >
              <CalendarDays className="mr-2 h-5 w-5 shrink-0" /> Important Deadlines
            </TabsTrigger>
            <TabsTrigger 
              value="apply" 
              className="py-3 text-base whitespace-normal h-auto text-center justify-center md:text-left md:justify-start"
            >
              <ClipboardEdit className="mr-2 h-5 w-5 shrink-0" /> Apply Online
            </TabsTrigger>
          </TabsList>

          <TabsContent value="criteria">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Eligibility & Criteria</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-foreground/90">
                <p>{admissionsContent.criteria}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedure">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">How to Apply</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-foreground/90">
                <p>{admissionsContent.procedure}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Key Dates & Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-foreground/90">
                <p>{admissionsContent.deadlines}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apply">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Online Admission Form</CardTitle>
                <CardDescription>Please fill out the form below to apply for admission.</CardDescription>
              </CardHeader>
              <CardContent>
                <AdmissionFormComponent />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SectionWrapper>

      <QuestionSuggester
        contentToAnalyze={fullAdmissionsText}
        suggestionFn={suggestAdmissionQuestions}
        inputKey="admissionsInfo"
        title="Questions About Admissions?"
        description="After reviewing the admissions information, or while filling the form, you might have some questions. Our AI can help suggest a few relevant ones."
      />

      <FloatingAIHelper />
    </div>
  );
}
