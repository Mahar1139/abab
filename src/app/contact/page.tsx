
"use client";

import { useEffect, useActionState } from "react"; // Changed import
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label }
from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm, type ContactFormState } from "./actions";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const initialState: ContactFormState = {
  message: "",
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactForm, initialState); // Changed usage
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      form.reset(); // Reset form fields on successful submission
    } else if (state.status === "error" && state.message && !state.errors) {
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);


  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Get in Touch">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
          We're here to help! Whether you have questions about admissions, curriculum, or school life, feel free to reach out to us.
        </p>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Contact Form</CardTitle>
              <CardDescription>Send us a message directly through this form.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    {...form.register("name")} 
                    aria-invalid={state.errors?.name ? "true" : "false"}
                  />
                  {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john.doe@example.com" 
                    {...form.register("email")}
                    aria-invalid={state.errors?.email ? "true" : "false"}
                  />
                  {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Inquiry about admissions" 
                    {...form.register("subject")}
                    aria-invalid={state.errors?.subject ? "true" : "false"}
                  />
                  {state.errors?.subject && <p className="text-sm text-destructive mt-1">{state.errors.subject[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Your message here..." 
                    rows={5} 
                    {...form.register("message")}
                    aria-invalid={state.errors?.message ? "true" : "false"}
                  />
                  {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Contact Information</CardTitle>
              <CardDescription>You can also reach us through the following channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/90">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p>123 Education Lane, Knowledge City, KC 12345, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>+91 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>info@himalayaschool.edu</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Office Hours</h4>
                <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM (Admissions Office Only)</p>
                <p>Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </div>
  );
}
