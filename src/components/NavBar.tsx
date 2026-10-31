import Link from 'next/link';
import { getSession } from '@/lib/auth';
import LogoutButton from './LogoutButton';
import DesktopNav from './DesktopNav';
import MobileNavMenu from './MobileNavMenu';
import AltHuntBadge from './AltHuntBadge';

export default async function NavBar() {
    const session = await getSession();

    return (
        <header className="relative border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl sticky top-0 z-40 transition-colors">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
                {/* Brand Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight group">
                        <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl overflow-hidden border border-purple-500/30 bg-slate-900 shadow-md shadow-purple-500/20 group-hover:shadow-cyan-500/40 group-hover:border-cyan-500/50 transition-all duration-300">
                            <img
                                src="/logo.svg"
                                alt="DomainVoodoo Emblem"
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* Ambient glow */}
                            <div className="absolute inset-0 rounded-xl bg-purple-500 opacity-0 blur-sm group-hover:opacity-25 transition-opacity pointer-events-none" />
                            {/* Perched Mini Pumpkin */}
                            <span
                                className="absolute -top-2.5 -right-2 text-[12px] sm:text-[14px] select-none filter drop-shadow-[0_0_6px_rgba(255,140,0,0.9)] animate-bounce pointer-events-none"
                                style={{ animationDuration: '3s' }}
                            >
                                🎃
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-white text-base sm:text-lg group-hover:text-purple-300 transition-colors font-black">
                                Domain<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">Voodoo</span>
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/70 text-purple-300 border border-purple-500/40 font-semibold tracking-wider hidden sm:inline-flex items-center gap-1 shadow-sm shadow-purple-500/20">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>CVM-4</span>
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-purple-950/70 text-purple-300 border border-purple-500/40 font-semibold sm:hidden">
                                v3.0
                            </span>
                        </div>
                    </Link>
                </div>

                {/* PC / Desktop Categorized Navigation (4 Dropdown Groups) */}
                <DesktopNav showDashboard={Boolean(session)} />

                {/* Right Action Elements */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* AltHunt Featured Badge on Extra Wide PC Screens */}
                    <div className="hidden xl:flex items-center shrink-0">
                        <AltHuntBadge />
                    </div>

                    {/* Desktop Authentication Controls */}
                    <div className="hidden sm:flex items-center gap-2">
                        {session ? (
                            <>
                                <span className="text-xs text-slate-400 font-mono hidden md:inline truncate max-w-[140px]">
                                    {session.email}
                                </span>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="btn-secondary !px-3 !py-1.5 text-xs font-semibold whitespace-nowrap"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="btn-primary !px-3.5 !py-1.5 text-xs font-semibold whitespace-nowrap shadow-brand-500/20"
                                >
                                    Sign up free
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Compact Mobile Sign In button (when logged out, on small screens) */}
                    {!session && (
                        <Link
                            href="/login"
                            className="sm:hidden text-xs font-bold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
                        >
                            Sign In
                        </Link>
                    )}

                    {/* Mobile Navigation Drawer Trigger */}
                    <MobileNavMenu session={session} />
                </div>
            </div>
        </header>
    );
}
