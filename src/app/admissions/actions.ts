
"use server";

import { z } from "zod";
import { admissionFormSchema } from "@/lib/schemas/admission-schema"; 

// Helper function to generate a random alphanumeric string
function generateRandomAlphanumeric(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a coupon code
function generateCouponCode(): string {
  const randomDigit = Math.floor(Math.random() * 10);
  const randomString = generateRandomAlphanumeric(7);
  return `#Himalaya_${randomDigit}-${randomString}`;
}

export type AdmissionFormState = {
  message: string;
  status: "success" | "error" | "idle";
  errors?: Partial<Record<keyof z.infer<typeof admissionFormSchema>, string[]>>;
  couponCode?: string; // Added for coupon code
};

export async function submitAdmissionForm(
  prevState: AdmissionFormState,
  formData: FormData
): Promise<AdmissionFormState> {
  
  const rawFormData = {
    studentFullName: formData.get("studentFullName"),
    studentDOB: formData.get("studentDOB") ? new Date(formData.get("studentDOB") as string) : undefined, 
    studentGender: formData.get("studentGender"),
    applyingForGrade: formData.get("applyingForGrade"),
    previousSchoolName: formData.get("previousSchoolName") || undefined, 
    previousSchoolCity: formData.get("previousSchoolCity") || undefined,

    parentFullName: formData.get("parentFullName"),
    relationshipToStudent: formData.get("relationshipToStudent"),
    parentEmail: formData.get("parentEmail"),
    parentPhone: formData.get("parentPhone"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") || undefined,
    city: formData.get("city"),
    state: formData.get("state"),
    zipCode: formData.get("zipCode"),

    emergencyContactName: formData.get("emergencyContactName") || undefined,
    emergencyContactPhone: formData.get("emergencyContactPhone") || undefined,
    
    declaration: formData.get("declaration") === "on" || formData.get("declaration") === "true", 
  };
  
  const validatedFields = admissionFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log("Server Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Validation failed. Please check the form for errors.",
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would save this data to a database.
  console.log("Admission Form Submitted (Server):", validatedFields.data);

  // Simulate sending a notification to the principal's mobile
  console.log(
    `SIMULATING NOTIFICATION TO PRINCIPAL'S MOBILE (Target: 9760651947):
    New Admission Application Received!
    Student Name: ${validatedFields.data.studentFullName}
    Applying for Grade: ${validatedFields.data.applyingForGrade}
    Parent Name: ${validatedFields.data.parentFullName}
    Parent Email: ${validatedFields.data.parentEmail}
    Parent Phone: ${validatedFields.data.parentPhone}
    Date of Birth: ${validatedFields.data.studentDOB.toLocaleDateString()}
    --- End of Simulated Notification ---`
  );
  
  // Generate coupon code
  const couponCode = generateCouponCode();
  console.log("Generated Coupon Code:", couponCode);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Your admission application has been successfully submitted!",
    status: "success",
    errors: {},
    couponCode: couponCode, // Include coupon code in the success response
  };
}
