
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { BookOpenCheck, Leaf, Users, Telescope, ArrowRight, TrendingUp, Zap, ShieldCheck, GraduationCap, Palette, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import FloatingAIHelper from '@/components/ai/FloatingAIHelper';

// --- Independence Day Animation Logic (Preserved) ---
const ANIMATION_DURATION = 800; 
const STAGGER_DELAY = 300; 
const TEXT_FADE_DURATION = 500; 
const DISPLAY_DURATION = 2000; 
const INITIAL_ANIMATION_DELAY = 10000;

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
// --- End of Independence Day Animation Logic ---

export default function HomePage() {
  // --- Independence Day Animation State & Effect (Preserved) ---
  const [animationContainerVisible, setAnimationContainerVisible] = useState(false);
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
    const currentMonth = currentDate.getMonth(); 
    const currentDay = currentDate.getDate();

    if (currentMonth === 7 && currentDay === 15) { // Check for August 15th
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
  // --- End of Independence Day Animation State & Effect ---

  return (
    <div> 
      {/* --- Independence Day Animation Container (Preserved) --- */}
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
      {/* --- End of Independence Day Animation Container --- */}

      <div 
        className="flex flex-col min-h-screen animate-in fade-in-0 duration-500"
        style={{ backgroundColor: 'hsl(52, 98%, 62%)' }} // Highlighted Yellow Background
      >
        {/* Hero Section */}
        <section className="relative w-full h-[75vh] md:h-[85vh] flex items-center justify-center text-center text-white overflow-hidden group">
          <Image
            src="/All_Images/home/hero-banner.png" 
            alt="Himalaya Public School - Inspiring Campus"
            fill
            className="z-0 object-cover brightness-75 group-hover:brightness-90 transition-all duration-500 ease-in-out"
            data-ai-hint="school campus students"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
          <div className="relative z-20 p-4 md:p-8 max-w-4xl mx-auto">
            <div className="animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-200">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl font-headline">
                Welcome to Himalaya Public School
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-100 drop-shadow-lg max-w-2xl mx-auto">
                Nurturing curious minds and shaping future leaders with a holistic approach to learning and personal growth.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-500">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-10 py-7 text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/academic-programs">Explore Programs</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-10 py-7 text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Snippet Section */}
        <SectionWrapper className="bg-background text-foreground py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in-0 slide-in-from-left-10 duration-700 delay-200">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">A Tradition of Learning & Growth</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Since our inception, Himalaya Public School has been committed to providing an exceptional educational experience. We foster an environment where students are encouraged to explore their passions, develop critical thinking skills, and become compassionate, responsible global citizens.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our dedicated faculty, comprehensive curriculum, and state-of-the-art facilities create a dynamic learning atmosphere that prepares students for success in an ever-evolving world.
              </p>
              <Button asChild variant="link" className="text-primary hover:text-accent p-0 mt-6 text-lg">
                <Link href="/faculty">Meet Our Team <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="animate-in fade-in-0 slide-in-from-right-10 duration-700 delay-300">
              <div className="rounded-xl shadow-2xl overflow-hidden aspect-video group">
                <Image
                  src="https://placehold.co/600x400.png" 
                  alt="Students engaged in learning at Himalaya Public School"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint="students learning campus"
                />
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Why Choose Himalaya Section */}
        <SectionWrapper title="Why Choose Himalaya?" className="bg-secondary/30 text-foreground py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Academic Excellence", icon: GraduationCap, description: "Rigorous curriculum, innovative teaching, and a focus on achieving full potential.", delay: 200 },
              { title: "Holistic Development", icon: Leaf, description: "Balancing academics with arts, sports, and character-building activities for all-round growth.", delay: 400 },
              { title: "Supportive Community", icon: Users, description: "A nurturing and inclusive environment where every student feels valued and supported.", delay: 600 }
            ].map((item, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-card hover:border-primary/50 group animate-in fade-in-0 slide-in-from-bottom-5 duration-700" style={{ animationDelay: `${item.delay}ms`}}>
                <CardHeader className="items-center text-center">
                  <div className="p-5 bg-primary/10 rounded-full mb-4 inline-block group-hover:bg-primary transition-colors duration-300">
                    <item.icon className="w-12 h-12 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors duration-300 font-headline">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-foreground/80">
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* Our Programs Teaser Section */}
        <SectionWrapper title="Pathways to Success: Our Programs" className="bg-background text-foreground py-16 md:py-24">
          <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            We offer a diverse range of programs designed to cater to different learning stages and interests, ensuring a strong foundation for every student.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Primary School", description: "Building foundational skills in a nurturing environment.", icon: BookOpenCheck, href: "/academic-programs#primary", delay: 200, dataAiHint: "children classroom" },
              { title: "Middle School", description: "Developing critical thinking and exploring new subjects.", icon: TrendingUp, href: "/academic-programs#middle", delay: 300, dataAiHint: "students science" },
              { title: "High School", description: "Preparing for board exams and specialized studies.", icon: ShieldCheck, href: "/academic-programs#high", delay: 400, dataAiHint: "teenagers studying" },
              { title: "Tech Programs", description: "Coding, Robotics, and Digital Literacy for the future.", icon: Zap, href: "/tech-programs", delay: 500, dataAiHint: "robotics coding" },
            ].map((program) => (
              <Card key={program.title} className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-card hover:border-accent/50 animate-in fade-in-0 slide-in-from-bottom-5 duration-700" style={{ animationDelay: `${program.delay}ms`}}>
                <CardHeader className="items-center text-center p-4">
                  <div className="p-3 bg-accent/10 rounded-full mb-3 inline-block group-hover:bg-accent transition-colors duration-300">
                    <program.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors font-headline">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center p-4">
                  <CardDescription className="text-foreground/80">{program.description}</CardDescription>
                </CardContent>
                <CardContent className="text-center p-4">
                  <Button asChild variant="outline" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Link href={program.href}>
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* School Life Teaser Section */}
        <SectionWrapper title="Beyond the Classroom: Vibrant School Life" className="bg-secondary/30 text-foreground py-16 md:py-24">
          <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            Our school is a hub of activity, offering numerous opportunities for students to engage, learn, and grow outside of academics.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sports & Athletics", icon: Activity, description: "Fostering teamwork, discipline, and physical well-being through a variety of sports.", delay: 200, dataAiHint:"students playing sports" },
              { title: "Arts & Culture", icon: Palette, description: "Encouraging creativity and self-expression through music, drama, visual arts, and cultural events.", delay: 350, dataAiHint:"children painting art" },
              { title: "Clubs & Events", icon: Telescope, description: "Diverse clubs and engaging school events that enrich the student experience and build community.", delay: 500, dataAiHint:"student clubs activity" },
            ].map((item) => (
               <Card key={item.title} className="bg-card shadow-lg rounded-lg p-6 text-center group hover:shadow-xl transition-shadow duration-300 animate-in fade-in-0 slide-in-from-bottom-5 duration-700" style={{animationDelay: `${item.delay}ms`}}>
                  <div className="flex justify-center mb-4">
                      <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary transition-colors duration-300">
                          <item.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2 font-headline">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12 animate-in fade-in-0 duration-700 delay-700">
            <Button asChild size="lg">
              <Link href="/school-life">
                Explore School Life <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </SectionWrapper>


        {/* Get Started CTA Section */}
        <SectionWrapper className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="text-center animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-200">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-headline">Ready to Join the Himalaya Family?</h2>
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
                className="px-12 py-7 text-lg md:text-xl font-semibold shadow-2xl hover:scale-105 transition-transform duration-300 border-2 border-white text-white hover:bg-white hover:bg-primary w-full sm:w-auto"
              >
                <Link href="/admissions#form">View Application Steps</Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </div>
      <FloatingAIHelper />
    </div>
  );
}

