import type { Metadata } from 'next';
import Link from 'next/link';
import SupportForm from '@/components/SupportForm';
import AltHuntBadge from '@/components/AltHuntBadge';

export const metadata: Metadata = {
    title: 'DomainVoodoo for Chrome — Official Support, FAQ & Developer Contact',
    description:
        'Official Google Chrome Web Store support portal for DomainVoodoo. Detailed FAQs, permissions transparency, troubleshooting guides, and direct developer contact.',
    keywords: [
        'domainvoodoo chrome support',
        'domainvoodoo extension help',
        'domain valuation chrome extension contact',
        'chrome web store support domainvoodoo',
        'domainvoodoo extension faq',
    ],
    openGraph: {
        title: 'DomainVoodoo for Chrome — Official Support Center',
        description: 'Need help with the DomainVoodoo Chrome Extension? Submit a ticket, read FAQs, or contact our engineering team directly.',
        type: 'website',
        url: 'https://prstuvw.xyz/extension/support',
    },
};

const FAQS = [
    {
        q: 'How does the DomainVoodoo Chrome Extension work?',
        a: 'When you click the DomainVoodoo icon on your Chrome toolbar, the extension inspects the active tab’s hostname (for example, "cloudflow.io") and evaluates it against our 6-tier deterministic appraisal engine. It delivers fair market value, wholesale liquidation floor, retail Buy-It-Now, 24-month lease payment, and UDRP trademark collision risk in under 200ms.',
    },
    {
        q: 'Why does the extension require the "activeTab" permission?',
        a: 'The "activeTab" permission is the most privacy-friendly permission supported by Google Chrome Manifest V3. It grants temporary read-only access to the URL of the tab you are actively viewing only when you explicitly click the extension popup icon. It does not run background processes, cannot monitor your tabs while idle, and cannot inspect tabs in other windows.',
    },
    {
        q: 'Does DomainVoodoo track my browsing history or collect personal data?',
        a: 'No. DomainVoodoo has a strict zero-tracking policy. We do NOT log, store, sell, or monetize your browsing history. We do NOT read or store cookies, session tokens, or web form data. The only information transmitted is the domain name you request valuation for to calculate the algorithmic price.',
    },
    {
        q: 'How do I pin DomainVoodoo to my Chrome toolbar for 1-click access?',
        a: 'In Google Chrome, click the Puzzle Piece icon (Extensions menu) at the top-right corner of your browser. Find "DomainVoodoo — Instant Domain Valuation" in the list and click the pushpin icon next to it so it turns blue. The DomainVoodoo talisman icon will now stay visible on your toolbar at all times.',
    },
    {
        q: 'What should I do if an appraisal is blank or says "Valuation Unavailable"?',
        a: 'First, check that your device is connected to the internet. If you are inspecting an internal network IP (e.g., localhost or 192.168.1.1) or a browser internal page (like chrome://extensions), the extension will display an alert because these cannot be appraised. For public domains, verify that you are on the latest version (v1.0.0+) or try manually typing the domain name into the input field in the popup.',
    },
    {
        q: 'How do I uninstall or remove the extension?',
        a: 'Right-click the DomainVoodoo icon on your Chrome toolbar and select "Remove from Chrome…", then click "Remove" in the confirmation prompt. Alternatively, navigate to chrome://extensions in your browser address bar, locate DomainVoodoo, and click the "Remove" button.',
    },
    {
        q: 'How does the valuation engine calculate liquidation floor vs retail BIN?',
        a: 'The liquidation floor represents the 48-hour wholesale price an investor or domainer would pay at liquid cash auction (typically 10%–25% of end-user fair market value). The Retail BIN (Buy-It-Now) represents an optimized direct acquisition price for an operating business or funded startup, benchmarked against real reported historical comps from Sedo, NameBio, and GoDaddy Auctions.',
    },
    {
        q: 'Does the extension work on Microsoft Edge, Brave, and Opera?',
        a: 'Yes. DomainVoodoo is fully Manifest V3 compliant and runs smoothly across all Chromium-based browsers, including Microsoft Edge, Brave, Opera, Vivaldi, and Google Chrome.',
    },
];

