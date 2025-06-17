
import { z } from "zod";

export const admissionFormSchema = z.object({
  // Student Information
  studentFullName: z.string().min(3, { message: "Student's full name must be at least 3 characters." }),
  studentDOB: z.date({ required_error: "Date of birth is required." }),
  studentGender: z.string({ required_error: "Please select student's gender." }).min(1, "Please select student's gender."),
  applyingForGrade: z.string({ required_error: "Please select a grade." }).min(1, "Please select a grade."),
  previousSchoolName: z.string().optional(),
  previousSchoolCity: z.string().optional(),

  // Parent/Guardian Information
  parentFullName: z.string().min(3, { message: "Parent/Guardian name must be at least 3 characters." }),
  relationshipToStudent: z.string({ required_error: "Please select relationship."}).min(1, "Please select relationship."),
  parentEmail: z.string().email({ message: "Please enter a valid email address." }),
  parentPhone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\d+$/, "Phone number must contain only digits."),
  addressLine1: z.string().min(5, { message: "Address Line 1 must be at least 5 characters." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters." }).regex(/^\d+$/, "Zip code must contain only digits."),

  // Emergency Contact
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional().refine(val => !val || (val.length >= 10 && /^\d+$/.test(val)), {
    message: "Emergency phone must be at least 10 digits and contain only digits, if provided.",
  }),
  
  // Declaration
  declaration: z.boolean().refine(val => val === true, { message: "You must agree to the declaration." }),
});
