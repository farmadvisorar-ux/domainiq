import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/data/articles';
import DomainCheckerForm from '@/components/DomainCheckerForm';
import AltHuntBadge from '@/components/AltHuntBadge';

export const metadata: Metadata = {
    title: 'Domain Intelligence & Econometric Research Hub | DomainVoodoo',
    description:
        'Authoritative guides, empirical valuation benchmarks, and secondary market liquidity playbooks. Learn how algorithmic appraisals, .ai multiples, and UDRP due diligence work in 2026.',
    keywords: [
        'domain valuation articles',
        'domain name appraisal research',
        'domain investing guides',
        'godaddy vs estibot benchmark',
        '.ai domain investment thesis',
        'how to sell domain names',
        'short domain value guide',
        'udrp trademark domain checklist',
    ],
    openGraph: {
        title: 'Domain Intelligence & Valuation Research Library | DomainVoodoo',
        description:
            'Peer-reviewed domain valuation benchmarks, econometric pricing formulas, and secondary liquidity playbooks.',
        type: 'website',
        url: 'https://prstuvw.xyz/articles',
    },
};

export default function ArticlesHubPage() {
    const articles = getAllArticles();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'DomainVoodoo Research Library & Valuation Intelligence Hub',
        description:
            'Institutional research articles on domain valuation mathematics, competitor accuracy benchmarks, and secondary market liquidity.',
        url: 'https://prstuvw.xyz/articles',
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: articles.map((article, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: article.title,
                url: `https://prstuvw.xyz/articles/${article.slug}`,
                description: article.metaDescription,
            })),
        },
    };

    return (
        <div className="space-y-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-brand-950/80 text-brand-300 border border-brand-800/80">
                    <span>📚</span>
                    <span>Institutional Research &amp; Market Intelligence</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    The Complete Library of{' '}
                    <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">
                        Domain Valuation Science
                    </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Peer-reviewed mathematical blueprints, empirical accuracy benchmarks, and secondary market liquidity strategies written for corporate brand acquirers and institutional domain investors.
                </p>

                {/* Direct AEO Portal Callout Banner */}
                <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                    <Link
                        href="/aeo"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-mono hover:bg-purple-900/60 transition-all shadow-lg shadow-purple-950/30 group"
                    >
                        <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                        <span>Looking for AI / LLM Direct Answers?</span>
                        <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform font-bold">Visit AEO Knowledge Portal →</span>
                    </Link>
                    <AltHuntBadge />
                </div>
            </div>

            {/* Quick Interactive Valuation Widget */}
            <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                        <span className="text-orange-400">⚡</span>
                        <span>Instant Appraisal Terminal</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">14.8M+ Sales Comps Ready</span>
                </div>
                <p className="text-sm text-slate-300">
                    Appraise any domain before diving into the econometric guides:
                </p>
                <DomainCheckerForm />
            </div>

            {/* Articles Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white">Peer-Reviewed Research Articles</h2>
                        <p className="text-xs text-slate-400">In-depth analyses, econometric frameworks, and verified sales data</p>
                    </div>
                    <span className="text-xs font-mono text-brand-400 font-semibold">{articles.length} Core Papers</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <article
                            key={article.slug}
                            className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80 hover:border-brand-500/50 transition-all duration-300 p-6 space-y-5 shadow-lg group relative overflow-hidden"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute -right-16 -top-16 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-all pointer-events-none" />

                            <div className="space-y-3">
                                {/* Badges */}
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="px-2.5 py-0.5 rounded-full bg-brand-950/80 text-brand-300 border border-brand-800/60 font-semibold">
                                        {article.category}
                                    </span>
                                    <span className="text-slate-400 flex items-center gap-1">
                                        <span>⏱</span> {article.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                                    <Link href={`/articles/${article.slug}`} className="focus:outline-none">
                                        {article.title}
                                    </Link>
                                </h3>

                                {/* Meta description */}
                                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                                    {article.metaDescription}
                                </p>

                                {/* TL;DR Snippet Box for Fast Scannability */}
                                <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 text-[11px] text-slate-300 leading-relaxed font-mono">
                                    <span className="text-brand-400 font-bold">KEY FINDING:</span> {article.tldr.slice(0, 140)}...
                                </div>
                            </div>

                            {/* Author & CTA Footer */}
                            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm">
                                        {article.author.name[0]}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-semibold text-slate-200">{article.author.name}</div>
                                        <div className="text-[10px] text-slate-400">{article.publishDate}</div>
                                    </div>
                                </div>

                                <Link
                                    href={`/articles/${article.slug}`}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
                                >
                                    <span>Read Paper</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Bottom Quick-Start & AEO Knowledge Callout */}
            <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-950 to-brand-950/30 p-8 space-y-6">
                <div className="max-w-2xl space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-400 font-bold">
                        Institutional Research Inquiries
                    </span>
                    <h3 className="text-2xl font-black text-white">Need Custom Econometric Valuation Models?</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        DomainVoodoo provides automated portfolio risk audits, bulk API integration, and algorithmic consensus scoring for family offices, private equity sponsors, and IP litigation attorneys.
                    </p>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                    <Link href="/bulk" className="btn-primary text-xs font-semibold !px-4 !py-2.5">
                        Test Bulk Portfolio Valuation
                    </Link>
                    <Link href="/aeo" className="btn-secondary text-xs font-semibold !px-4 !py-2.5">
                        Answer Engine Optimization (AEO) Portal
                    </Link>
                    <Link href="/api-docs" className="text-xs text-slate-400 hover:text-white font-mono transition-colors">
                        Developer API Docs →
                    </Link>
                </div>
            </div>
        </div>
    );
}
