import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, LEGACY_ADMIN_COOKIE_NAME, getAdminPasscode, isAllowedAdminPassword, verifyAdminAccess } from '@/lib/admin-auth';
import { createSessionCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const isAuthed = await verifyAdminAccess(req);
    return NextResponse.json({ authenticated: isAuthed });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const username = String(body.username || body.email || '').trim().toLowerCase();
        const password = String(body.password || body.passcode || '').trim();

        // Check if passcode is valid
        if (!isAllowedAdminPassword(password)) {
            return NextResponse.json(
                { error: 'Invalid admin passcode. For prstuvw.xyz, use admin@prstuvw.xyz with passcode prstuvw2026 (or domainvoodoo-admin-2026).' },
                { status: 401 }
            );
        }

        const expected = getAdminPasscode();
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        };

        // Set secure admin cookie (7 days) for both current and legacy cookie names
        cookies().set(ADMIN_COOKIE_NAME, expected, cookieOptions);
        cookies().set(LEGACY_ADMIN_COOKIE_NAME, expected, cookieOptions);

        // Also establish a user session for admin@prstuvw.xyz so the user is authenticated sitewide
        const adminEmail = username && username.includes('@') ? username : 'admin@prstuvw.xyz';
        await createSessionCookie({
            id: 1,
            email: adminEmail,
            password_hash: '',
            email_verified_at: new Date().toISOString(),
            plan: 'admin',
            created_at: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            message: 'Admin authenticated for prstuvw.xyz',
            user: { email: adminEmail, role: 'admin' },
            redirect: '/admin',
        });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Authentication failed' },
            { status: 500 },
        );
    }
}

export async function DELETE() {
    cookies().delete(ADMIN_COOKIE_NAME);
    cookies().delete(LEGACY_ADMIN_COOKIE_NAME);
    return NextResponse.json({ success: true, message: 'Admin logged out' });
}
