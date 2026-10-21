'use client';

import AltHuntBadge from '@/components/AltHuntBadge';

export default function CompetitorComparisonTable() {
    const comparisonRows = [
        {
            feature: 'Automated Valuation Mechanism',
            voodoo: 'Quad-Model Consensus (CVM-4: Scarcity, Comps, CPC & Defensive)',
            voodooHighlight: true,
            govalue: 'Single Black-Box ML Model',
            estibot: 'Rigid Keyword Formula',
            namebio: 'None (Searchable Raw Database)',
        },
        {
            feature: 'Multi-Channel Pricing Matrix',
            voodoo: '4 Realities: Liquidation Floor, Wholesale, End-User BIN, & Lease-to-Own',
            voodooHighlight: true,
            govalue: 'Single Arbitrary Number',
            estibot: 'Single Arbitrary Number',
            namebio: 'Historical Sales Only',
        },
        {
            feature: 'Search Volume & CPC Arbitrage',
            voodoo: '✓ Unlimited Free (Exact Volume, CPC, & Capitalized Equity)',
            voodooHighlight: true,
            govalue: '✗ Not Available',
            estibot: '⚠ Paid Subscription Required ($29–$99/mo)',
            namebio: '✗ Not Available',
        },
        {
            feature: 'B2B Outbound Lead Prospector',
            voodoo: '✓ Built-in Target Archetypes, LinkedIn/Crunchbase Links, & Pitch Scripts',
            voodooHighlight: true,
            govalue: '✗ None',
            estibot: '⚠ Locked behind $99/mo Plan',
            namebio: '✗ None',
        },
        {
            feature: 'Visual Brand Mockup Studio',
            voodoo: '✓ Interactive SaaS App, Matte Business Card, iOS App & Billboard Mockups',
            voodooHighlight: true,
            govalue: '✗ None',
            estibot: '✗ None',
            namebio: '✗ None',
        },
        {
            feature: 'Technical WHOIS & Threat Radar',
            voodoo: '✓ Real-Time RDAP, Age Vintage, DNS Anycast, & 68-Engine Blacklist Check',
            voodooHighlight: true,
            govalue: '✗ None',
            estibot: '⚠ Basic Registrar Info Only',
            namebio: '✗ None',
        },
        {
            feature: 'Official Appraisal Certificate',
            voodoo: '✓ 1-Click Printable / PDF Institutional Certificate',
            voodooHighlight: true,
            govalue: '⚠ Basic Link Only',
            estibot: '⚠ Paywalled',
            namebio: '✗ None',
        },
        {
            feature: 'Pricing & Account Freedom',
            voodoo: '100% Free & Unlimited (Zero Paywalls)',
            voodooHighlight: true,
            govalue: 'Free with GoDaddy Account Caps',
            estibot: '$29 to $99 / Month Subscription',
            namebio: '$14 to $99 / Month for Full Archives',
        },
    ];

    return (
        <section className="card p-6 sm:p-10 bg-slate-900/80 border border-brand-500/30 space-y-6 relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-brand-950 text-brand-300 border border-brand-800">
                        Competitive Intelligence
                    </span>
                    <AltHuntBadge />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    How Domain<span className="text-brand-400">Voodoo</span> Outperforms Every Rival
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Compare DomainVoodoo side-by-side against GoDaddy GoValue, EstiBot, and NameBio.
                </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl">
                <table className="w-full text-left font-mono text-xs">
                    <thead>
                        <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900/80">
                            <th className="py-4 px-4 sm:px-5">Feature &amp; Capability</th>
                            <th className="py-4 px-4 sm:px-5 text-brand-300 bg-brand-950/40 border-x border-brand-900/40 font-bold">
                                DomainVoodoo
                            </th>
                            <th className="py-4 px-4 sm:px-5">GoDaddy GoValue</th>
                            <th className="py-4 px-4 sm:px-5">EstiBot</th>
                            <th className="py-4 px-4 sm:px-5">NameBio</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                        {comparisonRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                                <td className="py-3.5 px-4 sm:px-5 font-bold text-white whitespace-nowrap">
                                    {row.feature}
                                </td>
                                <td className="py-3.5 px-4 sm:px-5 text-emerald-300 font-bold bg-brand-950/20 border-x border-brand-900/30">
                                    {row.voodoo}
                                </td>
                                <td className="py-3.5 px-4 sm:px-5 text-slate-400">
                                    {row.govalue}
                                </td>
                                <td className="py-3.5 px-4 sm:px-5 text-slate-400">
                                    {row.estibot}
                                </td>
                                <td className="py-3.5 px-4 sm:px-5 text-slate-400">
                                    {row.namebio}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓ Institutional Accuracy</span>
                    <span>•</span>
                    <span>14.8M+ Indexed Comps</span>
                    <span>•</span>
                    <span>Real-Time RDAP &amp; UDRP Screening</span>
                </div>
                <div className="text-slate-500 text-[11px]">
                    Continuous Algorithmic Calibration • Version 3.2
                </div>
            </div>
        </section>
    );
}
