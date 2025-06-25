
'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code2, Bot, Laptop } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import ClassGallery to prevent chunk loading errors
const ClassGallery = dynamic(() => import('@/components/classes/ClassGallery'), {
  loading: () => (
    <SectionWrapper title="Glimpses from Our Classes" className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
        </div>
    </SectionWrapper>
  ),
  ssr: false,
});

const codingGalleryImages = [
  { src: '/GalleryImg.jpg', alt: 'Students in a tech program', dataAiHint: 'students tech' },
  { src: '/CodingGallery2.jpg', alt: 'Students collaborating on a coding project', dataAiHint: 'students coding' },
  { 
    src: 'https://placehold.co/800x400.png', 
    alt: 'A new photo description.', 
    dataAiHint: 'new photo',
    colSpan: 2 
  }
];

const roboticsGalleryImages = [
  { src: '/All_Images/robotics-classes/gallery-robotic-arm.png', alt: 'Robotic arm in action', dataAiHint: 'robotic arm' },
  { src: '/All_Images/robotics-classes/gallery-students-testing.png', alt: 'Students testing a robot', dataAiHint: 'students robot' },
  { src: '/All_Images/robotics-classes/gallery-robot-components.png', alt: 'Close-up of robot components', dataAiHint: 'robot parts' },
  { src: '/All_Images/robotics-classes/gallery-student-soldering.png', alt: 'Student soldering robot parts', dataAiHint: 'student soldering' },
  { src: '/All_Images/robotics-classes/gallery-team-celebrating.png', alt: 'Team celebrating robot success', dataAiHint: 'team celebration' },
  { src: '/All_Images/robotics-classes/gallery-robot-competition.png', alt: 'Robots in a competition setting', dataAiHint: 'robot competition' },
  { src: '/All_Images/robotics-classes/gallery-robot-obstacle.png', alt: 'Robot navigating an obstacle course', dataAiHint: 'robot obstacle' },
  { src: '/All_Images/robotics-classes/gallery-student-programming.png', alt: 'Student programming robot', dataAiHint: 'student programming' },
];

const computerGalleryImages = [
  { src: '/All_Images/computer-classes/gallery-student-learning.png', alt: 'Student learning on a computer', dataAiHint: 'student computer' },
  { src: '/All_Images/computer-classes/gallery-digital-art.png', alt: 'Creating digital art on a tablet', dataAiHint: 'digital art' },
  { src: '/All_Images/computer-classes/gallery-video-editing.png', alt: 'Interface of video editing software', dataAiHint: 'video editing' },
  { src: '/All_Images/computer-classes/gallery-students-research.png', alt: 'Students researching online', dataAiHint: 'students research' },
  { src: '/All_Images/computer-classes/gallery-teacher-assisting.png', alt: 'Teacher assisting student at PC', dataAiHint: 'teacher student' },
  { src: '/All_Images/computer-classes/gallery-group-project.png', alt: 'Students working on a group project on computer', dataAiHint: 'group project' },
  { src: '/All_Images/computer-classes/gallery-cybersecurity.png', alt: 'Concept of cybersecurity shield', dataAiHint: 'cybersecurity concept' },
  { src: '/All_Images/computer-classes/gallery-presentation-software.png', alt: 'Student learning presentation software', dataAiHint: 'student presentation' },
];


interface ProgramSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  learnPoints: string[];
  imageUrl: string;
  imageAlt: string;
  imageHint: string;
  inquireLink: string;
  inquireText: string;
  imagePosition?: 'left' | 'right';
}

