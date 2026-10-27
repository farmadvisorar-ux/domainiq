'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DealRoomSimulatorProps {
    initialDomain?: string;
    initialPrice?: number;
}

const BUYER_PROFILES = [
    {
        id: 'startup',
        label: 'VC-Backed Startup (Seed / Series A)',
        multiplier: 1.25,
        badge: 'High Velocity',
        desc: 'Funded founders needing an category-defining flagship before product launch.',
    },
    {
        id: 'enterprise',
        label: 'Enterprise / Public Corporation',
        multiplier: 2.0,
        badge: 'Max Budget',
        desc: 'Global brand or M&A defensive acquisition with deep balance sheet capacity.',
    },
    {
        id: 'smb',
        label: 'Bootstrapped SMB / Agency',
        multiplier: 0.7,
        badge: 'Price Sensitive',
        desc: 'Operating small business upgrading from a hyphenated or secondary TLD.',
    },
    {
        id: 'investor',
        label: 'Wholesale Domainer / Liquidator',
        multiplier: 0.22,
        badge: 'Cash Floor',
        desc: 'Fellow domain investor seeking 48-hour wholesale discount for portfolio hold.',
    },
];

const LEVERAGE_MODES = [
    { id: 'inbound', label: 'Inbound Direct Inquiry', factor: 1.2, note: 'Buyer initiated contact first' },
    { id: 'stealth', label: 'Stealth Broker / Corporate Counsel', factor: 1.5, note: 'NDA or law firm proxy signal' },
    { id: 'competing', label: 'Multiple Active Bidders', factor: 1.35, note: '2+ verified parties inquiring' },
    { id: 'outbound', label: 'Outbound Cold Pitch', factor: 0.72, note: 'Seller initiated outbound outreach' },
];

const MARKETPLACE_CHANNELS = [
    {
        name: 'Direct Escrow.com (Standard Wire)',
        feePct: 1.5,
        badge: 'Best Net Payout',
        badgeStyle: 'bg-emerald-950 text-emerald-300 border-emerald-800',
        notes: 'Direct buyer-to-seller escrow without broker middlemen.',
    },
    {
        name: 'Bring-Your-Own-Lead (5% Checkout)',
        feePct: 5.0,
        badge: 'Low Friction',
        badgeStyle: 'bg-cyan-950 text-cyan-300 border-cyan-800',
        notes: 'Imported lead using automated escrow & lease-to-own checkout.',
    },
    {
        name: 'Sedo Marketplace / MLS Network',
        feePct: 15.0,
        badge: 'Global Reach',
        badgeStyle: 'bg-blue-950 text-blue-300 border-blue-800',
        notes: 'Standard 15% commission via international registrar syndication.',
    },
    {
        name: 'Afternic Fast Transfer (Standard)',
        feePct: 15.0,
        badge: 'Registrar Network',
        badgeStyle: 'bg-indigo-950 text-indigo-300 border-indigo-800',
        notes: '15% with Afternic nameservers (25% without nameserver boost).',
    },
    {
        name: 'Non-Boosted Registrar / Outbound Broker',
        feePct: 25.0,
        badge: 'Highest Drag',
        badgeStyle: 'bg-rose-950 text-rose-300 border-rose-800',
        notes: '20%–25% commission charged by full-service brokers or unboosted listings.',
    },
];

function fmtUsd(val: number): string {
    return '$' + Math.round(val).toLocaleString('en-US');
}

