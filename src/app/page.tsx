
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { GraduationCap, Activity, Users, FileText, Users2, Camera, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const initialPlanesConfig = [
  { id: 'saffron', color: 'bg-orange-500', initialTransform: 'scaleY(0)', finalTransform: 'scaleY(1)', topClass: 'top-0', initialOpacity: 0, finalOpacity: 1 },
  { id: 'white', color: 'bg-white', initialTransform: 'scaleY(0)', finalTransform: 'scaleY(1)', topClass: 'h-1/3 top-1/3', initialOpacity: 0, finalOpacity: 1 },
  { id: 'green', color: 'bg-green-600', initialTransform: 'scaleY(0)', finalTransform: 'scaleY(1)', topClass: 'h-1/3 top-2/3', initialOpacity: 0, finalOpacity: 1 },
];

const CHAKRA_DIAMETER_VH = 15;
const TEXT_FADE_SCALE_DURATION = 700; // General duration for text
const CHAKRA_TRANSITION_DURATION = 700; // Duration for chakra fade

// Animation timings for planes
const ANIM_DURATION_PLANE_ENTER_OVERSHOOT = 600; // ms
const ANIM_DURATION_PLANE_ENTER_SETTLE = 400;   // ms
const ANIM_DURATION_PLANE_EXIT = 700;          // ms

export default function HomePage() {
  const initialPlanesState = initialPlanesConfig.map(p => ({
    ...p,
    currentTransform: p.initialTransform,
    currentOpacity: p.initialOpacity,
    currentTransitionDurationMs: ANIM_DURATION_PLANE_ENTER_OVERSHOOT, // Default for initial part of entry
    currentTransitionTimingFunction: 'ease-out', // Default for initial part of entry
  }));

  const [planes, setPlanes] = useState(initialPlanesState);
  const [animationContainerVisible, setAnimationContainerVisible] = useState(true);
  const [chakraOpacity, setChakraOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textScale, setTextScale] = useState(0.9);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // Timings
    const saffronEnterOvershootTime = 100;
    const saffronEnterSettleTime = saffronEnterOvershootTime + ANIM_DURATION_PLANE_ENTER_OVERSHOOT;

    const whiteEnterOvershootTime = saffronEnterSettleTime + ANIM_DURATION_PLANE_ENTER_SETTLE;
    const whiteEnterSettleTime = whiteEnterOvershootTime + ANIM_DURATION_PLANE_ENTER_OVERSHOOT;

    const greenEnterOvershootTime = whiteEnterSettleTime + ANIM_DURATION_PLANE_ENTER_SETTLE;
    const greenEnterSettleTime = greenEnterOvershootTime + ANIM_DURATION_PLANE_ENTER_OVERSHOOT;
    
    const chakraFadeInStartTime = whiteEnterOvershootTime; // Chakra fades in as white plane starts entering
    const flagFullyFormedTime = greenEnterSettleTime + ANIM_DURATION_PLANE_ENTER_SETTLE;
    
    const textFadeInStartTime = flagFullyFormedTime + 300;
    const textVisiblePauseDuration = 2500;
    const textFadeOutStartTime = textFadeInStartTime + TEXT_FADE_SCALE_DURATION + textVisiblePauseDuration;

    const flagExitDelayAfterText = 500;
    const exitStartTime = textFadeOutStartTime + TEXT_FADE_SCALE_DURATION + flagExitDelayAfterText;
    const overallAnimationEndTime = exitStartTime + ANIM_DURATION_PLANE_EXIT + 300;

    // --- Saffron Plane Animation ---
    timeouts.push(setTimeout(() => { // Overshoot
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === 'saffron' ? {
        ...p,
        currentOpacity: p.finalOpacity,
        currentTransform: 'scaleY(1.05)',
        currentTransitionDurationMs: ANIM_DURATION_PLANE_ENTER_OVERSHOOT,
        currentTransitionTimingFunction: 'ease-out',
      } : p));
    }, saffronEnterOvershootTime));
    timeouts.push(setTimeout(() => { // Settle
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === 'saffron' ? {
        ...p,
        currentTransform: p.finalTransform,
        currentTransitionDurationMs: ANIM_DURATION_PLANE_ENTER_SETTLE,
        currentTransitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Bouncy settle
      } : p));
    }, saffronEnterSettleTime));

    // --- White Plane Animation & Chakra Fade-In ---
    timeouts.push(setTimeout(() => { // Overshoot
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === 'white' ? {
        ...p,
        currentOpacity: p.finalOpacity,
        currentTransform: 'scaleY(1.05)',
        currentTransitionDurationMs: ANIM_DURATION_PLANE_ENTER_OVERSHOOT,
        currentTransitionTimingFunction: 'ease-out',
      } : p));
      setChakraOpacity(1); // Chakra fades in with white plane
    }, whiteEnterOvershootTime));
    timeouts.push(setTimeout(() => { // Settle
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === 'white' ? {
        ...p,
        currentTransform: p.finalTransform,
        currentTransitionDurationMs: ANIM_DURATION_PLANE_ENTER_SETTLE,
        currentTransitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      } : p));
    }, whiteEnterSettleTime));

    // --- Green Plane Animation ---
    timeouts.push(setTimeout(() => { // Overshoot
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === 'green' ? {
        ...p,
        currentOpacity: p.finalOpacity,
        currentTransform: 'scaleY(1.05)',
        currentTransitionDurationMs: ANIM_DURATION_PLANE_ENTER_OVERSHOOT,
        currentTransitionTimingFunction: 'ease-out',
      } : p));
    }, greenEnterOvershootTime));
    timeouts.push(setTimeout(() => { // Settle
      setPlanes(prevPlanes => prevPlanes.map(p => p.id === 'green' ? {
        ...p,
        currentTransform: p.finalTransform,
        currentTransitionDurationMs: ANIM_DURATION_PLANE_ENTER_SETTLE,
        currentTransitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      } : p));
    }, greenEnterSettleTime));

    // --- Text Animation ---
    timeouts.push(setTimeout(() => { // Fade In Text
      setTextOpacity(1);
      setTextScale(1);
    }, textFadeInStartTime));
    timeouts.push(setTimeout(() => { // Fade Out Text
      setTextOpacity(0);
      setTextScale(0.9);
    }, textFadeOutStartTime));
    
    // --- Exit Animation for Flag & Chakra ---
    timeouts.push(setTimeout(() => {
      setPlanes(prevPlanes => prevPlanes.map(p => ({
        ...p,
        currentOpacity: 0,
        currentTransform: 'scaleY(0)', // Shrink vertically
        currentTransitionDurationMs: ANIM_DURATION_PLANE_EXIT,
        currentTransitionTimingFunction: 'ease-in',
      })));
      setChakraOpacity(0); // Chakra fades out
    }, exitStartTime));

    // --- Hide Animation Container ---
    timeouts.push(setTimeout(() => {
      setAnimationContainerVisible(false);
    }, overallAnimationEndTime));

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);


  return (
    <>
      {animationContainerVisible && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {planes.map(plane => (
            <div
              key={plane.id}
              className={`absolute left-0 w-full h-1/3 ${plane.color} ${plane.topClass} origin-center transition-all`}
              style={{ 
                transform: plane.currentTransform,
                opacity: plane.currentOpacity,
                transitionDuration: `${plane.currentTransitionDurationMs}ms`,
                transitionTimingFunction: plane.currentTransitionTimingFunction,
              }}
            />
          ))}
          {/* Ashoka Chakra */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 rounded-full transition-opacity ease-in-out"
            style={{
              width: `${CHAKRA_DIAMETER_VH}vh`,
              height: `${CHAKRA_DIAMETER_VH}vh`,
              opacity: chakraOpacity,
              transitionDuration: `${CHAKRA_TRANSITION_DURATION}ms`,
              zIndex: 101, 
            }}
          />
          {/* Happy Independence Day Text */}
          <div
            className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 text-center transition-all ease-in-out"
            style={{
              opacity: textOpacity,
              transform: `translate(-50%, -50%) scale(${textScale})`,
              transitionDuration: `${TEXT_FADE_SCALE_DURATION}ms`,
              zIndex: 102, 
            }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ textShadow: '0 0 5px rgba(0,0,50,0.7), 0 0 10px rgba(0,0,50,0.5), 0 0 15px rgba(0,0,50,0.3)' }}>
              Happy Independence Day
            </h2>
          </div>
        </div>
      )}
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-slate-900">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Himalaya Public School Campus"
            fill
            className="z-0 object-cover"
            data-ai-hint="school campus students"
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
    </>
  );
}

    
