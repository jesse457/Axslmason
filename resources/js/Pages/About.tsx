import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Globe, ShieldCheck, Factory, Users, Zap, Award, HardHat } from 'lucide-react';

export default function About() {
    return (
        <AppLayout>
            <Head title="About Us | Global Industrial Authority" />

            {/* Hero Section */}
            <section className="bg-slate-950 py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Background updated to the tough machinery image from Homepage */}
                    <img
                        src="https://images.unsplash.com/photo-1541888087618-20aac2a2eeb8?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30 grayscale"
                        alt="Heavy Industrial Operations"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-2 text-orange-500 font-bold tracking-[0.3em] text-[10px] mb-6 uppercase">
                        <span className="w-12 h-[1px] bg-orange-500"></span>
                        Est. 1998
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                        Powering Global <br/><span className="text-orange-600">Infrastructure.</span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl text-xl font-medium leading-relaxed">
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
                                <div className="h-80 rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                                    <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800" className="w-full h-full object-cover" alt="Industrial Work" />
                                </div>
                                <div className="p-10 bg-orange-600 rounded-3xl text-white shadow-xl shadow-orange-900/20">
                                    <ShieldCheck className="w-10 h-10 mb-6" />
                                    <h4 className="font-black uppercase text-sm tracking-[0.2em]">ISO 9001:2015 Certified</h4>
                                </div>
                            </div>
                            <div className="space-y-4 pt-16">
                                <div className="p-10 bg-slate-950 rounded-3xl text-white shadow-xl shadow-slate-900/40">
                                    <Globe className="w-10 h-10 mb-6 text-orange-500" />
                                    <h4 className="font-black uppercase text-sm tracking-[0.2em]">Global Supply Chain</h4>
                                </div>
                                <div className="h-80 rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                                    <img src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800" className="w-full h-full object-cover" alt="Machinery" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-8">Built for the <br/><span className="text-orange-600 text-3xl">Toughest Environments</span></h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
                                We don't just sell equipment; we provide the operational backbone for mining, energy, and healthcare. Our inventory is vetted by engineers and tested in extreme conditions to ensure zero downtime for your fleet.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { t: "Mining & Excavation", d: "Deep crust drilling and earthmoving solutions." },
                                    { t: "Oil & Gas Exploration", d: "High-pressure control and extraction hardware." },
                                    { t: "Medical Diagnostics", d: "Advanced MRI, CT, and life-support systems." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors">
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

            {/* Core Values / Capability */}
            <section className="bg-slate-50 py-24 px-6 border-y border-slate-200">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter">The AXELMASON Standard</h2>
                </div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Zap />, t: "Rapid Logistics", d: "Global deployment capabilities reaching even the most remote extraction sites." },
                        { icon: <Award />, t: "Certified Gear", d: "Every piece of hardware in our fleet meets or exceeds OSHA and ISO standards." },
                        { icon: <HardHat />, t: "Site Integration", d: "Full on-site setup and installation services to guarantee operational start." }
                    ].map((val, i) => (
                        <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                {React.cloneElement(val.icon as React.ReactElement, { className: "w-8 h-8" })}
                            </div>
                            <h4 className="font-black uppercase text-sm tracking-widest text-slate-900 mb-4">{val.t}</h4>
                            <p className="text-xs text-slate-500 font-bold uppercase leading-relaxed tracking-tighter">{val.d}</p>
                        </div>
                    ))}
                </div>
            </section>
       
        </AppLayout>
    );
}
