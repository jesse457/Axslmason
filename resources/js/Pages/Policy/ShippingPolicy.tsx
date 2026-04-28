// resources/js/Pages/Policy/ShippingPolicy.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PolicyLayout from '@/layouts/PolicyLayout';
import { route } from 'ziggy-js';
import {
    Truck,
    Clock,
    Globe,
    Search,
    AlertTriangle,
    MapPin,
    PackageX,
    CheckCircle
} from 'lucide-react';

interface Props {
    lastUpdated: string;
}

const ShippingPolicy: React.FC<Props> = ({ lastUpdated }) => {
    return (
        <PolicyLayout title="Shipping Policy" lastUpdated={lastUpdated}>
            <Head title="Shipping Policy | AXELMASON" />

            {/* Quick Summary Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider mb-2">Shipping at a Glance</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Orders process within 1-3 business days
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Free standard shipping on US orders over $75
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Tracking provided for all shipments
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Worldwide shipping available
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <section>
                <h2 className="flex items-center gap-2 text-gray-900">
                    <Clock className="w-5 h-5 text-gray-400" /> Order Processing
                </h2>
                <p>
                    All orders are processed within <strong>1-3 business days</strong> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
                </p>
            </section>

            <section>
                <h2 className="flex items-center gap-2 text-gray-900">
                    <Globe className="w-5 h-5 text-gray-400" /> Shipping Rates & Delivery Estimates
                </h2>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-black text-gray-900 uppercase tracking-wider">Destination</th>
                                <th className="text-left p-4 font-black text-gray-900 uppercase tracking-wider">Service</th>
                                <th className="text-left p-4 font-black text-gray-900 uppercase tracking-wider">Estimated Delivery</th>
                                <th className="text-left p-4 font-black text-gray-900 uppercase tracking-wider">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="p-4 font-bold text-gray-900">United States</td>
                                <td className="p-4">Standard Shipping</td>
                                <td className="p-4">5-7 business days</td>
                                <td className="p-4 text-blue-600 font-bold">$4.99</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-900">United States</td>
                                <td className="p-4">Express Shipping</td>
                                <td className="p-4">2-3 business days</td>
                                <td className="p-4 text-blue-600 font-bold">$14.99</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-900">Canada</td>
                                <td className="p-4">International Standard</td>
                                <td className="p-4">10-15 business days</td>
                                <td className="p-4 text-blue-600 font-bold">$19.99</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-900">Worldwide</td>
                                <td className="p-4">International Standard</td>
                                <td className="p-4">15-30 business days</td>
                                <td className="p-4 text-blue-600 font-bold">Calculated at checkout</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-3 flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <AlertTriangle className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Free standard shipping applies automatically to US orders over $75. Duties, customs, and local taxes may apply for international orders and are the responsibility of the customer.</span>
                </p>
            </section>

            {/* <section>
                <h2 className="flex items-center gap-2 text-gray-900">
                    <Search className="w-5 h-5 text-gray-400" /> Order Tracking
                </h2>
                <p>
                    Once your order ships, you'll receive a shipping confirmation email with your tracking number. You can track your package anytime by:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Clicking the tracking link in your shipping confirmation email</li>
                    <li>Logging into your AXELMASON account to view order history</li>
                </ul>
            </section> */}

            <section>
                <h2 className="flex items-center gap-2 text-gray-900">
                    <AlertTriangle className="w-5 h-5 text-gray-400" /> Shipping Delays
                </h2>
                <p>
                    While we do our best to meet estimated delivery times, please note that shipping carriers may experience delays due to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Severe weather conditions or natural disasters</li>
                    <li>Customs processing for international orders</li>
                    <li>Carrier service disruptions</li>
                    <li>Incorrect or incomplete shipping addresses</li>
                </ul>
                <p className="mt-4">
                    AXELMASON is not responsible for delays caused by factors outside our control. If your package is significantly delayed, please <Link href={route('contact')} className="text-blue-600 font-bold hover:underline">contact us</Link> and we'll help investigate.
                </p>
            </section>

            <section>
                <h2 className="flex items-center gap-2 text-gray-900">
                    <MapPin className="w-5 h-5 text-gray-400" /> Address Changes
                </h2>
                <p>
                    If you need to change your shipping address, please contact us immediately at <a href="mailto:support@axelmason.com" className="font-bold text-gray-900 hover:text-blue-600">support@axelmason.com</a>. We can only modify addresses for orders that haven't been processed for shipping. Once an order is in transit, address changes cannot be made.
                </p>
            </section>

            <section>
                <h2 className="flex items-center gap-2 text-gray-900">
                    <PackageX className="w-5 h-5 text-gray-400" /> Lost or Stolen Packages
                </h2>
                <p>
                    AXELMASON is not responsible for packages marked as "delivered" by the carrier. If your tracking shows delivered but you haven't received your package:
                </p>
                <ol className="list-decimal pl-5 space-y-2 mt-2">
                    <li>Check with household members, building managers, or neighbors.</li>
                    <li>Look around your property (porch, mailbox, side doors, or hidden areas).</li>
                    <li>Contact your local carrier office with your tracking number.</li>
                    <li>If still unresolved, <Link href={route('contact')} className="text-blue-600 font-bold hover:underline">contact us</Link> within 48 hours of the marked delivery date.</li>
                </ol>
            </section>
        </PolicyLayout>
    );
};

export default ShippingPolicy;
