import type { Metadata } from 'next';
import Link from 'next/link';
import SupportForm from '@/components/SupportForm';
import AltHuntBadge from '@/components/AltHuntBadge';

export const metadata: Metadata = {
    title: 'Support & Help Center — DomainVoodoo Terminal, Android App & Chrome Extension',
    description:
        'Official DomainVoodoo Support & Help Center. Get technical assistance for the Web Terminal, Android App, Chrome Extension, Developer API, and account inquiries.',
    keywords: [
        'domainvoodoo support',
        'domainvoodoo help center',
        'google play store app support domainvoodoo',
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

const FAQS = [
    {
        q: 'How does DomainVoodoo calculate domain valuations?',
        a: 'DomainVoodoo utilizes a deterministic 6-tier valuation engine cross-referenced against 14.8M+ verified historical sales records from Sedo, NameBio, and GoDaddy. It factors in TLD prestige, syllable count, pronounceability, commercial keyword intent, and actual recent comps to deliver Wholesale Floor, Fair Market Value, and Retail BIN pricing in milliseconds.',
    },
    {
        q: 'Where can I get support for the Google Play Store Android app?',
        a: 'You can submit a ticket using the form below (select "Google Play Store / Android App" in the dropdown), or email our mobile team directly at support@domainvoodoo.com. We answer all Android app, billing, and APK installation questions with a guaranteed 24-hour SLA.',
    },
    {
        q: 'How does the Chrome & Edge extension work?',
        a: 'When you open the extension while browsing any website or domain auction (such as GoDaddy Auctions, Sedo, or Namecheap), it reads the active tab hostname via the privacy-preserving activeTab permission and instantly displays comprehensive valuation and UDRP trademark risk data without storing your browsing history.',
    },
    {
        q: 'Do you offer an automated API for batch evaluations?',
        a: 'Yes. Our REST API v1 allows programmatic domain valuations, bulk portfolio appraisal lookups, and historical sales query endpoints. Check out our interactive API Documentation (/api-docs) to get started.',
    },
    {
        q: 'What is your response time for support inquiries?',
        a: 'Our engineering and valuation teams monitor inquiries 7 days a week. All bug reports, valuation questions, and support tickets receive a response within 24 business hours.',
    },
];

export default function GeneralSupportPage() {
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
        name: 'DomainVoodoo Support & Help Center',
        url: 'https://prstuvw.xyz/support',
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
            {/* Inject JSON-LD Schema */}
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
                    <span>💬</span>
                    <span>DomainVoodoo Help &amp; Customer Support</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    How Can We <span className="text-brand-400">Help You?</span>
                </h1>

                <p className="mt-2 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                    Official support center for the DomainVoodoo Web Terminal, Google Play Store Android app, Chrome extension, and Developer REST API.
                </p>

                {/* Status indicator */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-mono">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        All Appraisal Engines Operational &bull; 24h Ticket Response SLA
                    </span>
                </div>
            </div>

            {/* Support Hub 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card p-5 space-y-2.5 border-brand-500/30 bg-slate-900/60 hover:border-brand-500/60 transition-colors">
                    <span className="text-2xl">📱</span>
                    <h3 className="font-bold text-sm text-white">Google Play App</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Android app setup, offline cache, mobile push notifications, and Play Store purchase help.
                    </p>
                    <a
                        href="#ticket-form"
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors pt-1"
                    >
                        <span>Submit Mobile Ticket</span>
                        <span>&darr;</span>
                    </a>
                </div>

                <div className="card p-5 space-y-2.5 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors">
                    <span className="text-2xl">🧩</span>
                    <h3 className="font-bold text-sm text-white">Chrome Extension</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Toolbar appraiser, permissions transparency, activeTab behavior, and troubleshooting.
                    </p>
                    <Link
                        href="/extension/support"
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors pt-1"
                    >
                        <span>Extension Support Page</span>
                        <span>&rarr;</span>
                    </Link>
                </div>

                <div className="card p-5 space-y-2.5 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors">
                    <span className="text-2xl">📊</span>
                    <h3 className="font-bold text-sm text-white">Valuation Engine</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Deterministic 6-tier comps, wholesale floor logic, and domain appraisal inquiries.
                    </p>
                    <Link
                        href="/how-it-works"
                        className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-1"
                    >
                        <span>Appraisal Methodology</span>
                        <span>&rarr;</span>
                    </Link>
                </div>

                <div className="card p-5 space-y-2.5 border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors">
                    <span className="text-2xl">⚡</span>
                    <h3 className="font-bold text-sm text-white">Developer REST API</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        API keys, endpoint quotas, batch lookups, and programmatic portfolio integration.
                    </p>
                    <Link
                        href="/api-docs"
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors pt-1"
                    >
                        <span>REST API Docs v1</span>
                        <span>&rarr;</span>
                    </Link>
                </div>
            </div>

            {/* Support Ticket Submission */}
            <div id="ticket-form" className="space-y-4">
                <SupportForm defaultCategory="General Support Inquiry" />
            </div>

            {/* Comprehensive FAQs Section */}
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                        Quick answers regarding domain valuation calculations, platform support, and mobile apps.
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
                            Guaranteed Response SLA
                        </div>
                        <div className="text-emerald-400 font-bold text-sm">
                            &lt; 24 Business Hours
                        </div>
                        <div className="text-slate-500 text-[11px]">Direct engineering ticket replies</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                            Product Reviews &amp; Community
                        </div>
                        <a href="https://althunt.io/compare/domainvoodoo-vs-dynadot" target="_blank" rel="noopener noreferrer" className="text-brand-400 text-sm hover:underline block truncate">
                            AltHunt Community Reviews &rarr;
                        </a>
                        <div className="text-slate-500 text-[11px]">Community discussion &amp; ratings</div>
                    </div>
                </div>

                <div className="pt-2 flex justify-center">
                    <AltHuntBadge />
                </div>
            </div>
        </div>
    );
}
