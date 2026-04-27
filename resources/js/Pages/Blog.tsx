import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

export default function Blog() {
    const bulletins = [
        { id: 1, cat: 'Energy', title: 'Managing High-Pressure BOP Systems in Shale Formations', date: 'Oct 20, 2023', img: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=800' },
        { id: 2, cat: 'Safety', title: 'ISO 45001: New Standards for Heavy Excavation Safety', date: 'Oct 15, 2023', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800' },
        { id: 3, cat: 'Medical', title: 'Liquid Helium Shortages: Impact on MRI Cooling Units', date: 'Oct 05, 2023', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800' }
    ];

    return (
        <AppLayout>
            <Head title="Technical Bulletins | AXELMASON Industrial Blog" />
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                        <div>
                            <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter">Technical <span className="text-orange-600">Bulletins.</span></h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Field Analysis & Equipment Intelligence</p>
                        </div>
                        <div className="flex gap-3">
                            {['All', 'Energy', 'Mining', 'Medical'].map(f => (
                                <button key={f} className="px-6 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">{f}</button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {bulletins.map(post => (
                            <Link key={post.id} href="#" className="group">
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-8">
                                    <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                                    <div className="absolute top-8 left-8 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-xl">
                                        {post.cat}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                    <Clock className="w-3 h-3" /> {post.date}
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] group-hover:text-orange-600 transition-colors">
                                    {post.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
