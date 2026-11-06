'use client';

import { useState } from 'react';
import { formatUsd } from '@/lib/format';

interface Props {
    domain: string;
    defaultBinUsd: number;
    defaultLto24MonthlyUsd: number;
    defaultMinOfferUsd: number;
    domainRating: number;
    domainRatingLabel: string;
    structuralLabel: string;
    annualCacSavingsUsd: number;
}

export default function LanderInteractiveStudio({
    domain,
    defaultBinUsd,
    defaultLto24MonthlyUsd,
    defaultMinOfferUsd,
    domainRating,
    domainRatingLabel,
    structuralLabel,
    annualCacSavingsUsd,
}: Props) {
    const [binPrice, setBinPrice] = useState<number>(defaultBinUsd);
    const [ltoMonthly, setLtoMonthly] = useState<number>(defaultLto24MonthlyUsd);
    const [minOffer, setMinOffer] = useState<number>(defaultMinOfferUsd);
    const [sellerEmail, setSellerEmail] = useState<string>(`acquisitions@${domain}`);
    const [offerInput, setOfferInput] = useState<string>(String(defaultMinOfferUsd));
    const [offerSubmitted, setOfferSubmitted] = useState<boolean>(false);
    const [showOwnerBuilder, setShowOwnerBuilder] = useState<boolean>(false);
    const [copiedType, setCopiedType] = useState<'url' | 'html' | null>(null);

    const commissionSaved = Math.round(binPrice * 0.2); // 20% standard marketplace commission saved
    const escrowFeeEstimate = Math.round(binPrice * 0.018);
    const netSellerProceeds = binPrice - escrowFeeEstimate;

    const encodedDomain = encodeURIComponent(domain);
    const hostedLanderUrl = `https://prstuvw.xyz/lander/${encodedDomain}`;
    const reportUrl = `https://prstuvw.xyz/valuation/${encodedDomain}`;
    const badgeCardUrl = `https://prstuvw.xyz/api/badge/${encodedDomain}?style=card`;

    function generateStandaloneHtml(): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${domain} is Available for Acquisition | Verified Digital Asset</title>
  <meta name="description" content="Acquire ${domain} via direct Escrow.com transfer or 24-month Lease-to-Own. Verified CVM-4 Fair Market Appraisal by DomainVoodoo." />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #020617; color: #f8fafc; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.6; padding: 2rem 1rem; }
    .container { max-width: 880px; margin: 0 auto; }
    .pill { display: inline-block; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; padding: 0.35rem 0.9rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem; }
    h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.5rem; font-family: ui-monospace, monospace; }
    .sub { color: #94a3b8; font-size: 1.05rem; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 2rem; }
    .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.75rem; }
    .card-highlight { border-color: #3b82f6; background: linear-gradient(180deg, #0f172a 0%, #172554 100%); }
    .price { font-size: 2.25rem; font-weight: 900; color: #34d399; font-family: ui-monospace, monospace; margin: 0.5rem 0; }
    .btn { display: block; width: 100%; text-align: center; background: #2563eb; color: #fff; text-decoration: none; font-weight: 700; padding: 0.85rem 1.25rem; border-radius: 0.75rem; margin-top: 1rem; transition: opacity 0.2s; }
    .btn:hover { opacity: 0.92; }
    .btn-emerald { background: #059669; }
    .badge-wrap { text-align: center; margin: 2.5rem 0; padding: 1.5rem; background: #090d16; border: 1px solid #1e293b; border-radius: 1rem; }
    .footer { text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 2.5rem; border-top: 1px solid #1e293b; padding-top: 1.5rem; }
    .footer a { color: #38bdf8; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div style="text-align:center;">
      <span class="pill">Available for Immediate Acquisition</span>
      <h1>${domain}</h1>
      <p class="sub">${structuralLabel} • Domain Rating: ${domainRating.toFixed(1)}/10 (${domainRatingLabel})</p>
    </div>

    <div class="grid">
      <div class="card card-highlight">
        <div style="font-size:0.75rem;text-transform:uppercase;color:#93c5fd;font-weight:700;">Option 1 • Full Title Acquisition</div>
        <div class="price">$${binPrice.toLocaleString()}</div>
        <p style="font-size:0.85rem;color:#cbd5e1;">Instant ICANN ownership transfer protected by Escrow.com. 0% marketplace broker markup.</p>
        <a class="btn btn-emerald" href="https://www.escrow.com/domains" target="_blank" rel="noopener">Buy Now via Escrow.com →</a>
      </div>

      <div class="card">
        <div style="font-size:0.75rem;text-transform:uppercase;color:#a5b4fc;font-weight:700;">Option 2 • 24-Month Lease-to-Own</div>
        <div class="price" style="color:#60a5fa;">$${ltoMonthly.toLocaleString()}<span style="font-size:1rem;color:#94a3b8;">/mo</span></div>
        <p style="font-size:0.85rem;color:#cbd5e1;">Immediate DNS delegation upon first monthly installment. 100% OpEx deductible.</p>
        <a class="btn" href="mailto:${sellerEmail}?subject=Lease-to-Own%20Inquiry%20for%20${encodedDomain}&body=I%20would%20like%20to%20initiate%20the%2024-month%20Lease-to-Own%20plan%20for%20${encodedDomain}%20at%20$${ltoMonthly}/month.">Start Lease-to-Own →</a>
      </div>
    </div>

    <div class="badge-wrap">
      <p style="font-size:0.75rem;text-transform:uppercase;color:#94a3b8;margin-bottom:0.75rem;letter-spacing:0.05em;">Independent Algorithmic Valuation Audit</p>
      <a href="${reportUrl}" target="_blank" rel="noopener">
        <img src="${badgeCardUrl}" alt="${domain} Domain Valuation & Appraisal on DomainVoodoo" style="max-width:100%;height:auto;border-radius:0.75rem;" />
      </a>
      <p style="font-size:0.8rem;color:#94a3b8;margin-top:0.75rem;">
        View full comps, trademark clearance &amp; CAC audit at <a href="${reportUrl}" target="_blank" rel="noopener" style="color:#38bdf8;">DomainVoodoo (${domain} Report)</a>
      </p>
    </div>

    <div class="footer">
      Direct inquiries: <a href="mailto:${sellerEmail}">${sellerEmail}</a> (Minimum offer threshold: $${minOffer.toLocaleString()} USD)<br/>
      Verified Fair Market Appraisal powered by <a href="https://prstuvw.xyz" target="_blank" rel="noopener">DomainVoodoo Institutional Valuation Engine</a>
    </div>
  </div>
</body>
</html>`;
    }

    function handleDownloadHtml() {
        const html = generateStandaloneHtml();
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${domain}-for-sale-lander.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async function handleCopy(text: string, type: 'url' | 'html') {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedType(type);
            setTimeout(() => setCopiedType(null), 2500);
        } catch {
            // ignore clipboard fallback
        }
    }

    return (
        <div className="space-y-8">
            {/* Primary Buyer Acquisition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Buy It Now */}
                <div className="rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-950 p-6 flex flex-col justify-between space-y-5 shadow-xl">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Instant Title Transfer
                            </span>
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold">0% Broker Markup</span>
                        </div>
                        <h2 className="text-lg font-bold text-white pt-1">Buy It Now (Full Ownership)</h2>
                        <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                            {formatUsd(binPrice)}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Acquire 100% legal ICANN title to <strong>{domain}</strong> via Escrow.com institutional wire protection.
                        </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>Escrow Protection:</span>
                            <span className="text-slate-200">Escrow.com Verified</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>Est. Transfer Speed:</span>
                            <span className="text-emerald-300">24 – 48 Hours</span>
                        </div>
                        <a
                            href={`https://www.escrow.com/domains`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-4 transition-all shadow-lg shadow-emerald-600/20"
                        >
                            <span>🔒 Acquire via Escrow.com</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                {/* Card 2: 24-Month Lease-to-Own */}
                <div className="rounded-2xl border border-brand-500/40 bg-gradient-to-b from-indigo-950/30 via-slate-900 to-slate-950 p-6 flex flex-col justify-between space-y-5 shadow-xl">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/40">
                                Founder Financing
                            </span>
                            <span className="text-[11px] font-mono text-brand-300">24 Months</span>
                        </div>
                        <h2 className="text-lg font-bold text-white pt-1">Lease-to-Own Plan</h2>
                        <div className="text-3xl sm:text-4xl font-black font-mono text-brand-300">
                            {formatUsd(ltoMonthly)}
                            <span className="text-sm font-normal text-slate-400"> / mo</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Deploy live DNS &amp; email on <strong>{domain}</strong> within 2 hours of first payment. Cancel anytime with zero debt liability.
                        </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>DNS Delegation:</span>
                            <span className="text-brand-300">Immediate (Day 1)</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>Tax Classification:</span>
                            <span className="text-slate-200">100% OpEx Deductible</span>
                        </div>
                        <a
                            href={`mailto:${sellerEmail}?subject=${encodeURIComponent(`24-Month Lease-to-Own Inquiry: ${domain}`)}&body=${encodeURIComponent(`Hello,\n\nI would like to initiate the 24-month Lease-to-Own agreement for ${domain} at $${ltoMonthly.toLocaleString()}/month via Escrow.com.\n\nPlease send the escrow holding link.`)}`}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm py-3 px-4 transition-all shadow-lg shadow-brand-600/20"
                        >
                            <span>⚡ Start Monthly Lease</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                {/* Card 3: Make a Binding Counter-Offer */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-5 shadow-xl">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                                Direct Deal Desk
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">Min: {formatUsd(minOffer)}</span>
                        </div>
                        <h2 className="text-lg font-bold text-white pt-1">Submit Counter-Offer</h2>
                        <div className="pt-1">
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                Your Offer Amount (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-sm font-mono text-slate-400">$</span>
                                <input
                                    type="number"
                                    value={offerInput}
                                    onChange={(e) => {
                                        setOfferInput(e.target.value);
                                        setOfferSubmitted(false);
                                    }}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-7 pr-3 py-2 text-base font-mono font-bold text-white focus:border-brand-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Offers above the wholesale liquidation floor ({formatUsd(minOffer)}) receive a direct response within 24 business hours.
                        </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                        {offerSubmitted ? (
                            <div className="rounded-xl bg-emerald-950/60 border border-emerald-700/60 p-3 text-center text-xs text-emerald-300 font-mono">
                                ✓ Opening email client with structured Escrow offer...
                            </div>
                        ) : null}
                        <a
                            href={`mailto:${sellerEmail}?subject=${encodeURIComponent(`Acquisition Offer for ${domain}: $${Number(offerInput || 0).toLocaleString()} USD`)}&body=${encodeURIComponent(`Hello,\n\nI am submitting a formal cash offer of $${Number(offerInput || 0).toLocaleString()} USD for the domain name ${domain}, subject to transaction closing via Escrow.com.\n\nReference Valuation: ${reportUrl}`)}`}
                            onClick={() => setOfferSubmitted(true)}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 hover:border-slate-500 text-white font-bold text-xs sm:text-sm py-3 px-4 transition-all"
                        >
                            <span>📨 Send Offer to Owner</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Domain Owner Customization & Free Export Studio */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                            <span>🛠️</span>
                            <span>Own {domain}? Save {formatUsd(commissionSaved)} in Broker Commissions</span>
                        </div>
                        <h3 className="text-xl font-black text-white">
                            Free Zero-Commission For-Sale Lander Studio
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                            Afternic and Sedo charge 15% to 25% commission ({formatUsd(commissionSaved)} on this domain). Customize your prices below and either forward your domain to this URL or download the standalone <code className="text-amber-300 font-mono">index.html</code> lander for free.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowOwnerBuilder((v) => !v)}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-extrabold text-xs shrink-0 transition-all shadow-lg shadow-amber-500/20"
                    >
                        {showOwnerBuilder ? 'Hide Customizer ▲' : 'Customize & Export Lander ▼'}
                    </button>
                </div>

                {showOwnerBuilder && (
                    <div className="pt-4 border-t border-amber-500/20 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                    Buy-It-Now Price (USD)
                                </label>
                                <input
                                    type="number"
                                    value={binPrice}
                                    onChange={(e) => setBinPrice(Math.max(50, Number(e.target.value) || 0))}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-mono font-bold text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                    24m Lease-to-Own (/mo)
                                </label>
                                <input
                                    type="number"
                                    value={ltoMonthly}
                                    onChange={(e) => setLtoMonthly(Math.max(10, Number(e.target.value) || 0))}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-mono font-bold text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                    Minimum Offer Floor (USD)
                                </label>
                                <input
                                    type="number"
                                    value={minOffer}
                                    onChange={(e) => setMinOffer(Math.max(10, Number(e.target.value) || 0))}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-mono font-bold text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                    Seller Inquiry Email
                                </label>
                                <input
                                    type="email"
                                    value={sellerEmail}
                                    onChange={(e) => setSellerEmail(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-mono text-white"
                                />
                            </div>
                        </div>

                        {/* Net Proceeds Comparison Bar */}
                        <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-[11px] font-mono text-slate-400">Afternic / Sedo 20% Commission</div>
                                <div className="text-base font-mono font-bold text-rose-400">
                                    -{formatUsd(commissionSaved)} Fee
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] font-mono text-slate-400">DomainVoodoo Lander Fee</div>
                                <div className="text-base font-mono font-bold text-emerald-400">
                                    $0 (100% Free)
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] font-mono text-slate-400">Your Estimated Net Payout</div>
                                <div className="text-base font-mono font-black text-white">
                                    {formatUsd(netSellerProceeds)} (After ~1.8% Escrow)
                                </div>
                            </div>
                        </div>

                        {/* Export Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={handleDownloadHtml}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs transition-all shadow-md"
                            >
                                <span>⬇️ Download Standalone index.html Lander</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleCopy(generateStandaloneHtml(), 'html')}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 hover:border-brand-500 text-slate-200 font-mono text-xs transition-all"
                            >
                                <span>{copiedType === 'html' ? '✓ Copied HTML Code!' : '📋 Copy Raw HTML Code'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleCopy(hostedLanderUrl, 'url')}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 hover:border-brand-500 text-slate-200 font-mono text-xs transition-all"
                            >
                                <span>{copiedType === 'url' ? '✓ Copied Forwarding URL!' : '🔗 Copy DNS Forwarding URL'}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
