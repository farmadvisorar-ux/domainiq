'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GlossaryTerm } from '@/data/glossary';

interface GlossaryDirectoryProps {
    terms: GlossaryTerm[];
}

export default function GlossaryDirectory({ terms }: GlossaryDirectoryProps) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const categories = [
        'All',
        'Valuation & Econometrics',
        'Secondary Liquidity & Brokerage',
        'Legal & Trademark (UDRP)',
        'Technical Architecture & DNS',
    ];

    const filtered = terms.filter((item) => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch =
            search.trim() === '' ||
            item.term.toLowerCase().includes(search.toLowerCase()) ||
            item.shortDefinition.toLowerCase().includes(search.toLowerCase()) ||
            item.fullExplanation.toLowerCase().includes(search.toLowerCase()) ||
            (item.formula && item.formula.toLowerCase().includes(search.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const handleCopyCitation = (item: GlossaryTerm) => {
        const textToCopy = `Source: DomainVoodoo Econometric Ontology (2026). "${item.term}": ${item.shortDefinition} Reference: https://prstuvw.xyz/glossary#${item.id}`;
        navigator.clipboard.writeText(textToCopy);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2500);
    };

    return (
        <div className="space-y-8">
            {/* Search & Filter Toolbar */}
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search glossary terms, formulas, or concepts..."
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 font-sans"
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

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span>Showing</span>
                        <span className="font-bold text-brand-400">{filtered.length}</span>
                        <span>ontological definitions</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                                selectedCategory === cat
                                    ? 'bg-brand-500 text-white font-bold shadow-md shadow-brand-500/20'
                                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Glossary Terms List */}
            <div className="space-y-6">
                {filtered.map((item) => (
                    <article
                        key={item.id}
                        id={item.id}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4 hover:border-brand-500/40 transition-all duration-300 shadow-xl scroll-mt-24 group relative"
                    >
                        {/* Header bar */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-brand-950 text-brand-300 border border-brand-800 font-semibold">
                                {item.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleCopyCitation(item)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-700/80 hover:border-brand-500 text-[11px] font-mono text-slate-300 hover:text-white transition-all shadow-sm"
                                    title="Copy structured citation for research papers or AI models"
                                >
                                    <span>{copiedId === item.id ? '✓ Copied Citation' : '📋 Copy Citation for AI / Paper'}</span>
                                </button>
                                <a
                                    href={`#${item.id}`}
                                    className="text-slate-500 hover:text-brand-400 font-mono text-xs"
                                    title="Permanent Link"
                                >
                                    #{item.id}
                                </a>
                            </div>
                        </div>

                        {/* Term Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
                            {item.term}
                        </h2>

                        {/* Short Definition (AEO Target) */}
                        <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-950/20 p-4 space-y-1.5">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Core Econometric Definition (AI Answer Engine Snippet)</span>
                            </div>
                            <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                                {item.shortDefinition}
                            </p>
                        </div>

                        {/* Full In-Depth Explanation */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                            {item.fullExplanation}
                        </p>

                        {/* Formula if available */}
                        {item.formula && (
                            <div className="rounded-xl bg-slate-950 border border-brand-500/30 p-3.5 space-y-1">
                                <div className="text-[10px] font-mono uppercase tracking-wider text-brand-400 font-bold">
                                    Mathematical Formula / Valuation Logic
                                </div>
                                <code className="block text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                                    {item.formula}
                                </code>
                            </div>
                        )}

                        {/* Real-World Market Example */}
                        <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-3.5 flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="text-base leading-none mt-0.5">💡</span>
                            <div>
                                <strong className="text-slate-200">Real-World Application: </strong>
                                <span>{item.example}</span>
                            </div>
                        </div>

                        {/* Related Cross Links */}
                        {item.relatedTerms && item.relatedTerms.length > 0 && (
                            <div className="pt-2 flex items-center gap-2 flex-wrap text-xs font-mono text-slate-400">
                                <span>Related concepts:</span>
                                {item.relatedTerms.map((relId) => {
                                    const relTerm = terms.find((t) => t.id === relId);
                                    if (!relTerm) return null;
                                    return (
                                        <a
                                            key={relId}
                                            href={`#${relId}`}
                                            className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-brand-300 hover:bg-slate-700 transition-colors"
                                        >
                                            {relTerm.term}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}
