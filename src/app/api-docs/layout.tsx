import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Developer REST API v1 Documentation & SDK | DomainVoodoo',
    description: 'Integrate institutional domain appraisal into your apps. Free programmatic REST API with JSON response format, confidence scores, and multi-channel pricing matrices.',
    keywords: ['domain valuation api', 'domain appraisal rest api', 'free domain value api', 'programmatic domain valuation'],
    alternates: {
        canonical: 'https://prstuvw.xyz/api-docs',
    },
    openGraph: {
        title: 'DomainVoodoo Developer REST API v1 | Domain Valuation API',
        description: 'Free programmatic domain appraisal API endpoints with instant JSON appraisals.',
        url: 'https://prstuvw.xyz/api-docs',
        type: 'website',
    },
};

export default function ApiDocsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
