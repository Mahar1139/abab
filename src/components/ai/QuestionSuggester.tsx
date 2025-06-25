
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { suggestAdmissionQuestionsAction, suggestFacultyQuestionsAction } from '@/app/ai-actions';

interface QuestionSuggesterProps {
  contentToAnalyze: string;
  suggestionType: 'admissions' | 'faculty';
  title?: string;
  description?: string;
}

export default function QuestionSuggester({
  contentToAnalyze,
  suggestionType,
  title = "Need Some Ideas?",
  description = "Let our AI suggest some relevant questions you might have."
}: QuestionSuggesterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestQuestions = async () => {
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    try {
      let result;
      if (suggestionType === 'admissions') {
        result = await suggestAdmissionQuestionsAction({ admissionsInfo: contentToAnalyze });
      } else { // 'faculty'
        result = await suggestFacultyQuestionsAction({ facultyProfilesText: contentToAnalyze });
      }
      
      const suggested = result.questions || result.suggestedQuestions;
      if (suggested && Array.isArray(suggested)) {
        setQuestions(suggested);
      } else {
        setError("Could not retrieve valid questions. The AI response might be in an unexpected format.");
        console.error("Unexpected AI response format:", result);
      }
    } catch (e) {
      console.error("Error fetching suggestions:", e);
      setError("Sorry, we couldn't generate suggestions at this time. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <Card className="my-8 shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <Lightbulb className="w-6 h-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button onClick={handleSuggestQuestions} disabled={isLoading} className="mb-4">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Suggest Questions'
          )}
        </Button>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Suggestion Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {questions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-lg text-foreground">Here are some suggestions:</h4>
            <ul className="list-disc list-inside space-y-2 text-foreground/90">
              {questions.map((q, index) => (
                <li key={index} className="p-2 bg-secondary/30 rounded-md">{q}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
