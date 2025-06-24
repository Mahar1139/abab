
'use server';
/**
 * @fileOverview Explains the answer to a quiz question, potentially generating an image for clarification.
 *
 * - explainQuizAnswer - A function that generates an explanation for a quiz answer.
 * - ExplainQuizAnswerInput - The input type for the function.
 * - ExplainQuizAnswerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainQuizAnswerInputSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('The multiple-choice options provided for the question.'),
  correctAnswer: z.string().describe('The correct answer string from the options.'),
  userSelectedAnswer: z.string().describe('The answer selected by the user.'),
  topic: z.string().describe('The topic of the quiz question.'),
  difficulty: z.string().describe('The difficulty level of the quiz question.'),
});
export type ExplainQuizAnswerInput = z.infer<typeof ExplainQuizAnswerInputSchema>;

const ExplainQuizAnswerOutputSchema = z.object({
  explanationText: z.string().describe('A detailed textual explanation of how to arrive at the correct answer.'),
  generatedImageUri: z.string().optional().describe('A data URI (e.g., "data:image/png;base64,...") of a generated image to aid the explanation, if one was deemed necessary and created.'),
});
export type ExplainQuizAnswerOutput = z.infer<typeof ExplainQuizAnswerOutputSchema>;

// This schema is for the output of the first LLM call (explanation + image prompt)
const ExplanationAndImagePromptSchema = z.object({
  textualExplanation: z.string().describe("The detailed step-by-step textual explanation for the correct answer, or an apology if the question was flawed. This is the final text to be shown to the user."),
  imageGenerationInstruction: z.string().describe("If a simple image would clarify the explanation, provide a concise prompt here (e.g., 'A diagram of a right-angled triangle'). If no image is needed or if the question was flawed and resulted in an apology, this MUST be exactly 'NO_IMAGE_NEEDED'.")
});

const explanationPrompt = ai.definePrompt({
  name: 'explainQuizAnswerTextPrompt',
  input: {schema: ExplainQuizAnswerInputSchema},
  output: {schema: ExplanationAndImagePromptSchema},
  prompt: `You are an expert educator AND a quality control specialist. Your primary task is to re-solve the provided quiz question from scratch and then provide an explanation. Your response will depend on your findings.

**Step 1: Re-Solve the Question**
First, ignore the provided options and \`correctAnswer\`. Analyze the \`questionText\` and independently calculate the correct answer. Let's call this your \`[Calculated Answer]\`.

**Step 2: Generate Response Based on Analysis**
Now, compare your \`[Calculated Answer]\` with the provided \`options\` and \`correctAnswer\` from the input, and follow EXACTLY one of the three cases below. Do NOT mix them.

---
**Case A: The question is flawed (your calculated answer is not in the options).**

If your \`[Calculated Answer]\` is NOT present in the \`options\` array, then your response MUST be:
- \`textualExplanation\`: "The correct answer was not available in the options. We sincerely apologize for this mistake. The actual correct answer is [Your Calculated Answer]. We are improving this feature daily for a better experience."
- \`imageGenerationInstruction\`: "NO_IMAGE_NEEDED"

Do NOT provide a step-by-step solution in this case. Only provide the apology and the correct answer.

---
**Case B: The question is valid, but the system's provided \`correctAnswer\` was wrong.**

If your \`[Calculated Answer]\` IS present in the \`options\` array, but it is DIFFERENT from the provided \`correctAnswer\` input field:
- \`textualExplanation\`: Start with this exact phrase: "It appears there was an error in our system's designated answer. The true correct answer is '[Your Calculated Answer]'! We apologize for the confusion." Then, if the user's selected answer was correct (i.e., it matches your \`[Calculated Answer]\`), add "Congratulations, your answer was right!" After that, provide the full, step-by-step explanation of how to arrive at your \`[Calculated Answer]\`.
- \`imageGenerationInstruction\`: You MAY generate an image if it helps the explanation. If not, use "NO_IMAGE_NEEDED".

---
**Case C: Standard Explanation (The question and provided answer are correct).**

If your \`[Calculated Answer]\` is the SAME as the provided \`correctAnswer\` input field:
- \`textualExplanation\`: Provide a clear, step-by-step textual explanation for why the \`correctAnswer\` is correct. If the user's answer was wrong, tailor the explanation to be helpful. If the user's answer was correct, start with "Correct! Here's how we solve it:".
- \`imageGenerationInstruction\`: Follow the image generation rules based on the quiz difficulty.

---

**CRITICAL LANGUAGE INSTRUCTION:**
If the topic is "Hindi Literature", the entire 'textualExplanation' MUST be in Hindi (Devanagari script), regardless of the case. The 'imageGenerationInstruction' should remain in English.

**Image Generation Rules (for Case B and C):**
*   For "KVS Abki Baar 180 Paar!" and "NEET Abki Baar 720 Paar!" difficulties: It is HIGHLY ENCOURAGED to provide a helpful 'imageGenerationInstruction'.
*   For ALL OTHER difficulty levels: You MUST set the 'imageGenerationInstruction' field to "NO_IMAGE_NEEDED".

**Input Details for Your Analysis:**
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}
Question: "{{{questionText}}}"
Options:
{{#each options}}
- {{{this}}}
{{/each}}
Original Correct Answer Provided to System: "{{{correctAnswer}}}"
User's Selected Answer: "{{{userSelectedAnswer}}}"

Now, begin your analysis and provide the output in the specified JSON format based on the cases above.
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

export async function explainQuizAnswer(input: ExplainQuizAnswerInput): Promise<ExplainQuizAnswerOutput> {
  return explainQuizAnswerFlow(input);
}

const explainQuizAnswerFlow = ai.defineFlow(
  {
    name: 'explainQuizAnswerFlow',
    inputSchema: ExplainQuizAnswerInputSchema,
    outputSchema: ExplainQuizAnswerOutputSchema,
  },
  async (input) => {
    // Step 1: Get textual explanation and an image prompt (if needed)
    const explanationResponse = await explanationPrompt(input);
    const { textualExplanation, imageGenerationInstruction } = explanationResponse.output!;

    if (!textualExplanation) {
      throw new Error("AI failed to generate a textual explanation.");
    }

    let generatedImageUri: string | undefined = undefined;
    
    const specialBatches = ["KVS Abki Baar 180 Paar!", "NEET Abki Baar 720 Paar!"];

    // Step 2: Conditionally generate an image, only for the special batches
    if (
      specialBatches.includes(input.difficulty) &&
      imageGenerationInstruction && 
      imageGenerationInstruction.trim() !== "NO_IMAGE_NEEDED" && 
      imageGenerationInstruction.trim() !== ""
    ) {
      try {
        console.log(`Attempting to generate image with prompt: "${imageGenerationInstruction}" for special batch.`);
        const imageGenResult = await ai.generate({
          model: 'googleai/gemini-2.0-flash-preview-image-generation',
          prompt: imageGenerationInstruction,
          config: {
            responseModalities: ['TEXT', 'IMAGE'],
            safetySettings: [ // Added safety settings here
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            ]
          },
        });
        
        if (imageGenResult.media && imageGenResult.media.url) {
          generatedImageUri = imageGenResult.media.url;
          console.log("Image generated successfully.");
        } else {
          console.warn("Image generation was attempted but no image URL was returned. Image prompt was:", imageGenerationInstruction, "Result:", imageGenResult);
        }
      } catch (err) {
        console.error("Error during image generation for explanation:", err);
        // Optionally, you could add a note to the textual explanation that an image could not be generated.
      }
    } else {
        console.log("No image generation needed (either not special batch, or instruction was 'NO_IMAGE_NEEDED').");
    }

    return {
      explanationText: textualExplanation,
      generatedImageUri: generatedImageUri,
    };
  }
);
