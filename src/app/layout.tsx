import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MarketTicker from '@/components/MarketTicker';
import HalloweenEffects from '@/components/HalloweenEffects';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
    metadataBase: new URL('https://prstuvw.xyz'),
    title: {
        default: 'DomainVoodoo — Institutional-Grade Domain Valuation Engine',
        template: '%s | DomainVoodoo',
    },
    description:
        'Instant, transparent domain appraisals powered by 14.8M+ verified sales comps, multi-channel pricing matrices, and automated UDRP due diligence.',
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [{ url: '/favicon.svg' }],
    },
    verification: {
        google: 'q4OP3WIz5UHhRuKd--ygEACvrk1lUbcQtRS9kRsww7k',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className="flex min-h-screen flex-col font-sans bg-slate-950 text-slate-100 bg-tech-grid relative">
                <HalloweenEffects />
                <MarketTicker />
                <NavBar />
                <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">{children}</main>
                <Footer />
                <SpeedInsights />
            </body>
        </html>
    );
}
