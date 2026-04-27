import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Globe, ShieldCheck, Factory, Users, Zap, Award, HardHat } from 'lucide-react';

export default function About() {
    return (
        <AppLayout>
            <Head title="About Us | Global Industrial Authority" />

            {/* Hero */}
            <section className="bg-slate-950 py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070" className="w-full h-full object-cover" alt="Industrial Facility" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-2 text-orange-500 font-bold tracking-[0.3em] text-[10px] mb-6 uppercase">
                        <span className="w-12 h-[1px] bg-orange-500"></span>
                        Est. 1998
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                        Powering Global <br/><span className="text-orange-600">Infrastructure.</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-xl font-medium leading-relaxed">
                        AXELMASON is a premier global supplier of high-performance hardware, specializing in heavy-duty sectors where failure is not an option. From the ocean floor to the surgical suite.
                    </p>
                </div>
            </section>

            {/* Stats & Mission */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="h-80 rounded-3xl overflow-hidden shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-10 bg-orange-600 rounded-3xl text-white">
                                    <ShieldCheck className="w-10 h-10 mb-6" />
                                    <h4 className="font-black uppercase text-sm tracking-[0.2em]">ISO 9001:2015 Certified</h4>
                                </div>
                            </div>
                            <div className="space-y-4 pt-16">
                                <div className="p-10 bg-slate-900 rounded-3xl text-white">
                                    <Globe className="w-10 h-10 mb-6 text-orange-500" />
                                    <h4 className="font-black uppercase text-sm tracking-[0.2em]">Global Supply Chain</h4>
                                </div>
                                <div className="h-80 rounded-3xl overflow-hidden shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-8">Built for the <br/><span className="text-orange-600 text-3xl">Toughest Environments</span></h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-10">
                                We don't just sell equipment; we provide the operational backbone for mining, energy, and healthcare. Our inventory is vetted by engineers and tested in extreme conditions to ensure zero downtime for your fleet.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { t: "Mining & Excavation", d: "Deep crust drilling and earthmoving solutions." },
                                    { t: "Oil & Gas Exploration", d: "High-pressure control and extraction hardware." },
                                    { t: "Medical Diagnostics", d: "Advanced MRI, CT, and life-support systems." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="w-2 h-2 mt-2 bg-orange-600 rounded-full shrink-0" />
                                        <div>
                                            <h4 className="font-black uppercase text-xs tracking-widest text-slate-900">{item.t}</h4>
                                            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-tighter">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
