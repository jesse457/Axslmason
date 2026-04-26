import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import {
    ShieldCheck,
    Truck,
    Settings,
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
    Zap,
    ArrowRight,
    Wrench,
    Tag,
    Star,
    Quote,
    Mail
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    original_price?: number;
    discount_percent?: number;
    image: string;
    slug: string;
    category?: string;
    brand_name?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
}

interface Brand {
    id: number;
    name: string;
    logo?: string;
}

interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

interface HomeProps {
    featuredProducts?: Product[];
    collections: Category[];
    brands: Brand[];
    reviews: Review[];
}

const Home = ({ featuredProducts = [], collections = [], brands = [], reviews = [] }: HomeProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const formatPrice = (price: number | string) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(numPrice);
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
    }, [featuredProducts.length]);

    useEffect(() => {
        if (featuredProducts.length <= 1) return;
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [nextSlide, featuredProducts.length]);

    return (
        <AppLayout>
            <Head title="AUGIMEN | Industrial Drilling Equipment" />

            <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">

                {/* 1. HERO SECTION */}
                <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                            alt="Industrial Job Site"
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 text-orange-500 font-bold tracking-[0.2em] text-[10px] mb-4 uppercase">
                                <span className="w-8 h-[1px] bg-orange-500"></span>
                                Heavy-Duty Performance
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1] mb-6 uppercase">
                                Precision <br />
                                <span className="text-orange-600">Power Tools.</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
                                Engineered for demanding operations. High-torque, industrial-grade hardware that never quits.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/products" className="bg-orange-600 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all flex items-center gap-2 shadow-xl">
                                    Browse Fleet <ChevronRight className="w-4 h-4" />
                                </Link>
                                <Link href="/quote" className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all">
                                    Request Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. THE TRUST BAR */}
                <div className="bg-slate-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: <Truck />, t: "Rapid Delivery", d: "Direct to jobsite" },
                            { icon: <ShieldCheck />, t: "Certified Gear", d: "OSHA Compliant" },
                            { icon: <Zap />, t: "Peak Efficiency", d: "High-torque output" },
                            { icon: <Settings />, t: "Fleet Support", d: "24/7 technical aid" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 flex items-center gap-4 border-r border-slate-200 last:border-r-0 hover:bg-white transition-colors">
                                <div className="text-orange-600">{React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}</div>
                                <div>
                                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-slate-900">{item.t}</h4>
                                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. BRANDS SECTION (NEW) */}
                <section className="py-12 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 font-mono">Authorized Distribution Partner For</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {brands.map((brand) => (
                                <div key={brand.id} className="h-8 md:h-12 flex items-center">
                                    {brand.logo ? (
                                        <img src={brand.logo} alt={brand.name} className="h-full object-contain" />
                                    ) : (
                                        <span className="font-black text-xl italic text-slate-800">{brand.name}</span>
                                    )}
                                </div>
                            ))}
                            {/* Fallback internal logos if no dynamic brands */}
                            {!brands.length && (
                                <>
                                    <div className="flex items-center gap-2"><Wrench className="w-5 h-5" /><span className="font-black text-lg italic">TOOL-SPEC</span></div>
                                    <div className="flex items-center gap-2"><Settings className="w-5 h-5" /><span className="font-black text-lg italic">CORE-DRILL</span></div>
                                    <div className="flex items-center gap-2"><Zap className="w-5 h-5" /><span className="font-black text-lg italic">MAX-FLITE</span></div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* 4. FEATURED PRODUCT CAROUSEL */}
                {featuredProducts.length > 0 && (
                    <section className="py-24 px-6 bg-white overflow-hidden">
                        <div className="max-w-7xl mx-auto relative">
                            <div className="mb-16">
                                <h2 className="text-[10px] font-black tracking-[0.3em] text-orange-600 uppercase mb-2">Spotlight Equipment</h2>
                                <p className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Featured Hardware</p>
                            </div>

                            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {featuredProducts.map((product) => {
                                    const currentPrice = Number(product.price);
                                    const originalPrice = Number(product.original_price);
                                    const isOnSale = originalPrice > 0 && originalPrice > currentPrice;

                                    return (
                                        <div key={product.id} className="w-full shrink-0">
                                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                                <div className="relative aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-12">
                                                    {isOnSale && (
                                                        <div className="absolute top-6 left-6 z-20 bg-orange-600 text-white px-4 py-2 font-black uppercase tracking-widest text-[10px] shadow-lg rounded">
                                                            Sale Offer
                                                        </div>
                                                    )}
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">{product.brand_name || 'Industrial Grade'}</span>
                                                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-tight">{product.name}</h3>
                                                    <div className="flex items-end gap-4 mb-8">
                                                        <div className="flex flex-col">
                                                            {isOnSale && <span className="text-slate-400 line-through font-bold text-sm mb-1">{formatPrice(originalPrice)}</span>}
                                                            <span className="text-5xl font-black text-slate-950 tracking-tighter">{formatPrice(currentPrice)}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-slate-600 text-lg mb-10 leading-relaxed">{product.description || "The industry benchmark for professional drilling performance and durability."}</p>
                                                    <Link href={`/products/${product.slug}`} className="bg-slate-950 text-white py-5 px-10 font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl w-fit">
                                                        <ShoppingCart className="w-5 h-5" /> View Specifications
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. CATEGORIES GRID (ENHANCED) */}
                <section className="bg-slate-950 py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Shop by <span className="text-orange-500">Department</span></h2>
                                <p className="text-slate-400 mt-2 font-medium">Browse our complete inventory of professional hardware.</p>
                            </div>
                            <Link href="/products" className="hidden md:flex text-white font-bold uppercase tracking-widest text-[10px] items-center gap-2 hover:text-orange-500 transition-colors">
                                View Full Fleet <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {collections.map((cat) => (
                                <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group relative h-[400px] overflow-hidden rounded-xl">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{cat.name}</h3>
                                        <div className="w-12 h-1 bg-orange-600 mb-4 group-hover:w-24 transition-all duration-500"></div>
                                        <span className="flex items-center gap-2 text-white/60 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                                            Explore Collection <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. TESTIMONIALS / REVIEWS (NEW) */}
                <section className="py-24 bg-slate-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Quote className="w-12 h-12 text-orange-200 mx-auto mb-4" />
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Trusted in the Field</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white p-10 border border-slate-100 shadow-sm rounded-xl">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
                                    </div>
                                    <p className="text-slate-700 text-lg italic mb-6 leading-relaxed">"{review.comment}"</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-black text-xs uppercase tracking-widest text-slate-900">{review.user}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{review.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. NEWSLETTER (NEW) */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto bg-orange-600 rounded-3xl p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute right-0 top-0 opacity-10 -rotate-12 translate-x-10 -translate-y-10">
                            <Mail className="w-64 h-64 text-white" />
                        </div>
                        <div className="relative z-10 max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Join the Fleet</h2>
                            <p className="text-orange-100 mb-8 font-medium">Get technical updates, exclusive discounts, and early access to new industrial equipment.</p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter work email"
                                    className="flex-1 px-6 py-4 rounded-lg bg-white border-none focus:ring-2 focus:ring-slate-900 text-slate-900 font-bold"
                                />
                                <button className="bg-slate-950 text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-[10px] text-orange-200 mt-4 font-bold uppercase tracking-widest">No Spam. Just high-performance updates.</p>
                        </div>
                    </div>
                </section>

            </div>
        </AppLayout>
    );
};

export default Home;
