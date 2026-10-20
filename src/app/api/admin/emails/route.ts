import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/admin-auth';
import { getSentEmails, sendEmailResult } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const isAuthed = await verifyAdminAccess(req);
    if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const emails = await getSentEmails();
        const from = process.env.EMAIL_FROM || 'DomainVoodoo <onboarding@resend.dev>';
        const resendKey = process.env.RESEND_API_KEY;
        const smtpHost = process.env.SMTP_HOST;

        return NextResponse.json({
            emails,
            mailerConfig: {
                resendConfigured: Boolean(resendKey),
                fromAddress: from,
                isResendSandbox: from.includes('onboarding@resend.dev'),
                smtpConfigured: Boolean(smtpHost && process.env.SMTP_USER && process.env.SMTP_PASS),
                smtpHost: smtpHost || null,
            },
        });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Failed to fetch email logs' },
            { status: 500 },
        );
    }
}

export async function POST(req: NextRequest) {
    const isAuthed = await verifyAdminAccess(req);
    if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json().catch(() => ({}));
        const to = String(body.to || '').trim().toLowerCase();
        if (!to || !to.includes('@')) {
            return NextResponse.json({ error: 'Please enter a valid recipient email' }, { status: 400 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
        const testActionLink = `${baseUrl}/admin`;

        const result = await sendEmailResult(
            to,
            '⚡ DomainVoodoo Auto-Responder Test Dispatch',
            `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>body{font-family:sans-serif;background:#090d16;color:#e2e8f0;padding:24px}.card{max-width:500px;margin:0 auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:28px}.brand{color:#818cf8;font-weight:900;font-size:20px;margin-bottom:12px}</style></head>
<body>
<div class="card">
    <div class="brand">Domain<span style="color:#a5b4fc">Voodoo</span></div>
    <h3 style="color:#ffffff;margin-top:0;">Auto-Responder Test Successful!</h3>
    <p style="color:#cbd5e1;line-height:1.6;">If you are reading this email in your inbox, your auto-responder email delivery engine is operational and delivering properly.</p>
    <p style="color:#94a3b8;font-size:12px;font-family:monospace;">Recipient: ${to}<br/>Timestamp: ${new Date().toISOString()}</p>
</div>
</body>
</html>`,
            testActionLink,
            'test',
        );

        return NextResponse.json({
            success: result.success,
            provider: result.provider,
            error: result.error,
            details: result.details,
            actionLink: result.actionLink,
            to,
        });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Failed to dispatch test email' },
            { status: 500 },
        );
    }
}
