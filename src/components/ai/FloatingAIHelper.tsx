
"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetDescription } from '@/components/ui/sheet';
import { Bot, Send, User, Loader2, MessageSquare } from 'lucide-react';
import { assistWithAdmissions, type AdmissionAssistantInput, type AdmissionAssistantOutput } from '@/ai/flows/admission-assistant-flow';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function FloatingAIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const initialGreeting = "Hello! I'm the admissions AI assistant. How can I help you with the Himalaya Public School admissions process today?";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'initial-greeting', text: initialGreeting, sender: 'ai' }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const userMessageText = inputValue.trim();
    if (!userMessageText || isLoading) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const input: AdmissionAssistantInput = { question: userMessageText };
      const result: AdmissionAssistantOutput = await assistWithAdmissions(input);
      
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text: result.answer,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling AI assistant:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 animate-bounce hover:animate-none"
            aria-label="Open AI Admissions Helper"
          >
            <Bot className="h-7 w-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2 text-primary">
              <MessageSquare className="h-6 w-6" />
              Admissions AI Helper
            </SheetTitle>
            <SheetDescription className="text-xs">
              Ask questions about the admissions process or form filling.
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
                    <Bot className="h-6 w-6 text-primary shrink-0 mb-1" />
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 shadow",
                      msg.sender === 'user'
                        ? "bg-primary text-primary-foreground"
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
                  <Bot className="h-6 w-6 text-primary shrink-0 mb-1" />
                  <div className="bg-card text-card-foreground border rounded-lg px-3 py-2 shadow">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
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
                placeholder="Type your question..."
                className="flex-1"
                disabled={isLoading}
                aria-label="Your question for the AI assistant"
              />
              <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
