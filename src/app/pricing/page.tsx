import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Domain Appraisal Pricing & Account Quotas | DomainVoodoo',
    description: 'DomainVoodoo is 100% free with zero paywalls, no subscriptions, and no credit card required. Unlimited valuations, bulk checks, and Watchlist alerts.',
    keywords: ['free domain appraisal', 'domain valuation cost', 'godaddy appraisal free alternative', 'estibot free alternative'],
    alternates: {
        canonical: 'https://prstuvw.xyz/pricing',
    },
    openGraph: {
        title: 'Simple Pricing: 100% Free Domain Valuation | DomainVoodoo',
        description: 'Zero paywalls, no credit cards. Instant access to institutional domain appraisal tools.',
        url: 'https://prstuvw.xyz/pricing',
        type: 'website',
    },
};

const PLANS = [
    {
        name: 'Free',
        price: '$0',
        blurb: 'Everything, for everyone.',
        features: [
            'Unlimited valuations once signed in (15/day without an account)',
            'Full factor breakdown & comparable sales, no email wall',
            'Compare up to 4 domains side by side',
            'Bulk-check up to 200 domains at once',
            'Watchlist with price-change tracking',
        ],
        cta: 'Sign up free',
        href: '/signup',
    },
];

export default function PricingPage() {
    return (
        <div className="mx-auto max-w-2xl space-y-8 text-center">
            <div>
                <h1 className="text-3xl font-bold">Simple pricing: free</h1>
                <p className="mt-2 text-slate-500">
                    DomainVoodoo is fully free. We keep the lights on with unobtrusive ads and optional affiliate links to
                    domain marketplaces — never a paywall on the valuation itself.
                </p>
            </div>
            {PLANS.map((plan) => (
                <div key={plan.name} className="card mx-auto max-w-md p-8 text-left">
                    <h2 className="text-xl font-semibold">{plan.name}</h2>
                    <p className="mt-1 text-3xl font-bold">{plan.price}</p>
                    <p className="mt-1 text-sm text-slate-500">{plan.blurb}</p>
                    <ul className="mt-6 space-y-2 text-sm">
                        {plan.features.map((f) => (
                            <li key={f} className="flex gap-2">
                                <span className="text-emerald-500">✓</span> {f}
                            </li>
                        ))}
                    </ul>
                    <Link href={plan.href} className="btn-primary mt-6 w-full">
                        {plan.cta}
                    </Link>
                </div>
            ))}
        </div>
    );
}
