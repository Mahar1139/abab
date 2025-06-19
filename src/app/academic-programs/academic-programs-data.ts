
import type { AcademicProgram } from '@/types';
import { BookCopy, Users, NotebookText, Sparkles, Layers, Microscope, Landmark, BookOpen } from 'lucide-react';

export const academicProgramsData: AcademicProgram[] = [
  {
    id: 'primary',
    level: 'Primary School (Grades 1-5)',
    title: 'Foundational Learning & Exploration',
    description: 'Our primary program focuses on building a strong foundation in literacy, numeracy, and scientific inquiry. We encourage curiosity and a love for learning through interactive activities and a supportive environment.',
    keySubjects: ['English', 'Mathematics', 'Environmental Science (EVS)', 'Hindi', 'Art & Craft', 'Physical Education'],
    imageUrl: '/All_Images/academic-programs/primary-school.png',
    dataAiHint: 'children classroom learning',
    icon: BookCopy,
  },
  {
    id: 'middle',
    level: 'Middle School (Grades 6-8)',
    title: 'Developing Skills & Understanding',
    description: 'In middle school, students delve deeper into core subjects, develop critical thinking skills, and begin to explore their interests. The curriculum is designed to be engaging and challenging, preparing them for higher studies.',
    keySubjects: ['English', 'Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Studies (History, Geography, Civics)', 'Hindi/Sanskrit', 'Computer Science'],
    imageUrl: '/All_Images/academic-programs/middle-school.png',
    dataAiHint: 'students science lab',
    icon: Layers,
  },
  {
    id: 'high',
    level: 'High School (Grades 9-10)',
    title: 'Board Examination Preparation & Specialization',
    description: 'The high school program is geared towards preparing students for board examinations (CBSE). We offer a rigorous academic schedule combined with co-curricular activities for holistic development.',
    keySubjects: ['English', 'Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Science (History, Geography, Civics, Economics)', 'Second Language', 'Information Technology'],
    imageUrl: '/All_Images/academic-programs/high-school.png',
    dataAiHint: 'teenagers studying library',
    icon: Microscope,
  },
  {
    id: 'senior-secondary',
    level: 'Senior Secondary (Grades 11-12)',
    title: 'Advanced Studies & Career Focus',
    description: 'Students in senior secondary choose specialized streams (Science, Commerce, Arts/Humanities) to focus on subjects aligned with their career aspirations. We provide expert guidance and resources for competitive exams and university admissions.',
    keySubjects: ['Stream-specific subjects (e.g., Physics, Chemistry, Maths/Biology, Accountancy, Economics, History, Political Science)', 'English Core', 'Optional Subjects'],
    imageUrl: '/All_Images/academic-programs/senior-secondary.png',
    dataAiHint: 'graduates cap gown',
    icon: Landmark,
  },
];
