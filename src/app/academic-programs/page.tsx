
import SectionWrapper from "@/components/shared/SectionWrapper";
import ProgramCard from "@/components/academic-programs/ProgramCard";
import { academicProgramsData } from "./academic-programs-data";
import type { AcademicProgram } from "@/types";

export default function AcademicProgramsPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Our Academic Programs">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          At Himalaya Public School, we offer a comprehensive and balanced curriculum designed to foster intellectual growth, critical thinking, and a lifelong love for learning. Our programs cater to students at every stage of their educational journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {academicProgramsData.map((program: AcademicProgram) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
