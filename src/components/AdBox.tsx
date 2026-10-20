'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AdSlotData } from '@/lib/admin-data';

interface Props {
    slotId: 1 | 2 | 3 | 4;
    variant?: 'billboard' | 'showcase' | 'tile' | 'banner';
    className?: string;
    initialData?: AdSlotData;
    showPlacementTag?: boolean;
}

const SLOT_META = {
    1: {
        slotName: 'Ad Space #1: Header Billboard',
        format: '728x90 Billboard',
        availableTitle: 'Header Hero Billboard (728x90) • Prime Placement Space Available',
        badge: 'Box #1 • Top Billboard',
        price: '$499/mo',
        views: '45,000+ views/mo',
        desc: 'Featured above the fold across DomainVoodoo homepage and high-intent tools. Direct exposure to domain investors, startups, and capital acquirers.',
        accentColor: 'from-brand-500 to-indigo-600',
        badgeBg: 'bg-brand-950/90 text-brand-300 border-brand-800',
    },
    2: {
        slotName: 'Ad Space #2: Valuation Report Showcase',
        format: 'Featured Showcase Box',
        availableTitle: 'Valuation Report Showcase • Native Appraisal Space Available',
        badge: 'Box #2 • Valuation Showcase',
        price: '$399/mo',
        views: '28,000+ views/mo',
        desc: 'Embedded directly inside official domain appraisal reports. Reaches high-intent buyers and sellers actively negotiating domain valuations and transactions.',
        accentColor: 'from-indigo-600 to-purple-600',
        badgeBg: 'bg-indigo-950/90 text-indigo-300 border-indigo-800',
    },
    3: {
        slotName: 'Ad Space #3: Tools & Calculator Tile',
        format: '300x250 Medium Rectangle Tile',
        availableTitle: 'Calculator & Intelligence Tile (300x250) • Space Available',
        badge: 'Box #3 • Calculator Tile',
        price: '$299/mo',
        views: '22,000+ views/mo',
        desc: 'Embedded within our viral domain worth calculators, comparison matrix, and brandable name tools.',
        accentColor: 'from-cyan-600 to-blue-600',
        badgeBg: 'bg-cyan-950/90 text-cyan-300 border-cyan-800',
    },
    4: {
        slotName: 'Ad Space #4: Sitewide Footer Leaderboard',
        format: 'Horizontal Leaderboard',
        availableTitle: 'Sitewide Bottom Leaderboard • Universal Space Available',
        badge: 'Box #4 • Footer Leaderboard',
        price: '$199/mo',
        views: '35,000+ views/mo',
        desc: 'Prominent horizontal leaderboard displayed above the footer across every single page and tool on DomainVoodoo.',
        accentColor: 'from-amber-600 to-orange-600',
        badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-800',
    },
};

