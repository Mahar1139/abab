
"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizQuestions, type QuizQuestion } from "./quiz-data";
import { Brain, CheckCircle, XCircle, Award, RotateCcw } from "lucide-react";

type QuizState = "not_started" | "in_progress" | "finished";
interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const COLORS = {
  correct: 'hsl(var(--chart-5))', // Green
  incorrect: 'hsl(var(--chart-1))', // Red
};

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("not_started");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  
  // To prevent hydration errors with ResponsiveContainer
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentQuestion: QuizQuestion | undefined = quizQuestions[currentQuestionIndex];

  const handleStartQuiz = () => {
    setQuizState("in_progress");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setUserAnswers([]);
  };

  const handleOptionSelect = (value: string) => {
    setSelectedAnswer(value);
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
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizState("finished");
    }
  };
  
  const chartData = [
    { name: 'Correct', count: score, fill: COLORS.correct },
    { name: 'Incorrect', count: quizQuestions.length - score, fill: COLORS.incorrect },
  ];

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Test Your Knowledge!">
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-10 h-10 text-primary" />
              <CardTitle className="text-3xl text-primary">Himalaya School Quiz</CardTitle>
            </div>
            <CardDescription className="text-lg">
              {quizState === "not_started" && "Click the button below to start the quiz."}
              {quizState === "in_progress" && `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
              {quizState === "finished" && "Quiz Completed! Here are your results."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quizState === "not_started" && (
              <div className="text-center">
                <Button size="lg" onClick={handleStartQuiz}>
                  Start Quiz <Award className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {quizState === "in_progress" && currentQuestion && (
              <div className="space-y-6">
                <p className="text-xl font-semibold text-foreground/90">{currentQuestion.questionText}</p>
                <RadioGroup value={selectedAnswer ?? ""} onValueChange={handleOptionSelect} className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-1">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="w-full sm:w-auto">
                  {currentQuestionIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            )}

            {quizState === "finished" && (
              <div className="space-y-8">
                <div className="text-center p-6 bg-secondary/20 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary mb-2">Your Score: {score} / {quizQuestions.length}</h3>
                  <p className="text-lg text-foreground/80">
                    {score > quizQuestions.length / 2 ? "Great job!" : "Keep learning and try again!"}
                  </p>
                </div>

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
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Review Your Answers:</h4>
                  <ul className="space-y-3">
                    {userAnswers.map((answer, index) => {
                      const question = quizQuestions.find(q => q.id === answer.questionId);
                      return (
                        <li key={answer.questionId} className="p-3 border rounded-md bg-card">
                          <p className="font-medium text-foreground/90 mb-1">{index + 1}. {question?.questionText}</p>
                          <p className={`text-sm ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            Your answer: {answer.selectedAnswer} 
                            {answer.isCorrect ? <CheckCircle className="inline ml-2 h-4 w-4" /> : <XCircle className="inline ml-2 h-4 w-4" />}
                          </p>
                          {!answer.isCorrect && (
                            <p className="text-sm text-blue-600">Correct answer: {answer.correctAnswer}</p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="text-center mt-8">
                  <Button size="lg" onClick={handleStartQuiz}>
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
