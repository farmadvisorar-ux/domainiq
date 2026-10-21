'use client';

import { useState } from 'react';
import type { OutboundPitchTemplate } from '@/lib/valuation/prospector';

interface Props {
    templates: OutboundPitchTemplate[];
    domain: string;
}

export default function PitchGenerator({ templates, domain }: Props) {
    const [activeTab, setActiveTab] = useState(templates[0]?.id ?? '');
    const [copiedSubject, setCopiedSubject] = useState(false);
    const [copiedBody, setCopiedBody] = useState(false);

    const activeTemplate = templates.find((t) => t.id === activeTab) ?? templates[0];
    if (!activeTemplate) return null;

    const label = domain.split('.')[0] || domain;

    async function handleCopyBody() {
        try {
            await navigator.clipboard.writeText(
                `Subject: ${activeTemplate?.subjectLine}\n\n${activeTemplate?.bodyText}`,
            );
            setCopiedBody(true);
            setTimeout(() => setCopiedBody(false), 2200);
        } catch {
            // fallback
        }
    }

    async function handleCopySubject() {
        try {
            await navigator.clipboard.writeText(activeTemplate?.subjectLine ?? '');
            setCopiedSubject(true);
            setTimeout(() => setCopiedSubject(false), 2000);
        } catch {
            // fallback
        }
    }

    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-5">
            {/* Template Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                {templates.map((tmpl) => {
                    const isSelected = tmpl.id === activeTab;
                    return (
                        <button
                            key={tmpl.id}
                            type="button"
                            onClick={() => {
                                setActiveTab(tmpl.id);
                                setCopiedSubject(false);
                                setCopiedBody(false);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                isSelected
                                    ? 'bg-brand-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                            }`}
                        >
                            {tmpl.name}
                        </button>
                    );
                })}
            </div>

            {/* Template Details */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-slate-500 font-mono">
                    <span>
                        <strong>Target Segment:</strong> {activeTemplate.bestFor}
                    </span>
                    <span className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">
                        Pre-populated with {domain} valuation &amp; lease terms
                    </span>
                </div>

                {/* Subject Line Field */}
                <div>
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                        <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                            Recommended Subject Line
                        </span>
                        <button
                            type="button"
                            onClick={handleCopySubject}
                            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                        >
                            {copiedSubject ? '✓ Copied Subject' : 'Copy Subject'}
                        </button>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/80 p-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 select-all font-mono">
                        {activeTemplate.subjectLine}
                    </div>
                </div>

                {/* Email Body */}
                <div>
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                        <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                            Outbound Pitch Body
                        </span>
                        <span className="text-[10px] text-slate-400">Ready to personalize</span>
                    </div>
                    <pre className="rounded-lg bg-slate-50 dark:bg-slate-800/80 p-3.5 text-xs font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                        {activeTemplate.bodyText}
                    </pre>
                </div>

                {/* Copy Call-To-Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono">
                    <button
                        type="button"
                        onClick={handleCopyBody}
                        className={`btn-primary w-full sm:w-auto !py-2.5 !px-5 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            copiedBody ? '!bg-emerald-600 !border-emerald-600' : ''
                        }`}
                    >
                        <span>{copiedBody ? '✓ Pitch Copied to Clipboard!' : '📋 Copy Complete Email Pitch'}</span>
                    </button>
                    <p className="text-[11px] text-slate-400 text-center sm:text-right">
                        Replace bracketed placeholders (e.g. [Founder Name]) before sending.
                    </p>
                </div>
            </div>

            {/* 1-Click Live Buyer Prospect Finder */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5 font-mono">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <span>🔍</span> 1-Click Corporate Buyer Hunter:
                    </span>
                    <span className="text-[10px] text-slate-500">Live External Prospect Discovery</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                    <a
                        href={`https://www.google.com/search?q=site:linkedin.com/company+"${encodeURIComponent(label)}"`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                        <span>💼</span> Search Companies on LinkedIn ↗
                    </a>

                    <a
                        href={`https://www.google.com/search?q=site:crunchbase.com/organization+"${encodeURIComponent(label)}"`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                        <span>🚀</span> Search Funded Startups on Crunchbase ↗
                    </a>

                    <a
                        href={`https://www.google.com/search?q="get${encodeURIComponent(label)}"+OR+"try${encodeURIComponent(label)}"+OR+"${encodeURIComponent(label)}.io"+OR+"${encodeURIComponent(label)}.co"`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                        <span>🎯</span> Find Brand Upgrade Candidates (get/try prefixes) ↗
                    </a>
                </div>
            </div>
        </div>
    );
}
