
import SectionWrapper from "@/components/shared/SectionWrapper";
import FacultyCard from "@/components/faculty/FacultyCard";
import { facultyMembers } from "./faculty-data";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestFacultyQuestions } from "@/ai/flows/suggest-faculty-questions";
import type { FacultyMember } from "@/types";

export default function FacultyPage() {
  // Assuming the director is the first one or has a specific ID. Let's use ID for robustness.
  const director = facultyMembers.find(member => member.id === 'director-001');
  const otherFaculty = facultyMembers.filter(member => member.id !== 'director-001');

  const facultyProfilesText = facultyMembers
    .map(member => `${member.name} (${member.title}): ${member.bio}`)
    .join('\n\n');

  return (
    <div className="faculty-directory-light-theme bg-background text-foreground min-h-full">
      <div className="container mx-auto py-8">
        {director && (
          <SectionWrapper title="Our Director" titleClassName="text-2xl md:text-3xl mb-6">
            <div className="flex justify-center mb-8"> {/* Reduced bottom margin from mb-12 to mb-8 */}
              <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3"> {/* Made card smaller on larger screens */}
                <FacultyCard member={director} />
              </div>
            </div>
          </SectionWrapper>
        )}

        <SectionWrapper title="Our Esteemed Faculty">
          <p className="text-center text-lg text-foreground/80 mb-8 max-w-2xl mx-auto"> {/* Reduced bottom margin from mb-10 to mb-8 */}
            Meet the dedicated educators who inspire and guide our students. Our faculty members are experts in their fields and are committed to providing a supportive and enriching learning experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {otherFaculty.map((member: FacultyMember) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        </SectionWrapper>

        <QuestionSuggester
          contentToAnalyze={facultyProfilesText} // Includes director
          suggestionFn={suggestFacultyQuestions}
          inputKey="facultyProfilesText"
          title="Questions for Our Team?"
          description="After learning about our director and faculty, you might want to know more. Our AI can help suggest some insightful questions."
        />
      </div>
    </div>
  );
}

