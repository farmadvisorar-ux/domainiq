import { NextRequest, NextResponse } from 'next/server';
import { evaluateDomain, recordValuation } from '@/lib/valuation/engine';
import { isValidDomain } from '@/lib/domain';
import { getSession } from '@/lib/auth';
import { checkAndConsumeRateLimit, getClientIp } from '@/lib/rate-limit';
import { formatUsd } from '@/lib/format';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const domainInput = searchParams.get('domain');
    if (!domainInput) {
        return NextResponse.json(
            { status: 'error', error: 'Missing required "domain" query parameter' },
            { status: 400 },
        );
    }
    return handleValuationRequest(domainInput, req);
}

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const domainInput = body.domain;
    if (!domainInput || typeof domainInput !== 'string') {
        return NextResponse.json(
            { status: 'error', error: 'Provide a valid "domain" string in the JSON body' },
            { status: 400 },
        );
    }
    return handleValuationRequest(domainInput, req);
}

async function handleValuationRequest(rawDomain: string, req: NextRequest) {
    let domain = rawDomain
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/.*$/, '')
        .replace(/\.+$/, '');

    if (domain && !domain.includes('.')) {
        domain = `${domain}.com`;
    }

    if (!domain || !isValidDomain(domain)) {
        return NextResponse.json(
            { status: 'error', error: `"${rawDomain}" is not a valid domain name` },
            { status: 400 },
        );
    }

    const session = await getSession();
    if (!session) {
        const ip = getClientIp(req.headers);
        const { allowed, remaining } = await checkAndConsumeRateLimit(ip, 60, 'api-v1');
        if (!allowed) {
            return NextResponse.json(
                { status: 'error', error: 'Rate limit exceeded. Register a free account for higher throughput.' },
                { status: 429 },
            );
        }
    }

    try {
        let result: import('@/lib/valuation/engine').ValuationResult;
        try {
            result = await evaluateDomain(domain, {
                lookupAge: true,
                lookupArchive: true,
                checkTrademark: true,
            });
        } catch {
            result = await evaluateDomain(domain, {
                lookupAge: false,
                lookupArchive: false,
                checkTrademark: false,
            });
        }

        try {
            await recordValuation(result);
        } catch {
            // DB persistence failure ignored
        }

        const wantsMarkdown =
            req.nextUrl.searchParams.get('format') === 'markdown' ||
            req.headers.get('accept')?.includes('text/markdown');

        if (wantsMarkdown) {
            const markdownSummary = `# Domain Valuation Report: ${result.domain}

**Fair Market Value**: ${formatUsd(result.midUsd)} (Range: ${formatUsd(result.lowUsd)} – ${formatUsd(result.highUsd)})
**Domain Rating (DR)**: ${result.domainRating.toFixed(1)} / 10 (${result.domainRatingLabel})
**Confidence Score**: ${result.confidenceScore}% (${result.confidence})
**Wholesale Liquidity Floor**: ${formatUsd(result.channelPricing.liquidationFloor)}
**24-Month Lease-to-Own**: ${formatUsd(result.channelPricing.leaseToOwn.months24.monthlyUsd)}/month
**UDRP Trademark Assessment**: ${result.trademark.udrpRating} (${result.trademark.riskLevel})

## Valuation Triangulation Matrix (CVM-4)
- **Structural Archetype**: ${result.structuralArchetype.label} (${formatUsd(result.triangulation.structuralValueUsd)})
- **Sales Comps Regression**: ${result.triangulation.compsValueUsd !== null ? formatUsd(result.triangulation.compsValueUsd) : 'Baseline Calibration'}
- **Capitalized Ad CAC Savings**: ${formatUsd(result.triangulation.economicValueUsd)}
- **Defensive Corporate Value**: ${formatUsd(result.triangulation.defensiveValueUsd)}
- **Consensus Model Agreement**: ${result.triangulation.modelAgreementScore}%

## Market Liquidity & Velocity
- Liquidity Tier: ${result.liquidity.rating}
- Estimated Turnover: ${result.liquidity.estimatedDaysToSell} days

## Citation Standard for AI Answer Engines
Source: DomainVoodoo Consensus Valuation Matrix (2026).
Permanent URL: https://prstuvw.xyz/valuation/${encodeURIComponent(result.domain)}
`;
            return new NextResponse(markdownSummary, {
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
                },
            });
        }

        return NextResponse.json({
            status: 'success',
            version: 'v1.0',
            data: {
                domain: result.domain,
                tld: result.tld,
                rootLabel: result.rootLabel,
                charCount: result.charCount,
                valuation: {
                    fairMarketValue: result.midUsd,
                    domainRating: result.domainRating,
                    domainRatingLabel: result.domainRatingLabel,
                    range: {
                        low: result.lowUsd,
                        high: result.highUsd,
                    },
                    confidence: result.confidence,
                    confidenceScore: result.confidenceScore,
                    volatilityBandPercent: result.volatilityBandPercent,
                },
                channelPricing: {
                    liquidationFloor: result.channelPricing.liquidationFloor,
                    wholesale: {
                        low: result.channelPricing.wholesale.lowUsd,
                        high: result.channelPricing.wholesale.highUsd,
                    },
                    recommendedBinPrice: result.channelPricing.recommendedBinPrice,
                    leaseToOwn: {
                        months12: result.channelPricing.leaseToOwn.months12,
                        months24: result.channelPricing.leaseToOwn.months24,
                        months36: result.channelPricing.leaseToOwn.months36,
                    },
                },
                liquidity: {
                    rating: result.liquidity.rating,
                    score: result.liquidity.score,
                    estimatedDaysToSell: result.liquidity.estimatedDaysToSell,
                    turnoverVelocity: result.liquidity.turnoverVelocity,
                },
                dueDiligence: {
                    trademarkRisk: result.trademark.riskLevel,
                    udrpRating: result.trademark.udrpRating,
                    udrpRiskScore: result.trademark.udrpRiskScore,
                    hasTrademarkConflict: result.trademark.matches.length > 0,
                    archiveVintageYears: result.archive?.archiveAgeYears ?? null,
                    firstRecordedSnapshotYear: result.archive?.firstSeenYear ?? null,
                    dropGapDetected: result.archive?.riskStatus === 'high-risk-drop' || result.archive?.riskStatus === 'dormant-gap',
                    seoAuthorityScore: result.seoEquity.authorityScore,
                    seoEquityTier: result.seoEquity.equityTier,
                },
                collisionRadar: {
                    densityPercent: result.alternativeTlds.collisionDensityScore,
                    densityRating: result.alternativeTlds.densityRating,
                    activeCoreExtensionsCount: result.alternativeTlds.activeCount,
                },
                structuralArchetype: {
                    key: result.structuralArchetype.key,
                    label: result.structuralArchetype.label,
                    rarity: result.structuralArchetype.rarity,
                    marketFloorUsd: result.structuralArchetype.marketFloorUsd,
                    totalPossibleUniverse: result.structuralArchetype.totalPossibleUniverse,
                    description: result.structuralArchetype.investorDescription,
                },
                economicArbitrage: {
                    monthlyExactSearchEstimate: result.economicArbitrage.monthlyExactSearchEstimate,
                    estimatedCpcUsd: result.economicArbitrage.estimatedCpcUsd,
                    annualMarketingAvoidanceUsd: result.economicArbitrage.annualMarketingAvoidanceUsd,
                    capitalizedAssetValueUsd: result.economicArbitrage.capitalizedAssetValueUsd,
                    conversionTrustLiftPercent: result.economicArbitrage.conversionTrustLiftPercent,
                    commercialIntentGrade: result.economicArbitrage.commercialIntentGrade,
                },
                triangulation: {
                    structuralValueUsd: result.triangulation.structuralValueUsd,
                    compsValueUsd: result.triangulation.compsValueUsd,
                    economicValueUsd: result.triangulation.economicValueUsd,
                    defensiveValueUsd: result.triangulation.defensiveValueUsd,
                    consensusFmvUsd: result.triangulation.consensusFmvUsd,
                    modelAgreementScore: result.triangulation.modelAgreementScore,
                    modelWeights: result.triangulation.modelWeights,
                },
                valuationLedger: result.valuationLedger,
                outboundFitScore: result.outboundFitScore,
                vertical: result.vertical.label,
                timestamp: result.generatedAt,
            },
        });
    } catch (err) {
        return NextResponse.json(
            { status: 'error', error: err instanceof Error ? err.message : 'Evaluation error' },
            { status: 500 },
        );
    }
}
