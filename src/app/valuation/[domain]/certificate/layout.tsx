import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Printable Domain Appraisal Certificate | DomainVoodoo',
    robots: {
        index: false,
        follow: true,
    },
};

export default function CertificateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
