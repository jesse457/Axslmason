import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import ProductCard from '@/components/ProductCard';
import { X, ChevronRight, SlidersHorizontal } from 'lucide-react';
import {route} from 'ziggy-js'
import * as Slider from '@radix-ui/react-slider';



interface Props {
    products: any[];
    categories: any[];
    brands: any[];
    filters: {
        category?: string;
        brand?: string; // Stored as comma-separated: "nike,adidas"
        min_price?: string;
        max_price?: string;
        sort?: string;
    };
}

const Index: React.FC<Props> = ({ products, categories, brands, filters }) => {
    // 1. Local state for Price Slider (for smooth dragging)
    const [priceRange, setPriceRange] = useState([
        Number(filters.min_price) || 0,
        Number(filters.max_price) || 1000
    ]);

    // 2. Sync local price state if filters change externally (like 'Clear All')
    useEffect(() => {
        setPriceRange([
            Number(filters.min_price) || 0,
            Number(filters.max_price) || 1000
        ]);
    }, [filters.min_price, filters.max_price]);

    // 3. Centralized Filter Function
    const updateFilters = (newFilters: object) => {
        const allFilters = { ...filters, ...newFilters };

        // Remove null/empty values so they don't clutter the URL
        const cleanedFilters = Object.keys(allFilters).reduce((acc: any, key) => {
            const value = allFilters[key as keyof typeof allFilters];
            if (value !== null && value !== undefined && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});

        router.get(route('products.index'), cleanedFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // 4. Multi-select logic for Brands (Amazon style)
    const handleBrandToggle = (slug: string) => {
        let currentBrands = filters.brand ? filters.brand.split(',') : [];
        if (currentBrands.includes(slug)) {
            currentBrands = currentBrands.filter(b => b !== slug);
        } else {
            currentBrands.push(slug);
        }
        updateFilters({ brand: currentBrands.join(',') });
    };

    const clearFilters = () => {
        router.get(route('products.index'), {});
    };

    return (
        <AppLayout>
            <Head title="Shop | Augimen" />

            <div className="bg-white min-h-screen">
                {/* SORT BAR */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">SHOP ALL</h1>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                                {products.length} Results Found
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort:</span>
                          <select
    value={String(filters.sort || 'latest')} // <-- Add String() wrapper here
    onChange={(e) => updateFilters({ sort: e.target.value })}
    className="border-none bg-gray-50 text-sm font-bold rounded-lg focus:ring-2 focus:ring-orange-500 py-2 pl-3 pr-10"
>
                                <option value="latest">Newest</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 py-10">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* SIDEBAR */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="sticky top-28 space-y-10">

                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 flex items-center gap-2">
                                        <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" /> Filter By
                                    </h3>
                                    {Object.keys(filters).length > 0 && (
                                        <button onClick={clearFilters} className="text-[10px] font-black text-orange-600 hover:underline">
                                            CLEAR ALL
                                        </button>
                                    )}
                                </div>

                                {/* CATEGORIES (Amazon-style List) */}
                                <section>
                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Department</h4>
                                    <ul className="space-y-2.5">
                                        <li>
                                            <button
                                                onClick={() => updateFilters({ category: null })}
                                                className={`text-sm flex items-center gap-2 transition-all ${!filters.category ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-black'}`}
                                            >
                                                <ChevronRight className={`w-3 h-3 ${!filters.category ? 'opacity-100' : 'opacity-0'}`} />
                                                All Departments
                                            </button>
                                        </li>
                                        {categories.map((cat) => (
                                            <li key={cat.id}>
                                                <button
                                                    onClick={() => updateFilters({ category: cat.slug })}
                                                    className={`text-sm flex items-center gap-2 transition-all w-full text-left ${filters.category === cat.slug ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-black'}`}
                                                >
                                                    <ChevronRight className={`w-3 h-3 ${filters.category === cat.slug ? 'opacity-100' : 'opacity-0'}`} />
                                                    {cat.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* PRICE RANGE SLIDER */}
                                <section>
                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Price Range</h4>
                                    <div className="px-2">
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-5"
                                            value={priceRange}
                                            max={2000}
                                            step={10}
                                            onValueChange={(vals) => setPriceRange(vals)}
                                            onValueCommit={(vals) => updateFilters({ min_price: vals[0], max_price: vals[1] })}
                                        >
                                            <Slider.Track className="bg-gray-100 relative grow rounded-full h-[3px]">
                                                <Slider.Range className="absolute bg-black rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-black rounded-full focus:outline-none hover:scale-125 transition-transform cursor-pointer" />
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-black rounded-full focus:outline-none hover:scale-125 transition-transform cursor-pointer" />
                                        </Slider.Root>
                                        <div className="flex justify-between mt-4 text-[11px] font-black text-gray-900">
                                            <span>${priceRange[0]}</span>
                                            <span>${priceRange[1]}+</span>
                                        </div>
                                    </div>
                                </section>

                                {/* BRANDS (Checkboxes) */}
                                <section>
                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Brand</h4>
                                    <div className="space-y-3">
                                        {brands.map((brand) => {
                                            const isChecked = filters.brand?.split(',').includes(brand.slug);
                                            return (
                                                <label key={brand.id} className="flex items-center group cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked || false}
                                                        onChange={() => handleBrandToggle(brand.slug)}
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                                                    />
                                                    <span className={`ml-3 text-sm transition-colors ${isChecked ? 'font-bold text-black' : 'text-gray-500 group-hover:text-black'}`}>
                                                        {brand.name}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </section>
                            </div>
                        </aside>

                        {/* PRODUCT GRID */}
                        <main className="flex-1">
                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <X className="w-10 h-10 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900">No matching products</h3>
                                    <p className="text-sm text-gray-500 mt-1 mb-6">Try removing some filters to see more results.</p>
                                    <button onClick={clearFilters} className="bg-black text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest">
                                        Clear Everything
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
