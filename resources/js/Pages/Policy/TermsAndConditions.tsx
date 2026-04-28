// resources/js/Pages/Policy/TermsAndConditions.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import PolicyLayout from '@/layouts/PolicyLayout';
import { FileText, CheckCircle, Mail, MapPin, Phone, Scale } from 'lucide-react';

interface Props {
    lastUpdated: string;
}

const TermsAndConditions: React.FC<Props> = ({ lastUpdated }) => {
    return (
        <PolicyLayout title="Terms & Conditions" lastUpdated={lastUpdated}>
            <Head title="Terms & Conditions | AXELMASON" />

            {/* Quick Summary Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider mb-2">Terms at a Glance</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                You must be at least 18 years old to make a purchase
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                All content and designs are protected intellectual property
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                We reserve the right to correct pricing errors or cancel orders
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                By using our site, you agree to these governing terms
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing, browsing, or purchasing from AXELMASON ("the Site"), you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions ("Terms"). If you do not agree, please discontinue use of the Site immediately.
                </p>
            </section>

            <section>
                <h2>2. Eligibility</h2>
                <p>
                    You must be at least <strong>18 years old</strong> or the age of majority in your jurisdiction to use this Site. By placing an order, you represent that you meet this requirement and are authorized to use the payment method provided.
                </p>
            </section>

            <section>
                <h2>3. Account Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>You agree to notify us immediately of any unauthorized account access.</li>
                    <li>AXELMASON is not liable for losses arising from your failure to protect account information.</li>
                    <li>We reserve the right to suspend or terminate accounts suspected of fraudulent activity.</li>
                </ul>
            </section>

            <section>
                <h2>4. Products & Pricing</h2>
                <p>
                    All product descriptions, images, and prices are subject to change without notice. We strive for accuracy but do not warrant that product information is complete, current, or error-free.
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Prices are listed in USD and exclude applicable taxes and shipping.</li>
                    <li>We reserve the right to limit quantities and discontinue products.</li>
                    <li>Pricing errors will be corrected, and affected orders may be cancelled with notice.</li>
                </ul>
            </section>

            <section>
                <h2>5. Orders & Payment</h2>
                <p>
                    Placing an order constitutes an offer to purchase. AXELMASON reserves the right to accept or decline any order for any reason, including product availability, pricing errors, or suspected fraud.
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Payment is processed securely via encrypted third-party providers.</li>
                    <li>You authorize us to charge your selected payment method upon order confirmation.</li>
                    <li>Sales tax is calculated based on your shipping address.</li>
                </ul>
            </section>

            <section>
                <h2>6. Intellectual Property</h2>
                <p>
                    All content on this Site—including logos, text, graphics, images, software, and product designs—is the property of AXELMASON or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="mt-2">
                    You may not reproduce, distribute, modify, or create derivative works from any Site content without our express written permission.
                </p>
            </section>

            <section>
                <h2>7. User Conduct</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Use the Site for any unlawful purpose or in violation of local laws.</li>
                    <li>Interfere with Site functionality, security, or other users' experience.</li>
                    <li>Attempt to gain unauthorized access to our systems or data.</li>
                    <li>Use automated scripts, bots, or scraping tools without permission.</li>
                    <li>Post false, misleading, or defamatory content.</li>
                </ul>
            </section>

            <section>
                <h2>8. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by law, AXELMASON and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or products, including but not limited to loss of profits, data, or business opportunities.
                </p>
                <p className="mt-2">
                    Our total liability for any claim related to your use of the Site shall not exceed the amount you paid for the product or service giving rise to the claim.
                </p>
            </section>

            <section>
                <h2>9. Indemnification</h2>
                <p>
                    You agree to indemnify, defend, and hold harmless AXELMASON, its officers, employees, and agents from any claims, damages, liabilities, or expenses arising from your breach of these Terms or your use of the Site.
                </p>
            </section>

            <section>
                <h2 className="flex items-center gap-2">
                    10. Governing Law & Disputes
                </h2>
                <p>
                    These Terms shall be governed by the laws of the State of [Your State], USA, without regard to conflict of law principles. Any disputes shall be resolved exclusively in the state or federal courts located in [Your County], and you consent to personal jurisdiction therein.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4 flex items-start gap-3">
                    <Scale className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                        For small claims, you may pursue relief in small claims court if eligible. Both parties waive rights to jury trial and class action participation.
                    </p>
                </div>
            </section>

            <section>
                <h2>11. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these Terms at any time. Changes become effective immediately upon posting. Your continued use of the Site after changes constitutes acceptance. We encourage reviewing this page periodically.
                </p>
            </section>

            <section>
                <h2>12. Contact Information</h2>
                <p>
                    For questions about these Terms, please contact:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-4 space-y-3">
                    <p className="font-black text-gray-900 uppercase tracking-wider text-sm border-b border-gray-200 pb-3 mb-4">AXELMASON Legal Department</p>
                    <p className="flex items-center gap-3 text-sm text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href="mailto:legal@axelmason.com" className="font-bold text-gray-900 hover:underline">legal@axelmason.com</a>
                    </p>
                    <p className="flex items-center gap-3 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>[Your Business Address]</span>
                    </p>
                    <p className="flex items-center gap-3 text-sm text-gray-700">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href="tel:+18001234567" className="font-bold text-gray-900 hover:underline">1-800-AXEL-MASON</a>
                    </p>
                </div>
            </section>

            {/* Legal Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-xs text-gray-400">
                <p>
                    These Terms & Conditions constitute the entire agreement between you and AXELMASON regarding use of the Site. If any provision is found unenforceable, the remaining provisions remain in full effect. Our failure to enforce any right does not constitute a waiver.
                </p>
                <p className="mt-4">
                    © {new Date().getFullYear()} AXELMASON. All rights reserved.
                </p>
            </div>
        </PolicyLayout>
    );
};

export default TermsAndConditions;
