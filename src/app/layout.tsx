import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MarketTicker from '@/components/MarketTicker';
import HalloweenEffects from '@/components/HalloweenEffects';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
    title: 'DomainVoodoo — Institutional-Grade Domain Valuation Engine',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className="flex min-h-screen flex-col font-sans bg-slate-950 text-slate-100 bg-tech-grid relative">
                <HalloweenEffects />
                <MarketTicker />
                <NavBar />
                <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-12 relative z-10">{children}</main>
                <Footer />
                <SpeedInsights />
            </body>
        </html>
    );
}
