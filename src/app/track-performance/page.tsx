
'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { User, Target, CheckCircle, TrendingUp, BookCopy, AlertTriangle, Star, Activity, ListChecks, Lightbulb } from 'lucide-react';

const mockPerformanceData = {
  summary: {
    overallAccuracy: 78,
    quizzesTaken: 12,
    averageScore: 7.8,
    timeSpent: '3h 45m',
  },
  performanceByTopic: [
    { topic: 'Physics', accuracy: 85 },
    { topic: 'Maths', accuracy: 72 },
    { topic: 'Chemistry', accuracy: 65 },
    { topic: 'Biology', accuracy: 91 },
    { topic: 'History', accuracy: 75 },
    { topic: 'GK', accuracy: 80 },
  ],
  performanceOverTime: [
    { date: 'Jul 1', score: 6 },
    { date: 'Jul 5', score: 7 },
    { date: 'Jul 10', score: 6 },
    { date: 'Jul 15', score: 8 },
    { date: 'Jul 20', score: 9 },
    { date: 'Jul 25', score: 8 },
  ],
  strengths: ['Biology Concepts', 'General Knowledge'],
  areasForImprovement: ['Advanced Chemistry', 'Quantitative Aptitude Puzzles'],
  aiRecommendations: [
    "Focus on 'Chemistry' quizzes this week to improve the 65% accuracy.",
    "Great work in Biology! Try a 'Hard' difficulty quiz to challenge yourself.",
    "Review the 'Quantitative Aptitude' concepts before the next quiz.",
  ]
};

export default function TrackPerformancePage() {
  const { summary, performanceByTopic, performanceOverTime, strengths, areasForImprovement, aiRecommendations } = mockPerformanceData;

  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Student Progress Dashboard">
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                    Showing results for: <span className="text-primary">Aarav Sharma (Class 8)</span>
                </h2>
            </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.overallAccuracy}%</div>
              <p className="text-xs text-muted-foreground">Based on all quizzes taken.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Taken</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.quizzesTaken}</div>
              <p className="text-xs text-muted-foreground">Total quizzes completed.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.averageScore} / 10</div>
              <p className="text-xs text-muted-foreground">Average score per quiz.</p>
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent Learning</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.timeSpent}</div>
              <p className="text-xs text-muted-foreground">Total time on quizzes.</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><BookCopy className="w-5 h-5 text-primary" />Accuracy by Topic</CardTitle>
              <CardDescription>How you're performing in different subjects.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceByTopic}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" angle={-30} textAnchor="end" height={50} stroke="hsl(var(--foreground))" />
                  <YAxis unit="%" stroke="hsl(var(--foreground))"/>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                    cursor={{fill: 'hsl(var(--muted))'}}
                  />
                  <Bar dataKey="accuracy" name="Accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
           <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />Performance Over Time</CardTitle>
              <CardDescription>Your quiz scores over the last few sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" domain={[0, 10]}/>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                    cursor={{stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3'}}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

         {/* Strengths and Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Star className="w-5 h-5" /> Your Strengths
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
                       {strengths.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
            <Card className="shadow-lg bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertTriangle className="w-5 h-5" /> Areas for Improvement
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc list-inside space-y-2 text-red-800 dark:text-red-200">
                       {areasForImprovement.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </CardContent>
            </Card>
        </div>
        
        {/* AI Recommendations */}
        <Card className="mt-8 shadow-xl bg-secondary/10 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-secondary">
              <Lightbulb className="w-5 h-5" />
              AI-Powered Recommendations
            </CardTitle>
            <CardDescription>
              Based on recent performance, here are some suggested next steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {aiRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start p-3 bg-card/50 rounded-md">
                  <Star className="w-4 h-4 text-accent mr-3 mt-1 shrink-0" />
                  <span className="text-foreground/90">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </SectionWrapper>
    </div>
  );
}
