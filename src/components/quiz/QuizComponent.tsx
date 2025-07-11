
"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  generateQuizQuestionAction as generateQuizQuestion, 
  explainQuizAnswerAction as explainQuizAnswer,
  regenerateQuizOptionsAction as regenerateQuizOptions
} from "@/app/ai-actions";
import type { GenerateQuizQuestionOutput, GenerateQuizQuestionInput } from "@/ai/flows/generate-quiz-question-flow";
import type { ExplainQuizAnswerInput, ExplainQuizAnswerOutput } from "@/ai/flows/explain-quiz-answer-flow";
import type { RegenerateQuizOptionsInput } from "@/ai/flows/regenerate-quiz-options-flow";
import { Brain, CheckCircle, XCircle, Award, RotateCcw, Loader2, Info, HelpCircle, Lightbulb, Target } from "lucide-react";

type QuizState = "selecting_topic_difficulty" | "in_progress" | "finished";

interface GeneratedQuestion extends GenerateQuizQuestionOutput {
  id: string; 
}

interface UserAnswer {
  questionId: string;
  questionText: string;
  options: string[]; 
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  source: string;
  topic: string; 
  difficulty: string; 
}

interface QuestionExplanation extends ExplainQuizAnswerOutput {
  isLoading: boolean;
  error?: string | null;
}

const topics = [
  "Board Exams", "General Knowledge", "Current Affairs", "Science", "Space Exploration", "Biology", "Physics", 
  "Chemistry", "History", "Geography", "Mathematics", "Hindi Literature", "Literature", "Arts", "Computer Science",
  "Quantitative Aptitude", "Reasoning Ability", "English Language", "Banking & Financial Awareness"
];

const baseDifficulties = ["Beginner", "Easy", "Normal", "Hard", "Extreme"];

const competitiveStylesMap: Record<string, string[]> = {
  "Space Exploration": ["Legend - SpaceX/Aerospace", "Legend - General Advanced"],
  "Biology": ["Normal - NEET", "Legend - NEET", "NEET Abki Baar 720 Paar!", "Legend - General Advanced"],
  "Physics": ["Normal - NEET", "Legend - NEET", "Legend - JEE Mains", "Legend - JEE Advanced", "Legend - SpaceX/Aerospace", "NEET Abki Baar 720 Paar!", "Legend - General Advanced"],
  "Chemistry": ["Normal - NEET", "Legend - NEET", "Legend - JEE Mains", "Legend - JEE Advanced", "NEET Abki Baar 720 Paar!", "Legend - General Advanced"],
  "Mathematics": [
    "Legend - JEE Mains", "Legend - JEE Advanced", 
    "Normal - SBI PO Prelims", "Legend - SBI PO Mains", 
    "KVS TGT - Subject Paper", "KVS PGT - Subject Paper",
    "Legend - Agniveer",
    "Legend - General Advanced"
  ],
  "Hindi Literature": ["KVS PRT - General Paper", "KVS TGT - Subject Paper", "KVS PGT - Subject Paper", "Legend - Lecturer Test Prep", "KVS Abki Baar 180 Paar!", "Legend - General Advanced"],
  "Quantitative Aptitude": ["Normal - SBI PO Prelims", "Legend - SBI PO Mains", "Legend - General Advanced"],
  "Reasoning Ability": ["Normal - SBI PO Prelims", "Legend - SBI PO Mains", "Legend - General Advanced"],
  "English Language": ["Normal - SBI PO Prelims", "Legend - SBI PO Mains", "Legend - General Advanced"],
  "Banking & Financial Awareness": ["Normal - SBI PO Prelims", "Legend - SBI PO Mains", "Legend - General Advanced"],
  "General Knowledge": ["Legend - General Advanced"],
  "Current Affairs": ["Legend - General Advanced"],
  "Computer Science": ["Legend - General Advanced"],
  "History": ["Legend - General Advanced"],
  "Geography": ["Legend - General Advanced"],
  "Science": ["Legend - General Advanced"],
  "default": ["Legend - General Advanced"]
};

