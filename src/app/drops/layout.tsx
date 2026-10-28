import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Expiring Drop Radar & Pending Delete Auction Valuation | DomainVoodoo',
    description: 'Track expiring and pending-delete domain auctions in real time. Audit Wayback Machine archive history, estimate drop catch auction ceilings, and spot undervalued gems.',
    keywords: ['expiring domain drop radar', 'pending delete domain auctions', 'expired domain appraisal', 'dropcatch valuation', 'godaddy closeouts radar'],
    alternates: {
        canonical: 'https://prstuvw.xyz/drops',
    },
    openGraph: {
        title: 'Expiring Drop Radar & Auction Due Diligence | DomainVoodoo',
        description: 'Daily pending-delete auction radar, drop comps, and archive vintage analysis.',
        url: 'https://prstuvw.xyz/drops',
        type: 'website',
    },
};

export default function DropsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
