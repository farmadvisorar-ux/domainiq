import type { Metadata } from 'next';
import Link from 'next/link';
import { performValuation } from '@/lib/valuation-request';
import { evaluateDomain } from '@/lib/valuation/engine';
import { normalizeDomain } from '@/lib/domain';
import { formatUsd } from '@/lib/format';
import LanderInteractiveStudio from '@/components/LanderInteractiveStudio';

export const dynamic = 'force-dynamic';

interface Props {
    params: { domain: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const rawDomain = decodeURIComponent(params.domain || '');
    const domain = normalizeDomain(rawDomain);
    const canonicalUrl = `https://prstuvw.xyz/lander/${encodeURIComponent(domain)}`;
    const badgeImageUrl = `https://prstuvw.xyz/api/badge/${encodeURIComponent(domain)}?style=card`;

    return {
        title: `${domain} — Available for Acquisition or Lease-to-Own | DomainVoodoo Verified`,
        description: `Acquire or lease ${domain} with 0% broker markup via Escrow.com. Backed by an independent CVM-4 algorithmic fair market appraisal, trademark clearance, and CAC audit.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${domain} — Domain Acquisition & Lease-to-Own Portal`,
            description: `Instant Buy-It-Now or 24-month Lease-to-Own for ${domain}, verified by DomainVoodoo CVM-4.`,
            url: canonicalUrl,
            type: 'website',
            images: [
                {
                    url: badgeImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${domain} Verified Valuation Card`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${domain} — Available for Acquisition | DomainVoodoo`,
            description: `Verified fair market appraisal and direct Escrow acquisition portal for ${domain}.`,
            images: [badgeImageUrl],
        },
    };
}

export default async function DomainLanderPage({ params }: Props) {
    const rawInput = decodeURIComponent(params.domain || '').trim();
    const domain = normalizeDomain(rawInput);

    let result: import('@/lib/valuation/engine').ValuationResult | undefined;
    try {
        const valReq = await performValuation(domain);
        result = valReq.result;
    } catch {
        // fallback below
    }

    if (!result) {
        try {
            result = await evaluateDomain(domain, {
                lookupAge: false,
                lookupArchive: false,
                checkTrademark: false,
            });
        } catch {
            result = await evaluateDomain('domainvoodoo.com', {
                lookupAge: false,
                lookupArchive: false,
                checkTrademark: false,
            });
        }
    }

    const encodedDomain = encodeURIComponent(result.domain);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Product',
                '@id': `https://prstuvw.xyz/lander/${encodedDomain}#product`,
                name: `${result.domain} Premium Domain Name Asset`,
                description: `Verified digital real estate asset (${result.structuralArchetype.label}). Appraised at ${formatUsd(result.midUsd)} Fair Market Value by DomainVoodoo CVM-4.`,
                brand: {
                    '@type': 'Brand',
                    name: result.domain,
                },
                offers: {
                    '@type': 'Offer',
                    url: `https://prstuvw.xyz/lander/${encodedDomain}`,
                    priceCurrency: 'USD',
                    price: result.midUsd.toString(),
                    availability: 'https://schema.org/InStock',
                    seller: {
                        '@type': 'Organization',
                        name: 'Escrow.com / Verified Registrant',
                    },
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: result.domainRating.toFixed(1),
                    bestRating: '10',
                    worstRating: '1',
                    ratingCount: '1',
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `https://prstuvw.xyz/lander/${encodedDomain}#breadcrumb`,
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
                        name: `${result.domain} Valuation`,
                        item: `https://prstuvw.xyz/valuation/${encodedDomain}`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: `${result.domain} Acquisition Lander`,
                        item: `https://prstuvw.xyz/lander/${encodedDomain}`,
                    },
                ],
            },
        ],
    };

    return (
        <div className="mx-auto max-w-4xl space-y-10 py-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Top Verification Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 px-5 py-3">
                <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-300 font-bold">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>DIRECT ACQUISITION PORTAL • 0% BROKER COMMISSION MARKUP</span>
                </div>
                <Link
                    href={`/valuation/${encodedDomain}`}
                    className="text-xs font-mono text-brand-300 hover:text-white underline transition-colors"
                >
                    ← View Full CVM-4 Valuation Report
                </Link>
            </div>

            {/* Domain Hero Header */}
            <section className="card p-8 sm:p-10 text-center space-y-4 relative overflow-hidden border-brand-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/30">
                <div className="mx-auto flex flex-wrap items-center justify-center gap-2">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/70 text-amber-300 border border-amber-500/40">
                        ⭐ {result.domainRating.toFixed(1)} / 10 DOMAIN RATING ({result.domainRatingLabel})
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-950 text-cyan-300 border border-cyan-500/30">
                        💎 {result.structuralArchetype.label}
                    </span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
                    {result.domain}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                    Verified Fair Market Appraisal:{' '}
                    <strong className="text-emerald-400 font-mono">{formatUsd(result.midUsd)}</strong>{' '}
                    <span className="text-slate-400 text-xs font-mono">
                        (Range: {formatUsd(result.lowUsd)} – {formatUsd(result.highUsd)})
                    </span>
                </p>
            </section>

            {/* Interactive Acquisition & Owner Lander Studio */}
            <LanderInteractiveStudio
                domain={result.domain}
                defaultBinUsd={result.channelPricing.recommendedBinPrice || result.midUsd}
                defaultLto24MonthlyUsd={result.channelPricing.leaseToOwn.months24.monthlyUsd}
                defaultMinOfferUsd={result.channelPricing.wholesale.highUsd || result.channelPricing.liquidationFloor}
                domainRating={result.domainRating}
                domainRatingLabel={result.domainRatingLabel}
                structuralLabel={result.structuralArchetype.label}
                annualCacSavingsUsd={result.economicArbitrage.annualMarketingAvoidanceUsd}
            />

            {/* Why This Domain Commands Its Valuation (Mathematical Proof for Buyers) */}
            <section className="card p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
                            Independent Valuation Proof
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            Why {result.domain} Appraises at {formatUsd(result.midUsd)}
                        </h2>
                    </div>
                    <Link
                        href={`/valuation/${encodedDomain}/certificate`}
                        className="btn-secondary text-xs font-mono"
                    >
                        📄 Official Appraisal Certificate →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                        <div className="text-[11px] font-mono text-slate-400 uppercase">Structural Scarcity</div>
                        <div className="text-lg font-black font-mono text-white">
                            {formatUsd(result.triangulation.structuralValueUsd)}
                        </div>
                        <div className="text-xs text-slate-400">{result.structuralArchetype.rarity}</div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                        <div className="text-[11px] font-mono text-slate-400 uppercase">Annual Ad CAC Saved</div>
                        <div className="text-lg font-black font-mono text-emerald-400">
                            {formatUsd(result.economicArbitrage.annualMarketingAvoidanceUsd)}/yr
                        </div>
                        <div className="text-xs text-slate-400">Organic type-in &amp; CTR trust lift</div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                        <div className="text-[11px] font-mono text-slate-400 uppercase">90-Day Wholesale Floor</div>
                        <div className="text-lg font-black font-mono text-amber-300">
                            {formatUsd(result.channelPricing.liquidationFloor)}
                        </div>
                        <div className="text-xs text-slate-400">Institutional cash downside floor</div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-1">
                        <div className="text-[11px] font-mono text-slate-400 uppercase">UDRP Trademark Audit</div>
                        <div className="text-lg font-black font-mono text-cyan-300">
                            {result.trademark.riskLevel.toUpperCase()}
                        </div>
                        <div className="text-xs text-slate-400">{result.trademark.udrpRating}</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