const boardSubjects = [
  "Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science", 
  "Accountancy", "Business Studies", "Economics", "History", "Political Science"
];

const boardDifficulties = [
  "Standard (Class 10)", "Standard (Class 12)", "Challenging (Class 12)", "Next Time All India Rank One ☠️"
];

const getDifficultyOptionsForTopic = (topic: string | null): string[] => {
  if (!topic) return [...baseDifficulties, ...competitiveStylesMap.default];
  
  const isKVSMath = topic === "Mathematics";
  const isKVSHindi = topic === "Hindi Literature";

  let topicSpecificStyles = competitiveStylesMap[topic] || competitiveStylesMap.default;

  if (!isKVSMath && !isKVSHindi) {
      topicSpecificStyles = topicSpecificStyles.filter(style => !style.startsWith("KVS"));
  }

  return [...new Set([...baseDifficulties, ...topicSpecificStyles])].sort((a, b) => {
    const isABase = baseDifficulties.includes(a);
    const isBBase = baseDifficulties.includes(b);
    if (isABase && !isBBase) return -1;
    if (!isABase && isBBase) return 1;
    if (a.includes('Abki Baar')) return 1; 
    if (b.includes('Abki Baar')) return -1;
    return a.localeCompare(b); 
  });
};

const COLORS = {
  correct: 'hsl(var(--chart-5))', 
  incorrect: 'hsl(var(--chart-1))', 
};

