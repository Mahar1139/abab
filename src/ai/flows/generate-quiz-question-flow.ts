
'use server';
/**
 * @fileOverview Generates a quiz question based on topic, difficulty, and previous questions.
 *
 * - generateQuizQuestion - A function that creates a single quiz question.
 * - GenerateQuizQuestionInput - The input type for the function.
 * - GenerateQuizQuestionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionInputSchema = z.object({
  topic: z.string().describe('The subject or topic for the quiz question (e.g., Biology, Space Exploration, History).'),
  difficulty: z.string().describe('The desired difficulty level (e.g., Beginner, Easy, Normal, Hard, Extreme, Legend).'),
  previousQuestionTexts: z.array(z.string()).optional().describe('An array of question texts already asked in this session to avoid direct repetition.'),
});
export type GenerateQuizQuestionInput = z.infer<typeof GenerateQuizQuestionInputSchema>;

const GenerateQuizQuestionOutputSchema = z.object({
  questionText: z.string().describe('The text of the generated quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four unique answer options.'),
  correctAnswer: z.string().describe('The correct answer from the provided options.'),
  source: z.string().describe('A brief description of the question\'s origin, type, or the specific sub-topic it covers (e.g., "Basic Cell Biology", "Inspired by NEET Physics syllabus", "General World War II History").'),
});
export type GenerateQuizQuestionOutput = z.infer<typeof GenerateQuizQuestionOutputSchema>;

export async function generateQuizQuestion(input: GenerateQuizQuestionInput): Promise<GenerateQuizQuestionOutput> {
  return generateQuizQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionPrompt',
  input: {schema: GenerateQuizQuestionInputSchema},
  output: {schema: GenerateQuizQuestionOutputSchema},
  prompt: `You are an expert quiz question creator. Your task is to generate a challenging and relevant multiple-choice question.

You MUST provide:
1.  A clear and concise question text.
2.  Exactly four unique answer options.
3.  One of these options MUST be the correct answer.
4.  A brief "source" or "type" for the question (e.g., "Basic Thermodynamics," "Inspired by IIT JEE Chemistry," "Literary Devices," "Famous World Capitals").

Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

{{#if previousQuestionTexts}}
To ensure variety, avoid generating questions that are too similar in content or structure to the following questions already asked in this session:
{{#each previousQuestionTexts}}
- "{{{this}}}"
{{/each}}
{{/if}}

Consider the difficulty level when formulating the question and options:
- Beginner: Very basic concepts, common knowledge.
- Easy: Fundamental concepts, slightly more detail.
- Normal: Standard curriculum-level questions, requires recall and some understanding.
- Hard: More complex applications of concepts, requires deeper understanding and analysis.
- Extreme: Very challenging, may involve multiple concepts, nuanced details, or tricky distractors.
- Legend: Emulate questions from highly competitive exams or advanced topics.
  - If Topic is "Biology" and Difficulty is "Legend", frame a question similar in style and complexity to NEET (National Eligibility cum Entrance Test - India) for medical entrance. Source could be "NEET-style Biology".
  - If Topic is "Physics" or "Chemistry" and Difficulty is "Legend", frame a question similar in style and complexity to IIT JEE (Joint Entrance Examination - India) for engineering entrance. Source could be "IIT JEE-style Physics/Chemistry".
  - If Topic is "Space Exploration" and Difficulty is "Legend", frame a question based on advanced aerospace concepts or recent complex missions. Source could be "Advanced Aerospace Concepts".
  - For other topics at "Legend" level, generate exceptionally challenging questions that test deep expertise. Source could reflect this advanced nature.

Ensure the correct answer is clearly one of the four options.
Ensure all four options are plausible for the given question and difficulty.
Do not explicitly label the correct answer in the options list (e.g., "Option C (Correct)"). Just provide the options. The 'correctAnswer' field in the output JSON will specify the correct one.

Output the question in the specified JSON format.
  `,
   config: {
    safetySettings: [ // Added to potentially allow more diverse question generation
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  }
});

const generateQuizQuestionFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionFlow',
    inputSchema: GenerateQuizQuestionInputSchema,
    outputSchema: GenerateQuizQuestionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate an output for the quiz question.");
    }
    // Ensure the correct answer is one of the options provided
    if (output.options && !output.options.includes(output.correctAnswer)) {
        // Fallback or error handling strategy:
        // Option 1: Log error and pick a random option as correct (not ideal)
        // Option 2: Try to regenerate (could lead to loops)
        // Option 3: Throw an error to be handled by the client
        console.error("AI generated a correct answer that is not in the options list.", output);
        // For now, let's make the first option the correct one if this happens and log an error.
        // A better solution might be to ask the AI to explicitly select from its generated options.
        // Or, if options array is malformed, also error.
        if (output.options.length > 0) {
             output.correctAnswer = output.options[0];
        } else {
            throw new Error("AI generated an empty options list or an invalid correct answer.");
        }
    }
    return output;
  }
);
