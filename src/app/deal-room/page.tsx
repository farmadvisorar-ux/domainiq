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
        '@type': 'SoftwareApplication',
        name: 'DomainVoodoo Deal Room & Commission Simulator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        url: 'https://prstuvw.xyz/deal-room',
        offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD',
        },
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
