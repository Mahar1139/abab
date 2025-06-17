
"use server";

import { z } from "zod";
import { admissionFormSchema } from "@/components/admissions/AdmissionForm"; // Import the schema

export type AdmissionFormState = {
  message: string;
  status: "success" | "error" | "idle";
  errors?: Partial<Record<keyof z.infer<typeof admissionFormSchema>, string[]>>;
};

export async function submitAdmissionForm(
  prevState: AdmissionFormState,
  formData: FormData
): Promise<AdmissionFormState> {
  
  const rawFormData = {
    studentFullName: formData.get("studentFullName"),
    // For date, it comes as string, need to parse or handle appropriately if sending to backend that expects Date object.
    // For this example, Zod will parse it if it's in a recognizable format.
    // However, react-hook-form will pass a Date object if using Shadcn Calendar directly with setValue.
    // For FormData, it's safer to expect string and parse.
    studentDOB: formData.get("studentDOB") ? new Date(formData.get("studentDOB") as string) : undefined, 
    studentGender: formData.get("studentGender"),
    applyingForGrade: formData.get("applyingForGrade"),
    previousSchoolName: formData.get("previousSchoolName") || undefined, // Handle optional fields
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
    
    declaration: formData.get("declaration") === "on" || formData.get("declaration") === "true", // Checkbox value
  };
  
  const validatedFields = admissionFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Validation failed. Please check the form for errors.",
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would save this data to a database.
  console.log("Admission Form Submitted:", validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Your admission application has been successfully submitted! We will review it and get back to you soon.",
    status: "success",
    errors: {},
  };
}
