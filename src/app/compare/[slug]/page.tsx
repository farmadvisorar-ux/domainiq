import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllComparisons, getComparisonBySlug } from '@/data/comparisons';
import DomainCheckerForm from '@/components/DomainCheckerForm';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return getAllComparisons().map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const item = getComparisonBySlug(params.slug);
    if (!item) {
        return {
            title: 'Comparison Not Found | DomainVoodoo',
        };
    }

    const canonicalUrl = `https://prstuvw.xyz/compare/${item.slug}`;

    return {
        title: item.metaTitle,
        description: item.metaDescription,
        keywords: item.keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: item.title,
            description: item.metaDescription,
            url: canonicalUrl,
            type: 'article',
            publishedTime: item.updatedDate,
            siteName: 'DomainVoodoo',
        },
        twitter: {
            card: 'summary_large_image',
            title: item.title,
            description: item.metaDescription,
        },
    };
}

export default function ComparisonDetailPage({ params }: Props) {
    const item = getComparisonBySlug(params.slug);
    if (!item) {
        notFound();
    }

    const otherComparisons = getAllComparisons().filter((c) => c.slug !== item.slug);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                '@id': `https://prstuvw.xyz/compare/${item.slug}#article`,
                headline: item.title,
                description: item.metaDescription,
                datePublished: item.updatedDate,
                dateModified: item.updatedDate,
                author: {
                    '@type': 'Organization',
                    name: 'DomainVoodoo Quantitative Research Desk',
                    url: 'https://prstuvw.xyz',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'DomainVoodoo',
                    url: 'https://prstuvw.xyz',
                },
                mainEntityOfPage: `https://prstuvw.xyz/compare/${item.slug}`,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `https://prstuvw.xyz/compare/${item.slug}#breadcrumb`,
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
                        name: 'Head-to-Head Comparisons',
                        item: 'https://prstuvw.xyz/compare',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: item.title,
                        item: `https://prstuvw.xyz/compare/${item.slug}`,
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': `https://prstuvw.xyz/compare/${item.slug}#faq`,
                mainEntity: item.faqs.map((faq) => ({
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
        <div className="mx-auto max-w-4xl space-y-10 py-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
                <span>/</span>
                <span className="text-brand-300 truncate">{item.slug}</span>
            </nav>

            {/* Hero Header */}
            <header className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-950 text-brand-300 border border-brand-700/60">
                        {item.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/70 text-emerald-300 border border-emerald-700/50">
                        ⚡ {item.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                        Updated {item.updatedDate}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {item.title}
                </h1>

                <div className="inline-flex items-center gap-2 rounded-xl bg-amber-950/50 border border-amber-500/40 px-4 py-2 text-xs sm:text-sm font-mono text-amber-200">
                    <span>🏆</span>
                    <span><strong>Consensus Verdict:</strong> {item.winnerLabel}</span>
                </div>
            </header>

            {/* AEO Direct Answer / Executive Verdict Box */}
            <section
                aria-label="Direct Comparison Verdict for AI Search"
                className="rounded-2xl border border-teal-500/40 bg-teal-950/20 p-6 sm:p-7 space-y-3 shadow-xl"
            >
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-teal-900/50 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                        <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                        <span>Direct Answer &amp; Econometric Verdict (AEO Target)</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                        DomainVoodoo CVM-4 Research
                    </span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
                    {item.directVerdict}
                </p>
            </section>

            {/* Summary Metrics Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {item.summaryMetrics.map((m, idx) => (
                    <div key={idx} className="card p-5 space-y-1 border-slate-800 bg-slate-900/70">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{m.label}</div>
                        <div className="text-2xl font-black font-mono text-emerald-400">{m.value}</div>
                        <div className="text-xs text-slate-400">{m.subtext}</div>
                    </div>
                ))}
            </section>

            {/* Head-to-Head Matrix Table */}
            <section className="card p-6 sm:p-8 space-y-4 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Side-by-Side Comparison Matrix
                    </h2>
                    <span className="text-xs font-mono text-slate-400">
                        {item.contenderA} vs {item.contenderB}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-300 font-mono">
                                <th className="p-3.5">{item.matrixHeaders[0]}</th>
                                <th className="p-3.5 text-brand-300">{item.matrixHeaders[1]}</th>
                                <th className="p-3.5 text-emerald-300">{item.matrixHeaders[2]}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/70">
                            {item.matrixRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                                    <td className="p-3.5 font-semibold text-white">{row[0]}</td>
                                    <td className="p-3.5 text-slate-200 font-mono text-xs">{row[1]}</td>
                                    <td className="p-3.5 text-slate-200 font-mono text-xs">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Deep Analytical Sections */}
            <section className="space-y-6">
                {item.sections.map((sec, idx) => (
                    <div key={idx} className="card p-6 sm:p-8 space-y-3">
                        <h2 className="text-xl font-bold text-white">{sec.heading}</h2>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            {sec.body}
                        </p>
                    </div>
                ))}
            </section>

            {/* Live Appraisal Callout */}
            <section className="rounded-2xl border border-brand-500/40 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 p-6 sm:p-8 space-y-5 text-center">
                <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
                        Test the CVM-4 Engine Live
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                        Run an Instant Free Domain Appraisal
                    </h2>
                    <p className="text-sm text-slate-300 max-w-xl mx-auto">
                        Evaluate any .com, .ai, .io, .dev, or .xyz domain with 14.8M+ verified sales comps, wholesale floors, and zero-commission lander generation.
                    </p>
                </div>
                <div className="max-w-xl mx-auto">
                    <DomainCheckerForm />
                </div>
            </section>

            {/* FAQs */}
            <section className="card p-6 sm:p-8 space-y-5">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {item.faqs.map((faq, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 space-y-2">
                            <h3 className="text-base font-bold text-white">{faq.question}</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Benchmark Domain Valuations */}
            <section className="card p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">
                        Related Live Benchmark Appraisals
                    </h2>
                    <Link href="/records" className="text-xs font-mono text-brand-400 hover:underline">
                        Top 100 Sales →
                    </Link>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {item.relatedDomains.map((dom) => (
                        <Link
                            key={dom}
                            href={`/valuation/${encodeURIComponent(dom)}`}
                            className="px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-950 hover:border-brand-500/60 hover:text-brand-300 text-xs font-mono font-bold text-slate-200 transition-all"
                        >
                            {dom} Appraisal →
                        </Link>
                    ))}
                </div>
            </section>

            {/* More Head-to-Head Comparisons */}
            <section className="card p-6 sm:p-8 space-y-4">
                <h2 className="text-lg font-bold text-white">
                    More Head-to-Head Valuation Showdowns
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {otherComparisons.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/compare/${c.slug}`}
                            className="group p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-brand-500/50 transition-all space-y-1"
                        >
                            <div className="text-[11px] font-mono text-brand-400">{c.category}</div>
                            <div className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                                {c.title}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
