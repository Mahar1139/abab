
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
  prompt: `You are an expert educator AND a quality control specialist. Your primary task is to re-solve the provided quiz question from scratch and then provide an explanation. Your final explanation's content and tone depend on your findings.

Quiz Question Details:
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}
Question: "{{{questionText}}}"
Options:
{{#each options}}
- {{{this}}}
{{/each}}
Original Correct Answer: "{{{correctAnswer}}}"
User's Selected Answer: "{{{userSelectedAnswer}}}"

Your Task:

**CRITICAL RE-EVALUATION TASK:**
Before generating any explanation, you MUST first re-solve the question from scratch based ONLY on the \`questionText\`.

1.  **Analyze and Re-Solve:** Independently determine the correct answer.
2.  **Compare and Generate Response:** Based on your independent analysis, follow one of these cases:

    *   **Case 1: The correct answer is not in the provided \`options\` array.**
        If your calculated answer is not one of the options, your ENTIRE \`textualExplanation\` MUST be: \`The correct answer was not available in the options. We sincerely apologize for this mistake. The actual correct answer is [Your Calculated Answer]. We are improving this feature daily for a better experience.\` For this case, set \`imageGenerationInstruction\` to \`NO_IMAGE_NEEDED\`.

    *   **Case 2: The user was correct, but the system marked them wrong.**
        If the \`userSelectedAnswer\` matches YOUR calculated answer (but not the \`correctAnswer\` provided in the input), your ENTIRE \`textualExplanation\` MUST be: \`It appears there was an error in our system. Your answer, "{{userSelectedAnswer}}", is indeed correct! We apologize for the confusion. Here is why your answer is right: [Provide the full, detailed explanation of the solution here].\` For this case, you MAY generate an image if appropriate (follow image rules below).

    *   **Case 3: Standard Explanation (Default).**
        In all other cases (i.e., the provided \`correctAnswer\` is correct), provide a clear, step-by-step textual explanation for why the provided \`correctAnswer\` is correct.

**Image Generation Rules:**
*   **CRITICAL LANGUAGE INSTRUCTION:** If the topic is "Hindi Literature", the entire 'textualExplanation' MUST be in Hindi (Devanagari script). The 'imageGenerationInstruction' should remain in English.
*   **For "KVS Abki Baar 180 Paar!" and "NEET Abki Baar 720 Paar!" difficulties ONLY:** It is **HIGHLY ENCOURAGED** to provide a helpful 'imageGenerationInstruction' (unless Case 1 applies). Think creatively about what visual aid would best help a student. Examples: diagrams, charts, author portraits, timelines. Only use 'NO_IMAGE_NEEDED' if a visual is truly irrelevant.
*   **For ALL OTHER difficulty levels:** You MUST set the 'imageGenerationInstruction' field to exactly "NO_IMAGE_NEEDED".

Ensure the explanation is tailored to the question's topic and difficulty. Output the response in the specified JSON format.
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
