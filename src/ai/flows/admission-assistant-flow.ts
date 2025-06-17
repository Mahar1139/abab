
'use server';
/**
 * @fileOverview An AI assistant to help users with admission-related queries.
 *
 * - assistWithAdmissions - A function that provides answers to admission questions.
 * - AdmissionAssistantInput - Input schema.
 * - AdmissionAssistantOutput - Output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fullAdmissionsText } from '@/app/admissions/admission-content';

const AdmissionAssistantInputSchema = z.object({
  question: z.string().describe("The user's question regarding the admissions process or form."),
});
export type AdmissionAssistantInput = z.infer<typeof AdmissionAssistantInputSchema>;

const AdmissionAssistantOutputSchema = z.object({
  answer: z.string().describe("The AI's helpful response."),
});
export type AdmissionAssistantOutput = z.infer<typeof AdmissionAssistantOutputSchema>;

export async function assistWithAdmissions(input: AdmissionAssistantInput): Promise<AdmissionAssistantOutput> {
  return admissionAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'admissionAssistantPrompt',
  input: {schema: AdmissionAssistantInputSchema},
  output: {schema: AdmissionAssistantOutputSchema},
  prompt: `You are a friendly AI assistant for Himalaya Public School, specifically designed to help users with the admissions process and answer questions they might have while looking at the admissions information or conceptually filling out an admission form.

Use the following official admissions information as your primary knowledge source:
---
${fullAdmissionsText}
---

When answering questions, be clear, concise, and helpful.

If the user asks about common issues when filling out forms, provide general advice such as:
- "For fields like 'Phone Number', ensure you are entering the correct number of digits, typically 10 for a local number. If you've entered 11, double-check if you've included a country code or an extra digit by mistake."
- "Numeric fields, such as 'Age' or 'Previous Marks', usually only accept numbers. Please avoid typing letters or special symbols in these fields."
- "For email addresses, make sure it's in a valid format like 'example@domain.com'."
- "Required fields are usually marked and must be completed to submit the form."

Do not attempt to validate specific data the user types unless they explicitly provide it in their question. Your role is to provide information and general guidance.

User's question: {{{question}}}
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

const admissionAssistantFlow = ai.defineFlow(
  {
    name: 'admissionAssistantFlow',
    inputSchema: AdmissionAssistantInputSchema,
    outputSchema: AdmissionAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate an answer for the admission assistance query.");
    }
    return output;
  }
);
