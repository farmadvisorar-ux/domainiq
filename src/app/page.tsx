import Link from 'next/link';
import DomainCheckerForm from '@/components/DomainCheckerForm';
import AdSlot from '@/components/AdSlot';
import SedoBanner from '@/components/SedoBanner';
import AltHuntBadge from '@/components/AltHuntBadge';
import CompetitorComparisonTable from '@/components/CompetitorComparisonTable';

const PILLARS = [
    {
        icon: '📊',
        title: 'Multi-Channel Pricing Matrix',
        subtitle: '4 Realities, Not 1 Guess',
        description:
            'Most tools show one arbitrary number. DomainVoodoo calculates retail Fair Market Value, wholesale investor spread, immediate liquidation floor, and 12-36mo lease-to-own financing.',
        badge: 'Institutional Matrix',
    },
    {
        icon: '⚖️',
        title: 'Automated UDRP & IP Radar',
        subtitle: 'Legal Due Diligence Built-In',
        description:
            'Screen names against famous marks, WIPO dispute precedents, typosquatting vectors, and live USPTO records to avoid costly trademark forfeiture.',
        badge: 'Pre-Bid Protection',
    },
    {
        icon: '🏛️',
        title: 'Wayback Machine Archive Forensics',
        subtitle: 'Continuous Online Vintage',
        description:
            'Audits historical snapshots from 1996 to present. Flags high-risk drop gaps, expired domain re-registrations, and dormant gaps that erode SEO trust.',
        badge: 'Provenance Audit',
    },
    {
        icon: '⚡',
        title: 'Real Comparable Sales Anchoring',
        subtitle: '14.8M+ Verified Transactions',
        description:
            'Calculations are mathematically grounded against verified aftermarket sales (Sedo, NameBio, DNJournal) via similarity-weighted linguistic and phonetic clustering.',
        badge: 'Ground Truth Data',
    },
    {
        icon: '🌐',
        title: 'Alternative Extension Collision Radar',
        subtitle: 'Commercial Brand Scarcity',
        description:
            'Audits whether the root label is active on .com, .ai, .io, .org, and .net to gauge corporate buyer urgency and defensibility.',
        badge: 'Scarcity Index',
    },
    {
        icon: '📄',
        title: 'Formal Printable Appraisal Certificates',
        subtitle: 'Escrow & Financing Ready',
        description:
            'Export official valuation certificates complete with verification IDs, cryptographic hashes, and print-ready formatting for lenders and buyers.',
        badge: 'Deal Ready',
    },
];

const CURATED_SHOWCASE = [
    { domain: 'insurance.com', fmv: '$35,600,000', floor: '$4,272,000', rating: 'Ultra-Liquid', tier: 'AAA+' },
    { domain: 'ghost.ai', fmv: '$350,000', floor: '$78,000', rating: '🎃 Spooky Tech', tier: 'AAA' },
    { domain: 'voice.com', fmv: '$30,000,000', floor: '$3,600,000', rating: 'Ultra-Liquid', tier: 'AAA+' },
    { domain: 'haunted.com', fmv: '$85,000', floor: '$18,500', rating: '🎃 Prime Brand', tier: 'AA' },
    { domain: 'ai.com', fmv: '$11,000,000', floor: '$1,320,000', rating: 'Ultra-Liquid', tier: 'AAA+' },
    { domain: 'cloudscale.ai', fmv: '$42,500', floor: '$9,200', rating: 'High Liquidity', tier: 'A' },
];

