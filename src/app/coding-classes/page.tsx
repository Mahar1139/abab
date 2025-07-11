
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code2 } from 'lucide-react';
import ClassGallery from '@/components/classes/ClassGallery';

const codingGalleryImages = [
  { src: '/Coding1.jpeg', alt: 'Students focused on coding projects', dataAiHint: 'students coding' },
  { src: '/ROBOTICSIMG1.jpg', alt: 'Student assembling a robot', dataAiHint: 'student robot' },
];

export default function CodingClassesPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Unlock Your Potential with Our Coding Classes">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Dive into the world of programming and software development. Our coding classes are designed to foster problem-solving skills, creativity, and a deep understanding of technology, preparing students for a future driven by innovation.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card group flex flex-col">
            <div className="relative w-full aspect-video">
                <Image
                src="/Coding1.jpeg"
                alt="Students focused on coding projects"
                fill
                data-ai-hint="students coding"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                    <Code2 className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl text-primary">Creative Coding with Python</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4 flex-grow">
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
              <CardFooter className="p-0 mt-6">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/admissions">
                    Inquire About Coding Classes <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      </SectionWrapper>

      <ClassGallery images={codingGalleryImages} galleryTitle="Coding Class Moments" />
    </div>
  );
}
