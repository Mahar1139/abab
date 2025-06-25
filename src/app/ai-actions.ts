
'use server';

import { getSchoolInformation, type SchoolInformationInput, type SchoolInformationOutput } from '@/ai/flows/school-info-flow';
import { suggestAdmissionQuestions, type SuggestAdmissionQuestionsInput, type SuggestAdmissionQuestionsOutput } from '@/ai/flows/suggest-admission-questions';
import { suggestFacultyQuestions, type SuggestFacultyQuestionsInput, type SuggestFacultyQuestionsOutput } from '@/ai/flows/suggest-faculty-questions';
import { generateQuizQuestion, type GenerateQuizQuestionInput, type GenerateQuizQuestionOutput } from '@/ai/flows/generate-quiz-question-flow';
import { explainQuizAnswer, type ExplainQuizAnswerInput, type ExplainQuizAnswerOutput } from '@/ai/flows/explain-quiz-answer-flow';
import { regenerateQuizOptions, type RegenerateQuizOptionsInput, type RegenerateQuizOptionsOutput } from '@/ai/flows/regenerate-quiz-options-flow';
import { generateTeacherMaterial, type TeacherConduitInput, type TeacherConduitOutput } from '@/ai/flows/teacher-conduit-flow';


// Exporting all as server actions
export async function askSchoolAI(input: SchoolInformationInput): Promise<SchoolInformationOutput> {
    return getSchoolInformation(input);
}

export async function suggestAdmissionQuestionsAction(input: SuggestAdmissionQuestionsInput): Promise<SuggestAdmissionQuestionsOutput> {
    return suggestAdmissionQuestions(input);
}

export async function suggestFacultyQuestionsAction(input: SuggestFacultyQuestionsInput): Promise<SuggestFacultyQuestionsOutput> {
    return suggestFacultyQuestions(input);
}

export async function generateQuizQuestionAction(input: GenerateQuizQuestionInput): Promise<GenerateQuizQuestionOutput> {
    return generateQuizQuestion(input);
}

export async function explainQuizAnswerAction(input: ExplainQuizAnswerInput): Promise<ExplainQuizAnswerOutput> {
    return explainQuizAnswer(input);
}

export async function regenerateQuizOptionsAction(input: RegenerateQuizOptionsInput): Promise<RegenerateQuizOptionsOutput> {
    return regenerateQuizOptions(input);
}

export async function generateTeacherMaterialAction(input: TeacherConduitInput): Promise<TeacherConduitOutput> {
    return generateTeacherMaterial(input);
}
