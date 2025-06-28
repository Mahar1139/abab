
'use server';
/**
 * @fileOverview Generates a quiz question based on topic, difficulty, and previous questions.
 *
 * - generateQuizQuestion - A function that creates a single quiz question.
 * - GenerateQuizQuestionInput - The input type for the function.
 * - GenerateQuizQuestionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';

const GenerateQuizQuestionInputSchema = z.object({
  topic: z.string().describe('The subject or topic for the quiz question (e.g., Biology, Space Exploration, Quantitative Aptitude).'),
  difficulty: z.string().describe('The desired difficulty level. This can be general (e.g., Beginner, Easy, Normal, Hard, Extreme) or specific for competitive styles (e.g., "Normal - NEET", "Legend - JEE Mains", "Normal - SBI PO Prelims", "Board Exam: Standard (Class 12)").'),
  previousQuestionTexts: z.array(z.string()).optional().describe('An array of question texts already asked in this session to avoid direct repetition.'),
});
export type GenerateQuizQuestionInput = z.infer<typeof GenerateQuizQuestionInputSchema>;

const GenerateQuizQuestionOutputSchema = z.object({
  questionText: z.string().describe('The text of the generated quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four unique answer options.'),
  correctAnswer: z.string().describe('The correct answer from the provided options. This MUST be the exact text of one of the strings in the "options" array.'),
  source: z.string().describe('A brief description of the question\'s origin, type, or the specific sub-topic it covers (e.g., "Basic Cell Biology", "Inspired by NEET Physics syllabus (Normal Difficulty)", "SBI PO Prelims style (Quantitative Aptitude)").'),
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

**Formatting Options Correctly:**
- For questions that require an answer in a specific mathematical or structured format (e.g., ratios like "X:Y:Z", algebraic expressions, coordinates, percentages, units of measurement), ensure that ALL FOUR options provided are in that SAME format.
- For example, if the question asks for a new ratio of investments like "A, B, and C invested in a business in the ratio 5:6:8...", the options should be ratios like "60:69:88", "50:60:70", etc., NOT single numbers unless the question specifically asks for a single numerical component of a ratio.
- The options should be plausible distractors and the correct answer must be one of them.

**Accuracy and Reasoning:**
For all questions, especially those involving logical deduction, multi-step calculations, or reasoning puzzles (like family relations, directions, seating arrangements), ensure your designated 'correctAnswer' is unambiguously and verifiably correct based on the 'questionText'. Double-check your internal reasoning process before finalizing the output. If there is any ambiguity in the question or the deduction of the answer, please try to rephrase the question or generate a different one to ensure clarity and correctness. Your goal is to be a reliable source of well-posed questions with accurate answers.

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

- If difficulty is "Board Exam: Standard (Class 10)":
  Generate a question of standard difficulty for a Class 10 student on "{{topic}}", testing fundamental concepts from the syllabus. The source should be "Board Exam-style Question (Class 10, {{topic}} based)".
- If difficulty is "Board Exam: Standard (Class 12)":
  Generate a question of standard difficulty for a Class 12 student on "{{topic}}". The source should be "Board Exam-style Question (Class 12, {{topic}} based)".
- If difficulty is "Board Exam: Challenging (Class 12)":
  Generate a more complex question for a Class 12 student on "{{topic}}" that might require combining concepts or deeper analysis. The source should be "Challenging Board Exam-style Question (Class 12, {{topic}} based)".
- If difficulty is "Board Exam: Next Time All India Rank One ☠️":
  Generate an exceptionally challenging and thought-provoking question on "{{topic}}" suitable for a student aiming for the top national rank. This question should test profound conceptual understanding, application skills, and possibly link multiple topics. The source should be "Board Topper's Challenge ({{topic}})".

- If topic is "Hindi Literature":
  CRITICAL LANGUAGE INSTRUCTION: For this topic, the ENTIRE output for 'questionText', 'options', and 'correctAnswer' MUST be in Hindi (Devanagari script). Do not use English letters (transliteration) for the question or options. The "source" field can remain in English.
  - If difficulty is "Beginner" or "Easy": Generate basic questions about famous Hindi authors, poems, or stories (e.g., "गोदान' किसने लिखा?").
  - If difficulty is "Normal": Generate questions about specific literary periods (e.g., भक्तिकाल, रीतिकाल) or moderately well-known works.
  - If difficulty is "Hard" or "Extreme": Generate questions requiring deep knowledge of Hindi literary criticism, specific verses, or obscure works.
  - If difficulty is "Legend - Lecturer Test Prep": Generate a very difficult question suitable for a university-level lecturer exam. This question should test nuanced understanding of literary theory, criticism, linguistic details, or comparative literature within the Hindi context. The source should be "Lecturer Test-style Question (Advanced Hindi Literature)".
  - If difficulty is "KVS Abki Baar 180 Paar!": Generate a highly challenging, exam-oriented question suitable for a top-tier KVS Hindi teacher aspirant aiming for a high score. The question should test deep, nuanced knowledge of Hindi literature, grammar, or pedagogy, reflecting the pattern of competitive exams. The source should be "KVS Abki Baar 180 Paar! Special Batch".

- If difficulty is "KVS PRT - General Paper":
  Generate a question from the given "{{topic}}" that is appropriate for the Kendriya Vidyalaya Sangathan (KVS) Primary Teacher (PRT) General Paper. The General Paper includes subjects like General English, General Hindi, GK & Current Affairs, Reasoning Ability, and Computer Literacy. Your question must align with the provided topic and the standard expected for a PRT aspirant. The source should be "KVS PRT-style Question ({{topic}} based)".

- If difficulty is "KVS TGT - Subject Paper":
  Generate a subject-specific question from the given "{{topic}}" (expected to be Mathematics or Hindi Literature) that is appropriate for the Kendriya Vidyalaya Sangathan (KVS) Trained Graduate Teacher (TGT) exam. The questions should be based on concepts up to the high school level (Classes 6-10) but require a graduation-level depth of understanding for solving them, which is typical for this exam. Ensure the question is challenging and relevant. The source should be "KVS TGT-style Question ({{topic}} based)".

- If difficulty is "KVS PGT - Subject Paper":
  Generate a subject-specific question from the given "{{topic}}" (expected to be Mathematics or Hindi Literature) that is appropriate for the Kendriya Vidyalaya Sangathan (KVS) Post Graduate Teacher (PGT) exam. The questions should test a deep understanding of concepts up to the senior secondary level (Classes 11-12) but with a post-graduation level of difficulty in their application and nuances. The question must be highly challenging. The source should be "KVS PGT-style Question ({{topic}} based)".

- If difficulty is "Normal - NEET":
  For topic "{{topic}}" (expected to be Biology, Physics, or Chemistry), generate a question of "Normal" difficulty in the style and format of NEET (National Eligibility cum Entrance Test - India) for medical entrance. The question must be a single correct multiple-choice question. The source should be "NEET-style Question (Normal Difficulty, {{topic}} based)". The questions should be inspired by the type of concepts tested in previous NEET papers and reference materials like MTG books, focusing on core understanding suitable for a normal difficulty assessment. Ensure the question is genuinely challenging for a NEET aspirant at a "Normal" level, not simplistic.
- If difficulty is "Legend - NEET":
  For topic "{{topic}}" (expected to be Biology, Physics, or Chemistry), generate a question similar in style and complexity to NEET. The question must be a single correct multiple-choice question. The source should be "NEET-style Question (Legend Difficulty, {{topic}} based)". Ensure plausible and challenging distractors. These questions must be significantly difficult, testing deep understanding and application.
- If difficulty is "NEET Abki Baar 720 Paar!":
  For topic "{{topic}}" (expected to be Biology, Physics, or Chemistry), generate a highly challenging, exam-oriented question suitable for a top-tier NEET aspirant aiming for a high score (720). The question should test deep, nuanced knowledge of the subject, reflecting the pattern of competitive exams, and often requiring the integration of multiple concepts. The source should be "NEET Abki Baar 720 Paar! Special Batch".

- If difficulty is "Legend - JEE Mains":
  For topic "{{topic}}" (expected to be Physics, Chemistry, or Mathematics), generate a question similar in style and complexity to JEE Mains (India) for engineering entrance. The question must be a single correct multiple-choice question, often testing application of concepts. The source should be "JEE Mains-style Question ({{topic}} based)". This should be a very challenging question.
- If difficulty is "Legend - JEE Advanced":
  For topic "{{topic}}" (expected to be Physics, Chemistry, or Mathematics), generate a question similar in style and complexity to JEE Advanced (India). These questions are typically more challenging, may require combining multiple concepts or deeper analytical skills. Ensure it's a single correct MCQ with four options. The source should be "JEE Advanced-style Question ({{topic}} based)". This must be an exceptionally difficult question.

- If difficulty is "Normal - SBI PO Prelims":
  For topic "{{topic}}", generate a **highly challenging and complex** question suitable for a top-tier aspirant aiming to clear the SBI PO (State Bank of India Probationary Officer) Preliminary Exam in one attempt. The question style must be extremely difficult. The question must be a single correct multiple-choice question. The source should be "SBI PO Prelims-style Question ({{topic}} based)".
  **Crucial Training Source Inspiration:**
  *   The questions MUST be heavily inspired by the patterns and difficulty found in the most advanced sections of premier SBI PO preparation materials.
  *   For **Reasoning Ability**, you MUST model the question's complexity, style, and trickiness on the puzzles and seating arrangement questions found in **Adda247's advanced reasoning books**.
  *   For **Quantitative Aptitude**, the questions should reflect the complexity of Data Interpretation (DI) sets and arithmetic problems found in resources like **Adda247 and Oliveboard**.
  *   Ensure that approximately 80% of these questions draw significant inspiration from the question styles, patterns, and content found in popular SBI PO preparation resources such as those from **Adda247, Oliveboard, and PracticeMock**.
  *   The question should be extremely difficult and require multi-step, careful thought, not solvable by simple recall.

- If difficulty is "Legend - SBI PO Mains":
  For topic "{{topic}}", generate an **extremely difficult, top-percentile** question designed to mimic the complexity and style of the absolute hardest questions found in the SBI PO Mains Exam. The question must be a single correct multiple-choice question that requires deep critical reasoning, multi-layered data interpretation, or the application of multiple advanced concepts. The source should be "SBI PO Mains-style Question ({{topic}} based)".
  **Crucial Training Source Inspiration:**
  *   These questions must be exceptionally challenging, reflecting the highest level of difficulty of the SBI PO Mains exam.
  *   The style and structure should be heavily inspired by questions from **"A Complete Book of Data Interpretation" by Adda247 Publications, "Magical Book on Quicker Maths" by M. Tyra for complex concepts, and advanced-level mock tests from platforms like Oliveboard and PracticeMock**. These are the resources that serious aspirants use for questions that are very likely to appear in the exam.
  *   Questions should test deep analytical skills, complex problem-solving, and a nuanced understanding that goes beyond standard textbook problems. Avoid any question that could be considered easy or moderate.
  *   Plausible distractors are critical and should be designed to catch common high-level mistakes.
  *   Ensure that approximately 80% of these questions draw significant inspiration from the high-difficulty question patterns found in the most respected SBI PO Mains preparation books and mock series.

- If difficulty is "Legend - Agniveer":
  For topic "{{topic}}" (must be Mathematics), generate a challenging question that aligns with the syllabus and difficulty level of the Indian Armed Forces Agniveer entrance exams. The questions should test fundamental mathematical concepts, speed, and accuracy, covering topics like algebra, trigonometry, geometry, and arithmetic. The source should be "Agniveer-style Question (Mathematics)". The questions should be heavily inspired by the patterns and difficulty found in premier Agniveer preparation materials, especially books by Ram Singh Yadav.

- If difficulty is "Legend - SpaceX/Aerospace":
  For topic "{{topic}}" (most relevant if topic is Space Exploration or Physics), generate a challenging question related to modern rocketry, aerospace engineering, orbital mechanics, or complex space missions. The source should be "Advanced Aerospace/SpaceX-style Question ({{topic}} based)".

- If difficulty is "Legend - General Advanced" (or if it's just "Legend" and the topic/difficulty combination isn't one of the specific exam styles above):
  For the given "{{topic}}", generate an exceptionally challenging question that tests deep expertise. The source should be "Advanced {{{topic}}} Question (Legend Difficulty)".

For ALL "Legend" categories AND for "Normal - NEET" and "Normal - SBI PO Prelims", ensure the question is appropriately and genuinely challenging for its stated level. Options must include plausible and challenging distractors, and the question must be well-posed and not trivial for an exam aspirant.

CRITICAL INSTRUCTION FOR 'correctAnswer' FIELD:
The 'correctAnswer' field in the output JSON MUST be the exact full text of the correct option string from the 'options' array.
For example, if the options are ["Apple", "Banana", "Cherry", "Date"] and "Banana" is the correct answer, the 'correctAnswer' field must be the string "Banana".
It MUST NOT be an index (like 1 or 2), a letter (like "B" or "b)"), or an abbreviated form (like "Opt. B"). It must be the complete textual content of the correct option.

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
    
    // Add validation to ensure the AI follows the rules
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

    
