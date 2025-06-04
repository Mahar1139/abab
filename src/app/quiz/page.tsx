
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export default function QuizPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="School Quiz">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileQuestion className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl text-primary">Test Your Knowledge!</CardTitle>
            </div>
            <CardDescription>
              Welcome to the Himalaya Public School quiz. More features coming soon!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">
              This section will soon feature interactive quizzes about our school, subjects, and general knowledge.
              Stay tuned for fun and engaging challenges!
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
