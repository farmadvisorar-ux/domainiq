import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllClubs } from '@/data/clubs';
import DomainCheckerForm from '@/components/DomainCheckerForm';

export const metadata: Metadata = {
    title: 'Domain Character Clubs & Sector Valuation Leaderboards (2026) | DomainVoodoo',
    description:
        'Institutional valuation directory for finite-supply domain character clubs: Two-Letter .COM (LL.com), Three-Letter .COM (LLL.com), Numeric (2N/3N/4N), Single-Word Dictionary, AI Flagships, and Fintech roots.',
    keywords: [
        '2 letter .com domain value',
        '3 letter .com wholesale floor',
        'numeric domain valuation',
        'one word .com price guide',
        'domain character clubs',
        'liquid domain valuation index',
    ],
    alternates: {
        canonical: 'https://prstuvw.xyz/clubs',
    },
    openGraph: {
        title: 'Domain Character Clubs & Sector Leaderboards (2026) | DomainVoodoo',
        description:
            'Explore supply scarcity, wholesale cash liquidation floors, and verified sales across LL.com, LLL.com, Numeric, AI, and Fintech domain clubs.',
        url: 'https://prstuvw.xyz/clubs',
        type: 'website',
    },
};

export default function ClubsIndexPage() {
    const clubs = getAllClubs();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': 'https://prstuvw.xyz/clubs#collection',
        name: 'DomainVoodoo Character Clubs & Sector Valuation Leaderboards',
        description:
            'Econometric directory of finite-supply liquid domain clubs (LL.com, LLL.com, Numeric, One-Word Dictionary, AI & Fintech).',
        url: 'https://prstuvw.xyz/clubs',
    };

    return (
        <div className="mx-auto max-w-5xl space-y-10 py-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <header className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/70 text-amber-300 border border-amber-500/40">
                    <span>🏛️</span>
                    <span>FINITE-SUPPLY LIQUID ASSET CLASSES</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    Character Clubs &amp; Sector Leaderboards
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Unlike general web registrations, short character clubs (676 LL.com, 17,576 LLL.com, 1,000 NNN.com) and Tier-1 category nouns have mathematically closed supplies and guaranteed 48-hour wholesale cash liquidation floors.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clubs.map((club) => (
                    <Link
                        key={club.slug}
                        href={`/clubs/${club.slug}`}
                        className="group card p-6 sm:p-7 border-slate-800 hover:border-brand-500/60 transition-all flex flex-col justify-between space-y-5"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-brand-950 text-brand-300 border border-brand-800">
                                    {club.shortBadge}
                                </span>
                                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                                    {club.liquidityGrade}
                                </span>
                            </div>

                            <h2 className="text-xl font-black text-white group-hover:text-brand-300 transition-colors">
                                {club.name}
                            </h2>

                            <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                                {club.directThesis}
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800/80">
                            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                                <div className="rounded-lg bg-slate-950/80 p-2.5 border border-slate-800">
                                    <div className="text-[10px] text-slate-400 uppercase">Wholesale Floor</div>
                                    <div className="text-emerald-400 font-bold pt-0.5">{club.wholesaleFloor}</div>
                                </div>
                                <div className="rounded-lg bg-slate-950/80 p-2.5 border border-slate-800">
                                    <div className="text-[10px] text-slate-400 uppercase">Total Supply</div>
                                    <div className="text-white font-bold pt-0.5">{club.totalSupply}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs font-mono text-brand-400 group-hover:text-brand-300 pt-1">
                                <span>Explore {club.featuredDomains.length} Benchmark Assets &amp; Price Tiers</span>
                                <span>→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <section className="rounded-2xl border border-brand-500/40 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 p-6 sm:p-8 space-y-5 text-center">
                <h2 className="text-2xl font-black text-white">
                    Appraise Any Short or Category Domain Instantly
                </h2>
                <p className="text-sm text-slate-300 max-w-xl mx-auto">
                    Our Consensus Valuation Matrix (CVM-4) automatically classifies 2-letter, 3-letter, 4-letter, numeric, and single-word dictionary archetypes.
                </p>
                <div className="max-w-xl mx-auto">
                    <DomainCheckerForm />
                </div>
            </section>
        </div>
    );
}
