'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('admin@prstuvw.xyz');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Authentication failed. Please verify password.');
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch {
            setError('Network error. Check connection and retry.');
        } finally {
            setLoading(false);
        }
    };

    const handleFillPrstuvw = () => {
        setUsername('admin@prstuvw.xyz');
        setPassword('prstuvw2026');
        setError(null);
    };

    const handleFillDefaults = () => {
        setUsername('admin');
        setPassword('domainvoodoo-admin-2026');
        setError(null);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-6">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white font-mono text-xl shadow-xl shadow-brand-500/30 font-black mb-1">
                        DV
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">
                        Domain<span className="text-brand-400">Voodoo</span> Admin Terminal
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">
                        System Management • Live Feed Push • Ad Box Operations
                    </p>
                </div>

                {/* Login Card */}
                <div className="card p-6 sm:p-8 rounded-2xl border-brand-500/30 bg-slate-900/90 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Credentials Help Banner */}
                    <div className="p-3.5 mb-5 rounded-xl bg-brand-950/70 border border-brand-800/80 text-xs font-mono space-y-2">
                        <div className="text-brand-300 font-bold flex items-center gap-1.5">
                            <span>🔑</span> Official Admin Credentials:
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 space-y-0.5">
                            <div className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                                Domain prstuvw.xyz Dedicated Login:
                            </div>
                            <div className="text-slate-200">
                                Username / Email: <span className="font-bold text-white">admin@prstuvw.xyz</span>
                            </div>
                            <div className="text-slate-200">
                                Passcode: <span className="font-bold text-emerald-400">prstuvw2026</span>
                            </div>
                        </div>
                        <div className="text-[11px] text-slate-400">
                            Alternative: <span className="text-white font-bold">admin</span> / <span className="text-slate-300">domainvoodoo-admin-2026</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        <div className="space-y-1.5">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                                Admin Username / Email
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin@prstuvw.xyz or admin"
                                className="input w-full font-mono text-sm bg-slate-950 border-slate-800 focus:border-brand-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                                Admin Password / Passcode
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter passcode (e.g. prstuvw2026)..."
                                autoFocus
                                required
                                className="input w-full font-mono text-sm tracking-widest bg-slate-950 border-slate-800 focus:border-brand-500"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-mono">
                                ⚠ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="btn-primary w-full py-3 text-xs font-mono font-bold uppercase tracking-wider disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In to Admin Terminal →'}
                        </button>

                        <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                            <button
                                type="button"
                                onClick={handleFillPrstuvw}
                                className="w-full text-center text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-800/50 rounded-lg py-1.5 transition-colors font-bold"
                            >
                                ⚡ 1-Click Auto-Fill (admin@prstuvw.xyz / prstuvw2026)
                            </button>
                            <button
                                type="button"
                                onClick={handleFillDefaults}
                                className="w-full text-center text-[11px] font-mono text-slate-400 hover:text-brand-300 transition-colors py-1"
                            >
                                Alternative: admin / domainvoodoo-admin-2026
                            </button>
                        </div>
                    </form>
                </div>

                {/* Return to Public Site */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                        ← Return to DomainVoodoo Public Terminal
                    </Link>
                </div>
            </div>
        </div>
    );
}
