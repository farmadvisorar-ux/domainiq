import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { getPool } from '@/lib/db';
import { emailSchema } from '@/lib/validation';
import { checkAndConsumeRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null);
        const parsed = emailSchema.safeParse(body?.email);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
        }

        const ip = getClientIp(req.headers);
        const { allowed } = await checkAndConsumeRateLimit(ip, 10, 'newsletter-subscribe');
        if (!allowed) {
            return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
        }

        const email = parsed.data;
        try {
            const pool = getPool();
            const token = crypto.randomBytes(24).toString('hex');

            await pool.query(
                `INSERT INTO newsletter_subscribers (email, unsubscribe_token)
                 VALUES ($1, $2)
                 ON CONFLICT (email) DO UPDATE SET unsubscribed_at = NULL`,
                [email, token],
            );

            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
            const unsubLink = `${baseUrl}/unsubscribe?token=${token}`;
            try {
                const { sendEmail, newsletterWelcomeHtml } = await import('@/lib/mailer');
                await sendEmail(email, 'Welcome to DomainVoodoo Dispatch — Private Domain Intelligence', newsletterWelcomeHtml(unsubLink), unsubLink, 'newsletter_welcome');
            } catch (mailErr) {
                console.warn('Newsletter welcome email send error:', mailErr);
            }
        } catch (dbErr) {
            console.warn('Newsletter subscribe DB error, returning success to client:', dbErr);
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Newsletter subscribe error:', err);
        return NextResponse.json({ ok: true });
    }
}
