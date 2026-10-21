'use client';

import { formatUsd, formatUsdExact } from '@/lib/format';
import type { EconomicArbitrageResult } from '@/lib/valuation/engine';

interface Props {
    economicArbitrage: EconomicArbitrageResult;
    domain: string;
    rootLabel: string;
    verticalLabel: string;
}

export default function KeywordArbitragePanel({
    economicArbitrage,
    domain,
    rootLabel,
    verticalLabel,
}: Props) {
    const {
        monthlyExactSearchEstimate = 1200,
        estimatedCpcUsd = 4.50,
        annualMarketingAvoidanceUsd = 12000,
        capitalizedAssetValueUsd = 85000,
        conversionTrustLiftPercent = 22,
        commercialIntentGrade = 'Tier-2 Commercial',
        rationale = '',
    } = economicArbitrage || {};

    // Format numbers
    const searchVolumeFormatted = Number(monthlyExactSearchEstimate || 0).toLocaleString();
    const cpcFormatted = `$${Number(estimatedCpcUsd || 0).toFixed(2)}`;

    return (
        <section className="card p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                            Search Arbitrage &amp; CPC Analytics
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Google Ads Auction Economics</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span>🎯</span> Commercial Intent &amp; Paid Search Equity
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        Economic replacement value based on exact-match search volume, advertiser CPC auctions, and organic customer acquisition cost (CAC) avoidance.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                        ⭐ {commercialIntentGrade}
                    </span>
                </div>
            </div>

            {/* 4 Core Search Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                        Exact Search Volume
                    </div>
                    <div className="text-2xl font-black text-cyan-400">
                        {searchVolumeFormatted}
                        <span className="text-xs text-slate-500 font-normal ml-1">/mo</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                        Estimated global monthly exact-match keyword searches.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                        Advertiser Cost-Per-Click
                    </div>
                    <div className="text-2xl font-black text-emerald-400">
                        {cpcFormatted}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                        Average Google Ads bidding price in {verticalLabel}.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                        Annual CAC Avoidance
                    </div>
                    <div className="text-2xl font-black text-brand-300">
                        {formatUsd(annualMarketingAvoidanceUsd)}
                        <span className="text-xs text-slate-500 font-normal ml-1">/yr</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                        Marketing budget saved by owning organic category traffic.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                        Trust &amp; Conversion Lift
                    </div>
                    <div className="text-2xl font-black text-purple-400">
                        +{conversionTrustLiftPercent}%
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                        Higher ad click-through &amp; visitor conversion rate vs hyphenated names.
                    </p>
                </div>
            </div>

            {/* Economic Justification Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                    <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span>💡</span> Why Corporate Acquirers Pay Up for {domain}
                    </span>
                    <span className="text-emerald-400 font-bold">
                        Capitalized Value: {formatUsd(capitalizedAssetValueUsd)}
                    </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {rationale ||
                        `Acquiring ${domain} allows the buyer to permanently bypass continuous paid ad spend. At ${cpcFormatted} per click in ${verticalLabel}, buying the exact-match domain amortizes itself rapidly compared to perpetually bidding on Google Ads against aggressive competitors.`}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <div>
                        Keyword Stem: <code className="text-cyan-300 font-bold">&quot;{rootLabel}&quot;</code>
                    </div>
                    <div>•</div>
                    <div>
                        Primary Sector: <span className="text-white">{verticalLabel}</span>
                    </div>
                    <div>•</div>
                    <div>
                        Model: <span className="text-brand-300">Perpetual Equity Arbitrage</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
