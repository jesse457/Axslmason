import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import {
    Search, ShoppingCart, Menu, X, Trash2, Plus, Minus,
    ArrowRight, Mail, PackageOpen, Loader2, User
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Toaster } from 'react-hot-toast';
// Mocked or Imported Constants
const FOOTER_LINKS = {
    shop: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products?sort=latest' },
        { name: 'Deals', href: '/deals' },
    ],
    support: [
        { name: 'Order Tracking', href: '/account/orders' },
        { name: 'Shipping Policy', href: '/shipping' },
        { name: 'Contact Us', href: '/contact' },
    ]
};

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

    const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
    const isActive = (path: string) => url === path || url.startsWith(path + '?');

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
                console.error("Search failed:", error);
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
            router.get('/products', { search: searchQuery }, {
                preserveState: true,
                onSuccess: () => setIsSearchOpen(false)
            });
        }
    };

    // Scroll Effect (Only for subtle shadow, not for transparency)
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Accessibility/Lock Scroll
    useEffect(() => {
        if (isCartDrawerOpen || isMobileMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isCartDrawerOpen, isMobileMenuOpen, isSearchOpen]);

    return (
        <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-white">
          <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: '#333',
      color: '#fff',
      borderRadius: '0.5rem',
      padding: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  }}
/>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            {/* --- GLOBAL SEARCH OVERLAY --- */}
            <div className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="bg-white px-6 md:px-10 py-10 shadow-2xl rounded-b-[1.5rem]">
                    <div className="max-w-5xl mx-auto flex items-center gap-6">
                        <Search className="w-4 h-4 text-slate-400" />
                        <form onSubmit={handleSearchSubmit} className="flex-1">
                            <input
                                autoFocus={isSearchOpen}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What are you looking for?"
                                className="w-full text-2xl md:text-2xl font-black tracking-tighter bg-transparent border-none focus:ring-0 placeholder:text-slate-200 p-0 text-slate-900 outline-none"
                            />
                        </form>
                        <button onClick={() => setIsSearchOpen(false)} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="max-w-5xl mx-auto mt-10 border-t border-slate-100 pt-8 min-h-[300px]">
                        {isSearching ? (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-400 gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Searching...</span>
                            </div>
                        ) : searchQuery.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {searchResults.map((item) => (
                                    <Link key={item.id} href={`/products/${item.slug}`} onClick={() => setIsSearchOpen(false)} className="group space-y-3">
                                        <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-100 group-hover:border-orange-200 transition-all">
                                            <img src={item.main_image || item.image} alt={item.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-500 line-clamp-1">{item.name}</h4>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">${Number(item.price).toFixed(2)}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-full mb-2">Trending Categories</span>
                                {categories.slice(0, 5).map(cat => (
                                    <Link key={cat.id} href={`/products?category=${cat.slug}`} onClick={() => setIsSearchOpen(false)} className="px-5 py-2 bg-slate-50 hover:bg-orange-500 hover:text-white rounded-full text-xs font-bold transition-all">
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- NAVIGATION (STATIC & SOLID) --- */}
            <nav className={`fixed top-0 w-full z-40 transition-all duration-300 bg-white border-b border-slate-100 ${isScrolled ? 'py-3 shadow-md' : 'py-5'}`}>
                <div className="flex items-center justify-between max-w-[1600px] mx-auto px-6 md:px-10">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 text-slate-900">
                            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl">A</div>
                            UGIMEN
                        </Link>

                        <div className="hidden lg:flex gap-10 text-[11px] font-black uppercase  text-slate-500">
                            <Link href="/" className={`hover:text-orange-500 transition-colors ${url === '/' ? 'text-orange-500' : ''}`}>Home</Link>
                            <Link href="/products" className={`hover:text-orange-500 transition-colors ${isActive('/products') ? 'text-orange-500' : ''}`}>Products</Link>
                            <Link href="/deals" className="hover:text-orange-500 transition-colors">Deals</Link>

                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8 text-slate-900">
                        <button onClick={() => setIsSearchOpen(true)} className="hover:text-orange-500 transition-all flex items-center gap-2 group">
                            <span className="text-[10px] font-black hidden xl:block tracking-[0.2em] uppercase">Search</span>
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/account" className="hover:text-orange-500 transition-all flex items-center gap-2 group">
                            <span className="text-[10px] font-black hidden xl:block tracking-[0.2em] uppercase">Account</span>
                            <User className="w-5 h-5" />
                        </Link>
                        <button onClick={() => setIsCartDrawerOpen(true)} className="hover:text-orange-500 transition-all relative group">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- CART DRAWER --- */}
            <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isCartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartDrawerOpen(false)} />
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Your Cart</h2>
                    <button onClick={() => setIsCartDrawerOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                <PackageOpen className="w-10 h-10 text-slate-200" />
                            </div>
                            <p className="font-bold text-slate-900">Your cart is empty</p>
                            <button onClick={() => setIsCartDrawerOpen(false)} className="text-orange-500 font-bold uppercase text-[10px] tracking-widest hover:underline">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-6">
                                    <div className="w-24 h-24 bg-slate-50 rounded-2xl flex-shrink-0 p-2 border border-slate-100">
                                        <img src={item.main_image || item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{item.name}</h4>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs font-black text-orange-500 uppercase tracking-widest mt-1">${Number(item.price).toFixed(2)}</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center border border-slate-200 rounded-lg">
                                                <button onClick={() => updateQuantity(item.id, item.cartQuantity - 1)} className="p-2"><Minus className="w-3 h-3" /></button>
                                                <span className="text-xs font-bold w-6 text-center">{item.cartQuantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.cartQuantity + 1)} className="p-2"><Plus className="w-3 h-3" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-8 border-t border-slate-50 bg-white">
                        <div className="flex justify-between mb-6">
                            <span className="text-sm font-bold uppercase text-slate-400">Subtotal</span>
                            <span className="text-2xl font-black">${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex justify-center items-center gap-3 hover:bg-orange-500 transition-all shadow-xl shadow-slate-100"
                        >
                            Checkout <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>

            {/* --- CONTENT --- */}
            {/* Added solid padding-top to account for the static fixed navbar */}
            <main className="flex-grow pt-[85px] md:pt-[100px]">
                {children}
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-950 text-white pt-24 pb-12 px-8">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="md:col-span-1">
                        <h3 className="text-3xl font-black tracking-tighter mb-6">AUGIMEN</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Premium professional-grade hardware and equipment. Built for longevity and extreme performance.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-8">Navigation</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-300">
                            {FOOTER_LINKS.shop.map(l => (
                                <li key={l.name}><Link href={l.href} className="hover:text-white">{l.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-8">Company</h4>
                        <ul className="space-y-4 text-sm font-bold text-slate-300">
                            {FOOTER_LINKS.support.map(l => (
                                <li key={l.name}><Link href={l.href} className="hover:text-white">{l.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-8">Newsletter</h4>
                        <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
                            <input type="email" placeholder="Your Email" className="bg-transparent border-none focus:ring-0 text-sm flex-1 px-4" />
                            <button className="bg-orange-500 p-3 rounded-xl hover:bg-orange-600 transition-all">
                                <Mail className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1600px] mx-auto border-t border-white/5 mt-20 pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <p>© {new Date().getFullYear()} AUGIMEN INDUSTRIAL. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;
