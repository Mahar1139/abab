// src/ai/flows/suggest-admission-questions.ts
'use server';

/**
 * @fileOverview AI-powered question suggestion flow for admissions information.
 *
 * - suggestAdmissionQuestions - A function that generates a list of questions a prospective student might have after reviewing admissions information.
 * - SuggestAdmissionQuestionsInput - The input type for the suggestAdmissionQuestions function.
 * - SuggestAdmissionQuestionsOutput - The return type for the suggestAdmissionQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAdmissionQuestionsInputSchema = z.object({
  admissionsInfo: z
    .string()
    .describe(
      'The admissions information that the student has reviewed.'
    ),
});
export type SuggestAdmissionQuestionsInput = z.infer<
  typeof SuggestAdmissionQuestionsInputSchema
>;

const SuggestAdmissionQuestionsOutputSchema = z.object({
  questions: z
    .array(z.string())
    .describe(
      'An array of questions that a prospective student might have after reviewing the admissions information.'
    ),
});
export type SuggestAdmissionQuestionsOutput = z.infer<
  typeof SuggestAdmissionQuestionsOutputSchema
>;

export async function suggestAdmissionQuestions(
  input: SuggestAdmissionQuestionsInput
): Promise<SuggestAdmissionQuestionsOutput> {
  return suggestAdmissionQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAdmissionQuestionsPrompt',
  input: {schema: SuggestAdmissionQuestionsInputSchema},
  output: {schema: SuggestAdmissionQuestionsOutputSchema},
  prompt: `You are an AI assistant that helps prospective students by suggesting questions they might have after reviewing the admissions information for Himalaya Public School.

  Given the following admissions information:
  {{admissionsInfo}}

  Generate a list of questions that a prospective student might have. Focus on questions that address potential concerns, knowledge gaps, or areas where clarification is needed.  Return the questions as a JSON array of strings.
  `,
});

const suggestAdmissionQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestAdmissionQuestionsFlow',
    inputSchema: SuggestAdmissionQuestionsInputSchema,
    outputSchema: SuggestAdmissionQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
