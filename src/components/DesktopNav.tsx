'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DesktopNavProps {
    showDashboard: boolean;
}

interface NavItem {
    href: string;
    label: string;
    desc: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
}

const TOOLS_ITEMS: NavItem[] = [
    {
        href: '/',
        label: 'Instant Valuator',
        desc: 'Deterministic multi-channel valuation & comps',
        icon: '⚡',
        badge: 'Core',
        badgeColor: 'bg-brand-950 text-brand-300 border-brand-800',
    },
    {
        href: '/compare',
        label: 'Domain Comparer',
        desc: 'Side-by-side head-to-head metric showdown',
        icon: '⚖️',
    },
    {
        href: '/bulk',
        label: 'Bulk Portfolio Appraisal',
        desc: 'Batch evaluate up to 500 domains with CSV export',
        icon: '📦',
        badge: 'Pro',
        badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
    },
    {
        href: '/drops',
        label: 'Expiring Drop Radar',
        desc: 'Daily pending-delete auction radar & drop comps',
        icon: '⏳',
    },
    {
        href: '/suggest',
        label: 'Name Generator',
        desc: 'AI phonetic & keyword brandable generator',
        icon: '✨',
    },
    {
        href: '/extension',
        label: 'Chrome & Edge Extension',
        desc: '1-Click toolbar appraiser on any auction site',
        icon: '🧩',
        badge: 'New',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
    {
        href: '/deal-room',
        label: 'Domain Deal Room & Fees',
        desc: 'Negotiation ladder, broker scripts & escrow fees',
        icon: '🤝',
        badge: 'New',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
];

const INTELLIGENCE_ITEMS: NavItem[] = [
    {
        href: '/records',
        label: 'Top 100 Historical Sales',
        desc: 'All-time verified domain sales hall of fame',
        icon: '🏆',
        badge: 'Hall of Fame',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    },
    {
        href: '/tld',
        label: 'TLD Valuation Directory',
        desc: 'Pricing benchmarks for .ai, .com, .io, .xyz',
        icon: '🌐',
    },
    {
        href: '/articles',
        label: 'Research & Whitepapers',
        desc: 'Algorithmic comps studies & domain investing data',
        icon: '📚',
    },
    {
        href: '/aeo',
        label: 'AEO Direct Answers',
        desc: 'AI search & LLM citation answer engine',
        icon: '🤖',
        badge: 'AI Engine',
        badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
    },
    {
        href: '/domain-worth-calculator',
        label: 'Domain Worth Calculator Guide',
        desc: 'Comprehensive step-by-step valuation playbook',
        icon: '📖',
    },
    {
        href: '/draftline',
        label: 'Draftline.com Enterprise Audit',
        desc: 'Deep-dive entity appraisal & brand equity analysis',
        icon: '🏢',
    },
];

const RESOURCES_ITEMS: NavItem[] = [
    {
        href: '/api-docs',
        label: 'Developer REST API',
        desc: 'Programmatic v1 valuation & comps endpoints',
        icon: '⚡',
        badge: 'v1.0',
        badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    },
    {
        href: '/how-it-works',
        label: 'Pricing Methodology',
        desc: '6-tier deterministic valuation model explanation',
        icon: '🔬',
    },
    {
        href: '/pricing',
        label: 'Account Tiers & Quotas',
        desc: 'Free, Pro, and Enterprise API plans',
        icon: '💳',
    },
    {
        href: '/extension/support',
        label: 'Chrome Store Support',
        desc: 'Extension FAQs, permissions audit & troubleshooting',
        icon: '🛠️',
    },
    {
        href: '/support',
        label: 'Help & Contact Center',
        desc: 'Engineering support ticket submission & SLA',
        icon: '💬',
    },
    {
        href: '/advertise',
        label: 'Advertise on DomainVoodoo',
        desc: 'Targeted high-intent domain investors & brokers',
        icon: '★',
        badge: 'Partner',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    },
];

export default function DesktopNav({ showDashboard }: DesktopNavProps) {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<'tools' | 'intel' | 'resources' | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLElement>(null);

    // Close menu when pathname changes
    useEffect(() => {
        setOpenMenu(null);
    }, [pathname]);

    // Close menu on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenMenu(null);
            }
        }
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpenMenu(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleMouseEnter = (menu: 'tools' | 'intel' | 'resources') => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenMenu(menu);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenMenu(null);
        }, 150);
    };

    const isToolsActive = ['/compare', '/bulk', '/drops', '/suggest', '/extension'].some((p) => pathname === p);
    const isIntelActive = ['/records', '/tld', '/articles', '/aeo', '/domain-worth-calculator', '/draftline'].some((p) => pathname.startsWith(p));
    const isResourcesActive = ['/api-docs', '/how-it-works', '/pricing', '/extension/support', '/support', '/advertise'].some((p) => pathname === p);

    return (
        <nav ref={navRef} className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-semibold text-slate-300">
            {/* Valuate Instant Button */}
            <Link
                href="/"
                className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                    pathname === '/'
                        ? 'bg-brand-950/80 text-brand-300 border border-brand-800/80 shadow-sm shadow-brand-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
            >
                <span className="text-orange-400">⚡</span>
                <span>Valuate</span>
            </Link>

            {/* Tools Dropdown */}
            <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('tools')}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    onClick={() => setOpenMenu(openMenu === 'tools' ? null : 'tools')}
                    aria-expanded={openMenu === 'tools'}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isToolsActive || openMenu === 'tools'
                            ? 'bg-slate-900 text-brand-300 border border-slate-700/80'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                >
                    <span>Tools</span>
                    <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 text-slate-400 ${openMenu === 'tools' ? 'rotate-180 text-brand-400' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>

                {openMenu === 'tools' && (
                    <div className="absolute left-0 top-full mt-1.5 w-80 rounded-2xl border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl p-2 shadow-2xl shadow-black/80 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-900 mb-1">
                            Domain Terminal Utilities
                        </div>
                        <div className="space-y-1">
                            {TOOLS_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 group ${
                                        pathname === item.href
                                            ? 'bg-slate-900 text-brand-300 border border-brand-500/30'
                                            : 'hover:bg-slate-900/80 text-slate-200 hover:text-white'
                                    }`}
                                >
                                    <span className="text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                                                {item.label}
                                            </span>
                                            {item.badge && (
                                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
                                            {item.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Intelligence Dropdown */}
            <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('intel')}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    onClick={() => setOpenMenu(openMenu === 'intel' ? null : 'intel')}
                    aria-expanded={openMenu === 'intel'}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isIntelActive || openMenu === 'intel'
                            ? 'bg-slate-900 text-amber-300 border border-slate-700/80'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                >
                    <span>Intelligence</span>
                    <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 text-slate-400 ${openMenu === 'intel' ? 'rotate-180 text-amber-400' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>

                {openMenu === 'intel' && (
                    <div className="absolute left-0 top-full mt-1.5 w-88 rounded-2xl border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl p-2 shadow-2xl shadow-black/80 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-900 mb-1">
                            Market Data &amp; Research Dossiers
                        </div>
                        <div className="space-y-1">
                            {INTELLIGENCE_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 group ${
                                        pathname === item.href
                                            ? 'bg-slate-900 text-amber-300 border border-amber-500/30'
                                            : 'hover:bg-slate-900/80 text-slate-200 hover:text-white'
                                    }`}
                                >
                                    <span className="text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                                                {item.label}
                                            </span>
                                            {item.badge && (
                                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
                                            {item.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Resources & API Dropdown */}
            <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    onClick={() => setOpenMenu(openMenu === 'resources' ? null : 'resources')}
                    aria-expanded={openMenu === 'resources'}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isResourcesActive || openMenu === 'resources'
                            ? 'bg-slate-900 text-indigo-300 border border-slate-700/80'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                >
                    <span>Resources &amp; API</span>
                    <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 text-slate-400 ${openMenu === 'resources' ? 'rotate-180 text-indigo-400' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>

                {openMenu === 'resources' && (
                    <div className="absolute right-0 lg:left-0 top-full mt-1.5 w-84 rounded-2xl border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl p-2 shadow-2xl shadow-black/80 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-900 mb-1">
                            Developer Tools, Plans &amp; Support
                        </div>
                        <div className="space-y-1">
                            {RESOURCES_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 group ${
                                        pathname === item.href
                                            ? 'bg-slate-900 text-indigo-300 border border-indigo-500/30'
                                            : 'hover:bg-slate-900/80 text-slate-200 hover:text-white'
                                    }`}
                                >
                                    <span className="text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                                                {item.label}
                                            </span>
                                            {item.badge && (
                                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
                                            {item.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Dashboard Link (if authenticated) */}
            {showDashboard && (
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                        pathname === '/dashboard'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 font-bold'
                            : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40'
                    }`}
                >
                    <span>📊</span>
                    <span>Dashboard</span>
                </Link>
            )}
        </nav>
    );
}
