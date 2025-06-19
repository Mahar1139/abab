
import SectionWrapper from "@/components/shared/SectionWrapper";
import FacultyCard from "@/components/faculty/FacultyCard";
import { facultyMembers } from "./faculty-data";
import QuestionSuggester from "@/components/ai/QuestionSuggester";
import { suggestFacultyQuestions } from "@/ai/flows/suggest-faculty-questions";
import type { FacultyMember } from "@/types";

export default function FacultyPage() {
  const facultyProfilesText = facultyMembers.map(member => `${member.name} (${member.title}): ${member.bio}`).join('\n\n');

  return (
    <div className="faculty-directory-light-theme bg-background text-foreground min-h-full"> {/* Added bg-background, text-foreground, and min-h-full */}
      <div className="container mx-auto py-8">
        <SectionWrapper title="Our Esteemed Faculty">
          <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
            Meet the dedicated educators who inspire and guide our students. Our faculty members are experts in their fields and are committed to providing a supportive and enriching learning experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {facultyMembers.map((member: FacultyMember) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        </SectionWrapper>

        <QuestionSuggester
          contentToAnalyze={facultyProfilesText}
          suggestionFn={suggestFacultyQuestions}
          inputKey="facultyProfilesText"
          title="Questions for Our Faculty?"
          description="After learning about our faculty, you might want to know more. Our AI can help suggest some insightful questions."
        />
      </div>
    </div>
  );
}
