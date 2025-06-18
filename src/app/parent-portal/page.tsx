
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LockKeyhole, UserCircle, BarChart3, CalendarCheck2, Megaphone, CreditCard, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ParentPortalPage() {
  const features = [
    { title: "Student Grades", description: "View report cards and academic performance.", icon: BarChart3 },
    { title: "Attendance Records", description: "Track your child's attendance and punctuality.", icon: CalendarCheck2 },
    { title: "School Announcements", description: "Stay updated with important school news.", icon: Megaphone },
    { title: "Fee Payments", description: "Access fee details and payment history.", icon: CreditCard },
    { title: "Teacher Communication", description: "Directly communicate with your child's teachers.", icon: MessageSquare },
  ];

  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Parent Portal">
        <Card className="shadow-xl max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <UserCircle className="w-12 h-12" />
            </div>
            <CardTitle className="text-3xl text-primary">Welcome, Parents!</CardTitle>
            <CardDescription className="text-lg text-foreground/80">
              This is your dedicated space to access information about your child's journey at Himalaya Public School.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center p-6 bg-secondary/20 rounded-lg border border-primary/30">
              <LockKeyhole className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-secondary mb-2">Secure Login Required</h3>
              <p className="text-foreground/90 mb-4">
                To protect student privacy, access to detailed information requires a secure login.
              </p>
              <Button disabled className="w-full sm:w-auto opacity-50 cursor-not-allowed">
                Login to Parent Portal
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                (Login functionality is currently under development. Thank you for your patience.)
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Portal Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <Card key={feature.title} className="bg-card/50 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <feature.icon className="w-7 h-7 text-accent" />
                        <CardTitle className="text-lg text-secondary">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/80">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-foreground/80">
                If you have any questions or need assistance, please {" "}
                <Link href="/contact" className="text-accent hover:underline font-medium">
                  contact our support team
                </Link>.
              </p>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
