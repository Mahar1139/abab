
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, BrainCircuit } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSchoolInformation, type SchoolInformationInput, type SchoolInformationOutput } from '@/ai/flows/school-info-flow';

export default function SchoolInfoChatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskQuestion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const input: SchoolInformationInput = { question };
      const result: SchoolInformationOutput = await getSchoolInformation(input);
      if (result.answer) {
        setAnswer(result.answer);
      } else {
        setError("The AI didn't provide an answer. Please try rephrasing your question.");
      }
    } catch (e) {
      console.error("Error fetching school information:", e);
      let errorMessage = "An error occurred while trying to get information. Please try again later.";
      if (e instanceof Error) {
        // Check for specific Genkit/Gemini error messages if needed
        // For now, a generic message based on e.message might be too technical
      }
      setError(errorMessage);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg bg-card w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <BrainCircuit className="w-6 h-6" />
          Ask About Our School
        </CardTitle>
        <CardDescription>
          Have a question about Himalaya Public School? Ask our AI assistant!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAskQuestion} className="space-y-4">
          <div>
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What is the school's mission?"
              className="w-full"
              disabled={isLoading}
              aria-label="Your question about the school"
            />
          </div>
          <Button type="submit" disabled={isLoading || !question.trim()} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Asking...
              </>
            ) : (
              'Get Answer'
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {answer && !isLoading && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-lg text-foreground">Answer:</h4>
            <div className="p-3 bg-secondary/30 rounded-md text-foreground/90 whitespace-pre-line">
              {answer}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
