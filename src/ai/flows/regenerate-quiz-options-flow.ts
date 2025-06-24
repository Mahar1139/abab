
'use server';
/**
 * @fileOverview Re-solves a quiz question, validates existing options, and generates a new set of options if necessary.
 *
 * - regenerateQuizOptions - A function that re-evaluates a question and creates new options or confirms existing ones.
 * - RegenerateQuizOptionsInput - Input schema.
 * - RegenerateQuizOptionsOutput - Output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegenerateQuizOptionsInputSchema = z.object({
  questionText: z.string().describe('The text of the quiz question to be re-evaluated.'),
  topic: z.string().describe('The topic of the quiz question.'),
  difficulty: z.string().describe('The difficulty level of the quiz question.'),
  currentOptions: z.array(z.string()).length(4).describe('The current list of options presented to the user.')
});
export type RegenerateQuizOptionsInput = z.infer<typeof RegenerateQuizOptionsInputSchema>;

const RegenerateQuizOptionsOutputSchema = z.object({
  options: z.array(z.string()).length(4).optional().describe('A new array of four unique answer options, if regeneration was needed.'),
  correctAnswer: z.string().optional().describe('The re-calculated correct answer, if regeneration was needed.'),
  message: z.string().optional().describe("A message to the user if the original options were correct.")
});
export type RegenerateQuizOptionsOutput = z.infer<typeof RegenerateQuizOptionsOutputSchema>;


export async function regenerateQuizOptions(input: RegenerateQuizOptionsInput): Promise<RegenerateQuizOptionsOutput> {
  return regenerateQuizOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regenerateQuizOptionsPrompt',
  input: {schema: RegenerateQuizOptionsInputSchema},
  output: {schema: RegenerateQuizOptionsOutputSchema},
  prompt: `You are a meticulous quiz question validator and regenerator. Your task is to take an existing quiz question and its current options, re-solve the question from scratch to find the correct answer, and then determine if a regeneration is necessary.

**Step 1: Re-Solve the Question**
1.  Analyze the following question text carefully.
2.  Independently solve it to determine the correct answer. Let's call this your \`[Calculated Answer]\`.

**Question Details:**
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}
Question Text: "{{{questionText}}}"
Current Options: {{#each currentOptions}}
- {{{this}}}
{{/each}}


**Step 2: Validate and Respond**
Now, compare your \`[Calculated Answer]\` with the \`currentOptions\` provided.

*   **Case A: The correct answer IS ALREADY in the options.**
    If your \`[Calculated Answer]\` is found within the \`currentOptions\` array, it means the original options were valid. In this case, your response MUST set the 'message' field with the following exact text: "Sorry, but the options provided are correct. If you have any doubts about the question itself, you can ask the HPS AI Assistant for clarification." The 'options' and 'correctAnswer' fields MUST be omitted from your JSON response.

*   **Case B: The correct answer IS NOT in the options.**
    If your \`[Calculated Answer]\` is NOT found within the \`currentOptions\` array, then you MUST generate a new set of options.
    1.  Create a new set of **exactly four** multiple-choice options.
    2.  One of these new options **MUST** be your \`[Calculated Answer]\`.
    3.  The other three options must be plausible but incorrect distractors.
    4.  The 'message' field in your response MUST be omitted or null.

**CRITICAL INSTRUCTION FOR 'correctAnswer' FIELD (in Case B):**
The 'correctAnswer' field in your JSON output MUST be the exact full text of the correct option string you've placed in the 'options' array.

Output the result in the specified JSON format based on the cases above.
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
    
    if (!output) {
      throw new Error("AI failed to generate a response for option regeneration.");
    }

    // Validate the output based on the two possible cases
    if (output.message) {
      // Case A: A message was returned, so options/correctAnswer should be missing.
      if (output.options || output.correctAnswer) {
        throw new Error("AI returned a message but also included regenerated options, which is an invalid state.");
      }
      return output;
    } else if (output.options && output.correctAnswer) {
      // Case B: Options were returned, so they must be valid.
      if (output.options.length !== 4) {
        throw new Error(`AI regenerated an invalid number of options (${output.options.length}). Expected 4.`);
      }
      if (!output.options.includes(output.correctAnswer)) {
        throw new Error(`AI regenerated a correct answer ("${output.correctAnswer}") that is not in the new options list.`);
      }
      return output;
    } else {
      // Neither case was met, which is an error.
      throw new Error("AI response for option regeneration was incomplete. It must provide either a message or a valid set of new options and a correct answer.");
    }
  }
);

    