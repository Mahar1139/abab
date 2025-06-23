
"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, BookOpen, Lightbulb, AlertCircle, PencilLine, LogOut } from "lucide-react";
import { generateTeacherMaterial, type TeacherConduitInput, type TeacherConduitOutput } from "@/ai/flows/teacher-conduit-flow";

const classes = [
  "Nursery", "LKG", "UKG", 
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
  "Class 11", "Class 12"
];

const subjects = [
  "English", "Hindi", "Mathematics", "Science", 
  "Social Science (History, Geography, Civics)", "Computer Science", 
  "Environmental Science (EVS)", "Art", "Music", "Physical Education",
  "Physics (for Class 11-12)", "Chemistry (for Class 11-12)", "Biology (for Class 11-12)",
  "Accountancy", "Business Studies", "Economics", "Political Science"
];

export default function TeacherConduitPage() {
  const router = useRouter();
  const [classLevel, setClassLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [chapterInfo, setChapterInfo] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");
  
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!classLevel || !subject || !chapterInfo) {
      setError("Please select a class, subject, and provide chapter information.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const input: TeacherConduitInput = { 
        classLevel, 
        subject, 
        chapterInfo,
        userQuestion: userQuestion.trim() === "" ? undefined : userQuestion.trim(),
      };
      const result: TeacherConduitOutput = await generateTeacherMaterial(input);
      if (result.generatedContent) {
        setAiResponse(result.generatedContent);
      } else {
        setError("The AI didn't provide any content. Please try rephrasing your request or check the inputs.");
      }
    } catch (e) {
      console.error("Error fetching teacher material:", e);
      let errorMessage = "An error occurred. Please try again later.";
      if (e instanceof Error) {
        if (e.message.includes("503") || e.message.toLowerCase().includes("overloaded")) {
          errorMessage = "The AI model is currently experiencing high demand. Please wait a few moments and try again.";
        } else {
          errorMessage = `Error: ${e.message}`;
        }
      }
      setError(errorMessage);
    }
    setIsLoading(false);
  };

  const handleExit = () => {
    router.push('/ai-assistant');
  };

  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Teacher Conduit (NCERT Assistant)">
        <Card className="shadow-xl max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl text-primary">NCERT Curriculum Helper</CardTitle>
            </div>
            <CardDescription>
              Select class, subject, and chapter to get NCERT-based answers or suggested questions.
              This tool is intended for teacher use.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="classLevel" className="text-base">Class Level</Label>
                  <Select onValueChange={setClassLevel} value={classLevel}>
                    <SelectTrigger id="classLevel" className="w-full py-3 text-base">
                      <SelectValue placeholder="Select class..." />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(c => (
                        <SelectItem key={c} value={c} className="text-base py-2">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-base">Subject</Label>
                  <Select onValueChange={setSubject} value={subject}>
                    <SelectTrigger id="subject" className="w-full py-3 text-base">
                      <SelectValue placeholder="Select subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(s => (
                        <SelectItem key={s} value={s} className="text-base py-2">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="chapterInfo" className="text-base">Chapter Name / Number</Label>
                <Input 
                  id="chapterInfo" 
                  value={chapterInfo} 
                  onChange={(e) => setChapterInfo(e.target.value)} 
                  placeholder="e.g., Chapter 1: Matter in Our Surroundings"
                  className="py-3 text-base"
                  required
                />
              </div>

              <div>
                <Label htmlFor="userQuestion" className="text-base flex items-center gap-1">
                  <PencilLine className="w-4 h-4 text-muted-foreground"/>
                  Your Specific Question (Optional)
                </Label>
                <Textarea
                  id="userQuestion"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="If you have a specific question, type it here. Otherwise, AI will suggest questions & answers."
                  rows={3}
                  className="text-base"
                />
                 <p className="text-xs text-muted-foreground mt-1">
                   If left blank, the AI will suggest 3-5 NCERT questions and answers for the chapter.
                 </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" disabled={isLoading || !classLevel || !subject || !chapterInfo} className="w-full text-lg py-3 flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {userQuestion.trim() ? "Getting Answer..." : "Suggesting Q&A..."}
                    </>
                  ) : (
                    userQuestion.trim() ? "Get Answer" : "Suggest NCERT Questions & Answers" 
                  )} 
                   <Lightbulb className="ml-2 h-5 w-5" />
                </Button>
                <Button type="button" variant="outline" onClick={handleExit} className="w-full sm:w-auto text-lg py-3">
                   <LogOut className="mr-2 h-5 w-5" /> Exit Teacher Conduit
                </Button>
              </div>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {aiResponse && !isLoading && (
              <Card className="mt-8 bg-secondary/10">
                <CardHeader>
                  <CardTitle className="text-xl text-accent">AI Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none whitespace-pre-line text-base leading-relaxed">
                    {aiResponse}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
