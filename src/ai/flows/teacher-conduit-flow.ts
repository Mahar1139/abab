
'use server';
/**
 * @fileOverview An AI flow to provide NCERT-based educational content for teachers.
 *
 * - generateTeacherMaterial - A function that answers specific questions or suggests Q&A for a given class, subject, and chapter.
 * - TeacherConduitInput - The input type for the generateTeacherMaterial function.
 * - TeacherConduitOutput - The return type for the generateTeacherMaterial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TeacherConduitInputSchema = z.object({
  classLevel: z.string().describe('The class level (e.g., "Class 9", "LKG", "Class 12").'),
  subject: z.string().describe('The subject (e.g., "Mathematics", "Science", "English").'),
  chapterInfo: z.string().describe('The chapter name and/or number (e.g., "Chapter 1: Matter in Our Surroundings").'),
  userQuestion: z.string().optional().describe('A specific question the teacher wants an answer to. If empty, the AI will suggest questions and answers.'),
});
export type TeacherConduitInput = z.infer<typeof TeacherConduitInputSchema>;

const TeacherConduitOutputSchema = z.object({
  generatedContent: z.string().describe("The AI-generated answer to the teacher's question, or a list of suggested NCERT-based questions and answers for the specified chapter. If suggesting questions, format them clearly with questions and their corresponding answers."),
});
export type TeacherConduitOutput = z.infer<typeof TeacherConduitOutputSchema>;

export async function generateTeacherMaterial(input: TeacherConduitInput): Promise<TeacherConduitOutput> {
  return teacherConduitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'teacherConduitPrompt',
  input: {schema: TeacherConduitInputSchema},
  output: {schema: TeacherConduitOutputSchema},
  prompt: `You are an expert educational assistant specializing in the NCERT curriculum for Indian schools. You are interacting with a teacher who needs assistance.

Class: {{{classLevel}}}
Subject: {{{subject}}}
Chapter: {{{chapterInfo}}}

Your task is to provide educational material based on the NCERT syllabus for the given parameters.

{{#if userQuestion}}
The teacher has asked the following specific question:
"{{{userQuestion}}}"

Please provide a clear, concise, and accurate answer to this question. The answer should be comprehensive enough for a teacher to use for explanations or to derive teaching points. Ensure the answer is strictly based on NCERT content for the specified class, subject, and chapter.
{{else}}
The teacher has not asked a specific question. In this case, please generate 3-5 relevant NCERT-based questions that a teacher could ask their students for the specified class, subject, and chapter. For each question, also provide a detailed and accurate NCERT-based answer.

Present the questions and answers clearly. For example:

Question 1: [Full Text of Question 1]
Answer 1: [Detailed NCERT-based Answer to Question 1]

Question 2: [Full Text of Question 2]
Answer 2: [Detailed NCERT-based Answer to Question 2]

...and so on for 3 to 5 questions.
{{/if}}

Ensure all information provided is accurate and aligns with the NCERT curriculum.
  `,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  }
});

const teacherConduitFlow = ai.defineFlow(
  {
    name: 'teacherConduitFlow',
    inputSchema: TeacherConduitInputSchema,
    outputSchema: TeacherConduitOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate educational content.");
    }
    return output;
  }
);
