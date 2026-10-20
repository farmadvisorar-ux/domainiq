'use client';

import { useState } from 'react';

interface SedoBannerProps {
    className?: string;
    showBadge?: boolean;
}

export default function SedoBanner({ className = '', showBadge = true }: SedoBannerProps) {
    const [imgSrc, setImgSrc] = useState('https://cdn.sedo.com/c7r/assets/static/images/banner/en/Sedo_Banner_72890_02.jpg');

    return (
        <aside
            aria-label="Sponsored Partner Advertisement"
            className={`w-full max-w-4xl mx-auto rounded-2xl border border-slate-800/90 bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 p-4 sm:p-5 shadow-2xl transition-all hover:border-brand-500/50 ${className}`}
        >
            {showBadge && (
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-3 text-[10px] font-mono flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800 font-bold uppercase tracking-wider">
                            ★ Sponsored Marketplace Partner
                        </span>
                        <span className="text-slate-400 font-semibold">
                            Sedo (728×90 Leaderboard)
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span>Buy, Sell &amp; Park Domains</span>
                        <span>•</span>
                        <a
                            href="https://sedo.com/?language=us&campaignId=336760"
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="text-brand-400 hover:text-brand-300 hover:underline"
                        >
                            Visit Sedo.com ↗
                        </a>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center overflow-hidden py-1">
                <a
                    href="https://sedo.com/?language=us&campaignId=336760"
                    target="_parent"
                    rel="noopener noreferrer sponsored"
                    className="group relative block max-w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    title="Sedo — The World's Leading Domain Marketplace"
                >
                    <img
                        src={imgSrc}
                        alt="Sedo Domain Marketplace - Buy, Sell and Value Premium Domains"
                        width={728}
                        height={90}
                        onError={() => {
                            // If external CDN fails or is blocked, gracefully fall back to local bundled asset
                            setImgSrc('/banners/sedo_728x90.jpg');
                        }}
                        className="rounded-lg border border-slate-800/60 object-contain max-w-full h-auto transition-transform duration-300 group-hover:scale-[1.015] shadow-lg"
                    />
                </a>
            </div>
        </aside>
    );
}
