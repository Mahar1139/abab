
'use server';
/**
 * @fileOverview An AI flow to answer questions about Himalaya Public School and handle general queries.
 *
 * - getSchoolInformation - A function that answers questions about the school or general topics.
 * - SchoolInformationInput - The input type for the getSchoolInformation function.
 * - SchoolInformationOutput - The return type for the getSchoolInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Concatenate information from various parts of the site to provide context to the LLM
const schoolContext = `
Himalaya Public School: Nurturing young minds for a brighter future through academic excellence, character development, and a vibrant community.

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
  question: z.string().describe('The user\'s question about Himalaya Public School or a general query.'),
});
export type SchoolInformationInput = z.infer<typeof SchoolInformationInputSchema>;

const SchoolInformationOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type SchoolInformationOutput = z.infer<typeof SchoolInformationOutputSchema>;

export async function getSchoolInformation(
  input: SchoolInformationInput
): Promise<SchoolInformationOutput> {
  return schoolInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'schoolInformationPrompt',
  input: {schema: SchoolInformationInputSchema},
  output: {schema: SchoolInformationOutputSchema},
  prompt: `You are an AI assistant for the official Himalaya Public School website.
Your primary goal is to answer questions related to Himalaya Public School using *only* the "School Information Context" provided below. Since this IS the official school platform, never refer the user to "the official website" as if it's an external resource. You can, however, mention specific page names if they are listed in the context (e.g., "More details can be found on the admissions page.").

School Information Context:
---
${schoolContext}
---

User's Question: {{{question}}}

Analyze the user's question:
1. If the question can be reasonably answered using the "School Information Context", provide a concise and helpful answer based *strictly* on that information. Your answer should be focused and directly address the school-related query.
2. If the question is *clearly outside* the scope of the provided school information (e.g., it's a general knowledge question like "What is the capital of France?", a request for creative writing like "Write a poem about stars", a math problem, or about a completely different topic), then you should switch to a general helpful AI mode. In this mode, answer the question directly and naturally. Do not mention Himalaya Public School or the context. Do not apologize for not using the school context if the question is clearly general.
3. If the question seems related to Himalaya Public School but requests specific details *not found* in the "School Information Context" (like specific tuition fees, detailed grade-level curriculum for a particular subject, very niche operational details not covered, or any information not explicitly present in the context), then politely state that you don't have those specific details based on the information available to you. Do NOT suggest visiting "the official website" or contacting the school directly as an alternative, as the user is already on the official platform. Simply state the information isn't available in your current knowledge base.

Your response should be formatted for the 'answer' field. Be helpful and clear.
  `,
});

const schoolInformationFlow = ai.defineFlow(
  {
    name: 'schoolInformationFlow',
    inputSchema: SchoolInformationInputSchema,
    outputSchema: SchoolInformationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

