
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import FacultyCard from "@/components/faculty/FacultyCard";
import { facultyMembers } from "./faculty-data";
import { suggestFacultyQuestions } from "@/ai/flows/suggest-faculty-questions";
import type { FacultyMember } from "@/types";
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const QuestionSuggester = dynamic(() => import('@/components/ai/QuestionSuggester'), {
  loading: () => (
    <div className="my-8 p-4">
      <Skeleton className="h-10 w-1/3 mb-4" />
      <Skeleton className="h-6 w-2/3 mb-4" />
      <Skeleton className="h-10 w-48" />
    </div>
  ),
  ssr: false
});


export default function FacultyPage() {
  const director = facultyMembers.find(member => member.id === 'director-001');
  const otherFaculty = facultyMembers.filter(member => member.id !== 'director-001');

  const facultyProfilesTextForAI = facultyMembers
    .map(member => `${member.name} (${member.title}): ${member.bio}`)
    .join('\n\n');

  return (
    // Removed faculty-directory-light-theme class to adopt global theme
    <div className="bg-background text-foreground min-h-full">
      <div className="container mx-auto py-8 px-4">
        {director && (
          <SectionWrapper title="Message from the Manager" titleClassName="text-2xl sm:text-3xl md:text-4xl mb-6">
            {/* Responsive container for the Director's card */}
            <div className="flex justify-center mb-8 md:mb-10">
              <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl">
                <FacultyCard member={director} />
              </div>
            </div>
          </SectionWrapper>
        )}

        <SectionWrapper title="Our Esteemed Faculty" titleClassName="text-2xl sm:text-3xl md:text-4xl mt-2 mb-6">
          <p className="text-center text-base sm:text-lg text-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto">
            Our team of dedicated and experienced educators is the backbone of our institution, committed to nurturing the next generation of leaders.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {otherFaculty.map((member: FacultyMember) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        </SectionWrapper>

        <QuestionSuggester
          contentToAnalyze={facultyProfilesTextForAI}
          suggestionFn={suggestFacultyQuestions}
          inputKey="facultyProfilesText"
          title="Thinking of Questions to Ask?"
          description="After reviewing our faculty, here are some questions you might consider asking."
        />
      </div>
    </div>
  );
}