export default function HomePage() {
    return (
        <div className="space-y-20 py-4 sm:py-8">
            {/* Hero Section */}
            <section className="text-center space-y-6 relative">
                {/* Ambient Halloween Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-orange-600/15 via-purple-600/15 to-brand-600/15 blur-[120px] pointer-events-none rounded-full" />

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/40 text-orange-300 text-xs font-mono font-semibold shadow-lg shadow-orange-500/10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span>🎃 Halloween Edition · 100% Free · Spooky Accurate Appraisals</span>
                </div>

                <div className="flex items-center justify-center pt-1">
                    <AltHuntBadge />
                </div>

                <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                    What is your domain{' '}
                    <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">
                        actually worth?
                    </span>
                </h1>

                <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
                    Stop relying on opaque black boxes. Get an instant, fully explainable valuation backed by real comparable sales, multi-channel pricing spreads, and automated legal due diligence.
                </p>

                {/* Search Bar Console with Halloween Accents */}
                <div className="mx-auto max-w-2xl pt-2 relative">
                    {/* Spooky Header Subtitle */}
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-orange-400/90 font-bold mb-2.5">
                        <span className="animate-pulse">🦇</span>
                        <span>Brew a Real-Time Valuation in the Voodoo Cauldron</span>
                        <span className="animate-pulse">🧙‍♀️</span>
                    </div>

                    <div className="relative">
                        {/* Corner Perched Ghosts & Pumpkins */}
                        <div className="absolute -top-3.5 -left-3.5 text-2xl sm:text-3xl select-none z-20 animate-bounce pointer-events-none" style={{ animationDuration: '3s' }}>
                            👻
                        </div>
                        <div className="absolute -top-3.5 -right-3.5 text-2xl sm:text-3xl select-none z-20 pointer-events-none filter drop-shadow-[0_0_12px_rgba(255,140,0,0.9)] animate-pulse">
                            🎃
                        </div>
                        <DomainCheckerForm />
                    </div>
                </div>

                {/* Primary Hero Billboard Ad Placement (Ad Box #1) */}
                <div className="mx-auto max-w-4xl pt-4 text-left">
                    <AdSlot slotId={1} variant="billboard" className="my-0" />
                </div>

                {/* SEO & LLM Authoritative Guide Pillar Callout */}
                <div className="mx-auto max-w-2xl pt-2">
                    <Link
                        href="/domain-worth-calculator"
                        className="group flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:px-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-brand-950/40 to-indigo-950/40 border border-brand-500/30 hover:border-brand-400 shadow-lg shadow-brand-500/5 transition-all text-left"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300 text-lg border border-brand-500/30">
                                📖
                            </span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded font-bold border border-cyan-800/80">
                                        Pricing Framework
                                    </span>
                                    <span className="text-xs text-slate-400 font-mono">2026 Guide</span>
                                </div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors mt-0.5">
                                    How Much Is My Domain Name Worth Calculator: An Exact Pricing Framework
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-brand-400 group-hover:text-brand-300 flex items-center gap-1 font-mono whitespace-nowrap self-end sm:self-auto">
                            Read Guide →
                        </span>
                    </Link>
                </div>
            </section>

            {/* Quick Live Comps Showcase Carousel */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>📌</span> Benchmark Appraisals
                        </h2>
                        <p className="text-xs text-slate-400">Sample valuations generated by the DomainVoodoo algorithm</p>
                    </div>
                    <Link href="/how-it-works" className="text-xs text-brand-400 hover:text-brand-300 font-semibold font-mono">
                        Methodology breakdown →
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {CURATED_SHOWCASE.map((item) => (
                        <Link
                            key={item.domain}
                            href={`/valuation/${encodeURIComponent(item.domain)}`}
                            className="card p-5 group hover:border-brand-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="font-mono text-slate-400">{item.rating}</span>
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                                        {item.tier}
                                    </span>
                                </div>
                                <h3 className="font-bold text-base text-white group-hover:text-brand-300 transition-colors font-mono">
                                    {item.domain}
                                </h3>
                                <p className="mt-3 text-2xl font-black text-emerald-400 font-mono tracking-tight">
                                    {item.fmv}
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                                <span>Wholesale Floor: <strong className="text-slate-300">{item.floor}</strong></span>
                                <span className="text-brand-400 group-hover:translate-x-0.5 transition-transform">Inspect →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Core Capability Pillars */}
            <section className="space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
                        Why DomainVoodoo Leads The Industry
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        Every Signal That Governs Real Value
                    </h2>
                    <p className="text-sm text-slate-400">
                        Built for portfolio investors, startup acquirers, brokers, and founders who need transparent numbers they can defend in negotiations.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PILLARS.map((p) => (
                        <div key={p.title} className="card p-6 flex flex-col justify-between space-y-4 hover:border-slate-700">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 inline-block">
                                        {p.icon}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20">
                                        {p.badge}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-white">{p.title}</h3>
                                    <p className="text-xs text-brand-400 font-mono">{p.subtitle}</p>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Platform Stats Grid */}
            <section className="card p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border-brand-500/20">
                <div className="grid gap-8 sm:grid-cols-4 text-center">
                    <div className="space-y-1">
                        <div className="text-3xl sm:text-4xl font-black text-brand-400 font-mono">$35.6M</div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Highest Recorded Comp</p>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl sm:text-4xl font-black text-brand-400 font-mono">14.8M+</div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sales Records Indexed</p>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl sm:text-4xl font-black text-brand-400 font-mono">6 Models</div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Algorithmic Layers</p>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl sm:text-4xl font-black text-brand-400 font-mono">&lt; 50ms</div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Evaluation Latency</p>
                    </div>
                </div>
            </section>

            <CompetitorComparisonTable />

            {/* SEO & AEO Knowledge Hub Showcase */}
            <section className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-brand-950 text-brand-300 border border-brand-800">
                                Domain Intelligence &amp; Research Desk
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                                AEO Optimized
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                            Peer-Reviewed Domain Valuation Science
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/aeo" className="text-xs font-mono text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1">
                            <span>🤖 AEO Portal</span>
                            <span>→</span>
                        </Link>
                        <Link href="/articles" className="text-xs font-mono text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1">
                            <span>View All Articles</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Link
                        href="/articles/how-domain-valuation-algorithms-work-2026"
                        className="rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 hover:border-brand-500/50 p-5 space-y-3 transition-all group flex flex-col justify-between"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="text-brand-400 font-bold">MATHEMATICAL BLUEPRINT</span>
                                <span>14 min read</span>
                            </div>
                            <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                                How Domain Valuation Algorithms Work: The 2026 Econometric Model
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2">
                                Deconstructing comparable sales regression, capitalized CAC advertising savings, and TLD liquidity multipliers.
                            </p>
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-400 flex items-center gap-1 pt-2">
                            <span>Read Whitepaper</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>

                    <Link
                        href="/articles/godaddy-vs-estibot-vs-domainvoodoo-accuracy-benchmark"
                        className="rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 hover:border-brand-500/50 p-5 space-y-3 transition-all group flex flex-col justify-between"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="text-emerald-400 font-bold">EMPIRICAL STUDY</span>
                                <span>16 min read</span>
                            </div>
                            <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                                GoDaddy GoValue vs EstiBot vs DomainVoodoo: Accuracy Benchmark
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2">
                                1,000 verified secondary sales tested: MAPE scores, registrar overvaluation bias, and consensus modeling.
                            </p>
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-400 flex items-center gap-1 pt-2">
                            <span>Read Study</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>

                    <Link
                        href="/articles/ai-domain-valuation-market-guide"
                        className="rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 hover:border-brand-500/50 p-5 space-y-3 transition-all group flex flex-col justify-between"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="text-purple-400 font-bold">TECH THESIS</span>
                                <span>13 min read</span>
                            </div>
                            <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                                The .AI Domain Gold Rush: Valuation Multipliers &amp; Investment Thesis
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2">
                                Anguilla registry economics, VC startup demand, carrying costs, and 6-figure transaction benchmarks.
                            </p>
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-400 flex items-center gap-1 pt-2">
                            <span>Read Thesis</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>
            </section>

            <SedoBanner className="my-8" />

            {/* Bottom Call to Action */}
            <section className="card p-8 sm:p-12 text-center space-y-6 relative overflow-hidden border-brand-500/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Appraise your domain portfolio now
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                    Evaluate individual domains with complete breakdowns or batch-process up to 200 domains with our bulk portfolio financial calculator.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link href="/bulk" className="btn-primary text-xs font-bold px-6 py-3">
                        Launch Bulk Portfolio Engine →
                    </Link>
                    <Link href="/drops" className="btn-secondary text-xs font-bold px-5 py-3">
                        Explore Drop Radar
                    </Link>
                    <Link href="/extension" className="btn-secondary text-xs font-bold px-5 py-3">
                        Install Chrome Extension
                    </Link>
                </div>
            </section>
        </div>
    );
}
