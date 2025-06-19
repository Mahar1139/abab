
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function TermsConditionsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm font-medium text-primary-foreground hover:text-white hover:underline p-0 h-auto">Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">Terms and Conditions</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6"> {/* Added padding-right and negative margin-right to manage scrollbar */}
          <div className="prose dark:prose-invert max-w-none text-foreground/90">
            <p>
              Please read these Terms and Conditions ("Terms", "Terms and
              Conditions") carefully before using the
              himalayapublicschool.com website (the "Service") operated by
              Himalaya Public School ("us", "we", or "our").
            </p>
            <p>
              Your access to and use of the Service is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users and others who access or use the Service.
            </p>
            <p>
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms then you may
              not access the Service.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Intellectual Property</h3>
            <p>
              The Service and its original content, features and functionality
              are and will remain the exclusive property of Himalaya Public
              School and its licensors. The Service is protected by copyright,
              trademark, and other laws of both India and foreign countries.
              Our trademarks and trade dress may not be used in connection with
              any product or service without the prior written consent of
              Himalaya Public School.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Himalaya Public School's
              website for personal, non-commercial transitory viewing only. This
              is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on Himalaya Public School's website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by Himalaya Public School
              at any time. Upon terminating your viewing of these materials or
              upon the termination of this license, you must destroy any
              downloaded materials in your possession whether in electronic or
              printed format.
            </p>
            
            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">User Conduct</h3>
            <p>
              You agree not to use the Service in any way that:
            </p>
             <ul>
                <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
                <li>Harms minors in any way.</li>
                <li>Impersonates any person or entity, or falsely states or otherwise misrepresents your affiliation with a person or entity.</li>
                <li>Uploads, posts, emails, transmits, or otherwise makes available any content that you do not have a right to make available under any law or under contractual or fiduciary relationships.</li>
                <li>Uploads, posts, emails, transmits, or otherwise makes available any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation.</li>
                <li>Interferes with or disrupts the Service or servers or networks connected to the Service, or disobeys any requirements, procedures, policies, or regulations of networks connected to the Service.</li>
             </ul>


            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">AI Assistant Usage</h3>
            <p>
              Our website includes an AI Assistant feature designed to provide information and assistance. By using the AI Assistant, you agree to the following:
            </p>
            <ul>
                <li>The AI Assistant provides information based on the data it has been trained on, primarily related to Himalaya Public School. While we strive for accuracy, we do not guarantee the completeness or correctness of all information provided by the AI.</li>
                <li>You will not use the AI Assistant for any unlawful, harmful, abusive, or inappropriate purposes. This includes, but is not limited to, generating hate speech, discriminatory content, or attempting to bypass safety filters.</li>
                <li>Interactions with the AI may be logged for quality assurance and improvement purposes, in accordance with our Privacy Policy.</li>
                <li>Himalaya Public School reserves the right to monitor interactions and suspend access to the AI Assistant or the website for users who violate these terms or engage in abusive behavior.</li>
                <li>The AI Assistant is not a substitute for professional advice (e.g., legal, medical, financial). Information provided should be used for general guidance only.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Disclaimer</h3>
            <p>
              The materials on Himalaya Public School's website are provided on
              an 'as is' basis. Himalaya Public School makes no warranties,
              expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose,
              or non-infringement of intellectual property or other violation
              of rights.
            </p>
            <p>
              Further, Himalaya Public School does not warrant or make any
              representations concerning the accuracy, likely results, or
              reliability of the use of the materials on its website or
              otherwise relating to such materials or on any sites linked to
              this site.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Limitations</h3>
            <p>
              In no event shall Himalaya Public School or its suppliers be liable
              for any damages (including, without limitation, damages for loss
              of data or profit, or due to business interruption) arising out
              of the use or inability to use the materials on Himalaya Public
              School's website, even if Himalaya Public School or a Himalaya
              Public School authorized representative has been notified orally
              or in writing of the possibility of such damage.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Accuracy of materials</h3>
            <p>
              The materials appearing on Himalaya Public School's website could
              include technical, typographical, or photographic errors. Himalaya
              Public School does not warrant that any of the materials on its
              website are accurate, complete or current. Himalaya Public School
              may make changes to the materials contained on its website at any
              time without notice. However Himalaya Public School does not make
              any commitment to update the materials.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Links To Other Web Sites</h3>
            <p>
              Our Service may contain links to third-party web sites or
              services that are not owned or controlled by Himalaya Public
              School.
            </p>
            <p>
              Himalaya Public School has no control over, and assumes no
              responsibility for, the content, privacy policies, or practices
              of any third party web sites or services. You further acknowledge
              and agree that Himalaya Public School shall not be responsible or
              liable, directly or indirectly, for any damage or loss caused or
              alleged to be caused by or in connection with use of or reliance
              on any such content, goods or services available on or through
              any such web sites or services.
            </p>
            <p>
              We strongly advise you to read the terms and conditions and
              privacy policies of any third-party web sites or services that
              you visit.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of India, without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court,
              the remaining provisions of these Terms will remain in effect.
              These Terms constitute the entire agreement between us regarding
              our Service, and supersede and replace any prior agreements we
              might have between us regarding the Service.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Changes</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or
              replace these Terms at any time. If a revision is material we
              will try to provide at least 30 days notice prior to any new
              terms taking effect. What constitutes a material change will be
              determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, please stop using the Service.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Contact Us</h3>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul>
              <li>By email: hps_pithoragarh@rediffmail.com</li>
              <li>By visiting our admissions office.</li>
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
