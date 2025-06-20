
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Mail, Briefcase, DollarSign, Users, Sparkles, Cpu, Palette, Server, Phone } from "lucide-react";

export default function DevelopedByPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <SectionWrapper title="Crafted with Passion by {InfinityX}">
        <Card className="max-w-4xl mx-auto shadow-2xl bg-card border-primary/20">
          <CardHeader className="text-center pb-8 pt-10 bg-gradient-to-br from-primary/10 via-background to-background rounded-t-lg">
            <div className="inline-block p-4 bg-primary rounded-full mx-auto mb-5 shadow-lg">
              <Sparkles className="w-12 h-12 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
              Contact PRINCE &amp; SHUBHAM {'{InfinityX}'}
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-foreground/80 mt-3 space-y-2">
              <div>
                If you want a website like this, or to discuss a project, please reach out:
              </div>
              <div className="flex items-center justify-center sm:justify-start text-left gap-2">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-semibold">
                  Phone: <a href="tel:8449822974" className="text-accent hover:underline">8449822974</a> / <a href="tel:9485171788" className="text-accent hover:underline">9485171788</a>
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-left gap-2">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-semibold">
                 Email: <Link href="mailto:princekohli@outlook.com" className="text-accent hover:underline">princekohli@outlook.com</Link>
                </span>
              </div>
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
                We are passionate software developers specializing in creating modern, responsive, and AI-integrated web applications tailored to your unique needs. We turn ideas into digital realities.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-6 text-center">Our Service Tiers</h3>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-accent">
                      <Briefcase className="w-6 h-6" /> Basic Website Package
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-foreground/80">
                      Ideal for personal portfolios, small businesses, or dynamic landing pages. Includes responsive design and essential features.
                    </p>
                    <ul className="list-disc list-inside text-xs text-foreground/70 pl-1 space-y-1">
                      <li>Up to 5 pages</li>
                      <li>Responsive Design</li>
                      <li>Basic SEO Setup</li>
                      <li>Contact Form</li>
                    </ul>
                  </CardContent>
                  <CardContent className="mt-auto">
                    <p className="text-xl font-bold text-primary mt-3 pt-2 border-t border-dashed">Starting from ₹9,000</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-accent">
                      <Server className="w-6 h-6" /> Advanced Web Application
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-foreground/80">
                      Custom-built applications with complex functionalities, database integration, and user authentication.
                    </p>
                     <ul className="list-disc list-inside text-xs text-foreground/70 pl-1 space-y-1">
                      <li>Custom Features (up to 10-12 pages)</li>
                      <li>Database Integration</li>
                      <li>User Accounts & Auth</li>
                      <li>Admin Panel</li>
                    </ul>
                  </CardContent>
                  <CardContent className="mt-auto">
                    <p className="text-xl font-bold text-primary mt-3 pt-2 border-t border-dashed">Starting from ₹15,000</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-accent">
                      <Cpu className="w-6 h-6" /> Advance Max Package
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-foreground/80">
                      Comprehensive web solutions with standard AI integration to enhance user experience and functionality.
                    </p>
                     <ul className="list-disc list-inside text-xs text-foreground/70 pl-1 space-y-1">
                        <li>All Advanced Features</li>
                        <li>Standard AI Integration (e.g., basic chatbots, AI-powered search)</li>
                        <li>Enhanced Security Features</li>
                        <li>Performance Optimization</li>
                    </ul>
                  </CardContent>
                  <CardContent className="mt-auto">
                    <p className="text-xl font-bold text-primary mt-3 pt-2 border-t border-dashed">Starting from ₹20,000</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-accent">
                      <Sparkles className="w-6 h-6" /> InfinityPro Package
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex-grow">
                    <p className="text-sm text-foreground/80">
                      Top-tier custom development with premium design, advanced GenAI capabilities, and dedicated support.
                    </p>
                     <ul className="list-disc list-inside text-xs text-foreground/70 pl-1 space-y-1">
                      <li>Premium, Custom Design</li>
                      <li>Advanced AI Integration (Custom Genkit flows, sophisticated chatbots, API integrations)</li>
                      <li>Scalable Architecture</li>
                      <li>Priority & Ongoing Support</li>
                    </ul>
                  </CardContent>
                  <CardContent className="mt-auto">
                    <p className="text-xl font-bold text-primary mt-3 pt-2 border-t border-dashed">₹30,000 - ₹50,000</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                * All prices are indicative. Please <Link href="mailto:princekohli@outlook.com" className="text-accent hover:underline">contact us</Link> for a detailed quote based on your specific requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
