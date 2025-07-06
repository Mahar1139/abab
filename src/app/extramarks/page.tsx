
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';
import ClassGallery from '@/components/classes/ClassGallery';

const extramarksGalleryImages = [
  { src: 'https://placehold.co/600x400.png', alt: 'Students using tablets for e-learning', dataAiHint: 'students tablets' },
  { src: 'https://placehold.co/800x400.png', alt: 'Extramarks digital interface on a screen', dataAiHint: 'elearning interface', colSpan: 2 },
  { src: 'https://placehold.co/600x400.png', alt: 'A teacher guiding a student with a digital lesson', dataAiHint: 'teacher student digital' },
  { src: 'https://placehold.co/600x400.png', alt: 'Interactive learning session in a smart classroom', dataAiHint: 'smart classroom' },
];

export default function ExtramarksPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Our Partnership with Extramarks">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          We are proud to partner with Extramarks to provide a comprehensive digital learning platform, revolutionizing education with cutting-edge technology and rich media content.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card group flex flex-col">
            <div className="relative w-full aspect-video">
                <Image
                src="/Extramarks2.png"
                alt="Extramarks Learning Platform"
                fill
                data-ai-hint="digital learning"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl text-primary">Extramarks: The Total Learning™ App</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4 flex-grow">
                <CardDescription className="text-foreground/90 text-base leading-relaxed">
                  Extramarks combines the best of technology and pedagogy to create an engaging, child-centric learning environment. The platform offers a multi-layered ecosystem with a learning app for students, a school-based solution, and a specialized app for teachers.
                </CardDescription>
                <div>
                  <h4 className="font-semibold text-lg text-secondary mb-3">Key Features:</h4>
                  <ul className="space-y-2.5">
                    {[
                      "Comprehensive curriculum-mapped learning modules.",
                      "Rich multimedia content including videos, animations, and simulations.",
                      "Personalized learning paths and adaptive assessments.",
                      "Live classes and doubt-solving sessions.",
                      "In-depth performance reports and analytics for students and parents."
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
                    Enroll Now to Get Access <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      </SectionWrapper>

      <ClassGallery images={extramarksGalleryImages} galleryTitle="Extramarks in Action" />
    </div>
  );
}
