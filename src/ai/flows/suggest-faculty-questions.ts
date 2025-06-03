// src/ai/flows/suggest-faculty-questions.ts
'use server';

/**
 * @fileOverview Generates a list of suggested questions for parents to ask after viewing faculty profiles.
 *
 * - suggestFacultyQuestions - A function that generates the questions.
 * - SuggestFacultyQuestionsInput - The input type for the suggestFacultyQuestions function.
 * - SuggestFacultyQuestionsOutput - The return type for the suggestFacultyQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFacultyQuestionsInputSchema = z.object({
  facultyProfilesText: z
    .string()
    .describe('Text content of the faculty profiles viewed by the parent.'),
});
export type SuggestFacultyQuestionsInput = z.infer<typeof SuggestFacultyQuestionsInputSchema>;

const SuggestFacultyQuestionsOutputSchema = z.object({
  suggestedQuestions: z
    .array(z.string())
    .describe('A list of suggested questions for the parent.'),
});
export type SuggestFacultyQuestionsOutput = z.infer<typeof SuggestFacultyQuestionsOutputSchema>;

export async function suggestFacultyQuestions(input: SuggestFacultyQuestionsInput): Promise<SuggestFacultyQuestionsOutput> {
  return suggestFacultyQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFacultyQuestionsPrompt',
  input: {schema: SuggestFacultyQuestionsInputSchema},
  output: {schema: SuggestFacultyQuestionsOutputSchema},
  prompt: `You are an AI assistant helping parents formulate questions after reviewing faculty profiles.

  Based on the following faculty profiles, suggest a list of questions that a parent might want to ask to better understand the teachers' qualifications and teaching styles. Provide only the question, do not add any prefix such as "Question:".

  Faculty Profiles:
  {{facultyProfilesText}}

  Please provide between 3 to 5 questions.
  `,
});

const suggestFacultyQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestFacultyQuestionsFlow',
    inputSchema: SuggestFacultyQuestionsInputSchema,
    outputSchema: SuggestFacultyQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