export default function DealRoomSimulator({
    initialDomain = 'cloudscale.ai',
    initialPrice = 42500,
}: DealRoomSimulatorProps) {
    const [activeTab, setActiveTab] = useState<'negotiate' | 'commissions' | 'roi'>('negotiate');
    const [domain, setDomain] = useState(initialDomain);
    const [baseFmv, setBaseFmv] = useState(initialPrice);
    const [buyerId, setBuyerId] = useState('startup');
    const [leverageId, setLeverageId] = useState('inbound');
    const [copiedRound, setCopiedRound] = useState<string | null>(null);

    useEffect(() => {
        if (initialDomain) setDomain(initialDomain);
    }, [initialDomain]);

    useEffect(() => {
        if (initialPrice) setBaseFmv(initialPrice);
    }, [initialPrice]);

    // Portfolio ROI state
    const [portfolioSize, setPortfolioSize] = useState(250);
    const [renewalCost, setRenewalCost] = useState(14);
    const [strPct, setStrPct] = useState(1.8);
    const [avgSalePrice, setAvgSalePrice] = useState(3200);

    const selectedBuyer = (BUYER_PROFILES.find((b) => b.id === buyerId) || BUYER_PROFILES[0])!;
    const selectedLeverage = (LEVERAGE_MODES.find((l) => l.id === leverageId) || LEVERAGE_MODES[0])!;

    const adjustedTarget = Math.max(250, Math.round(baseFmv * selectedBuyer.multiplier * selectedLeverage.factor));
    const openingAnchor = Math.round(adjustedTarget * 1.45);
    const round2Counter = Math.round(adjustedTarget * 1.15);
    const walkAwayFloor = Math.round(adjustedTarget * 0.82);
    const monthlyLease24 = Math.round((adjustedTarget * 1.1) / 24);

    // Portfolio ROI math
    const annualCarryingCost = portfolioSize * renewalCost;
    const expectedAnnualSales = (portfolioSize * strPct) / 100;
    const grossAnnualRevenue = Math.round(expectedAnnualSales * avgSalePrice);
    const netAfterComms = Math.round(grossAnnualRevenue * 0.88); // 12% avg blended commission
    const netAnnualProfit = netAfterComms - annualCarryingCost;
    const portfolioRoiPct = annualCarryingCost > 0 ? Math.round((netAnnualProfit / annualCarryingCost) * 100) : 0;
    const breakEvenSales = avgSalePrice > 0 ? (annualCarryingCost / (avgSalePrice * 0.88)).toFixed(1) : '0';

    const scripts = [
        {
            id: 'r1',
            round: 'Round 1: Institutional Anchor Response',
            price: fmtUsd(openingAnchor),
            subject: `Re: Acquisition Inquiry — ${domain}`,
            body: `Thank you for reaching out regarding ${domain}.\n\n${domain} is held in our long-term digital asset portfolio. Based on current comparable secondary market transactions, category search equity, and TLD scarcity benchmarks audited via DomainVoodoo, our direct acquisition guidance for ${domain} is ${fmtUsd(openingAnchor)} USD.\n\nWe conduct all transfers via Escrow.com for immediate buyer/seller protection, or we can structure a 24-month Lease-to-Own arrangement at ${fmtUsd(monthlyLease24)}/month with instant DNS control upon the first payment.\n\nLet me know how your team would like to proceed.`,
        },
        {
            id: 'r2',
            round: 'Round 2: Data-Backed Concession',
            price: fmtUsd(round2Counter),
            subject: `Updated Valuation Comps & Terms — ${domain}`,
            body: `Thank you for sharing your budget parameters for ${domain}.\n\nWhile we have turned down previous offers near that range, our partners are willing to meet you halfway at ${fmtUsd(round2Counter)} USD if we can close before the end of this week via Escrow.com.\n\nYou can review the independent algorithmic appraisal and comparable sales ledger at:\nhttps://prstuvw.xyz/valuation/${encodeURIComponent(domain)}\n\nPlease confirm if you would like me to initiate the Escrow.com transaction at ${fmtUsd(round2Counter)}.`,
        },
        {
            id: 'r3',
            round: 'Round 3: Best & Final / LTO Bridge',
            price: fmtUsd(adjustedTarget),
            subject: `Final Approval on ${domain} (${fmtUsd(adjustedTarget)})`,
            body: `I spoke with our managing partners regarding ${domain}. The absolute lowest cash settlement we can authorize is ${fmtUsd(adjustedTarget)} USD net to us, valid for the next 48 hours.\n\nIf fiscal quarter budget constraints are an issue, our ${fmtUsd(monthlyLease24)}/mo Lease-to-Own structure allows you to deploy ${domain} live today out of operating expenses (OpEx) rather than a lump-sum CapEx outlay, with 100% of payments credited toward ownership.`,
        },
    ];

    function copyText(id: string, text: string) {
        navigator.clipboard.writeText(text);
        setCopiedRound(id);
        setTimeout(() => setCopiedRound(null), 2200);
    }

    return (
        <div className="space-y-8">
            {/* Top Mode Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('negotiate')}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'negotiate'
                                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                    >
                        <span>🤝</span>
                        <span>Negotiation Simulator &amp; Scripts</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('commissions')}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'commissions'
                                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                    >
                        <span>🏦</span>
                        <span>Escrow &amp; Marketplace Fee Calculator</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('roi')}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                            activeTab === 'roi'
                                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                    >
                        <span>📈</span>
                        <span>Portfolio Carrying Cost &amp; ROI Model</span>
                    </button>
                </div>

                <Link
                    href={`/valuation/${encodeURIComponent(domain || 'cloudscale.ai')}`}
                    className="text-xs font-mono font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                    <span>Run Full Appraisal on {domain || 'domain'}</span>
                    <span>→</span>
                </Link>
            </div>

            {/* Shared Asset & Baseline Valuation Bar (for Negotiate & Commissions tabs) */}
            {activeTab !== 'roi' && (
                <div className="card p-6 border-brand-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                                Target Domain Asset
                            </label>
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value.toLowerCase().trim())}
                                placeholder="e.g. cloudscale.ai"
                                className="input font-mono text-sm bg-slate-950 border-slate-700 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                                Baseline Fair Market Value (USD)
                            </label>
                            <input
                                type="number"
                                min={100}
                                max={100000000}
                                step={500}
                                value={baseFmv}
                                onChange={(e) => setBaseFmv(Math.max(100, Number(e.target.value) || 0))}
                                className="input font-mono text-sm bg-slate-950 border-slate-700 text-emerald-400 font-bold"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {[2500, 10000, 25000, 50000, 150000, 500000].map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    onClick={() => setBaseFmv(preset)}
                                    className={`px-2.5 py-2 rounded-lg font-mono text-xs border transition-colors ${
                                        baseFmv === preset
                                            ? 'bg-brand-950 border-brand-500 text-brand-300 font-bold'
                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {fmtUsd(preset)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 1: NEGOTIATION SIMULATOR */}
            {activeTab === 'negotiate' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Buyer Profile Selection */}
                        <div className="card p-6 space-y-4">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <span>1️⃣</span>
                                <span>Select Counterparty Buyer Persona</span>
                            </h3>
                            <div className="grid gap-2.5">
                                {BUYER_PROFILES.map((bp) => (
                                    <button
                                        key={bp.id}
                                        type="button"
                                        onClick={() => setBuyerId(bp.id)}
                                        className={`text-left p-3.5 rounded-xl border transition-all ${
                                            buyerId === bp.id
                                                ? 'bg-brand-950/60 border-brand-500 text-white shadow-md'
                                                : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-xs sm:text-sm text-white">{bp.label}</span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-brand-300">
                                                {bp.multiplier}x FMV ({bp.badge})
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">{bp.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Deal Leverage Selection */}
                        <div className="card p-6 space-y-4 flex flex-col justify-between">
                            <div className="space-y-4">
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <span>2️⃣</span>
                                    <span>Select Negotiation Leverage Signal</span>
                                </h3>
                                <div className="grid gap-2.5">
                                    {LEVERAGE_MODES.map((lm) => (
                                        <button
                                            key={lm.id}
                                            type="button"
                                            onClick={() => setLeverageId(lm.id)}
                                            className={`text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                                                leverageId === lm.id
                                                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                                                    : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                                            }`}
                                        >
                                            <div>
                                                <div className="font-bold text-xs sm:text-sm text-white">{lm.label}</div>
                                                <div className="text-xs text-slate-400">{lm.note}</div>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-indigo-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                                                {lm.factor}x
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Live Computed Pricing Ladder Summary */}
                            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-4">
                                <div>
                                    <div className="text-[10px] font-mono uppercase text-slate-400">Opening Anchor</div>
                                    <div className="text-base sm:text-lg font-black text-amber-400 font-mono mt-0.5">
                                        {fmtUsd(openingAnchor)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono uppercase text-slate-400">Target Settlement</div>
                                    <div className="text-base sm:text-lg font-black text-emerald-400 font-mono mt-0.5">
                                        {fmtUsd(adjustedTarget)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono uppercase text-slate-400">Walk-Away Floor</div>
                                    <div className="text-base sm:text-lg font-black text-cyan-400 font-mono mt-0.5">
                                        {fmtUsd(walkAwayFloor)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono uppercase text-slate-400">24mo Lease LTO</div>
                                    <div className="text-base sm:text-lg font-black text-purple-400 font-mono mt-0.5">
                                        {fmtUsd(monthlyLease24)}/mo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3-Round Copyable Broker Email Scripts */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>✉️</span>
                            <span>3-Round Institutional Broker Response Playbook</span>
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {scripts.map((s) => (
                                <div key={s.id} className="card p-5 flex flex-col justify-between space-y-4 border-slate-800 bg-slate-900/70">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                                            <span className="text-xs font-bold text-white">{s.round}</span>
                                            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                                {s.price}
                                            </span>
                                        </div>
                                        <div className="text-[11px] font-mono text-slate-400">
                                            Subject: <span className="text-slate-200">{s.subject}</span>
                                        </div>
                                        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans bg-slate-950/90 p-3.5 rounded-xl border border-slate-800/90 leading-relaxed">
                                            {s.body}
                                        </pre>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => copyText(s.id, `Subject: ${s.subject}\n\n${s.body}`)}
                                        className="btn-secondary w-full !py-2 text-xs font-mono font-bold"
                                    >
                                        {copiedRound === s.id ? '✓ Copied Script to Clipboard!' : '📋 Copy Broker Script'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: MARKETPLACE COMMISSION & ESCROW NET PAYOUT CALCULATOR */}
            {activeTab === 'commissions' && (
                <div className="space-y-6">
                    <div className="card p-6 sm:p-8 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    Marketplace Commission &amp; Net Seller Proceeds Matrix
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Comparing exact net wire proceeds on a <strong className="text-white font-mono">{fmtUsd(baseFmv)}</strong> sale of <strong className="text-brand-300 font-mono">{domain}</strong>
                                </p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold">
                                Max Savings: {fmtUsd(baseFmv * 0.235)}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {MARKETPLACE_CHANNELS.map((ch) => {
                                const feeUsd = Math.round((baseFmv * ch.feePct) / 100);
                                const netUsd = baseFmv - feeUsd;
                                const keepPct = (100 - ch.feePct).toFixed(1);

                                return (
                                    <div
                                        key={ch.name}
                                        className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm text-white">{ch.name}</span>
                                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${ch.badgeStyle}`}>
                                                    {ch.badge}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400">{ch.notes}</p>
                                        </div>

                                        <div className="flex items-center gap-6 sm:text-right shrink-0 font-mono">
                                            <div>
                                                <div className="text-[10px] uppercase text-slate-500">Commission ({ch.feePct}%)</div>
                                                <div className="text-xs font-bold text-rose-400">-{fmtUsd(feeUsd)}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase text-slate-400">Net Seller Payout ({keepPct}%)</div>
                                                <div className="text-base sm:text-lg font-black text-emerald-400">{fmtUsd(netUsd)}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: PORTFOLIO CARRYING COST & ROI MODEL */}
            {activeTab === 'roi' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 card p-6 sm:p-8 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Domain Portfolio Carrying Cost &amp; Sell-Through Tuner
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Model how annual renewal drag (.com vs .ai/.io) and sell-through rates govern net portfolio profitability.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between text-xs font-mono mb-1.5">
                                    <span className="text-slate-300">Total Domains in Portfolio</span>
                                    <span className="text-brand-300 font-bold">{portfolioSize.toLocaleString()} domains</span>
                                </div>
                                <input
                                    type="range"
                                    min={10}
                                    max={5000}
                                    step={10}
                                    value={portfolioSize}
                                    onChange={(e) => setPortfolioSize(Number(e.target.value))}
                                    className="w-full accent-brand-500"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-mono mb-1.5">
                                    <span className="text-slate-300">Blended Annual Renewal Cost per Domain</span>
                                    <span className="text-amber-300 font-bold">${renewalCost}/yr</span>
                                </div>
                                <input
                                    type="range"
                                    min={10}
                                    max={90}
                                    step={1}
                                    value={renewalCost}
                                    onChange={(e) => setRenewalCost(Number(e.target.value))}
                                    className="w-full accent-amber-500"
                                />
                                <div className="flex gap-2 pt-2">
                                    {[
                                        { label: '.COM ($11/yr)', cost: 11 },
                                        { label: '.IO ($42/yr)', cost: 42 },
                                        { label: '.AI ($75/yr)', cost: 75 },
                                        { label: 'Mixed ($22/yr)', cost: 22 },
                                    ].map((t) => (
                                        <button
                                            key={t.label}
                                            type="button"
                                            onClick={() => setRenewalCost(t.cost)}
                                            className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 hover:border-slate-600"
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-mono mb-1.5">
                                    <span className="text-slate-300">Annual Sell-Through Rate (STR %)</span>
                                    <span className="text-cyan-300 font-bold">{strPct.toFixed(1)}% / yr</span>
                                </div>
                                <input
                                    type="range"
                                    min={0.2}
                                    max={6.0}
                                    step={0.1}
                                    value={strPct}
                                    onChange={(e) => setStrPct(Number(e.target.value))}
                                    className="w-full accent-cyan-500"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-mono mb-1.5">
                                    <span className="text-slate-300">Average Retail Sale Price</span>
                                    <span className="text-emerald-300 font-bold">{fmtUsd(avgSalePrice)}</span>
                                </div>
                                <input
                                    type="range"
                                    min={500}
                                    max={25000}
                                    step={250}
                                    value={avgSalePrice}
                                    onChange={(e) => setAvgSalePrice(Number(e.target.value))}
                                    className="w-full accent-emerald-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Financial Output Ledger */}
                    <div className="lg:col-span-5 card p-6 sm:p-8 flex flex-col justify-between space-y-6 border-brand-500/30 bg-gradient-to-b from-slate-900 to-slate-950">
                        <div className="space-y-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-brand-950 text-brand-300 border border-brand-800 font-bold">
                                Annual Portfolio P&amp;L Projection
                            </span>

                            <div className="space-y-3 pt-2 font-mono text-xs">
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-400">Annual Renewal Burn:</span>
                                    <span className="text-rose-400 font-bold">-{fmtUsd(annualCarryingCost)}/yr</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-400">Expected Annual Sales:</span>
                                    <span className="text-white font-bold">{expectedAnnualSales.toFixed(1)} domains/yr</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-400">Gross Retail Volume:</span>
                                    <span className="text-slate-200 font-bold">{fmtUsd(grossAnnualRevenue)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-400">Net After 12% Blended Fees:</span>
                                    <span className="text-cyan-300 font-bold">{fmtUsd(netAfterComms)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-800">
                                    <span className="text-slate-400">Break-Even Sales Needed:</span>
                                    <span className="text-amber-300 font-bold">{breakEvenSales} sales/yr</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                            <div className="text-xs font-mono text-slate-400 uppercase">Projected Net Annual Profit</div>
                            <div
                                className={`text-3xl font-black font-mono ${
                                    netAnnualProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                            >
                                {netAnnualProfit >= 0 ? '+' : ''}
                                {fmtUsd(netAnnualProfit)}
                            </div>
                            <div className="text-xs font-mono text-brand-300 font-bold">
                                Annualized Cash-on-Cash ROI: {portfolioRoiPct >= 0 ? `+${portfolioRoiPct}%` : `${portfolioRoiPct}%`}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