const ProgramSection = ({
  icon: Icon,
  title,
  description,
  learnPoints,
  imageUrl,
  imageAlt,
  imageHint,
  inquireLink,
  inquireText,
  imagePosition = 'left'
}: ProgramSectionProps) => (
  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card group">
    <div className={`md:flex ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:w-1/2 relative min-h-[300px] md:min-h-full p-4 bg-background">
        <div className="p-2 bg-border shadow-md h-full w-full"> {/* Outer frame */}
          <div className="bg-card p-1.5 h-full w-full"> {/* Gap between frames */}
            <div className="relative border-2 border-primary h-full w-full"> {/* Inner frame */}
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                data-ai-hint={imageHint}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
              <Icon className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl md:text-3xl text-primary">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          <CardDescription className="text-foreground/90 text-base leading-relaxed">
            {description}
          </CardDescription>
          <div>
            <h4 className="font-semibold text-lg text-secondary mb-3">What You'll Learn:</h4>
            <ul className="space-y-2.5">
              {learnPoints.map((point, index) => (
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
            <Link href={inquireLink}>
              {inquireText} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </div>
  </Card>
);

export default function TechProgramsPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Explore Our Tech Programs">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Dive into the world of technology with our comprehensive programs in Coding, Robotics, and Computer Literacy. We empower students with essential skills for the future, fostering creativity, problem-solving, and digital proficiency.
        </p>

        <div className="space-y-16">
          {/* Coding Class Section */}
          <div>
            <ProgramSection 
              icon={Code2}
              title="Creative Coding with AI tools learning"
              description="Explore the fundamentals of programming through Our Coding Programme, one of the most popular and versatile coding languages. This course focuses on building interactive projects, games, and understanding core programming principles in a fun and engaging way."
              learnPoints={[
                "Core Python syntax and programming logic.",
                "Developing algorithms and data structures.",
                "Creating interactive applications and simple games.",
                "Problem-solving and debugging techniques.",
                "Introduction to object-oriented programming concepts."
              ]}
              imageUrl="/Coding2.webp"
              imageAlt="A focused student working on a coding project"
              imageHint="student coding"
              inquireLink="/admissions"
              inquireText="Inquire About Coding Classes...."
              imagePosition="left"
            />
            <ClassGallery images={codingGalleryImages} galleryTitle="Coding Class Moments" />
          </div>

          {/* Robotics Class Section */}
          <div>
            <ProgramSection 
              icon={Bot}
              title="Robotics Engineering & Design"
              description="This comprehensive course covers the essentials of robotics, from basic mechanical assembly to programming complex behaviors. Students will work with various sensors, motors, and control systems to bring their robotic creations to life."
              learnPoints={[
                "Fundamentals of robot design and mechanics.",
                "Programming microcontrollers (e.g., Arduino, Raspberry Pi).",
                "Integrating sensors for environmental interaction.",
                "Understanding actuators and motor control.",
                "Team-based projects and robotics competition preparation."
              ]}
              imageUrl="/Robotics1.jpg"
              imageAlt="Students assembling and programming a robot"
              imageHint="students building robot"
              inquireLink="/admissions"
              inquireText="Explore Robotics Programs"
              imagePosition="right"
            />
            <ClassGallery images={roboticsGalleryImages} galleryTitle="Robotics Workshop Snapshots" />
          </div>
          
          {/* Computer Literacy Section */}
          <div>
            <ProgramSection 
              icon={Laptop}
              title="Digital Literacy & Productivity Tools"
              description="This foundational course builds essential computer skills, covering operating system navigation, file management, internet safety, and proficiency in widely-used office productivity software like word processors, spreadsheets, and presentation tools."
              learnPoints={[
                "Navigating computer operating systems effectively.",
                "Mastering office suite applications (documents, spreadsheets, presentations).",
                "Safe and responsible internet usage and digital citizenship.",
                "Fundamentals of file management and cloud storage.",
                "Introduction to graphic design principles or basic video editing."
              ]}
              imageUrl="/Computer1.png"
              imageAlt="Students in a computer class"
              imageHint="students computer class"
              inquireLink="/admissions"
              inquireText="Join Our Computer Courses"
              imagePosition="left"
            />
            <ClassGallery images={computerGalleryImages} galleryTitle="Digital Literacy in Action" />
          </div>
        </div>

      </SectionWrapper>
    </div>
  );
}
