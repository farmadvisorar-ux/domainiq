import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/data/articles';
import DomainCheckerForm from '@/components/DomainCheckerForm';
import AltHuntBadge from '@/components/AltHuntBadge';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = getArticleBySlug(params.slug);
    if (!article) {
        return {
            title: 'Article Not Found | DomainVoodoo Research',
        };
    }

    const canonicalUrl = `https://prstuvw.xyz/articles/${article.slug}`;

    return {
        title: `${article.metaTitle}`,
        description: article.metaDescription,
        keywords: article.keywords,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: article.title,
            description: article.metaDescription,
            type: 'article',
            url: canonicalUrl,
            publishedTime: article.publishDate,
            authors: [article.author.name],
            siteName: 'DomainVoodoo',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.metaDescription,
        },
    };
}

export default function ArticleDetailPage({ params }: Props) {
    const article = getArticleBySlug(params.slug);
    if (!article) {
        notFound();
    }

    const allArticles = getAllArticles();
    const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

    // Multi-schema JSON-LD: Article + BreadcrumbList + FAQPage
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                '@id': `https://prstuvw.xyz/articles/${article.slug}#article`,
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': 'https://prstuvw.xyz/#website',
                    name: 'DomainVoodoo',
                    url: 'https://prstuvw.xyz',
                },
                headline: article.title,
                description: article.metaDescription,
                inLanguage: 'en-US',
                mainEntityOfPage: `https://prstuvw.xyz/articles/${article.slug}`,
                datePublished: article.publishDate,
                dateModified: article.publishDate,
                author: {
                    '@type': 'Person',
                    name: article.author.name,
                    jobTitle: article.author.role,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'DomainVoodoo Inc.',
                    url: 'https://prstuvw.xyz',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://prstuvw.xyz/favicon.svg',
                    },
                },
                keywords: article.keywords.join(', '),
                articleSection: article.category,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `https://prstuvw.xyz/articles/${article.slug}#breadcrumb`,
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
                        name: 'Research Articles',
                        item: 'https://prstuvw.xyz/articles',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: article.title,
                        item: `https://prstuvw.xyz/articles/${article.slug}`,
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': `https://prstuvw.xyz/articles/${article.slug}#faq`,
                mainEntity: article.faqs.map((faq) => ({
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

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/articles" className="hover:text-brand-400 transition-colors">Articles</Link>
                <span>/</span>
                <span className="text-slate-300 truncate max-w-xs sm:max-w-md">{article.title}</span>
            </nav>

            {/* Article Header */}
            <header className="space-y-5 border-b border-slate-800 pb-8">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-950 text-brand-300 border border-brand-800">
                        {article.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950 text-purple-300 border border-purple-800">
                        {article.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <span>⏱</span> {article.readTime}
                    </span>
                    <AltHuntBadge />
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    {article.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                    {article.metaDescription}
                </p>

                {/* Author Info Bar */}
                <div className="flex items-center justify-between pt-2 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white uppercase shadow-md shadow-brand-500/20">
                            {article.author.name[0]}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">{article.author.name}</div>
                            <div className="text-xs text-slate-400 font-mono">{article.author.role}</div>
                        </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                        Published: <time dateTime={article.publishDate}>{article.publishDate}</time>
                    </div>
                </div>
            </header>

            {/* Direct Answer Box (AEO & Featured Snippet Target) */}
            <section
                aria-label="Direct Answer for Answer Engine Optimization"
                className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 p-6 space-y-3 shadow-xl shadow-emerald-950/20"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Direct Answer • AI &amp; Search Engine Summary</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Answer Engine Optimization (AEO)</span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                    {article.directAnswer}
                </p>
            </section>

            {/* Key Takeaways */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-brand-400 flex items-center gap-2">
                    <span>⚡</span>
                    <span>Executive Summary &amp; Key Takeaways</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                    {article.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                            <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                            <span className="leading-relaxed">{takeaway}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* In-Article Interactive Domain Appraisal Embed */}
            <div className="rounded-2xl border border-orange-500/30 bg-orange-950/20 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-orange-300">
                    <span className="font-bold flex items-center gap-1.5">
                        <span>🎃</span>
                        <span>Interactive Valuation Sandbox</span>
                    </span>
                    <span>Test your domain with our CVM-4 engine</span>
                </div>
                <DomainCheckerForm />
            </div>

            {/* Table of Contents */}
            <section className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-5 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Table of Contents
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                    {article.sections.map((section, idx) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className="text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-2 group"
                            >
                                <span className="font-mono text-slate-500 group-hover:text-brand-400">0{idx + 1}.</span>
                                <span>{section.heading}</span>
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#frequently-asked-questions"
                            className="text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-2 group"
                        >
                            <span className="font-mono text-slate-500 group-hover:text-brand-400">0{article.sections.length + 1}.</span>
                            <span>Frequently Asked Questions</span>
                        </a>
                    </li>
                </ul>
            </section>

            {/* Article Body Sections */}
            <div className="space-y-12 text-slate-200 leading-relaxed text-base">
                {article.sections.map((section) => (
                    <section key={section.id} id={section.id} className="space-y-5 scroll-mt-20">
                        <div className="space-y-1 border-l-2 border-brand-500 pl-4">
                            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                                {section.heading}
                            </h2>
                            {section.subheading && (
                                <p className="text-xs sm:text-sm font-mono text-brand-300">
                                    {section.subheading}
                                </p>
                            )}
                        </div>

                        {/* Prose content */}
                        <div className="space-y-4 whitespace-pre-line text-sm sm:text-base text-slate-300 leading-relaxed">
                            {section.content}
                        </div>

                        {/* Callout box if present */}
                        {section.callout && (
                            <div
                                className={`rounded-xl border p-4 space-y-1.5 text-xs sm:text-sm ${
                                    section.callout.type === 'stat'
                                        ? 'bg-purple-950/30 border-purple-800 text-purple-200'
                                        : section.callout.type === 'tip'
                                        ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                                        : 'bg-amber-950/30 border-amber-800 text-amber-200'
                                }`}
                            >
                                <div className="font-bold font-mono uppercase tracking-wider flex items-center gap-1.5">
                                    <span>{section.callout.type === 'stat' ? '📊' : section.callout.type === 'tip' ? '💡' : '⚠️'}</span>
                                    <span>{section.callout.title}</span>
                                </div>
                                <p className="leading-relaxed opacity-90">{section.callout.text}</p>
                            </div>
                        )}

                        {/* Table if present */}
                        {section.table && (
                            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90 shadow-lg">
                                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-200 font-mono">
                                            {section.table.headers.map((header, hIdx) => (
                                                <th key={hIdx} className="p-3 sm:p-4 whitespace-nowrap">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60 font-sans">
                                        {section.table.rows.map((row, rIdx) => (
                                            <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                                                {row.map((cell, cIdx) => (
                                                    <td
                                                        key={cIdx}
                                                        className={`p-3 sm:p-4 ${cIdx === 0 ? 'font-bold text-white font-mono' : 'text-slate-300'}`}
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* Featured Comparable Sales Section */}
            {article.featuredComps && article.featuredComps.length > 0 && (
                <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white">Verified Market Comps Cited in this Paper</h3>
                            <p className="text-xs text-slate-400">Historical transactions verified via Escrow.com and NameBio records</p>
                        </div>
                        <span className="text-xs font-mono text-brand-400">NameBio Verified</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {article.featuredComps.map((comp, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-white text-base">{comp.domain}</span>
                                    <span className="font-mono font-black text-emerald-400 text-sm">{comp.price}</span>
                                </div>
                                <div className="text-[11px] font-mono text-slate-500">
                                    {comp.date} • {comp.venue}
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">{comp.takeaway}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Frequently Asked Questions */}
            <section id="frequently-asked-questions" className="space-y-4 border-t border-slate-800 pt-8 scroll-mt-20">
                <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
                        Structured Knowledge &amp; Q&amp;A
                    </span>
                    <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
                    <p className="text-xs text-slate-400">Clear, authoritative answers structured for AI crawlers and human investors</p>
                </div>

                <div className="space-y-3">
                    {article.faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors"
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

            {/* Related Research Articles */}
            <section className="border-t border-slate-800 pt-8 space-y-5">
                <h3 className="text-lg font-bold text-white">Continue Reading Related Research</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedArticles.map((rel) => (
                        <Link
                            key={rel.slug}
                            href={`/articles/${rel.slug}`}
                            className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-2 hover:bg-slate-900 hover:border-brand-500/50 transition-all flex flex-col justify-between group"
                        >
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-950 text-brand-300 border border-brand-800">
                                    {rel.category}
                                </span>
                                <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2">
                                    {rel.title}
                                </h4>
                            </div>
                            <span className="text-[11px] font-mono text-brand-400 font-semibold flex items-center gap-1 pt-2">
                                <span>Read Paper</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </article>
    );
}
