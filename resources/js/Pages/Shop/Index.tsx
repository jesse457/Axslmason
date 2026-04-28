import React, { useState, useEffect } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import ProductCard from '@/components/ProductCard';
import { X, ChevronRight, SlidersHorizontal, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { route } from 'ziggy-js';
import * as Slider from '@radix-ui/react-slider';

// Types for Laravel Paginator
interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginatorLink[];
}

interface Props {
    products: PaginatedProducts;
    categories: any[];
    brands: any[];
    filters: {
        category?: string;
        brand?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
        page?: number;
    };
    max_db_price?: number;
}

const Index: React.FC<Props> = ({ products, categories, brands, filters, max_db_price = 1000 }) => {
    // 1. Local state for Price Slider (for smooth dragging)
    const [priceRange, setPriceRange] = useState([
        Number(filters.min_price) || 0,
        Number(filters.max_price) || Math.min(max_db_price, 1000)
    ]);

    // 2. Sync local price state if filters change externally (like 'Clear All')
    useEffect(() => {
        setPriceRange([
            Number(filters.min_price) || 0,
            Number(filters.max_price) || Math.min(max_db_price, 1000)
        ]);
    }, [filters.min_price, filters.max_price, max_db_price]);

    // 3. Centralized Filter Function
    const updateFilters = (newFilters: object) => {
        const allFilters = { ...filters, ...newFilters, page: null }; // Reset page when filters change

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
        let currentBrands = filters.brand ? filters.brand.split(',').filter(Boolean) : [];
        if (currentBrands.includes(slug)) {
            currentBrands = currentBrands.filter(b => b !== slug);
        } else {
            currentBrands.push(slug);
        }
        updateFilters({ brand: currentBrands.join(','), page: null });
    };

    const clearFilters = () => {
        router.get(route('products.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // 5. Pagination Handler
    const goToPage = (url: string | null) => {
        if (!url) return;
        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // 6. Pagination Component (Inline)
    const Pagination = ({ links, currentPage }: { links: PaginatorLink[]; currentPage: number }) => {
        // Extract only numeric page links for cleaner display
        const pageLinks = links.filter(link => link.label.match(/^\d+$/));
        const prevLink = links.find(l => l.label === '&laquo; Previous');
        const nextLink = links.find(l => l.label === 'Next &raquo;');

        if (pageLinks.length <= 1) return null;

        return (
            <div className="flex items-center justify-center gap-1 mt-12 pt-8 border-t border-gray-100">
                {/* Previous Button */}
                <button
                    onClick={() => goToPage(prevLink?.url)}
                    disabled={!prevLink?.url}
                    className={`flex items-center gap-1 px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                        !prevLink?.url
                            ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                            : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-200'
                    }`}
                >
                    <ChevronLeft className="w-3 h-3" />
                    Prev
                </button>

                {/* Page Numbers - Show smart range */}
                <div className="flex items-center gap-1">
                    {pageLinks.map((link, i) => {
                        const pageNum = parseInt(link.label);

                        // Always show first, last, current, and neighbors
                        const isFirst = pageNum === 1;
                        const isLast = pageNum === products.last_page;
                        const isCurrent = link.active;
                        const isNearCurrent = Math.abs(pageNum - currentPage) <= 1;

                        if (isFirst || isLast || isCurrent || isNearCurrent) {
                            return (
                                <button
                                    key={i}
                                    onClick={() => goToPage(link.url)}
                                    className={`w-9 h-9 text-xs font-black rounded-lg transition-all ${
                                        link.active
                                            ? 'bg-black text-white shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-100 bg-white border border-gray-200'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            );
                        }

                        // Show ellipsis for skipped pages
                        if (i > 0 && pageLinks[i - 1]) {
                            const prevNum = parseInt(pageLinks[i - 1].label);
                            if (pageNum - prevNum > 1) {
                                return <span key={`dots-${i}`} className="px-2 text-gray-400 text-xs font-black">...</span>;
                            }
                        }
                        return null;
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => goToPage(nextLink?.url)}
                    disabled={!nextLink?.url}
                    className={`flex items-center gap-1 px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                        !nextLink?.url
                            ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                            : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-200'
                    }`}
                >
                    Next
                    <ChevronRightIcon className="w-3 h-3" />
                </button>
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title="Shop | AXELMASON" />

            <div className="bg-white min-h-screen">
                {/* SORT BAR */}
                <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                    <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">SHOP ALL</h1>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                                Showing {products.from}-{products.to} of {products.total.toLocaleString()} Results
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:inline">Sort:</span>
                            <select
                                value={String(filters.sort || 'latest')}
                                onChange={(e) => updateFilters({ sort: e.target.value })}
                                className="border-none bg-gray-50 text-sm font-bold rounded-lg focus:ring-2 focus:ring-orange-500 py-2 pl-3 pr-10 cursor-pointer"
                            >
                                <option value="latest">Newest</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="name_a_z">Name: A to Z</option>
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
                                    {(filters.category || filters.brand || filters.min_price || filters.max_price) && (
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
                                                    {cat.products_count > 0 && (
                                                        <span className="ml-auto text-[10px] text-gray-400 font-bold">({cat.products_count})</span>
                                                    )}
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
                                            max={Math.max(max_db_price, 1000)}
                                            step={10}
                                            onValueChange={(vals) => setPriceRange(vals)}
                                            onValueCommit={(vals) => updateFilters({
                                                min_price: vals[0].toString(),
                                                max_price: vals[1].toString()
                                            })}
                                        >
                                            <Slider.Track className="bg-gray-100 relative grow rounded-full h-[3px]">
                                                <Slider.Range className="absolute bg-black rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-black rounded-full focus:outline-none hover:scale-125 transition-transform cursor-pointer shadow-sm" />
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-black rounded-full focus:outline-none hover:scale-125 transition-transform cursor-pointer shadow-sm" />
                                        </Slider.Root>
                                        <div className="flex justify-between mt-4 text-[11px] font-black text-gray-900">
                                            <span>${priceRange[0].toLocaleString()}</span>
                                            <span>${priceRange[1].toLocaleString()}+</span>
                                        </div>
                                    </div>
                                </section>

                                {/* BRANDS (Checkboxes) */}
                                <section>
                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Brand</h4>
                                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {brands.map((brand) => {
                                            const brandSlugs = filters.brand?.split(',').filter(Boolean) || [];
                                            const isChecked = brandSlugs.includes(brand.slug);
                                            return (
                                                <label key={brand.id} className="flex items-center group cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => handleBrandToggle(brand.slug)}
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer accent-black"
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
                            {products.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                        {products.data.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {/* Pagination Controls */}
                                    {products.last_page > 1 && (
                                        <Pagination links={products.links} currentPage={products.current_page} />
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <X className="w-10 h-10 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900">No matching products</h3>
                                    <p className="text-sm text-gray-500 mt-1 mb-6">Try removing some filters to see more results.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="bg-black text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
                                    >
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