export default function QuizComponent() {
  const [quizState, setQuizState] = useState<QuizState>("selecting_topic_difficulty");

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [boardSubject, setBoardSubject] = useState<string | null>(null);
  const [boardDifficulty, setBoardDifficulty] = useState<string | null>(null);
  const [competitiveDifficulty, setCompetitiveDifficulty] = useState<string | null>(null);
  const [currentCompetitiveDifficultyOptions, setCurrentCompetitiveDifficultyOptions] = useState<string[]>(getDifficultyOptionsForTopic(null));

  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [questionExplanations, setQuestionExplanations] = useState<Record<string, QuestionExplanation>>({});

  const [isClient, setIsClient] = useState(false);
  const [showChallengeAlert, setShowChallengeAlert] = useState(false);
  
  const [finalTopicForQuiz, setFinalTopicForQuiz] = useState<string | null>(null);
  const [finalDifficultyForQuiz, setFinalDifficultyForQuiz] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    if (window.location.pathname === '/quiz') {
      setShowChallengeAlert(true);
      const timer = setTimeout(() => {
        setShowChallengeAlert(false);
      }, 8000); 

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    setCurrentCompetitiveDifficultyOptions(getDifficultyOptionsForTopic(selectedTopic));
    setCompetitiveDifficulty(null);
  }, [selectedTopic]);

  const handleTopicChange = (topic: string | null) => {
    setSelectedTopic(topic);
    setBoardSubject(null);
    setBoardDifficulty(null);
    setCompetitiveDifficulty(null);
  };

  const resetQuiz = () => {
    setQuizState("selecting_topic_difficulty");
    handleTopicChange(null);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setScore(0);
    setUserAnswers([]);
    setError(null);
    setQuestionExplanations({});
    setFinalTopicForQuiz(null);
    setFinalDifficultyForQuiz(null);
  };

  const fetchNextQuestion = async (topic: string, difficulty: string) => {
    if (!topic || !difficulty) return;
    setIsLoadingQuestion(true);
    setError(null);
    setCurrentQuestion(null);

    try {
      const previousQuestionTexts = userAnswers.map(ua => ua.questionText);
      const input: GenerateQuizQuestionInput = { 
        topic: topic, 
        difficulty: difficulty,
        previousQuestionTexts: previousQuestionTexts.slice(-5) 
      };
      const result = await generateQuizQuestion(input);
      if (result.questionText && result.options && result.correctAnswer) {
        setCurrentQuestion({ ...result, id: `q_${Date.now()}_${userAnswers.length}` });
      } else {
        throw new Error("AI failed to generate a valid question structure. The response might be incomplete or malformed.");
      }
    } catch (e) {
      console.error("Error fetching question:", e);
      let displayError = "An unexpected error occurred while generating the question. Please try again.";
      if (e instanceof Error) {
        if (e.message.includes("503") || e.message.toLowerCase().includes("overloaded") || e.message.toLowerCase().includes("model is overloaded")) {
          displayError = "The AI model is currently busy. Please try again in a few moments.";
        } else if (e.message.toLowerCase().includes("api key")) {
          displayError = "There's an issue with the AI configuration. Please contact support.";
        } else if (e.message.toLowerCase().includes("invalid number of options") || e.message.toLowerCase().includes("correct answer that is not in the options list")) {
            displayError = e.message; 
        } else {
            displayError = `An error occurred: ${e.message}. Try adjusting topic/difficulty or try again.`;
        }
      }
      setError(displayError);
    }
    setIsLoadingQuestion(false);
  };

  const handleStartQuiz = () => {
    let topicForAI: string | null = null;
    let difficultyForAI: string | null = null;

    if (selectedTopic === 'Board Exams') {
      if (!boardSubject || !boardDifficulty) return;
      topicForAI = boardSubject;
      difficultyForAI = `Board Exam: ${boardDifficulty}`;
    } else {
      if (!selectedTopic || !competitiveDifficulty) return;
      topicForAI = selectedTopic;
      difficultyForAI = competitiveDifficulty;
    }

    if (!topicForAI || !difficultyForAI) return;

    setFinalTopicForQuiz(topicForAI);
    setFinalDifficultyForQuiz(difficultyForAI);
    setQuizState("in_progress");
    setScore(0);
    setUserAnswers([]);
    setQuestionExplanations({});
    fetchNextQuestion(topicForAI, difficultyForAI);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion || !finalTopicForQuiz || !finalDifficultyForQuiz) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: currentQuestion.id,
        questionText: currentQuestion.questionText,
        options: currentQuestion.options,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        source: currentQuestion.source || "N/A",
        topic: finalTopicForQuiz, 
        difficulty: finalDifficultyForQuiz, 
      },
    ]);

    setSelectedAnswer(null);
    
    if (userAnswers.length < 4) { 
      fetchNextQuestion(finalTopicForQuiz, finalDifficultyForQuiz);
    } else {
      setQuizState("finished");
    }
  };
  
  const fetchExplanation = async (answer: UserAnswer) => {
    if (questionExplanations[answer.questionId]?.explanationText) return; 

    setQuestionExplanations(prev => ({
      ...prev,
      [answer.questionId]: { ...prev[answer.questionId], isLoading: true, error: null }
    }));

    try {
      const input: ExplainQuizAnswerInput = {
        questionText: answer.questionText,
        options: answer.options,
        correctAnswer: answer.correctAnswer,
        userSelectedAnswer: answer.selectedAnswer,
        topic: answer.topic,
        difficulty: answer.difficulty,
      };
      const explanationResult = await explainQuizAnswer(input);
      setQuestionExplanations(prev => ({
        ...prev,
        [answer.questionId]: { 
          explanationText: explanationResult.explanationText, 
          generatedImageUri: explanationResult.generatedImageUri,
          isLoading: false 
        }
      }));
    } catch (e) {
      console.error("Error fetching explanation:", e);
      let errorMsg = "Failed to load explanation.";
      if (e instanceof Error) errorMsg = e.message;
      setQuestionExplanations(prev => ({
        ...prev,
        [answer.questionId]: { 
          ...(prev[answer.questionId] || { explanationText: '', isLoading: false }), 
          isLoading: false, 
          error: errorMsg 
        }
      }));
    }
  };

  const handleRegenerateOptions = async () => {
    if (!currentQuestion || !finalTopicForQuiz || !finalDifficultyForQuiz) return;

    setIsRegenerating(true);
    setError(null);

    try {
        const input: RegenerateQuizOptionsInput = {
            questionText: currentQuestion.questionText,
            topic: finalTopicForQuiz,
            difficulty: finalDifficultyForQuiz,
            currentOptions: currentQuestion.options,
        };
        const result = await regenerateQuizOptions(input);

        if (result.message) {
            // Case A: Options were correct, show message to user.
            setError(result.message);
        } else if (result.options && result.correctAnswer) {
            // Case B: Options were regenerated successfully.
            setCurrentQuestion(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    options: result.options!,
                    correctAnswer: result.correctAnswer!,
                    source: `${prev.source} (Regenerated)`,
                };
            });
            setSelectedAnswer(null);
        } else {
             throw new Error("AI returned an invalid response for option regeneration.");
        }
    } catch (e) {
        console.error("Error regenerating options:", e);
        let displayError = "An unexpected error occurred while regenerating the options. Please try again or skip the question.";
        if (e instanceof Error) {
            displayError = `Failed to regenerate options: ${e.message}`;
        }
        setError(displayError);
    }
    setIsRegenerating(false);
  };
  
  const chartData = [
    { name: 'Correct', count: score, fill: COLORS.correct },
    { name: 'Incorrect', count: userAnswers.length - score, fill: COLORS.incorrect },
  ];

  if (!isClient) {
    return null;
  }

  const formatDifficultyLabel = (level: string): string => {
    if (level.startsWith("Legend - ")) return `Legend: ${level.substring("Legend - ".length)}`;
    if (level.startsWith("Normal - ")) return `Normal (${level.substring("Normal - ".length)} Style)`;
    if (level.includes("Abki Baar")) return `🎯 ${level}`;
    if (level.startsWith("KVS")) return `Exam: ${level}`;
    if (level.startsWith("Board Exam: ")) return level.substring("Board Exam: ".length);
    return level;
  };
  
  const isStartButtonDisabled = () => {
    if (selectedTopic === "Board Exams") {
      return !boardSubject || !boardDifficulty;
    }
    return !selectedTopic || !competitiveDifficulty;
  };

  return (
    <div className="container mx-auto py-8">
      {showChallengeAlert && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md">
          <Alert className="bg-accent text-accent-foreground border-accent-foreground/20 shadow-2xl">
            <Brain className="h-5 w-5 text-accent-foreground" />
            <AlertTitle className="font-bold">Challenge Issued!</AlertTitle>
            <AlertDescription>
              Hi! I am the Himalaya Public School Assistant. Are you ready for a challenge? I am giving you an open challenge! 🤘
            </AlertDescription>
          </Alert>
        </div>
      )}

      <SectionWrapper title="AI Quiz Challenge">
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-10 h-10 text-primary" />
              <CardTitle className="text-3xl text-primary">Test Your Knowledge!</CardTitle>
            </div>
            {quizState !== "selecting_topic_difficulty" && finalTopicForQuiz && finalDifficultyForQuiz && (
              <CardDescription className="text-md">
                Quiz on: <span className="font-semibold text-secondary">{finalTopicForQuiz}</span> | 
                Difficulty: <span className="font-semibold text-secondary">{formatDifficultyLabel(finalDifficultyForQuiz)}</span>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {quizState === "selecting_topic_difficulty" && (
              <div className="space-y-6 max-w-lg mx-auto">
                <h3 className="text-2xl font-semibold text-foreground text-center">Configure Your Quiz</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic-select" className="text-lg">1. Select a Topic or Exam Type</Label>
                    <Select onValueChange={handleTopicChange} value={selectedTopic ?? undefined}>
                      <SelectTrigger id="topic-select" className="w-full py-3 text-lg">
                        <SelectValue placeholder="Choose a topic or exam type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map(topic => (
                          <SelectItem key={topic} value={topic} className={`text-lg py-2 ${topic === "Board Exams" ? 'font-bold text-accent' : ''}`}>{topic}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTopic === 'Board Exams' && (
                    <div className="space-y-4 border-l-4 border-accent pl-4 ml-2">
                      <div className="space-y-2">
                        <Label htmlFor="board-subject-select" className="text-lg">2. Select a Board Subject</Label>
                        <Select onValueChange={setBoardSubject} value={boardSubject ?? undefined}>
                          <SelectTrigger id="board-subject-select" className="w-full py-3 text-lg">
                            <SelectValue placeholder="Choose a board subject..." />
                          </SelectTrigger>
                          <SelectContent>
                            {boardSubjects.map(subject => (
                              <SelectItem key={subject} value={subject} className="text-lg py-2">{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {boardSubject && (
                        <div className="space-y-2">
                          <Label htmlFor="board-difficulty-select" className="text-lg">3. Select Difficulty for {boardSubject}</Label>
                          <Select onValueChange={setBoardDifficulty} value={boardDifficulty ?? undefined} disabled={!boardSubject}>
                            <SelectTrigger id="board-difficulty-select" className="w-full py-3 text-lg">
                              <SelectValue placeholder="Choose a board difficulty level..." />
                            </SelectTrigger>
                            <SelectContent>
                              {boardDifficulties.map(level => (
                                <SelectItem key={level} value={level} className={`text-lg py-2 ${level.includes('Rank One') ? 'text-destructive font-bold' : ''}`}>{level}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedTopic && selectedTopic !== 'Board Exams' && (
                    <div className="space-y-2">
                      <Label htmlFor="difficulty-select" className="text-lg">2. Select Difficulty for {selectedTopic}</Label>
                      <Select onValueChange={setCompetitiveDifficulty} value={competitiveDifficulty ?? undefined} disabled={!selectedTopic}>
                        <SelectTrigger id="difficulty-select" className="w-full py-3 text-lg">
                          <SelectValue placeholder="Choose a difficulty level..." />
                        </SelectTrigger>
                        <SelectContent>
                          {currentCompetitiveDifficultyOptions.map(level => (
                            <SelectItem key={level} value={level} className={`text-lg py-2 ${level.includes('Abki Baar') ? 'text-accent font-bold' : ''}`}>{formatDifficultyLabel(level)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="flex justify-center pt-4">
                   <Button size="lg" onClick={handleStartQuiz} disabled={isStartButtonDisabled()}>
                    Start Quiz <Award className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
            
            {isLoadingQuestion && quizState === "in_progress" && (
              <div className="flex flex-col items-center justify-center h-64 space-y-3">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your next question...</p>
              </div>
            )}

            {error && !currentQuestion && quizState !== "selecting_topic_difficulty" && (
              <Alert variant="destructive" className="my-4">
                <XCircle className="h-5 w-5" />
                <AlertTitle>Error Generating Question</AlertTitle>
                <AlertDescription>
                  {error}
                  <div className="mt-4 flex gap-2">
                    <Button onClick={() => fetchNextQuestion(finalTopicForQuiz!, finalDifficultyForQuiz!)} variant="outline" size="sm" disabled={isLoadingQuestion || !finalTopicForQuiz || !finalDifficultyForQuiz}>
                      {isLoadingQuestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null} Try Again
                    </Button>
                    <Button onClick={resetQuiz} variant="secondary" size="sm">Change Settings</Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {!isLoadingQuestion && quizState === "in_progress" && currentQuestion && (
              <div className="space-y-6">
                 <CardDescription className="text-lg text-center">
                    Question {userAnswers.length + 1} of 5
                 </CardDescription>
                
                {error && (
                  <Alert variant={error.startsWith("Sorry") ? "default" : "destructive"} className="my-2">
                    {error.startsWith("Sorry") ? <Info className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <AlertTitle>{error.startsWith("Sorry") ? "Options Validated" : "An Error Occurred"}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <p className="text-xl font-semibold text-foreground/90">{currentQuestion.questionText}</p>
                <RadioGroup value={selectedAnswer ?? ""} onValueChange={setSelectedAnswer} className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div key={`${currentQuestion.id}-option-${index}`} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option} id={`${currentQuestion.id}-option-${index}`} />
                      <Label htmlFor={`${currentQuestion.id}-option-${index}`} className="text-base cursor-pointer flex-1">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={handleRegenerateOptions}
                            disabled={isLoadingQuestion || isRegenerating}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                            {isRegenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <HelpCircle className="mr-2 h-4 w-4" />}
                            Answer Not in Options
                        </Button>
                        {userAnswers.length > 0 && (
                            <Button variant="ghost" onClick={() => setQuizState("finished")} disabled={isRegenerating || isLoadingQuestion}>End Quiz Early</Button>
                        )}
                    </div>
                    <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer || isLoadingQuestion || isRegenerating}>
                        {isLoadingQuestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        {userAnswers.length === 4 ? "Finish Quiz" : "Next Question"}
                    </Button>
                </div>
              </div>
            )}

            {quizState === "finished" && (
              <div className="space-y-8">
                <div className="text-center p-6 bg-secondary/20 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary mb-2">Your Score: {score} / {userAnswers.length}</h3>
                  <p className="text-lg text-foreground/80">
                    {userAnswers.length > 0 ? (score > userAnswers.length / 2 ? "Great job!" : "Keep learning and try again!") : "No questions answered."}
                  </p>
                </div>

                {userAnswers.length > 0 && (
                  <div className="h-[300px] md:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                        <YAxis allowDecimals={false} stroke="hsl(var(--foreground))" />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                          itemStyle={{ color: 'hsl(var(--foreground))' }}
                          cursor={{fill: 'hsl(var(--muted))'}}
                        />
                        <Bar dataKey="count"  radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                {userAnswers.length > 0 && (
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-primary">Review Your Answers:</h4>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {userAnswers.map((answer, index) => (
                        <Card key={answer.questionId} className="bg-card shadow-sm">
                          <div className="p-4">
                            <p className="font-medium text-foreground/90 mb-1">{index + 1}. {answer.questionText}</p>
                            <p className={`text-sm ${answer.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                              Your answer: {answer.selectedAnswer} 
                              {answer.isCorrect ? <CheckCircle className="inline ml-2 h-4 w-4" /> : <XCircle className="inline ml-2 h-4 w-4" />}
                            </p>
                            {!answer.isCorrect && (
                              <p className="text-sm text-blue-500">Correct answer: {answer.correctAnswer}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2 flex items-center">
                              <Info className="w-3 h-3 mr-1.5"/> Source/Type: {answer.source}
                            </p>
                          </div>
                          <AccordionItem value={answer.questionId} className="border-t">
                            <AccordionTrigger 
                              onClick={() => fetchExplanation(answer)}
                              className="px-4 py-3 text-sm text-accent hover:underline flex items-center"
                              disabled={questionExplanations[answer.questionId]?.isLoading}
                            >
                              {questionExplanations[answer.questionId]?.isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading Explanation...
                                </>
                              ) : (
                                <>
                                  <Lightbulb className="mr-2 h-4 w-4" /> Why this answer?
                                </>
                              )}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              {questionExplanations[answer.questionId]?.error && (
                                <Alert variant="destructive" className="mt-2">
                                  <XCircle className="h-5 w-5" />
                                  <AlertTitle>Error Loading Explanation</AlertTitle>
                                  <AlertDescription>{questionExplanations[answer.questionId]?.error}</AlertDescription>
                                </Alert>
                              )}
                              {questionExplanations[answer.questionId]?.explanationText && (
                                <div className="prose dark:prose-invert max-w-none text-sm mt-2 space-y-3">
                                  <p className="whitespace-pre-line">{questionExplanations[answer.questionId]?.explanationText}</p>
                                  {questionExplanations[answer.questionId]?.generatedImageUri && (
                                    <div className="mt-3 border rounded-md overflow-hidden">
                                      <Image 
                                        src={questionExplanations[answer.questionId]?.generatedImageUri!} 
                                        alt="Explanation visual aid" 
                                        width={400} 
                                        height={300} 
                                        className="mx-auto object-contain"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Card>
                      ))}
                    </Accordion>
                  </div>
                )}

                <div className="text-center mt-8">
                  <Button size="lg" onClick={resetQuiz}>
                    Play Again <RotateCcw className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
