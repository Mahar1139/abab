import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Download } from "lucide-react";

interface CbseDocument {
  id: string;
  title: string;
  fileUrl: string;
}

const cbseAffiliationDocuments: CbseDocument[] = Array.from({ length: 12 }, (_, i) => ({
  id: `cbse-doc-${i + 1}`,
  title: `CBSE Affiliation Document ${i + 1}`,
  fileUrl: `/downloads/cbse-affiliation-doc-${i + 1}.pdf`, // Placeholder URL
}));

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

            <h3 className="text-xl font-semibold text-secondary mt-8 mb-4">CBSE Affiliation Documents</h3>
            <p>
              Download important documents related to our CBSE affiliation.
            </p>
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {cbseAffiliationDocuments.map((doc) => (
                <Card key={doc.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      View or download this CBSE affiliation document.
                    </p>
                  </CardContent>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="mt-8">
              Further detailed documents related to our mandatory disclosures can be found in the downloadable PDF section or by contacting the school administration.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
