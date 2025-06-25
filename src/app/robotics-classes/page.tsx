
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Bot } from 'lucide-react';
import ClassGallery from '@/components/classes/ClassGallery';

const roboticsGalleryImages = [
  { src: '/ROBO7.jpg', alt: 'A custom-built robot navigating a course', dataAiHint: 'custom robot', colSpan: 2 },
  { src: '/ROBOTICSIMG3.jpg', alt: 'Robotic arm in action', dataAiHint: 'robotic arm' },
  { src: '/ROBOTICSIMG5.jpg', alt: 'Student soldering robot parts', dataAiHint: 'student soldering' },
  { src: '/All_Images/robotics-classes/gallery-robot-components.png', alt: 'Close-up of robot components', dataAiHint: 'robot parts' },
  { src: '/ROBOTICSIMG1.jpg', alt: 'Student assembling a robot', dataAiHint: 'student robot' },
];

export default function RoboticsClassesPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Build the Future with Our Robotics Classes">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Step into the exciting field of robotics! Our classes offer hands-on experience in designing, building, and programming robots, nurturing skills in engineering, mechanics, and artificial intelligence.
        </p>
        
        <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card group flex flex-col">
                <div className="relative w-full aspect-video">
                    <Image
                        src="/Robotics1.jpg"
                        alt="Student working on a robotics project"
                        fill
                        data-ai-hint="student robotics"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <CardHeader className="p-0 mb-4">
                        <div className="flex items-center gap-3">
                            <Bot className="w-8 h-8 text-primary" />
                            <CardTitle className="text-2xl text-primary">Robotics Engineering & Design</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4 flex-grow">
                        <CardDescription className="text-foreground/90 text-base leading-relaxed">
                            This comprehensive course covers the essentials of robotics, from basic mechanical assembly to programming complex behaviors. Students will work with various sensors, motors, and control systems to bring their robotic creations to life.
                        </CardDescription>
                        <div>
                            <h4 className="font-semibold text-lg text-secondary mb-3">What You'll Learn:</h4>
                            <ul className="space-y-2.5">
                            {[
                                "Fundamentals of robot design and mechanics.",
                                "Programming microcontrollers (e.g., Arduino, Raspberry Pi).",
                                "Integrating sensors for environmental interaction.",
                                "Understanding actuators and motor control.",
                                "Team-based projects and robotics competition preparation."
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
                            Explore Robotics Programs <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        </div>
      </SectionWrapper>

      <ClassGallery images={roboticsGalleryImages} galleryTitle="Robotics Workshop Snapshots" />
    </div>
  );
}
