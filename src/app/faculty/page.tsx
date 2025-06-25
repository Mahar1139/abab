
import { facultyMembers } from "./faculty-data";
import FacultyPageClient from "@/components/faculty/FacultyPageClient";

export default function FacultyPage() {
  const facultyProfilesTextForAI = facultyMembers
    .map(member => `${member.name} (${member.title}): ${member.bio}`)
    .join('\n\n');

  return (
    <FacultyPageClient
      facultyMembers={facultyMembers}
      facultyProfilesTextForAI={facultyProfilesTextForAI}
    />
  );
}
