
'use server';
/**
 * @fileOverview Re-solves a quiz question and generates a new set of options.
 *
 * - regenerateQuizOptions - A function that re-evaluates a question and creates new options.
 * - RegenerateQuizOptionsInput - Input schema.
 * - RegenerateQuizOptionsOutput - Output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegenerateQuizOptionsInputSchema = z.object({
  questionText: z.string().describe('The text of the quiz question to be re-evaluated.'),
  topic: z.string().describe('The topic of the quiz question.'),
  difficulty: z.string().describe('The difficulty level of the quiz question.'),
});
export type RegenerateQuizOptionsInput = z.infer<typeof RegenerateQuizOptionsInputSchema>;

const RegenerateQuizOptionsOutputSchema = z.object({
  options: z.array(z.string()).length(4).describe('A new array of exactly four unique answer options.'),
  correctAnswer: z.string().describe('The re-calculated correct answer, which MUST be one of the strings in the "options" array.'),
});
export type RegenerateQuizOptionsOutput = z.infer<typeof RegenerateQuizOptionsOutputSchema>;

export async function regenerateQuizOptions(input: RegenerateQuizOptionsInput): Promise<RegenerateQuizOptionsOutput> {
  return regenerateQuizOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regenerateQuizOptionsPrompt',
  input: {schema: RegenerateQuizOptionsInputSchema},
  output: {schema: RegenerateQuizOptionsOutputSchema},
  prompt: `You are a meticulous quiz question validator and regenerator. Your task is to take an existing quiz question, re-solve it from scratch to find the correct answer, and then generate a new set of four plausible multiple-choice options, ensuring your re-calculated correct answer is one of them.

  **Critical Task: Re-Solve the Question First**
  1.  Analyze the following question text carefully.
  2.  Independently solve it to determine the correct answer. Do NOT assume the original question had a correct answer in its options.

  **Question Details:**
  Topic: {{{topic}}}
  Difficulty: {{{difficulty}}}
  Question Text: "{{{questionText}}}"

  **Generation Task:**
  After you have re-solved the question and found the correct answer:
  1.  Create a new set of **exactly four** multiple-choice options.
  2.  One of these options **MUST** be your newly calculated correct answer.
  3.  The other three options must be plausible but incorrect distractors, relevant to the question's topic and difficulty.
  4.  Ensure the format of all options is consistent (e.g., if the answer is a ratio, all options should be ratios).

  **CRITICAL INSTRUCTION FOR 'correctAnswer' FIELD:**
  The 'correctAnswer' field in your JSON output MUST be the exact full text of the correct option string you've placed in the 'options' array.

  Output the result in the specified JSON format.
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

const regenerateQuizOptionsFlow = ai.defineFlow(
  {
    name: 'regenerateQuizOptionsFlow',
    inputSchema: RegenerateQuizOptionsInputSchema,
    outputSchema: RegenerateQuizOptionsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output || !output.options || output.options.length !== 4 || !output.options.includes(output.correctAnswer)) {
        throw new Error("AI failed to regenerate a valid set of options for the question.");
    }
    return output;
  }
);
