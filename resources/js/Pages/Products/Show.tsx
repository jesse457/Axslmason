import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { useCart } from '@/contexts/CartContext';
import {
    Star, ShoppingCart, Check, Minus, Plus, ChevronRight,
    Truck, ShieldCheck, Wrench, AlertCircle, ArrowLeft, ArrowRight
} from 'lucide-react';

interface Props {
    product: any;
    relatedProducts: any[]; // Now using this
}

const Show: React.FC<Props> = ({ product, relatedProducts = [] }) => {
    const { addToCart } = useCart();

    // Image logic: Use the 'gallery' array sent from backend
    const galleryImages = product?.gallery || [product?.image];
    const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

    // Update selected image if product changes (e.g., clicking a related product)
    useEffect(() => {
        if (galleryImages.length > 0) {
            setSelectedImage(galleryImages[0]);
        }
    }, [product?.id]);

    const categoryName = product?.category?.name || 'Shop';
    const categorySlug = product?.category?.slug || '';
    const brandName = product?.brand?.name || '';
    const featuresList = product?.features || [];
    const inStock = product?.stock_quantity > 0;
    const maxStock = product?.stock_quantity || 0;

    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (!product || !inStock) return;
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
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
            <Head title={`${product.name} | AUGIMEN`} />

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
                                            <img src={img} className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT: CONTENT */}
                        <div className="flex flex-col">
                            <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                                {brandName || "Industrial Series"}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-none mb-6">
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

                            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
                                {product.description || "High-performance hardware engineered for precision and longevity in demanding environments."}
                            </p>

                            {/* SPECS */}
                            {featuresList.length > 0 && (
                                <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {featuresList.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-700">
                                            <Check className="w-4 h-4 text-orange-600" /> {feature}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* BUYING BOX */}
                            <div className="p-8 bg-slate-950 rounded-2xl text-white">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment Status</span>
                                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded ${inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {inStock ? 'In Stock' : 'Unavailable'}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center justify-between bg-white/10 rounded-lg px-6 py-4 sm:w-40">
                                        <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="text-white/50 hover:text-white"><Minus className="w-4 h-4" /></button>
                                        <span className="font-black">{quantity}</span>
                                        <button onClick={() => setQuantity(q => Math.min(maxStock, q+1))} className="text-white/50 hover:text-white"><Plus className="w-4 h-4" /></button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!inStock || added}
                                        className={`flex-1 py-4 px-8 rounded-lg font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${
                                            added ? 'bg-emerald-600 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {added ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingCart className="w-4 h-4" /> Add to Fleet</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RELATED PRODUCTS */}
                    {relatedProducts.length > 0 && (
                        <section className="mt-32 pt-20 border-t border-slate-100">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-[10px] font-black tracking-[0.3em] text-orange-600 uppercase mb-2">Continue Browsing</h2>
                                    <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Related Equipment</p>
                                </div>
                                <Link href="/products" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-orange-600">
                                    View All <ArrowRight className="w-3 h-3" />
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
