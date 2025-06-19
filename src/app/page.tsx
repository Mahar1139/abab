
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { BookOpenCheck, Leaf, Handshake, FileText, Users2, Camera, ArrowRight, TrendingUp, Users, Telescope } from 'lucide-react';
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

    if (currentMonth === 7 && currentDay === 15) {
      setAnimationContainerVisible(true); 

      const animationTimeouts: NodeJS.Timeout[] = [];
      const startAnimationTimeout = setTimeout(() => {
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

        const textAppearDelay = STAGGER_DELAY * 3 + ANIMATION_DURATION;
        animationTimeouts.push(setTimeout(() => {
          setIndependenceText(prev => ({ ...prev, opacity: 1, transform: 'scale(1) translateY(0)' }));
        }, textAppearDelay));

        const textFadeOutDelay = textAppearDelay + DISPLAY_DURATION;
        animationTimeouts.push(setTimeout(() => {
          setIndependenceText(prev => ({ ...prev, opacity: 0, transform: 'scale(0.8) translateY(20px)' }));
        }, textFadeOutDelay));

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
      <div className="flex flex-col min-h-screen animate-in fade-in-0 duration-500">
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
          <Image
            src="/All_Images/home/hero-banner.png"
            alt="Himalaya Public School Campus"
            fill
            className="z-0 object-cover"
            data-ai-hint="school campus building"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" /> {/* Gradient Overlay */}
          <div className="relative z-20 p-4 md:p-8 max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-200">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 drop-shadow-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-300">
              Empowering Minds, Shaping Futures at Himalaya Public School
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-100 drop-shadow-lg max-w-3xl mx-auto animate-in fade-in-0 duration-1000 delay-500">
              Discover a nurturing environment where academic excellence and holistic development go hand in hand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
              <Button
                asChild
                size="lg"
                variant="default"
                className="w-full sm:w-auto px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-300 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/admissions">Apply Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-300 border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="#discover">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Discover Himalaya Section */}
        <SectionWrapper className="bg-background/90 backdrop-blur-md text-foreground py-16 md:py-24 animate-in fade-in-0 duration-700 delay-200" id="discover">
          <div className="text-center max-w-3xl mx-auto p-6 border-2 border-primary/20 rounded-xl shadow-lg bg-card/50">
             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Discover Himalaya</h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Himalaya Public School is more than just an educational institution; it's a vibrant community dedicated to fostering intellectual curiosity, critical thinking, and a lifelong love for learning. We provide a balanced education that prepares students not only for academic success but also for the challenges and opportunities of the modern world.
            </p>
          </div>
        </SectionWrapper>

        {/* Why Choose Us Section */}
        <SectionWrapper title="Why Choose Himalaya?" className="bg-secondary/50 backdrop-blur-sm text-card-foreground py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Academic Excellence", icon: BookOpenCheck, description: "Our rigorous curriculum and dedicated faculty ensure students achieve their full academic potential and are well-prepared for higher education.", delay: 200 },
              { title: "Holistic Growth", icon: Leaf, description: "We focus on the all-round development of students, offering a rich array of extracurricular activities in sports, arts, and leadership.", delay: 400 },
              { title: "Vibrant Community", icon: Handshake, description: "Join a supportive and inclusive community that values diversity, collaboration, and mutual respect among students, parents, and staff.", delay: 600 }
            ].map((item, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-card hover:border-primary/50 group animate-in fade-in-0 slide-in-from-bottom-5 duration-700" style={{ animationDelay: `${item.delay}ms`}}>
                <CardHeader className="items-center text-center">
                  <div className="p-5 bg-primary/10 rounded-full mb-4 inline-block group-hover:bg-primary transition-colors duration-300">
                    <item.icon className="w-12 h-12 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors duration-300">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-foreground/80">
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* Explore Our School Section */}
        <SectionWrapper title="Explore Our School" className="bg-background/90 backdrop-blur-md text-foreground py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Admissions Process", href: "/admissions", icon: FileText, description: "Learn about our application process and key dates.", dataAiHint: "admission documents", delay: 200 },
              { title: "Meet Our Faculty", href: "/faculty", icon: Users, description: "Discover our dedicated and experienced educators.", dataAiHint: "teachers group", delay: 400 },
              { title: "Vibrant School Life", href: "/school-life", icon: Telescope, description: "See student activities, events, and news.", dataAiHint: "students activities", delay: 600 },
            ].map((item, index) => (
              <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full bg-card hover:border-accent/50 animate-in fade-in-0 slide-in-from-bottom-5 duration-700" style={{ animationDelay: `${item.delay}ms`}}>
                <CardHeader className="items-center text-center">
                    <div className="p-4 bg-accent/10 rounded-full mb-3 inline-block group-hover:bg-accent transition-colors duration-300">
                        <item.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                    </div>
                  <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <CardDescription className="text-foreground/80">{item.description}</CardDescription>
                </CardContent>
                <CardContent className="text-center">
                  <Button asChild variant="outline" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground transition-colors">
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
        <SectionWrapper className="bg-primary/95 backdrop-blur-sm text-primary-foreground py-20 md:py-28 animate-in fade-in-0 duration-700 delay-300">
          <div className="text-center animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-500">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Himalaya Family?</h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
              We invite you to explore our campus, meet our community, and see how Himalaya Public School can be the perfect place for your child's educational journey.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row items-center justify-center">
              <Button
                asChild
                size="lg"
                className="px-12 py-7 text-lg md:text-xl font-semibold shadow-2xl hover:scale-105 transition-transform duration-300 bg-accent text-accent-foreground hover:bg-accent/80 w-full sm:w-auto"
              >
                <Link href="/contact">Contact Admissions</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline" 
                className="px-12 py-7 text-lg md:text-xl font-semibold shadow-2xl hover:scale-105 transition-transform duration-300 border-2 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
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
