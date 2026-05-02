import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { useCart } from '@/contexts/CartContext';
import {
    ChevronLeft, Loader2, AlertCircle, Wallet, Bitcoin,
    CheckCircle2, Package, Mail, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

type CartItem = {
    id: number;
    name: string;
    price: number;
    main_image?: string;
    image?: string;
    cartQuantity: number;
};

type SuccessOrder = {
    order_number: string;
    total: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
};

type PageProps = {
    btcRate?: number;
    successOrder?: SuccessOrder;
    errors?: Record<string, string>;
};

const Checkout: React.FC<PageProps> = ({ btcRate: initialBtcRate = 0.000015, successOrder }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [btcRate] = useState(initialBtcRate);

    // Show success view if order was just placed
    const showSuccess = !!successOrder;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        shipping_method: 'standard' as 'standard' | 'express',
        payment_method: 'bitcoin' as const,
        items: cartItems,
        subtotal: cartTotal,
    });

    // Recalculate totals whenever cart or shipping changes
    const shipping = cartTotal > 0 ? (data.shipping_method === 'express' ? 35.0 : 15.0) : 0;
    const tax = cartTotal * 0.08;
    const orderTotal = cartTotal + shipping + tax;
    const btcTotal = (orderTotal * btcRate).toFixed(8);

    const formatCurrency = (value: number) =>
        value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        // Sync cart data with form (in case cart changed)
        setData('items', cartItems);
        setData('subtotal', cartTotal);

        post('/checkout', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Order received!');
                clearCart();
                // Success view is now rendered via Inertia props
            },
            onError: (errs) => {
                if (errs.payment) toast.error(errs.payment);
                if (errs.items) toast.error(errs.items);
            }
        });
    };

    const handleNewOrder = () => {
        reset();
        window.location.href = '/products';
    };

    // ─────────────────────────────────────────────────────────────
    // SUCCESS VIEW (rendered when successOrder prop exists)
    // ─────────────────────────────────────────────────────────────
    if (showSuccess && successOrder) {
        return (
            <AppLayout>
                <Head title="Order Received | AXELMASON" />
                <div className="mx-auto max-w-3xl px-6 py-20 text-center">
                    <CheckCircle2 className="mx-auto h-24 w-24 text-orange-500 mb-6" />
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-4">
                        Order Received!
                    </h1>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-8 text-left shadow-sm">
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                                    {successOrder.order_number}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Paid</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">
                                    ${formatCurrency(successOrder.total)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Package className="h-4 w-4" /> Items Ordered
                            </h3>
                            {successOrder.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm font-bold text-slate-700 bg-white p-3 rounded-xl border border-slate-100">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8 text-orange-800 font-medium text-sm leading-relaxed max-w-xl mx-auto space-y-4">
                        <p><strong>Please save your Order ID displayed above.</strong></p>
                        <p>Our team will contact you shortly to validate your order and process your Bitcoin payment.</p>
                        <p className="text-orange-600 font-black uppercase tracking-widest text-xs pt-2">Thank you for shopping with us!</p>
                    </div>

                    <p className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <Mail className="h-4 w-4" />
                        A confirmation email has been sent to your inbox.
                    </p>

                    <button
                        onClick={handleNewOrder}
                        className="mt-10 inline-block bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all"
                    >
                        Return to Inventory
                    </button>
                </div>
            </AppLayout>
        );
    }

    // ─────────────────────────────────────────────────────────────
    // CHECKOUT FORM VIEW
    // ─────────────────────────────────────────────────────────────
    return (
        <AppLayout>
            <Head title="Secure Checkout | AXELMASON" />

            <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
                <Link href="/products" className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-orange-500 font-bold uppercase tracking-widest">
                    <ChevronLeft className="h-4 w-4" /> Return to Shop
                </Link>

                {/* Global Form Errors */}
                {(errors.items || errors.payment) && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="text-sm text-red-700">
                            {errors.items && <p className="font-bold">{errors.items}</p>}
                            {errors.payment && <p className="font-bold">{errors.payment}</p>}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT COLUMN: FORMS */}
                    <div className="space-y-10 lg:col-span-7">
                        {/* Contact Info */}
                        <section>
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 uppercase">1. Contact Information</h2>
                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full rounded-xl border px-4 py-3 text-sm transition outline-none focus:ring-2 focus:ring-orange-500 ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    placeholder="alex@example.com"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.email}</p>}
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section>
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 uppercase">2. Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none ${errors.first_name ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    />
                                    {errors.first_name && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.first_name}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none ${errors.last_name ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    />
                                    {errors.last_name && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.last_name}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none ${errors.address ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    />
                                    {errors.address && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.address}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none ${errors.city ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    />
                                    {errors.city && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.city}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        State / Province
                                    </label>
                                    <input
                                        type="text"
                                        value={data.state}
                                        onChange={(e) => setData('state', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                                        placeholder="e.g. Texas"
                                    />
                                    {errors.state && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.state}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Postal Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none ${errors.postal_code ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                                    />
                                    {errors.postal_code && <p className="mt-1 text-xs text-red-500 font-bold uppercase">{errors.postal_code}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Shipping Options */}
                        <section>
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 uppercase">3. Shipping Method</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${data.shipping_method === 'standard' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-white hover:border-slate-300'}`}>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="standard"
                                        checked={data.shipping_method === 'standard'}
                                        onChange={() => setData('shipping_method', 'standard')}
                                        className="sr-only"
                                    />
                                    <p className="font-bold text-slate-900 uppercase text-sm tracking-tight">Standard Shipping</p>
                                    <p className="text-xs text-slate-500 mt-1">7-10 Business Days</p>
                                    <p className="font-black text-orange-600 mt-2">$15.00</p>
                                </label>
                                <label className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${data.shipping_method === 'express' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-white hover:border-slate-300'}`}>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="express"
                                        checked={data.shipping_method === 'express'}
                                        onChange={() => setData('shipping_method', 'express')}
                                        className="sr-only"
                                    />
                                    <p className="font-bold text-slate-900 uppercase text-sm tracking-tight">Express Shipping</p>
                                    <p className="text-xs text-slate-500 mt-1">2-4 Business Days</p>
                                    <p className="font-black text-orange-600 mt-2">$35.00</p>
                                </label>
                            </div>
                            {errors.shipping_method && <p className="mt-2 text-xs text-red-500 font-bold uppercase">{errors.shipping_method}</p>}
                        </section>

                        {/* Payment Details */}
                        <section>
                            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 uppercase">4. Payment Method</h2>
                            <div className="rounded-2xl border-2 border-orange-500 bg-orange-50/30 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-500 p-2 rounded-lg">
                                            <Bitcoin className="text-white h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Bitcoin (BTC)</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-tighter">On-chain payment</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-slate-900">₿ {btcTotal}</p>
                                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Est. BTC Amount</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl border border-orange-100 p-4 text-sm text-slate-600 space-y-3">
                                    <div className="flex gap-3">
                                        <Wallet className="h-5 w-5 text-orange-500 shrink-0" />
                                        <p>Clicking <b>"Place Secure Order"</b> will reserve your items and generate a secure BTC transaction protocol.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="mb-8 text-xl font-extrabold tracking-tight text-slate-900 uppercase">Order Summary</h2>

                            <div className="mb-8 max-h-[300px] space-y-6 overflow-y-auto pr-2">
                                {cartItems.length === 0 ? (
                                    <p className="text-center text-slate-500 text-sm py-8">Your cart is empty</p>
                                ) : cartItems.map((item: CartItem) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-2">
                                            <img src={item.main_image || item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">{item.cartQuantity}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-slate-500">Qty: {item.cartQuantity}</p>
                                        </div>
                                        <div className="text-sm font-bold text-slate-900">${formatCurrency(item.price * item.cartQuantity)}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-slate-100 pt-6">
                                <div className="flex justify-between text-sm font-medium text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900">${formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-slate-500">
                                    <span>Shipping ({data.shipping_method})</span>
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
                                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">≈ ₿ {btcTotal}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={cartItems.length === 0 || processing}
                                className="group relative mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 py-5 font-bold text-white transition-all hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 shadow-xl"
                            >
                                {processing ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Bitcoin className="h-5 w-5" />
                                )}
                                <span className="uppercase tracking-widest text-sm">
                                    {processing ? 'Processing...' : 'Place Secure Order'}
                                </span>
                            </button>

                            <p className="mt-4 text-center text-[10px] text-slate-400 uppercase tracking-widest">
                                By placing this order, you agree to our Terms & Privacy Policy
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Checkout;
