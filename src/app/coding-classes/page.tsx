
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code2 } from 'lucide-react';
import ClassGallery from '@/components/classes/ClassGallery';

const codingGalleryImages = [
  { src: '/Coding1.jpeg', alt: 'Students focused on coding projects', dataAiHint: 'students coding' },
  { src: '/All_Images/coding-classes/gallery-students-collaborating.png', alt: 'Students collaborating on code', dataAiHint: 'students collaborating' },
  { src: '/All_Images/coding-classes/gallery-student-presenting.png', alt: 'Student presenting coding project', dataAiHint: 'student presentation' },
  { src: '/All_Images/coding-classes/gallery-code-screen.png', alt: 'Close-up of code on a screen', dataAiHint: 'code screen' },
  { src: '/All_Images/coding-classes/gallery-student-laptop.png', alt: 'Happy student with laptop', dataAiHint: 'student laptop' },
  { src: '/All_Images/coding-classes/gallery-teacher-explaining.png', alt: 'Teacher explaining code to students', dataAiHint: 'teacher students' },
  { src: '/All_Images/coding-classes/gallery-girls-coding.png', alt: 'Group of girls coding', dataAiHint: 'girls coding' },
  { src: '/All_Images/coding-classes/gallery-diverse-students.png', alt: 'Diverse students in coding class', dataAiHint: 'diverse students' },
  { src: '/All_Images/coding-classes/gallery-student-debugging.png', alt: 'Student debugging code', dataAiHint: 'student debugging' },
];

export default function CodingClassesPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Unlock Your Potential with Our Coding Classes">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Dive into the world of programming and software development. Our coding classes are designed to foster problem-solving skills, creativity, and a deep understanding of technology, preparing students for a future driven by innovation.
        </p>
        
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card group">
          <div className="md:flex">
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
              <Image
                src="/All_Images/coding-classes/main-students-learning.png"
                alt="Students learning coding concepts on laptops"
                fill
                data-ai-hint="students coding laptop"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl md:text-3xl text-primary">Creative Coding with Python</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <CardDescription className="text-foreground/90 text-base leading-relaxed">
                  Explore the fundamentals of programming through Python, one of the most popular and versatile coding languages. This course focuses on building interactive projects, games, and understanding core programming principles in a fun and engaging way.
                </CardDescription>
                <div>
                  <h4 className="font-semibold text-lg text-secondary mb-3">What You'll Learn:</h4>
                  <ul className="space-y-2.5">
                    {[
                      "Core Python syntax and programming logic.",
                      "Developing algorithms and data structures.",
                      "Creating interactive applications and simple games.",
                      "Problem-solving and debugging techniques.",
                      "Introduction to object-oriented programming concepts."
                    ].map((point, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-2.5 mt-0.5 shrink-0" />
                        <span className="text-foreground/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardContent>
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="/admissions">
                    Inquire About Coding Classes <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </SectionWrapper>

      <ClassGallery images={codingGalleryImages} galleryTitle="Coding Class Moments" />
    </div>
  );
}
