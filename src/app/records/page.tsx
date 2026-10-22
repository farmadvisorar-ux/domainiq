import type { Metadata } from 'next';
import Link from 'next/link';
import SalesRecordsTable from '@/components/SalesRecordsTable';
import AltHuntBadge from '@/components/AltHuntBadge';
import DomainCheckerForm from '@/components/DomainCheckerForm';
import { DOMAIN_SALE_RECORDS } from '@/data/records';

export const metadata: Metadata = {
    title: 'Top 100 Most Expensive Domain Sales in History (Verified Hall of Fame) | DomainVoodoo',
    description:
        'The definitive, SEC-verified list of the highest domain name sales in internet history. Filter by price, TLD (.com, .ai, .io, .xyz), year, and acquirer. Discover how 8-figure digital real estate trades.',
    keywords: [
        'most expensive domain names in history',
        'top domain sales',
        'highest domain sales ever',
        'most expensive .com',
        'most expensive .ai domain',
        'domain sales hall of fame',
        'cars.com domain sale price',
        'voice.com domain sale price',
        'nfts.com domain sale price',
        'domain sales database 2026',
    ],
    openGraph: {
        title: 'Top 100 Most Expensive Domain Sales in History | DomainVoodoo',
        description:
            'Verified historical records of multimillion-dollar domain sales across Wall Street M&A, Escrow.com, and private tech acquisitions.',
        type: 'website',
        url: 'https://prstuvw.xyz/records',
    },
};

export default function DomainRecordsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Dataset',
                '@id': 'https://prstuvw.xyz/records#dataset',
                name: 'All-Time Highest Verified Domain Name Sales Database',
                description: 'Curated historical dataset of top public and SEC-verified domain name secondary market sales.',
                url: 'https://prstuvw.xyz/records',
                creator: {
                    '@type': 'Organization',
                    name: 'DomainVoodoo Inc.',
                    url: 'https://prstuvw.xyz',
                },
                temporalCoverage: '1999/2026',
                variableMeasured: 'Sale Price (USD)',
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://prstuvw.xyz/records#breadcrumb',
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
                        name: 'Domain Sales Hall of Fame',
                        item: 'https://prstuvw.xyz/records',
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': 'https://prstuvw.xyz/records#faq',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the most expensive domain name ever sold?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The highest valued domain asset in internet history is Cars.com, which was appraised at $872,000,000 in official SEC filings during Gannett Co.\'s acquisition of Classified Ventures. The highest all-cash public transaction for a domain name is Insurance.com at $35,600,000 (QuinStreet, 2010), closely followed by VacationRentals.com at $35,000,000 and Voice.com at $30,000,000.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the most expensive .AI domain ever sold?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The highest verified public sale for a .ai extension domain is You.ai at $700,000 in 2024, followed by Agent.ai at $400,000 (acquired by HubSpot founder Dharmesh Shah) and Stack.ai at $258,888.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Why do companies pay millions of dollars for domain names?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Enterprises acquire category-defining domains to establish instant institutional trust, capture permanent organic search type-in traffic without ongoing Google Ads pay-per-click spend, prevent competitors from seizing digital monopolies, and lower overall customer acquisition costs (CAC).',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="space-y-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Hero */}
            <div className="text-center max-w-4xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-amber-950/80 text-amber-300 border border-amber-800/80 shadow-md">
                    <span>🏆</span>
                    <span>Verified Historical Transactions • 1999–2026</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    The Top 100 Most Expensive{' '}
                    <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                        Domain Sales in History
                    </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    The definitive record of eight-figure digital real estate transactions, SEC regulatory filings, and corporate acquisitions that shaped the commercial internet.
                </p>

                <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                    <AltHuntBadge />
                    <Link
                        href="/articles/how-domain-valuation-algorithms-work-2026"
                        className="text-xs font-mono text-brand-400 hover:text-brand-300 flex items-center gap-1"
                    >
                        <span>Learn how algorithms price 8-figure names →</span>
                    </Link>
                </div>
            </div>

            {/* Quick Appraisal Callout */}
            <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-brand-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span>⚡</span> Instant Valuation Sandbox
                    </span>
                    <span className="text-slate-400">See how your domain compares to historical records</span>
                </div>
                <DomainCheckerForm />
            </div>

            {/* Sales Table Component */}
            <SalesRecordsTable />

            {/* Frequently Asked Questions */}
            <section className="space-y-4 border-t border-slate-800 pt-8 max-w-4xl mx-auto">
                <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
                        Historical Sales Intelligence
                    </span>
                    <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-3">
                    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 space-y-2">
                        <h3 className="text-sm sm:text-base font-bold text-white">
                            What is the most expensive domain name ever sold?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            The highest valued domain asset in internet history is <strong>Cars.com</strong>, appraised at <strong>$872,000,000</strong> in official SEC filings during Gannett Co.'s acquisition of Classified Ventures. The highest all-cash public transaction for a pure domain name is <strong>Insurance.com at $35,600,000</strong> (QuinStreet, 2010), closely followed by <strong>VacationRentals.com at $35,000,000</strong> and <strong>Voice.com at $30,000,000</strong>.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 space-y-2">
                        <h3 className="text-sm sm:text-base font-bold text-white">
                            What is the most expensive .AI domain ever sold?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            The highest verified public sale for a .ai extension domain is <strong>You.ai at $700,000</strong> in 2024, followed by <strong>Agent.ai at $400,000</strong> (acquired by HubSpot founder Dharmesh Shah) and <strong>Stack.ai at $258,888</strong>.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 space-y-2">
                        <h3 className="text-sm sm:text-base font-bold text-white">
                            Why do companies pay millions of dollars for domain names?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Enterprises acquire category-defining domains to establish instant institutional trust, capture permanent organic search type-in traffic without ongoing Google Ads pay-per-click spend, prevent competitors from seizing digital monopolies, and lower overall customer acquisition costs (CAC).
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
