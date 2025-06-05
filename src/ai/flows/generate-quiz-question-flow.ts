
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
  topic: z.string().describe('The subject or topic for the quiz question (e.g., Biology, Space Exploration, Quantitative Aptitude).'),
  difficulty: z.string().describe('The desired difficulty level. This can be general (e.g., Beginner, Easy, Normal, Hard, Extreme) or specific for competitive styles (e.g., "Normal - NEET", "Legend - NEET", "Legend - JEE Mains", "Legend - JEE Advanced", "Legend - SpaceX/Aerospace", "Normal - SBI PO Prelims", "Legend - SBI PO Mains", "Legend - General Advanced").'),
  previousQuestionTexts: z.array(z.string()).optional().describe('An array of question texts already asked in this session to avoid direct repetition.'),
});
export type GenerateQuizQuestionInput = z.infer<typeof GenerateQuizQuestionInputSchema>;

const GenerateQuizQuestionOutputSchema = z.object({
  questionText: z.string().describe('The text of the generated quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four unique answer options.'),
  correctAnswer: z.string().describe('The correct answer from the provided options.'),
  source: z.string().describe('A brief description of the question\'s origin, type, or the specific sub-topic it covers (e.g., "Basic Cell Biology", "Inspired by NEET Physics syllabus (Normal Difficulty)", "SBI PO Prelims-style (Quantitative Aptitude)").'),
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
4.  A brief "source" or "type" for the question that reflects its origin, topic, and difficulty.

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

- If difficulty is "Normal - NEET":
  For topic "{{topic}}" (expected to be Biology, Physics, or Chemistry), generate a question of "Normal" difficulty in the style and format of NEET (National Eligibility cum Entrance Test - India) for medical entrance. The question must be a single correct multiple-choice question. The source should be "NEET-style Question (Normal Difficulty, {{topic}} based)". The questions should be inspired by the type of concepts tested in previous NEET papers and reference materials like MTG books, focusing on core understanding suitable for a normal difficulty assessment.
- If difficulty is "Legend - NEET":
  For topic "{{topic}}" (expected to be Biology, Physics, or Chemistry), generate a question similar in style and complexity to NEET. The question must be a single correct multiple-choice question. The source should be "NEET-style Question (Legend Difficulty, {{topic}} based)". Ensure plausible and challenging distractors.

- If difficulty is "Legend - JEE Mains":
  For topic "{{topic}}" (expected to be Physics, Chemistry, or Mathematics), generate a question similar in style and complexity to JEE Mains (India) for engineering entrance. The question must be a single correct multiple-choice question, often testing application of concepts. The source should be "JEE Mains-style Question ({{topic}} based)".
- If difficulty is "Legend - JEE Advanced":
  For topic "{{topic}}" (expected to be Physics, Chemistry, or Mathematics), generate a question similar in style and complexity to JEE Advanced (India). These questions are typically more challenging, may require combining multiple concepts or deeper analytical skills. Ensure it's a single correct MCQ with four options. The source should be "JEE Advanced-style Question ({{topic}} based)".

- If difficulty is "Legend - SpaceX/Aerospace":
  For topic "{{topic}}" (most relevant if topic is Space Exploration or Physics), generate a challenging question related to modern rocketry, aerospace engineering, orbital mechanics, or complex space missions. The source should be "Advanced Aerospace/SpaceX-style Question ({{topic}} based)".

- If difficulty is "Normal - SBI PO Prelims":
  For topic "{{topic}}" (e.g., Quantitative Aptitude, Reasoning Ability, English Language, Banking & Financial Awareness), generate a question of "Normal" difficulty in the style of SBI PO (State Bank of India Probationary Officer) Preliminary exams. Your primary reference for question style, topics, and difficulty should be **previous year question papers for SBI PO Preliminary exams and widely recognized SBI PO preparation books** (such as those by Arihant, Disha, or R.S. Aggarwal for quantitative aptitude/reasoning, or S.P. Bakshi for English, or standard banking awareness guides). Generate typical questions seen in these sources, like quant problems, logical reasoning puzzles, grammar/vocabulary questions, or basic banking terms. The source should be "SBI PO Prelims-style Question ({{topic}} based)".
- If difficulty is "Legend - SBI PO Mains":
  For topic "{{topic}}" (e.g., Quantitative Aptitude, Reasoning Ability, English Language, Banking & Financial Awareness), generate a more complex question in the style of SBI PO Mains exams. Your primary reference for question style, topics, and complexity should be **previous year question papers for SBI PO Mains exams and advanced-level SBI PO preparation books**. These questions are typically more challenging, often involving data interpretation sets (for quantitative aptitude), complex logical reasoning puzzles, advanced reading comprehension passages (for English), or in-depth banking and financial awareness. Ensure it's a single correct MCQ with four challenging options. The source should be "SBI PO Mains-style Question ({{topic}} based)".

- If difficulty is "Legend - General Advanced" (or if it's just "Legend" and the topic/difficulty combination isn't one of the specific exam styles above):
  For the given "{{topic}}", generate an exceptionally challenging question that tests deep expertise. The source should be "Advanced {{{topic}}} Question (Legend Difficulty)".

For ALL "Legend", "Normal - NEET", and "SBI PO" categories, ensure the question is appropriately challenging, options include plausible and challenging distractors, and the question is well-posed.
If a specific style (like NEET or SBI PO) is requested for a topic where it's not highly relevant (e.g., "Legend - NEET" for "History", or "Normal - SBI PO Prelims" for "Arts"), try to make an advanced/normal question for that topic and use "Advanced {{{topic}}} Question" or "Normal {{{topic}}} Question" as the source, or default to the general advanced/legend/normal setting for that topic.

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
        console.error("AI generated an invalid number of options. Output was:", JSON.stringify(output));
        throw new Error(`AI generated an invalid number of options (${output.options?.length || 0}). Expected 4 distinct options. Please try a different topic/difficulty or try again.`);
    }

    if (!output.options.includes(output.correctAnswer)) {
        console.error("AI generated a correct answer that is not in the options list. Output was:", JSON.stringify(output));
        throw new Error(`AI generated a correct answer ("${output.correctAnswer}") that is not present in the provided options: [${output.options.join(", ")}]. Please try again or select a different topic/difficulty.`);
    }
    return output;
  }
);

