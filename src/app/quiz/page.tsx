
"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateQuizQuestion, type GenerateQuizQuestionOutput, type GenerateQuizQuestionInput } from "@/ai/flows/generate-quiz-question-flow";
import { Brain, CheckCircle, XCircle, Award, RotateCcw, Loader2, Info } from "lucide-react";

type QuizState = "selecting_topic_difficulty" | "in_progress" | "finished";

interface GeneratedQuestion extends GenerateQuizQuestionOutput {
  id: string; // Unique ID for the question in the current session
}

interface UserAnswer {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  source: string;
}

const topics = [
  "General Knowledge", "Science", "Space Exploration", "Biology", "Physics", 
  "Chemistry", "History", "Geography", "Mathematics", "Literature", "Arts", "Computer Science"
];

const baseDifficulties = ["Beginner", "Easy", "Normal", "Hard", "Extreme"];

// Defines specific competitive styles for topics.
// Keys are topics, values are arrays of difficulty strings (e.g., "Normal - NEET", "Legend - JEE Mains").
const competitiveStylesMap: Record<string, string[]> = {
  "Space Exploration": ["Legend - SpaceX/Aerospace", "Legend - General Advanced"],
  "Biology": ["Normal - NEET", "Legend - NEET", "Legend - General Advanced"],
  "Physics": ["Normal - NEET", "Legend - NEET", "Legend - JEE Mains", "Legend - JEE Advanced", "Legend - SpaceX/Aerospace", "Legend - General Advanced"],
  "Chemistry": ["Normal - NEET", "Legend - NEET", "Legend - JEE Mains", "Legend - JEE Advanced", "Legend - General Advanced"],
  "Mathematics": ["Legend - JEE Mains", "Legend - JEE Advanced", "Legend - General Advanced"],
  "default": ["Legend - General Advanced"] // Fallback for topics not explicitly mapped
};

const getDifficultyOptionsForTopic = (topic: string | null): string[] => {
  if (!topic) return [...baseDifficulties, ...competitiveStylesMap.default];
  
  const topicSpecificStyles = competitiveStylesMap[topic] || competitiveStylesMap.default;
  // Combine base difficulties with topic-specific competitive styles. Use Set to avoid duplicates.
  return [...new Set([...baseDifficulties, ...topicSpecificStyles])].sort((a, b) => {
    // Custom sort: base difficulties first, then competitive styles
    const isABase = baseDifficulties.includes(a);
    const isBBase = baseDifficulties.includes(b);
    if (isABase && !isBBase) return -1;
    if (!isABase && isBBase) return 1;
    return a.localeCompare(b); // Alphabetical for same-type difficulties
  });
};


