
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from '@/hooks/use-translation';

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
  title,
  description
}: QuestionSuggesterProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const displayTitle = title || t('ai.suggester.title');
  const displayDescription = description || t('ai.suggester.desc');

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
      setError(t('ai.suggester.error.desc'));
    }
    setIsLoading(false);
  };

  return (
    <Card className="my-8 shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <Lightbulb className="w-6 h-6" />
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{displayDescription}</p>
        <Button onClick={handleSuggestQuestions} disabled={isLoading} className="mb-4">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('ai.suggester.button.generating')}
            </>
          ) : (
            t('ai.suggester.button.default')
          )}
        </Button>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>{t('ai.suggester.error.title')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {questions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-lg text-foreground">{t('ai.suggester.results.title')}</h4>
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
