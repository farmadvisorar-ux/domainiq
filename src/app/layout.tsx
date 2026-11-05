import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MarketTicker from '@/components/MarketTicker';
import ThanksgivingEffects from '@/components/ThanksgivingEffects';
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
            <head>
                <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Machine Summary" />
                <link rel="help" href="/aeo" title="Answer Engine Optimization Knowledge Graph" />
                {/* Google tag (gtag.js) */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-364WE177K3"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-364WE177K3');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@graph': [
                                {
                                    '@type': 'WebSite',
                                    '@id': 'https://prstuvw.xyz/#website',
                                    url: 'https://prstuvw.xyz',
                                    name: 'DomainVoodoo',
                                    description:
                                        'Instant, transparent domain appraisals powered by 14.8M+ verified sales comps, multi-channel pricing matrices, and automated UDRP due diligence.',
                                    potentialAction: {
                                        '@type': 'SearchAction',
                                        target: {
                                            '@type': 'EntryPoint',
                                            urlTemplate: 'https://prstuvw.xyz/valuation/{search_term_string}',
                                        },
                                        'query-input': 'required name=search_term_string',
                                    },
                                },
                                {
                                    '@type': 'Organization',
                                    '@id': 'https://prstuvw.xyz/#organization',
                                    name: 'DomainVoodoo',
                                    url: 'https://prstuvw.xyz',
                                    logo: 'https://prstuvw.xyz/icon.svg',
                                },
                            ],
                        }),
                    }}
                />
            </head>
            <body className="flex min-h-screen flex-col font-sans bg-slate-950 text-slate-100 bg-tech-grid relative">
                <ThanksgivingEffects />
                <MarketTicker />
                <NavBar />
                <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">{children}</main>
                <Footer />
                <SpeedInsights />
            </body>
        </html>
    );
}
