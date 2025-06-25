
import { suggestAdmissionQuestions } from "@/ai/flows/suggest-admission-questions";
import { fullAdmissionsText } from "./admission-content";
import AdmissionsPageClient from "@/components/admissions/AdmissionsPageClient";

export default function AdmissionsPage() {
  return (
    <AdmissionsPageClient 
      fullAdmissionsText={fullAdmissionsText} 
      suggestionFn={suggestAdmissionQuestions} 
    />
  );
}
