'use client';

import { useState } from 'react';
import Link from 'next/link';

const TLD_OPTIONS = [
    { ext: 'com', label: '.com', mult: 1.0, renewal: '$11/yr', tag: 'Sovereign Standard' },
    { ext: 'ai', label: '.ai', mult: 0.32, renewal: '$75/yr', tag: 'AI Boom Leader' },
    { ext: 'io', label: '.io', mult: 0.16, renewal: '$42/yr', tag: 'SaaS / Dev' },
    { ext: 'co', label: '.co', mult: 0.11, renewal: '$26/yr', tag: 'Startup Alt' },
    { ext: 'xyz', label: '.xyz', mult: 0.08, renewal: '$12/yr', tag: 'Web3 / Global' },
    { ext: 'org', label: '.org', mult: 0.1, renewal: '$13/yr', tag: 'High Trust' },
    { ext: 'dev', label: '.dev', mult: 0.09, renewal: '$14/yr', tag: 'Google HSTS' },
    { ext: 'gg', label: '.gg', mult: 0.07, renewal: '$60/yr', tag: 'Esports / Gaming' },
];

const STRUCTURE_ARCHETYPES = [
    { id: 'dict1', label: 'Single Dictionary Word', sample: 'quantum', baseCom: 185000, floorRatio: 0.22 },
    { id: 'lll', label: '3-Letter (LLL)', sample: 'vdx', baseCom: 42000, floorRatio: 0.45 },
    { id: 'compound2', label: '2-Word Commercial Brand', sample: 'cloudscale', baseCom: 14500, floorRatio: 0.16 },
    { id: 'coined', label: 'Short Coined Brandable (5-6L)', sample: 'zentra', baseCom: 6800, floorRatio: 0.14 },
    { id: 'longtail', label: '3-Word Exact Search Phrase', sample: 'austinroofrepair', baseCom: 1950, floorRatio: 0.12 },
];

const INTENT_TIERS = [
    { id: 'tier1', label: 'Fintech / AI / Enterprise SaaS ($18+ CPC)', mult: 1.75 },
    { id: 'tier2', label: 'Healthcare / Legal / B2B Cloud ($9+ CPC)', mult: 1.3 },
    { id: 'tier3', label: 'General E-Commerce / Consumer Tech', mult: 1.0 },
    { id: 'tier4', label: 'Creative / Community / Non-Commercial', mult: 0.55 },
];

function fmtUsd(val: number): string {
    return '$' + Math.round(val).toLocaleString('en-US');
}

