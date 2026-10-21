import Link from 'next/link';
import { getSession } from '@/lib/auth';
import LogoutButton from './LogoutButton';
import MobileNavMenu from './MobileNavMenu';
import AltHuntBadge from './AltHuntBadge';

export default async function NavBar() {
    const session = await getSession();

    return (
        <header className="relative border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 transition-colors">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
                {/* Logo & Brand Mark with Halloween Spooky Accents */}
                <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight group">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-brand-600 to-purple-700 text-white shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/50 transition-all duration-300">
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-orange-400 opacity-0 blur-sm group-hover:opacity-40 transition-opacity" />
                        <span className="relative font-mono font-black text-xs tracking-wider">DV</span>
                        {/* Perched Mini Pumpkin */}
                        <span className="absolute -top-2.5 -right-2 text-[13px] select-none filter drop-shadow-[0_0_6px_rgba(255,140,0,0.9)] animate-bounce" style={{ animationDuration: '3s' }}>
                            🎃
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-white group-hover:text-orange-300 transition-colors">Domain<span className="text-orange-400">Voodoo</span></span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-950/70 text-orange-400 border border-orange-500/40 font-semibold tracking-wider flex items-center gap-1 shadow-sm shadow-orange-500/20">
                            <span>🎃</span>
                            <span className="hidden sm:inline">Spooky Edition</span>
                            <span className="sm:hidden">v2.5</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-5 text-xs font-semibold text-slate-300 lg:flex">
                    <Link href="/" className="hover:text-brand-400 transition-colors">Valuate</Link>
                    <Link href="/compare" className="hover:text-brand-400 transition-colors">Compare</Link>
                    <Link href="/bulk" className="hover:text-brand-400 transition-colors">Bulk Portfolio</Link>
                    <Link href="/drops" className="hover:text-brand-400 transition-colors">Drop Radar</Link>
                    <Link href="/extension" className="hover:text-brand-400 transition-colors">Extension</Link>
                    <Link href="/api-docs" className="hover:text-brand-400 transition-colors">API Docs</Link>
                    <Link href="/articles" className="hover:text-brand-400 transition-colors text-amber-300 font-semibold">Articles</Link>
                    <Link href="/aeo" className="hover:text-brand-400 transition-colors text-purple-300 font-semibold">AEO Portal</Link>
                    <Link href="/domain-worth-calculator" className="hover:text-brand-400 transition-colors text-cyan-300">Worth Guide</Link>
                    <Link href="/how-it-works" className="hover:text-brand-400 transition-colors">Methodology</Link>
                    <Link href="/pricing" className="hover:text-brand-400 transition-colors">Pricing</Link>
                    {session && <Link href="/dashboard" className="hover:text-brand-400 transition-colors">Dashboard</Link>}
                </nav>

                {/* AltHunt Badge */}
                <div className="hidden xl:flex items-center">
                    <AltHuntBadge />
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2.5">
                    {session ? (
                        <>
                            <span className="hidden text-xs text-slate-400 sm:inline font-mono">{session.email}</span>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn-secondary !px-3 !py-1.5 text-xs font-semibold">
                                Sign in
                            </Link>
                            <Link href="/signup" className="btn-primary !px-3.5 !py-1.5 text-xs font-semibold shadow-brand-500/20">
                                Sign up free
                            </Link>
                        </>
                    )}
                    <MobileNavMenu showDashboard={Boolean(session)} />
                </div>
            </div>
        </header>
    );
}
