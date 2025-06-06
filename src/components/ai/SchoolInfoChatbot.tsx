
"use client";

import { useState, type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, BrainCircuit, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSchoolInformation, type SchoolInformationInput, type SchoolInformationOutput } from '@/ai/flows/school-info-flow';

const suggestedQuestions = [
  "What is the school's mission?",
  "Tell me about the extracurricular activities.",
  "What are the office hours?",
  "Write a short story about a friendly robot.",
  "What are the core values of the school?"
];

const TEACHER_CONDUIT_PROMPT = "11x11";

export default function SchoolInfoChatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const router = useRouter();

  const fetchAnswer = async (currentQuestion: string) => {
    if (!currentQuestion.trim()) return;

    if (currentQuestion.trim().toLowerCase() === TEACHER_CONDUIT_PROMPT) {
      router.push('/teacher-conduit');
      setIsLoading(false);
      setIsAutoSubmitting(false);
      setQuestion(''); // Clear the prompt after redirection
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const input: SchoolInformationInput = { question: currentQuestion };
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
        if (e.message.includes("503") || e.message.toLowerCase().includes("overloaded")) {
          errorMessage = "The AI model is currently busy. Please try again in a few moments.";
        }
      }
      setError(errorMessage);
    }
    setIsLoading(false);
    setIsAutoSubmitting(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAnswer(question);
  };

  const handleSuggestedQuestionClick = (suggestedQ: string) => {
    setQuestion(suggestedQ);
    setIsAutoSubmitting(true); 
  };

  useEffect(() => {
    if (isAutoSubmitting && question) {
      fetchAnswer(question);
    }
  }, [isAutoSubmitting, question]);


  return (
    <Card className="flex flex-col h-full w-full shadow-none border-0 rounded-none bg-card">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <BrainCircuit className="w-6 h-6" />
          Ask Our AI Assistant
        </CardTitle>
        <CardDescription>
          Have a question about Himalaya Public School or need general help? Ask away!
          (Teachers: try prompt "11x11" for a special tool.)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (isAutoSubmitting) setIsAutoSubmitting(false); 
              }}
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
                {isAutoSubmitting ? 'Asking...' : 'Getting Answer...'}
              </>
            ) : (
              'Get Answer'
            )}
          </Button>
        </form>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <HelpCircle className="w-4 h-4 mr-2"/>
            Not sure what to ask? Try one of these:
            </h4>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((sq, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedQuestionClick(sq)}
                disabled={isLoading}
                className="text-xs"
              >
                {sq}
              </Button>
            ))}
          </div>
        </div>

        {error && !isLoading && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {answer && !isLoading && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-lg text-foreground">Answer:</h4>
            <div className="p-4 bg-secondary/20 rounded-md text-foreground/90 whitespace-pre-line leading-relaxed prose max-w-none dark:prose-invert prose-p:my-2">
              {answer}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
