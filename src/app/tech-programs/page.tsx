
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code2, Bot, Laptop } from 'lucide-react';
import ClassGallery from '@/components/classes/ClassGallery';

const codingGalleryImages = [
  { src: '/All_Images/coding-classes/gallery-students-collaborating.png', alt: 'Students collaborating on code', dataAiHint: 'students collaborating' },
  { src: '/All_Images/coding-classes/gallery-student-presenting.png', alt: 'Student presenting coding project', dataAiHint: 'student presentation' },
  { src: '/All_Images/coding-classes/gallery-code-screen.png', alt: 'Close-up of code on a screen', dataAiHint: 'code screen' },
  { src: '/All_Images/coding-classes/gallery-student-laptop.png', alt: 'Happy student with laptop', dataAiHint: 'student laptop' },
  { src: '/All_Images/coding-classes/gallery-teacher-explaining.png', alt: 'Teacher explaining code to students', dataAiHint: 'teacher students' },
  { src: '/All_Images/coding-classes/gallery-girls-coding.png', alt: 'Group of girls coding', dataAiHint: 'girls coding' },
  { src: '/All_Images/coding-classes/gallery-diverse-students.png', alt: 'Diverse students in coding class', dataAiHint: 'diverse students' },
  { src: '/All_Images/coding-classes/gallery-student-debugging.png', alt: 'Student debugging code', dataAiHint: 'student debugging' },
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
  { src: '/All_Images/computer-classes/gallery-presentation-software.png', alt: 'Student learning presentation software', dataAiHint: 'student presentation software' },
];

export default function TechProgramsPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Explore Our Tech Programs">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Dive into the world of technology with our comprehensive programs in Coding, Robotics, and Computer Literacy. We empower students with essential skills for the future, fostering creativity, problem-solving, and digital proficiency.
        </p>

        {/* Coding Class Section */}
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card mb-12 group">
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
                  <Link href="/contact">
                    Inquire About Coding Classes <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
        <ClassGallery images={codingGalleryImages} galleryTitle="Coding Class Moments" />

        {/* Robotics Class Section */}
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card mt-12 mb-12 group">
          <div className="md:flex">
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
              <Image
                src="/All_Images/robotics-classes/main-students-assembling.png"
                alt="Students assembling and programming a robot"
                fill
                data-ai-hint="students building robot"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl md:text-3xl text-primary">Robotics Engineering & Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
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
              <CardContent>
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="/contact">
                    Explore Robotics Programs <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
        <ClassGallery images={roboticsGalleryImages} galleryTitle="Robotics Workshop Snapshots" />
        
        {/* Computer Literacy Section */}
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card mt-12 mb-12 group">
          <div className="md:flex">
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
              <Image
                src="/All_Images/computer-classes/main-students-classroom.png"
                alt="Students using computers in a classroom setting"
                fill
                data-ai-hint="students computers classroom"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
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
        <ClassGallery images={computerGalleryImages} galleryTitle="Digital Literacy in Action" />

      </SectionWrapper>
    </div>
  );
}
