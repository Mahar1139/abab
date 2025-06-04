
export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    questionText: 'What is the main mission of Himalaya Public School?',
    options: [
      'To focus only on sports.',
      'To provide a stimulating learning environment with a technological orientation.',
      'To offer exclusively arts education.',
      'To be a research institute.',
    ],
    correctAnswer: 'To provide a stimulating learning environment with a technological orientation.',
  },
  {
    id: 'q2',
    questionText: 'Which of these is a core value of Himalaya Public School?',
    options: ['Competition', 'Excellence', 'Exclusivity', 'Rigidity'],
    correctAnswer: 'Excellence',
  },
  {
    id: 'q3',
    questionText: 'When was Himalaya Public School founded?',
    options: ['1985', '1995', '2005', '2015'],
    correctAnswer: '1985',
  },
  {
    id: 'q4',
    questionText: 'What kind of an approach does the school emphasize in its teaching methodologies?',
    options: [
      'Teacher-centered',
      'Student-centered and interactive learning',
      'Lecture-based only',
      'Exam-focused memorization',
    ],
    correctAnswer: 'Student-centered and interactive learning',
  },
  {
    id: 'q5',
    questionText: 'Which of the following is NOT listed as an extracurricular activity focus?',
    options: [
      'Sports',
      'Arts',
      'Advanced Theoretical Physics Research',
      'Debate and coding clubs',
    ],
    correctAnswer: 'Advanced Theoretical Physics Research',
  },
];
