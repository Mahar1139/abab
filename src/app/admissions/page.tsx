
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, CheckCircle, CalendarDays, ClipboardEdit } from "lucide-react";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestAdmissionQuestions } from "@/ai/flows/suggest-admission-questions";
import { admissionsContent, fullAdmissionsText } from "./admission-content";
import FloatingAIHelper from "@/components/ai/FloatingAIHelper";
import AdmissionFormComponent from "@/components/admissions/AdmissionForm";
import { cn } from "@/lib/utils";

export default function AdmissionsPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Admissions at Himalaya Public School">
        <Tabs defaultValue="criteria" className="w-full flex flex-col"> {/* Added flex flex-col */}
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"> {/* Removed mb-6 */}
            <TabsTrigger
              value="criteria"
              className={cn(
                "group relative w-full rounded-lg border px-3 py-3 text-sm font-medium shadow-sm transition-all duration-150 ease-in-out",
                "flex flex-col items-center justify-center space-y-1.5 text-center h-auto",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg",
                "hover:bg-accent/90 hover:text-accent-foreground hover:border-accent",
                "text-muted-foreground border-border bg-card"
              )}
            >
              <CheckCircle className="mb-1 h-6 w-6 shrink-0 group-data-[state=active]:text-primary-foreground text-primary" />
              <span className="whitespace-normal">Admission Criteria</span>
            </TabsTrigger>
            <TabsTrigger
              value="procedure"
              className={cn(
                "group relative w-full rounded-lg border px-3 py-3 text-sm font-medium shadow-sm transition-all duration-150 ease-in-out",
                "flex flex-col items-center justify-center space-y-1.5 text-center h-auto",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg",
                "hover:bg-accent/90 hover:text-accent-foreground hover:border-accent",
                "text-muted-foreground border-border bg-card"
              )}
            >
              <ScrollText className="mb-1 h-6 w-6 shrink-0 group-data-[state=active]:text-primary-foreground text-primary" />
              <span className="whitespace-normal">Application Procedure</span>
            </TabsTrigger>
            <TabsTrigger
              value="deadlines"
              className={cn(
                "group relative w-full rounded-lg border px-3 py-3 text-sm font-medium shadow-sm transition-all duration-150 ease-in-out",
                "flex flex-col items-center justify-center space-y-1.5 text-center h-auto",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg",
                "hover:bg-accent/90 hover:text-accent-foreground hover:border-accent",
                "text-muted-foreground border-border bg-card"
              )}
            >
              <CalendarDays className="mb-1 h-6 w-6 shrink-0 group-data-[state=active]:text-primary-foreground text-primary" />
              <span className="whitespace-normal">Important Deadlines</span>
            </TabsTrigger>
            <TabsTrigger
              value="apply"
              className={cn(
                "group relative w-full rounded-lg border px-3 py-3 text-sm font-medium shadow-sm transition-all duration-150 ease-in-out",
                "flex flex-col items-center justify-center space-y-1.5 text-center h-auto",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg",
                "hover:bg-accent/90 hover:text-accent-foreground hover:border-accent",
                "text-muted-foreground border-border bg-card"
              )}
            >
              <ClipboardEdit className="mb-1 h-6 w-6 shrink-0 group-data-[state=active]:text-primary-foreground text-primary" />
              <span className="whitespace-normal">Apply Online</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="criteria" className="mt-6"> {/* Adjusted margin */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Eligibility & Criteria</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-foreground/90">
                <p>{admissionsContent.criteria}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedure" className="mt-6"> {/* Adjusted margin */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">How to Apply</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-foreground/90">
                <p>{admissionsContent.procedure}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines" className="mt-6"> {/* Adjusted margin */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Key Dates & Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-foreground/90">
                <p>{admissionsContent.deadlines}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apply" className="mt-6"> {/* Adjusted margin */}
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
