
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { BookOpenCheck, Leaf, Handshake, FileText, Users2, Camera, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import FloatingAIHelper from '@/components/ai/FloatingAIHelper';

const ANIMATION_DURATION = 800; // ms for each plane to slide
const STAGGER_DELAY = 300; // ms between each plane
const TEXT_FADE_DURATION = 500; // ms
const DISPLAY_DURATION = 2000; // ms for text and full flag display
const INITIAL_ANIMATION_DELAY = 10000; // 10 seconds

interface AnimatedElement {
  id: string;
  opacity: number;
  transform: string;
  width: string;
  height: string;
  top: string;
  bgColor: string;
  transitionDuration: string;
  zIndex: number;
}

interface TextElement {
  opacity: number;
  transform: string;
  transitionDuration: string;
}

export default function HomePage() {
  const [animationContainerVisible, setAnimationContainerVisible] = useState(false); // Default to false
  const [saffronPlane, setSaffronPlane] = useState<AnimatedElement>({
    id: 'saffron-plane', opacity: 1, transform: 'translateX(-100%)', width: '100vw', height: '33.34vh', top: '0%', bgColor: 'bg-orange-500', transitionDuration: `${ANIMATION_DURATION}ms`, zIndex: 30,
  });
  const [whitePlane, setWhitePlane] = useState<AnimatedElement>({
    id: 'white-plane', opacity: 1, transform: 'translateX(-100%)', width: '100vw', height: '33.34vh', top: '33.33vh', bgColor: 'bg-white', transitionDuration: `${ANIMATION_DURATION}ms`, zIndex: 20,
  });
  const [greenPlane, setGreenPlane] = useState<AnimatedElement>({
    id: 'green-plane', opacity: 1, transform: 'translateX(-100%)', width: '100vw', height: '33.34vh', top: '66.66vh', bgColor: 'bg-green-600', transitionDuration: `${ANIMATION_DURATION}ms`, zIndex: 10,
  });
  const [chakra, setChakra] = useState<TextElement>({
    opacity: 0, transform: 'scale(0.5)', transitionDuration: `${TEXT_FADE_DURATION}ms`,
  });
  const [independenceText, setIndependenceText] = useState<TextElement>({
    opacity: 0, transform: 'scale(0.8) translateY(20px)', transitionDuration: `${TEXT_FADE_DURATION}ms`,
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // August is 7 (0-indexed)
    const currentDay = currentDate.getDate();

    // Check if it's August 15th
    if (currentMonth === 7 && currentDay === 15) {
      setAnimationContainerVisible(true); // Show the container only on Aug 15th

      const animationTimeouts: NodeJS.Timeout[] = [];

      // Main timeout to delay the start of the entire animation sequence
      const startAnimationTimeout = setTimeout(() => {
        // Phase 1: Planes slide in
        animationTimeouts.push(setTimeout(() => {
          setSaffronPlane(prev => ({ ...prev, transform: 'translateX(0%)' }));
        }, STAGGER_DELAY));

        animationTimeouts.push(setTimeout(() => {
          setWhitePlane(prev => ({ ...prev, transform: 'translateX(0%)' }));
          setChakra(prev => ({ ...prev, opacity: 1, transform: 'scale(1)' }));
        }, STAGGER_DELAY * 2));

        animationTimeouts.push(setTimeout(() => {
          setGreenPlane(prev => ({ ...prev, transform: 'translateX(0%)' }));
        }, STAGGER_DELAY * 3));

        // Phase 2: Display text
        const textAppearDelay = STAGGER_DELAY * 3 + ANIMATION_DURATION;
        animationTimeouts.push(setTimeout(() => {
          setIndependenceText(prev => ({ ...prev, opacity: 1, transform: 'scale(1) translateY(0)' }));
        }, textAppearDelay));

        // Phase 3: Text fades out
        const textFadeOutDelay = textAppearDelay + DISPLAY_DURATION;
        animationTimeouts.push(setTimeout(() => {
          setIndependenceText(prev => ({ ...prev, opacity: 0, transform: 'scale(0.8) translateY(20px)' }));
        }, textFadeOutDelay));

        // Phase 4: Planes slide out
        const planesOutStartDelay = textFadeOutDelay + TEXT_FADE_DURATION + STAGGER_DELAY;
        animationTimeouts.push(setTimeout(() => {
          setSaffronPlane(prev => ({ ...prev, transform: 'translateX(100%)' }));
        }, planesOutStartDelay));

        animationTimeouts.push(setTimeout(() => {
          setWhitePlane(prev => ({ ...prev, transform: 'translateX(100%)' }));
          setChakra(prev => ({ ...prev, opacity: 0, transform: 'scale(0.5)' }));
        }, planesOutStartDelay + STAGGER_DELAY));

        animationTimeouts.push(setTimeout(() => {
          setGreenPlane(prev => ({ ...prev, transform: 'translateX(100%)' }));
        }, planesOutStartDelay + STAGGER_DELAY * 2));

        // Phase 5: Hide animation container
        const hideContainerDelay = planesOutStartDelay + STAGGER_DELAY * 2 + ANIMATION_DURATION;
        animationTimeouts.push(setTimeout(() => {
          setAnimationContainerVisible(false);
        }, hideContainerDelay));

      }, INITIAL_ANIMATION_DELAY);

      animationTimeouts.push(startAnimationTimeout);

      return () => {
        animationTimeouts.forEach(clearTimeout);
      };
    }
    // If not August 15th, animationContainerVisible remains false, so nothing shows.
  }, []);


  return (
    <>
      {animationContainerVisible && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden bg-transparent">
          {[saffronPlane, whitePlane, greenPlane].map(plane => (
            <div
              key={plane.id}
              className={`absolute ${plane.bgColor}`}
              style={{
                opacity: plane.opacity,
                transform: plane.transform,
                width: plane.width,
                height: plane.height,
                top: plane.top,
                left: 0,
                zIndex: plane.zIndex,
                transition: `transform ${plane.transitionDuration} cubic-bezier(0.25, 1, 0.5, 1), opacity ${plane.transitionDuration} ease-out`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
          {/* Ashoka Chakra SVG */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'min(15vh, 15vw)',
              height: 'min(15vh, 15vw)',
              opacity: chakra.opacity,
              transform: chakra.transform,
              transition: `opacity ${chakra.transitionDuration} ease-in-out, transform ${chakra.transitionDuration} ease-in-out`,
              zIndex: 25,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-900 fill-current" 
            >
              <circle cx="50" cy="50" r="48" fill="transparent" stroke="currentColor" strokeWidth="3" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={`spoke-${i}`}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="8" 
                  stroke="currentColor"
                  strokeWidth="3" 
                  transform={`rotate(${(i * 360) / 24}, 50, 50)`}
                />
              ))}
            </svg>
          </div>
          
          <div
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center"
            style={{
              opacity: independenceText.opacity,
              transform: independenceText.transform,
              transition: `opacity ${independenceText.transitionDuration} ease-in-out, transform ${independenceText.transitionDuration} ease-in-out`,
              zIndex: 40, 
            }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              Happy Independence Day
            </h1>
          </div>
        </div>
      )}
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
          <Image
            src="/All_Images/home/hero-banner.png"
            alt="Himalaya Public School Campus"
            fill
            className="z-0 object-cover"
            data-ai-hint="school campus building"
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
                  <BookOpenCheck className="w-10 h-10 text-primary-foreground" />
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
                  <Leaf className="w-10 h-10 text-primary-foreground" />
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
                  <Handshake className="w-10 h-10 text-primary-foreground" />
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
      <FloatingAIHelper />
    </>
  );
}
