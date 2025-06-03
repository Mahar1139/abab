import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, CheckCircle, CalendarDays } from "lucide-react";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestAdmissionQuestions } from "@/ai/flows/suggest-admission-questions";
import { admissionsContent, fullAdmissionsText } from "./admission-content";

export default function AdmissionsPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Admissions at Himalaya Public School">
        <Tabs defaultValue="criteria" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6 gap-2 md:gap-0">
            <TabsTrigger value="criteria" className="py-3 text-base">
              <CheckCircle className="mr-2 h-5 w-5" /> Admission Criteria
            </TabsTrigger>
            <TabsTrigger value="procedure" className="py-3 text-base">
              <ScrollText className="mr-2 h-5 w-5" /> Application Procedure
            </TabsTrigger>
            <TabsTrigger value="deadlines" className="py-3 text-base">
              <CalendarDays className="mr-2 h-5 w-5" /> Important Deadlines
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
        </Tabs>
      </SectionWrapper>

      <QuestionSuggester
        contentToAnalyze={fullAdmissionsText}
        suggestionFn={suggestAdmissionQuestions}
        inputKey="admissionsInfo"
        title="Questions About Admissions?"
        description="After reviewing the admissions information, you might have some questions. Our AI can help suggest a few relevant ones to ask."
      />
    </div>
  );
}
