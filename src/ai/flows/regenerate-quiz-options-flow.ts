
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

// This is the schema the CLIENT receives. It remains unchanged.
const RegenerateQuizOptionsOutputSchema = z.object({
  options: z.array(z.string()).length(4).optional().describe('A new array of four unique answer options, if regeneration was needed.'),
  correctAnswer: z.string().optional().describe('The re-calculated correct answer, if regeneration was needed.'),
  message: z.string().optional().describe("A message to the user if the original options were correct.")
});
export type RegenerateQuizOptionsOutput = z.infer<typeof RegenerateQuizOptionsOutputSchema>;


export async function regenerateQuizOptions(input: RegenerateQuizOptionsInput): Promise<RegenerateQuizOptionsOutput> {
  return regenerateQuizOptionsFlow(input);
}

// NEW INTERNAL SCHEMA for the prompt's output to make it more reliable
const InternalPromptOutputSchema = z.object({
  regenerationNeeded: z.boolean().describe("Set to true if new options were generated. Set to false if not."),
  reasoning: z.string().describe("Brief reasoning for the decision. E.g., 'Correct answer was not in options.' or 'Options are valid.'"),
  messageForUser: z.string().describe("If regenerationNeeded is false, this field contains the message to show the user (e.g., 'Sorry, the options given are correct...'). If regenerationNeeded is true, this MUST be an empty string."),
  newOptions: z.array(z.string()).describe("If regenerationNeeded is true, this is the new array of four options. If false, this MUST be an empty array."),
  newCorrectAnswer: z.string().describe("If regenerationNeeded is true, this is the new correct answer. If false, this MUST be an empty string."),
});

const prompt = ai.definePrompt({
  name: 'regenerateQuizOptionsPrompt',
  input: {schema: RegenerateQuizOptionsInputSchema},
  output: {schema: InternalPromptOutputSchema}, // Use the new internal schema
  prompt: `You are a meticulous quiz question validator and regenerator. Your task is to take an existing quiz question and its current options, re-solve the question from scratch to find the correct answer, and then determine if a regeneration is necessary.

**Step 1: Analyze and Re-Solve the Question**
1.  Analyze the following question text carefully.
2.  Independently solve it to determine the correct answer. Let's call this your \`[Calculated Answer]\`.
3.  If the question is fundamentally flawed, ambiguous, or unsolvable, note this down.

**Question Details:**
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}
Question Text: "{{{questionText}}}"
Current Options: {{#each currentOptions}}
- {{{this}}}
{{/each}}


**Step 2: Validate and Respond**
Now, based on your analysis, you MUST populate all fields of the required JSON output structure. Follow EXACTLY one of the three cases below for how to fill the fields.

---
**Case A: The question is flawed or unsolvable.**
If you determine that the question itself is ambiguous, contains a typo, or is impossible to answer, you MUST respond with:
- \`regenerationNeeded\`: false
- \`reasoning\`: "The question is flawed and cannot be solved."
- \`messageForUser\`: "Sorry, the question appears to be flawed, which is why a correct answer wasn't available. We have noted this for review."
- \`newOptions\`: [] (an empty array)
- \`newCorrectAnswer\`: "" (an empty string)

---
**Case B: The correct answer IS ALREADY in the options.**
If the question is valid and your \`[Calculated Answer]\` IS found within the \`currentOptions\` array, you MUST respond with:
- \`regenerationNeeded\`: false
- \`reasoning\`: "The calculated answer is already present in the current options."
- \`messageForUser\`: "Sorry but the options given are correct. If you have any doubt with the question, you can ask the HPS AI Assistant for an explanation."
- \`newOptions\`: [] (an empty array)
- \`newCorrectAnswer\`: "" (an empty string)

---
**Case C: The correct answer IS NOT in the options (Regeneration needed).**
If the question is valid and your \`[Calculated Answer]\` is NOT found within the \`currentOptions\` array, then you MUST generate a new set of options and respond with:
- \`regenerationNeeded\`: true
- \`reasoning\`: "The calculated correct answer was not in the original options."
- \`messageForUser\`: "" (an empty string)
- \`newOptions\`: A new array of **exactly four** plausible options, one of which **MUST** be your \`[Calculated Answer]\`.
- \`newCorrectAnswer\`: Your \`[Calculated Answer]\`. This **MUST** exactly match one of the strings in the \`newOptions\` array.

---

**CRITICAL INSTRUCTION:**
You MUST ALWAYS return a JSON object with all five fields: \`regenerationNeeded\`, \`reasoning\`, \`messageForUser\`, \`newOptions\`, and \`newCorrectAnswer\`. Do not omit any fields. Populate them according to the cases described above.

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
    outputSchema: RegenerateQuizOptionsOutputSchema, // The flow still outputs the client-facing schema
  },
  async (input): Promise<RegenerateQuizOptionsOutput> => {
    const {output: internalOutput} = await prompt(input);
    
    if (!internalOutput) {
      throw new Error("AI failed to generate a response for option regeneration.");
    }
    
    if (internalOutput.regenerationNeeded) {
        // Regeneration happened, validate the output
        if (!internalOutput.newOptions || internalOutput.newOptions.length !== 4) {
             throw new Error(`AI regenerated an invalid number of options (${internalOutput.newOptions?.length || 0}). Expected 4.`);
        }
        if (!internalOutput.newCorrectAnswer || !internalOutput.newOptions.includes(internalOutput.newCorrectAnswer)) {
            throw new Error(`AI regenerated a correct answer ("${internalOutput.newCorrectAnswer}") that is not present in the new options list.`);
        }
        // Return only the relevant fields to the client in the expected format
        return {
            options: internalOutput.newOptions,
            correctAnswer: internalOutput.newCorrectAnswer,
        };
    } else {
        // No regeneration needed, validate the message
        if (!internalOutput.messageForUser) {
             throw new Error("AI indicated no regeneration was needed but failed to provide a message for the user.");
        }
        // Return only the relevant fields to the client in the expected format
        return {
            message: internalOutput.messageForUser,
        };
    }
  }
);
