import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Domain Name Generator & Brandable Valuation Tool | DomainVoodoo',
    description: 'Generate high-potency brandable domain names with instant algorithmic valuations. Combines phonetic linguistics, industry verticals, and .com/.ai availability.',
    keywords: ['ai domain name generator', 'brandable domain generator', 'startup name generator with valuation', 'business name ideas domain'],
    alternates: {
        canonical: 'https://prstuvw.xyz/suggest',
    },
    openGraph: {
        title: 'AI Domain Name Generator & Brandable Appraisal | DomainVoodoo',
        description: 'Generate brandable domain ideas with instant CVM-4 valuation scores and comps.',
        url: 'https://prstuvw.xyz/suggest',
        type: 'website',
    },
};

export default function SuggestLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
