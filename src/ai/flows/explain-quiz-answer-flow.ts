
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

export async function explainQuizAnswer(input: ExplainQuizAnswerInput): Promise<ExplainQuizAnswerOutput> {
  return explainQuizAnswerFlow(input);
}

// This schema is for the output of the first LLM call (explanation + image prompt)
const ExplanationAndImagePromptSchema = z.object({
  textualExplanation: z.string().describe("The detailed step-by-step textual explanation for the correct answer. If it's a math problem, show the working. For reasoning, outline the logic."),
  imageGenerationInstruction: z.string().describe("If a simple image (diagram, chart, visual representation) would make this explanation much clearer, provide a concise, direct prompt for an image generation model here (e.g., 'A diagram showing a right-angled triangle with sides labeled A, B, C'). If no image is necessary or if it would be too complex for a simple image, this MUST be exactly 'NO_IMAGE_NEEDED'.")
});

const explanationPrompt = ai.definePrompt({
  name: 'explainQuizAnswerTextPrompt',
  input: {schema: ExplainQuizAnswerInputSchema},
  output: {schema: ExplanationAndImagePromptSchema},
  prompt: `You are an expert educator tasked with explaining the solution to a quiz question. The user wants to understand *why* the correct answer is correct.

Quiz Question Details:
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}
Question: "{{{questionText}}}"
Options:
{{#each options}}
- {{{this}}}
{{/each}}
Correct Answer: "{{{correctAnswer}}}"
User's Selected Answer: "{{{userSelectedAnswer}}}"

Your Task:

**CRITICAL LANGUAGE INSTRUCTION:**
If the topic is "Hindi Literature", the entire 'textualExplanation' MUST be in Hindi (Devanagari script). The 'imageGenerationInstruction' should remain in English as it is for an internal system.

1.  Provide a clear, step-by-step textual explanation detailing how to arrive at the '{{{correctAnswer}}}'.
    *   For mathematical problems, show the complete working and calculations.
    *   For reasoning problems, clearly outline the logical steps or pattern.
    *   For factual questions, explain the relevant concept or fact.
    *   If the user's answer was incorrect, you can briefly mention why their choice might be a common misconception, but the primary focus is on explaining the correct solution path.

2.  Determine if an image is appropriate for the given difficulty level.
    *   **For the "KVS Abki Baar 180 Paar!" and "Abki Baar 720 Paar!" difficulties ONLY:** It is **HIGHLY ENCOURAGED** to provide a helpful 'imageGenerationInstruction'. Think creatively about what visual aid would best help a student preparing for a competitive exam. If a simple image (diagram, chart, visual representation, author portrait, timeline) would make this explanation much clearer, provide a concise, direct prompt for an image generation model here (e.g., 'A diagram showing a right-angled triangle with sides labeled A, B, C'). Only use 'NO_IMAGE_NEEDED' if a visual is truly irrelevant or impossible to represent simply. Examples for Hindi Literature include: a simple portrait of the author mentioned, a timeline of a literary period (e.g., Bhaktikal), a diagram explaining a grammatical concept (e.g., Sandhi), or a simple illustration of a scene from a famous work. Examples for NEET topics include: a clear diagram of a biological process, a labeled anatomical drawing, or a graph illustrating a physics concept.
    *   **For ALL OTHER difficulty levels:** You MUST set the 'imageGenerationInstruction' field to exactly the string "NO_IMAGE_NEEDED". This is a strict rule; visual aids are an exclusive feature for these special batches.

Ensure the explanation is tailored to the question's topic and difficulty.
Output the response in the specified JSON format.
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
    
    const specialBatches = ["KVS Abki Baar 180 Paar!", "Abki Baar 720 Paar!"];

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
