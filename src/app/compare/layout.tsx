import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Domain Comparer — Side-by-Side Head-to-Head Appraisal Showdown | DomainVoodoo',
    description: 'Compare two domain names side by side. Benchmark fair market value, liquidity scores, brand strength, character scarcity, and historical comps in real time.',
    keywords: ['compare domain names', 'domain name comparison tool', 'side by side domain appraisal', 'which domain is worth more'],
    alternates: {
        canonical: 'https://prstuvw.xyz/compare',
    },
    openGraph: {
        title: 'Domain Comparer — Head-to-Head Valuation Showdown | DomainVoodoo',
        description: 'Side-by-side metric comparison: Fair Market Value, Liquidity Rating, and Scarcity.',
        url: 'https://prstuvw.xyz/compare',
        type: 'website',
    },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