const COLORS = {
  correct: 'hsl(var(--chart-5))', // Green
  incorrect: 'hsl(var(--chart-1))', // Red
};

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("selecting_topic_difficulty");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [currentDifficultyOptions, setCurrentDifficultyOptions] = useState<string[]>(getDifficultyOptionsForTopic(null));
  
  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setCurrentDifficultyOptions(getDifficultyOptionsForTopic(selectedTopic));
    setSelectedDifficulty(null); // Reset difficulty when topic changes
  }, [selectedTopic]);

  const resetQuiz = () => {
    setQuizState("selecting_topic_difficulty");
    setSelectedTopic(null);
    setSelectedDifficulty(null);
    setCurrentDifficultyOptions(getDifficultyOptionsForTopic(null));
    setCurrentQuestion(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setUserAnswers([]);
    setError(null);
  };

  const fetchNextQuestion = async () => {
    if (!selectedTopic || !selectedDifficulty) return;
    setIsLoadingQuestion(true);
    setError(null);
    setCurrentQuestion(null);

    try {
      const previousQuestionTexts = userAnswers.map(ua => ua.questionText);
      const input: GenerateQuizQuestionInput = { 
        topic: selectedTopic, 
        difficulty: selectedDifficulty,
        previousQuestionTexts: previousQuestionTexts.slice(-5) 
      };
      const result = await generateQuizQuestion(input);
      if (result.questionText && result.options && result.correctAnswer) {
        setCurrentQuestion({ ...result, id: `q_${Date.now()}_${currentQuestionIndex}` });
      } else {
        throw new Error("AI failed to generate a valid question structure. The response might be incomplete or malformed.");
      }
    } catch (e) {
      console.error("Error fetching question:", e);
      let displayError = "An unexpected error occurred while generating the question. Please try again.";
      if (e instanceof Error) {
        if (e.message.includes("503") || e.message.toLowerCase().includes("overloaded") || e.message.toLowerCase().includes("model is overloaded")) {
          displayError = "The AI model is currently experiencing high demand and is temporarily unavailable. Please wait a few moments and try again. If the problem persists, you can also try changing the topic or difficulty.";
        } else if (e.message.toLowerCase().includes("api key")) {
          displayError = "There seems to be an issue with the AI configuration (e.g., API key). Please check the setup.";
        } else if (e.message.toLowerCase().includes("invalid number of options") || e.message.toLowerCase().includes("correct answer that is not in the options list")) {
            displayError = e.message; // Use the specific error message from the flow
        } else {
            // For other types of errors, provide a general message but also log the specific one.
            displayError = `An error occurred: ${e.message}. Please try adjusting topic/difficulty or try again later.`;
        }
      }
      setError(displayError);
    }
    setIsLoadingQuestion(false);
  };

  const handleStartQuiz = () => {
    if (!selectedTopic || !selectedDifficulty) return;
    setQuizState("in_progress");
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    fetchNextQuestion();
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: currentQuestion.id,
        questionText: currentQuestion.questionText,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        source: currentQuestion.source || "N/A",
      },
    ]);

    setSelectedAnswer(null);
    
    if (userAnswers.length < 4) { 
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      fetchNextQuestion();
    } else {
      setQuizState("finished");
    }
  };
  
  const chartData = [
    { name: 'Correct', count: score, fill: COLORS.correct },
    { name: 'Incorrect', count: userAnswers.length - score, fill: COLORS.incorrect },
  ];

  if (!isClient) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  const formatDifficultyLabel = (level: string): string => {
    if (level.startsWith("Legend - ")) {
      return `Legend: ${level.substring("Legend - ".length)}`;
    }
    if (level.startsWith("Normal - ")) {
      return `Normal (${level.substring("Normal - ".length)} Style)`;
    }
    return level;
  };

  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="AI Quiz Challenge">
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-10 h-10 text-primary" />
              <CardTitle className="text-3xl text-primary">Test Your Knowledge!</CardTitle>
            </div>
            {quizState !== "selecting_topic_difficulty" && selectedTopic && selectedDifficulty && (
              <CardDescription className="text-md">
                Topic: <span className="font-semibold text-secondary">{selectedTopic}</span> | Difficulty: <span className="font-semibold text-secondary">{formatDifficultyLabel(selectedDifficulty)}</span>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {quizState === "selecting_topic_difficulty" && (
              <div className="space-y-6 max-w-lg mx-auto">
                <h3 className="text-2xl font-semibold text-foreground text-center">Configure Your Quiz</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="topic-select" className="text-lg">1. Select a Topic</Label>
                  <Select onValueChange={setSelectedTopic} value={selectedTopic ?? undefined}>
                    <SelectTrigger id="topic-select" className="w-full py-3 text-lg">
                      <SelectValue placeholder="Choose a topic..." />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map(topic => (
                        <SelectItem key={topic} value={topic} className="text-lg py-2">{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTopic && (
                  <div className="space-y-2">
                    <Label htmlFor="difficulty-select" className="text-lg">2. Select Difficulty for {selectedTopic}</Label>
                    <Select onValueChange={setSelectedDifficulty} value={selectedDifficulty ?? undefined} disabled={!selectedTopic}>
                      <SelectTrigger id="difficulty-select" className="w-full py-3 text-lg">
                        <SelectValue placeholder="Choose a difficulty level..." />
                      </SelectTrigger>
                      <SelectContent>
                        {currentDifficultyOptions.map(level => (
                          <SelectItem key={level} value={level} className="text-lg py-2">
                            {formatDifficultyLabel(level)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex justify-center pt-4">
                   <Button size="lg" onClick={handleStartQuiz} disabled={!selectedTopic || !selectedDifficulty}>
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

            {error && (quizState === "in_progress" || quizState === "selecting_topic_difficulty") && (
              <Alert variant="destructive" className="my-4">
                <XCircle className="h-5 w-5" />
                <AlertTitle>Error Generating Question</AlertTitle>
                <AlertDescription>
                  {error}
                  <div className="mt-4 flex gap-2">
                    <Button onClick={fetchNextQuestion} variant="outline" size="sm" disabled={isLoadingQuestion || !selectedTopic || !selectedDifficulty}>
                      {isLoadingQuestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null} Try Again
                    </Button>
                    <Button onClick={resetQuiz} variant="secondary" size="sm">Change Topic/Difficulty</Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {!isLoadingQuestion && !error && quizState === "in_progress" && currentQuestion && (
              <div className="space-y-6">
                 <CardDescription className="text-lg text-center">
                    Question {userAnswers.length + 1} of 5
                 </CardDescription>
                <p className="text-xl font-semibold text-foreground/90">{currentQuestion.questionText}</p>
                <RadioGroup value={selectedAnswer ?? ""} onValueChange={setSelectedAnswer} className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div key={`${currentQuestion.id}-option-${index}`} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option} id={`${currentQuestion.id}-option-${index}`} />
                      <Label htmlFor={`${currentQuestion.id}-option-${index}`} className="text-base cursor-pointer flex-1">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex justify-between items-center">
                    <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer || isLoadingQuestion} className="w-full sm:w-auto">
                    {isLoadingQuestion ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                    {userAnswers.length === 4 ? "Finish Quiz" : "Next Question"}
                    </Button>
                    {userAnswers.length > 0 && (
                         <Button variant="outline" onClick={() => setQuizState("finished")} className="w-full sm:w-auto ml-2">End Quiz Early</Button>
                    )}
                </div>
              </div>
            )}

            {quizState === "finished" && (
              <div className="space-y-8">
                <div className="text-center p-6 bg-secondary/20 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary mb-2">Your Score: {score} / {userAnswers.length}</h3>
                  <p className="text-lg text-foreground/80">
                    {score > userAnswers.length / 2 ? "Great job!" : (userAnswers.length > 0 ? "Keep learning and try again!" : "No questions answered.")}
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
                    <ul className="space-y-4">
                      {userAnswers.map((answer, index) => (
                        <li key={answer.questionId} className="p-4 border rounded-md bg-card shadow-sm">
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
                        </li>
                      ))}
                    </ul>
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

