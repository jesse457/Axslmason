// resources/js/Pages/Quote.tsx
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { ClipboardList, FileText, Send } from 'lucide-react';

export default function Quote() {
    return (
        <AppLayout>
            <Head title="Request Technical Quote | AXELMASON Industrial" />
            <section className="py-24 px-6 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16 text-center">
                        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <ClipboardList className="w-10 h-10" />
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">Industrial <span className="text-orange-600">Proposal.</span></h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Technical Specifications & Pricing Request</p>
                    </div>

                    <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
                        <form className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Location (Global)</label>
                                <input type="text" className="w-full bg-slate-50 border-none rounded-xl p-5 font-bold focus:ring-2 focus:ring-orange-600" placeholder="e.g. North Sea Offshore" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Lead Time</label>
                                <select className="w-full bg-slate-50 border-none rounded-xl p-5 font-bold focus:ring-2 focus:ring-orange-600 appearance-none">
                                    <option>Immediate Dispatch</option>
                                    <option>Next 30 Days</option>
                                    <option>Strategic Planning (90+ Days)</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Equipment Fleet Requirements</label>
                                <textarea rows={8} className="w-full bg-slate-50 border-none rounded-xl p-5 font-bold focus:ring-2 focus:ring-orange-600" placeholder="List item names, quantities, and required technical certifications (ISO/OSHA/ATEX)..."></textarea>
                            </div>
                            <div className="md:col-span-2 flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <FileText className="w-6 h-6 text-slate-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upload Project Tender / RFQ (PDF)</span>
                                <input type="file" className="hidden" id="file" />
                                <label htmlFor="file" className="ml-auto bg-white px-4 py-2 rounded-lg border border-slate-200 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-all">Browse</label>
                            </div>
                            <button className="md:col-span-2 bg-slate-950 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-orange-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-4">
                                Dispatch Proposal Request <Send className="w-4 h-4"/>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
