
"use server";

import { z } from "zod";
import { admissionFormSchema } from "@/lib/schemas/admission-schema"; // Updated import

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
    // studentDOB is now expected as an ISO string from the hidden input
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
    
    // Checkbox value comes as 'on' or null/undefined. Convert to boolean.
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

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Your admission application has been successfully submitted! We will review it and get back to you soon.",
    status: "success",
    errors: {},
  };
}
