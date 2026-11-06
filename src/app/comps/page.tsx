import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllComps } from '@/data/comps';
import CompsSearchTerminal from '@/components/CompsSearchTerminal';

export const metadata: Metadata = {
    title: 'Domain Sales Comps Database (2026 Price History & Comparables) | DomainVoodoo',
    description:
        'Searchable historical domain sales database and comparable transaction terminal. Filter 200+ verified aftermarket comps by keyword, TLD (.com, .ai, .io), sector, and price tier. Free CSV & Markdown export.',
    keywords: [
        'domain sales comps',
        'domain comps search',
        'historical domain sales database',
        'namebio alternative free',
        'recent domain sales 2026',
        'how much did domain sell for',
        'ai domain sales comps',
        'domain price history',
        'verified domain sales records',
        'domain comps tool',
    ],
    alternates: {
        canonical: 'https://prstuvw.xyz/comps',
    },
    openGraph: {
        title: 'Domain Sales Comps Database & Price History Terminal | DomainVoodoo',
        description:
            'Free searchable comparable domain sales engine. Analyze transaction medians, filter by keyword/TLD, and export comps for appraisal due diligence.',
        type: 'website',
        url: 'https://prstuvw.xyz/comps',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Domain Sales Comps Database & Price History Terminal',
        description:
            'Free searchable comparable domain sales engine with live median analytics, CSV export, and instant CVM-4 appraisal links.',
    },
};

