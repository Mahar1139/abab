'use client';

import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { Leaf, Users, Telescope, ArrowRight, GraduationCap, Palette, Activity, School, MapPin, Phone, Mail, ChevronRight, Cpu, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import PrivacyPolicyDialog from '@/components/layout/PrivacyPolicyDialog';
import TermsConditionsDialog from '@/components/layout/TermsConditionsDialog';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import dynamic from 'next/dynamic';

const FloatingAIHelper = dynamic(() => import('@/components/ai/FloatingAIHelper'), { ssr: false });

export default function HomePage() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative -mt-12 w-full h-screen flex items-center justify-center text-center overflow-hidden">
          <Image
            src="/DSC_4562.JPG"
            alt="Himalaya Public School Campus"
            fill
            priority
            className="object-cover z-0"
            data-ai-hint="school building"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 p-4 md:p-8 max-w-4xl mx-auto">
            <div className={isClient ? 'animate-fade-in-up' : 'opacity-0'}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-headline text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                Welcome to Himalaya Public School
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white max-w-2xl mx-auto" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                Nurturing curious minds and shaping future leaders with a holistic approach to learning and personal growth.
              </p>
            </div>
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 ${isClient ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-10 py-7 text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/tech-programs">Explore Programs</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto px-10 py-7 text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Snippet Section */}
        <SectionWrapper className="bg-muted text-foreground py-16 md:py-24">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">About Himalaya Public School</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Established in 2005, Himalaya Public School is a hub of academic excellence and character development. We provide a supportive, student-centered environment that encourages interactive learning and technological orientation.
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
                  src="/DSC_4562.JPG" 
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
                  <div className="p-5 bg-primary rounded-full mb-4 inline-block group-hover:bg-accent transition-colors duration-300">
                    <item.icon className="w-12 h-12 text-primary-foreground group-hover:text-accent-foreground transition-colors duration-300" />
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

        {/* Our Core Features Section */}
        <SectionWrapper title="Our Core Features" className="bg-card text-foreground py-16 md:py-24">
          <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            We provide a modern educational experience with state-of-the-art tools and a focus on comprehensive student growth.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Extramarks Partnership", description: "Extramarks is now available, offering comprehensive digital learning resources to supplement classroom teaching.", icon: GraduationCap, href: "/extramarks" },
              { title: "AI-Powered Learning", description: "Engage with our unique AI Quiz Challenge and AI Assistant for a personalized learning journey.", icon: Brain, href: "/quiz" },
              { title: "Advanced Tech Labs", description: "Gain hands-on experience in our fully equipped labs for Coding, Robotics and AI.", icon: Cpu, href: "/tech-programs" },
              { title: "Holistic Development", description: "We focus on all-round development, including arts, sports, and vital life skills.", icon: Leaf, href: "/school-life" },
            ].map((feature) => (
              <Card key={feature.title} className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-background hover:border-accent/50">
                <CardHeader className="items-center text-center p-4">
                  <div className="p-3 bg-accent/10 rounded-full mb-3 inline-block group-hover:bg-accent transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center p-4">
                  <CardDescription className="text-foreground/80">{feature.description}</CardDescription>
                </CardContent>
                <CardContent className="text-center p-4">
                  <Button asChild variant="outline" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Link href={feature.href}>
                      Explore More <ArrowRight className="ml-2 w-4 h-4" />
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
                  <li><Link href="/tech-programs" className="text-base font-medium text-primary-foreground/90 hover:text-white hover:underline transition-colors flex items-center group"><ChevronRight className="w-4 h-4 mr-1.5 text-accent group-hover:text-white transition-colors" />Tech Programs</Link></li>
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
                      <a href="tel:+919897089880" className="hover:text-white hover:underline transition-colors block">+91-9897089880</a>
                      <a href="tel:+917055840794" className="hover:text-white hover:underline transition-colors block">+91-7055840794</a>
                      <a href="tel:+919760042208" className="hover:text-white hover:underline transition-colors block">+91-9760042208</a>
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
