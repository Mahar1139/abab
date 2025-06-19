
import SectionWrapper from "@/components/shared/SectionWrapper";
import FacultyCard from "@/components/faculty/FacultyCard";
import { facultyMembers } from "./faculty-data";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestFacultyQuestions } from "@/ai/flows/suggest-faculty-questions";
import type { FacultyMember } from "@/types";

export default function FacultyPage() {
  const director = facultyMembers.find(member => member.id === 'director-001');
  const otherFaculty = facultyMembers.filter(member => member.id !== 'director-001');

  const facultyProfilesText = facultyMembers
    .map(member => `${member.name} (${member.title}): ${member.bio}`)
    .join('\n\n');

  return (
    <div className="faculty-directory-light-theme bg-background text-foreground min-h-full">
      <div className="container mx-auto py-8 px-4">
        {director && (
          <SectionWrapper title="Our Director" titleClassName="text-2xl sm:text-3xl md:text-4xl mb-6">
            {/* Responsive container for the Director's card */}
            <div className="flex justify-center mb-8 md:mb-10">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <FacultyCard member={director} imageAspectRatio="landscape" />
              </div>
            </div>
          </SectionWrapper>
        )}

        <SectionWrapper title="Our Esteemed Faculty" titleClassName="text-2xl sm:text-3xl md:text-4xl mt-8 mb-6">
          <p className="text-center text-base sm:text-lg text-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto">
            Meet the dedicated educators who inspire and guide our students. Our faculty members are experts in their fields and are committed to providing a supportive and enriching learning experience.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {otherFaculty.map((member: FacultyMember) => (
              <FacultyCard key={member.id} member={member} imageAspectRatio="square" />
            ))}
          </div>
        </SectionWrapper>

        <QuestionSuggester
          contentToAnalyze={facultyProfilesText}
          suggestionFn={suggestFacultyQuestions}
          inputKey="facultyProfilesText"
          title="Questions for Our Team?"
          description="After learning about our faculty, you might want to know more. Our AI can help suggest some insightful questions."
        />
      </div>
    </div>
  );
}
