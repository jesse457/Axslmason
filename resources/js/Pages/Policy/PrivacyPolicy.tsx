// resources/js/Pages/Policy/PrivacyPolicy.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PolicyLayout from '@/layouts/PolicyLayout';
import {
  Shield, Eye, Share2, Lock, UserCheck, Cookie,
  Database, RefreshCw, Mail, AlertTriangle, CheckCircle
} from 'lucide-react';

interface Props {
  lastUpdated: string;
}

const PrivacyPolicy: React.FC<Props> = ({ lastUpdated }) => {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated={lastUpdated}>
      <Head title="Privacy Policy | AXELMASON" />

      {/* Quick Summary Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <div>
            <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider mb-2">Privacy at a Glance</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                We never sell your personal data to third parties
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                You can access, correct, or delete your data anytime
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                All payments & transmissions are encrypted (TLS 1.3)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Cookie preferences can be managed instantly
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section>
        <h2>1. Introduction</h2>
        <p>
          At AXELMASON ("we," "our," or "us"), your privacy is a priority. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website, make a purchase, or interact with our services. By using AXELMASON, you agree to the practices described herein.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We collect information to provide, improve, and secure our services. This includes:</p>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <Eye className="w-4 h-4 text-orange-600 mb-2" />
            <h4 className="font-bold text-gray-900 text-sm mb-1">Personal Data</h4>
            <p className="text-xs text-gray-600">Name, email, phone, shipping/billing address, payment details, and account credentials.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <Database className="w-4 h-4 text-orange-600 mb-2" />
            <h4 className="font-bold text-gray-900 text-sm mb-1">Usage Data</h4>
            <p className="text-xs text-gray-600">IP address, browser type, device info, pages visited, clickstream data, and time spent on site.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <Cookie className="w-4 h-4 text-orange-600 mb-2" />
            <h4 className="font-bold text-gray-900 text-sm mb-1">Cookies & Tracking</h4>
            <p className="text-xs text-gray-600">Essential, analytics, and marketing cookies used to remember preferences and measure performance.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>Your data helps us operate efficiently and deliver a personalized experience:</p>
        <ul>
          <li><strong>Order Fulfillment:</strong> Process payments, arrange shipping, and send order confirmations & tracking updates.</li>
          <li><strong>Customer Support:</strong> Respond to inquiries, process returns/exchanges, and resolve account issues.</li>
          <li><strong>Site Improvement:</strong> Analyze traffic, test features, and optimize user experience.</li>
          <li><strong>Marketing & Communications:</strong> Send newsletters, promotions, and personalized recommendations (only with your consent).</li>
          <li><strong>Security & Compliance:</strong> Prevent fraud, verify identity, and comply with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>4. How We Share Your Information</h2>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-orange-600" /> We do <u>not</u> sell, rent, or trade your personal data.
          </p>
        </div>
        <p>We only share information with trusted third parties when necessary:</p>
        <ul>
          <li><strong>Service Providers:</strong> Payment processors (Stripe/PayPal), shipping carriers (USPS/FedEx), email/SMS platforms, and analytics tools.</li>
          <li><strong>Legal Requirements:</strong> When required by law, subpoena, or to protect our rights, safety, or property.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, user data may be transferred under equivalent privacy terms.</li>
        </ul>
        <p className="text-xs text-gray-400 mt-2">All third parties are contractually bound to use your data only for the specified service and maintain strict security standards.</p>
      </section>

      <section>
        <h2>5. Your Privacy Rights & Choices</h2>
        <p>Depending on your location, you may have the following rights:</p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-black text-gray-900 uppercase tracking-wider">Right</th>
                <th className="text-left p-4 font-black text-gray-900 uppercase tracking-wider">Description</th>
                <th className="text-left p-4 font-black text-gray-900 uppercase tracking-wider">How to Exercise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4 font-bold text-gray-900">Access</td>
                <td className="p-4">Request a copy of your personal data</td>
                <td className="p-4">Log into account or email <a href="mailto:privacy@axelmason.com" className="text-orange-600 font-bold">privacy@axelmason.com</a></td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Correction</td>
                <td className="p-4">Update inaccurate or incomplete information</td>
                <td className="p-4">Edit via Account Settings or contact support</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Deletion</td>
                <td className="p-4">Request permanent removal of your data</td>
                <td className="p-4">Submit request via email (subject to legal retention)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Opt-Out</td>
                <td className="p-4">Unsubscribe from marketing communications</td>
                <td className="p-4">Click "Unsubscribe" link or update email preferences</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-900">Restriction</td>
                <td className="p-4">Limit processing of your data</td>
                <td className="p-4">Contact our Privacy Team for assessment</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          California residents: You have additional rights under the CCPA/CPRA. EU/UK residents: Rights are protected under GDPR. We respond to verified requests within 30 days.
        </p>
      </section>

      <section>
        <h2>6. Cookies & Tracking Technologies</h2>
        <p>We use cookies and similar technologies to enhance functionality, analyze performance, and deliver relevant content:</p>
        <ul className="space-y-3 mt-3">
          <li>
            <strong className="text-gray-900">Essential Cookies:</strong> Required for site operation (cart, checkout, login). Cannot be disabled.
          </li>
          <li>
            <strong className="text-gray-900">Analytics Cookies:</strong> Help us understand how visitors interact with our site (Google Analytics, Hotjar).
          </li>
          <li>
            <strong className="text-gray-900">Marketing Cookies:</strong> Used to deliver personalized ads and measure campaign effectiveness. Only active with consent.
          </li>
        </ul>
        <p className="mt-3">
          You can manage cookie preferences at any time by clicking the <span className="font-bold text-orange-600">Cookie Settings</span> link in our footer or by adjusting your browser settings. Note: disabling non-essential cookies may impact site functionality.
        </p>
      </section>

      <section>
        <h2>7. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data:
        </p>
        <ul>
          <li>TLS 1.3 encryption for all data in transit</li>
          <li>AES-256 encryption for stored sensitive information</li>
          <li>Regular security audits & vulnerability scanning</li>
          <li>PCI-DSS compliant payment processing</li>
          <li>Restricted access controls for internal systems</li>
        </ul>
        <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
          <Lock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            While we strive to protect your information, no internet transmission is 100% secure. You are responsible for safeguarding your account credentials.
          </p>
        </div>
      </section>

      <section>
        <h2>8. Third-Party Links & Services</h2>
        <p>
          Our site may contain links to external websites, social media platforms, or partner services. AXELMASON is not responsible for the privacy practices or content of these third parties. We encourage you to review their privacy policies before providing any personal information.
        </p>
      </section>

      <section>
        <h2>9. Children's Privacy</h2>
        <p>
          AXELMASON is not intended for individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that a child has provided us with information, we will promptly delete it and terminate the associated account. If you believe a child has shared data with us, please contact us immediately.
        </p>
      </section>

      <section>
        <h2>10. Data Retention</h2>
        <p>
          We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations (e.g., tax records for 7 years), resolve disputes, and enforce our agreements. When data is no longer needed, it is securely deleted or anonymized.
        </p>
      </section>

      <section>
        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. Material changes will be communicated via email or a prominent notice on our site. Your continued use of AXELMASON after changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>12. Contact Us</h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact our Privacy Team:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm mt-4 space-y-2">
          <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> <a href="mailto:privacy@axelmason.com" className="font-bold text-gray-900">privacy@axelmason.com</a></p>
          <p className="flex items-center gap-2"><Shield className="w-4 h-4" /> Data Protection Officer: <span className="font-bold">dpo@axelmason.com</span></p>
          <p className="flex items-center gap-2"><Database className="w-4 h-4" /> Mailing Address: <span className="font-bold">[Your Business Address, City, State, ZIP]</span></p>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Response Time: Within 30 business days. For EU residents, you also have the right to lodge a complaint with your local data protection authority.
        </p>
      </section>

      {/* Legal Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-xs text-gray-400">
        <p>
          This Privacy Policy is governed by applicable data protection laws, including the GDPR, CCPA/CPRA, and other regional privacy regulations. By using AXELMASON, you consent to the collection and use of information as described herein.
        </p>
        <p className="mt-4">
          © {new Date().getFullYear()} AXELMASON. All rights reserved.
        </p>
      </div>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
