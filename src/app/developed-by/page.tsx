
'use client';

import { useState } from 'react';
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, DollarSign, Users, Sparkles, Cpu, Palette, Server, Phone, Info, Contact } from "lucide-react";

export default function DevelopedByPage() {
  const [showContactDetails, setShowContactDetails] = useState(false);

  return (
    <div className="container mx-auto py-12 px-4">
      <SectionWrapper title="Crafted with Passion by {InfinityX}">
        <Card className="max-w-4xl mx-auto shadow-2xl bg-card border-primary/20">
          <CardHeader className="text-center pb-8 pt-10 bg-gradient-to-br from-primary/10 via-background to-background rounded-t-lg">
            <div className="inline-block p-4 bg-primary rounded-full mx-auto mb-5 shadow-lg">
              <Sparkles className="w-12 h-12 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
              PRINCE & SHUBHAM {'{InfinityX}'}
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-foreground/80 mt-3">
              We are passionate software developers specializing in creating modern, responsive, and AI-integrated web applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10 space-y-10">
            <div className="text-center border-b border-border pb-8">
              <Users className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="text-2xl font-semibold text-secondary mb-3">About Us</h3>
              <p className="text-lg text-foreground/90 leading-relaxed">
                This website was proudly developed by <strong>PRINCE &amp; SHUBHAM</strong>, the creative minds behind <strong>{'{InfinityX}'}</strong>.
              </p>
              <p className="text-md text-foreground/80 mt-3 max-w-2xl mx-auto">
                We turn ideas into digital realities, specializing in modern, responsive, and AI-integrated web applications tailored to your unique needs.
              </p>
            </div>

            {/* Contact Information Section */}
            <div className="text-center border-b border-border pb-8">
              <Contact className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="text-2xl font-semibold text-secondary mb-4">Contact Information</h3>
              
              {!showContactDetails ? (
                <Button onClick={() => setShowContactDetails(true)} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Click to View Contact Details
                </Button>
              ) : (
                <div className="space-y-3 text-lg text-foreground/90 mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="font-semibold">
                      Phone: <a href="tel:8449822974" className="text-primary hover:underline">8449822974</a>
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="font-semibold">
                      Alternate: <a href="tel:9485171788" className="text-primary hover:underline">9485171788</a>
                    </span>
                  </div>
                  {/* Email removed from here */}
                  <Button onClick={() => setShowContactDetails(false)} variant="outline" size="sm" className="mt-4">
                    Hide Contact Details
                  </Button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-6 text-center">Our Services</h3>
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-3 text-xl text-accent">
                      <Briefcase className="w-6 h-6" /> Standard Web Solutions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-bold text-2xl text-primary">₹5,000</p>
                    <p className="text-sm text-foreground/80">
                      Ideal for personal portfolios, small businesses, or dynamic landing pages. Includes responsive design and essential features.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-3 text-xl text-accent">
                      <Sparkles className="w-6 h-6" /> Advanced AI-Powered Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-bold text-2xl text-primary">₹15,000</p>
                    <p className="text-sm text-foreground/80">
                      Top-tier custom development with premium design, advanced GenAI capabilities, and ongoing support.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center flex items-center justify-center gap-1">
                <Info className="w-3.5 h-3.5" />
                These are example prices. Please use the contact details above for a custom quote.
              </p>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
