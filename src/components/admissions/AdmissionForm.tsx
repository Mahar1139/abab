
"use client";

import { useEffect, useState, useActionState, useRef, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { submitAdmissionForm, type AdmissionFormState } from "@/app/admissions/actions";
import { CalendarIcon, Loader2, Award, Info, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { admissionFormSchema } from "@/lib/schemas/admission-schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;

const initialState: AdmissionFormState = {
  message: "",
  status: "idle",
  errors: {},
  couponCode: undefined,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="w-full md:w-auto text-lg py-3"
    >
      {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      {isPending ? "Submitting..." : "Submit Application"}
    </Button>
  );
}

const grades = [
  "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11 Science", "Class 11 Commerce", "Class 11 Arts",
  "Class 12 Science", "Class 12 Commerce", "Class 12 Arts"
];

export default function AdmissionFormComponent() {
  const [state, formAction] = useActionState(submitAdmissionForm, initialState);
  const [isTransitionPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [showCouponInstructions, setShowCouponInstructions] = useState(false);
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: {
      studentFullName: "",
      studentDOB: undefined,
      studentGender: "",
      applyingForGrade: "",
      previousSchoolName: "",
      previousSchoolCity: "",
      parentFullName: "",
      relationshipToStudent: "",
      parentEmail: "",
      parentPhone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      declaration: false,
    },
  });

  useEffect(() => {
    if (state.status === "success") {
      if (state.couponCode) {
        setFormSubmittedSuccessfully(true);
      }
      toast({
        title: "Application Submitted!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === "error") {
      let specificFieldErrorsSet = false;
      if (state.errors && Object.keys(state.errors).length > 0) {
        let firstErrorField: keyof AdmissionFormData | null = null;
        for (const schemaKey in admissionFormSchema.shape) {
            const fieldName = schemaKey as keyof AdmissionFormData;
            if (state.errors[fieldName]) {
                const message = state.errors[fieldName]?.[0];
                if (message) {
                    if (!firstErrorField) firstErrorField = fieldName;
                    form.setError(fieldName, { type: 'server', message });
                    specificFieldErrorsSet = true;
                }
            }
        }
        if (firstErrorField) {
           const element = document.getElementById(firstErrorField);
            if (element) element.focus();
        }
      }
      
      if (specificFieldErrorsSet) {
          toast({
            title: "Validation Error",
            description: state.message || "Please check the form for errors and try again.",
            variant: "destructive",
          });
      } else if (state.message) { 
         toast({
            title: "Submission Error",
            description: state.message,
            variant: "destructive",
          });
      } else { 
          toast({
            title: "Unexpected Error",
            description: "An unknown error occurred. Please refresh and try again.",
            variant: "destructive",
          });
      }
    }
  }, [state, toast, form]);

  const handleFormSubmitAttempt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await form.trigger();
    if (!isValid) {
      console.log("Client-side validation failed. Errors:", form.formState.errors);
      toast({
        title: "Invalid Form Data",
        description: "Please correct the highlighted fields before submitting.",
        variant: "destructive",
      });
      const fieldErrors = form.formState.errors;
      const firstErrorField = Object.keys(fieldErrors)[0] as keyof AdmissionFormData | undefined;
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) element.focus();
      }
      return;
    }

    if (formRef.current) {
        const currentFormData = new FormData(formRef.current);
        const dob = form.getValues("studentDOB");
        if (dob) {
          currentFormData.set("studentDOB", dob.toISOString());
        } else {
          currentFormData.delete("studentDOB"); 
        }
        startTransition(() => {
          formAction(currentFormData);
        });
    } else {
        console.error("Form reference is not available for FormData construction.");
        toast({
            title: "Unexpected Error",
            description: "Could not process the form. Please try again.",
            variant: "destructive",
        });
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Coupon Copied!", description: "Coupon code copied to clipboard." });
    }).catch(err => {
      console.error("Failed to copy coupon: ", err);
      toast({ title: "Copy Failed", description: "Could not copy coupon to clipboard.", variant: "destructive" });
    });
  };

  if (formSubmittedSuccessfully && state.couponCode) {
    return (
      <Card className="shadow-lg border-green-500 bg-green-50 dark:bg-green-900/20 animate-in fade-in-50 zoom-in-95">
        <CardHeader className="text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">Success & Thank You!</CardTitle>
          <CardDescription className="text-lg text-green-600 dark:text-green-300">
            Your application has been received!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-foreground/90">
            As a token of our appreciation, here is a unique one-time coupon code for a 20% discount on the first three months of school fees.
          </p>
          <div className="bg-background/50 dark:bg-card p-4 rounded-lg border border-dashed border-primary">
            <p className="text-sm text-muted-foreground">Your Coupon Code</p>
            <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-mono font-bold text-primary tracking-wider">
                {state.couponCode}
                </p>
                <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(state.couponCode!)} title="Copy Code">
                    <Copy className="w-5 h-5 text-primary" />
                </Button>
            </div>
          </div>

          <Button onClick={() => setShowCouponInstructions(true)} variant="outline" className="text-accent border-accent hover:bg-accent/10">
            <Info className="mr-2 h-5 w-5" /> How to use this coupon?
          </Button>

          {showCouponInstructions && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg text-sm text-blue-700 dark:text-blue-300 space-y-2 text-left animate-in fade-in-20 slide-in-from-bottom-5">
              <h4 className="font-semibold">Redemption Instructions:</h4>
              <p>1. Save or copy your unique coupon code.</p>
              <p>2. Present the code "{state.couponCode}" to the admissions office during the final admission processing.</p>
              <p>3. The discount will be applied to your first fee challan.</p>
              <p><strong>This coupon is valid for 3 months from the date of issue.</strong></p>
            </div>
          )}
           <Button onClick={() => { setFormSubmittedSuccessfully(false); setShowCouponInstructions(false); form.reset(); }} className="mt-6">
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleFormSubmitAttempt} className="space-y-8" noValidate>
      {/* Student Information Section */}
      <section className="space-y-6 p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-secondary border-b pb-2">Student Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="studentFullName">Student's Full Name</Label>
            <Input id="studentFullName" name="studentFullName" placeholder="e.g., Ananya Sharma" {...form.register("studentFullName")} />
            {form.formState.errors.studentFullName && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentFullName.message}</p>}
          </div>
          <div>
            <Label htmlFor="studentDOBFormInput">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="studentDOBFormInput"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.watch("studentDOB") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("studentDOB") ? format(form.watch("studentDOB")!, "PPP") : <span>Select date of birth</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("studentDOB")}
                  onSelect={(date) => form.setValue("studentDOB", date as Date, { shouldValidate: true })}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 20}
                  toYear={new Date().getFullYear() -2}
                  disabled={(date) => date > new Date(new Date().setFullYear(new Date().getFullYear() - 2)) || date < new Date(new Date().setFullYear(new Date().getFullYear() - 20))}
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.studentDOB && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentDOB.message}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="studentGender">Gender</Label>
            <Select name="studentGender" onValueChange={(value) => form.setValue("studentGender", value, { shouldValidate: true })} value={form.watch("studentGender")}>
              <SelectTrigger id="studentGender"><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.studentGender && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentGender.message}</p>}
          </div>
          <div>
            <Label htmlFor="applyingForGrade">Applying for Grade</Label>
            <Select name="applyingForGrade" onValueChange={(value) => form.setValue("applyingForGrade", value, { shouldValidate: true })} value={form.watch("applyingForGrade")}>
              <SelectTrigger id="applyingForGrade"><SelectValue placeholder="Select grade" /></SelectTrigger>
              <SelectContent>
                {grades.map(grade => <SelectItem key={grade} value={grade}>{grade}</SelectItem>)}
              </SelectContent>
            </Select>
            {form.formState.errors.applyingForGrade && <p className="text-sm text-destructive mt-1">{form.formState.errors.applyingForGrade.message}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="previousSchoolName">Previous School Name (if any)</Label>
            <Input id="previousSchoolName" name="previousSchoolName" placeholder="e.g., Sunshine Academy" {...form.register("previousSchoolName")} />
            {form.formState.errors.previousSchoolName && <p className="text-sm text-destructive mt-1">{form.formState.errors.previousSchoolName.message}</p>}
          </div>
          <div>
            <Label htmlFor="previousSchoolCity">Previous School City (if any)</Label>
            <Input id="previousSchoolCity" name="previousSchoolCity" placeholder="e.g., New Delhi" {...form.register("previousSchoolCity")} />
            {form.formState.errors.previousSchoolCity && <p className="text-sm text-destructive mt-1">{form.formState.errors.previousSchoolCity.message}</p>}
          </div>
        </div>
      </section>

      {/* Parent/Guardian Information Section */}
      <section className="space-y-6 p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-secondary border-b pb-2">Parent/Guardian Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="parentFullName">Parent/Guardian Full Name</Label>
            <Input id="parentFullName" name="parentFullName" placeholder="e.g., Rajesh Sharma" {...form.register("parentFullName")} />
            {form.formState.errors.parentFullName && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentFullName.message}</p>}
          </div>
          <div>
            <Label htmlFor="relationshipToStudent">Relationship to Student</Label>
            <Select name="relationshipToStudent" onValueChange={(value) => form.setValue("relationshipToStudent", value, { shouldValidate: true })} value={form.watch("relationshipToStudent")}>
              <SelectTrigger id="relationshipToStudent"><SelectValue placeholder="Select relationship" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Father">Father</SelectItem>
                <SelectItem value="Mother">Mother</SelectItem>
                <SelectItem value="Guardian">Guardian</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.relationshipToStudent && <p className="text-sm text-destructive mt-1">{form.formState.errors.relationshipToStudent.message}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
            <Input id="parentEmail" name="parentEmail" type="email" placeholder="e.g., user@example.com" {...form.register("parentEmail")} />
            {form.formState.errors.parentEmail && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentEmail.message}</p>}
          </div>
          <div>
            <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
            <Input id="parentPhone" name="parentPhone" type="tel" placeholder="e.g., 9876543210" {...form.register("parentPhone")} />
            {form.formState.errors.parentPhone && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentPhone.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input id="addressLine1" name="addressLine1" placeholder="House No., Street Name" {...form.register("addressLine1")} />
          {form.formState.errors.addressLine1 && <p className="text-sm text-destructive mt-1">{form.formState.errors.addressLine1.message}</p>}
        </div>
        <div>
          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
          <Input id="addressLine2" name="addressLine2" placeholder="Apartment, suite, etc." {...form.register("addressLine2")} />
          {form.formState.errors.addressLine2 && <p className="text-sm text-destructive mt-1">{form.formState.errors.addressLine2.message}</p>}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="e.g., Pithoragarh" {...form.register("city")} />
            {form.formState.errors.city && <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" placeholder="e.g., Uttarakhand" {...form.register("state")} />
            {form.formState.errors.state && <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>}
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input id="zipCode" name="zipCode" placeholder="e.g., 262501" {...form.register("zipCode")} />
            {form.formState.errors.zipCode && <p className="text-sm text-destructive mt-1">{form.formState.errors.zipCode.message}</p>}
          </div>
        </div>
      </section>

       {/* Emergency Contact Section */}
      <section className="space-y-6 p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-secondary border-b pb-2">Emergency Contact Information</h3>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="emergencyContactName">Emergency Contact Name (Optional)</Label>
                <Input id="emergencyContactName" name="emergencyContactName" placeholder="e.g., Sunita Verma" {...form.register("emergencyContactName")} />
                {form.formState.errors.emergencyContactName && <p className="text-sm text-destructive mt-1">{form.formState.errors.emergencyContactName.message}</p>}
            </div>
            <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone (Optional)</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" placeholder="e.g., 9876543211" {...form.register("emergencyContactPhone")} />
                {form.formState.errors.emergencyContactPhone && <p className="text-sm text-destructive mt-1">{form.formState.errors.emergencyContactPhone.message}</p>}
            </div>
        </div>
      </section>

      {/* Declaration Section */}
      <section className="space-y-4 p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-secondary border-b pb-2">Declaration</h3>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="declaration"
            name="declaration"
            checked={form.watch("declaration")}
            onCheckedChange={(checked) => form.setValue("declaration", checked as boolean, {shouldValidate: true})}
            aria-invalid={form.formState.errors.declaration ? "true" : "false"}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="declaration" className="font-medium cursor-pointer">
              I hereby declare that the information provided is true and correct to the best of my knowledge.
            </Label>
            <p className="text-xs text-muted-foreground">
              You agree to our terms and conditions.
            </p>
          </div>
        </div>
         {form.formState.errors.declaration && <p className="text-sm text-destructive mt-1">{form.formState.errors.declaration.message}</p>}
      </section>

      <div className="flex flex-col items-center justify-center space-y-4">
        <SubmitButton isPending={isTransitionPending} />
      </div>
    </form>
  );
}
