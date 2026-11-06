'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { DomainCompItem } from '@/data/comps';
import { formatUsd } from '@/lib/format';

interface CompsSearchTerminalProps {
    initialComps: DomainCompItem[];
}

const POPULAR_CHIPS = ['ai', 'crypto', 'pay', 'cloud', 'car', 'travel', 'gold', 'chat', 'short'];
const TLD_OPTIONS = ['all', 'com', 'ai', 'io', 'co', 'org', 'net', 'xyz', 'dev'];
const CATEGORY_OPTIONS = [
    'all',
    'Tech & AI',
    'Finance & Crypto',
    'E-commerce & Retail',
    'Travel & Luxury',
    'Gaming & Web3',
    'Business & Services',
];
const PRICE_BRACKETS = [
    { label: 'All Price Bands', min: 0, max: 0 },
    { label: '💎 $10M+ Mega Sovereign', min: 10_000_000, max: 0 },
    { label: '🏛️ $1M – $10M Ultra-Prime', min: 1_000_000, max: 10_000_000 },
    { label: '🚀 $100K – $1M Enterprise', min: 100_000, max: 1_000_000 },
    { label: '⚡ $10K – $100K Aftermarket', min: 10_000, max: 100_000 },
    { label: '🏷️ Under $10K Seed/Longtail', min: 1, max: 10_000 },
];
const STRUCTURE_OPTIONS = [
    { label: 'All Asset Types', value: 'all' },
    { label: '🔤 Short / Acronym / Numeric', value: 'short' },
    { label: '📖 Single Dictionary Word', value: 'single' },
    { label: '🧩 2-Word Compound', value: 'compound' },
];

