import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import {
    ShieldCheck,
    Globe,
    Settings,
    ChevronRight,
    ArrowRight,
    Wrench,
    Star,
    Quote,
    Mail,
    Activity,
    HardHat,
    Banknote,
    Headset,
    Hammer
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    original_price?: number;
    image: string;
    slug: string;
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

const Home = ({ featuredProducts = [], collections = [], brands =[], reviews = [] }: HomeProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const formatPrice = (price: number | string) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
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
            <Head>
                <title>AXELMASON | Global Heavy Industrial, Mining & Medical Equipment</title>
                <meta name="description" content="Premium supplier of Oil & Gas drilling tools, heavy construction machinery, mining equipment, and advanced medical imaging systems. Global logistics and certified industrial hardware." />
                <meta name="keywords" content="Oil and Gas Equipment, Drill Rigs, Construction Machinery, Excavators, Mining Equipment, Medical Scanners, MRI, Industrial Tools" />

                {/* Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Store",
                        "name": "AXELMASON",
                        "description": "Distributor of heavy-duty industrial and medical equipment worldwide.",
                        "url": "https://axelmason.com",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Industrial & Medical Equipment",
                            "itemListElement":[
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Oil & Gas Exploration Equipment" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Construction & Mining Machinery" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Advanced Medical Systems" } }
                            ]
                        }
                    })}
                </script>
            </Head>

            <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">

                {/* 1. HERO SECTION */}
                <section className="relative h-[85vh] min-h-[650px] flex items-center overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        {/* Swapped background for a tough heavy machinery/mining photo */}
                        <img
                            src="/assets/hero.jpg" // Replace with actual path to your industrial hero image
                            alt="Industrial Heavy Machinery Tough Work"
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-orange-500 font-bold tracking-[0.2em] text-[10px] mb-4 uppercase">
                                <span className="w-8 h-[1px] bg-orange-500"></span>
                                Industrial Authority
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6 uppercase">
                                Global <br />
                                <span className="text-orange-600">Equipment Hub.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                                From Oil Rigs and Mining Drills to MRI Scanners. We supply certified, high-performance hardware for the world's most demanding sectors.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/products" className="bg-orange-600 text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all flex items-center gap-2 shadow-2xl">
                                    Browse Inventory <ChevronRight className="w-4 h-4" />
                                </Link>
                                <Link href="/quote" className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all">
                                    Inquire Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. TRUST BAR */}
                <div className="bg-slate-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-6">
                        {[
                            { icon: <Globe />, t: "Global Logistic", d: "Worldwide shipping" },
                            { icon: <ShieldCheck />, t: "Certified Gear", d: "ISO & OSHA Compliant" },
                            { icon: <Banknote />, t: "Financing", d: "Flexible terms" },
                            { icon: <Wrench />, t: "Repair", d: "Expert technicians" },
                            { icon: <Headset />, t: "After Sales Support", d: "24/7 Assistance" },
                            { icon: <Hammer />, t: "Installation", d: "On-site setup" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left border-r border-slate-200 last:border-r-0 hover:bg-white transition-colors">
                                <div className="text-orange-600 shrink-0">{React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}</div>
                                <div>
                                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-slate-900">{item.t}</h4>
                                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. TOPICAL AUTHORITY SECTION (SEO POWERHOUSE) */}
                <section className="py-12 bg-white border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            <div>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span> Oil & Gas
                                </h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed">Drill Bits, Mud Pumps, Truck Rigs, BOP Systems, Shale Shakers, and Iron Roughnecks.</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span> Construction
                                </h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed">Excavators, Telehandlers, Rough Terrain Cranes, Tandem Rollers, and Bulldozers.</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span> Mining
                                </h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed">Screening Equipment, Blast Hole Drills, Scraper Winches, and Roadheaders.</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full"></span> Medical
                                </h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed">MRI/CT Scanners, Dialysis Machines, Ventilators, and Surgical Imaging.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. FEATURED PRODUCTS */}
                {featuredProducts.length > 0 && (
                    <section className="py-24 px-6 bg-white overflow-hidden border-b border-slate-100">
                        <div className="max-w-7xl mx-auto relative">
                            <div className="mb-16">
                                <h2 className="text-[10px] font-black tracking-[0.3em] text-orange-600 uppercase mb-2">Inventory Spotlight</h2>
                                <p className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Premium Hardware</p>
                            </div>

                            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {featuredProducts.map((product) => (
                                    <div key={product.id} className="w-full shrink-0">
                                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                                            {/* Adjusted to match the visual size of category photos (h-[450px]) */}
                                            <div className="relative h-[450px] w-full max-w-[450px] lg:max-w-none mx-auto bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-12">
                                                <img
                                                    src={product.image}
                                                    alt={`${product.name} - ${product.brand_name} Industrial Equipment`}
                                                    className="w-full h-full object-contain drop-shadow-2xl"
                                                    loading="eager"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">{product.brand_name || 'Industrial Grade'}</span>
                                                <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-tight">{product.name}</h3>
                                                <span className="text-5xl font-black text-slate-950 tracking-tighter mb-8">{formatPrice(product.price)}</span>
                                                <p className="text-slate-600 text-lg mb-10 leading-relaxed">{product.description || "The industry benchmark for performance, reliability, and precision in field operations."}</p>
                                                <Link href={`/products/${product.slug}`} className="bg-slate-950 text-white py-5 px-10 font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-xl w-fit">
                                                    Technical Specifications
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. CATEGORIES GRID */}
                <section className="bg-slate-950 py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Shop <span className="text-orange-500">Category</span></h2>
                                <p className="text-slate-400 mt-2 font-medium">Browse specialized inventory by industrial sector.</p>
                            </div>
                            <Link href="/products" className="hidden md:flex text-white font-bold uppercase tracking-widest text-[10px] items-center gap-2 hover:text-orange-500 transition-colors">
                                Full Catalog <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {collections.map((cat) => (
                                <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group relative h-[450px] overflow-hidden rounded-xl">
                                    <img
                                        src={cat.image}
                                        alt={`Browse ${cat.name} Fleet`}
                                        className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{cat.name}</h3>
                                        <div className="w-12 h-1 bg-orange-600 mb-4 group-hover:w-24 transition-all duration-500"></div>
                                        <span className="flex items-center gap-2 text-white/60 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                                            View Category <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. COMPREHENSIVE SERVICES & SUPPORT */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16 md:text-center">
                            <h2 className="text-[10px] font-black tracking-[0.3em] text-orange-600 uppercase mb-2">Our Capabilities</h2>
                            <p className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Comprehensive Support</p>
                            <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">Beyond hardware supply, we provide robust infrastructural backing to ensure your operation runs seamlessly.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* We Provide */}
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                                    <Globe className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">We Provide</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    End-to-end procurement and logistics of heavy-duty industrial and medical equipment tailored exactly to your global project scope.
                                </p>
                            </div>
                            {/* Financing */}
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                                    <Banknote className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">Financing</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Flexible payment structures, leasing programs, and extended credit terms to help you acquire critical assets without halting cash flow.
                                </p>
                            </div>
                            {/* Repairs */}
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                                    <Wrench className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">Repairs</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Access to certified field technicians offering major overhauls, preventative maintenance, and rapid emergency repair services.
                                </p>
                            </div>
                            {/* After Sales Installation */}
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                                    <Hammer className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">After Sales & Installation</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Professional on-site assembly, integration, and round-the-clock technical support ensuring 100% operational readiness upon delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. REVIEWS */}
                <section className="py-24 bg-slate-50 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Quote className="w-12 h-12 text-orange-200 mx-auto mb-4" />
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Field-Proven Reliability</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white p-10 border border-slate-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
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

                {/* 8. NEWSLETTER */}
                <section className="py-20 px-6 bg-white">
                    <div className="max-w-7xl mx-auto bg-orange-600 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="absolute right-0 top-0 opacity-10 -rotate-12 translate-x-10 -translate-y-10">
                            <Mail className="w-64 h-64 text-white" />
                        </div>
                        <div className="relative z-10 max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Industrial Updates</h2>
                            <p className="text-orange-100 mb-8 font-medium">Get technical bulletins, inventory alerts, and specialized equipment offers directly to your inbox.</p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="work@company.com"
                                    className="flex-1 px-6 py-4 rounded-lg bg-white border-none focus:ring-2 focus:ring-slate-900 text-slate-900 font-bold"
                                    aria-label="Email for newsletter"
                                />
                                <button className="bg-slate-950 text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">
                                    Join The Fleet
                                </button>
                            </form>
                            <p className="text-[10px] text-orange-200 mt-4 font-bold uppercase tracking-widest">Global Supply Solutions. No Spam.</p>
                        </div>
                    </div>
                </section>

            </div>
        </AppLayout>
    );
};

export default Home;
