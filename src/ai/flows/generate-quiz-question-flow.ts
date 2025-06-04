
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
  difficulty: z.string().describe('The desired difficulty level. This can be general (e.g., Beginner, Easy, Normal, Hard, Extreme) or specific for Legend level (e.g., "Legend - NEET", "Legend - JEE Mains", "Legend - JEE Advanced", "Legend - SpaceX/Aerospace", "Legend - General Advanced").'),
  previousQuestionTexts: z.array(z.string()).optional().describe('An array of question texts already asked in this session to avoid direct repetition.'),
});
export type GenerateQuizQuestionInput = z.infer<typeof GenerateQuizQuestionInputSchema>;

const GenerateQuizQuestionOutputSchema = z.object({
  questionText: z.string().describe('The text of the generated quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four unique answer options.'),
  correctAnswer: z.string().describe('The correct answer from the provided options.'),
  source: z.string().describe('A brief description of the question\'s origin, type, or the specific sub-topic it covers (e.g., "Basic Cell Biology", "Inspired by NEET Physics syllabus", "General World War II History", "JEE Advanced-style Question (Physics based)").'),
});
export type GenerateQuizQuestionOutput = z.infer<typeof GenerateQuizQuestionOutputSchema>;

export async function generateQuizQuestion(input: GenerateQuizQuestionInput): Promise<GenerateQuizQuestionOutput> {
  return generateQuizQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionPrompt',
  input: {schema: GenerateQuizQuestionInputSchema},
  output: {schema: GenerateQuizQuestionOutputSchema},
  prompt: `You are an expert quiz question creator. Your task is to generate a challenging and relevant multiple-choice question based on the provided topic and difficulty.

You MUST provide:
1.  A clear and concise question text.
2.  Exactly four unique answer options.
3.  One of these options MUST be the correct answer.
4.  A brief "source" or "type" for the question that reflects its origin, topic, and difficulty (e.g., "Beginner Biology", "Hard Space Exploration", "JEE Mains-style Question (Physics based)").

Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

{{#if previousQuestionTexts}}
To ensure variety, avoid generating questions that are too similar in content or structure to the following questions already asked in this session:
{{#each previousQuestionTexts}}
- "{{{this}}}"
{{/each}}
{{/if}}

Consider the difficulty level "{{difficulty}}" when formulating the question and options:
- If difficulty is "Beginner": Generate a very basic concept question from "{{topic}}", suitable for someone with no prior knowledge. Source should be "Beginner {{{topic}}}".
- If difficulty is "Easy": Generate a question on fundamental concepts from "{{topic}}", requiring slight detail. Source should be "Easy {{{topic}}}".
- If difficulty is "Normal": Generate a standard curriculum-level question from "{{topic}}", requiring recall and some understanding. Source should be "Normal {{{topic}}}".
- If difficulty is "Hard": Generate a question on more complex applications of concepts from "{{topic}}", requiring deeper understanding and analysis. Source should be "Hard {{{topic}}}".
- If difficulty is "Extreme": Generate a very challenging question from "{{topic}}", possibly involving multiple concepts, nuanced details, or tricky distractors. Source should be "Extreme {{{topic}}}".
- If difficulty is "Legend - NEET":
  For topic "{{topic}}", generate a question similar in style and complexity to NEET (National Eligibility cum Entrance Test - India) for medical entrance. Focus on Biology, Physics, or Chemistry as appropriate for NEET. The question must be a single correct multiple-choice question. The source should be "NEET-style Question ({{topic}} based)".
- If difficulty is "Legend - JEE Mains":
  For topic "{{topic}}", generate a question similar in style and complexity to JEE Mains (India) for engineering entrance. Focus on Physics, Chemistry, or Mathematics as appropriate for JEE Mains. The question must be a single correct multiple-choice question, often testing application of concepts. The source should be "JEE Mains-style Question ({{topic}} based)".
- If difficulty is "Legend - JEE Advanced":
  For topic "{{topic}}", generate a question similar in style and complexity to JEE Advanced (India). Focus on Physics, Chemistry, or Mathematics as appropriate for JEE Advanced. These questions are typically more challenging, may require combining multiple concepts or deeper analytical skills. Ensure it's a single correct MCQ with four options. The source should be "JEE Advanced-style Question ({{topic}} based)".
- If difficulty is "Legend - SpaceX/Aerospace":
  For topic "{{topic}}", generate a challenging question related to modern rocketry, aerospace engineering, orbital mechanics, or complex space missions. This is most relevant if topic is Space Exploration or Physics. The source should be "Advanced Aerospace/SpaceX-style Question ({{topic}} based)".
- If difficulty is "Legend - General Advanced" (or if it's just "Legend" and the topic/difficulty combination isn't one of the specific exam styles above):
  For the given "{{topic}}", generate an exceptionally challenging question that tests deep expertise. The source should be "Advanced {{{topic}}} Question".

For ALL "Legend" categories, ensure the question is significantly difficult, options include plausible and challenging distractors, and the question is well-posed.
If a specific "Legend" style (like NEET or JEE) is requested for a topic where it's not highly relevant (e.g., "Legend - NEET" for "History"), try to make an advanced question for that topic and use "Advanced {{{topic}}} Question" as the source, or default to "Legend - General Advanced" for that topic.

Ensure the correct answer is clearly one of the four options provided.
Ensure all four options are plausible for the given question and difficulty.
Do not explicitly label the correct answer in the options list (e.g., "Option C (Correct)"). Just provide the options. The 'correctAnswer' field in the output JSON will specify the correct one.

Output the question in the specified JSON format.
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
    
    if (!output.options || output.options.length !== 4) {
        console.error("AI generated an invalid number of options.", output);
        throw new Error("AI generated an invalid number of options. Expected 4.");
    }

    if (!output.options.includes(output.correctAnswer)) {
        console.error("AI generated a correct answer that is not in the options list.", output);
        // Fallback: Make the first option correct if AI fails to include correctAnswer in options
        // This is a pragmatic fallback, but ideally the AI should always follow instructions.
        // Log this event for monitoring.
        output.correctAnswer = output.options[0]; 
    }
    return output;
  }
);

