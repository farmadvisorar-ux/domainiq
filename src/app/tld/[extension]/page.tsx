import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTlds, getTldData } from '@/data/tlds';
import AltHuntBadge from '@/components/AltHuntBadge';
import DomainCheckerForm from '@/components/DomainCheckerForm';

interface Props {
    params: { extension: string };
}

export async function generateStaticParams() {
    const tlds = getAllTlds();
    return tlds.map((tld) => ({
        extension: tld.extension,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const tld = getTldData(params.extension);
    if (!tld) {
        return {
            title: 'Extension Guide Not Found | DomainVoodoo',
        };
    }

    const canonicalUrl = `https://prstuvw.xyz/tld/${tld.extension}`;

    return {
        title: `${tld.metaTitle}`,
        description: tld.metaDescription,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: tld.metaTitle,
            description: tld.metaDescription,
            type: 'article',
            url: canonicalUrl,
        },
    };
}

export default function TldDetailPage({ params }: Props) {
    const tld = getTldData(params.extension);
    if (!tld) {
        notFound();
    }

    const allTlds = getAllTlds();
    const otherTlds = allTlds.filter((t) => t.extension !== tld.extension);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BreadcrumbList',
                '@id': `https://prstuvw.xyz/tld/${tld.extension}#breadcrumb`,
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
                        name: 'TLD Valuation Directory',
                        item: 'https://prstuvw.xyz/tld',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: `${tld.label} Valuation Guide`,
                        item: `https://prstuvw.xyz/tld/${tld.extension}`,
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': `https://prstuvw.xyz/tld/${tld.extension}#faq`,
                mainEntity: tld.faqs.map((faq) => ({
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
        <article className="max-w-4xl mx-auto space-y-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/tld" className="hover:text-brand-400 transition-colors">TLD Directory</Link>
                <span>/</span>
                <span className="text-slate-300">{tld.label} Valuation Guide</span>
            </nav>

            {/* Header Hero */}
            <header className="space-y-4 border-b border-slate-800 pb-8">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-950 text-brand-300 border border-brand-800">
                        Top-Level Domain Economics
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                        {tld.liquidityMultiplier}
                    </span>
                    <AltHuntBadge />
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {tld.label} Domain Valuation &amp; Pricing Guide (2026)
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {tld.overview}
                </p>

                {/* Registry & Specification Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Registry Entity</div>
                        <div className="text-xs font-bold text-white truncate" title={tld.registry}>{tld.registry.split('/')[0]}</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Carrying Cost</div>
                        <div className="text-xs font-bold text-emerald-400">{tld.annualCarryingCost.split('(')[0]}</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Trust Index</div>
                        <div className="text-xs font-bold text-cyan-400">{tld.trustScore} / 100</div>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Baseline Multiple</div>
                        <div className="text-xs font-bold text-purple-400">{tld.liquidityMultiplier.split(' ')[0]}</div>
                    </div>
                </div>
            </header>

            {/* Instant Valuation Form for this TLD */}
            <section className="rounded-2xl border border-brand-500/40 bg-slate-900/70 p-6 space-y-3 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-brand-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span>⚡</span> Appraise a {tld.label} Domain Instantly
                    </span>
                    <span className="text-slate-400">14.8M+ Sales Comps Ready</span>
                </div>
                <DomainCheckerForm />
            </section>

            {/* Pricing Heuristics & Rules */}
            <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>📐</span>
                    <span>{tld.label} Econometric Pricing Principles</span>
                </h2>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {tld.pricingHeuristics.map((heuristic, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                            <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                            <span className="leading-relaxed">{heuristic}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Top Verified Historical Comps in this TLD */}
            <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                        <h2 className="text-xl font-bold text-white">Record {tld.label} Comparable Sales</h2>
                        <p className="text-xs text-slate-400">Benchmark transactions verified through public filings and Escrow.com</p>
                    </div>
                    <span className="text-xs font-mono text-brand-400 font-semibold">Verified Comps</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tld.topComps.map((comp, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-2 shadow-lg">
                            <div className="flex items-center justify-between">
                                <span className="font-mono font-bold text-white text-base">{comp.domain}</span>
                                <span className="font-mono font-black text-emerald-400 text-base">{comp.price}</span>
                            </div>
                            <div className="text-[11px] font-mono text-slate-500">Year: {comp.year}</div>
                            <p className="text-xs text-slate-300 leading-relaxed">{comp.significance}</p>
                            <div className="pt-2">
                                <Link
                                    href={`/valuation/${encodeURIComponent(comp.domain.toLowerCase())}`}
                                    className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1"
                                >
                                    <span>Valuate in Terminal →</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Frequently Asked Questions */}
            <section className="space-y-4 border-t border-slate-800 pt-8">
                <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
                        Extension FAQ
                    </span>
                    <h2 className="text-2xl font-black text-white">{tld.label} Frequently Asked Questions</h2>
                </div>

                <div className="space-y-3">
                    {tld.faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-2"
                        >
                            <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2">
                                <span className="text-brand-400 font-mono">Q:</span>
                                <span>{faq.question}</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 border-l-2 border-brand-500/40">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Explore Other TLDs */}
            <section className="border-t border-slate-800 pt-8 space-y-4">
                <h3 className="text-base font-bold text-white">Compare Other Top-Level Domains</h3>
                <div className="flex items-center gap-3 flex-wrap">
                    {otherTlds.map((other) => (
                        <Link
                            key={other.extension}
                            href={`/tld/${other.extension}`}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-brand-500 transition-all"
                        >
                            <span>{other.label} Valuation Guide →</span>
                        </Link>
                    ))}
                </div>
            </section>
        </article>
    );
}
