'use client';

import { useState, type FormEvent } from 'react';

interface SupportFormProps {
    defaultCategory?: string;
    showCategorySelect?: boolean;
}

export default function SupportForm({
    defaultCategory = 'Chrome Extension Bug / Issue',
    showCategorySelect = true,
}: SupportFormProps) {
    const [category, setCategory] = useState(defaultCategory);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [browser, setBrowser] = useState('Google Chrome');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [ticketId, setTicketId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage(null);

        try {
            const res = await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category,
                    name,
                    email,
                    domain,
                    browser,
                    message,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setErrorMessage(data.error || 'Failed to submit ticket. Please try again or email us.');
                setStatus('error');
                return;
            }

            setTicketId(data.ticketId);
            setStatus('success');
        } catch {
            setErrorMessage('Network error occurred. Please contact support@domainvoodoo.com directly.');
            setStatus('error');
        }
    }

    function handleCopy() {
        if (ticketId) {
            navigator.clipboard.writeText(ticketId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    if (status === 'success') {
        return (
            <div className="card border-emerald-500/40 bg-emerald-950/20 p-6 sm:p-8 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl">
                    ✓
                </div>
                <h3 className="text-xl font-bold text-white">Ticket Submitted Successfully</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                    We have received your report and our engineering team will review it. A confirmation has been logged with your ticket reference:
                </p>

                <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 font-mono text-sm text-brand-300">
                    <span>{ticketId}</span>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className="pt-2 text-xs text-slate-400">
                    Expected reply time: <strong className="text-emerald-400">&lt; 24 business hours</strong> to <span className="text-white">{email}</span>.
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setStatus('idle');
                        setMessage('');
                        setTicketId(null);
                    }}
                    className="text-xs text-slate-400 hover:text-white underline pt-3"
                >
                    Submit another inquiry
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5 border-slate-800 bg-slate-900/60">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>✉️</span>
                    <span>Submit Extension Support Ticket</span>
                </h3>
                <p className="text-xs text-slate-400">
                    Direct line to DomainVoodoo core developers. We review all bug tickets, valuation discrepancies, and feature requests.
                </p>
            </div>

            {showCategorySelect && (
                <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Inquiry Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input w-full text-xs sm:text-sm bg-slate-950 border-slate-700 text-white"
                    >
                        <option value="Chrome Extension Bug / Issue">Chrome Extension Bug / Issue</option>
                        <option value="Extension Installation / Update Help">Extension Installation / Update Help</option>
                        <option value="Valuation Discrepancy / Comps Feedback">Valuation Discrepancy / Comps Feedback</option>
                        <option value="Data Privacy & Permissions Question">Data Privacy &amp; Permissions Question</option>
                        <option value="Feature Suggestion">Feature Suggestion</option>
                        <option value="API / Enterprise Integration">API / Enterprise Integration</option>
                    </select>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Alex Miller"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input w-full text-xs sm:text-sm bg-slate-950 border-slate-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="alex@domainportfolio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input w-full text-xs sm:text-sm bg-slate-950 border-slate-700 text-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Target Domain Name <span className="text-slate-500 font-normal">(if applicable)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. cloudflow.io"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="input w-full text-xs sm:text-sm bg-slate-950 border-slate-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Browser &amp; Version
                    </label>
                    <select
                        value={browser}
                        onChange={(e) => setBrowser(e.target.value)}
                        className="input w-full text-xs sm:text-sm bg-slate-950 border-slate-700 text-white"
                    >
                        <option value="Google Chrome (Desktop)">Google Chrome (Desktop)</option>
                        <option value="Microsoft Edge">Microsoft Edge</option>
                        <option value="Brave Browser">Brave Browser</option>
                        <option value="Other Chromium Browser">Other Chromium Browser</option>
                        <option value="Web Terminal / Mobile">Web Terminal / Mobile</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Describe your issue or feedback <span className="text-rose-400">*</span>
                </label>
                <textarea
                    required
                    rows={4}
                    placeholder="Provide details on what happened, steps to reproduce, or your question. If reporting an error, include any message displayed in the popup."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input w-full text-xs sm:text-sm bg-slate-950 border-slate-700 text-white resize-y"
                />
            </div>

            {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
                    {errorMessage}
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400 text-center sm:text-left">
                    Direct Email: <a href="mailto:support@domainvoodoo.com" className="text-brand-400 hover:underline">support@domainvoodoo.com</a>
                </span>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full sm:w-auto !py-2.5 !px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                >
                    {status === 'loading' ? (
                        <>
                            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Submitting Ticket…</span>
                        </>
                    ) : (
                        <span>Submit Support Ticket →</span>
                    )}
                </button>
            </div>
        </form>
    );
}
