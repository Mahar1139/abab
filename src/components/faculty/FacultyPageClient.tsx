'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import FacultyCard from "@/components/faculty/FacultyCard";
import type { FacultyMember } from "@/types";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';

interface FacultyPageClientProps {
    facultyMembers: FacultyMember[];
    facultyProfilesTextForAI: string;
}

export default function FacultyPageClient({ facultyMembers, facultyProfilesTextForAI }: FacultyPageClientProps) {
  const director = facultyMembers.find(member => member.id === 'director-001');
  const otherFaculty = facultyMembers.filter(member => member.id !== 'director-001');

  return (
    <div className="bg-background text-foreground min-h-full">
      <div className="container mx-auto py-8 px-4">
        {director && (
          <SectionWrapper title="Message from the Manager" titleClassName="text-2xl sm:text-3xl md:text-4xl mb-6">
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

        <SectionWrapper>
          <div className="max-w-2xl mx-auto text-center bg-card p-8 rounded-lg shadow-lg">
            <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-3">Inspired by Our Team?</h3>
            <p className="text-lg text-foreground/80 mb-6">
              Our faculty's dedication is a testament to the quality of education we provide. Take the next step in your journey with us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/tech-programs">
                  Explore Our Tech Programs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/admissions">
                  Apply for Admission
                </Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
