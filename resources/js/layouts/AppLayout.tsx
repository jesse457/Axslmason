import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import {
    Search,
    ShoppingCart,
    Menu,
    X,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    Mail,
    PackageOpen,
    Loader2,
    User,
    Zap,
    ChevronRight,
    ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
    children: React.ReactNode;
}

interface PageProps {
    auth: { user: any };
    categories?: Array<{ id: number; name: string; slug: string }>;
    [key: string]: any;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { url, props } = usePage<PageProps>();
    const categories = props.categories || [];

    // UI States
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Global Search States
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } =
        useCart();

    // Helper to determine active links
    const isActive = (path: string) => url === path;
    const isPrefixActive = (path: string) => url.startsWith(path);

    // --- LIVE GLOBAL SEARCH LOGIC ---
    useEffect(() => {
        const fetchResults = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await axios.get(`/search?q=${searchQuery}`);
                setSearchResults(response.data.products || []);
            } catch (error) {
                console.error('Search failed:', error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchResults();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(
                '/products',
                { search: searchQuery },
                {
                    preserveState: true,
                    onSuccess: () => setIsSearchOpen(false),
                },
            );
        }
    };

    // --- SCROLL EFFECT ---
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- ACCESSIBILITY / SCROLL LOCK ---
    useEffect(() => {
        if (isCartDrawerOpen || isMobileMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isCartDrawerOpen, isMobileMenuOpen, isSearchOpen]);

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white">
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#0f172a', // slate-950
                        color: '#fff',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                    },
                }}
            />

            {/* --- GLOBAL SEARCH OVERLAY --- */}
            <div
                className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${isSearchOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            >
                <div className="rounded-b-[2rem] bg-white px-6 py-10 shadow-2xl md:px-10">
                    <div className="mx-auto flex max-w-5xl items-center gap-6">
                        <Search className="h-6 w-6 text-orange-500" />
                        <form onSubmit={handleSearchSubmit} className="flex-1">
                            <input
                                autoFocus={isSearchOpen}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search industrial equipment..."
                                className="w-full border-none bg-transparent p-0 text-2xl font-black tracking-tighter text-slate-900 uppercase outline-none placeholder:text-slate-200 focus:ring-0 md:text-4xl"
                            />
                        </form>
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="rounded-full bg-slate-50 p-4 text-slate-600 transition-all hover:bg-slate-100"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="mx-auto mt-10 min-h-[300px] max-w-5xl border-t border-slate-100 pt-8">
                        {isSearching ? (
                            <div className="flex h-40 flex-col items-center justify-center gap-4 text-slate-400">
                                <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase">
                                    Querying Database...
                                </span>
                            </div>
                        ) : searchQuery.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {searchResults.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/products/${item.slug}`}
                                        onClick={() => setIsSearchOpen(false)}
                                        className="group space-y-4"
                                    >
                                        <div className="flex aspect-square items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all group-hover:border-orange-200 group-hover:shadow-xl">
                                            <img
                                                src={
                                                    item.main_image ||
                                                    item.image
                                                }
                                                alt={item.name}
                                                className="max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="line-clamp-1 text-sm font-black tracking-tighter text-slate-900 uppercase group-hover:text-orange-500">
                                                {item.name}
                                            </h4>
                                            <p className="mt-1 text-xs font-black tracking-widest text-slate-400 uppercase">
                                                ${Number(item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-start gap-4">
                                <span className="mb-2 text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
                                    Trending Categories
                                </span>
                                <div className="flex flex-wrap gap-3">
                                    {categories.slice(0, 6).map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/products?category=${cat.slug}`}
                                            onClick={() =>
                                                setIsSearchOpen(false)
                                            }
                                            className="rounded-full border border-slate-100 bg-slate-50 px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

           {/* --- NAVIGATION --- */}
<nav
    className={`fixed top-0 z-40 w-full border-b border-slate-100 bg-white transition-all duration-300 ${isScrolled ? 'py-3 shadow-lg shadow-slate-100/50' : 'py-5'}`}
>
    <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-10">
            {/* Logo Wrapper */}
            <Link href="/" className="flex items-center gap-2">
                <div className="flex h-15 w-32 items-center justify-center overflow-hidden">
                    <img
                        src="/assets/axel.png"
                        alt="AUGIMEN Logo"
                        /* mix-blend-multiply removes white backgrounds if the PNG is not transparent */
                        className="h-full w-auto scale-[2.5] transform object-contain mix-blend-multiply"
                    />
                </div>
            </Link>

            {/* Desktop Links - Updated with About, Blog, Contact */}
            <div className="hidden items-center gap-6 text-[10px] font-black tracking-widest text-slate-400 uppercase lg:flex">
                <Link
                    href="/"
                    className={`transition-colors hover:text-orange-600 ${isActive('/') ? 'text-slate-900' : ''}`}
                >
                    Home
                </Link>
                <Link
                    href="/products"
                    className={`transition-colors hover:text-orange-600 ${isPrefixActive('/products') ? 'text-slate-900' : ''}`}
                >
                    Inventory
                </Link>
                <Link
                    href="/deals"
                    className={`transition-colors hover:text-orange-600 ${isActive('/deals') ? 'text-slate-900' : ''}`}
                >
                    <span className="flex items-center gap-1 text-orange-600">
                        <Zap className="h-3 w-3 fill-orange-600" /> Deals
                    </span>
                </Link>
                <Link
                    href="/about"
                    className={`transition-colors hover:text-orange-600 ${isActive('/about') ? 'text-slate-900' : ''}`}
                >
                    About
                </Link>
                <Link
                    href="/blog"
                    className={`transition-colors hover:text-orange-600 ${isActive('/blog') ? 'text-slate-900' : ''}`}
                >
                    Bulletins
                </Link>
                <Link
                    href="/contact"
                    className={`transition-colors hover:text-orange-600 ${isActive('/contact') ? 'text-slate-900' : ''}`}
                >
                    Contact
                </Link>
            </div>
        </div>

        <div className="flex items-center gap-6">
            {/* Quote Button (Desktop) */}
            <Link
                href="/quote"
                className="hidden rounded-xl bg-slate-950 px-8 py-4 text-[10px] font-black tracking-[0.2em] text-white uppercase shadow-xl shadow-slate-200 transition-all hover:bg-orange-600 md:flex"
            >
                Request Quote
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-5 text-slate-900 md:border-l md:border-slate-200 md:pl-6">
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="transition-all hover:text-orange-600"
                >
                    <Search className="h-5 w-5" />
                </button>
                <Link
                    href="/account"
                    className="hidden transition-all hover:text-orange-600 md:block"
                >
                    <User className="h-5 w-5" />
                </Link>
                <button
                    onClick={() => setIsCartDrawerOpen(true)}
                    className="group relative transition-all hover:text-orange-600"
                >
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[9px] font-black text-white shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </button>

                {/* Mobile Hamburger */}
                <button
                    className="-mr-2 p-2 text-slate-900 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>
        </div>
    </div>
</nav>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div
                className={`fixed inset-0 z-50 bg-slate-950 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col lg:hidden`}
            >
                <div className="flex items-center justify-between border-b border-white/10 p-6">
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 text-3xl font-black tracking-tighter text-white"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-2xl text-white">
                            A
                        </div>
                        UGIMEN
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-white"
                    >
                        <X className="h-8 w-8" />
                    </button>
                </div>
                <div className="flex flex-1 flex-col gap-8 overflow-y-auto p-8">
                    <div className="flex flex-col gap-6 text-2xl font-black tracking-tighter text-white uppercase">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Full Inventory
                        </Link>
                        <Link
                            href="/deals"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 text-orange-500"
                        >
                            <Zap className="h-6 w-6 fill-orange-500" />{' '}
                            Spotlight Deals
                        </Link>
                        <Link
                            href="/blog"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Technical Bulletins
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact Sales
                        </Link>
                    </div>
                    <div className="mt-auto border-t border-white/10 pt-8">
                        <Link
                            href="/quote"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex w-full items-center justify-center rounded-xl bg-orange-600 px-8 py-5 text-[12px] font-black tracking-[0.2em] text-white uppercase"
                        >
                            Request Custom Quote
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- CART DRAWER --- */}
            <div
                className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isCartDrawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setIsCartDrawerOpen(false)}
            />
            <div
                className={`fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-500 ease-out sm:w-[480px] ${isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-8">
                    <h2 className="flex items-center gap-3 text-2xl font-black tracking-tighter uppercase">
                        <ShoppingCart className="h-6 w-6 text-orange-600" />{' '}
                        Active Order
                    </h2>
                    <button
                        onClick={() => setIsCartDrawerOpen(false)}
                        className="rounded-full border border-transparent p-2 transition-colors hover:border-slate-200 hover:bg-white"
                    >
                        <X className="h-6 w-6 text-slate-400 hover:text-slate-900" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {cartItems.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-100 bg-slate-50">
                                <PackageOpen className="h-10 w-10 text-slate-300" />
                            </div>
                            <div>
                                <p className="mb-2 text-xl font-black tracking-tighter text-slate-900 uppercase">
                                    No hardware selected
                                </p>
                                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                                    Your procurement list is empty.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCartDrawerOpen(false)}
                                className="mt-4 rounded-xl bg-slate-950 px-8 py-4 text-[10px] font-black tracking-widest text-white uppercase transition-all hover:bg-orange-600"
                            >
                                Browse Inventory
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="group flex gap-6">
                                    <div className="h-24 w-24 flex-shrink-0 rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-colors group-hover:border-orange-200">
                                        <img
                                            src={item.main_image || item.image}
                                            alt={item.name}
                                            className="h-full w-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <div className="mb-1 flex items-start justify-between">
                                            <h4 className="line-clamp-2 pr-4 text-sm leading-tight font-black tracking-tight text-slate-900 uppercase">
                                                {item.name}
                                            </h4>
                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="shrink-0 text-slate-300 transition-colors hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="mb-3 text-sm font-black tracking-widest text-orange-600 uppercase">
                                            ${Number(item.price).toFixed(2)}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.cartQuantity -
                                                                1,
                                                        )
                                                    }
                                                    className="p-2 text-slate-400 hover:text-slate-900"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-black">
                                                    {item.cartQuantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.cartQuantity +
                                                                1,
                                                        )
                                                    }
                                                    className="p-2 text-slate-400 hover:text-slate-900"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-slate-100 bg-slate-50 p-8">
                        <div className="mb-8 flex items-end justify-between">
                            <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
                                Order Subtotal
                            </span>
                            <span className="text-3xl font-black tracking-tighter text-slate-900">
                                ${cartTotal.toFixed(2)}
                            </span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="flex w-full items-center justify-center gap-4 rounded-2xl bg-slate-950 py-6 text-[11px] font-black tracking-[0.3em] text-white uppercase shadow-xl shadow-slate-200 transition-all hover:bg-orange-600"
                        >
                            Proceed to Checkout{' '}
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <p className="mt-4 text-center text-[9px] font-black tracking-widest text-slate-400 uppercase">
                            Shipping and taxes calculated at checkout.
                        </p>
                    </div>
                )}
            </div>

            {/* --- MAIN CONTENT --- */}
            {/* Added solid padding-top to account for the static fixed navbar */}
            <main className="flex-grow pt-[85px] md:pt-[100px]">
                {children}
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-950 px-8 pt-24 pb-12 text-white">
                <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="flex h-10 w-35 items-center justify-center overflow-hidden">
                            <img
                                src="/assets/axel.png"
                                alt="AXELMANSON Logo"
                                className="h-full w-auto scale-[4.0] transform object-contain brightness-[100%] contrast-[100%] hue-rotate-[10deg] saturate-[5000%] sepia"
                                style={{
                                    filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(98%) contrast(102%)',
                                }}
                            />
                        </div>
                        <p className="max-w-xs text-xs leading-relaxed font-bold tracking-tight text-slate-400 uppercase">
                            Global hub for certified heavy-duty industrial and
                            medical hardware. Engineering reliability since
                            1998.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-8 text-[10px] font-black tracking-[0.3em] text-orange-500 uppercase">
                            Inventory
                        </h4>
                        <ul className="space-y-5 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                            <li>
                                <Link
                                    href="/products"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/deals"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    Spotlight Deals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    Technical Bulletins
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-8 text-[10px] font-black tracking-[0.3em] text-orange-500 uppercase">
                            Support & Legal
                        </h4>
                        <ul className="space-y-5 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                            <li>
                                <Link
                                    href="/about"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    About the Fleet
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    Technical Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping-policy"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/refunds-policy"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    Privacy Protocol
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-and-conditions"
                                    className="flex items-center gap-2 transition-colors hover:text-white"
                                >
                                    <ChevronRight className="h-3 w-3 text-orange-600" />{' '}
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-8 text-[10px] font-black tracking-[0.3em] text-orange-500 uppercase">
                            Industrial Updates
                        </h4>
                        <p className="mb-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Receive supply chain alerts.
                        </p>
                        <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                            <input
                                type="email"
                                placeholder="work@company.com"
                                className="flex-1 border-none bg-transparent px-4 text-xs font-bold text-white placeholder:text-slate-500 focus:ring-0"
                            />
                            <button className="rounded-xl bg-orange-600 p-4 transition-all hover:bg-orange-500">
                                <Mail className="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-20 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] font-black tracking-widest text-slate-600 uppercase md:flex-row">
                    <p>
                        © {new Date().getFullYear()} AXELMANSON INDUSTRIAL. ALL
                        RIGHTS RESERVED.
                    </p>
                    <p className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-orange-600" /> ISO
                        9001 COMPLIANT
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
