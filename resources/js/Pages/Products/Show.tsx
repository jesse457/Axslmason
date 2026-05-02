import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { useCart } from '@/contexts/CartContext';
import {
    Star, ShoppingCart, Check, Minus, Plus, ChevronRight,
    Truck, ShieldCheck, Wrench, AlertCircle, ArrowRight,
    Info, ShieldAlert, Globe, Hammer
} from 'lucide-react';

interface Props {
    product: any;
    relatedProducts: any[];
}

const Show: React.FC<Props> = ({ product, relatedProducts = [] }) => {
    const { addToCart, updateQuantity, getItemQuantity } = useCart();

    // Image logic
    const galleryImages = product?.gallery || [product?.image];
    const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

    // Current quantity of THIS product in the cart
    const currentCartQty = getItemQuantity(product?.id);

    // Local state for the "Add to Fleet" action
    const [localQty, setLocalQty] = useState(1);
    const [justAdded, setJustAdded] = useState(false);

    useEffect(() => {
        if (galleryImages.length > 0) {
            setSelectedImage(galleryImages[0]);
        }
    }, [product?.id]);

    const brandName = product?.brand?.name || 'Industrial Series';
    const featuresList = product?.features || [];
    const inStock = product?.stock_quantity > 0;
    const maxStock = product?.stock_quantity || 0;

    const handleInitialAdd = () => {
        if (!product || !inStock) return;
        const success = addToCart(product, localQty);
        if (success) {
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
        }
    };

    if (!product) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white">
                    <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
                    <h1 className="text-2xl font-bold">Product Not Found</h1>
                    <Link href="/products" className="mt-4 text-orange-600 font-bold uppercase tracking-widest text-xs">Back to Shop</Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`${product.name} | AXELMASON`} />

            <div className="bg-white min-h-screen text-slate-900 font-sans">
                <div className="max-w-7xl mx-auto px-6 py-8">

                    {/* BREADCRUMBS */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-12">
                        <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/products" className="hover:text-orange-600 transition-colors">Fleet</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-900">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* LEFT: IMAGES */}
                        <div className="space-y-6">
                            <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden p-12">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500"
                                />
                            </div>

                            {galleryImages.length > 1 && (
                                <div className="grid grid-cols-5 gap-4">
                                    {galleryImages.map((img: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(img)}
                                            className={`aspect-square rounded-xl border-2 transition-all overflow-hidden bg-slate-50 p-2 ${
                                                selectedImage === img ? 'border-orange-600 bg-white' : 'border-transparent hover:border-slate-200'
                                            }`}
                                        >
                                            <img src={img} className="w-full h-full object-contain" alt="Gallery" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT: CONTENT */}
                        <div className="flex flex-col">
                            <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                                {brandName}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-tight mb-6">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex text-orange-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Verified Equipment</span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-10">
                                <span className="text-5xl font-black tracking-tighter text-slate-900">
                                    ${Number(product.price).toLocaleString()}
                                </span>
                                {product.original_price > product.price && (
                                    <span className="text-xl text-slate-400 line-through font-bold">
                                        ${Number(product.original_price).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* SMALL PRODUCT DETAILS SECTION */}
                            <div className="mb-10 p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-orange-600" /> Equipment Overview
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {product.description || "The industry benchmark for performance and reliability. Engineered for precision in the most demanding global industrial environments."}
                                </p>
                            </div>

                            {/* BUYING BOX */}
                            <div className="p-8 bg-slate-950 rounded-2xl text-white shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment Status</span>
                                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded ${inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {inStock ? 'In Stock / Ready to Ship' : 'Out of Stock'}
                                    </span>
                                </div>

                                {/* Dynamic Cart Logic: If already in cart, show quantity toggle. If not, show Add button. */}
                                {currentCartQty > 0 ? (
                                    <div className="space-y-4">
                                        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">In your active fleet:</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-between bg-white/10 rounded-lg px-6 py-4 flex-1">
                                                <button onClick={() => updateQuantity(product.id, currentCartQty - 1)} className="text-white hover:text-orange-500 transition-colors"><Minus className="w-5 h-5" /></button>
                                                <span className="font-black text-xl">{currentCartQty}</span>
                                                <button onClick={() => updateQuantity(product.id, currentCartQty + 1)} className="text-white hover:text-orange-500 transition-colors"><Plus className="w-5 h-5" /></button>
                                            </div>
                                            <div className="bg-emerald-600 p-4 rounded-lg">
                                                <Check className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex items-center justify-between bg-white/10 rounded-lg px-6 py-4 sm:w-40">
                                            <button onClick={() => setLocalQty(q => Math.max(1, q-1))} className="text-white/50 hover:text-white"><Minus className="w-4 h-4" /></button>
                                            <span className="font-black">{localQty}</span>
                                            <button onClick={() => setLocalQty(q => Math.min(maxStock, q+1))} className="text-white/50 hover:text-white"><Plus className="w-4 h-4" /></button>
                                        </div>

                                        <button
                                            onClick={handleInitialAdd}
                                            disabled={!inStock || justAdded}
                                            className="flex-1 py-4 px-8 rounded-lg font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all bg-orange-600 hover:bg-orange-500 text-white disabled:opacity-50 shadow-lg shadow-orange-900/20"
                                        >
                                            <ShoppingCart className="w-4 h-4" /> Add to Fleet
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* CORE SERVICES ICONS */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                                {[
                                    { icon: <Globe />, label: "Global Delivery" },
                                    { icon: <ShieldCheck />, label: "Certified Gear" },
                                    { icon: <Wrench />, label: "Support" },
                                    { icon: <Hammer />, label: "Installation" }
                                ].map((service, i) => (
                                    <div key={i} className="flex flex-col items-center p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                                        <div className="text-orange-600 mb-2">{React.cloneElement(service.icon as React.ReactElement, { className: "w-5 h-5" })}</div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{service.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TECHNICAL SPECS */}
                    {featuresList.length > 0 && (
                        <div className="mt-24">
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-8 pb-4 border-b border-slate-100">Technical Specifications</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                {featuresList.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-700">
                                        <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RELATED PRODUCTS */}
                    {relatedProducts.length > 0 && (
                        <section className="mt-32 pt-20 border-t border-slate-100">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-[10px] font-black tracking-[0.3em] text-orange-600 uppercase mb-2">Continue Browsing</h2>
                                    <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Related Equipment</p>
                                </div>
                                <Link href="/products" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-orange-600">
                                    View All Inventory <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map((rel) => (
                                    <Link key={rel.id} href={`/products/${rel.slug}`} className="group">
                                        <div className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center p-8 border border-slate-100 group-hover:border-orange-200 transition-colors">
                                            <img src={rel.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={rel.name} />
                                        </div>
                                        <h3 className="font-black uppercase tracking-tighter text-slate-900 group-hover:text-orange-600 transition-colors">{rel.name}</h3>
                                        <p className="text-sm font-bold text-slate-400 mt-1">${Number(rel.price).toLocaleString()}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
