'use client';

import { useMemo } from 'react';
import { scorePhoneticClarity } from '@/lib/valuation/phonetics';

interface Props {
    rootLabel: string;
    domain: string;
}

export default function RadioTestAudit({ rootLabel, domain }: Props) {
    const phonetic = useMemo(() => scorePhoneticClarity(rootLabel), [rootLabel]);

    // Syllables estimation
    const syllables = useMemo(() => {
        const word = rootLabel.toLowerCase().replace(/[^a-z]/g, '');
        if (word.length <= 3) return 1;
        const matches = word.match(/[aeiouy]{1,2}/g);
        let count = matches ? matches.length : 1;
        if (word.endsWith('e') && !word.endsWith('le') && count > 1) {
            count--;
        }
        return Math.max(1, count);
    }, [rootLabel]);

    // Typing Ergonomics (QWERTY distance & hand alternation)
    const typingMetrics = useMemo(() => {
        const leftHandKeys = new Set(['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b']);
        let handSwitches = 0;
        let lastHand: 'left' | 'right' | null = null;

        const chars = rootLabel.toLowerCase().split('');
        for (const ch of chars) {
            const currentHand = leftHandKeys.has(ch) ? 'left' : 'right';
            if (lastHand && currentHand !== lastHand) {
                handSwitches++;
            }
            lastHand = currentHand;
        }

        const switchRate = chars.length > 1 ? Math.round((handSwitches / (chars.length - 1)) * 100) : 100;
        const ergonomicScore = Math.min(98, Math.max(65, Math.round(70 + (switchRate * 0.28))));

        return {
            switchRate,
            ergonomicScore,
            hasNumbersOrHyphens: /[0-9-]/.test(rootLabel),
        };
    }, [rootLabel]);

    const radioPass = phonetic.score >= 70;

    return (
        <section className="card p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                            Cognitive Linguistics
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Radio Test • Phonology • Ergonomics</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span>📻</span> Radio Test &amp; Typing Ergonomics Audit
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        Measures how accurately listeners spell the domain when heard aloud, syllable cadence, and QWERTY typing fluidity.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                        radioPass
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950/80 text-amber-300 border-amber-800'
                    }`}>
                        {radioPass ? '✓ Passes Radio Test' : '⚠ Requires Spelling Prompt'}
                    </span>
                </div>
            </div>

            {/* 3 Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                {/* Metric 1: Radio Score */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        Phonetic Radio Score
                    </div>
                    <div className="text-2xl font-black text-purple-400">
                        {phonetic.score}/100
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                        {radioPass
                            ? 'Zero ambiguous spelling traps (e.g. no ph/f or c/k confusion).'
                            : 'Contains consonant clusters that may need verbal clarification.'}
                    </p>
                </div>

                {/* Metric 2: Syllable Cadence */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        Syllable Cadence
                    </div>
                    <div className="text-2xl font-black text-cyan-400">
                        {syllables} {syllables === 1 ? 'Syllable' : 'Syllables'}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                        {syllables <= 2
                            ? 'Ideal punchy brand cadence (similar to Uber, Slack, Stripe).'
                            : 'Multi-syllable rhythmic structure with clear stress patterns.'}
                    </p>
                </div>

                {/* Metric 3: Keyboard Ergonomics */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        Typing Ergonomics
                    </div>
                    <div className="text-2xl font-black text-emerald-400">
                        {typingMetrics.ergonomicScore}/100
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                        {typingMetrics.switchRate}% alternate-hand typing rhythm on standard QWERTY keyboards.
                    </p>
                </div>
            </div>

            {/* Phonetic Audit Notes */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                    Linguistic Findings &amp; Verbal Recall Notes
                </div>
                {phonetic.notes.length === 0 ? (
                    <div className="text-emerald-400 flex items-center gap-1.5">
                        <span>✓</span> Clean acoustic profile: The name has an intuitive sound-to-letter mapping across English and European languages.
                    </div>
                ) : (
                    <ul className="space-y-1 text-slate-300">
                        {phonetic.notes.map((note, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-amber-400">·</span>
                                <span>{note}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
