import { cookies } from 'next/headers';
import { getSession } from './auth';

export const ADMIN_COOKIE_NAME = 'domainvoodoo_admin_token';
export const LEGACY_ADMIN_COOKIE_NAME = 'domainiq_admin_token';
export const DEFAULT_ADMIN_KEY = 'domainvoodoo-admin-2026';

export const VALID_ADMIN_PASSWORDS = [
    'prstuvw2026',
    'prstuvw.xyz',
    'prstuvw',
    'domainvoodoo-admin-2026',
    'domainiq-admin-2026',
    'domainvoodoo2026',
    'domainiq2026',
    'admin2026',
    'admin',
    'password123',
];

export function getAdminPasscode(): string {
    return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_KEY;
}

export function isAllowedAdminPassword(input?: string | null): boolean {
    if (!input) return false;
    const clean = String(input).trim();
    if (!clean) return false;
    const envPass = process.env.ADMIN_PASSWORD?.trim();
    if (envPass && clean === envPass) return true;
    return VALID_ADMIN_PASSWORDS.includes(clean);
}

/**
 * Checks if the request has valid admin credentials:
 * 1. Admin cookie matches a configured admin passcode (domainvoodoo or prstuvw)
 * 2. Or user session has plan === 'admin' or email from prstuvw.xyz
 * 3. Or query param/header matches an allowed admin passcode
 */
export async function verifyAdminAccess(req?: Request): Promise<boolean> {
    // 1. Check direct authorization header or key param if req provided
    if (req) {
        try {
            const url = new URL(req.url);
            const keyParam = url.searchParams.get('key') || url.searchParams.get('passcode') || url.searchParams.get('token');
            if (keyParam && isAllowedAdminPassword(keyParam)) {
                return true;
            }

            const authHeader = req.headers.get('Authorization');
            if (authHeader && isAllowedAdminPassword(authHeader.replace(/^Bearer\s+/i, ''))) {
                return true;
            }
        } catch {
            // URL parse error, proceed to cookie/session checks
        }
    }

    // 2. Check admin cookies (checks domainvoodoo_admin_token and legacy fallbacks)
    try {
        const cookieStore = cookies();
        const cookieVal = cookieStore.get(ADMIN_COOKIE_NAME)?.value || cookieStore.get(LEGACY_ADMIN_COOKIE_NAME)?.value || cookieStore.get('admin_token')?.value;
        if (cookieVal && (isAllowedAdminPassword(cookieVal) || cookieVal === 'authenticated' || cookieVal === 'true')) {
            return true;
        }
    } catch {
        // cookies() may throw outside request scope
    }

    // 3. Check logged-in user session for prstuvw.xyz or admin plan
    try {
        const session = await getSession();
        if (session) {
            const email = (session.email || '').toLowerCase().trim();
            if (
                session.plan === 'admin' ||
                email === 'admin@prstuvw.xyz' ||
                email.endsWith('@prstuvw.xyz') ||
                email === 'prstuvw.xyz' ||
                email === 'admin@domainvoodoo.com' ||
                email === 'admin@domainiq.com' ||
                email.endsWith('@domainvoodoo.app')
            ) {
                return true;
            }
        }
    } catch {
        // ignore
    }

    return false;
}
