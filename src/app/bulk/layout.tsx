import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bulk Domain Valuation & Portfolio Appraisal (Up to 500 Names) | DomainVoodoo',
    description: 'Batch evaluate domain portfolios instantly. Upload or paste up to 500 domain names to calculate wholesale floors, retail FMV, and export CSV ledger reports.',
    keywords: ['bulk domain appraisal', 'batch domain valuation', 'domain portfolio value calculator', 'bulk godaddy appraisal alternative', 'csv domain appraisal'],
    alternates: {
        canonical: 'https://prstuvw.xyz/bulk',
    },
    openGraph: {
        title: 'Bulk Domain Valuation & Portfolio Appraisal | DomainVoodoo',
        description: 'Batch evaluate up to 500 domains with multi-tier algorithmic pricing and CSV export.',
        url: 'https://prstuvw.xyz/bulk',
        type: 'website',
    },
};

export default function BulkLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
