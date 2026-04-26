import React , { useState, useEffect }  from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Star, Tag ,Check} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }: { product: any }) => {
    // SALE LOGIC
    const currentPrice = Number(product.price);
    const originalPrice = Number(product.original_price);
    const isOnSale = originalPrice > 0 && originalPrice > currentPrice;
        const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const isInStock = product.stock_quantity > 0;
  const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isInStock) return;

        addToCart(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
    return (
        <Link
            href={`/products/${product.slug}`}
            className="group block bg-white border border-slate-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500"
        >
            {/* Image Wrapper */}
            <div className="relative aspect-square bg-slate-50 overflow-hidden flex items-center justify-center p-8">

                {/* SALE BADGE */}
                {isOnSale && (
                    <div className="absolute top-3 left-3 z-10">
                        <div className="bg-orange-600 text-white px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                            <Tag className="w-2.5 h-2.5" /> Sale
                        </div>
                    </div>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-2.5 h-2.5 fill-orange-500 text-orange-500" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Premium Grade</span>
                </div>

                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-3 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-end justify-between gap-2">
                    <div className="flex flex-col">
                        {isOnSale && (
                            <span className="text-[10px] text-slate-400 line-through font-bold decoration-orange-600/30">
                                ${originalPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="text-lg font-black text-slate-950 leading-none">
                            ${currentPrice.toFixed(2)}
                        </span>
                    </div>

                      <button
                        onClick={handleAddToCart}
                        disabled={!isInStock || added}
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all border ${
                            !isInStock ? 'bg-gray-50 text-gray-300' :
                            added ? 'bg-green-500 text-white' : 'bg-white hover:bg-orange-500 hover:text-white'
                        }`}
                    >
                        {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
