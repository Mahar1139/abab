
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, Eye, BookOpen as HistoryIcon } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <SectionWrapper className="bg-gradient-to-b from-primary/10 to-background pt-12 pb-16 text-center">
          <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Himalaya Public School Campus" 
            width={1200} 
            height={400} 
            className="rounded-lg shadow-xl mx-auto mb-8"
            data-ai-hint="school building students" 
            priority
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Welcome to Himalaya Public School
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Nurturing young minds for a brighter future through academic excellence, character development, and a vibrant community.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/admissions">Explore Admissions</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
      </SectionWrapper>

      <SectionWrapper title="Our Core Values">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-center">
                To provide a stimulating learning environment with a technological orientation, which maximizes individual potential and ensures that students of all ability levels are well-equipped to meet the challenges of education, work, and life.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <Eye className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-center">
                To be a center of excellence in education, instilling in students a love for learning, a respect for diversity, and the leadership skills necessary to contribute positively to society.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3">
                <HistoryIcon className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our History</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-center">
                Founded in 1985, Himalaya Public School has a rich legacy of academic achievement and community involvement, consistently adapting to provide the best educational experience.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Discover More" className="bg-secondary/50">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Vibrant School Life</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/600x400.png" alt="School activities" width={600} height={400} className="rounded-md mb-4" data-ai-hint="students activities"/>
              <CardDescription>Explore the diverse extracurricular activities, events, and achievements that make our school community special.</CardDescription>
              <Button asChild className="mt-4">
                <Link href="/school-life">Explore School Life</Link>
              </Button>
            </CardContent>
          </Card>
           <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Meet Our Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/600x400.png" alt="Faculty members" width={600} height={400} className="rounded-md mb-4" data-ai-hint="teachers group"/>
              <CardDescription>Our dedicated and experienced educators are committed to fostering a supportive and engaging learning environment.</CardDescription>
              <Button asChild className="mt-4">
                <Link href="/faculty">Meet Our Team</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
}
