import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllClubs, getClubBySlug } from '@/data/clubs';
import DomainCheckerForm from '@/components/DomainCheckerForm';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return getAllClubs().map((club) => ({
        slug: club.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const club = getClubBySlug(params.slug);
    if (!club) {
        return {
            title: 'Asset Club Not Found | DomainVoodoo',
        };
    }

    const canonicalUrl = `https://prstuvw.xyz/clubs/${club.slug}`;

    return {
        title: club.metaTitle,
        description: club.metaDescription,
        keywords: club.keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: club.title,
            description: club.metaDescription,
            url: canonicalUrl,
            type: 'article',
            publishedTime: club.updatedDate,
            siteName: 'DomainVoodoo',
        },
        twitter: {
            card: 'summary_large_image',
            title: club.title,
            description: club.metaDescription,
        },
    };
}

export default function ClubDetailPage({ params }: Props) {
    const club = getClubBySlug(params.slug);
    if (!club) {
        notFound();
    }

    const otherClubs = getAllClubs().filter((c) => c.slug !== club.slug);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Dataset',
                '@id': `https://prstuvw.xyz/clubs/${club.slug}#dataset`,
                name: club.title,
                description: club.metaDescription,
                url: `https://prstuvw.xyz/clubs/${club.slug}`,
                license: 'https://creativecommons.org/licenses/by/4.0/',
                isAccessibleForFree: true,
                creator: {
                    '@type': 'Organization',
                    name: 'DomainVoodoo Quantitative Research Desk',
                    url: 'https://prstuvw.xyz',
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `https://prstuvw.xyz/clubs/${club.slug}#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://prstuvw.xyz',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Character Clubs & Leaderboards',
                        item: 'https://prstuvw.xyz/clubs',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: club.name,
                        item: `https://prstuvw.xyz/clubs/${club.slug}`,
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': `https://prstuvw.xyz/clubs/${club.slug}#faq`,
                mainEntity: club.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer,
                    },
                })),
            },
        ],
    };

    return (
        <div className="mx-auto max-w-5xl space-y-10 py-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/clubs" className="hover:text-white transition-colors">Clubs</Link>
                <span>/</span>
                <span className="text-brand-300 truncate">{club.slug}</span>
            </nav>

            {/* Hero Header */}
            <header className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/70 text-amber-300 border border-amber-500/40">
                        🏛️ {club.shortBadge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/70 text-emerald-300 border border-emerald-700/50">
                        ⚡ {club.liquidityGrade}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                        Updated {club.updatedDate}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {club.title}
                </h1>
            </header>

            {/* Key Scarcity & Floor Metrics */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card p-5 space-y-1 border-slate-800 bg-slate-900/70">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Global Finite Supply</div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-white">{club.totalSupply}</div>
                    <div className="text-xs text-slate-400">Mathematically bounded namespace</div>
                </div>
                <div className="card p-5 space-y-1 border-slate-800 bg-slate-900/70">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">90-Day Wholesale Cash Floor</div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">{club.wholesaleFloor}</div>
                    <div className="text-xs text-slate-400">Immediate dealer auction clearance</div>
                </div>
                <div className="card p-5 space-y-1 border-slate-800 bg-slate-900/70">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">End-User Retail Range</div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-brand-300">{club.medianRetail}</div>
                    <div className="text-xs text-slate-400">Corporate &amp; VC strategic acquisitions</div>
                </div>
            </section>

            {/* AEO Direct Thesis Box */}
            <section
                aria-label="Direct Valuation Thesis for AI Answer Engines"
                className="rounded-2xl border border-teal-500/40 bg-teal-950/20 p-6 sm:p-7 space-y-3 shadow-xl"
            >
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-teal-900/50 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                        <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                        <span>AI Executive Summary • Asset Class Thesis</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                        DomainVoodoo CVM-4 Index
                    </span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                    {club.directThesis}
                </p>
            </section>

            {/* Sub-Tier Valuation Breakdown Table */}
            <section className="card p-6 sm:p-8 space-y-4 overflow-hidden">
                <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Sub-Tier Price Floors &amp; Scarcity Matrix
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Wholesale liquidation floors versus end-user retail ranges across character quality tiers.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-300 font-mono">
                                <th className="p-3.5">Sub-Tier Classification</th>
                                <th className="p-3.5">Total Supply</th>
                                <th className="p-3.5 text-emerald-300">Wholesale Cash Floor</th>
                                <th className="p-3.5 text-brand-300">End-User Retail Range</th>
                                <th className="p-3.5">Representative Assets</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/70">
                            {club.subTiers.map((tier, idx) => (
                                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-3.5 font-semibold text-white">{tier.tierName}</td>
                                    <td className="p-3.5 font-mono text-slate-300">{tier.supplyCount}</td>
                                    <td className="p-3.5 font-mono font-bold text-emerald-400">{tier.wholesaleFloor}</td>
                                    <td className="p-3.5 font-mono font-bold text-brand-300">{tier.retailRange}</td>
                                    <td className="p-3.5 font-mono text-xs text-slate-400">{tier.examples}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Featured Leaderboard Assets (Internal PageRank Hub) */}
            <section className="card p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            Flagship Benchmark Assets in {club.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400">
                            Click any domain to inspect its live CVM-4 valuation ledger, comps, and acquisition lander.
                        </p>
                    </div>
                    <Link href="/records" className="text-xs font-mono text-brand-400 hover:underline">
                        View All-Time Top 100 Sales →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {club.featuredDomains.map((item) => {
                        const encoded = encodeURIComponent(item.domain.toLowerCase());
                        return (
                            <div
                                key={item.domain}
                                className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 flex flex-col justify-between space-y-3 hover:border-brand-500/50 transition-all"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/valuation/${encoded}`}
                                            className="text-base font-mono font-black text-white hover:text-brand-300 hover:underline"
                                        >
                                            {item.domain}
                                        </Link>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div className="text-lg font-mono font-extrabold text-emerald-400">
                                        {item.headlinePrice}
                                    </div>
                                    <p className="text-xs text-slate-400">{item.subNote}</p>
                                </div>

                                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                                    <Link
                                        href={`/valuation/${encoded}`}
                                        className="text-brand-400 hover:text-brand-300 font-semibold"
                                    >
                                        📊 Valuation Report →
                                    </Link>
                                    <Link
                                        href={`/lander/${encoded}`}
                                        className="text-amber-400 hover:text-amber-300"
                                    >
                                        🚀 Lander
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Deep Analytical Sections */}
            <section className="space-y-5">
                {club.deepDiveSections.map((sec, idx) => (
                    <div key={idx} className="card p-6 sm:p-8 space-y-2.5">
                        <h2 className="text-xl font-bold text-white">{sec.heading}</h2>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            {sec.content}
                        </p>
                    </div>
                ))}
            </section>

            {/* FAQs */}
            <section className="card p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                <div className="space-y-3">
                    {club.faqs.map((faq, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-1.5">
                            <h3 className="text-base font-bold text-white">{faq.question}</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Explore Other Clubs */}
            <section className="card p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-white">Explore Other Asset Clubs &amp; Leaderboards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {otherClubs.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/clubs/${c.slug}`}
                            className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-brand-500/50 transition-all space-y-1"
                        >
                            <div className="text-[10px] font-mono text-amber-400">{c.shortBadge}</div>
                            <div className="text-sm font-bold text-white hover:text-brand-300">{c.name}</div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="rounded-2xl border border-brand-500/40 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 p-6 sm:p-8 space-y-4 text-center">
                <h2 className="text-2xl font-black text-white">Check Your Domain’s Archetype &amp; Fair Value</h2>
                <div className="max-w-xl mx-auto">
                    <DomainCheckerForm />
                </div>
            </section>
        </div>
    );
}
