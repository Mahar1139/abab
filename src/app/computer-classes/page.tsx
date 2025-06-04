
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Laptop } from 'lucide-react';

export default function ComputerClassesPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Master Essential Computer Skills">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Our computer classes equip students with vital digital literacy, from fundamental operations to advanced software applications, ensuring they are proficient and confident in today's tech-driven world.
        </p>
        
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card">
          <div className="md:flex">
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Students using computers in a classroom setting"
                layout="fill"
                objectFit="cover"
                data-ai-hint="students computers classroom"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 flex flex-col">
              <CardHeader>
                 <div className="flex items-center gap-2 mb-2">
                    <Laptop className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl md:text-3xl text-primary">Digital Literacy & Productivity Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <CardDescription className="text-foreground/90 text-base leading-relaxed">
                  This foundational course builds essential computer skills, covering operating system navigation, file management, internet safety, and proficiency in widely-used office productivity software like word processors, spreadsheets, and presentation tools.
                </CardDescription>
                <div>
                  <h4 className="font-semibold text-lg text-secondary mb-3">What You'll Learn:</h4>
                  <ul className="space-y-2.5">
                    {[
                      "Navigating computer operating systems effectively.",
                      "Mastering office suite applications (documents, spreadsheets, presentations).",
                      "Safe and responsible internet usage and digital citizenship.",
                      "Fundamentals of file management and cloud storage.",
                      "Introduction to graphic design principles or basic video editing."
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
                  <Link href="/contact">
                    Join Our Computer Courses <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
        
      </SectionWrapper>
    </div>
  );
}
