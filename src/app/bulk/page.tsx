'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatUsd, formatUsdExact } from '@/lib/format';

interface BulkResultItem {
    domain: string;
    tld: string;
    midUsd: number;
    lowUsd: number;
    highUsd: number;
    confidence: string;
    confidenceScore: number;
    linguisticScore: number;
    liquidityRating: string;
    liquidationFloor: number;
    recommendedBinPrice: number;
    leaseMonthly24: number;
    trademarkRisk: string;
    udrpRating: string;
    collisionDensityScore: number;
    annualRenewalUsd: number;
    holdAction: 'CORE HOLD' | 'LIQUIDATE / LTO' | 'DROP CANDIDATE';
    holdReason: string;
}

interface BulkRow {
    domain: string;
    result?: BulkResultItem;
    error?: string;
}

const RISK_BADGE: Record<string, string> = {
    severe: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    elevated: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    low: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    unknown: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

const LIQUIDITY_BADGE: Record<string, string> = {
    'Ultra-Liquid': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    'High Liquidity': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    'Moderate Liquidity': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    'Niche / Illiquid': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

const HOLD_ACTION_BADGE: Record<BulkResultItem['holdAction'], string> = {
    'CORE HOLD': 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40',
    'LIQUIDATE / LTO': 'bg-amber-950/80 text-amber-300 border border-amber-500/40',
    'DROP CANDIDATE': 'bg-rose-950/80 text-rose-300 border border-rose-500/40',
};

const SAMPLE_PORTFOLIOS = [
    {
        label: 'AI & Tech Venture Mix',
        domains: ['cloudscale.ai', 'harvest.ai', 'smartpay.com', 'voodoo.io', 'prompt.com', 'myfastbot123.xyz'],
    },
    {
        label: 'Blue-Chip & Short Club',
        domains: ['voice.com', 'ai.com', 'cobalt.com', 'feast.com', 'sky.com', '20.com'],
    },
];

function estimateAnnualRenewalUsd(tld: string): number {
    const clean = tld.toLowerCase().replace(/^\./, '');
    if (clean === 'com') return 12;
    if (clean === 'ai') return 75; // $150 per 2-year mandatory cycle
    if (clean === 'io') return 45;
    if (clean === 'co') return 28;
    if (clean === 'dev' || clean === 'app') return 16;
    if (clean === 'xyz' || clean === 'net' || clean === 'org') return 13;
    return 22;
}

function classifyHoldAction(params: {
    midUsd: number;
    liquidationFloor: number;
    liquidityRating: string;
    trademarkRisk: string;
    annualRenewalUsd: number;
}): { holdAction: BulkResultItem['holdAction']; holdReason: string } {
    const { midUsd, liquidationFloor, liquidityRating, trademarkRisk, annualRenewalUsd } = params;
    if (trademarkRisk === 'severe') {
        return {
            holdAction: 'DROP CANDIDATE',
            holdReason: 'Severe UDRP trademark conflict neutralizes end-user resale value',
        };
    }
    const threeYearCarry = annualRenewalUsd * 3;
    if (liquidityRating === 'Ultra-Liquid' || liquidityRating === 'High Liquidity' || midUsd >= 2500) {
        return {
            holdAction: 'CORE HOLD',
            holdReason: 'High equity-to-carrying-cost ratio; list with 24m Lease-to-Own',
        };
    }
    if (liquidationFloor >= threeYearCarry * 1.5 && midUsd >= 400) {
        return {
            holdAction: 'LIQUIDATE / LTO',
            holdReason: 'Positive expected value; price aggressively at BIN or wholesale',
        };
    }
    return {
        holdAction: 'DROP CANDIDATE',
        holdReason: `3-yr renewal drag ($${threeYearCarry}) erodes low wholesale liquidity floor`,
    };
}

export default function BulkPage() {
    const [text, setText] = useState('');
    const [rows, setRows] = useState<BulkRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);

    async function handleSubmit(overrideList?: string[]) {
        const domains = (overrideList ?? text.split(/[\n,]/))
            .map((d) => d.trim())
            .filter(Boolean);
        if (domains.length === 0) return;

        if (overrideList) {
            setText(overrideList.join('\n'));
        }

        setLoading(true);
        setNotice(null);
        try {
            const res = await fetch('/api/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domains }),
            });
            const data = await res.json();
            if (!res.ok) {
                setNotice(data.error);
                setRows([]);
                return;
            }
            if (data.truncated) {
                setNotice(`Only the first ${data.maxBatch} domains were evaluated. Sign up for higher limits.`);
            }
            setRows(
                data.results.map((r: any) => {
                    if (!r.result) {
                        return { domain: r.domain, error: r.error };
                    }
                    const tld = r.result.tld || 'com';
                    const midUsd = r.result.midUsd;
                    const liquidationFloor = r.result.channelPricing?.liquidationFloor ?? Math.round(midUsd * 0.25);
                    const liquidityRating = r.result.liquidity?.rating ?? 'Moderate Liquidity';
                    const trademarkRisk = r.result.trademark?.riskLevel ?? 'low';
                    const annualRenewalUsd = estimateAnnualRenewalUsd(tld);
                    const { holdAction, holdReason } = classifyHoldAction({
                        midUsd,
                        liquidationFloor,
                        liquidityRating,
                        trademarkRisk,
                        annualRenewalUsd,
                    });

                    return {
                        domain: r.domain,
                        result: {
                            domain: r.result.domain,
                            tld,
                            midUsd,
                            lowUsd: r.result.lowUsd,
                            highUsd: r.result.highUsd,
                            confidence: r.result.confidence,
                            confidenceScore: r.result.confidenceScore ?? 75,
                            linguisticScore: r.result.linguisticScore,
                            liquidityRating,
                            liquidationFloor,
                            recommendedBinPrice: r.result.channelPricing?.recommendedBinPrice ?? midUsd,
                            leaseMonthly24: r.result.channelPricing?.leaseToOwn?.months24?.monthlyUsd ?? Math.round((midUsd * 1.15) / 24),
                            trademarkRisk,
                            udrpRating: r.result.trademark?.udrpRating ?? 'Minimal Risk',
                            collisionDensityScore: r.result.alternativeTlds?.collisionDensityScore ?? 50,
                            annualRenewalUsd,
                            holdAction,
                            holdReason,
                        },
                    };
                }),
            );
        } finally {
            setLoading(false);
        }
    }

    const validResults = rows.map((r) => r.result).filter(Boolean) as BulkResultItem[];
    const totalMid = validResults.reduce((sum, r) => sum + r.midUsd, 0);
    const totalLiquidation = validResults.reduce((sum, r) => sum + r.liquidationFloor, 0);
    const totalBin = validResults.reduce((sum, r) => sum + r.recommendedBinPrice, 0);
    const totalMonthlyLease = validResults.reduce((sum, r) => sum + r.leaseMonthly24, 0);
    const totalAnnualRenewal = validResults.reduce((sum, r) => sum + r.annualRenewalUsd, 0);

    const coreHoldCount = validResults.filter((r) => r.holdAction === 'CORE HOLD').length;
    const dropCandidateDomains = validResults.filter((r) => r.holdAction === 'DROP CANDIDATE');
    const annualSavingsIfDropped = dropCandidateDomains.reduce((sum, r) => sum + r.annualRenewalUsd, 0);

    const avgLinguisticScore = validResults.length > 0
        ? Math.round(validResults.reduce((sum, r) => sum + r.linguisticScore, 0) / validResults.length)
        : 0;

    const cleanTrademarkCount = validResults.filter((r) => r.trademarkRisk === 'low' || r.trademarkRisk === 'unknown').length;

    function handleExportCsv() {
        if (validResults.length === 0) return;
        const headers = [
            'Domain',
            'TLD',
            'Hold vs Drop Audit',
            'Mid FMV USD',
            'Liquidation Floor USD',
            'Recommended BIN USD',
            '24mo Lease Monthly USD',
            'Est Annual Renewal USD',
            'Linguistic Score',
            'Liquidity Rating',
            'Trademark Risk',
            'Audit Rationale',
        ];

        const csvRows = validResults.map((r) => [
            `"${r.domain}"`,
            `"${r.tld}"`,
            `"${r.holdAction}"`,
            r.midUsd,
            r.liquidationFloor,
            r.recommendedBinPrice,
            r.leaseMonthly24,
            r.annualRenewalUsd,
            r.linguisticScore,
            `"${r.liquidityRating}"`,
            `"${r.trademarkRisk}"`,
            `"${r.holdReason}"`,
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...csvRows.map((e) => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `domainvoodoo-portfolio-audit-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function handleExportAsc350Html() {
        if (validResults.length === 0) return;
        const dateStr = new Date().toISOString().split('T')[0];
        const rowsHtml = validResults
            .map(
                (r) => `
        <tr>
          <td><a href="https://prstuvw.xyz/valuation/${encodeURIComponent(r.domain)}" target="_blank" rel="noopener"><strong>${r.domain}</strong></a></td>
          <td>$${r.midUsd.toLocaleString()}</td>
          <td>$${r.liquidationFloor.toLocaleString()}</td>
          <td>$${r.annualRenewalUsd}/yr</td>
          <td>${r.liquidityRating}</td>
          <td><strong>${r.holdAction}</strong></td>
        </tr>`
            )
            .join('');

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>ASC 350 / IFRS 3 Digital Asset Portfolio Schedule (${dateStr})</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; max-width: 960px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    h1 { font-size: 1.75rem; margin-bottom: 0.25rem; }
    .meta { color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .box { border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 1rem; background: #f8fafc; }
    .box-label { font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700; }
    .box-val { font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-top: 0.25rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    th, td { border-bottom: 1px solid #e2e8f0; padding: 0.75rem 0.5rem; text-align: left; }
    th { background: #f1f5f9; font-size: 0.75rem; text-transform: uppercase; color: #475569; }
    .footer { margin-top: 2.5rem; font-size: 0.8rem; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 1rem; }
  </style>
</head>
<body>
  <h1>Intangible Digital Asset Portfolio Valuation Schedule (ASC 350 / IFRS 3)</h1>
  <div class="meta">Generated on ${dateStr} by <a href="https://prstuvw.xyz" target="_blank" rel="noopener">DomainVoodoo Consensus Valuation Matrix (CVM-4)</a> • ${validResults.length} Evaluated Assets</div>
  <div class="summary">
    <div class="box"><div class="box-label">Total Fair Market Value</div><div class="box-val">$${totalMid.toLocaleString()}</div></div>
    <div class="box"><div class="box-label">90-Day Liquidation Floor</div><div class="box-val">$${totalLiquidation.toLocaleString()}</div></div>
    <div class="box"><div class="box-label">Annual Renewal Carry</div><div class="box-val">$${totalAnnualRenewal.toLocaleString()}/yr</div></div>
    <div class="box"><div class="box-label">Core Hold Assets</div><div class="box-val">${coreHoldCount} / ${validResults.length}</div></div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Domain Asset</th>
        <th>Fair Market Value (FMV)</th>
        <th>90-Day Wholesale Floor</th>
        <th>Est. Renewal</th>
        <th>Liquidity Tier</th>
        <th>Audit Recommendation</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <div class="footer">
    Methodology Reference: <a href="https://prstuvw.xyz/aeo" target="_blank" rel="noopener">DomainVoodoo Quantitative Research Desk (CVM-4 Standard)</a>. Individual appraisal certificates accessible at https://prstuvw.xyz/valuation/[domain].
  </div>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `asc350-portfolio-valuation-${dateStr}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center space-y-3">
                <span className="text-xs bg-brand-950 text-brand-300 border border-brand-800 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
                    Institutional Portfolio &amp; Renewal Auditor
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    Bulk Portfolio Valuation &amp; Keep-vs-Drop Audit
                </h1>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                    Appraise up to 200 domains simultaneously. Calculates Total Fair Market Value, 90-day cash liquidation collateral floors, annual renewal carrying drag, and ASC 350 balance-sheet schedules.
                </p>
            </div>

            {/* Preset Samples */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">1-Click Demo Portfolios:</span>
                {SAMPLE_PORTFOLIOS.map((s) => (
                    <button
                        key={s.label}
                        type="button"
                        onClick={() => handleSubmit(s.domains)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-500/50 font-mono text-xs transition-all"
                    >
                        ⚡ {s.label}
                    </button>
                ))}
            </div>

            <div className="card space-y-4 p-6">
                <textarea
                    className="input h-36 font-mono text-sm leading-relaxed"
                    placeholder={'cloudscale.ai\nsmartpay.com\nprompt.com\nvoodoo.io'}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs text-slate-400">
                        Paste up to 200 domains (one per line or comma-separated). Includes automated Keep-vs-Drop renewal drag scoring.
                    </p>
                    <button
                        type="button"
                        className="btn-primary !px-5 !py-2.5 text-sm font-bold"
                        onClick={() => handleSubmit()}
                        disabled={loading}
                    >
                        {loading ? 'Auditing Portfolio…' : 'Run Portfolio & Renewal Audit →'}
                    </button>
                </div>
                {notice && <p className="text-xs text-amber-400 bg-amber-950/40 p-2.5 rounded border border-amber-800">{notice}</p>}
            </div>

            {validResults.length > 0 && (
                <div className="space-y-6">
                    {/* Executive Portfolio Dashboard */}
                    <div className="card p-6 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    Consolidated Portfolio Audit ({validResults.length} Assets)
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Multi-channel valuation, wholesale LTV collateral floor, and annual renewal carrying cost analysis.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleExportAsc350Html}
                                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-md"
                                >
                                    📄 Export ASC 350 Balance Sheet (HTML)
                                </button>
                                <button
                                    type="button"
                                    onClick={handleExportCsv}
                                    className="btn-secondary !py-2 !px-3.5 text-xs font-mono font-semibold"
                                >
                                    📥 Export CSV
                                </button>
                            </div>
                        </div>

                        {/* 4 Main Value Channels */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Total Fair Market Value</span>
                                <p className="text-2xl font-black font-mono text-emerald-400 mt-1">{formatUsd(totalMid)}</p>
                                <span className="text-[11px] text-slate-400 block mt-1">End-user retail FMV</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">90-Day Liquidation Floor</span>
                                <p className="text-2xl font-bold font-mono text-white mt-1">{formatUsd(totalLiquidation)}</p>
                                <span className="text-[11px] text-slate-400 block mt-1">Immediate wholesale cash exit</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Annual Renewal Carry</span>
                                <p className="text-2xl font-bold font-mono text-amber-300 mt-1">{formatUsdExact(totalAnnualRenewal)}/yr</p>
                                <span className="text-[11px] text-slate-400 block mt-1">
                                    {dropCandidateDomains.length > 0
                                        ? `Save $${annualSavingsIfDropped}/yr by dropping ${dropCandidateDomains.length}`
                                        : 'Optimal carrying efficiency'}
                                </span>
                            </div>

                            <div className="p-4 rounded-xl bg-brand-950/30 border border-brand-800/60">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-300 block">Financed LTO Cash Flow</span>
                                <p className="text-2xl font-black font-mono text-brand-300 mt-1">{formatUsdExact(totalMonthlyLease)}/mo</p>
                                <span className="text-[11px] text-slate-400 block mt-1">24-month LTO portfolio yield</span>
                            </div>
                        </div>

                        {/* Keep vs Drop Summary Strip */}
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                            <div className="rounded-lg bg-emerald-950/30 border border-emerald-800/50 p-3 text-emerald-300">
                                🟢 Core Hold: <strong>{coreHoldCount} domains</strong>
                            </div>
                            <div className="rounded-lg bg-amber-950/30 border border-amber-800/50 p-3 text-amber-300">
                                🟡 Liquidate / LTO: <strong>{validResults.filter((r) => r.holdAction === 'LIQUIDATE / LTO').length} domains</strong>
                            </div>
                            <div className="rounded-lg bg-rose-950/30 border border-rose-800/50 p-3 text-rose-300">
                                🔴 Drop Candidates: <strong>{dropCandidateDomains.length} domains</strong>
                            </div>
                            <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 text-slate-300">
                                🛡️ Clean UDRP: <strong>{cleanTrademarkCount} / {validResults.length}</strong> ({avgLinguisticScore}/100 Ling)
                            </div>
                        </div>
                    </div>

                    {/* Detailed Portfolio Table */}
                    <div className="card p-6 overflow-hidden">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-bold text-base text-white">Itemized Keep-vs-Drop Ledger</h3>
                            <span className="text-xs font-mono text-slate-400">{validResults.length} evaluated assets</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead className="text-slate-400 border-b border-slate-800 text-xs font-mono uppercase tracking-wider">
                                    <tr>
                                        <th className="pb-3 pr-4">Domain</th>
                                        <th className="pb-3 pr-4">Audit Verdict</th>
                                        <th className="pb-3 pr-4">Fair Market Value</th>
                                        <th className="pb-3 pr-4">Wholesale Floor</th>
                                        <th className="pb-3 pr-4">Renewal / Yr</th>
                                        <th className="pb-3 pr-4">Liquidity</th>
                                        <th className="pb-3 pr-4">UDRP</th>
                                        <th className="pb-3 text-right">Tools</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/70">
                                    {rows.map((r) => (
                                        <tr key={r.domain} className="hover:bg-slate-900/40 transition-colors">
                                            <td className="py-3.5 pr-4 font-mono font-bold text-white">
                                                <Link href={`/valuation/${encodeURIComponent(r.domain)}`} className="hover:text-brand-300 hover:underline">
                                                    {r.domain}
                                                </Link>
                                            </td>
                                            {r.result ? (
                                                <>
                                                    <td className="py-3.5 pr-4">
                                                        <span
                                                            title={r.result.holdReason}
                                                            className={`inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${HOLD_ACTION_BADGE[r.result.holdAction]}`}
                                                        >
                                                            {r.result.holdAction}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 pr-4 font-mono font-bold text-emerald-400">{formatUsd(r.result.midUsd)}</td>
                                                    <td className="py-3.5 pr-4 font-mono text-slate-300">{formatUsd(r.result.liquidationFloor)}</td>
                                                    <td className="py-3.5 pr-4 font-mono text-slate-400">${r.result.annualRenewalUsd}/yr</td>
                                                    <td className="py-3.5 pr-4">
                                                        <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${LIQUIDITY_BADGE[r.result.liquidityRating] || 'bg-slate-800 text-slate-300'}`}>
                                                            {r.result.liquidityRating}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 pr-4">
                                                        <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${RISK_BADGE[r.result.trademarkRisk] || 'bg-slate-800 text-slate-300'}`}>
                                                            {r.result.udrpRating}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 text-right whitespace-nowrap space-x-2 font-mono text-xs">
                                                        <Link
                                                            href={`/valuation/${encodeURIComponent(r.domain)}`}
                                                            className="text-brand-400 hover:underline font-semibold"
                                                        >
                                                            Report
                                                        </Link>
                                                        <span className="text-slate-700">|</span>
                                                        <Link
                                                            href={`/lander/${encodeURIComponent(r.domain)}`}
                                                            className="text-amber-400 hover:underline"
                                                        >
                                                            0% Lander
                                                        </Link>
                                                    </td>
                                                </>
                                            ) : (
                                                <td colSpan={7} className="py-3.5 text-xs text-red-400 font-mono">{r.error ?? 'Valuation error'}</td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
