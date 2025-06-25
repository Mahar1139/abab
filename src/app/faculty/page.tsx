
import { facultyMembers } from "./faculty-data";
import { suggestFacultyQuestions } from "@/ai/flows/suggest-faculty-questions";
import FacultyPageClient from "@/components/faculty/FacultyPageClient";

export default function FacultyPage() {
  const facultyProfilesTextForAI = facultyMembers
    .map(member => `${member.name} (${member.title}): ${member.bio}`)
    .join('\n\n');

  return (
    <FacultyPageClient
      facultyMembers={facultyMembers}
      suggestionFn={suggestFacultyQuestions}
      facultyProfilesTextForAI={facultyProfilesTextForAI}
    />
  );
}
