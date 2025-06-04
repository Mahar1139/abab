
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { GraduationCap, Activity, Users, FileText, Users2, Camera, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-slate-900">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Himalaya Public School Campus"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="modern school campus students"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 p-4 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
            Empowering Minds, Shaping Futures at Himalaya Public School
          </h1>
          <p className="text-md sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 drop-shadow-md max-w-2xl mx-auto">
            Discover a nurturing environment where academic excellence and holistic development go hand in hand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              asChild
              size="lg"
              variant="default"
              className="w-full sm:w-auto px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Link href="/admissions">Apply Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto px-8 py-6 text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Link href="#discover">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Discover Himalaya Section */}
      <SectionWrapper title="Discover Himalaya" className="bg-background/80 backdrop-blur-sm text-foreground py-12 md:py-20" id="discover">
        <p className="text-center text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Himalaya Public School is more than just an educational institution; it's a vibrant community dedicated to fostering intellectual curiosity, critical thinking, and a lifelong love for learning. We provide a balanced education that prepares students not only for academic success but also for the challenges and opportunities of the modern world.
        </p>
      </SectionWrapper>

      {/* Why Choose Us Section */}
      <SectionWrapper title="Why Choose Himalaya?" className="bg-card/80 backdrop-blur-sm text-card-foreground py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-background/50">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary rounded-full mb-4 inline-block">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-primary">Academic Excellence</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-foreground/80">
              <p>Our rigorous curriculum and dedicated faculty ensure students achieve their full academic potential and are well-prepared for higher education.</p>
            </CardContent>
          </Card>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-background/50">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary rounded-full mb-4 inline-block">
                <Activity className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-primary">Holistic Growth</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-foreground/80">
              <p>We focus on the all-round development of students, offering a rich array of extracurricular activities in sports, arts, and leadership.</p>
            </CardContent>
          </Card>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-background/50">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary rounded-full mb-4 inline-block">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-primary">Vibrant Community</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-foreground/80">
              <p>Join a supportive and inclusive community that values diversity, collaboration, and mutual respect among students, parents, and staff.</p>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      {/* Explore Our School Section */}
      <SectionWrapper title="Explore Our School" className="bg-background/80 backdrop-blur-sm text-foreground py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Admissions Process", href: "/admissions", icon: FileText, description: "Learn about our application process and key dates.", dataAiHint: "admission documents" },
            { title: "Meet Our Faculty", href: "/faculty", icon: Users2, description: "Discover our dedicated and experienced educators.", dataAiHint: "teachers group" },
            { title: "Vibrant School Life", href: "/school-life", icon: Camera, description: "See student activities, events, and news.", dataAiHint: "students activities" },
          ].map((item) => (
            <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-secondary rounded-md">
                    <item.icon className="w-6 h-6 text-secondary-foreground" />
                   </div>
                  <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-foreground/80">{item.description}</CardDescription>
              </CardContent>
              <CardContent>
                 <Button asChild variant="link" className="p-0 text-primary group-hover:text-accent">
                    <Link href={item.href}>
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Get Started CTA Section */}
      <SectionWrapper className="bg-primary/90 backdrop-blur-sm text-primary-foreground py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Himalaya Family?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            We invite you to explore our campus, meet our community, and see how Himalaya Public School can be the perfect place for your child's educational journey.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary" 
              className="px-10 py-6 text-lg md:text-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              <Link href="/contact">Contact Admissions</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline" 
              className="px-10 py-6 text-lg md:text-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto"
            >
              <Link href="/admissions">View Application Steps</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
