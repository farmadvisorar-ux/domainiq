'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DOMAIN_SALE_RECORDS, DomainSaleRecord } from '@/data/records';

export default function SalesRecordsTable() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTld, setSelectedTld] = useState<string>('All');
    const [sortBy, setSortBy] = useState<'price' | 'year' | 'rank'>('rank');

    const categories = ['All', 'Tech & AI', 'Finance & Insurance', 'E-commerce & Retail', 'Travel & Luxury', 'Gaming & Entertainment', 'Short Acronyms'];
    const tlds = ['All', 'com', 'ai', 'xyz'];

    const filtered = DOMAIN_SALE_RECORDS.filter((item) => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesTld = selectedTld === 'All' || item.tld.toLowerCase() === selectedTld.toLowerCase();
        const matchesSearch =
            search.trim() === '' ||
            item.domain.toLowerCase().includes(search.toLowerCase()) ||
            item.buyer.toLowerCase().includes(search.toLowerCase()) ||
            item.venue.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesTld && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === 'price') return b.priceUsd - a.priceUsd;
        if (sortBy === 'year') return b.year - a.year;
        return a.rank - b.rank;
    });

    return (
        <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by domain, buyer (e.g. Tesla, Apple), or venue..."
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-slate-400">Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-white text-xs font-mono focus:border-brand-500 focus:outline-none"
                        >
                            <option value="rank">Highest Price (Rank)</option>
                            <option value="year">Newest First (Year)</option>
                        </select>
                    </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-col gap-2.5 pt-1">
                    {/* Category filters */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                        <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">Category:</span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? 'bg-brand-500 text-white font-bold'
                                        : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* TLD filters */}
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400">Extension:</span>
                        {tlds.map((tld) => (
                            <button
                                key={tld}
                                onClick={() => setSelectedTld(tld)}
                                className={`px-2.5 py-0.5 rounded text-xs font-mono transition-all ${
                                    selectedTld === tld
                                        ? 'bg-purple-600 text-white font-bold'
                                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                                }`}
                            >
                                {tld === 'All' ? 'All TLDs' : `.${tld}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sales Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-300 font-mono">
                            <th className="p-3 sm:p-4 whitespace-nowrap text-center">Rank</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Domain Name</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap text-right">Verified Price</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Year</th>
                            <th className="p-3 sm:p-4">Acquirer / Buyer</th>
                            <th className="p-3 sm:p-4">Escrow / Broker</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                        {filtered.map((rec) => (
                            <tr key={rec.rank} className="hover:bg-slate-800/40 transition-colors group">
                                <td className="p-3 sm:p-4 font-mono font-bold text-slate-400 text-center">
                                    #{rec.rank}
                                </td>
                                <td className="p-3 sm:p-4">
                                    <div className="space-y-0.5">
                                        <div className="font-mono font-bold text-base text-white group-hover:text-brand-300 transition-colors flex items-center gap-1.5">
                                            <span>{rec.domain}</span>
                                            {rec.verified && (
                                                <span className="text-[10px] text-emerald-400" title="SEC / Escrow Verified Sale">✓</span>
                                            )}
                                        </div>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                                            {rec.category}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-3 sm:p-4 font-mono font-black text-emerald-400 text-base text-right whitespace-nowrap">
                                    {rec.priceFormatted}
                                </td>
                                <td className="p-3 sm:p-4 font-mono text-slate-300 whitespace-nowrap">
                                    {rec.year}
                                </td>
                                <td className="p-3 sm:p-4 text-slate-300 text-xs font-medium">
                                    {rec.buyer}
                                </td>
                                <td className="p-3 sm:p-4 text-slate-400 text-xs font-mono">
                                    {rec.venue}
                                </td>
                                <td className="p-3 sm:p-4 text-center whitespace-nowrap">
                                    <Link
                                        href={`/valuation/${encodeURIComponent(rec.domain.toLowerCase())}`}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-950 border border-brand-800 text-[11px] font-mono text-brand-300 hover:text-white hover:bg-brand-900 transition-all shadow-sm"
                                    >
                                        <span>Valuate Today</span>
                                        <span>→</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
