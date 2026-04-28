// resources/js/layouts/PolicyLayout.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { route } from 'ziggy-js';

interface PolicyLayoutProps {
    title: string;
    lastUpdated?: string;
    children: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, lastUpdated, children }) => {
    const policies = [
        { name: 'Shipping Policy', slug: 'shipping-policy' },
        { name: 'Return Policy', slug: 'return-policy' },
        { name: 'Terms & Conditions', slug: 'terms' },
        { name: 'Privacy Policy', slug: 'privacy' },
    ];

    return (
        <AppLayout>
            <Head title={`${title} | AXELMASON`} />

            <div className="bg-white min-h-screen">
                {/* Header */}
                <div className="bg-gray-50 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-6 py-8">
                        <Link
                            href={route('home')}
                            className="text-xs font-black text-gray-500 hover:text-black uppercase tracking-widest flex items-center gap-2 mb-4"
                        >
                            ← Back to Shop
                        </Link>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h1>
                        {lastUpdated && (
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
                                Last Updated: {lastUpdated}
                            </p>
                        )}
                    </div>
                </div>

                {/* Policy Navigation */}
                <div className="border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
                            {policies.map((policy) => (
                                <Link
                                    key={policy.slug}
                                    href={route(policy.slug)}
                                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                                        route().current(policy.slug)
                                            ? 'bg-black text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {policy.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="prose prose-sm max-w-none
                        prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900
                        prose-p:text-gray-600 prose-p:leading-relaxed
                        prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                        prose-ul:text-gray-600 prose-li:text-gray-600
                        prose-strong:text-gray-900 prose-strong:font-bold
                    ">
                        {children}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="border-t border-gray-100 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-6 py-8 text-center">
                        <p className="text-sm text-gray-500 mb-4">
                            Still have questions? We're here to help.
                        </p>
                        <a
                            href={route('contact')}
                            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PolicyLayout;
