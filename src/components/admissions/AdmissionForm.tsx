
"use client";

import { useEffect, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full md:w-auto text-lg py-3"
    >
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
      {pending ? "Submitting Application..." : "Submit Application"}
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
  const { toast } = useToast();
  const [showCouponInstructions, setShowCouponInstructions] = useState(false);
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

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
      if (state.errors && Object.keys(state.errors).length > 0) {
        let firstErrorField: keyof AdmissionFormData | null = null;
        for (const key in state.errors) {
          const fieldName = key as keyof AdmissionFormData;
          const message = state.errors[fieldName]?.[0];
          if (message && form.getFieldState(fieldName) !== undefined) {
            if (!firstErrorField) firstErrorField = fieldName;
            form.setError(fieldName, { type: 'server', message });
          }
        }
        if (firstErrorField) {
           const element = document.getElementById(firstErrorField);
            if (element) element.focus();
        }
        toast({
          title: "Validation Error",
          description: state.message && Object.keys(state.errors).length > 0 ? "Please check the highlighted fields." : (state.message || "Please correct the errors highlighted in the form."),
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
          title: "Error",
          description: "An unexpected error occurred during submission.",
          variant: "destructive",
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, toast]);

  const handleFormSubmitAttempt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await form.trigger();
    if (!isValid) {
      console.log("Client-side validation failed. Errors:", form.formState.errors);
      toast({
        title: "Invalid Form",
        description: "Please correct the errors highlighted in the form.",
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

    const currentFormData = new FormData(event.currentTarget);
    const dob = form.getValues("studentDOB");
    if (dob) {
      // Ensure DOB is sent as a string that the server action can parse
      currentFormData.set("studentDOB", dob.toISOString());
    } else {
      currentFormData.delete("studentDOB"); // Remove if not set, to avoid sending empty string
    }
    formAction(currentFormData);
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
          <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">Congratulations!</CardTitle>
          <CardDescription className="text-lg text-green-600 dark:text-green-300">
            You've got a 20% discount on three months' fees!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-foreground/90">
            Your application for Himalaya Public School has been successfully submitted.
          </p>
          <div className="bg-background/50 dark:bg-card p-4 rounded-lg border border-dashed border-primary">
            <p className="text-sm text-muted-foreground">Your Unique Coupon Code:</p>
            <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-mono font-bold text-primary tracking-wider">
                {state.couponCode}
                </p>
                <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(state.couponCode!)} title="Copy coupon code">
                    <Copy className="w-5 h-5 text-primary" />
                </Button>
            </div>
          </div>

          <Button onClick={() => setShowCouponInstructions(true)} variant="outline" className="text-accent border-accent hover:bg-accent/10">
            <Info className="mr-2 h-5 w-5" /> How to use this coupon?
          </Button>

          {showCouponInstructions && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg text-sm text-blue-700 dark:text-blue-300 space-y-2 text-left animate-in fade-in-20 slide-in-from-bottom-5">
              <h4 className="font-semibold">Coupon Instructions:</h4>
              <p>1. Visit Himalaya Public School (HPS) for admission processing.</p>
              <p>2. Present this coupon code: <strong className="font-mono">{state.couponCode}</strong> to the admissions office.</p>
              <p>3. You will receive a 20% discount on the first three months of school fees.</p>
              <p><strong>Validity:</strong> This coupon is valid for 3 months from today's date. Please use it before it expires.</p>
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
    <form onSubmit={handleFormSubmitAttempt} className="space-y-8" noValidate>
      {/* Student Information Section */}
      <section className="space-y-6 p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-secondary border-b pb-2">Student Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="studentFullName">Student Full Name</Label>
            <Input id="studentFullName" name="studentFullName" placeholder="e.g., Rohan Kumar" {...form.register("studentFullName")} />
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
                  {form.watch("studentDOB") ? format(form.watch("studentDOB")!, "PPP") : <span>Pick a date</span>}
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
            <Label htmlFor="previousSchoolName">Previous School Name (if applicable)</Label>
            <Input id="previousSchoolName" name="previousSchoolName" placeholder="e.g., Sunshine Academy" {...form.register("previousSchoolName")} />
            {form.formState.errors.previousSchoolName && <p className="text-sm text-destructive mt-1">{form.formState.errors.previousSchoolName.message}</p>}
          </div>
          <div>
            <Label htmlFor="previousSchoolCity">Previous School City (if applicable)</Label>
            <Input id="previousSchoolCity" name="previousSchoolCity" placeholder="e.g., Delhi" {...form.register("previousSchoolCity")} />
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
            <Input id="parentFullName" name="parentFullName" placeholder="e.g., Anita Sharma" {...form.register("parentFullName")} />
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
            <Label htmlFor="parentEmail">Email Address</Label>
            <Input id="parentEmail" name="parentEmail" type="email" placeholder="e.g., anita.sharma@example.com" {...form.register("parentEmail")} />
            {form.formState.errors.parentEmail && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentEmail.message}</p>}
          </div>
          <div>
            <Label htmlFor="parentPhone">Phone Number</Label>
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
          <Input id="addressLine2" name="addressLine2" placeholder="Apartment, Suite, etc." {...form.register("addressLine2")} />
          {form.formState.errors.addressLine2 && <p className="text-sm text-destructive mt-1">{form.formState.errors.addressLine2.message}</p>}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="e.g., Mumbai" {...form.register("city")} />
            {form.formState.errors.city && <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>}
          </div>
          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input id="state" name="state" placeholder="e.g., Maharashtra" {...form.register("state")} />
            {form.formState.errors.state && <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>}
          </div>
          <div>
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input id="zipCode" name="zipCode" placeholder="e.g., 400001" {...form.register("zipCode")} />
            {form.formState.errors.zipCode && <p className="text-sm text-destructive mt-1">{form.formState.errors.zipCode.message}</p>}
          </div>
        </div>
      </section>

       {/* Emergency Contact Section */}
      <section className="space-y-6 p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-secondary border-b pb-2">Emergency Contact Information (Optional)</h3>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="emergencyContactName">Emergency Contact Full Name</Label>
                <Input id="emergencyContactName" name="emergencyContactName" placeholder="e.g., Suresh Mehta" {...form.register("emergencyContactName")} />
                {form.formState.errors.emergencyContactName && <p className="text-sm text-destructive mt-1">{form.formState.errors.emergencyContactName.message}</p>}
            </div>
            <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone Number</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" placeholder="e.g., 9876500000" {...form.register("emergencyContactPhone")} />
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
              I hereby declare that the information provided in this application form is true, complete, and accurate to the best of my knowledge and belief.
            </Label>
            <p className="text-xs text-muted-foreground">
              I understand that any misrepresentation or omission of facts may lead to the cancellation of admission.
            </p>
          </div>
        </div>
         {form.formState.errors.declaration && <p className="text-sm text-destructive mt-1">{form.formState.errors.declaration.message}</p>}
      </section>

      <div className="flex flex-col items-center justify-center space-y-4">
        <SubmitButton />


        {state.status === "error" && state.message && (!state.errors || Object.keys(state.errors).length === 0) && (
          <p className="text-sm text-destructive mt-4 text-center">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

    