export default function ExtensionSupportPage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    const contactSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'DomainVoodoo Chrome Extension Support Center',
        url: 'https://prstuvw.xyz/extension/support',
        mainEntity: {
            '@type': 'Organization',
            name: 'DomainVoodoo Inc.',
            url: 'https://prstuvw.xyz',
            email: 'support@domainvoodoo.com',
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'technical support',
                email: 'support@domainvoodoo.com',
                availableLanguage: ['English'],
            },
        },
    };

    return (
        <div className="mx-auto max-w-4xl space-y-12">
            {/* Inject JSON-LD Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />

            {/* Header / Hero */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-brand-950/80 text-brand-300 border border-brand-800/80">
                    <span>🛠️</span>
                    <span>Official Google Chrome Web Store Support</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Chrome Extension <span className="text-brand-400">Support Center</span>
                </h1>

                <p className="mt-2 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                    Have questions about the DomainVoodoo Chrome &amp; Edge extension? Get fast troubleshooting, review our data privacy standards, or contact our engineering team directly.
                </p>

                {/* Status & Quick Links */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-mono">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Extension Services: Operational (v1.0.0)
                    </span>

                    <a
                        href="/domainvoodoo-extension.zip"
                        download="domainvoodoo-chrome-extension.zip"
                        className="btn-secondary !py-1.5 !px-3 font-mono text-xs flex items-center gap-1.5"
                    >
                        <span>📦</span>
                        <span>Download Extension ZIP</span>
                    </a>

                    <Link href="/extension" className="text-slate-400 hover:text-white underline transition-colors">
                        ← Back to Extension Overview
                    </Link>
                </div>
            </div>

            {/* Privacy & Permissions Transparency Grid */}
            <div id="permissions" className="card p-6 sm:p-8 space-y-5 border-brand-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
                    <div>
                        <span className="text-[11px] font-mono font-bold text-brand-400 uppercase tracking-wider">
                            Security &amp; Compliance Audit
                        </span>
                        <h2 className="text-xl font-bold text-white mt-0.5">
                            Data Safety &amp; Permissions Transparency
                        </h2>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-brand-950 text-brand-300 border border-brand-800 font-mono text-xs font-bold">
                        Manifest V3 Compliant
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                            <span>🛡️</span> Zero Tracking
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            We never log, track, or sell your web browsing history or search queries.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-cyan-400 font-bold text-sm flex items-center gap-1.5">
                            <span>⚡</span> activeTab Only
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Access to the current URL is requested only when you click the extension popup icon.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
                            <span>🔒</span> No Cookie Access
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            The extension does not inspect, read, or inject cookies or authorization tokens.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                            <span>🌐</span> Secure TLS 1.3
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            All algorithmic valuation requests are encrypted via modern HTTPS/TLS protocols.
                        </p>
                    </div>
                </div>

                <div className="text-xs text-slate-400 bg-slate-950/60 p-4 rounded-lg border border-slate-800 leading-relaxed">
                    <strong className="text-white">Reviewer Statement for Chrome Web Store:</strong> The DomainVoodoo extension operates as an on-demand domain research utility. When a user activates the extension, only the hostname of the active browser tab is passed to the DomainVoodoo valuation API (<code className="text-brand-300">https://prstuvw.xyz/api/v1/valuate</code>) to calculate pricing metrics. No persistent user identifiers, personal information, or session traces are retained.
                </div>
            </div>

            {/* Interactive Support Ticket Submission Form */}
            <div id="contact" className="space-y-4">
                <SupportForm defaultCategory="Chrome Extension Bug / Issue" />
            </div>

            {/* Comprehensive FAQs Section */}
            <div id="faq" className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                        Everything you need to know about installing, troubleshooting, and appraising domains with the extension.
                    </p>
                </div>

                <div className="grid gap-4">
                    {FAQS.map((faq, i) => (
                        <div key={i} className="card p-5 sm:p-6 space-y-2 border-slate-800 bg-slate-900/60">
                            <h3 className="font-bold text-sm sm:text-base text-white flex items-start gap-2.5">
                                <span className="text-brand-400 font-mono text-xs pt-0.5">Q{i + 1}.</span>
                                <span>{faq.q}</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 pl-6 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Direct Contact Channels & Service Level Agreement */}
            <div className="card p-6 sm:p-8 space-y-4 border-slate-800 bg-slate-900/70">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>📞</span>
                    <span>Direct Developer Contact &amp; Escalation Channels</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                            Primary Support Email
                        </div>
                        <a href="mailto:support@domainvoodoo.com" className="text-brand-400 font-mono text-sm hover:underline block truncate">
                            support@domainvoodoo.com
                        </a>
                        <div className="text-slate-500 text-[11px]">Monitored 7 days a week</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                            Response SLA
                        </div>
                        <div className="text-emerald-400 font-bold text-sm">
                            &lt; 24 Hours
                        </div>
                        <div className="text-slate-500 text-[11px]">Engineering ticket replies</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                            Product Hunt &amp; Community
                        </div>
                        <a href="https://althunt.io/compare/domainvoodoo-vs-dynadot" target="_blank" rel="noopener noreferrer" className="text-brand-400 text-sm hover:underline block truncate">
                            AltHunt Community Reviews ↗
                        </a>
                        <div className="text-slate-500 text-[11px]">Community discussion &amp; feedback</div>
                    </div>
                </div>

                <div className="pt-2 text-center">
                    <AltHuntBadge />
                </div>
            </div>
        </div>
    );
}
