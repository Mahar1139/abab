
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-faculty-questions.ts';
import '@/ai/flows/suggest-admission-questions.ts';
import '@/ai/flows/school-info-flow.ts';
import '@/ai/flows/generate-quiz-question-flow.ts';
import '@/ai/flows/teacher-conduit-flow.ts';
import '@/ai/flows/explain-quiz-answer-flow.ts';
import '@/ai/flows/admission-assistant-flow.ts'; // Added import for the new flow
import '@/ai/flows/regenerate-quiz-options-flow.ts';
