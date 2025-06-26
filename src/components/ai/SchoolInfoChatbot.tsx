
"use client";

import { useState, type FormEvent, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, BrainCircuit, HelpCircle, Zap, ArrowLeftCircle, ShieldBan } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { askSchoolAI } from '@/app/ai-actions';
import type { SchoolInformationInput, SchoolInformationOutput } from '@/ai/flows/school-info-flow';
import { useLanguage } from '@/context/LanguageContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [isUnrestrictedMode, setIsUnrestrictedMode] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const { language } = useLanguage();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const [displaySuggestedQuestions, setDisplaySuggestedQuestions] = useState<string[]>([]);

  const [abuseStrikeCount, setAbuseStrikeCount] = useState<number>(0);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [remainingCooldownTime, setRemainingCooldownTime] = useState<string | null>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isOnCooldown = cooldownEndTime !== null && Date.now() < cooldownEndTime;

  useEffect(() => {
    // Shuffling questions on client side to avoid hydration mismatch
    setDisplaySuggestedQuestions(shuffleArray([...initialSuggestedQuestions]));
    
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

  useEffect(() => {
    scrollToBottom();
  }, [isLoading, error, answer, scrollToBottom]);

  const fetchAnswer = useCallback(async (currentQuestion: string, unrestricted: boolean) => {
    if (!currentQuestion.trim() || isOnCooldown) return;
    setIsLoading(true);
    setError(null);
    setAnswer(null); 

    try {
      const input: SchoolInformationInput = { 
        question: currentQuestion,
        unrestrictedMode: unrestricted,
        language: language,
      };
      const result: SchoolInformationOutput = await askSchoolAI(input);
      
      // Handle action first
      if (result.action) {
        if (result.action.type === 'navigate' && typeof result.action.payload === 'string') {
          router.push(result.action.payload);
        } else if (result.action.type === 'set_theme' && typeof result.action.payload === 'string') {
          setTheme(result.action.payload);
        }
      }

      if (result.safetyBlocked) {
        const newStrikeCount = abuseStrikeCount + 1;
        setAbuseStrikeCount(newStrikeCount);

        let cooldownDurationMs = 60000; 
        if (newStrikeCount > 1) {
          cooldownDurationMs = Math.min((1 + (newStrikeCount - 1) * 5) * 60000, 24 * 60 * 60 * 1000); 
        }
        const newCooldownEndTime = Date.now() + cooldownDurationMs;
        setCooldownEndTime(newCooldownEndTime);
        setAnswer(result.answer || "Your query was blocked due to content policy. Interaction is temporarily disabled.");
      } else if (result.answer !== undefined && result.answer !== null) {
        const trimmedAnswer = result.answer.trim();
        const isHtmlCommentOnly = /^<!--[\s\S]*?-->$/.test(trimmedAnswer);

        if (trimmedAnswer === "" || isHtmlCommentOnly) {
          if (!result.action) {
            setError("The AI provided an empty or non-displayable response. Please try rephrasing your question or ask something else.");
          }
          setAnswer(null);
        } else {
          setAnswer(result.answer); 
        }
      } else if (!result.action) {
        setError("The AI didn't provide an answer. Please try rephrasing your question.");
        setAnswer(null); 
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
      setAnswer(null); 
    }
    setIsLoading(false);
    setIsAutoSubmitting(false);
  }, [abuseStrikeCount, language, router, setTheme, isOnCooldown]);

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
      setAnswer(null); 
      setError(null);
      return;
    }
    fetchAnswer(currentQ, isUnrestrictedMode);
  };
  
  const handleExitUnrestrictedMode = () => {
    setIsUnrestrictedMode(false);
    setAnswer(null);
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
        setAnswer(null);
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
  }, [isAutoSubmitting, question, isLoading, isUnrestrictedMode, isOnCooldown, fetchAnswer, router]); 


  return (
    <Card className="flex flex-col h-full w-full shadow-none border-0 bg-transparent backdrop-blur-xl">
      <CardHeader className="border-b border-white/20">
        <CardTitle className="flex items-center gap-2 text-xl text-primary-foreground">
          {isUnrestrictedMode ? <Zap className="w-6 h-6 text-orange-300" /> : <BrainCircuit className="w-6 h-6" />}
          {isUnrestrictedMode ? 'General AI Assistant' : 'HPS AI Assistant'}
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          {isUnrestrictedMode ? 'You can ask me anything! To return to school-specific info, type "#10x10" again.' : 'Ask me anything about Himalaya Public School.'}
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
              className="w-full bg-black/20 text-white placeholder:text-white/60 border-white/30 focus-visible:ring-offset-black/30 focus-visible:ring-accent"
              disabled={isLoading || isOnCooldown}
              aria-label="Your question"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Button type="submit" disabled={isLoading || !question.trim() || isOnCooldown} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isAutoSubmitting ? 'Asking...' : 'Thinking...'}
                </>
              ) : (
                'Ask AI'
              )}
            </Button>
            {isUnrestrictedMode && !isLoading && !isOnCooldown && (
              <Button variant="outline" size="sm" onClick={handleExitUnrestrictedMode} className="w-full sm:w-auto text-orange-300 border-orange-400 hover:bg-orange-400/20 hover:text-orange-200">
                <ArrowLeftCircle className="mr-2 h-4 w-4" />
                Exit General Mode
              </Button>
            )}
          </div>
        </form>

        {isOnCooldown && remainingCooldownTime && (
          <Alert variant="destructive" className="mt-4 bg-yellow-500/20 border-yellow-400 text-yellow-100">
            <ShieldBan className="h-5 w-5 text-yellow-300" />
            <AlertTitle>Interaction Temporarily Disabled</AlertTitle>
            <AlertDescription>
              Due to content policy, further interaction is paused. Please wait: 
              <strong className="ml-1 tabular-nums">{remainingCooldownTime}</strong>.
            </AlertDescription>
          </Alert>
        )}

        {!isUnrestrictedMode && !answer && !isLoading && !error && !isOnCooldown && displaySuggestedQuestions.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-white/70 mb-2 flex items-center">
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
                  disabled={isLoading || isOnCooldown}
                  className="text-xs text-white/90 bg-white/5 border-white/20 hover:bg-white/10"
                >
                  {sq}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div id="latest-answer-marker"> 
          {isLoading && (
            <div className="flex items-center justify-center text-white/70 mt-6">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              The AI is thinking...
            </div>
          )}
          {error && !isLoading && !isOnCooldown && (
            <Alert variant="destructive" className="mt-6 bg-red-500/20 border-red-400 text-red-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {(answer !== null && !isLoading && !error) && (
            <>
              <h4 className="font-semibold mb-2 text-lg text-white mt-6">AI's Response:</h4>
              <div className="prose prose-sm md:prose-base max-w-none 
                              prose-headings:text-white/90 prose-p:text-white/80 
                              prose-strong:text-white prose-a:text-accent hover:prose-a:text-accent/80
                              prose-blockquote:text-white/70 prose-blockquote:border-accent
                              prose-code:text-cyan-300 prose-code:before:content-[''] prose-code:after:content-[''] prose-code:font-mono
                              prose-li:marker:text-white/80
              ">
                <ReactMarkdown
                    children={answer}
                    components={{
                        code(props) {
                            const {children, className, ...rest} = props;
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={vscDarkPlus}
                                    wrapLines={true}
                                    wrapLongLines={true}
                                />
                            ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
