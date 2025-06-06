
"use client";

import { useState, type FormEvent, useEffect, useRef } from 'react';
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
  "Write a Python function to calculate factorial.",
  "What are the core values of the school?"
];

const TEACHER_CONDUIT_PROMPT = "11x11";
const ANIMATION_DELAY = 20; // ms per character

export default function SchoolInfoChatbot() {
  const [question, setQuestion] = useState('');
  const [rawAnswer, setRawAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const router = useRouter();

  // State for parsed content and animation
  const [displayText, setDisplayText] = useState<string | null>(null);
  const [codeContent, setCodeContent] = useState<string | null>(null);
  const [codeLanguage, setCodeLanguage] = useState<string | null>(null);
  const [animatedCode, setAnimatedCode] = useState<string>('');
  const [textAfterCode, setTextAfterCode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const answerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rawAnswer) {
      // Reset states before parsing new answer
      setDisplayText(null);
      setCodeContent(null);
      setCodeLanguage(null);
      setAnimatedCode('');
      setTextAfterCode(null);
      setIsAnimating(false);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/;
      const match = rawAnswer.match(codeBlockRegex);

      if (match) {
        setDisplayText(rawAnswer.substring(0, match.index));
        setCodeLanguage(match[1] || 'plaintext');
        setCodeContent(match[2]);
        setTextAfterCode(rawAnswer.substring(match.index + match[0].length));
        setIsAnimating(true);
      } else {
        setDisplayText(rawAnswer);
      }
    }
  }, [rawAnswer]);

  useEffect(() => {
    if (isAnimating && codeContent) {
      if (animatedCode.length < codeContent.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setAnimatedCode(codeContent.substring(0, animatedCode.length + 1));
        }, ANIMATION_DELAY);
      } else {
        setIsAnimating(false); // Animation finished
      }
    }
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isAnimating, codeContent, animatedCode]);
  
  useEffect(() => {
    answerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayText, animatedCode, textAfterCode, isLoading, error]);


  const fetchAnswer = async (currentQuestion: string) => {
    if (!currentQuestion.trim()) return;

    if (currentQuestion.trim().toLowerCase() === TEACHER_CONDUIT_PROMPT) {
      router.push('/teacher-conduit');
      setIsLoading(false);
      setIsAutoSubmitting(false);
      setQuestion(''); 
      return;
    }

    setIsLoading(true);
    setError(null);
    setRawAnswer(null); // Clear previous answer parts
    setDisplayText(null);
    setCodeContent(null);
    setAnimatedCode('');
    setTextAfterCode(null);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }


    try {
      const input: SchoolInformationInput = { question: currentQuestion };
      const result: SchoolInformationOutput = await getSchoolInformation(input);
      if (result.answer) {
        setRawAnswer(result.answer);
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
    if (isAutoSubmitting && question && !isLoading) { // Ensure not to trigger if already loading
      fetchAnswer(question);
    }
  }, [isAutoSubmitting, question, isLoading]); // Added isLoading to dependency


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
        
        {isLoading && (
          <div className="mt-6 flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Thinking...
          </div>
        )}

        {error && !isLoading && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {((displayText || codeContent || textAfterCode) && !isLoading && !error) && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-lg text-foreground">Answer:</h4>
            <div className="p-4 bg-secondary/10 rounded-md text-foreground/90 leading-relaxed prose max-w-none dark:prose-invert prose-p:my-2 prose-pre:bg-card prose-pre:shadow-md prose-code:font-code">
              {displayText && <div style={{ whiteSpace: 'pre-line' }}>{displayText}</div>}
              
              {(codeContent || (animatedCode && animatedCode.length > 0)) && (
                 <pre> {/* Let prose handle pre styling, or add specific classes like "bg-muted p-4 rounded-md overflow-x-auto my-2 shadow" if needed */}
                  <code className={codeLanguage ? `language-${codeLanguage}` : 'language-plaintext'}>
                    {animatedCode}
                  </code>
                </pre>
              )}
              
              {textAfterCode && <div style={{ whiteSpace: 'pre-line' }}>{textAfterCode}</div>}
            </div>
          </div>
        )}
        <div ref={answerEndRef} />
      </CardContent>
    </Card>
  );
}