export default function InteractiveValuationSandbox() {
    const [selectedTld, setSelectedTld] = useState('com');
    const [selectedArch, setSelectedArch] = useState('compound2');
    const [selectedIntent, setSelectedIntent] = useState('tier1');

    const tldObj = (TLD_OPTIONS.find((t) => t.ext === selectedTld) || TLD_OPTIONS[0])!;
    const archObj = (STRUCTURE_ARCHETYPES.find((a) => a.id === selectedArch) || STRUCTURE_ARCHETYPES[2])!;
    const intentObj = (INTENT_TIERS.find((i) => i.id === selectedIntent) || INTENT_TIERS[0])!;

    const fmv = Math.max(150, Math.round(archObj.baseCom * tldObj.mult * intentObj.mult));
    const wholesaleFloor = Math.max(50, Math.round(fmv * archObj.floorRatio));
    const retailBin = Math.round(fmv * 1.28);
    const lease24 = Math.max(25, Math.round((fmv * 1.1) / 24));
    const sampleDomain = `${archObj.sample}.${tldObj.ext}`;

    return (
        <section className="card p-6 sm:p-8 border-brand-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-brand-950 text-brand-300 border border-brand-800">
                            Interactive CVM-4 Simulator
                        </span>
                        <span className="text-xs font-mono text-emerald-400">Live Multiplier Sandbox</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                        Test How TLD, Structure &amp; CPC Intent Drive Domain Worth
                    </h2>
                </div>
                <Link
                    href="/deal-room"
                    className="btn-secondary !py-2 !px-4 text-xs font-mono font-bold whitespace-nowrap self-start sm:self-auto"
                >
                    🤝 Open Deal Room &amp; Fee Calculator →
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Controls Column */}
                <div className="lg:col-span-7 space-y-5">
                    {/* 1. TLD Selector */}
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                            1. Select TLD Extension (Liquidity Multiplier)
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {TLD_OPTIONS.map((t) => (
                                <button
                                    key={t.ext}
                                    type="button"
                                    onClick={() => setSelectedTld(t.ext)}
                                    className={`py-2 px-2 rounded-xl font-mono text-xs font-bold border transition-all text-center ${
                                        selectedTld === t.ext
                                            ? 'bg-brand-600 text-white border-brand-400 shadow-lg shadow-brand-600/30 scale-105'
                                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                                    }`}
                                >
                                    <div>{t.label}</div>
                                    <div className="text-[9px] opacity-75 font-normal">{t.mult}x</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Linguistic Structure */}
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                            2. Select Linguistic Archetype &amp; Scarcity Tier
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {STRUCTURE_ARCHETYPES.map((a) => (
                                <button
                                    key={a.id}
                                    type="button"
                                    onClick={() => setSelectedArch(a.id)}
                                    className={`p-3 rounded-xl border text-left transition-all ${
                                        selectedArch === a.id
                                            ? 'bg-indigo-950/70 border-indigo-500 text-white'
                                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                                    }`}
                                >
                                    <div className="text-xs font-bold">{a.label}</div>
                                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                                        Example: <span className="text-brand-300">{a.sample}.{selectedTld}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Commercial Intent */}
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                            3. Commercial Industry &amp; Search CPC Tier
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {INTENT_TIERS.map((it) => (
                                <button
                                    key={it.id}
                                    type="button"
                                    onClick={() => setSelectedIntent(it.id)}
                                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                                        selectedIntent === it.id
                                            ? 'bg-emerald-950/50 border-emerald-500 text-white'
                                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                                    }`}
                                >
                                    <span className="text-xs font-semibold pr-2">{it.label}</span>
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-300 shrink-0">
                                        {it.mult}x
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Valuation Output Card */}
                <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950/95 p-6 space-y-5 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400">Simulated Benchmark</span>
                            <div className="text-lg font-black text-white font-mono">{sampleDomain}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                            Renewal: {tldObj.renewal}
                        </span>
                    </div>

                    <div className="text-center py-3 rounded-xl bg-gradient-to-r from-brand-950/50 via-indigo-950/50 to-purple-950/50 border border-brand-800/50">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-brand-300">
                            Consensus Fair Market Value
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mt-1">
                            {fmtUsd(fmv)}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 mt-1">
                            TLD ({tldObj.mult}x) × Intent ({intentObj.mult}x)
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase">48h Floor</div>
                            <div className="text-xs sm:text-sm font-bold text-cyan-400 mt-1">{fmtUsd(wholesaleFloor)}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase">Retail BIN</div>
                            <div className="text-xs sm:text-sm font-bold text-amber-400 mt-1">{fmtUsd(retailBin)}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase">24mo Lease</div>
                            <div className="text-xs sm:text-sm font-bold text-purple-400 mt-1">{fmtUsd(lease24)}/mo</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <Link
                            href={`/valuation/${encodeURIComponent(sampleDomain)}`}
                            className="btn-primary !py-2.5 text-xs font-bold text-center"
                        >
                            Inspect {sampleDomain} →
                        </Link>
                        <Link
                            href={`/deal-room?domain=${encodeURIComponent(sampleDomain)}&price=${fmv}`}
                            className="btn-secondary !py-2.5 text-xs font-bold text-center"
                        >
                            Simulate Deal →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
