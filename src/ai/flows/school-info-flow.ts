
'use server';
/**
 * @fileOverview An AI flow to answer questions about Himalaya Public School, handle general queries, and generate code snippets.
 *
 * - getSchoolInformation - A function that answers questions about the school, general topics, or generates code.
 * - SchoolInformationInput - The input type for the getSchoolInformation function.
 * - SchoolInformationOutput - The return type for the getSchoolInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Concatenate information from various parts of the site to provide context to the LLM
const schoolContext = `
Himalaya Public School: Nurturing young minds for a brighter future through academic excellence, character development, and a vibrant community. We offer programs including Coding and Robotics.

Our Mission: To provide a stimulating learning environment with a technological orientation, which maximizes individual potential and ensures that students of all ability levels are well-equipped to meet the challenges of education, work, and life. We emphasize a student-centered approach and interactive learning methodologies.

Our Vision: To be a center of excellence in education, instilling in students a love for learning, a respect for diversity, and the leadership skills necessary to contribute positively to society.

Our Core Values: Integrity, Respect, Collaboration, Excellence, Innovation, and Lifelong Learning.

Our History: Founded in 1985, Himalaya Public School has a rich legacy of academic achievement and community involvement, consistently adapting to provide the best educational experience.

Admissions Overview:
Himalaya Public School seeks students who are curious, motivated, and eager to contribute. Admission is based on a holistic review including academic records, assessments, and interviews. The application process involves online submission, document upload, fee payment, and potential entrance tests/interviews. Key deadlines are published annually. More details can be found on the admissions page.

Faculty: Our esteemed faculty are dedicated educators, experts in their fields, committed to providing a supportive and enriching learning experience. They are encouraged to integrate modern technology into their teaching practices. More details can be found on the faculty page.

School Life: We offer a vibrant school life with diverse extracurricular activities (including sports, arts, debate, and coding clubs), events, and news, fostering a dynamic and enriching environment. More details can be found on the school life page.

Resources: Downloadable resources such as academic calendars, supply lists, and handbooks are available. More details can be found on the resources page.

Contact Information:
Address: 123 Education Lane, Knowledge City, KC 12345, India
Phone: +91 (123) 456-7890
Email: info@himalayaschool.edu
Office Hours: Monday - Friday: 8:00 AM - 4:00 PM; Saturday: 9:00 AM - 1:00 PM (Admissions Office Only); Sunday: Closed.
More details can be found on the contact page.
`;


const SchoolInformationInputSchema = z.object({
  question: z.string().describe('The user\'s question about Himalaya Public School, a general query, or a request for code/game generation.'),
  unrestrictedMode: z.boolean().optional().describe('If true, the AI should answer any question without school-specific restrictions or context, acting as a general knowledge AI.')
});
export type SchoolInformationInput = z.infer<typeof SchoolInformationInputSchema>;

// This is the output schema for the prompt object internally
const InternalPromptOutputSchema = z.object({
  answer: z.string().describe("The AI's response. If blocked due to safety, it will be 'SAFETY_BLOCKED_BY_AI_INTERNAL_FLAG'."),
});

// This is the actual output schema for the exported flow function
const SchoolInformationOutputSchema = z.object({
  answer: z.string().nullable().describe('The AI-generated answer to the user\'s question, or a user-friendly message if blocked.'),
  safetyBlocked: z.boolean().describe('True if the response was blocked due to safety concerns.'),
});
export type SchoolInformationOutput = z.infer<typeof SchoolInformationOutputSchema>;

export async function getSchoolInformation(
  input: SchoolInformationInput
): Promise<SchoolInformationOutput> {
  return schoolInformationFlow(input);
}

const SAFETY_BLOCK_FLAG = "SAFETY_BLOCKED_BY_AI_INTERNAL_FLAG";

const prompt = ai.definePrompt({
  name: 'schoolInformationPrompt',
  input: {schema: SchoolInformationInputSchema},
  output: {schema: InternalPromptOutputSchema}, // Internal prompt uses this
  prompt: `{{#if unrestrictedMode}}
You are a general knowledge AI assistant. Your goal is to provide comprehensive and accurate answers to any question the user asks, without any context related to a specific school or organization.
User's Question: {{{question}}}

IMPORTANT SAFETY RULE: If the user's question is abusive, harmful, clearly inappropriate, or if you cannot answer it due to safety guidelines or content policies, your entire response for the 'answer' field MUST be the exact string "${SAFETY_BLOCK_FLAG}". Do not add any other text or explanation.

Otherwise, provide your answer directly. If it's a request for code, provide the code formatted in markdown.
{{else}}
You are an AI assistant for the official Himalaya Public School website.
Your primary goal is to assist users. Since this IS the official school platform, never refer the user to "the official website" as if it's an external resource. You can, however, mention specific page names if they are listed in the context (e.g., "More details can be found on the admissions page.").

School Information Context:
---
${schoolContext}
---

User's Question: {{{question}}}

IMPORTANT SAFETY RULE: If the user's question is abusive, harmful, clearly inappropriate (even if school-related), or if you cannot answer it due to safety guidelines or content policies, your entire response for the 'answer' field MUST be the exact string "${SAFETY_BLOCK_FLAG}". Do not add any other text or explanation.

Analyze the user's question and respond according to these rules, in order of preference (if not safety blocked):

1.  If the question can be reasonably answered using the "School Information Context", provide a concise and helpful answer based *strictly* on that information. Your answer should be focused and directly address the school-related query.

2.  If the user's question is a direct request to write or generate a code snippet in a specific programming language OR to create a simple game (e.g., 'Write a Python function to sort a list', 'Show me C++ code for a linked list', 'Make a simple snake game in Python', 'Generate Java code for a calculator', 'Can you write a JavaScript snippet for...'), then you should attempt to fulfill this request.
    - For standard code snippets, provide the code.
    - For game requests, provide a simple, functional code example for a text-based or basic version of the game, preferably in Python or JavaScript. Focus on the core game logic. Do not attempt to generate complex graphics or full-fledged game engines.
    Format all code clearly using markdown code blocks (e.g., \`\`\`python ...code here... \`\`\`). Do not add extensive commentary outside the code block unless specifically asked or necessary for a very brief explanation of the game code.

3.  If the question is *clearly outside* the scope of the provided school information AND is NOT a code generation/game request (e.g., it's a general knowledge question like "What is the capital of France?", a request for creative writing like "Write a poem about stars", or a math problem), then you should switch to a general helpful AI mode. In this mode, answer the question directly and naturally. Do not mention Himalaya Public School or the context. Do not apologize for not using the school context if the question is clearly general.

4.  If the question seems related to Himalaya Public School but requests specific details *not found* in the "School Information Context" (like specific tuition fees, detailed grade-level curriculum for a particular subject, very niche operational details not covered, or any information not explicitly present in the context), then politely state that you don't have those specific details based on the information available to you. Do NOT suggest contacting the school directly or visiting an external website for this, as the user is already on the official platform. Simply state the information isn't available in your current knowledge base.

Your response should be formatted for the 'answer' field. Be helpful and clear.
{{/if}}
  `,
});

const schoolInformationFlow = ai.defineFlow(
  {
    name: 'schoolInformationFlow',
    inputSchema: SchoolInformationInputSchema,
    outputSchema: SchoolInformationOutputSchema, // Flow uses the final output schema
  },
  async (input) => {
    const llmCallResult = await prompt(input); // This uses the internal prompt schema

    if (llmCallResult.output && llmCallResult.output.answer === SAFETY_BLOCK_FLAG) {
      return {
        answer: "Your query could not be processed due to content guidelines. Further interaction is temporarily disabled.",
        safetyBlocked: true,
      };
    }
    
    if (llmCallResult.output && typeof llmCallResult.output.answer === 'string') {
      return {
        answer: llmCallResult.output.answer,
        safetyBlocked: false,
      };
    }

    // Fallback if the LLM output structure is not as expected but not a safety block
    console.error("AI response structure was not as expected:", llmCallResult);
    return {
      answer: "I'm sorry, I couldn't generate a response at this time. Please try again.",
      safetyBlocked: false, // Not explicitly a safety block from our flag
    };
  }
);

    