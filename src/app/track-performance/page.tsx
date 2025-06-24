
'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Target, CheckCircle, TrendingUp, BookCopy, AlertTriangle, Star, Activity, ListChecks } from 'lucide-react';

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
};

const PIE_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function TrackPerformancePage() {
  const { summary, performanceByTopic, performanceOverTime, strengths, areasForImprovement } = mockPerformanceData;

  const overallAccuracyData = [
    { name: 'Correct', value: summary.overallAccuracy },
    { name: 'Incorrect', value: 100 - summary.overallAccuracy },
  ];
  
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Your Performance Dashboard">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Track your quiz progress, identify strengths, and discover areas for improvement.
        </p>

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
      </SectionWrapper>
    </div>
  );
}
