
"use client";

import { useState, type FormEvent, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, BrainCircuit, HelpCircle, StopCircle, Zap, ArrowLeftCircle, ShieldBan } from 'lucide-react'; // Changed Cpu to BrainCircuit
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSchoolInformation, type SchoolInformationInput, type SchoolInformationOutput } from '@/ai/flows/school-info-flow';
import { useLanguage } from '@/context/LanguageContext';

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
const LOCAL_STORAGE_STRIKE_COUNT_KEY = "hps_abuseStrikeCount_main";
const LOCAL_STORAGE_COOLDOWN_END_TIME_KEY = "hps_cooldownEndTime_main";

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function formatRemainingTime(ms: number): string {
  if (ms <= 0) return "0s";
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export default function SchoolInfoChatbot() {
  const [question, setQuestion] = useState('');
  const [rawAnswer, setRawAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [isUnrestrictedMode, setIsUnrestrictedMode] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();

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

  const [currentAnimationDelay, setCurrentAnimationDelay] = useState(10);

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const [displaySuggestedQuestions, setDisplaySuggestedQuestions] = useState(() => shuffleArray([...initialSuggestedQuestions]));

  const [abuseStrikeCount, setAbuseStrikeCount] = useState<number>(0);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [remainingCooldownTime, setRemainingCooldownTime] = useState<string | null>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isAnyAnimationActive = isAnimatingTextBefore || isAnimatingCode || isAnimatingTextAfter;
  const isOnCooldown = cooldownEndTime !== null && Date.now() < cooldownEndTime;

  useEffect(() => {
    const storedStrikes = localStorage.getItem(LOCAL_STORAGE_STRIKE_COUNT_KEY);
    const storedCooldownEnd = localStorage.getItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY);

    if (storedStrikes) {
      setAbuseStrikeCount(parseInt(storedStrikes, 10));
    }
    if (storedCooldownEnd) {
      const endTime = parseInt(storedCooldownEnd, 10);
      if (endTime > Date.now()) {
        setCooldownEndTime(endTime);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_STRIKE_COUNT_KEY);
        localStorage.removeItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY);
        setAbuseStrikeCount(0);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STRIKE_COUNT_KEY, abuseStrikeCount.toString());
    if (cooldownEndTime) {
      localStorage.setItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY, cooldownEndTime.toString());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY);
    }
  }, [abuseStrikeCount, cooldownEndTime]);

  useEffect(() => {
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
    }
    if (isOnCooldown && cooldownEndTime) {
      const updateTimer = () => {
        const timeLeft = cooldownEndTime - Date.now();
        if (timeLeft <= 0) {
          setCooldownEndTime(null);
          setRemainingCooldownTime(null);
          setAbuseStrikeCount(0); 
          localStorage.removeItem(LOCAL_STORAGE_STRIKE_COUNT_KEY);
          localStorage.removeItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY);
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
        } else {
          setRemainingCooldownTime(formatRemainingTime(timeLeft));
        }
      };
      updateTimer(); 
      cooldownTimerRef.current = setInterval(updateTimer, 1000);
    }
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [isOnCooldown, cooldownEndTime]);


  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      });
    }
  }, []);
  
  const handleBreakResponse = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setIsAnimatingTextBefore(false);
    setIsAnimatingCode(false);
    setIsAnimatingTextAfter(false);
  }, []);

  useEffect(() => {
    return () => {
      handleBreakResponse();
    };
  }, [handleBreakResponse]);

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
    setError(null); 


    if (rawAnswer) {
      let delay = 15; 
      if (rawAnswer.length > 500) {
        delay = 5; 
      } else if (rawAnswer.length >= 150) {
        delay = 10; 
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
      
      setTextBefore(tb_full); 
      setCodeLanguage(cl_full);
      setCodeContent(cc_full); 
      setTextAfter(ta_full);   
      
      if (tb_full.length > 0) {
        setIsAnimatingTextBefore(true);
      } else if (cc_full && cc_full.length > 0) {
        setIsAnimatingCode(true);
      } else if (ta_full && ta_full.length > 0) {
        setIsAnimatingTextAfter(true);
      }
    } else {
      setTextBefore(null);
      setCodeContent(null);
      setCodeLanguage(null);
      setTextAfter(null);
    }
    scrollToBottom(); 
  }, [rawAnswer, scrollToBottom]);

  useEffect(() => {
    if (isAnimatingTextBefore && textBefore !== null) {
      if (animatedTextBefore.length < textBefore.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setAnimatedTextBefore(textBefore.substring(0, animatedTextBefore.length + 1));
          scrollToBottom();
        }, currentAnimationDelay);
      } else { 
        setIsAnimatingTextBefore(false);
        if (codeContent && codeContent.length > 0) {
          setIsAnimatingCode(true); 
        } else if (textAfter && textAfter.length > 0) {
          setIsAnimatingTextAfter(true); 
        }
      }
    }
    return () => { 
      if (animationTimeoutRef.current && isAnimatingTextBefore ) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isAnimatingTextBefore, textBefore, animatedTextBefore, codeContent, textAfter, currentAnimationDelay, scrollToBottom]);

  useEffect(() => {
    if (isAnimatingCode && codeContent !== null) {
      if (animatedCode.length < codeContent.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setAnimatedCode(codeContent.substring(0, animatedCode.length + 1));
          scrollToBottom();
        }, currentAnimationDelay);
      } else { 
        setIsAnimatingCode(false);
        if (textAfter && textAfter.length > 0) {
          setIsAnimatingTextAfter(true); 
        }
      }
    }
     return () => { 
       if (animationTimeoutRef.current && isAnimatingCode ) {
        clearTimeout(animationTimeoutRef.current);
       }
    };
  }, [isAnimatingCode, codeContent, animatedCode, textAfter, currentAnimationDelay, scrollToBottom]);

  useEffect(() => {
    if (isAnimatingTextAfter && textAfter !== null) {
      if (animatedTextAfter.length < textAfter.length) {
        animationTimeoutRef.current = setTimeout(() => {
          setAnimatedTextAfter(textAfter.substring(0, animatedTextAfter.length + 1));
          scrollToBottom();
        }, currentAnimationDelay);
      } else { 
        setIsAnimatingTextAfter(false);
      }
    }
     return () => { 
       if (animationTimeoutRef.current && isAnimatingTextAfter ) {
        clearTimeout(animationTimeoutRef.current);
       }
    };
  }, [isAnimatingTextAfter, textAfter, animatedTextAfter, currentAnimationDelay, scrollToBottom]);
  
  useEffect(() => {
    if (isLoading || error || (rawAnswer && !isAnyAnimationActive && animatedTextBefore === '' && animatedCode === '' && animatedTextAfter === '')) {
      scrollToBottom();
    }
  }, [isLoading, error, rawAnswer, isAnyAnimationActive, animatedTextBefore, animatedCode, animatedTextAfter, scrollToBottom]);


  const fetchAnswer = async (currentQuestion: string, unrestricted: boolean) => {
    if (!currentQuestion.trim() || isOnCooldown) return;
    setIsLoading(true);
    setError(null);
    setRawAnswer(null); 

    try {
      const input: SchoolInformationInput = { 
        question: currentQuestion,
        unrestrictedMode: unrestricted,
        language: language,
      };
      const result: SchoolInformationOutput = await getSchoolInformation(input);
      
      if (result.safetyBlocked) {
        const newStrikeCount = abuseStrikeCount + 1;
        setAbuseStrikeCount(newStrikeCount);

        let cooldownDurationMs = 60000; 
        if (newStrikeCount > 1) {
          cooldownDurationMs = Math.min((1 + (newStrikeCount - 1) * 5) * 60000, 24 * 60 * 60 * 1000); 
        }
        const newCooldownEndTime = Date.now() + cooldownDurationMs;
        setCooldownEndTime(newCooldownEndTime);
        setRawAnswer(result.answer || "Your query was blocked due to content policy. Interaction is temporarily disabled.");
      } else if (result.answer !== undefined && result.answer !== null) {
        const trimmedAnswer = result.answer.trim();
        const isHtmlCommentOnly = /^<!--[\s\S]*?-->$/.test(trimmedAnswer);

        if (trimmedAnswer === "" || isHtmlCommentOnly) {
          setError("The AI provided an empty or non-displayable response. Please try rephrasing your question or ask something else.");
          setRawAnswer(null);
        } else {
          setRawAnswer(result.answer); 
        }
      } else { 
        setError("The AI didn't provide an answer. Please try rephrasing your question.");
        setRawAnswer(null); 
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
    if (isOnCooldown) return;
    const currentQ = question.trim();

    if (currentQ.toLowerCase() === TEACHER_CONDUIT_PROMPT) {
      router.push('/teacher-conduit');
      setQuestion(''); 
      return;
    }

    if (currentQ.toLowerCase() === UNRESTRICTED_MODE_PROMPT) {
      setIsUnrestrictedMode(true);
      setQuestion('');
      setRawAnswer(null); 
      setError(null);
      return;
    }
    fetchAnswer(currentQ, isUnrestrictedMode);
  };
  
  const handleExitUnrestrictedMode = () => {
    setIsUnrestrictedMode(false);
    setRawAnswer(null);
    setError(null);
    setQuestion(''); 
  };

  const handleSuggestedQuestionClick = (suggestedQ: string) => {
    if (isOnCooldown) return;
    setQuestion(suggestedQ);
    setIsAutoSubmitting(true); 
    setDisplaySuggestedQuestions(shuffleArray([...initialSuggestedQuestions]));
  };

  useEffect(() => {
    if (isAutoSubmitting && question && !isLoading && !isOnCooldown) { 
      if (question.trim().toLowerCase() === UNRESTRICTED_MODE_PROMPT) {
        setIsUnrestrictedMode(true);
        setQuestion('');
        setRawAnswer(null);
        setError(null);
        setIsAutoSubmitting(false);
      } else if (question.trim().toLowerCase() === TEACHER_CONDUIT_PROMPT) {
          router.push('/teacher-conduit');
          setQuestion('');
          setIsAutoSubmitting(false);
      }
      else {
        fetchAnswer(question, isUnrestrictedMode);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [isAutoSubmitting, question, isLoading, isUnrestrictedMode, isOnCooldown]); 


  return (
    <Card className="flex flex-col h-full w-full shadow-none border-0 rounded-none bg-card">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          {isUnrestrictedMode ? <Zap className="w-6 h-6 text-orange-500" /> : <BrainCircuit className="w-6 h-6" />}
          {isUnrestrictedMode ? 'General AI Assistant' : 'HPS AI Assistant'}
        </CardTitle>
        <CardDescription>
          {isUnrestrictedMode 
            ? 'You can ask me anything! To return to school-specific info, type "#10x10" again.' 
            : 'Ask me anything about Himalaya Public School. For general queries, type "#10x10" to enter unrestricted mode.'}
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
              placeholder={isUnrestrictedMode ? 'Ask a general knowledge question...' : 'Ask about the school...'}
              className="w-full"
              disabled={isLoading || isAnyAnimationActive || isOnCooldown}
              aria-label="Your question"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Button type="submit" disabled={isLoading || !question.trim() || isAnyAnimationActive || isOnCooldown} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isAutoSubmitting ? 'Asking...' : 'Thinking...'}
                </>
              ) : (
                'Ask AI'
              )}
            </Button>
            {isAnyAnimationActive && !isLoading && (
              <Button variant="outline" size="sm" onClick={handleBreakResponse} className="w-full sm:w-auto">
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Response
              </Button>
            )}
            {isUnrestrictedMode && !isLoading && !isAnyAnimationActive && !isOnCooldown && (
              <Button variant="outline" size="sm" onClick={handleExitUnrestrictedMode} className="w-full sm:w-auto text-orange-600 border-orange-500 hover:bg-orange-50">
                <ArrowLeftCircle className="mr-2 h-4 w-4" />
                Exit General Mode
              </Button>
            )}
          </div>
        </form>

        {isOnCooldown && remainingCooldownTime && (
          <Alert variant="destructive" className="mt-4">
            <ShieldBan className="h-5 w-5" />
            <AlertTitle>Interaction Temporarily Disabled</AlertTitle>
            <AlertDescription>
              Due to content policy, further interaction is paused. Please wait: 
              <strong className="ml-1 tabular-nums">{remainingCooldownTime}</strong>.
            </AlertDescription>
          </Alert>
        )}

        {!isUnrestrictedMode && !rawAnswer && !isLoading && !error && !isOnCooldown && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2"/>
              Or try one of these:
              </h4>
            <div className="flex flex-wrap gap-2">
              {displaySuggestedQuestions.map((sq, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestionClick(sq)}
                  disabled={isLoading || isAnyAnimationActive || isOnCooldown}
                  className="text-xs"
                >
                  {sq}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div id="latest-answer-marker"> 
          {isLoading && (
            <div className="flex items-center justify-center text-muted-foreground mt-6">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              The AI is thinking...
            </div>
          )}
          {error && !isLoading && !isOnCooldown && (
            <Alert variant="destructive" className="mt-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {(rawAnswer !== null && !isLoading && !error) && (
            <>
              <h4 className="font-semibold mb-2 text-lg text-foreground mt-6">AI's Response:</h4>
              <div className="p-4 bg-secondary/10 rounded-md text-foreground/90 leading-relaxed prose max-w-none dark:prose-invert prose-p:my-2 prose-pre:bg-card prose-pre:shadow-md prose-code:font-code">
                {textBefore !== null && <div style={{ whiteSpace: 'pre-line' }}>{animatedTextBefore}</div>}
                
                { codeContent !== null && (
                  <pre className="overflow-x-auto">
                    <code className={codeLanguage ? `language-${codeLanguage}` : 'language-plaintext'}>
                      {animatedCode}
                    </code>
                  </pre>
                )}
                
                {textAfter !== null && <div style={{ whiteSpace: 'pre-line' }}>{animatedTextAfter}</div>}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

    