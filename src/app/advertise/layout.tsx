import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Advertise on DomainVoodoo — Sponsor High-Net-Worth Domain Investors',
    description: 'Reach thousands of verified domain portfolio investors, startup founders, and digital asset brokers. High-impact native billboard, banner, and newsletter sponsorships.',
    keywords: ['domain advertising', 'sponsor domain investors', 'domain registrar advertising', 'crypto and tech newsletter ads'],
    alternates: {
        canonical: 'https://prstuvw.xyz/advertise',
    },
    openGraph: {
        title: 'Advertise on DomainVoodoo — Reach Digital Asset Investors',
        description: 'High-visibility billboard, banner, and newsletter sponsor placements.',
        url: 'https://prstuvw.xyz/advertise',
        type: 'website',
    },
};

export default function AdvertiseLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