export default function CompsSearchTerminal({ initialComps }: CompsSearchTerminalProps) {
    const [keyword, setKeyword] = useState('');
    const [selectedTld, setSelectedTld] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBracketIndex, setSelectedBracketIndex] = useState(0);
    const [selectedStructure, setSelectedStructure] = useState('all');
    const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'year-desc' | 'year-asc' | 'alpha-asc'>('price-desc');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [copiedMarkdown, setCopiedMarkdown] = useState(false);

    // Filter logic
    const { filtered, stats } = useMemo(() => {
        const cleanK = keyword.trim().toLowerCase();
        const bracket = PRICE_BRACKETS[selectedBracketIndex] ?? PRICE_BRACKETS[0]!;

        const list = initialComps.filter((item) => {
            if (cleanK) {
                const dom = item.domain.toLowerCase();
                const sld = dom.split('.')[0] || '';
                const buyer = item.buyer?.toLowerCase() || '';
                const source = item.sourceNote.toLowerCase();
                if (!dom.includes(cleanK) && !sld.includes(cleanK) && !buyer.includes(cleanK) && !source.includes(cleanK)) {
                    return false;
                }
            }

            if (selectedTld !== 'all' && item.tld.toLowerCase() !== selectedTld.toLowerCase()) {
                return false;
            }

            if (selectedCategory !== 'all' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
                return false;
            }

            if (bracket.min > 0 && item.priceUsd < bracket.min) return false;
            if (bracket.max > 0 && item.priceUsd >= bracket.max) return false;

            if (selectedStructure !== 'all') {
                if (selectedStructure === 'short' && item.wordCount !== 0) return false;
                if (selectedStructure === 'single' && item.wordCount !== 1) return false;
                if (selectedStructure === 'compound' && item.wordCount !== 2) return false;
            }

            return true;
        });

        // Compute aggregate stats across matching subset
        const count = list.length;
        let totalUsd = 0;
        let maxUsd = 0;
        const prices: number[] = [];

        for (const it of list) {
            totalUsd += it.priceUsd;
            prices.push(it.priceUsd);
            if (it.priceUsd > maxUsd) maxUsd = it.priceUsd;
        }

        const meanUsd = count > 0 ? Math.round(totalUsd / count) : 0;
        prices.sort((a, b) => a - b);
        let medianUsd = 0;
        if (count > 0) {
            const mid = Math.floor(count / 2);
            medianUsd = count % 2 !== 0 ? prices[mid]! : Math.round((prices[mid - 1]! + prices[mid]!) / 2);
        }

        // Sorting
        list.sort((a, b) => {
            if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
            if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
            if (sortBy === 'year-desc') return b.year - a.year;
            if (sortBy === 'year-asc') return a.year - b.year;
            if (sortBy === 'alpha-asc') return a.domain.localeCompare(b.domain);
            return b.priceUsd - a.priceUsd;
        });

        return {
            filtered: list,
            stats: { count, totalUsd, medianUsd, meanUsd, maxUsd },
        };
    }, [initialComps, keyword, selectedTld, selectedCategory, selectedBracketIndex, selectedStructure, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const paginatedItems = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page, pageSize]);

    function handleResetFilters() {
        setKeyword('');
        setSelectedTld('all');
        setSelectedCategory('all');
        setSelectedBracketIndex(0);
        setSelectedStructure('all');
        setSortBy('price-desc');
        setPage(1);
    }

    function exportCsv() {
        const headers = ['Domain', 'SalePriceUSD', 'Year', 'TLD', 'Category', 'Structure', 'SourceVenue', 'Verified'];
        const rows = filtered.map((c) => {
            const structure = c.wordCount === 0 ? 'Short/Brandable' : c.wordCount === 1 ? 'SingleWord' : '2-WordCompound';
            return [
                c.domain,
                c.priceUsd,
                c.year,
                c.tld,
                `"${c.category}"`,
                structure,
                `"${(c.sourceNote || '').replace(/"/g, '""')}"`,
                c.verified ? 'YES' : 'NO',
            ].join(',');
        });
        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `domainvoodoo-comps-${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function copyMarkdownTable() {
        const header = '| Domain | Verified Sale Price (USD) | Year | Extension | Category | Source / Provenance |\n| :--- | :--- | :--- | :--- | :--- | :--- |';
        const rows = filtered.slice(0, 50).map((c) => {
            return `| [${c.domain}](https://prstuvw.xyz/valuation/${encodeURIComponent(c.domain)}) | ${formatUsd(c.priceUsd)} | ${c.year} | .${c.tld} | ${c.category} | ${c.sourceNote} |`;
        });
        const md = `${header}\n${rows.join('\n')}\n\n*Source: [DomainVoodoo CVM-4 Comps Intelligence](https://prstuvw.xyz/comps)*`;
        navigator.clipboard.writeText(md);
        setCopiedMarkdown(true);
        setTimeout(() => setCopiedMarkdown(false), 2500);
    }

    return (
        <div className="space-y-6">
            {/* Econometric Comps Metric Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Analyzed Volume</div>
                    <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {formatUsd(stats.totalUsd)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Across {stats.count} qualified sales</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-brand-400">Median Sale Price</div>
                    <div className="text-xl sm:text-2xl font-black text-brand-300 mt-1">
                        {formatUsd(stats.medianUsd)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">50th percentile baseline</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Mean (Average) Price</div>
                    <div className="text-xl sm:text-2xl font-black text-cyan-300 mt-1">
                        {formatUsd(stats.meanUsd)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Arithmetic transaction mean</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Top Recorded Sale</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
                        {formatUsd(stats.maxUsd)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Historical maximum comp</div>
                </div>

                <div className="col-span-2 lg:col-span-1 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md flex flex-col justify-between">
                    <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Export Comps</div>
                        <div className="text-xs text-slate-400 mt-0.5">Download filtered dataset</div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={exportCsv}
                            className="btn-primary !py-1 !px-2.5 text-[11px] font-bold flex-1 text-center"
                            title="Export Comps to CSV"
                        >
                            📥 CSV
                        </button>
                        <button
                            onClick={copyMarkdownTable}
                            className="btn-secondary !py-1 !px-2.5 text-[11px] font-mono flex-1 text-center"
                            title="Copy Markdown Table"
                        >
                            {copiedMarkdown ? '✓ Copied' : '📋 MD'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Terminal Search & Filter Console */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-xl space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search keyword (e.g. ai, cloud, pay, cars, travel)..."
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                        {keyword && (
                            <button
                                onClick={() => {
                                    setKeyword('');
                                    setPage(1);
                                }}
                                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Quick Search Seed Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-[10px] font-mono text-slate-500">Quick Seeds:</span>
                        {POPULAR_CHIPS.map((chip) => (
                            <button
                                key={chip}
                                onClick={() => {
                                    setKeyword(chip);
                                    setPage(1);
                                }}
                                className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors ${
                                    keyword.toLowerCase() === chip
                                        ? 'bg-brand-500 text-white font-bold'
                                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                                }`}
                            >
                                #{chip}
                            </button>
                        ))}
                    </div>

                    {/* Sort Selector */}
                    <div className="flex items-center gap-2 text-xs font-mono w-full md:w-auto justify-end">
                        <span className="text-slate-400 whitespace-nowrap">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-white text-xs font-mono focus:border-brand-500 focus:outline-none"
                        >
                            <option value="price-desc">Highest Price ($ High to Low)</option>
                            <option value="price-asc">Lowest Price ($ Low to High)</option>
                            <option value="year-desc">Newest Sale Year</option>
                            <option value="year-asc">Oldest Sale Year</option>
                            <option value="alpha-asc">Domain Name (A-Z)</option>
                        </select>
                    </div>
                </div>

                {/* Secondary Filters Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-xs">
                    {/* TLD Filter */}
                    <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Extension (TLD)</label>
                        <select
                            value={selectedTld}
                            onChange={(e) => {
                                setSelectedTld(e.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-white font-mono"
                        >
                            <option value="all">All Extensions (.com, .ai, .io...)</option>
                            {TLD_OPTIONS.filter((t) => t !== 'all').map((tld) => (
                                <option key={tld} value={tld}>.{tld}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Industry Sector</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-white"
                        >
                            <option value="all">All Industry Sectors</option>
                            {CATEGORY_OPTIONS.filter((c) => c !== 'all').map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price Bracket Filter */}
                    <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Valuation Tier</label>
                        <select
                            value={selectedBracketIndex}
                            onChange={(e) => {
                                setSelectedBracketIndex(Number(e.target.value));
                                setPage(1);
                            }}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-white"
                        >
                            {PRICE_BRACKETS.map((b, idx) => (
                                <option key={b.label} value={idx}>{b.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Word Structure */}
                    <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Asset Character Structure</label>
                        <select
                            value={selectedStructure}
                            onChange={(e) => {
                                setSelectedStructure(e.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-white"
                        >
                            {STRUCTURE_OPTIONS.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Filter Status & Reset */}
                <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-500">
                    <div>
                        Showing <strong>{filtered.length}</strong> qualified comps (Page {page} of {totalPages})
                    </div>
                    {(keyword || selectedTld !== 'all' || selectedCategory !== 'all' || selectedBracketIndex !== 0 || selectedStructure !== 'all') && (
                        <button
                            onClick={handleResetFilters}
                            className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-2"
                        >
                            Reset All Filters ↺
                        </button>
                    )}
                </div>
            </div>

            {/* Comps Results Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-slate-800 bg-slate-950/90 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Domain Asset</th>
                                <th className="px-4 py-3 text-right">Sale Price (USD)</th>
                                <th className="px-4 py-3 text-center">Year</th>
                                <th className="px-4 py-3">Sector</th>
                                <th className="px-4 py-3">Verification &amp; Source</th>
                                <th className="px-4 py-3 text-right">Terminal Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                            {paginatedItems.map((comp) => {
                                const isHighTier = comp.priceUsd >= 1_000_000;
                                const isMidTier = comp.priceUsd >= 50_000 && comp.priceUsd < 1_000_000;

                                return (
                                    <tr key={`${comp.domain}-${comp.priceUsd}`} className="hover:bg-slate-800/40 transition-colors group">
                                        {/* Domain */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/valuation/${encodeURIComponent(comp.domain)}`}
                                                    className="font-bold text-sm text-white group-hover:text-brand-400 transition-colors"
                                                >
                                                    {comp.domain}
                                                </Link>
                                                {comp.wordCount === 0 && (
                                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                                                        Short
                                                    </span>
                                                )}
                                                {comp.wordCount === 1 && (
                                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                                                        1-Word
                                                    </span>
                                                )}
                                            </div>
                                            {comp.buyer && (
                                                <div className="text-[10px] text-slate-400 font-sans mt-0.5 truncate max-w-[200px]">
                                                    Acquirer: <span className="text-slate-300 font-semibold">{comp.buyer}</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Sale Price */}
                                        <td className="px-4 py-3 text-right">
                                            <div className={`text-sm font-black ${
                                                isHighTier ? 'text-amber-400' : isMidTier ? 'text-emerald-400' : 'text-slate-200'
                                            }`}>
                                                {formatUsd(comp.priceUsd)}
                                            </div>
                                            <div className="text-[10px] text-slate-500">
                                                {comp.priceUsd >= 10_000_000 ? 'Sovereign' : comp.priceUsd >= 1_000_000 ? '7-Figure' : comp.priceUsd >= 100_000 ? '6-Figure' : 'Aftermarket'}
                                            </div>
                                        </td>

                                        {/* Year */}
                                        <td className="px-4 py-3 text-center">
                                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                                                {comp.year}
                                            </span>
                                        </td>

                                        {/* Category */}
                                        <td className="px-4 py-3 font-sans">
                                            <span className="text-xs text-slate-300">
                                                {comp.category}
                                            </span>
                                        </td>

                                        {/* Source / Provenance */}
                                        <td className="px-4 py-3 font-sans text-slate-400 text-[11px]">
                                            <div className="flex items-center gap-1.5">
                                                {comp.verified ? (
                                                    <span className="text-emerald-400 text-xs" title="Verified Sale Record">✓</span>
                                                ) : (
                                                    <span className="text-slate-500 text-xs" title="Curated Market Baseline Comp">⚖️</span>
                                                )}
                                                <span className="truncate max-w-[240px]">{comp.sourceNote}</span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link
                                                    href={`/valuation/${encodeURIComponent(comp.domain)}`}
                                                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-brand-500 hover:text-brand-300 text-[10px] text-slate-300 font-mono transition-colors"
                                                >
                                                    Value →
                                                </Link>
                                                <Link
                                                    href={`/lander/${encodeURIComponent(comp.domain)}`}
                                                    className="px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500 hover:text-cyan-300 text-[10px] text-slate-400 font-mono transition-colors"
                                                    title="Preview For-Sale Lander"
                                                >
                                                    Lander ↗
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {paginatedItems.length === 0 && (
                    <div className="p-12 text-center text-slate-500 space-y-3 font-mono">
                        <div className="text-3xl">🔍</div>
                        <div className="text-sm text-slate-300 font-bold">No domain comps matched your filters</div>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                            Try expanding your price range, selecting &quot;All Extensions&quot;, or clearing the keyword search box.
                        </p>
                        <button
                            onClick={handleResetFilters}
                            className="btn-secondary !py-1.5 !px-4 text-xs font-mono mt-2"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}

                {/* Pagination Bar */}
                {totalPages > 1 && (
                    <div className="border-t border-slate-800 bg-slate-950/80 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                        <div className="text-slate-400">
                            Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong> ({filtered.length} total comps)
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                ← Prev
                            </button>
                            <span className="text-slate-500 px-1">{page} / {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
