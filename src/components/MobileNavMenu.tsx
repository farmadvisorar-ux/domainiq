'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AltHuntBadge from './AltHuntBadge';
import LogoutButton from './LogoutButton';

interface MobileNavMenuProps {
    session?: {
        email: string;
        plan?: string;
    } | null;
}

interface NavLink {
    href: string;
    label: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
}

const TOOLS_LINKS: NavLink[] = [
    { href: '/', label: 'Instant Valuator', icon: '⚡', badge: 'Core', badgeColor: 'bg-brand-950 text-brand-300 border-brand-800' },
    { href: '/compare', label: 'Domain Comparer', icon: '⚖️' },
    { href: '/bulk', label: 'Bulk Portfolio Appraisal', icon: '📦', badge: 'Pro', badgeColor: 'bg-purple-950 text-purple-300 border-purple-800' },
    { href: '/drops', label: 'Expiring Drop Radar', icon: '⏳' },
    { href: '/suggest', label: 'Name Generator', icon: '✨' },
    { href: '/extension', label: 'Chrome & Edge Extension', icon: '🧩', badge: 'New', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
];

const INTEL_LINKS: NavLink[] = [
    { href: '/records', label: 'Top 100 Historical Sales', icon: '🏆', badge: 'Hall of Fame', badgeColor: 'bg-amber-950 text-amber-300 border-amber-800' },
    { href: '/tld', label: 'TLD Valuation Directory', icon: '🌐' },
    { href: '/articles', label: 'Research Articles & Whitepapers', icon: '📚' },
    { href: '/aeo', label: 'AEO & Direct Answers Portal', icon: '🤖', badge: 'AI', badgeColor: 'bg-purple-950 text-purple-300 border-purple-800' },
    { href: '/domain-worth-calculator', label: 'Domain Worth Calculator Guide', icon: '📖' },
    { href: '/draftline', label: 'Draftline.com Enterprise Audit', icon: '🏢' },
];

const RESOURCE_LINKS: NavLink[] = [
    { href: '/api-docs', label: 'Developer REST API v1', icon: '⚡' },
    { href: '/how-it-works', label: 'Pricing Methodology', icon: '🔬' },
    { href: '/pricing', label: 'Account Tiers & Quotas', icon: '💳' },
    { href: '/extension/support', label: 'Chrome Store Support & FAQ', icon: '🛠️' },
    { href: '/support', label: 'Help & Contact Center', icon: '💬' },
    { href: '/advertise', label: 'Advertise on DomainVoodoo', icon: '★', badge: 'Sponsor', badgeColor: 'bg-amber-950 text-amber-300 border-amber-800' },
];

export default function MobileNavMenu({ session }: MobileNavMenuProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Auto-close menu on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Lock body scrolling when drawer is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <div className="lg:hidden">
            {/* Hamburger / Close Button */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close main menu' : 'Open main menu'}
                aria-expanded={open}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/90 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-800 active:scale-95 transition-all shadow-md shadow-black/40"
            >
                {open ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <div className="flex flex-col gap-1.5 items-center justify-center">
                        <span className="block h-0.5 w-5 rounded-full bg-slate-200"></span>
                        <span className="block h-0.5 w-5 rounded-full bg-slate-200"></span>
                        <span className="block h-0.5 w-3.5 self-start rounded-full bg-orange-400"></span>
                    </div>
                )}
            </button>

            {/* Mobile Navigation Drawer Overlay */}
            {open && (
                <div className="fixed inset-x-0 top-[calc(2.5rem+3.5rem)] bottom-0 bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800/90 z-50 flex flex-col overflow-hidden animate-in fade-in duration-200">
                    {/* Top Status & Account Quick Bar */}
                    <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/60">
                        {session ? (
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="h-8 w-8 rounded-full bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-xs font-bold text-brand-300 font-mono shrink-0">
                                        {session.email.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-bold text-white truncate font-mono">
                                            {session.email}
                                        </div>
                                        <div className="text-[10px] text-emerald-400 font-mono capitalize">
                                            {session.plan || 'Free Member'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setOpen(false)}
                                        className="btn-primary !py-1.5 !px-3 text-xs font-semibold"
                                    >
                                        Dashboard
                                    </Link>
                                    <LogoutButton />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2.5">
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="btn-secondary !py-2.5 text-center text-xs font-bold flex items-center justify-center"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setOpen(false)}
                                    className="btn-primary !py-2.5 text-center text-xs font-bold flex items-center justify-center shadow-lg shadow-brand-500/20"
                                >
                                    Sign Up Free →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Scrollable Links Container */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                        {/* Section 1: Valuation Tools */}
                        <div className="space-y-2">
                            <div className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <span className="text-orange-400">⚡</span>
                                <span>Valuation Tools</span>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                {TOOLS_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 ${
                                            pathname === link.href
                                                ? 'bg-brand-950/80 text-brand-300 border border-brand-800 font-semibold'
                                                : 'bg-slate-900/50 hover:bg-slate-900 text-slate-200 border border-slate-800/60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base">{link.icon}</span>
                                            <span className="text-sm font-medium">{link.label}</span>
                                        </div>
                                        {link.badge && (
                                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${link.badgeColor}`}>
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Section 2: Market Intelligence */}
                        <div className="space-y-2">
                            <div className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <span className="text-amber-400">📊</span>
                                <span>Market Intelligence</span>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                {INTEL_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 ${
                                            pathname === link.href
                                                ? 'bg-amber-950/80 text-amber-300 border border-amber-800 font-semibold'
                                                : 'bg-slate-900/50 hover:bg-slate-900 text-slate-200 border border-slate-800/60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base">{link.icon}</span>
                                            <span className="text-sm font-medium">{link.label}</span>
                                        </div>
                                        {link.badge && (
                                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${link.badgeColor}`}>
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Section 3: Developer & Support */}
                        <div className="space-y-2">
                            <div className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <span className="text-indigo-400">🛠️</span>
                                <span>Developer &amp; Support</span>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                {RESOURCE_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 ${
                                            pathname === link.href
                                                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800 font-semibold'
                                                : 'bg-slate-900/50 hover:bg-slate-900 text-slate-200 border border-slate-800/60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-base">{link.icon}</span>
                                            <span className="text-sm font-medium">{link.label}</span>
                                        </div>
                                        {link.badge && (
                                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${link.badgeColor}`}>
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* AltHunt Featured Badge & Live System Status */}
                        <div className="pt-2 pb-6 border-t border-slate-900 flex flex-col items-center gap-3">
                            <AltHuntBadge />
                            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span>All 6 Valuation Models Operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
