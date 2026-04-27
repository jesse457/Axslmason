import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { useCart } from '@/contexts/CartContext';
import { ShieldCheck, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();

    // 1. Setup the Inertia Form
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        postal_code: '',
        // Payment fields (Placeholders for UI)
        card_number: '',
        expiry: '',
        cvc: '',
        // Send items
        items: cartItems,
        subtotal: cartTotal,
    });

    // Calculations
    const shipping = cartTotal > 0 ? 15.0 : 0;
    const tax = cartTotal * 0.08;
    const orderTotal = cartTotal + shipping + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use global route() helper or define the path directly
        post('/checkout', {
            onSuccess: () => clearCart(),
        });
    };

    // Helper to format currency
    const formatCurrency = (value: number) =>
        value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <AppLayout>
            <Head title="Checkout | AXELMASON" />

            <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
                <Link
                    href="/products"
                    className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-orange-500 font-bold uppercase tracking-widest"
                >
                    <ChevronLeft className="h-4 w-4" /> Return to Shop
                </Link>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* LEFT COLUMN: FORMS */}
                    <div className="space-y-10 lg:col-span-7">
                        {/* Contact Info */}
                        <section>
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                                1. Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2 focus:ring-orange-500 ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                                        placeholder="alex@example.com"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section>
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                                2. Shipping Address
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Address</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Postal Code</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Payment Placeholder */}
                        {/* <section>
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                                3. Payment
                            </h2>
                            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM / YY" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                    <input type="text" placeholder="CVC" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                            </div>
                        </section> */}
                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="mb-8 text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                                Order Summary
                            </h2>

                            <div className="mb-8 max-h-[400px] space-y-6 overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-2">
                                            <img
                                                // FIX: Ensure image path is correct. If it's a relative path from DB, add /storage/
                                                src={item.main_image || item.image}
                                                alt={item.name}
                                                className="h-full w-full object-contain mix-blend-multiply"
                                            />
                                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                                                {item.cartQuantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                                            {/* FIX: Render the brand NAME, not the brand OBJECT */}
                                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-orange-500">
                                                {typeof item.brand === 'object' ? item.brand?.name : item.brand}
                                            </p>
                                        </div>
                                        <div className="text-sm font-bold text-slate-900">
                                            ${formatCurrency(item.price * item.cartQuantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-slate-100 pt-6">
                                <div className="flex justify-between text-sm font-medium text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900">${formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-slate-500">
                                    <span>Shipping</span>
                                    <span className="text-slate-900">${formatCurrency(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-slate-500">
                                    <span>Estimated Tax (8%)</span>
                                    <span className="text-slate-900">${formatCurrency(tax)}</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-slate-100">
                                    <span className="text-lg font-extrabold text-slate-900">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-slate-900">${formatCurrency(orderTotal)}</span>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">USD Included</p>
                                    </div>
                                </div>
                            </div>

                            {/* Error Displays */}
                            {(errors.payment || errors.items) && (
                                <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-600 text-xs font-medium flex gap-2 border border-red-100">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <div>{errors.payment || errors.items}</div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={cartItems.length === 0 || processing}
                                className="group relative mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-5 font-bold text-white transition-all hover:bg-orange-500 disabled:bg-slate-200 disabled:text-slate-400 shadow-xl shadow-slate-200"
                            >
                                {processing ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <ShieldCheck className="h-5 w-5" />
                                )}
                                <span className="uppercase tracking-widest text-sm">
                                    {processing ? 'Processing Order...' : 'Place Secure Order'}
                                </span>
                            </button>

                            <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                                Secure 256-bit SSL Encrypted Payment
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Checkout;
