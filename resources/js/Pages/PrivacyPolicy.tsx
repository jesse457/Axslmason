// resources/js/Pages/PrivacyPolicy.tsx
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { route } from 'ziggy-js';

const PolicySection = ({ icon: Icon, title, text }) => (
    <div className="flex gap-8 py-10 border-b border-slate-50 last:border-0 group">
        <div className="shrink-0 w-12 h-12 bg-slate-50 text-slate-400 group-hover:text-orange-600 group-hover:bg-orange-50 rounded-xl flex items-center justify-center transition-all">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-slate-900">{title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{text}</p>
        </div>
    </div>
);

export default function PrivacyPolicy() {
    return (
        <AppLayout>
            <Head title="Privacy Protocol | AXELMASON Industrial" />
            <section className="py-24 px-6 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 inline-block">Security Protocol</span>
                    <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter mb-16">Privacy <span className="text-orange-600">Policy.</span></h1>

                    <div className="space-y-4">
                        <PolicySection
                            icon={Lock}
                            title="1. Data Encryption"
                            text="All procurement data and technical specifications are protected under 256-bit AES industrial encryption protocols. Your site locations and inventory data remain confidential."
                        />
                        <PolicySection
                            icon={ShieldCheck}
                            title="2. Compliance"
                            text="We adhere to global GDPR and CCPA standards, ensuring that corporate data is handled with strict adherence to industrial secrecy requirements."
                        />
                        <PolicySection
                            icon={EyeOff}
                            title="3. Third-Party Access"
                            text="Data is only shared with certified logistics partners (DAP/EXW) necessary to facilitate equipment delivery. We never sell industrial intelligence."
                        />
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
