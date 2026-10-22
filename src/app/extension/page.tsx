import type { Metadata } from 'next';
import Link from 'next/link';
import AltHuntBadge from '@/components/AltHuntBadge';

export const metadata: Metadata = {
    title: 'DomainVoodoo for Chrome & Edge — Instant 1-Click Browser Appraisal Extension',
    description:
        'Evaluate domains on GoDaddy Auctions, Namecheap, Sedo, Dan, or any website with a single click. Download the official DomainVoodoo Chrome extension package.',
    keywords: [
        'domain valuation chrome extension',
        'domain appraisal browser extension',
        'godaddy auctions valuation extension',
        'namecheap domain worth extension',
        'domainvoodoo extension download',
    ],
    openGraph: {
        title: 'DomainVoodoo Browser Extension for Chrome & Edge',
        description: 'Instant 1-click domain valuation, multi-channel pricing, and UDRP risk radar in your browser toolbar.',
        type: 'website',
        url: 'https://prstuvw.xyz/extension',
    },
};

export default function ExtensionPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-10">
            {/* Header Hero */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide bg-brand-950/80 text-brand-300 border border-brand-800/80">
                    <span>⚡</span>
                    <span>Official Chromium Extension Package</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Domain<span className="text-brand-400">Voodoo</span> for Chrome &amp; Edge
                </h1>

                <p className="mt-2 text-slate-400 max-w-xl mx-auto text-base">
                    Evaluate domain names on GoDaddy Auctions, Namecheap, Sedo, Dan, or any active tab with a single click.
                </p>

                {/* Primary Download CTAs */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href="/domainvoodoo-extension.zip"
                        download="domainvoodoo-chrome-extension.zip"
                        className="btn-primary !py-3 !px-6 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl shadow-brand-500/20"
                    >
                        <span>📦</span>
                        <span>Download Extension ZIP (.zip)</span>
                        <span className="text-[10px] opacity-80 font-mono">(48 KB)</span>
                    </a>

                    <Link href="/" className="btn-secondary !py-3 !px-5 text-xs font-semibold">
                        Try Web Valuator →
                    </Link>

                    <Link href="/extension/support" className="btn-secondary !py-3 !px-5 text-xs font-semibold text-brand-300 border-brand-500/40 hover:border-brand-400">
                        🛠️ Extension Support &amp; FAQ →
                    </Link>

                    <AltHuntBadge />
                </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-3">
                <div className="card p-6 text-center space-y-2">
                    <span className="text-3xl">⚡</span>
                    <h3 className="font-bold text-base text-white">Instant Tab Detection</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Opening the extension automatically detects the domain of the active tab you are viewing and appraises it in under 200ms.
                    </p>
                </div>

                <div className="card p-6 text-center space-y-2">
                    <span className="text-3xl">📊</span>
                    <h3 className="font-bold text-base text-white">Multi-Channel Matrix</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Inspect fair market value, wholesale floor, charm Buy-It-Now, and 24-month lease-to-own financing in one compact popup.
                    </p>
                </div>

                <div className="card p-6 text-center space-y-2">
                    <span className="text-3xl">⚖️</span>
                    <h3 className="font-bold text-base text-white">UDRP Legal Radar</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Flags potential trademark collisions, famous brand infringements, and typosquatting directly in your toolbar before you bid.
                    </p>
                </div>
            </div>

            {/* Two Installation Pathways */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Method 1: Upload to Chrome Web Store Developer Console */}
                <div className="card p-6 space-y-4 border-brand-500/30 bg-slate-900/60">
                    <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-brand-950 text-brand-300 border border-brand-800">
                            Path 1: Chrome Web Store
                        </span>
                        <span className="text-xs font-mono text-emerald-400">Official Store Upload</span>
                    </div>

                    <h2 className="text-lg font-bold text-white">
                        Upload to Chrome Web Store Developer Console
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed">
                        If you are uploading to publish on the Chrome Web Store:
                    </p>

                    <ol className="space-y-3 text-xs text-slate-300 list-decimal pl-4 leading-relaxed font-sans">
                        <li>
                            Download the package: <strong className="text-white">domainvoodoo-chrome-extension.zip</strong> above.
                        </li>
                        <li>
                            Go to the <a href="https://chrome.google.com/webstore/devconsole" target="_blank" rel="noopener noreferrer" className="text-brand-400 underline">Chrome Web Store Developer Dashboard ↗</a>.
                        </li>
                        <li>
                            Click the <strong>&ldquo;New item&rdquo;</strong> button in the top right.
                        </li>
                        <li>
                            Drag and drop <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">domainvoodoo-chrome-extension.zip</code> directly into the upload modal.
                        </li>
                        <li>
                            Review permissions (<code className="font-mono text-slate-400">activeTab</code> only) and submit for publication!
                        </li>
                    </ol>
                </div>

                {/* Method 2: Load Unpacked in Developer Mode */}
                <div className="card p-6 space-y-4 border-slate-800 bg-slate-900/60">
                    <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300">
                            Path 2: Developer Mode
                        </span>
                        <span className="text-xs font-mono text-purple-400">Instant Local Install</span>
                    </div>

                    <h2 className="text-lg font-bold text-white">
                        Install Locally in Chrome, Edge, or Brave
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed">
                        To test or use the extension immediately in your browser:
                    </p>

                    <ol className="space-y-3 text-xs text-slate-300 list-decimal pl-4 leading-relaxed font-sans">
                        <li>
                            Unzip <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">domainvoodoo-chrome-extension.zip</code> to a folder on your computer.
                        </li>
                        <li>
                            In Chrome, navigate to <code className="bg-slate-950 px-1.5 py-0.5 rounded text-brand-400 font-mono">chrome://extensions</code>.
                        </li>
                        <li>
                            Toggle on <strong>Developer mode</strong> in the top-right corner.
                        </li>
                        <li>
                            Click <strong>&ldquo;Load unpacked&rdquo;</strong> in the top-left toolbar and select the unzipped folder.
                        </li>
                        <li>
                            Pin the <strong>DomainVoodoo (DV)</strong> icon to your browser bar!
                        </li>
                    </ol>
                </div>
            </div>

            {/* Technical Package Manifest Specs */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 space-y-3 font-mono text-xs text-slate-400">
                <div className="text-white font-bold uppercase tracking-wider text-xs">
                    Extension Package Contents (Manifest V3)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">manifest.json (v3)</div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">popup.html &amp; popup.js</div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">popup.css (Dark Mode)</div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">icons/ (16, 32, 48, 128px)</div>
                </div>
            </div>

            {/* Official Support & Help Callout */}
            <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-brand-500/20 bg-slate-900/60">
                <div className="space-y-1 text-center sm:text-left">
                    <h3 className="font-bold text-white text-base">Need Help or Found a Bug?</h3>
                    <p className="text-xs text-slate-400">
                        Visit our official Chrome Web Store Support Portal for detailed FAQs, permissions documentation, and direct developer contact.
                    </p>
                </div>
                <Link
                    href="/extension/support"
                    className="btn-primary whitespace-nowrap !py-2.5 !px-5 text-xs font-bold"
                >
                    Visit Support Center →
                </Link>
            </div>
        </div>
    );
}