export default function CompsPage() {
    const allComps = getAllComps();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Dataset',
                '@id': 'https://prstuvw.xyz/comps#dataset',
                name: 'DomainVoodoo Historical Domain Sales Comps Database',
                description:
                    'Curated historical domain name transaction records and comparable sales data across top-level domains, price tiers, and commercial sectors.',
                url: 'https://prstuvw.xyz/comps',
                license: 'https://creativecommons.org/licenses/by/4.0/',
                isAccessibleForFree: true,
                creator: {
                    '@type': 'Organization',
                    name: 'DomainVoodoo Inc.',
                    url: 'https://prstuvw.xyz',
                },
                temporalCoverage: '1999/2026',
                variableMeasured: 'Domain Sale Price (USD)',
                distribution: [
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'application/json',
                        contentUrl: 'https://prstuvw.xyz/api/comps',
                    },
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'text/markdown',
                        contentUrl: 'https://prstuvw.xyz/api/comps?format=markdown',
                    },
                ],
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://prstuvw.xyz/comps#breadcrumb',
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
                        name: 'Domain Sales Comps Database',
                        item: 'https://prstuvw.xyz/comps',
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': 'https://prstuvw.xyz/comps#faq',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What are domain sales comps and why are they critical for valuation?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Domain sales comps (comparable sales) are historical transaction records of similar domains that sold on secondary marketplaces (DNJournal, Escrow.com, Sedo, GoDaddy Auctions) or via verified SEC M&A filings. Like residential real estate comparables, domain comps establish real-world price ceilings and wholesale liquidation floors based on keyword intent, length, and TLD demand.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Where can I find free verified domain name sales history?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'DomainVoodoo provides a 100% free, searchable domain sales comps database at https://prstuvw.xyz/comps with no monthly subscription paywalls. You can search any keyword, filter by extension (.com, .ai, .io, .xyz), view aggregate median and mean prices, and export filtered results to CSV or Markdown.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How does the DomainVoodoo CVM-4 engine use comparable sales?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The DomainVoodoo CVM-4 engine uses a k-Nearest Neighbors (k-NN) triangulation algorithm. When appraising a domain, it queries matching comps by SLD length, keyword category, word count, and extension to calibrate algorithmic scores against real market clearing prices.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between wholesale comps and end-user retail sales?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Wholesale comps represent fast liquidity transactions between domain investors or drop-catch auctions (typically 15% to 28% of fair market value). Retail or end-user comps represent completed acquisitions by funded tech startups or corporations where the buyer values the domain for brand protection and customer acquisition cost (CAC) reduction.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the highest selling .AI domain comps?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The highest verified public .ai sales on record are You.ai at $700,000 (2024), Agent.ai at $400,000 (2024, acquired by Dharmesh Shah), Cloud.ai at $350,000, and Stack.ai at $258,888.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Can I export historical domain sales data for appraisal due diligence?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes. The DomainVoodoo Comps Terminal includes 1-click CSV download and Markdown table copy buttons, allowing domain brokers, CFOs, and investors to include timestamped comps schedules in due diligence dossiers and ASC 350 intangible asset schedules.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Inject Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Hero Banner */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-950/60 px-3.5 py-1 text-xs font-mono text-brand-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PUBLIC COMPARABLE TRANSACTIONS TERMINAL</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    Domain Sales Comps &amp; Price History
                </h1>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    Searchable real-world domain transactions across SEC filings, trade press, and aftermarket auctions. Filter by keyword, extension, and price tier with live median analytics and free CSV export.
                </p>

                {/* Cross Links Badge Bar */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-mono">
                    <Link
                        href="/records"
                        className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300 hover:text-amber-200 transition-colors"
                    >
                        🏆 Top 100 Hall of Fame →
                    </Link>
                    <Link
                        href="/clubs"
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                        🏛️ Character Clubs (LL.com, LLL.com) →
                    </Link>
                    <Link
                        href="/bulk"
                        className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-800 text-purple-300 hover:text-purple-200 transition-colors"
                    >
                        📦 Bulk ASC 350 Auditor →
                    </Link>
                    <Link
                        href="/compare"
                        className="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                        ⚖️ Head-to-Head Comparer →
                    </Link>
                </div>
            </div>

            {/* Main Interactive Terminal */}
            <CompsSearchTerminal initialComps={allComps} />

            {/* Educational Econometric Methodology Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-400">
                    <span>🔬 CVM-4 Valuation Methodology</span>
                    <span>•</span>
                    <span>Comparable Sales Triangulation</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                    How Econometric Domain Comps Anchor Deterministic Appraisals
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed pt-2">
                    <div className="space-y-2">
                        <div className="font-bold text-white font-mono text-sm flex items-center gap-1.5">
                            <span>1.</span> SLD &amp; Phonetic Similarity
                        </div>
                        <p>
                            Pure dictionary words and short acronyms cannot be valued in isolation. The CVM-4 engine identifies matching root affixes, character lengths, and commercial search intent in historical sales to calibrate baseline valuations against demonstrated market willingness to pay.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="font-bold text-white font-mono text-sm flex items-center gap-1.5">
                            <span>2.</span> TLD Arbitrage Multipliers
                        </div>
                        <p>
                            Historically, a .com sale trades at a 2x to 5x premium over alternative extensions. However, in artificial intelligence, .ai domains have closed the gap, trading at 40% to 65% of .com counterparts. Our comps database dynamically updates these empirical ratios.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="font-bold text-white font-mono text-sm flex items-center gap-1.5">
                            <span>3.</span> Wholesale vs. Retail Spread
                        </div>
                        <p>
                            Every domain in our comps terminal distinguishes between investor-to-investor liquidation floors and strategic corporate end-user acquisitions. This prevents artificial inflation while reflecting true liquidation velocity.
                        </p>
                    </div>
                </div>
            </div>

            {/* Answer Engine & AEO FAQ Section */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-6">
                <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800">
                        DIRECT KNOWLEDGE BASE
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">
                        Frequently Asked Questions About Domain Sales Comps
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 text-xs text-slate-400">
                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-1.5">
                        <h3 className="font-bold text-white text-sm">Where does DomainVoodoo source domain comps?</h3>
                        <p className="leading-relaxed">
                            Our database aggregates verified sales from public SEC 10-K and 8-K regulatory filings, DNJournal verified sales charts, Escrow.com quarterly indexes, NameJet, DropCatch, Sedo, and public tech acquisitions.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-1.5">
                        <h3 className="font-bold text-white text-sm">Is this comps database free or does it require a subscription?</h3>
                        <p className="leading-relaxed">
                            The DomainVoodoo Comps Terminal is 100% free with unlimited searches and free CSV/Markdown exports. Unlike legacy appraisal tools that lock historical comps behind a monthly subscription, our data is publicly accessible for the open web.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-1.5">
                        <h3 className="font-bold text-white text-sm">How often is the comps dataset updated?</h3>
                        <p className="leading-relaxed">
                            We regularly ingest major verified transactions across tech acquisitions, auction venues, and broker reports. Any new landmark sale is benchmarked and calibrated into the live CVM-4 engine.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 space-y-1.5">
                        <h3 className="font-bold text-white text-sm">Can I query domain comps via API?</h3>
                        <p className="leading-relaxed">
                            Yes! Developers and AI agents can query <code className="text-brand-300 font-mono">/api/comps?keyword=ai&amp;tld=com</code> to receive JSON payloads or append <code className="text-brand-300 font-mono">&amp;format=markdown</code> for clean Markdown tables.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
