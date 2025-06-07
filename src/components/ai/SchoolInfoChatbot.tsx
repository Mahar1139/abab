
"use client";

import { useState, type FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, BrainCircuit, HelpCircle, StopCircle, Zap, ArrowLeftCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSchoolInformation, type SchoolInformationInput, type SchoolInformationOutput } from '@/ai/flows/school-info-flow';

const initialSuggestedQuestions = [
  "What is the school's mission?",
  "Tell me about the extracurricular activities.",
  "What are the office hours?",
  "Write a Python function to calculate factorial.",
  "Make a simple text adventure game in Python.",
  "What are the core values of the school?"
];

const TEACHER_CONDUIT_PROMPT = "11x11";
const UNRESTRICTED_MODE_PROMPT = "#10x10";

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function SchoolInfoChatbot() {
  const [question, setQuestion] = useState('');
  const [rawAnswer, setRawAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [isUnrestrictedMode, setIsUnrestrictedMode] = useState(false);
  const router = useRouter();

  const [textBefore, setTextBefore] = useState<string | null>(null);
  const [codeContent, setCodeContent] = useState<string | null>(null);
  const [codeLanguage, setCodeLanguage] = useState<string | null>(null);
  const [textAfter, setTextAfter] = useState<string | null>(null);

  const [animatedTextBefore, setAnimatedTextBefore] = useState<string>('');
  const [animatedCode, setAnimatedCode] = useState<string>('');
  const [animatedTextAfter, setAnimatedTextAfter] = useState<string>('');

  const [isAnimatingTextBefore, setIsAnimatingTextBefore] = useState(false);
  const [isAnimatingCode, setIsAnimatingCode] = useState(false);
  const [isAnimatingTextAfter, setIsAnimatingTextAfter] = useState(false);

  const [currentAnimationDelay, setCurrentAnimationDelay] = useState(10); // Default delay

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestAnswerRef = useRef<HTMLDivElement>(null);

  const [displaySuggestedQuestions, setDisplaySuggestedQuestions] = useState(() => shuffleArray([...initialSuggestedQuestions]));

  useEffect(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setAnimatedTextBefore('');
    setAnimatedCode('');
    setAnimatedTextAfter('');
    setIsAnimatingTextBefore(false);
    setIsAnimatingCode(false);
    setIsAnimatingTextAfter(false);

    if (rawAnswer) {
      let delay = 15; // Slower for very short answers
      if (rawAnswer.length > 500) {
        delay = 5; // Faster for long answers
      } else if (rawAnswer.length >= 150) {
        delay = 10; // Medium speed
      }
      setCurrentAnimationDelay(delay);

      const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/;
      const match = rawAnswer.match(codeBlockRegex);

      let tb_full = rawAnswer;
      let cc_full: string | null = null;
      let cl_full: string | null = null;
      let ta_full: string | null = null;

      if (match && match.index !== undefined) {
        tb_full = rawAnswer.substring(0, match.index);
        cl_full = match[1] || 'plaintext';
        cc_full = match[2];
        ta_full = rawAnswer.substring(match.index + match[0].length);
      }
      
      setTextBefore(tb_full || null);
      setCodeLanguage(cl_full);
      setCodeContent(cc_full);
      setTextAfter(ta_full || null);

      if (tb_full && tb_full.trim().length > 0) {
        setIsAnimatingTextBefore(true);
      } else if (cc_full) {
        setIsAnimatingCode(true);
      } else if (ta_full && ta_full.trim().length > 0) {
        setIsAnimatingTextAfter(true);
      } else if (rawAnswer) { 
        setIsAnimatingTextBefore(true); 
      }
    } else {
      setTextBefore(null);
      setCodeContent(null);
      setCodeLanguage(null);
      setTextAfter(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawAnswer]);

  useEffect(() => {
    if (isAnimatingTextBefore && textBefore) {
      if (animatedTextBefore.length < textBefore.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setAnimatedTextBefore(textBefore.substring(0, animatedTextBefore.length + 1));
        }, currentAnimationDelay);
      } else { 
        setIsAnimatingTextBefore(false);
        if (codeContent) {
          setIsAnimatingCode(true); 
        } else if (textAfter && textAfter.trim().length > 0) {
          setIsAnimatingTextAfter(true); 
        }
      }
    }
    return () => { 
      if (animationTimeoutRef.current && (isAnimatingTextBefore || (textBefore && animatedTextBefore.length < textBefore.length) ) ) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimatingTextBefore, textBefore, animatedTextBefore, codeContent, textAfter, currentAnimationDelay]);

  useEffect(() => {
    if (isAnimatingCode && codeContent) {
      if (animatedCode.length < codeContent.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setAnimatedCode(codeContent.substring(0, animatedCode.length + 1));
        }, currentAnimationDelay);
      } else { 
        setIsAnimatingCode(false);
        if (textAfter && textAfter.trim().length > 0) {
          setIsAnimatingTextAfter(true); 
        }
      }
    }
     return () => { 
       if (animationTimeoutRef.current && (isAnimatingCode || (codeContent && animatedCode.length < codeContent.length))) {
        clearTimeout(animationTimeoutRef.current);
       }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimatingCode, codeContent, animatedCode, textAfter, currentAnimationDelay]);

  useEffect(() => {
    if (isAnimatingTextAfter && textAfter) {
      if (animatedTextAfter.length < textAfter.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setAnimatedTextAfter(textAfter.substring(0, animatedTextAfter.length + 1));
        }, currentAnimationDelay);
      } else { 
        setIsAnimatingTextAfter(false);
      }
    }
     return () => { 
       if (animationTimeoutRef.current && (isAnimatingTextAfter || (textAfter && animatedTextAfter.length < textAfter.length))) {
        clearTimeout(animationTimeoutRef.current);
       }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimatingTextAfter, textAfter, animatedTextAfter, currentAnimationDelay]);
  
  useEffect(() => {
    if (latestAnswerRef.current) {
      latestAnswerRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [animatedTextBefore, animatedCode, animatedTextAfter]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      setIsAnimatingTextBefore(false);
      setIsAnimatingCode(false);
      setIsAnimatingTextAfter(false);
    };
  }, []);


  const fetchAnswer = async (currentQuestion: string, unrestricted: boolean) => {
    if (!currentQuestion.trim()) return;
    setIsLoading(true);
    setError(null);
    setRawAnswer(null); 

    try {
      const input: SchoolInformationInput = { 
        question: currentQuestion,
        unrestrictedMode: unrestricted
      };
      const result: SchoolInformationOutput = await getSchoolInformation(input);
      if (result.answer !== undefined && result.answer !== null) { 
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
      setRawAnswer(null); 
    }
    setIsLoading(false);
    setIsAutoSubmitting(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentQ = question.trim();

    if (currentQ.toLowerCase() === TEACHER_CONDUIT_PROMPT) {
      router.push('/teacher-conduit');
      setQuestion(''); 
      return;
    }

    if (currentQ.toLowerCase() === UNRESTRICTED_MODE_PROMPT) {
      setIsUnrestrictedMode(true);
      setQuestion('');
      setRawAnswer(null); // Clear previous answer
      setError(null);
      return;
    }
    fetchAnswer(currentQ, isUnrestrictedMode);
  };
  
  const handleExitUnrestrictedMode = () => {
    setIsUnrestrictedMode(false);
    setRawAnswer(null);
    setError(null);
    setQuestion(''); // Optionally clear the question
  };

  const handleSuggestedQuestionClick = (suggestedQ: string) => {
    setQuestion(suggestedQ);
    setIsAutoSubmitting(true); 
    setDisplaySuggestedQuestions(shuffleArray([...initialSuggestedQuestions]));
  };

  useEffect(() => {
    if (isAutoSubmitting && question && !isLoading) { 
      if (question.trim().toLowerCase() === UNRESTRICTED_MODE_PROMPT) {
        setIsUnrestrictedMode(true);
        setQuestion('');
        setRawAnswer(null);
        setError(null);
        setIsAutoSubmitting(false);
      } else {
        fetchAnswer(question, isUnrestrictedMode);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoSubmitting, question, isLoading, isUnrestrictedMode]);

  const isAnyAnimationActive = isAnimatingTextBefore || isAnimatingCode || isAnimatingTextAfter;

  const handleBreakResponse = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setIsAnimatingTextBefore(false);
    setIsAnimatingCode(false);
    setIsAnimatingTextAfter(false);
  };


  return (
    <Card className="flex flex-col h-full w-full shadow-none border-0 rounded-none bg-card">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          {isUnrestrictedMode ? <Zap className="w-6 h-6 text-orange-500" /> : <BrainCircuit className="w-6 h-6" />}
          {isUnrestrictedMode ? "Unrestricted AI Mode" : "Ask Our AI Assistant"}
        </CardTitle>
        <CardDescription>
          {isUnrestrictedMode 
            ? "You're in unrestricted mode. Ask anything! Click 'Exit Unrestricted Mode' to return."
            : "Have a question about Himalaya Public School or need general help? Ask away! (Teachers: try prompt \"11x11\". For general Q&A try \"#10x10\".)"}
        </CardDescription>
      </CardHeader>
      <CardContent 
        ref={chatContainerRef} 
        className="flex-grow overflow-y-auto overflow-x-hidden p-6 space-y-4"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (isAutoSubmitting) setIsAutoSubmitting(false); 
              }}
              placeholder={isUnrestrictedMode ? "Ask any general question..." : "e.g., What is the school's mission?"}
              className="w-full"
              disabled={isLoading || isAnyAnimationActive}
              aria-label="Your question"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Button type="submit" disabled={isLoading || !question.trim() || isAnyAnimationActive} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isAutoSubmitting ? 'Asking...' : 'Getting Answer...'}
                </>
              ) : (
                'Get Answer'
              )}
            </Button>
            {isAnyAnimationActive && !isLoading && (
              <Button variant="outline" size="sm" onClick={handleBreakResponse} className="w-full sm:w-auto">
                <StopCircle className="mr-2 h-4 w-4" />
                Break Response
              </Button>
            )}
            {isUnrestrictedMode && !isLoading && !isAnyAnimationActive && (
              <Button variant="outline" size="sm" onClick={handleExitUnrestrictedMode} className="w-full sm:w-auto text-orange-600 border-orange-500 hover:bg-orange-50">
                <ArrowLeftCircle className="mr-2 h-4 w-4" />
                Exit Unrestricted Mode
              </Button>
            )}
          </div>
        </form>

        {!isUnrestrictedMode && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2"/>
              Not sure what to ask? Try one of these:
              </h4>
            <div className="flex flex-wrap gap-2">
              {displaySuggestedQuestions.map((sq, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestionClick(sq)}
                  disabled={isLoading || isAnyAnimationActive}
                  className="text-xs"
                >
                  {sq}
                </Button>
              ))}
            </div>
          </div>
        )}
        
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
        
        {(rawAnswer !== null && !isLoading && !error) && (
          <div className="mt-6" ref={latestAnswerRef}>
            <h4 className="font-semibold mb-2 text-lg text-foreground">Answer:</h4>
            <div className="p-4 bg-secondary/10 rounded-md text-foreground/90 leading-relaxed prose max-w-none dark:prose-invert prose-p:my-2 prose-pre:bg-card prose-pre:shadow-md prose-code:font-code">
              {animatedTextBefore && <div style={{ whiteSpace: 'pre-line' }}>{animatedTextBefore}</div>}
              
              { (codeContent || animatedCode.length > 0) && (
                 <pre className="overflow-x-auto">
                  <code className={codeLanguage ? `language-${codeLanguage}` : 'language-plaintext'}>
                    {animatedCode}
                  </code>
                </pre>
              )}
              
              {animatedTextAfter && <div style={{ whiteSpace: 'pre-line' }}>{animatedTextAfter}</div>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

