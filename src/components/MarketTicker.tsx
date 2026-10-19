'use client';

import Link from 'next/link';

const LIVE_COMPS = [
    { domain: 'insurance.com', price: '$35,600,000', cat: 'Fintech / Mega' },
    { domain: 'ghost.ai', price: '$350,000', cat: '🎃 Spooky Tech' },
    { domain: 'voice.com', price: '$30,000,000', cat: 'Tech' },
    { domain: 'haunted.com', price: '$85,000', cat: '🎃 Category' },
    { domain: 'chat.com', price: '$15,500,000', cat: 'AI / Brand' },
    { domain: 'voodoo.io', price: '$120,000', cat: '🧙 Brandable SaaS' },
    { domain: 'crypto.com', price: '$12,000,000', cat: 'Web3' },
    { domain: 'pumpkin.com', price: '$195,000', cat: '🎃 Seasonal Asset' },
    { domain: 'ai.com', price: '$11,000,000', cat: 'AI Category' },
    { domain: 'sky.com', price: '$1,800,000', cat: '3-Letter .com' },
    { domain: 'prompt.com', price: '$850,000', cat: 'Generative AI' },
    { domain: 'cloudscale.ai', price: '$42,500', cat: 'Enterprise SaaS' },
    { domain: 'cobalt.com', price: '$38,000', cat: 'Brandable' },
    { domain: 'smartpay.com', price: '$28,000', cat: 'Payment Gateway' },
    { domain: 'apexcapital.com', price: '$25,000', cat: 'Private Equity' },
];

export default function MarketTicker() {
    return (
        <div className="relative border-b border-orange-900/40 bg-slate-950 text-slate-300 text-[11px] font-mono overflow-hidden select-none z-30 shadow-sm shadow-orange-950/20">
            <div className="mx-auto max-w-7xl flex items-center h-8 px-3">
                {/* Fixed Label Tag with Halloween styling */}
                <div className="flex items-center gap-1.5 shrink-0 bg-slate-900/90 text-orange-400 font-bold px-2 py-0.5 rounded border border-orange-500/40 mr-3 shadow-sm shadow-orange-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                    </span>
                    <span className="tracking-widest uppercase flex items-center gap-1">
                        <span>🎃</span>
                        <span>SPOOKY RADAR</span>
                    </span>
                </div>

                {/* Animated Marquee Strip */}
                <div className="overflow-hidden whitespace-nowrap flex-1 relative [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]">
                    <div className="inline-flex gap-6 animate-ticker hover:[animation-play-state:paused]">
                        {[...LIVE_COMPS, ...LIVE_COMPS].map((c, i) => (
                            <Link
                                key={`${c.domain}-${i}`}
                                href={`/valuation/${encodeURIComponent(c.domain)}`}
                                className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                            >
                                <span className="font-semibold text-slate-200 group-hover:text-brand-300 underline-offset-2 group-hover:underline">
                                    {c.domain}
                                </span>
                                <span className="text-emerald-400 font-bold">{c.price}</span>
                                <span className="text-slate-500 text-[10px]">({c.cat})</span>
                                <span className="text-slate-600">·</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Status Pill */}
                <div className="hidden lg:flex items-center gap-1.5 text-slate-400 ml-3 text-[10px] shrink-0">
                    <span className="text-brand-400 font-bold">14.8M+</span>
                    <span>Sales Indexed</span>
                </div>
            </div>
        </div>
    );
}
