// resources/js/Pages/Deals.tsx
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Deals({ deals = [] }) {
    return (
        <AppLayout>
            <Head title="Industrial Spotlight Deals | AXELMASON" />
            <section className="bg-slate-950 py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-10">
                    <Zap className="w-64 h-64 text-orange-500" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <span className="bg-orange-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Flash Clearance</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">Inventory <br/><span className="text-orange-600">Spotlight.</span></h1>
                    <p className="text-slate-400 font-bold max-w-xl text-lg uppercase tracking-tight leading-relaxed">
                        Secure high-performance hardware at industrial-scale savings. Limited-time certified unit clearance.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Example Deal Card */}
                        <div className="group border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all">
                            <div className="aspect-square bg-slate-50 relative p-10">
                                <span className="absolute top-6 left-6 bg-slate-950 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase">Save 25%</span>
                                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Excavator Hydraulic Unit</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-2xl font-black text-slate-900">$12,450.00</span>
                                    <span className="text-sm font-bold text-slate-300 line-through">$16,000.00</span>
                                </div>
                                <Link href="#" className="w-full bg-slate-950 text-white py-4 rounded-xl flex justify-center items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all">
                                    View Details <ArrowRight className="w-4 h-4"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
