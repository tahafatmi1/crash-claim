import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl xl:text-4xl font-bold text-foreground mb-4">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground">
            Last Updated: December 10, 2025
          </p>
        </div>

        <Card>
          <CardContent className="prose prose-blue max-w-none pt-6">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using Crash Claim's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.
              </p>
              <p className="text-muted-foreground">
                These terms apply to all visitors, users, and others who access or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use of Services</h2>
              <p className="text-muted-foreground mb-4">
                Our services are provided to help you submit and manage crash claims. By using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not attempt to interfere with or disrupt our services</li>
                <li>Not use automated systems to access our services without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Claim Submission</h2>
              <p className="text-muted-foreground mb-4">
                When submitting a claim through our platform:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You certify that all information provided is true and accurate</li>
                <li>You understand that false information may result in claim denial</li>
                <li>You authorize us to verify the information provided</li>
                <li>You consent to the collection of your IP address for verification purposes</li>
                <li>You acknowledge that submission does not guarantee claim approval</li>
                <li>You agree to cooperate with any additional information requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property Rights</h2>
              <p className="text-muted-foreground mb-4">
                The website and its original content, features, and functionality are owned by Crash Claim and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our content without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. User Representations and Warranties</h2>
              <p className="text-muted-foreground mb-4">
                By using our services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into these terms</li>
                <li>You will not use our services for any illegal purpose</li>
                <li>Your use will comply with all applicable laws and regulations</li>
                <li>All information you provide is accurate and truthful</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Prohibited Activities</h2>
              <p className="text-muted-foreground mb-4">
                You may not access or use our services for any purpose other than that for which we make them available. Prohibited activities include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Submitting false or fraudulent claims</li>
                <li>Attempting to bypass security measures</li>
                <li>Engaging in any automated use of the system</li>
                <li>Harassing, intimidating, or threatening our staff</li>
                <li>Uploading viruses or malicious code</li>
                <li>Collecting user information without consent</li>
                <li>Using our services to violate any laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                Our services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The accuracy, reliability, or completeness of our services</li>
                <li>The uninterrupted or error-free operation of our website</li>
                <li>The security of data transmission</li>
                <li>The results that may be obtained from using our services</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do not guarantee that your claim will be approved or that you will receive any specific outcome.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by law, Crash Claim shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Loss of profits or revenue</li>
                <li>Loss of data or information</li>
                <li>Business interruption</li>
                <li>Personal injury or property damage</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Our total liability shall not exceed the amount you paid to us, if any, for accessing our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless Crash Claim and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including but not limited to breach of these terms. Upon termination, your right to use our services will immediately cease.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Crash Claim operates, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of that jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Dispute Resolution</h2>
              <p className="text-muted-foreground mb-4">
                In the event of any dispute arising from these terms or your use of our services:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You agree to first attempt to resolve the dispute informally by contacting us</li>
                <li>If informal resolution is unsuccessful, disputes may be resolved through binding arbitration</li>
                <li>You waive your right to participate in class action lawsuits</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. Your continued use of our services after changes become effective constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">15. Entire Agreement</h2>
              <p className="text-muted-foreground">
                These terms, together with our Privacy Policy, constitute the entire agreement between you and Crash Claim regarding the use of our services and supersede all prior agreements and understandings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">16. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-foreground font-medium">Crash Claim</p>
                <p className="text-muted-foreground">Email: legal@crashclaim.com</p>
                <p className="text-muted-foreground">Phone: (555) 123-4567</p>
                <p className="text-muted-foreground">Address: 123 Main Street, Suite 100, City, State 12345</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">17. Acknowledgment</h2>
              <p className="text-muted-foreground">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
