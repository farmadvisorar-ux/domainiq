'use client';

import { useState, useMemo } from 'react';
import { formatUsd, formatUsdExact } from '@/lib/format';
import type { MatchedComp } from '@/lib/valuation/comps';

interface Props {
    comps: MatchedComp[];
    currentDomain: string;
    currentFmv: number;
}

type FilterOption = 'all' | 'com' | 'high' | 'high_value';

export default function InteractiveCompsChart({ comps, currentDomain, currentFmv }: Props) {
    const [filter, setFilter] = useState<FilterOption>('all');
    const [hoveredComp, setHoveredComp] = useState<MatchedComp | null>(null);

    const filteredComps = useMemo(() => {
        if (!comps || comps.length === 0) return [];
        return comps.filter((c) => {
            if (filter === 'com') return c.tld.toLowerCase() === 'com';
            if (filter === 'high') return c.compTier === 'high-relevance';
            if (filter === 'high_value') return c.sale_price_usd >= 10000;
            return true;
        });
    }, [comps, filter]);

    // Statistics
    const stats = useMemo(() => {
        if (filteredComps.length === 0) return { avg: 0, max: 0, median: 0, total: 0 };
        const prices = filteredComps.map((c) => c.sale_price_usd).sort((a, b) => a - b);
        const sum = prices.reduce((acc, p) => acc + p, 0);
        const avg = Math.round(sum / prices.length);
        const max = prices[prices.length - 1] ?? 0;
        const mid = Math.floor(prices.length / 2);
        const median = prices.length % 2 !== 0 ? prices[mid]! : Math.round((prices[mid - 1]! + prices[mid]!) / 2);
        return { avg, max, median, total: filteredComps.length };
    }, [filteredComps]);

    // Chart dimensions
    const width = 800;
    const height = 280;
    const padding = { top: 25, right: 30, bottom: 40, left: 65 };

    // Bounds
    const years = filteredComps.map((c) => c.sale_year || 2023);
    const minYear = Math.min(2015, ...years);
    const maxYear = Math.max(2026, ...years);

    const maxPrice = Math.max(currentFmv * 1.3, stats.max * 1.1, 10000);
    const minPrice = 500;

    // Log-scale coordinate mapping for price
    const getY = (price: number) => {
        const logMin = Math.log10(Math.max(100, minPrice));
        const logMax = Math.log10(Math.max(1000, maxPrice));
        const logVal = Math.log10(Math.max(100, price));
        const ratio = (logVal - logMin) / (logMax - logMin);
        return height - padding.bottom - ratio * (height - padding.top - padding.bottom);
    };

    const getX = (year: number) => {
        const ratio = (year - minYear) / Math.max(1, maxYear - minYear);
        return padding.left + ratio * (width - padding.left - padding.right);
    };

    const fmvY = getY(currentFmv);

    return (
        <section className="card p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-brand-950 text-brand-300 border border-brand-800 font-bold">
                            Empirical Intelligence
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Verified Aftermarket Comps</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span>📈</span> Interactive Sales Timeline &amp; Scatter Matrix
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        Visual trajectory of historical sales comps plotted against <strong className="text-white font-mono">{currentDomain}</strong>&apos;s consensus valuation.
                    </p>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-1.5 self-start sm:self-auto text-xs font-mono">
                    {[
                        { id: 'all', label: `All (${comps.length})` },
                        { id: 'com', label: '.COM Only' },
                        { id: 'high', label: 'High Relevance' },
                        { id: 'high_value', label: '$10k+ Sales' },
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            type="button"
                            onClick={() => setFilter(btn.id as FilterOption)}
                            className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
                                filter === btn.id
                                    ? 'bg-brand-600 text-white font-bold'
                                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white'
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Stats Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-500 uppercase tracking-wider text-[10px]">Average Comp</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">{formatUsd(stats.avg)}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-500 uppercase tracking-wider text-[10px]">Median Comp</div>
                    <div className="text-base font-bold text-cyan-400 mt-0.5">{formatUsd(stats.median)}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-500 uppercase tracking-wider text-[10px]">Peak Comp</div>
                    <div className="text-base font-bold text-amber-400 mt-0.5">{formatUsd(stats.max)}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-500 uppercase tracking-wider text-[10px]">Indexed Comps</div>
                    <div className="text-base font-bold text-brand-300 mt-0.5">{stats.total} verified</div>
                </div>
            </div>

            {/* SVG Interactive Chart Canvas */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2 overflow-x-auto">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px] h-auto select-none overflow-visible">
                    {/* Horizontal Grid lines */}
                    {[1000, 10000, 100000, 1000000].filter((p) => p <= maxPrice).map((p) => {
                        const y = getY(p);
                        return (
                            <g key={p}>
                                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                                <text x={padding.left - 10} y={y + 4} fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="end">
                                    {formatUsd(p)}
                                </text>
                            </g>
                        );
                    })}

                    {/* Current Domain Benchmark Consensus Line */}
                    <line
                        x1={padding.left}
                        y1={fmvY}
                        x2={width - padding.right}
                        y2={fmvY}
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                    <text
                        x={width - padding.right}
                        y={fmvY - 6}
                        fill="#818cf8"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="end"
                    >
                        Current Valuation: {formatUsd(currentFmv)}
                    </text>

                    {/* X-Axis Years */}
                    {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)
                        .filter((y) => y % 2 === 0 || y === maxYear)
                        .map((year) => {
                            const x = getX(year);
                            return (
                                <g key={year}>
                                    <line x1={x} y1={height - padding.bottom} x2={x} y2={height - padding.bottom + 5} stroke="#334155" />
                                    <text x={x} y={height - padding.bottom + 18} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                                        {year}
                                    </text>
                                </g>
                            );
                        })}

                    {/* Scatter plot points */}
                    {filteredComps.map((comp, idx) => {
                        const yr = comp.sale_year || 2023;
                        const cx = getX(yr) + ((idx % 5) - 2) * 6; // small jitter to avoid perfect overlaps
                        const cy = getY(comp.sale_price_usd);
                        const isHovered = hoveredComp?.domain === comp.domain;

                        const isCom = comp.tld.toLowerCase() === 'com';
                        const dotColor = isCom ? '#34d399' : '#38bdf8';

                        return (
                            <g
                                key={comp.domain + idx}
                                className="cursor-pointer transition-transform"
                                onMouseEnter={() => setHoveredComp(comp)}
                                onMouseLeave={() => setHoveredComp(null)}
                            >
                                <circle
                                    cx={cx}
                                    cy={cy}
                                    r={isHovered ? 8 : 5}
                                    fill={dotColor}
                                    stroke="#0f172a"
                                    strokeWidth="2"
                                    className="transition-all hover:scale-125"
                                />
                                {isHovered && (
                                    <circle cx={cx} cy={cy} r={14} fill={dotColor} fillOpacity="0.25" />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Tooltip Overlay */}
                {hoveredComp && (
                    <div className="absolute top-4 left-4 z-20 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs font-mono space-y-1 max-w-xs animate-fadeIn pointer-events-none">
                        <div className="font-bold text-white flex items-center justify-between gap-2">
                            <span>{hoveredComp.domain}</span>
                            <span className="text-emerald-400 font-black">{formatUsdExact(hoveredComp.sale_price_usd)}</span>
                        </div>
                        <div className="text-slate-400 text-[11px]">
                            Sale Year: {hoveredComp.sale_year || 'Recent'} • Venue: {hoveredComp.source_note || 'Marketplace'}
                        </div>
                        <div className="text-[10px] text-brand-300">
                            Relevance: {hoveredComp.matchReason}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
