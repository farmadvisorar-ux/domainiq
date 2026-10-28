import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTlds } from '@/data/tlds';
import AltHuntBadge from '@/components/AltHuntBadge';
import DomainCheckerForm from '@/components/DomainCheckerForm';

export const metadata: Metadata = {
    title: 'Top-Level Domain (TLD) Valuation & Investment Directory (2026) | DomainVoodoo',
    description:
        'Explore extension-specific valuation benchmarks, carrying costs, liquidity multipliers, and pricing models for .com, .ai, .io, .xyz, .co, and .org domains.',
    keywords: [
        'tld valuation guide',
        'domain extension value comparison',
        'how much is .ai worth',
        'how much is .io worth',
        'best domain extensions to invest in',
        'tld liquidity multipliers',
    ],
    alternates: {
        canonical: 'https://prstuvw.xyz/tld',
    },
    openGraph: {
        title: 'TLD Valuation & Pricing Directory (2026) | DomainVoodoo',
        description:
            'Extension-specific pricing guides, verified comps, and liquidity multipliers across all major top-level domains.',
        type: 'website',
        url: 'https://prstuvw.xyz/tld',
    },
};

export default function TldDirectoryPage() {
    const tlds = getAllTlds();

    return (
        <div className="space-y-12">
            {/* Header Hero */}
            <div className="text-center max-w-4xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-brand-950/80 text-brand-300 border border-brand-800/80">
                    <span>🌐</span>
                    <span>Extension Economics &amp; Pricing Multipliers</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Top-Level Domain (TLD){' '}
                    <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">
                        Valuation Guides
                    </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Every domain extension has distinct carrying costs, buyer personas, and secondary liquidity ceilings. Select an extension to explore verified sales records, registry rules, and econometric valuation models.
                </p>

                <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                    <AltHuntBadge />
                    <Link
                        href="/records"
                        className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1"
                    >
                        <span>View Top 100 All-Time Sales Records →</span>
                    </Link>
                </div>
            </div>

            {/* Quick Valuation Sandbox */}
            <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-brand-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span>⚡</span> Test Any TLD Valuation
                    </span>
                    <span className="text-slate-400">14.8M+ Sales Comps Ready</span>
                </div>
                <DomainCheckerForm />
            </div>

            {/* TLD Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tlds.map((tld) => (
                    <Link
                        key={tld.extension}
                        href={`/tld/${tld.extension}`}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/90 hover:border-brand-500/50 p-6 space-y-4 transition-all duration-300 group flex flex-col justify-between shadow-xl"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-black font-mono text-white group-hover:text-brand-300 transition-colors">
                                    {tld.label}
                                </span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800 font-bold">
                                    {tld.liquidityMultiplier.split(' ')[0]} Multiple
                                </span>
                            </div>

                            <div className="text-xs font-mono text-slate-400">{tld.fullName}</div>

                            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                                {tld.overview}
                            </p>

                            <div className="rounded-xl bg-slate-950 p-3 space-y-1.5 text-[11px] font-mono">
                                <div className="flex items-center justify-between text-slate-400">
                                    <span>Trust Score:</span>
                                    <span className="text-white font-bold">{tld.trustScore} / 100</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-400">
                                    <span>Carrying Cost:</span>
                                    <span className="text-slate-200">{tld.annualCarryingCost.split(' ')[0]}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-brand-400 font-bold">
                            <span>Explore {tld.label} Pricing Model</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
