
"use client";

import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ArrowUpToLine, ArrowDownToLine } from "lucide-react";

export default function PrivacyPolicyDialog() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "up" | "down" | "top" | "bottom") => {
    if (scrollRef.current) {
      switch (direction) {
        case "up":
          scrollRef.current.scrollTop -= 200;
          break;
        case "down":
          scrollRef.current.scrollTop += 200;
          break;
        case "top":
          scrollRef.current.scrollTop = 0;
          break;
        case "bottom":
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          break;
      }
    }
  };

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
        <ScrollArea className="flex-grow pr-6 -mr-6">
          <div ref={scrollRef} className="prose dark:prose-invert max-w-none text-foreground/90 h-[55vh] overflow-y-auto pr-2">
            <p>
              Himalaya Public School ("us", "we", or "our") operates the
              website (the "Service"). This page informs you of our policies regarding the collection, use, and
              disclosure of personal data when you use our Service and the
              choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">1. Information Collection and Use</h3>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
            
            <h4>1.1. Types of Data Collected</h4>
            <h5>a. Personal Data</h5>
            <p>
              While using our Service, particularly for admissions, inquiries, or interactive features like our AI Assistant, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you ("Personal Data"). Personally identifiable information
              may include, but is not limited to:
            </p>
            <ul>
              <li>Full name (student, parent/guardian)</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Date of birth (student)</li>
              <li>Gender (student)</li>
              <li>Grade level applying for</li>
              <li>Previous school information</li>
              <li>Residential Address (Street, City, State, ZIP/Postal code)</li>
              <li>Relationship to student</li>
              <li>Emergency contact information</li>
              <li>Any other information voluntarily provided by you through forms or communication with us.</li>
              <li>Queries and interactions with our AI Assistant.</li>
            </ul>

            <h5>b. Usage Data</h5>
            <p>
              We may also collect information on how the Service is accessed and
              used ("Usage Data"). This Usage Data may include information such
              as your computer's Internet Protocol address (e.g. IP address),
              browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers, interactions with AI features, and other diagnostic data.
            </p>

            <h5>c. Tracking & Cookies Data</h5>
            <p>
              We use cookies and similar tracking technologies (e.g., web beacons, pixels) to track the
              activity on our Service and hold certain information. Cookies are
              files with a small amount of data which may include an anonymous
              unique identifier. Cookies are sent to your browser from a website
              and stored on your device.
            </p>
            <p>
              You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent. However, if
              you do not accept cookies, you may not be able to use some
              portions of our Service.
            </p>
            <p>Examples of Cookies we may use:</p>
            <ul>
                <li><strong>Session Cookies:</strong> We use Session Cookies to operate our Service.</li>
                <li><strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings.</li>
                <li><strong>Security Cookies:</strong> We use Security Cookies for security purposes.</li>
                <li><strong>Analytics Cookies:</strong> These cookies help us understand how our Service is being used.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">2. Use of Data</h3>
            <p>Himalaya Public School uses the collected data for various purposes:</p>
            <ul>
              <li>To provide, operate, and maintain our Service</li>
              <li>To process and manage student admission applications</li>
              <li>To respond to your inquiries and provide support</li>
              <li>To personalize your experience on our Service</li>
              <li>To notify you about changes to our Service or policies</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so (e.g., AI Assistant, quizzes)</li>
              <li>To provide analysis or valuable information so that we can improve the Service and develop new features</li>
              <li>To monitor the usage of the Service, including user traffic patterns and feature engagement</li>
              <li>To detect, prevent, and address technical issues, fraud, or security concerns</li>
              <li>To ensure compliance with our Terms and Conditions and other legal obligations</li>
              <li>For internal record keeping and administrative purposes</li>
              <li>To communicate important school-related information, newsletters, or event updates (where consent is obtained, if required by law)</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">3. Legal Basis for Processing Personal Data (EEA/UK Users)</h3>
            <p>
              If you are from the European Economic Area (EEA) or the United Kingdom (UK), Himalaya Public School's legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.
            </p>
            <p>Himalaya Public School may process your Personal Data because:</p>
            <ul>
              <li>We need to perform a contract with you (e.g., to process an admission application).</li>
              <li>You have given us permission to do so.</li>
              <li>The processing is in our legitimate interests and it's not overridden by your rights.</li>
              <li>For payment processing purposes (if applicable).</li>
              <li>To comply with the law.</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">4. Data Retention</h3>
            <p>
              We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p>
              Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">5. Transfer Of Data</h3>
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

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">6. Disclosure Of Data</h3>
            <h4>a. Legal Requirements</h4>
            <p>
              Himalaya Public School may disclose your Personal Data in the good
              faith belief that such action is necessary to:
            </p>
            <ul>
              <li>To comply with a legal obligation or government request.</li>
              <li>To protect and defend the rights or property of Himalaya Public School.</li>
              <li>To prevent or investigate possible wrongdoing in connection with the Service.</li>
              <li>To protect the personal safety of users of the Service or the public.</li>
              <li>To protect against legal liability.</li>
              <li>In connection with any merger, sale of school assets, financing, or acquisition of all or a portion of our operations by another entity.</li>
            </ul>
            <h4>b. Service Providers</h4>
            <p>
              We may employ third party companies and individuals to facilitate
              our Service ("Service Providers"), to provide the Service on our
              behalf, to perform Service-related services (e.g., website hosting, data analysis, AI model providers) or to assist us in
              analyzing how our Service is used. These third parties have access
              to your Personal Data only to perform these tasks on our behalf and
              are obligated not to disclose or use it for any other purpose. For example, interactions with our AI Assistant are processed by third-party AI service providers.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">7. Security Of Data</h3>
            <p>
              The security of your data is important to us. We strive to use commercially
              acceptable means to protect your Personal Data, including administrative, technical, and physical safeguards. However, remember that no
              method of transmission over the Internet, or method of electronic
              storage is 100% secure. While we implement measures to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">8. Your Data Protection Rights</h3>
            <p>Depending on your location, you may have certain data protection rights. These may include:</p>
             <ul>
                <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any ofthese rights, please contact us.</p>


            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">9. Links To Other Sites</h3>
            <p>
              Our Service may contain links to other sites that are not operated
              by us. If you click on a third party link, you will be directed
              to that third party's site. We strongly advise you to review the
              Privacy Policy of every site you visit. We have no control over
              and assume no responsibility for the content, privacy policies or
              practices of any third party sites or services.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">10. Children's Privacy</h3>
            <p>
              Our Service is generally not intended for direct use by individuals under the age of 13 ("Children") without verifiable parental consent for the collection of their personal information. We primarily interact with parents or guardians for services related to children, such as admissions.
            </p>
            <p>
              If you are a parent or guardian and you are aware that your child has provided us with Personal Data without your consent, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers or obtain consent. In some cases, our educational programs or interactive features might be used by children under supervision, and any data collected will be handled according to this policy and applicable laws like COPPA (Children's Online Privacy Protection Act) if relevant.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">11. Changes To This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              We will let you know via email (if you have provided one and consented to such communications) and/or a prominent notice on our
              Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy. You are
              advised to review this Privacy Policy periodically for any changes.
              Changes to this Privacy Policy are effective when they are posted
              on this page.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-4 mb-2">12. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, or wish to exercise your data protection rights, please contact us:
            </p>
            <ul>
              <li>By email: hps_pithoragarh@rediffmail.com</li>
              <li>By phone: +91-6398998621 or +91-7351840980</li>
              <li>By mail or in person: Near Sports Stadium, Pithoragarh, [State, Postal Code if available], India.</li>
            </ul>
            <p>
              We are committed to resolving any concerns you may have regarding your privacy.
            </p>
          </div>
        </ScrollArea>
        <DialogFooter className="pt-4 border-t mt-2">
          <div className="flex justify-end space-x-2 w-full">
            <Button variant="outline" size="icon" onClick={() => handleScroll("top")} title="Scroll to Top">
              <ArrowUpToLine className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleScroll("up")} title="Scroll Up">
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleScroll("down")} title="Scroll Down">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleScroll("bottom")} title="Scroll to Bottom">
              <ArrowDownToLine className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
