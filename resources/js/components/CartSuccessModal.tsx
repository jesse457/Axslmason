import React from 'react';
import { X, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    product: any;
}

const CartSuccessModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <Check className="w-6 h-6" />
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <h3 className="text-2xl font-black tracking-tighter text-slate-900 mb-2">Added to Cart!</h3>
                    <p className="text-slate-500 text-sm font-medium mb-8">Excellent choice. This item is now in your basket.</p>

                    <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                        <div className="w-20 h-20 bg-white rounded-xl p-2 border border-slate-100 flex-shrink-0">
                            <img src={product.main_image || product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 truncate">{product.name}</h4>
                            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mt-1">
                                ${Number(product.price).toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={onClose}
                            className="py-4 rounded-2xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
                        >
                            Continue
                        </button>
                        <Link
                            href="/checkout"
                            className="py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-500 transition-all shadow-lg shadow-slate-200"
                        >
                            Checkout <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSuccessModal;
