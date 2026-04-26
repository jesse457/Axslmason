import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';

const OrderSuccess = ({ order }: { order: any }) => {
    return (
        <AppLayout>
            <Head title="Order Confirmed | AUGIMEN" />

            <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-slate-900 mb-2">Thank you for your order!</h1>
                <p className="text-slate-500 mb-8">
                    Your payment was processed successfully. We've sent a confirmation email to <strong>{order.email}</strong>.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-10 text-left">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Order Number</p>
                            <p className="text-lg font-mono font-bold text-slate-900">#{order.order_number}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Paid</p>
                            <p className="text-lg font-bold text-orange-500">${order.total.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-white p-2 border rounded-lg"><Package className="w-5 h-5 text-slate-400" /></div>
                            <div>
                                <p className="font-bold text-slate-900">Shipping to {order.first_name} {order.last_name}</p>
                                <p className="text-sm text-slate-500">{order.address}, {order.city}, {order.postal_code}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/products"
                        className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg"
                    >
                        Continue Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto border border-slate-300 text-slate-600 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
                    >
                        <ShoppingBag className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default OrderSuccess;
