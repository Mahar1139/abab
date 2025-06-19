
"use client";

import { useState, useRef, useEffect, type FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetDescription } from '@/components/ui/sheet';
import { Send, User, Loader2, MessageSquare, Zap, ShieldBan, Cpu } from 'lucide-react'; // Changed Brain to Cpu
import { getSchoolInformation, type SchoolInformationInput, type SchoolInformationOutput } from '@/ai/flows/school-info-flow';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isError?: boolean;
  isCooldownMessage?: boolean;
}

const TEACHER_CONDUIT_PROMPT_FLOAT = "11x11";
const UNRESTRICTED_MODE_PROMPT_FLOAT = "#10x10";
const LOCAL_STORAGE_STRIKE_COUNT_KEY_FLOAT = "hps_abuseStrikeCount_float";
const LOCAL_STORAGE_COOLDOWN_END_TIME_KEY_FLOAT = "hps_cooldownEndTime_float";


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


export default function FloatingAIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUnrestrictedMode, setIsUnrestrictedMode] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [abuseStrikeCount, setAbuseStrikeCount] = useState<number>(0);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [remainingCooldownTime, setRemainingCooldownTime] = useState<string | null>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isOnCooldown = cooldownEndTime !== null && Date.now() < cooldownEndTime;

  const initialGreeting = "Greetings! Step into the world of Himalaya Public School with your dedicated AI companion. Whether you're curious about our innovative programs, the admissions journey, our vibrant school life, or need a hand with general knowledge or coding challenges, I'm here to illuminate your path. How may I assist you in your exploration today?";
  
  useEffect(() => {
    const storedStrikes = localStorage.getItem(LOCAL_STORAGE_STRIKE_COUNT_KEY_FLOAT);
    const storedCooldownEnd = localStorage.getItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY_FLOAT);

    if (storedStrikes) setAbuseStrikeCount(parseInt(storedStrikes, 10));
    if (storedCooldownEnd) {
      const endTime = parseInt(storedCooldownEnd, 10);
      if (endTime > Date.now()) {
        setCooldownEndTime(endTime);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_STRIKE_COUNT_KEY_FLOAT);
        localStorage.removeItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY_FLOAT);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STRIKE_COUNT_KEY_FLOAT, abuseStrikeCount.toString());
    if (cooldownEndTime) {
      localStorage.setItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY_FLOAT, cooldownEndTime.toString());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY_FLOAT);
    }
  }, [abuseStrikeCount, cooldownEndTime]);

    useEffect(() => {
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    if (isOnCooldown && cooldownEndTime) {
      const updateTimer = () => {
        const timeLeft = cooldownEndTime - Date.now();
        if (timeLeft <= 0) {
          setCooldownEndTime(null);
          setRemainingCooldownTime(null);
          setAbuseStrikeCount(0);
          localStorage.removeItem(LOCAL_STORAGE_STRIKE_COUNT_KEY_FLOAT);
          localStorage.removeItem(LOCAL_STORAGE_COOLDOWN_END_TIME_KEY_FLOAT);
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
           setMessages((prev) => [...prev, { id: `cooldown-over-${Date.now()}`, text: "Your interaction cooldown has ended. You can ask questions again.", sender: 'ai'}]);
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


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'initial-greeting', text: initialGreeting, sender: 'ai' }]);
    }
  }, [isOpen, messages.length, initialGreeting]);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
        requestAnimationFrame(() => {
            if(scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
            }
        });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const userMessageText = inputValue.trim();
    if (!userMessageText || isLoading || isOnCooldown) return;

    if (userMessageText.toLowerCase() === TEACHER_CONDUIT_PROMPT_FLOAT) {
      router.push('/teacher-conduit');
      setInputValue('');
      setIsOpen(false); 
      return;
    }

    if (userMessageText.toLowerCase() === UNRESTRICTED_MODE_PROMPT_FLOAT) {
      setIsUnrestrictedMode(!isUnrestrictedMode); 
      const modeMessage = !isUnrestrictedMode ? "Unrestricted mode enabled. Ask anything!" : "Switched back to School Assistant mode.";
      setMessages(prev => [...prev, 
        { id: `user-${Date.now()}`, text: userMessageText, sender: 'user' },
        { id: `mode-switch-${Date.now()}`, text: modeMessage, sender: 'ai' }
      ]);
      setInputValue('');
      return;
    }

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const input: SchoolInformationInput = { 
        question: userMessageText,
        unrestrictedMode: isUnrestrictedMode
      };
      const result: SchoolInformationOutput = await getSchoolInformation(input);
      
      let aiResponseText = result.answer;
      let safetyBlocked = result.safetyBlocked;

      if (safetyBlocked) {
        const newStrikeCount = abuseStrikeCount + 1;
        setAbuseStrikeCount(newStrikeCount);
        let cooldownDurationMs = 60000; 
        if (newStrikeCount > 1) {
          cooldownDurationMs = Math.min((1 + (newStrikeCount - 1) * 5) * 60000, 24 * 60 * 60 * 1000); 
        }
        const newCooldownEndTime = Date.now() + cooldownDurationMs;
        setCooldownEndTime(newCooldownEndTime);
        aiResponseText = result.answer || "Your query was blocked due to content policy. Interaction is temporarily disabled.";
         setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, text: aiResponseText!, sender: 'ai', isCooldownMessage: true }]);

      } else if (aiResponseText && aiResponseText.trim() !== "") {
         setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, text: aiResponseText, sender: 'ai' }]);
      } else {
        const emptyResponseMessage = "The AI didn't provide a specific answer to this query. Please try rephrasing or ask something else.";
        setMessages((prev) => [...prev, { id: `ai-empty-${Date.now()}`, text: emptyResponseMessage, sender: 'ai', isError: true }]);
      }

    } catch (error) {
      console.error("Error calling AI assistant:", error);
      const errorMessageText = "Sorry, I encountered an error. Please try again. If the problem persists, the AI model might be temporarily unavailable.";
      setMessages((prev) => [...prev, { id: `error-${Date.now()}`, text: errorMessageText, sender: 'ai', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-50
                  h-16 w-16 rounded-full p-1 
                  bg-gradient-to-r from-purple-600 via-blue-900 to-orange-500
                  bg-[length:200%_200%] animate-gradient-slide
                  flex items-center justify-center shadow-2xl"
      >
        <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
          <SheetTrigger asChild>
            <Button
              variant="default" 
              size="icon"
              className="relative h-14 w-14 rounded-full shadow-xl flex items-center justify-center overflow-hidden p-0"
              aria-label="Open AI Helper"
            >
              <div 
                className="absolute inset-0 w-full h-full rounded-full
                           bg-gradient-to-r from-pink-500 via-purple-600 through-cyan-400 to-green-400 
                           bg-[length:250%_250%] animate-gradient-slide
                           flex items-center justify-center" 
              >
                <Cpu className="h-7 w-7 text-white" /> {/* Changed Brain to Cpu */}
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="flex items-center gap-2 text-primary">
                {isUnrestrictedMode ? <Zap className="h-6 w-6 text-orange-500" /> : <Cpu className="h-6 w-6" />} {/* Changed Brain to Cpu */}
                {isUnrestrictedMode ? "Unrestricted AI" : "AI Helper"}
              </SheetTitle>
              <SheetDescription className="text-xs">
                {isUnrestrictedMode ? "Ask any general question." : "Ask about the school or general topics."}
              </SheetDescription>
            </SheetHeader>
            
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-end gap-2 text-sm",
                      msg.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.sender === 'ai' && (
                      <Cpu className={cn("h-6 w-6 shrink-0 mb-1", isUnrestrictedMode && msg.sender === 'ai' ? "text-orange-500" : "text-primary")} /> // Changed Brain to Cpu
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 shadow",
                        msg.sender === 'user'
                          ? "bg-primary text-primary-foreground"
                          : msg.isError 
                            ? "bg-destructive text-destructive-foreground border border-destructive" 
                            : msg.isCooldownMessage 
                              ? "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700"
                              : "bg-card text-card-foreground border"
                      )}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                     {msg.sender === 'user' && (
                      <User className="h-6 w-6 text-muted-foreground shrink-0 mb-1" />
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center justify-start gap-2">
                    <Cpu className={cn("h-6 w-6 shrink-0 mb-1", isUnrestrictedMode ? "text-orange-500" : "text-primary")} /> {/* Changed Brain to Cpu */}
                    <div className="bg-card text-card-foreground border rounded-lg px-3 py-2 shadow">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                 {isOnCooldown && remainingCooldownTime && !isLoading && (
                  <div className="flex items-center justify-start gap-2">
                      <ShieldBan className={cn("h-6 w-6 shrink-0 mb-1", "text-yellow-500")} />
                       <div className={cn("max-w-[80%] rounded-lg px-3 py-2 shadow", "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700")}>
                          <p className="whitespace-pre-line text-sm">
                              Interaction paused. Time remaining: <strong className="tabular-nums">{remainingCooldownTime}</strong>.
                          </p>
                      </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <SheetFooter className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isOnCooldown ? "Interaction paused..." : (isUnrestrictedMode ? "Ask anything..." : "Type your question...")}
                  className="flex-1"
                  disabled={isLoading || isOnCooldown}
                  aria-label="Your question for the AI assistant"
                />
                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim() || isOnCooldown}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
