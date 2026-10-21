'use client';

import { useState } from 'react';

interface Props {
    domain: string;
    rootLabel: string;
    verticalLabel: string;
    estimatedValue: string;
}

type MockupTab = 'saas' | 'card' | 'app' | 'billboard';

export default function BrandMockupStudio({ domain, rootLabel, verticalLabel, estimatedValue }: Props) {
    const [activeTab, setActiveTab] = useState<MockupTab>('saas');
    const [copied, setCopied] = useState(false);

    // Capitalized brand name (e.g. "CloudScale" or "Apex")
    const brandName = rootLabel.charAt(0).toUpperCase() + rootLabel.slice(1);
    const brandInitials = rootLabel.slice(0, 2).toUpperCase();

    const handleCopyPitchNote = () => {
        const text = `Brand Identity Concept for ${domain}:
- Brand Name: ${brandName}
- Industry Vertical: ${verticalLabel}
- Valuation Benchmark: ${estimatedValue}
- Ideal Positioning: Category-defining commercial flagship platform.
- Live Spec: https://domainvoodoo.com/valuation/${domain}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <section className="card p-6 sm:p-8 bg-slate-900/70 border border-slate-800 relative overflow-hidden backdrop-blur-md space-y-6">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-brand-950 text-brand-300 border border-brand-800 font-bold">
                            Visual Identity Lab
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Real-World Brand Simulator</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span>🎨</span> Startup &amp; Enterprise Brand Mockup Studio
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        Visualize how <strong className="text-white font-mono">{domain}</strong> commands authority across digital, mobile, executive, and physical real estate.
                    </p>
                </div>

                <button
                    onClick={handleCopyPitchNote}
                    className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-2"
                >
                    <span>{copied ? '✓ Copied Spec' : '📋 Copy Brand Pitch'}</span>
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2">
                {[
                    { id: 'saas', label: '🖥️ SaaS Web App', desc: 'Modern Cloud Platform' },
                    { id: 'card', label: '💳 Luxury Executive Card', desc: 'Corporate Stationery' },
                    { id: 'app', label: '📱 Mobile iOS App Dock', desc: 'App Store Presence' },
                    { id: 'billboard', label: '🏙️ Highway Billboard', desc: 'Metropolitan Branding' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as MockupTab)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                            activeTab === tab.id
                                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25 border border-brand-500'
                                : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                    >
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* MOCKUP 1: SaaS Web App Landing Page */}
            {activeTab === 'saas' && (
                <div className="rounded-2xl border border-slate-700/80 bg-slate-950 p-3 sm:p-5 shadow-2xl space-y-4">
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                            </div>
                            <span className="text-slate-500 ml-2 hidden sm:inline">https://{domain}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-[11px] text-slate-300">
                            <span className="text-emerald-400">🔒</span>
                            <span className="font-semibold text-white">{domain}</span>
                        </div>
                    </div>

                    {/* App Hero Container */}
                    <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
                        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono bg-brand-950/80 border border-brand-800 text-brand-300 font-bold">
                            <span>🚀</span> Next-Gen {verticalLabel} Technology
                        </div>

                        <div className="max-w-2xl mx-auto space-y-3">
                            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                                Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-300">{brandName}</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                                The institutional platform for global digital operations. Unrivaled speed, enterprise security, and automated workflows.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <button className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-500 transition-colors">
                                Start Free Trial →
                            </button>
                            <button className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                                Schedule Enterprise Demo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MOCKUP 2: Luxury Executive Business Card */}
            {activeTab === 'card' && (
                <div className="flex items-center justify-center py-6 sm:py-10">
                    <div className="w-full max-w-md aspect-[1.75/1] rounded-2xl bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-900 border-2 border-slate-700/60 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                        {/* Metallic Corner Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/10 via-transparent to-transparent pointer-events-none" />

                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono flex items-center gap-2">
                                    <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs shadow-md">
                                        {brandInitials}
                                    </span>
                                    <span>{brandName}</span>
                                </div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90 font-bold">
                                    {verticalLabel} Global
                                </p>
                            </div>

                            <span className="text-[10px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded">
                                HQ • NEW YORK
                            </span>
                        </div>

                        <div className="flex items-end justify-between border-t border-slate-800/80 pt-4 font-mono text-xs">
                            <div>
                                <div className="font-bold text-slate-200">Alexandre Vance</div>
                                <div className="text-[11px] text-slate-400">Chief Executive Officer</div>
                            </div>

                            <div className="text-right text-[11px] space-y-0.5">
                                <div className="text-amber-400 font-bold font-mono">alex@{domain}</div>
                                <div className="text-slate-400 font-mono">www.{domain}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MOCKUP 3: Mobile iOS App Dock */}
            {activeTab === 'app' && (
                <div className="flex flex-col items-center justify-center py-6 space-y-6">
                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center space-y-4 max-w-sm w-full">
                        <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-brand-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-mono font-black text-3xl shadow-2xl shadow-brand-500/40 border border-brand-400/30">
                            {brandInitials}
                        </div>

                        <div className="text-center space-y-1">
                            <h4 className="text-base font-bold text-white font-mono">{brandName}</h4>
                            <p className="text-xs text-slate-400">Official Mobile Client</p>
                            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs pt-1">
                                <span>★★★★★</span>
                                <span className="text-slate-400 text-[11px] ml-1">4.9 (12.4K Ratings)</span>
                            </div>
                        </div>

                        <div className="w-full pt-2">
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-400">App Store ID</span>
                                <span className="text-brand-300 font-bold">io.{rootLabel}.app</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MOCKUP 4: Metropolitan Highway Billboard */}
            {activeTab === 'billboard' && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-8 space-y-3">
                    <div className="aspect-[2.4/1] rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-4 border-slate-800 p-6 sm:p-10 flex flex-col justify-between text-center relative overflow-hidden shadow-2xl">
                        {/* Billboard Spotlights */}
                        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute top-0 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span className="uppercase tracking-widest text-brand-400 font-bold">Global Category Leader</span>
                            <span className="text-slate-500">SAN FRANCISCO • SILICON VALLEY</span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl sm:text-5xl font-black text-white tracking-tight uppercase font-mono">
                                The Future of {verticalLabel}.
                            </h3>
                            <p className="text-xs sm:text-base text-brand-300 font-mono font-bold tracking-wide">
                                Discover everything at {domain}
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 text-xs font-mono text-slate-400">
                            <span>NYSE / NASDAQ BRAND STANDARD</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
