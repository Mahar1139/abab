
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
              Welcome to the Himalaya Public School website (the "Service"). These Terms and Conditions ("Terms") govern your access to and use of our Service. Please read these Terms carefully before using the Service.
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. Your access to and use of the Service is also conditioned on your acceptance of and compliance with the Privacy Policy of Himalaya Public School. Our Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your personal information when you use the Application or the Website and tells you about your privacy rights and how the law protects you. Please read our Privacy Policy carefully before using our Service.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">1. Definitions</h3>
            <p>For the purposes of these Terms and Conditions:</p>
            <ul>
              <li><strong>"School," "We," "Us," or "Our"</strong> refers to Himalaya Public School.</li>
              <li><strong>"Service"</strong> refers to the Himalaya Public School website, including all its content, features, and functionalities.</li>
              <li><strong>"User," "You," or "Your"</strong> refers to the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
              <li><strong>"Content"</strong> refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by you, regardless of the form of that content.</li>
              <li><strong>"Third-party Social Media Service"</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">2. Intellectual Property Rights</h3>
            <p>
              The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of Himalaya Public School and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks, trade dress, and other intellectual property may not be used in connection with any product or service without the prior written consent of Himalaya Public School.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service strictly in accordance with these Terms for your personal, non-commercial use. This license does not include any resale or commercial use of the Service or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of the Service or its contents; any downloading, copying, or other use of account information for the benefit of any third party; or any use of data mining, robots, or similar data gathering and extraction tools.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">3. User Representations and Warranties</h3>
            <p>By using the Service, you represent and warrant that:</p>
            <ul>
              <li>All registration information you submit (if any) will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
              <li>You are not under the age of 13. If you are a minor in the jurisdiction in which you reside (generally under the age of 18), you must have the permission of, and be directly supervised by, your parent or guardian to use the Service. If you are a minor, you must have your parent or guardian read and agree to these Terms and Conditions prior to you using the Service.</li>
              <li>You will not access the Service through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Service for any illegal or unauthorized purpose.</li>
              <li>Your use of the Service will not violate any applicable law or regulation.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">4. Prohibited Activities</h3>
            <p>You may not access or use the Service for any purpose other than that for which we make the Service available. The Service may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
            <p>As a user of the Service, you agree not to:</p>
            <ul>
              <li>Systematically retrieve data or other content from the Service to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Service, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Service and/or the Content contained therein.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Service.</li>
              <li>Use any information obtained from the Service in order to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Use the Service in a manner inconsistent with any applicable laws or regulations.</li>
              <li>Engage in unauthorized framing of or linking to the Service.</li>
              <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Service or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Service.</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
              <li>Delete the copyright or other proprietary rights notice from any Content.</li>
              <li>Attempt to impersonate another user or person or use the username of another user.</li>
              <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").</li>
              <li>Interfere with, disrupt, or create an undue burden on the Service or the networks or services connected to the Service.</li>
              <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Service to you.</li>
              <li>Attempt to bypass any measures of the Service designed to prevent or restrict access to the Service, or any portion of the Service.</li>
              <li>Copy or adapt the Service’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
              <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Service.</li>
              <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Service, or using or launching any unauthorized script or other software.</li>
              <li>Use a buying agent or purchasing agent to make purchases on the Service.</li>
              <li>Make any unauthorized use of the Service, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
              <li>Use the Service as part of any effort to compete with us or otherwise use the Service and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">5. AI Assistant Usage</h3>
            <p>
              Our website includes an AI Assistant feature designed to provide information and assistance related to Himalaya Public School and general queries. By using the AI Assistant, you acknowledge and agree to the following:
            </p>
            <ul>
              <li>The AI Assistant provides information based on the data it has been trained on. While we strive for accuracy and relevance, Himalaya Public School does not guarantee the completeness, correctness, or suitability of all information provided by the AI Assistant. Information should be verified with official school sources when critical.</li>
              <li>You agree to interact with the AI Assistant in a respectful and lawful manner. You will not use the AI Assistant for any unlawful, harmful, abusive, harassing, defamatory, or inappropriate purposes. This includes, but is not limited to, generating hate speech, discriminatory content, sexually explicit material, or attempting to bypass safety filters or elicit harmful responses.</li>
              <li>Interactions with the AI Assistant may be logged and monitored for quality assurance, service improvement, and to ensure compliance with these Terms. This is further detailed in our Privacy Policy.</li>
              <li>Himalaya Public School reserves the right, at its sole discretion, to limit, suspend, or terminate your access to the AI Assistant or the entire Service if we believe you have violated these Terms, engaged in abusive behavior, or misused the AI Assistant. This may include temporary or permanent cooldown periods from interacting with the AI.</li>
              <li>The AI Assistant is a tool for information and general guidance. It is not a substitute for professional advice (e.g., educational counseling, legal, medical, financial). Information provided should be used for general informational purposes only and not as a sole basis for making decisions.</li>
              <li>The capabilities of the AI Assistant, including its knowledge base and response generation, may change over time as we update and improve the Service.</li>
               <li>You understand that AI-generated content can sometimes be imperfect, incomplete, or unintentionally biased. Use your judgment when interpreting information from the AI Assistant.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">6. Third-Party Websites and Content</h3>
            <p>
              The Service may contain (or you may be sent via the Service) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content").
            </p>
            <p>
              Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Service or any Third-Party Content posted on, available through, or installed from the Service, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content.
            </p>
            <p>
              Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Service and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms and Conditions no longer govern.
            </p>
            <p>
              You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Service or relating to any applications you use or install from the Service. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">7. Service Management</h3>
            <p>We reserve the right, but not the obligation, to:</p>
            <ul>
              <li>Monitor the Service for violations of these Terms and Conditions.</li>
              <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms and Conditions, including without limitation, reporting such user to law enforcement authorities.</li>
              <li>In our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof.</li>
              <li>In our sole discretion and without limitation, notice, or liability, to remove from the Service or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems.</li>
              <li>Otherwise manage the Service in a manner designed to protect our rights and property and to facilitate the proper functioning of the Service.</li>
            </ul>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">8. Term and Termination</h3>
            <p>
              These Terms and Conditions shall remain in full force and effect while you use the Service. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS AND CONDITIONS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS AND CONDITIONS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICE OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </p>
            <p>
              If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">9. Modifications and Interruptions</h3>
            <p>
              We reserve the right to change, modify, or remove the contents of the Service at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Service. We also reserve the right to modify or discontinue all or part of the Service without notice at any time.
            </p>
            <p>
              We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
            <p>
              We cannot guarantee the Service will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Service, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Service at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Service during any downtime or discontinuance of the Service.
            </p>
            <p>
              Nothing in these Terms and Conditions will be construed to obligate us to maintain and support the Service or to supply any corrections, updates, or releases in connection therewith.
            </p>
            
            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">10. Governing Law</h3>
            <p>
              These Terms and Conditions and your use of the Service are governed by and construed in accordance with the laws of India applicable to agreements made and to be entirely performed within India, without regard to its conflict of law principles.
            </p>
            <p>
              Any legal action or proceeding arising out of or relating to these Terms or the Service shall be instituted exclusively in the competent courts located in Pithoragarh, Uttarakhand, India, and you irrevocably submit to the exclusive jurisdiction of such courts.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">11. Dispute Resolution</h3>
            <h4>Informal Negotiations</h4>
            <p>
              To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms and Conditions (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
            </p>
            <h4>Binding Arbitration</h4>
            <p>
              If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the Arbitration and Conciliation Act, 1996 (India). The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by either Party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except where otherwise required by the applicable arbitration rules or applicable law, the arbitration will take place in Pithoragarh, Uttarakhand, India.
            </p>
            <h4>Exceptions to Informal Negotiations and Arbitration</h4>
            <p>
              The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations and binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">12. Disclaimer of Warranties</h3>
            <p>
              THE SERVICE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICE WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SERVICE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICE.
            </p>
            <p>
              WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">13. Limitation of Liability</h3>
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR INR 5000, WHICHEVER IS LESS. CERTAIN JURISDICTIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">14. Indemnification</h3>
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your use of the Service; (2) breach of these Terms and Conditions; (3) any breach of your representations and warranties set forth in these Terms and Conditions; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Service with whom you connected via the Service.
            </p>
            <p>
              Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
            </p>
            
            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">15. User Data</h3>
             <p>
              We will maintain certain data that you transmit to the Service for the purpose of managing the performance of the Service, as well as data relating to your use of the Service. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Service. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data. Please refer to our Privacy Policy for more details on how we handle user data.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">16. Electronic Communications, Transactions, and Signatures</h3>
            <p>
              Visiting the Service, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Service, satisfy any legal requirement that such communication be in writing.
            </p>
            <p>
              YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">17. Miscellaneous</h3>
            <p>
              These Terms and Conditions and any policies or operating rules posted by us on the Service or in respect to the Service constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms and Conditions shall not operate as a waiver of such right or provision.
            </p>
            <p>
              These Terms and Conditions operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.
            </p>
            <p>
              If any provision or part of a provision of these Terms and Conditions is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms and Conditions and does not affect the validity and enforceability of any remaining provisions.
            </p>
            <p>
              There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms and Conditions or use of the Service. You agree that these Terms and Conditions will not be construed against us by virtue of having drafted them.
            </p>
            <p>
              You hereby waive any and all defenses you may have based on the electronic form of these Terms and Conditions and the lack of signing by the parties hereto to execute these Terms and Conditions.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">18. Changes to These Terms</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, in whole or in part, please stop using the website and the Service.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-2">19. Contact Us</h3>
            <p>If you have any questions about these Terms and Conditions, you can contact us:</p>
            <ul>
              <li>By email: hps_pithoragarh@rediffmail.com</li>
              <li>By visiting our admissions office.</li>
              <li>By phone: +91-6398998621 or +91-7351840980</li>
            </ul>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

