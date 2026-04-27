import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Mail, Phone, MapPin, Globe, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
    return (
        <AppLayout>
            <Head title="Contact Technical Sales | AXELMASON" />
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-1">
                            <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">Contact <br/><span className="text-orange-600">Hub.</span></h1>
                            <p className="text-slate-500 font-medium mb-12 text-lg">Reach our specialized engineering and logistics teams for custom fleet quotes.</p>

                            <div className="space-y-10">
                                <div className="flex gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 text-orange-600"><Mail /></div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Technical Sales</p>
                                        <p className="font-black text-slate-900 text-lg">sales@axelmason.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 text-orange-600"><Globe /></div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Global Logistics</p>
                                        <p className="font-black text-slate-900 text-lg">+1 (800) AUGI-FREIGHT</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
                            <form className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                                    <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-orange-500 font-bold" placeholder="Industrial Lead" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Organization</label>
                                    <input type="text" className="w-full bg-slate-50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-orange-500 font-bold" placeholder="Company Name" />
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sector</label>
                                    <select className="w-full bg-slate-50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-orange-500 font-bold appearance-none">
                                        <option>Oil & Gas Exploration</option>
                                        <option>Mining & Construction</option>
                                        <option>Medical Systems</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project Requirements</label>
                                    <textarea rows={6} className="w-full bg-slate-50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-orange-500 font-bold" placeholder="Provide technical specifications..."></textarea>
                                </div>
                                <button className="md:col-span-2 bg-slate-950 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-orange-600 transition-all flex justify-center items-center gap-4 shadow-xl">
                                    Dispatch Inquiry <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
