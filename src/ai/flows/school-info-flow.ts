
'use server';
/**
 * @fileOverview An AI flow to answer questions about Himalaya Public School.
 *
 * - getSchoolInformation - A function that answers questions about the school.
 * - SchoolInformationInput - The input type for the getSchoolInformation function.
 * - SchoolInformationOutput - The return type for the getSchoolInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Concatenate information from various parts of the site to provide context to the LLM
const schoolContext = `
Himalaya Public School: Nurturing young minds for a brighter future through academic excellence, character development, and a vibrant community.

Our Mission: To provide a stimulating learning environment with a technological orientation, which maximizes individual potential and ensures that students of all ability levels are well-equipped to meet the challenges of education, work, and life.

Our Vision: To be a center of excellence in education, instilling in students a love for learning, a respect for diversity, and the leadership skills necessary to contribute positively to society.

Our History: Founded in 1985, Himalaya Public School has a rich legacy of academic achievement and community involvement, consistently adapting to provide the best educational experience.

Admissions Overview:
Himalaya Public School seeks students who are curious, motivated, and eager to contribute. Admission is based on a holistic review including academic records, assessments, and interviews. The application process involves online submission, document upload, fee payment, and potential entrance tests/interviews. Key deadlines are published annually. More details can be found on the admissions page.

Faculty: Our esteemed faculty are dedicated educators, experts in their fields, committed to providing a supportive and enriching learning experience. More details can be found on the faculty page.

School Life: We offer a vibrant school life with diverse extracurricular activities, events, and news, fostering a dynamic and enriching environment. More details can be found on the school life page.

Resources: Downloadable resources such as academic calendars, supply lists, and handbooks are available. More details can be found on the resources page.

Contact Information:
Address: 123 Education Lane, Knowledge City, KC 12345, India
Phone: +91 (123) 456-7890
Email: info@himalayaschool.edu
Office Hours: Monday - Friday: 8:00 AM - 4:00 PM; Saturday: 9:00 AM - 1:00 PM (Admissions Office Only); Sunday: Closed.
More details can be found on the contact page.
`;


const SchoolInformationInputSchema = z.object({
  question: z.string().describe('The user\'s question about Himalaya Public School.'),
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
  prompt: `You are a friendly and knowledgeable AI assistant for Himalaya Public School. Your role is to answer questions from prospective students, parents, and staff based *only* on the information provided below.

  School Information Context:
  ---
  ${schoolContext}
  ---

  User's Question: {{{question}}}

  Please provide a concise and helpful answer based strictly on the provided "School Information Context". If the question cannot be answered using the provided information, politely state that you don't have the specific details and suggest they check the relevant page on the school website (e.g., admissions, faculty, contact) or contact the school directly for more information. Do not invent information or answer questions outside of this context. If specific details like fees, specific curriculum details for a grade, or very niche information is asked, it's likely not in the context, so guide them to contact the school or check the website.
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
