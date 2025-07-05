
import SectionWrapper from "@/components/shared/SectionWrapper";
import ProgramCard from "@/components/academic-programs/ProgramCard";
import { academicProgramsData } from "./academic-programs-data";
import type { AcademicProgram } from "@/types";

export default function AcademicProgramsPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Our Academic Programs">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          From foundational learning to advanced specialization, our curriculum is designed to nurture intellectual curiosity and foster a lifelong love for learning at every stage.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {academicProgramsData.map((program: AcademicProgram) => (
            <div id={program.id} key={program.id} className="scroll-mt-24">
              <ProgramCard program={program} />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
