
'use client';

import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { BookOpenCheck, Leaf, Users, Telescope, ArrowRight, TrendingUp, Zap, ShieldCheck, GraduationCap, Palette, Activity, School, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import FloatingAIHelper from '@/components/ai/FloatingAIHelper';
import PrivacyPolicyDialog from '@/components/layout/PrivacyPolicyDialog';
import TermsConditionsDialog from '@/components/layout/TermsConditionsDialog';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';


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
  const { t } = useTranslation();

  // --- Independence Day Animation State & Effect (Preserved) ---
  const [isClient, setIsClient] = useState(false);
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
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }

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
  }, [isClient]);
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

      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative -mt-12 w-full h-screen flex items-center justify-center text-center text-white overflow-hidden">
          <video
            src="/HPS_home.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
          <div className="relative z-20 p-4 md:p-8 max-w-4xl mx-auto">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl font-headline">
                Welcome to Himalaya Public School
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-100 drop-shadow-lg max-w-2xl mx-auto">
                Nurturing curious minds and shaping future leaders with a holistic approach to learning and personal growth.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
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
                className="w-full sm:w-auto px-10 py-7 text-lg font-semibold shadow-xl hover:scale-105 transition-colors duration-300 text-white border-white bg-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent"
              >
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Snippet Section */}
        <SectionWrapper className="bg-card text-foreground py-16 md:py-24">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">About Himalaya Public School</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Established in 1985, Himalaya Public School is a hub of academic excellence and character development. We provide a supportive, student-centered environment that encourages interactive learning and technological orientation.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our mission is to equip students with the skills and values needed to succeed in an ever-changing world. We believe in nurturing not just scholars, but well-rounded, compassionate individuals.
              </p>
              <Button asChild variant="link" className="text-primary hover:text-accent p-0 mt-6 text-lg">
                <Link href="/faculty">Meet Our Team <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="md:col-span-3">
              <div className="rounded-xl shadow-2xl overflow-hidden aspect-video group relative">
                <Image
                  src="/images/home_page.jpg" 
                  alt="Himalaya Public School, Pithoragarh - School Building"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint="Himalaya school Pithoragarh"
                  priority
                />
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Why Choose Himalaya Section */}
        <SectionWrapper title="Why Choose Himalaya?" className="bg-background text-foreground py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Academic Excellence", 
                icon: GraduationCap, 
                description: "A rigorous curriculum and dedicated faculty ensure a top-tier educational experience."
              },
              { title: "Holistic Development", icon: Leaf, description: "We focus on the all-round development of students, including arts, sports, and life skills." },
              { title: "Vibrant Community", icon: Users, description: "A supportive and inclusive community where every student feels valued and can thrive." }
            ].map((item, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-card hover:border-primary/50 group">
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
        <SectionWrapper title="Our Programs" className="bg-card text-foreground py-16 md:py-24">
          <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            From foundational learning to advanced specialization, our programs are designed for every stage of your child's educational journey.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Primary School", description: "Grades 1-5. Building strong foundations in a nurturing environment.", icon: BookOpenCheck, href: "/academic-programs#primary", dataAiHint: "children classroom" },
              { title: "Middle School", description: "Grades 6-8. Fostering critical thinking and deeper subject understanding.", icon: TrendingUp, href: "/academic-programs#middle", dataAiHint: "students science" },
              { title: "High School", description: "Grades 9-12. Preparing for board exams and future career paths.", icon: ShieldCheck, href: "/academic-programs#high", dataAiHint: "teenagers studying" },
              { title: "Tech Programs", description: "Specialized courses in Coding, Robotics, and Computer Literacy.", icon: Zap, href: "/tech-programs", dataAiHint: "robotics coding" },
            ].map((program) => (
              <Card key={program.title} className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-background hover:border-accent/50">
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
        <SectionWrapper title="Vibrant School Life" className="bg-background text-foreground py-16 md:py-24">
          <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            Life at Himalaya Public School is a rich tapestry of learning, creativity, and fun. We offer a wide range of activities beyond the classroom.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sports & Athletics", icon: Activity, description: "Promoting fitness, teamwork, and sportsmanship through various sports.", dataAiHint:"students playing sports" },
              { title: "Arts & Culture", icon: Palette, description: "Encouraging creativity through music, dance, drama, and visual arts.", dataAiHint:"children painting art" },
              { title: "Clubs & Events", icon: Telescope, description: "From science fairs to debate clubs, there's something for every interest.", dataAiHint:"student clubs activity" },
            ].map((item) => (
               <Card key={item.title} className="bg-card shadow-lg rounded-lg p-6 text-center group hover:shadow-xl transition-shadow duration-300">
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
        </SectionWrapper>
        
        {/* New Footer Box */}
        <footer className="bg-primary text-primary-foreground py-12 md:py-16 mt-10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              {/* Column 1: School Info */}
              <div>
                <Link href="/" className="flex items-center gap-3 mb-4 group">
                  <School className="h-9 w-9 text-primary-foreground group-hover:text-accent transition-colors" />
                  <span className="text-2xl font-bold text-primary-foreground group-hover:text-accent transition-colors font-headline">Himalaya Public School</span>
                </Link>
                <p className="text-base font-semibold text-primary-foreground">
                  Nurturing Minds, Shaping Futures.
                </p>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-5 font-headline">Explore</h3>
                <ul className="space-y-2.5">
                  <li><Link href="/academic-programs" className="text-base font-medium text-primary-foreground/90 hover:text-white hover:underline transition-colors flex items-center group"><ChevronRight className="w-4 h-4 mr-1.5 text-accent group-hover:text-white transition-colors" />Academic Programs</Link></li>
                  <li><Link href="/admissions" className="text-base font-medium text-primary-foreground/90 hover:text-white hover:underline transition-colors flex items-center group"><ChevronRight className="w-4 h-4 mr-1.5 text-accent group-hover:text-white transition-colors" />Admissions</Link></li>
                  <li><Link href="/faculty" className="text-base font-medium text-primary-foreground/90 hover:text-white hover:underline transition-colors flex items-center group"><ChevronRight className="w-4 h-4 mr-1.5 text-accent group-hover:text-white transition-colors" />Faculty</Link></li>
                  <li><Link href="/school-life" className="text-base font-medium text-primary-foreground/90 hover:text-white hover:underline transition-colors flex items-center group"><ChevronRight className="w-4 h-4 mr-1.5 text-accent group-hover:text-white transition-colors" />School Life</Link></li>
                </ul>
              </div>

              {/* Column 3: Contact Details */}
              <div>
                <h3 className="text-xl font-bold text-secondary mb-5 font-headline">Get in Touch</h3>
                <ul className="space-y-3.5 text-base font-medium text-primary-foreground/90">
                  <li className="flex items-start">
                    <MapPin className="w-4 h-4 mr-3 mt-1 text-primary-foreground shrink-0" />
                    <span>Near Sports Stadium, Pithoragarh</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-primary-foreground shrink-0" />
                    <div>
                      <a href="tel:+916398998621" className="hover:text-white hover:underline transition-colors block">+91-6398998621</a>
                      <a href="tel:+917351840980" className="hover:text-white hover:underline transition-colors block">+91-7351840980</a>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-primary-foreground shrink-0" />
                    <a href="mailto:hps_pithoragarh@rediffmail.com" className="hover:text-white hover:underline transition-colors">hps_pithoragarh@rediffmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-primary-foreground/30 pt-8 text-center">
              <p className="text-sm font-medium text-primary-foreground/80">© {new Date().getFullYear()} Himalaya Public School. All rights reserved.</p>
              <div className="mt-3">
                <PrivacyPolicyDialog />
                <span className="mx-1.5 text-primary-foreground/80">|</span>
                <TermsConditionsDialog />
              </div>
              <p className="text-xs text-primary-foreground/70 mt-4">
                Developed with ❤️ by <Link href="/developed-by" className="font-semibold hover:text-white hover:underline">PRINCE &amp; SHUBHAM {'{InfinityX}'}</Link>
              </p>
            </div>
          </div>
        </footer>

      </div>
      <FloatingAIHelper />
    </div>
  );
}
