import type { Metadata } from 'next';
import Link from 'next/link';
import SupportForm from '@/components/SupportForm';
import AltHuntBadge from '@/components/AltHuntBadge';

export const metadata: Metadata = {
    title: 'Support & Help Center — DomainVoodoo Terminal & Chrome Extension',
    description:
        'Official DomainVoodoo Support & Help Center. Get technical assistance for the Web Terminal, Chrome Extension, Developer API, and account inquiries.',
    keywords: [
        'domainvoodoo support',
        'domainvoodoo help center',
        'domain valuation customer service',
        'chrome extension support domainvoodoo',
        'domain appraisal api support',
    ],
    openGraph: {
        title: 'DomainVoodoo Support & Help Center',
        description: 'Need help? Submit a ticket, read FAQs, or reach out to our engineering support team.',
        type: 'website',
        url: 'https://prstuvw.xyz/support',
    },
};

export default function GeneralSupportPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-12">
            {/* Header / Hero */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-brand-950/80 text-brand-300 border border-brand-800/80">
                    <span>💬</span>
                    <span>DomainVoodoo Help &amp; Customer Support</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    How Can We <span className="text-brand-400">Help You?</span>
                </h1>

                <p className="mt-2 text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    Access technical documentation, get help with our Chrome extension, report valuation issues, or contact engineering.
                </p>
            </div>

            {/* Support Hub Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="card p-6 space-y-3 border-brand-500/30 bg-slate-900/60 hover:border-brand-500/60 transition-colors">
                    <span className="text-3xl">🧩</span>
                    <h3 className="font-bold text-base text-white">Chrome Extension</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Installation troubleshooting, permissions transparency, activeTab behavior, and browser-specific guides.
                    </p>
                    <Link
                        href="/extension/support"
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors pt-1"
                    >
                        <span>Extension Support Page</span>
                        <span>→</span>
                    </Link>
                </div>

                <div className="card p-6 space-y-3 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors">
                    <span className="text-3xl">📊</span>
                    <h3 className="font-bold text-base text-white">Valuation Engine</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Understand the 6-factor deterministic algorithm, historical comps benchmarking, and wholesale floor logic.
                    </p>
                    <Link
                        href="/how-it-works"
                        className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-1"
                    >
                        <span>Algorithm Documentation</span>
                        <span>→</span>
                    </Link>
                </div>

                <div className="card p-6 space-y-3 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors">
                    <span className="text-3xl">⚡</span>
                    <h3 className="font-bold text-base text-white">Developer REST API</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Automate appraisals, query sales records programmatically, and integrate endpoints with your scripts.
                    </p>
                    <Link
                        href="/api-docs"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors pt-1"
                    >
                        <span>REST API Docs v1</span>
                        <span>→</span>
                    </Link>
                </div>
            </div>

            {/* Support Ticket Submission */}
            <div className="space-y-4">
                <SupportForm defaultCategory="Chrome Extension Bug / Issue" />
            </div>

            {/* Direct Contact & Response SLA */}
            <div className="card p-6 sm:p-8 space-y-4 border-slate-800 bg-slate-900/70 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-white">Direct Engineering Contact</h3>
                        <p className="text-xs text-slate-400 mt-1">
                            For urgent partnership, enterprise valuation audits, or security inquiries.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="mailto:support@domainvoodoo.com"
                            className="btn-secondary !py-2 !px-4 text-xs font-mono font-semibold"
                        >
                            support@domainvoodoo.com
                        </a>
                        <AltHuntBadge />
                    </div>
                </div>
            </div>
        </div>
    );
}
