
import Image from 'next/image';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Bot } from 'lucide-react';

export default function RoboticsClassesPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Build the Future with Our Robotics Classes">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-3xl mx-auto">
          Step into the exciting field of robotics! Our classes offer hands-on experience in designing, building, and programming robots, nurturing skills in engineering, mechanics, and artificial intelligence.
        </p>
        
        <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card">
          <div className="md:flex">
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-[400px]">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Students assembling and programming a robot"
                layout="fill"
                objectFit="cover"
                data-ai-hint="students building robot"
                className="transition-transform duration-300 group-hover:scale-105"
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
        
      </SectionWrapper>
    </div>
  );
}
