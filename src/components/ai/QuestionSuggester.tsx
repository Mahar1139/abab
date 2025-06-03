"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface QuestionSuggesterProps {
  contentToAnalyze: string;
  suggestionFn: (input: any) => Promise<{ questions?: string[], suggestedQuestions?: string[] }>; // Adjusted to match AI flow output
  inputKey: string;
  title?: string;
  description?: string;
}

export default function QuestionSuggester({
  contentToAnalyze,
  suggestionFn,
  inputKey,
  title = "Need Help Framing Questions?",
  description = "Based on the information provided, here are some questions you might consider asking:"
}: QuestionSuggesterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestQuestions = async () => {
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    try {
      const input = { [inputKey]: contentToAnalyze };
      const result = await suggestionFn(input);
      // The AI flow might return questions under 'questions' or 'suggestedQuestions' key
      const suggested = result.questions || result.suggestedQuestions;
      if (suggested && Array.isArray(suggested)) {
        setQuestions(suggested);
      } else {
        setError("Could not retrieve valid questions. The AI response might be in an unexpected format.");
        console.error("Unexpected AI response format:", result);
      }
    } catch (e) {
      console.error("Error fetching suggestions:", e);
      setError("An error occurred while generating questions. Please try again.");
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
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {questions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-lg text-foreground">Suggested Questions:</h4>
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
