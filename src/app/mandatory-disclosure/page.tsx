
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function MandatoryDisclosurePage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Mandatory Disclosure">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl text-primary">
                Mandatory Public Disclosure
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose max-w-none text-foreground/90">
            <p>
              This section contains important public disclosures as mandated by regulatory authorities. 
              All information provided here is accurate and up-to-date as per school records and compliance requirements.
            </p>
            
            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">Affiliation Status</h3>
            <p>
              Himalaya Public School is affiliated with the Central Board of Secondary Education (CBSE), New Delhi.
              <br />
              Affiliation No.: XXXXXX
              <br />
              School Code: YYYYYY
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">School Managing Committee</h3>
            <p>
              Details of the School Managing Committee members, their designations, and contact information will be listed here.
              (Placeholder: List of committee members)
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">Academic Session</h3>
            <p>
              Current Academic Session: April 1, 2024 - March 31, 2025
            </p>
            
            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">Fee Structure</h3>
            <p>
              A detailed breakdown of the fee structure for various classes (Nursery to Class XII) will be provided here.
              (Placeholder: Table or link to PDF for fee structure)
            </p>
            
            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">Annual Academic Calendar</h3>
            <p>
              The annual academic calendar outlining key dates for examinations, holidays, and school events can be downloaded from our <a href="/resources" className="text-accent hover:underline">Resources page</a>.
            </p>
            
            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">Grievance Redressal Mechanism</h3>
            <p>
              Information about the school's grievance redressal officer and committee, along with the process for submitting grievances, will be detailed here.
              (Placeholder: Contact details and procedure)
            </p>
            
            <p className="mt-8">
              Further detailed documents related to our mandatory disclosures can be found in the downloadable PDF section below or by contacting the school administration.
            </p>
            {/* Example: Link to a consolidated disclosure document */}
            {/* 
            <div className="mt-6">
              <a 
                href="/downloads/mandatory-disclosure-consolidated.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Download className="mr-2 h-4 w-4" /> Download Consolidated Disclosure PDF
              </a>
            </div> 
            */}
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
