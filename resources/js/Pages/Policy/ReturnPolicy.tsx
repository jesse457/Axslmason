// resources/js/Pages/Policy/ReturnPolicy.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PolicyLayout from '@/layouts/PolicyLayout';
import { Package, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { route } from 'ziggy-js';

interface Props {
    lastUpdated: string;
}

const ReturnPolicy: React.FC<Props> = ({ lastUpdated }) => {
    return (
        <PolicyLayout title="Return Policy" lastUpdated={lastUpdated}>
            <Head title="Return Policy | AXELMASON" />

            {/* Quick Summary Card */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider mb-2">Return Summary</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                30-day return window from delivery date
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Items must be unworn, unwashed, with tags attached
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Original packaging preferred
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Refunds processed within 5-10 business days
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <section>
                <h2>Eligible Returns</h2>
                <p>
                    We accept returns for most items purchased from AXELMASON within <strong>30 days</strong> of delivery. To qualify:
                </p>
                <ul>
                    <li>Item must be in original condition: unworn, unwashed, undamaged</li>
                    <li>All original tags and labels must be attached</li>
                    <li>Item must be in original packaging when possible</li>
                    <li>Proof of purchase (order number or receipt) is required</li>
                </ul>
            </section>

            <section>
                <h2>Non-Returnable Items</h2>
                <p>
                    For hygiene and safety reasons, the following items cannot be returned:
                </p>
                <ul>
                    <li>Undergarments, swimwear (if hygiene seal is broken)</li>
                    <li>Personalized or custom-made items</li>
                    <li>Gift cards and digital products</li>
                    <li>Items marked "Final Sale" or purchased during clearance events</li>
                    <li>Products damaged due to customer misuse or normal wear and tear</li>
                </ul>
            </section>

            <section>
                <h2>How to Start a Return</h2>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-black">1</div>
                        <div>
                            {/* <h4 className="font-bold text-gray-900">Initiate Return Online</h4>
                            <p className="text-gray-600">Log into your account, go to Order History, and select "Return Items". Or use our
                                 <Link href={route('returns.start')} className="text-orange-600 font-bold">Return Portal</Link> with your order number and email.</p> */}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-black">2</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Print Return Label</h4>
                            <p className="text-gray-600">After approval, you'll receive a prepaid return shipping label via email. US returns are free; international customers cover return shipping.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-black">3</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Package & Ship</h4>
                            <p className="text-gray-600">Securely pack your item(s), attach the label, and drop off at the designated carrier. Keep your drop-off receipt for reference.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2>Refunds & Exchanges</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-black text-gray-900 uppercase tracking-wider text-xs mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4" /> Refunds
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Refunded to original payment method</li>
                            <li>• Processed within 5-10 business days of receipt</li>
                            <li>• Original shipping fees are non-refundable</li>
                            <li>• Return shipping deducted for non-defective items (international)</li>
                        </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-black text-gray-900 uppercase tracking-wider text-xs mb-2 flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" /> Exchanges
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• For size/color exchanges only</li>
                            <li>• Subject to availability of requested item</li>
                            <li>• Price differences will be charged/refunded</li>
                            <li>• Start exchange via Return Portal or contact support</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h2>Damaged or Defective Items</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-gray-700">
                            If you receive a damaged or defective item, please contact us within <strong>7 days</strong> of delivery at <strong>support@axelmason.com</strong> with photos of the issue. We'll provide a prepaid return label and send a replacement or full refund at no cost to you.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2>Questions?</h2>
                <p>
                    Our support team is ready to help. Reach out via:
                </p>
                <ul>
                    <li>Email: <a href="mailto:support@axelmason.com" className="font-bold">support@axelmason.com</a></li>
                    <li>Live Chat: Available Mon-Fri, 9AM-6PM EST</li>
                    <li>Phone: <a href="tel:+18001234567" className="font-bold">1-800-AXEL-MASON</a></li>
                </ul>
            </section>
        </PolicyLayout>
    );
};

export default ReturnPolicy;
