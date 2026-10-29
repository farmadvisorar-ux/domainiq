import type { Metadata } from 'next';
import Link from 'next/link';
import DealRoomSimulator from '@/components/DealRoomSimulator';
import AltHuntBadge from '@/components/AltHuntBadge';

export const metadata: Metadata = {
    title: 'Domain Deal Room, Broker Negotiation Simulator & Escrow Fee Calculator | DomainVoodoo',
    description:
        'Simulate domain name price negotiations, generate 3-round institutional broker counter-offer scripts, compare Escrow.com vs Sedo/Afternic commissions, and model portfolio ROI.',
    keywords: [
        'domain negotiation simulator',
        'domain broker counter offer script',
        'domain marketplace commission calculator',
        'escrow vs afternic vs sedo fees',
        'domain portfolio roi calculator',
        'domain carrying cost calculator',
    ],
    alternates: {
        canonical: 'https://prstuvw.xyz/deal-room',
    },
    openGraph: {
        title: 'Domain Deal Room & Escrow Net Payout Calculator | DomainVoodoo',
        description:
            'Calculate exact seller net proceeds, simulate buyer counter-offers, and export institutional broker email scripts.',
        type: 'website',
        url: 'https://prstuvw.xyz/deal-room',
    },
};

export default function DealRoomPage({
    searchParams,
}: {
    searchParams?: { domain?: string; price?: string };
}) {
    const initialDomain = searchParams?.domain ? decodeURIComponent(searchParams.domain) : 'cloudscale.ai';
    const parsedPrice = searchParams?.price ? Number(searchParams.price) : 42500;
    const initialPrice = !isNaN(parsedPrice) && parsedPrice >= 100 ? parsedPrice : 42500;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'SoftwareApplication',
                '@id': 'https://prstuvw.xyz/deal-room#software',
                name: 'DomainVoodoo Deal Room & Commission Simulator',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'All',
                url: 'https://prstuvw.xyz/deal-room',
                offers: {
                    '@type': 'Offer',
                    price: '0.00',
                    priceCurrency: 'USD',
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://prstuvw.xyz/deal-room#breadcrumb',
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
                        name: 'Domain Deal Room & Negotiation Simulator',
                        item: 'https://prstuvw.xyz/deal-room',
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': 'https://prstuvw.xyz/deal-room#faq',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is the 1.45x anchor rule in domain negotiations?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The 1.45x anchor rule states that domain sellers should set their opening price at 145% of their walk-away reserve value. This mathematical buffer absorbs typical buyer counter-offer concessions across a standard 3-round negotiation without eating into the seller\'s true target profit.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What percentage should a buyer offer below asking price on a domain?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Buyers should open between 35% and 50% of the seller\'s initial asking price or algorithmic fair market value. This establishes a credible counter-anchor while leaving room to settle at approximately 70% to 80% of asking price.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the lowest fees for closing a domain sale?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Direct wire transfers on Escrow.com charge the lowest fee at 1.50% for standard transactions, compared to 15.00% on Sedo MLS and standard Afternic Fast-Transfer, or up to 25.00% for unboosted or outbound brokerage.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How does domain Lease-to-Own (LTO) financing work?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Lease-to-Own allows buyers to pay for premium domains in 12 to 36 monthly installments with a standard 10% financing surcharge. The seller delegates DNS nameservers immediately upon the first deposit so the buyer can launch their website, while title transfer occurs in escrow upon final payment.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div className="mx-auto max-w-6xl space-y-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-brand-950/80 text-brand-300 border border-brand-800/80">
                    <span>🤝</span>
                    <span>Institutional Brokerage &amp; Deal Structuring Terminal</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Domain <span className="text-brand-400">Deal Room</span> &amp; Fee Simulator
                </h1>

                <p className="mt-2 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                    Model counterparty buyer leverage, generate 3-round broker negotiation scripts, compare marketplace commissions (Escrow.com vs. Afternic/Sedo), and stress-test portfolio renewal ROI.
                </p>

                <div className="pt-1 flex justify-center">
                    <AltHuntBadge />
                </div>
            </div>

            {/* Interactive Simulator */}
            <DealRoomSimulator initialDomain={initialDomain} initialPrice={initialPrice} />

            {/* Bottom Callout */}
            <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-slate-800 bg-slate-900/60">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold text-white">Need an Official Appraisal Certificate for Escrow?</h2>
                    <p className="text-xs text-slate-400">
                        Run any domain through our 6-tier valuation engine to export a printable, cryptographically stamped appraisal certificate to attach to your buyer pitch.
                    </p>
                </div>
                <Link href="/" className="btn-primary whitespace-nowrap text-xs font-bold !py-3 !px-6">
                    Appraise a Domain →
                </Link>
            </div>
        </div>
    );
}
