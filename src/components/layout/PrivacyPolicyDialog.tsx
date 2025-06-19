
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

export default function PrivacyPolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm font-medium text-primary-foreground hover:text-white hover:underline p-0 h-auto">Privacy Policy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6"> {/* Added padding-right and negative margin-right to manage scrollbar */}
          <div className="prose dark:prose-invert max-w-none text-foreground/90">
            <p>
              Himalaya Public School ("us", "we", or "our") operates the
              himalayapublicschool.com website (the "Service"). This page
              informs you of our policies regarding the collection, use, and
              disclosure of personal data when you use our Service and the
              choices you have associated with that data.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Information Collection and Use</h3>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
            <h4>Types of Data Collected</h4>
            <h5>Personal Data</h5>
            <p>
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you ("Personal Data"). Personally identifiable information
              may include, but is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
              <li>Cookies and Usage Data</li>
              <li>Information related to student admissions (e.g., student name, DOB, previous school)</li>
              <li>Information related to inquiries (e.g., questions asked to our AI assistant)</li>
            </ul>

            <h5>Usage Data</h5>
            <p>
              We may also collect information on how the Service is accessed and
              used ("Usage Data"). This Usage Data may include information such
              as your computer's Internet Protocol address (e.g. IP address),
              browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers and other diagnostic data.
            </p>

            <h5>Tracking & Cookies Data</h5>
            <p>
              We use cookies and similar tracking technologies to track the
              activity on our Service and hold certain information. Cookies are
              files with small amount of data which may include an anonymous
              unique identifier. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent. However, if
              you do not accept cookies, you may not be able to use some
              portions of our Service.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Use of Data</h3>
            <p>Himalaya Public School uses the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer care and support (including AI-assisted support)</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To process admission applications</li>
              <li>To respond to inquiries</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Transfer Of Data</h3>
            <p>
              Your information, including Personal Data, may be transferred to —
              and maintained on — computers located outside of your state,
              province, country or other governmental jurisdiction where the data
              protection laws may differ than those from your jurisdiction.
            </p>
            <p>
              If you are located outside India and choose to provide information
              to us, please note that we transfer the data, including Personal
              Data, to India and process it there. Your consent to this Privacy
              Policy followed by your submission of such information represents
              your agreement to that transfer.
            </p>
            <p>
              Himalaya Public School will take all steps reasonably necessary to
              ensure that your data is treated securely and in accordance with
              this Privacy Policy and no transfer of your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of your data and other
              personal information.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Disclosure Of Data</h3>
            <h4>Legal Requirements</h4>
            <p>
              Himalaya Public School may disclose your Personal Data in the good
              faith belief that such action is necessary to:
            </p>
            <ul>
              <li>To comply with a legal obligation</li>
              <li>To protect and defend the rights or property of Himalaya Public School</li>
              <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>To protect the personal safety of users of the Service or the public</li>
              <li>To protect against legal liability</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Security Of Data</h3>
            <p>
              The security of your data is important to us, but remember that no
              method of transmission over the Internet, or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Service Providers</h3>
            <p>
              We may employ third party companies and individuals to facilitate
              our Service ("Service Providers"), to provide the Service on our
              behalf, to perform Service-related services or to assist us in
              analyzing how our Service is used. These third parties have access
              to your Personal Data only to perform these tasks on our behalf and
              are obligated not to disclose or use it for any other purpose.
              (e.g., Generative AI services for AI assistant features).
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Links To Other Sites</h3>
            <p>
              Our Service may contain links to other sites that are not operated
              by us. If you click on a third party link, you will be directed
              to that third party's site. We strongly advise you to review the
              Privacy Policy of every site you visit. We have no control over
              and assume no responsibility for the content, privacy policies or
              practices of any third party sites or services.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Children's Privacy</h3>
            <p>
              Our Service does not address anyone under the age of 13 ("Children") directly without parental consent. We primarily interact with parents or guardians regarding student information.
              If you are a parent or guardian and you are aware that your Children has provided us with Personal Data without your consent, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Changes To This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              We will let you know via email and/or a prominent notice on our
              Service, prior to the change becoming effective and update the
              "effective date" at the top of this Privacy Policy. You are
              advised to review this Privacy Policy periodically for any changes.
              Changes to this Privacy Policy are effective when they are posted
              on this page.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
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