function getInitials(name?: string): string {
    if (!name) return 'DV';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export default function AdBox({
    slotId,
    variant = 'banner',
    className = '',
    initialData,
    showPlacementTag = true,
}: Props) {
    const [slot, setSlot] = useState<AdSlotData | null>(initialData ?? null);
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        // Revalidate or fetch live configuration from the server
        const controller = new AbortController();
        fetch(`/api/admin/ads?t=${Date.now()}`, {
            cache: 'no-store',
            signal: controller.signal,
        })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data?.slots) {
                    const target = data.slots.find((s: AdSlotData) => s.id === slotId);
                    if (target) {
                        setSlot(target);
                    }
                }
            })
            .catch(() => {
                // Fall back gracefully to initial or default
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [slotId]);

    const meta = SLOT_META[slotId] || SLOT_META[1];

    if (loading && !slot) {
        return (
            <div className={`rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 animate-pulse min-h-[96px] ${className}`}>
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 w-28 bg-slate-800 rounded" />
                    <div className="h-4 w-16 bg-slate-800/60 rounded" />
                </div>
                <div className="h-5 w-64 bg-slate-800 rounded mb-2" />
                <div className="h-3 w-96 max-w-full bg-slate-800/50 rounded" />
            </div>
        );
    }

    // =========================================================================
    // STATE A: AD SPACE IS OPEN / AVAILABLE FOR PURCHASE
    // =========================================================================
    if (!slot || !slot.is_active) {
        return (
            <div
                className={`group relative rounded-2xl border-2 border-dashed border-brand-500/40 hover:border-brand-400 bg-gradient-to-r from-slate-900/95 via-indigo-950/25 to-slate-900/95 p-4 sm:p-5 shadow-xl transition-all hover:shadow-brand-500/10 ${className}`}
            >
                {/* Placement Header Banner */}
                {showPlacementTag && (
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-3.5 flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-950 text-brand-300 border border-brand-700/80 shadow-sm">
                                📢 {meta.slotName}
                            </span>
                            <span className="text-[10px] font-mono font-semibold text-slate-400">
                                {meta.format}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-mono">
                            <span className="text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                                {meta.price}
                            </span>
                            <span className="text-slate-400 hidden sm:inline">• {meta.views}</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-200 transition-colors">
                                {meta.availableTitle}
                            </h4>
                        </div>
                        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                            {meta.desc}
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2.5">
                        <Link
                            href={`/advertise?slot=${slotId}`}
                            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white border border-brand-400/40 transition-all shadow-lg shadow-brand-500/25 group-hover:scale-105 whitespace-nowrap"
                        >
                            ★ Reserve This Spot ({meta.price}) →
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // =========================================================================
    // STATE B: AD SPACE IS ACTIVE (LIVE ON SITE)
    // =========================================================================
    const clickUrl = `/api/ads/click/${slot.id}`;
    const initials = getInitials(slot.sponsor_name || slot.title);

    // Variant 1: Billboard (Top of Page / Hero Placement)
    if (variant === 'billboard') {
        return (
            <div
                className={`relative rounded-2xl border-2 border-brand-500/40 hover:border-brand-400/80 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-5 sm:p-6 shadow-2xl transition-all group overflow-hidden ${className}`}
            >
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Clear Location Tag & Sponsor Ribbon */}
                {showPlacementTag && (
                    <div className="relative z-10 flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-4 text-[10px] font-mono flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider bg-brand-950 text-brand-300 border border-brand-700/80">
                                📢 {meta.slotName}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-bold uppercase">
                                {slot.badge || 'Verified Partner'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <span>Sponsor: <strong className="text-white">{slot.sponsor_name}</strong></span>
                            <span>•</span>
                            <Link href={`/advertise?slot=${slotId}`} className="text-brand-400 hover:text-brand-300 hover:underline">
                                Advertise in this spot ↗
                            </Link>
                        </div>
                    </div>
                )}

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                        {slot.image_url ? (
                            <img
                                src={slot.image_url}
                                alt={slot.sponsor_name}
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-700 shrink-0 shadow-lg bg-slate-950"
                            />
                        ) : (
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-mono font-black text-xl shadow-lg shadow-brand-500/20 shrink-0 border border-brand-400/30">
                                {initials}
                            </div>
                        )}

                        <div className="space-y-1">
                            <h3 className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-brand-200 transition-colors">
                                {slot.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                                {slot.description}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                        <a
                            href={clickUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-xl shadow-brand-500/30 border border-brand-400/40 transition-all group-hover:scale-105 whitespace-nowrap"
                        >
                            {slot.cta_text || 'Visit Offer →'}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 2: Showcase (Inside Valuation Reports)
    if (variant === 'showcase') {
        return (
            <div
                className={`relative rounded-2xl border-2 border-indigo-500/40 hover:border-indigo-400 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 p-5 sm:p-6 shadow-2xl transition-all group overflow-hidden ${className}`}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Clear Location Tag */}
                {showPlacementTag && (
                    <div className="relative z-10 flex items-center justify-between gap-2 border-b border-indigo-900/60 pb-2.5 mb-4 text-[10px] font-mono flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-700/80">
                                💎 {meta.slotName}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-brand-950/80 text-brand-300 border border-brand-800 font-bold uppercase">
                                {slot.badge || 'Featured Showcase'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <span>Partner: <strong className="text-white">{slot.sponsor_name}</strong></span>
                            <span>•</span>
                            <Link href={`/advertise?slot=${slotId}`} className="text-indigo-400 hover:text-indigo-300 hover:underline">
                                Advertise in this report ↗
                            </Link>
                        </div>
                    </div>
                )}

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                        {slot.image_url ? (
                            <img
                                src={slot.image_url}
                                alt={slot.sponsor_name}
                                className="w-14 h-14 rounded-2xl object-cover border border-indigo-700/60 shrink-0 shadow-lg bg-slate-950"
                            />
                        ) : (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-mono font-black text-xl shadow-lg shadow-indigo-500/20 shrink-0 border border-indigo-400/30">
                                {initials}
                            </div>
                        )}

                        <div className="space-y-1">
                            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                                {slot.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                                {slot.description}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <a
                            href={clickUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all whitespace-nowrap"
                        >
                            {slot.cta_text || 'Visit Partner →'}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 3: Tile (Calculator & Tools Placement)
    if (variant === 'tile') {
        return (
            <div
                className={`relative rounded-2xl border-2 border-cyan-500/30 hover:border-cyan-400 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-xl transition-all group flex flex-col justify-between ${className}`}
            >
                <div className="space-y-3">
                    {/* Clear Location Tag */}
                    {showPlacementTag && (
                        <div className="flex items-center justify-between gap-2 border-b border-cyan-900/60 pb-2 text-[10px] font-mono flex-wrap">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800">
                                ⚡ {meta.slotName}
                            </span>
                            <span className="text-slate-400 font-bold">{slot.sponsor_name}</span>
                        </div>
                    )}

                    {slot.image_url ? (
                        <div className="w-full h-28 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                            <img
                                src={slot.image_url}
                                alt={slot.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-16 rounded-xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-800/60 flex items-center justify-center gap-2">
                            <span className="font-mono font-black text-cyan-300 text-lg">{initials}</span>
                            <span className="text-xs text-slate-300 font-mono font-semibold">• {slot.sponsor_name}</span>
                        </div>
                    )}

                    <div>
                        <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider mb-1">
                            {slot.badge || 'Recommended Partner'}
                        </div>
                        <h5 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                            {slot.title}
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1">
                            {slot.description}
                        </p>
                    </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/80">
                    <a
                        href={clickUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-500/25 transition-all"
                    >
                        {slot.cta_text || 'Explore Offer →'}
                    </a>
                </div>
            </div>
        );
    }

    // Variant 4: Standard Banner (Footer & Sitewide Leaderboard)
    return (
        <div
            className={`relative rounded-2xl border-2 border-slate-700 hover:border-slate-500 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-4 sm:p-5 shadow-xl transition-all group ${className}`}
        >
            {/* Clear Location Tag */}
            {showPlacementTag && (
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-3 text-[10px] font-mono flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-800 text-slate-200 border border-slate-700">
                            📢 {meta.slotName}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800 font-semibold uppercase">
                            {slot.badge || 'Official Partner'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <span>Sponsor: <strong className="text-slate-200">{slot.sponsor_name}</strong></span>
                        <span>•</span>
                        <Link href={`/advertise?slot=${slotId}`} className="text-slate-400 hover:text-white hover:underline">
                            Advertise here ↗
                        </Link>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                    {slot.image_url ? (
                        <img
                            src={slot.image_url}
                            alt={slot.sponsor_name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0 bg-slate-950"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-indigo-900 border border-slate-700 flex items-center justify-center font-mono font-black text-white text-base shrink-0 shadow">
                            {initials}
                        </div>
                    )}
                    <div className="space-y-0.5">
                        <h5 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                            {slot.title}
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                            {slot.description}
                        </p>
                    </div>
                </div>

                <div className="shrink-0 pt-2 sm:pt-0">
                    <a
                        href={clickUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20 transition-all whitespace-nowrap"
                    >
                        {slot.cta_text || 'Learn More →'}
                    </a>
                </div>
            </div>
        </div>
    );
}
