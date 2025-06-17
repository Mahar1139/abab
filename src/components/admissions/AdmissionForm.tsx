
"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react"; 
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

// Firebase imports
import { GoogleAuthProvider, signInWithPopup, type UserCredential } from "firebase/auth";
import { auth } from "@/lib/firebase/config"; // We'll create this file

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;

const initialState: AdmissionFormState = {
  message: "",
  status: "idle",
  errors: {},
  couponCode: undefined,
};

function SubmitButton({ showLoginPrompt }: { showLoginPrompt: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending || showLoginPrompt} 
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

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [stagedFormData, setStagedFormData] = useState<FormData | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

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
    if (state.status === "success" && state.couponCode) {
      setFormSubmittedSuccessfully(true);
      form.reset(); 
      setIsLoggedIn(false); 
      setStagedFormData(null);
    } else if (state.status === "success") {
       toast({
        title: "Application Submitted!",
        description: state.message,
      });
      form.reset();
      setIsLoggedIn(false);
      setStagedFormData(null);
    } else if (state.status === "error" && state.message && !Object.keys(state.errors || {}).length) {
       toast({
        title: "Submission Error",
        description: state.message,
        variant: "destructive",
      });
    }
    if (state.status === "error" && state.errors && Object.keys(state.errors).length > 0) {
      setShowLoginPrompt(false);
    }
  }, [state, toast, form]);

  const prepareAndStageFormData = (currentFormData: FormData) => {
    const dob = form.getValues("studentDOB");
    if (dob) {
      currentFormData.set("studentDOB", dob.toISOString());
    } else {
      currentFormData.delete("studentDOB");
    }
    setStagedFormData(currentFormData);
  };

  const handleFormSubmitAttempt = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const currentFormData = new FormData(event.currentTarget);
    prepareAndStageFormData(currentFormData);

    if (!isLoggedIn) {
      form.trigger().then(isValid => {
        if (isValid) {
          setShowLoginPrompt(true);
        } else {
          console.log("Form is invalid, please correct errors before proceeding.");
          toast({
            title: "Invalid Form",
            description: "Please correct the errors highlighted in the form.",
            variant: "destructive",
          });
        }
      });
    } else {
      formAction(currentFormData);
    }
  };

  const handleGoogleSignInAndSubmit = async () => {
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    try {
      // Ensure Firebase is initialized (auth should be available from firebase/config)
      if (!auth) {
        throw new Error("Firebase auth is not initialized. Please check your Firebase configuration.");
      }
      const result: UserCredential = await signInWithPopup(auth, provider);
      // const user = result.user; // You can use user details if needed
      console.log("Successfully signed in with Google:", result.user.displayName);
      
      setIsLoggedIn(true);
      setShowLoginPrompt(false);
      if (stagedFormData) {
        formAction(stagedFormData);
      } else {
        toast({
          title: "Error",
          description: "No form data found after login. Please try submitting again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      let errorMessage = "Google Sign-In failed. Please try again.";
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in popup was closed. Please try again.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = "Sign-in request was cancelled. Please try again.";
      } else if (error.message && error.message.includes("authDomain")) {
        errorMessage = "Firebase Auth Domain is not configured correctly. Please check your Firebase project setup and ensure the domain is whitelisted if necessary. Also, ensure you've replaced placeholder API keys in src/lib/firebase/config.ts";
      }
      toast({
        title: "Sign-In Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
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
           <Button onClick={() => { setFormSubmittedSuccessfully(false); setShowCouponInstructions(false); form.reset(); setIsLoggedIn(false); }} className="mt-6">
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
            {(state.errors?.studentFullName && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.studentFullName[0]}</p>}
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
                />
              </PopoverContent>
            </Popover>
            {(state.errors?.studentDOB && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.studentDOB[0]}</p>}
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
            {(state.errors?.studentGender && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.studentGender[0]}</p>}
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
            {(state.errors?.applyingForGrade && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.applyingForGrade[0]}</p>}
            {form.formState.errors.applyingForGrade && <p className="text-sm text-destructive mt-1">{form.formState.errors.applyingForGrade.message}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="previousSchoolName">Previous School Name (if applicable)</Label>
            <Input id="previousSchoolName" name="previousSchoolName" placeholder="e.g., Sunshine Academy" {...form.register("previousSchoolName")} />
          </div>
          <div>
            <Label htmlFor="previousSchoolCity">Previous School City (if applicable)</Label>
            <Input id="previousSchoolCity" name="previousSchoolCity" placeholder="e.g., Delhi" {...form.register("previousSchoolCity")} />
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
            {(state.errors?.parentFullName && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.parentFullName[0]}</p>}
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
            {(state.errors?.relationshipToStudent && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.relationshipToStudent[0]}</p>}
             {form.formState.errors.relationshipToStudent && <p className="text-sm text-destructive mt-1">{form.formState.errors.relationshipToStudent.message}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="parentEmail">Email Address</Label>
            <Input id="parentEmail" name="parentEmail" type="email" placeholder="e.g., anita.sharma@example.com" {...form.register("parentEmail")} />
            {(state.errors?.parentEmail && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.parentEmail[0]}</p>}
             {form.formState.errors.parentEmail && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentEmail.message}</p>}
          </div>
          <div>
            <Label htmlFor="parentPhone">Phone Number</Label>
            <Input id="parentPhone" name="parentPhone" type="tel" placeholder="e.g., 9876543210" {...form.register("parentPhone")} />
            {(state.errors?.parentPhone && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.parentPhone[0]}</p>}
             {form.formState.errors.parentPhone && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentPhone.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input id="addressLine1" name="addressLine1" placeholder="House No., Street Name" {...form.register("addressLine1")} />
          {(state.errors?.addressLine1 && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.addressLine1[0]}</p>}
           {form.formState.errors.addressLine1 && <p className="text-sm text-destructive mt-1">{form.formState.errors.addressLine1.message}</p>}
        </div>
        <div>
          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
          <Input id="addressLine2" name="addressLine2" placeholder="Apartment, Suite, etc." {...form.register("addressLine2")} />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="e.g., Mumbai" {...form.register("city")} />
            {(state.errors?.city && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.city[0]}</p>}
            {form.formState.errors.city && <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>}
          </div>
          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input id="state" name="state" placeholder="e.g., Maharashtra" {...form.register("state")} />
            {(state.errors?.state && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.state[0]}</p>}
            {form.formState.errors.state && <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>}
          </div>
          <div>
            <Label htmlFor="zipCode">Zip/Postal Code</Label>
            <Input id="zipCode" name="zipCode" placeholder="e.g., 400001" {...form.register("zipCode")} />
            {(state.errors?.zipCode && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.zipCode[0]}</p>}
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
                {(state.errors?.emergencyContactName && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.emergencyContactName[0]}</p>}
                 {form.formState.errors.emergencyContactName && <p className="text-sm text-destructive mt-1">{form.formState.errors.emergencyContactName.message}</p>}
            </div>
            <div>
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone Number</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" placeholder="e.g., 9876500000" {...form.register("emergencyContactPhone")} />
                {(state.errors?.emergencyContactPhone && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.emergencyContactPhone[0]}</p>}
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
            aria-invalid={(state.errors?.declaration || form.formState.errors.declaration) && !showLoginPrompt ? "true" : "false"}
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
         {(state.errors?.declaration && !showLoginPrompt) && <p className="text-sm text-destructive mt-1">{state.errors.declaration[0]}</p>}
         {form.formState.errors.declaration && <p className="text-sm text-destructive mt-1">{form.formState.errors.declaration.message}</p>}
      </section>

      <div className="flex flex-col items-center justify-center space-y-4">
        {showLoginPrompt ? (
          <Card className="w-full max-w-md p-6 shadow-lg bg-background border-primary">
            <CardHeader>
              <CardTitle className="text-center text-primary text-xl">Sign in to Continue</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Please sign in with Google to submit your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-3">
              <Button 
                onClick={handleGoogleSignInAndSubmit} 
                className="w-full text-lg py-3 bg-red-600 hover:bg-red-700 text-white"
                disabled={isSigningIn}
              >
                {isSigningIn ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.69,5.36 16.95,6.45L19.05,4.36C17.04,2.6 14.82,1.5 12.19,1.5C6.92,1.5 3,6.08 3,12C3,17.92 6.92,22.5 12.19,22.5C17.6,22.5 21.28,18.34 21.28,12.43C21.28,11.9 21.35,11.1 21.35,11.1Z"/></svg>
                )}
                {isSigningIn ? "Signing in..." : "Sign in with Google"}
              </Button>
              <Button variant="outline" onClick={() => { setShowLoginPrompt(false); setStagedFormData(null); }} className="w-full" disabled={isSigningIn}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        ) : (
          <SubmitButton showLoginPrompt={showLoginPrompt} />
        )}
        
        {state.status === "error" && state.message && Object.keys(state.errors || {}).length > 0 && !showLoginPrompt && (
          <p className="text-sm text-destructive mt-4 text-center">
            Please correct the errors in the form and try again.
          </p>
        )}
      </div>
    </form>
  );
}
