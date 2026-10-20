import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { getPool } from './db';

export interface SentEmail {
    id: string;
    to: string;
    subject: string;
    html: string;
    sentAt: string;
    delivered: boolean;
    provider: 'resend' | 'smtp' | 'dev';
    error?: string;
    actionLink?: string;
    type: 'signup_verification' | 'password_reset' | 'password_changed' | 'newsletter_welcome' | 'ad_order' | 'test' | 'other';
}

declare global {
    // eslint-disable-next-line no-var
    var __domainvoodooDevOutbox: SentEmail[] | undefined;
}

function getMemoryOutbox(): SentEmail[] {
    if (!globalThis.__domainvoodooDevOutbox) {
        globalThis.__domainvoodooDevOutbox = [];
    }
    return globalThis.__domainvoodooDevOutbox;
}

export async function getSentEmails(): Promise<SentEmail[]> {
    const memory = getMemoryOutbox();
    if (process.env.DATABASE_URL) {
        try {
            const pool = getPool();
            await pool.query(`
                CREATE TABLE IF NOT EXISTS sent_emails_log (
                    id TEXT PRIMARY KEY,
                    recipient TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    html TEXT NOT NULL,
                    sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                    delivered BOOLEAN NOT NULL DEFAULT false,
                    provider TEXT NOT NULL,
                    error TEXT,
                    action_link TEXT,
                    email_type TEXT NOT NULL DEFAULT 'other'
                );
            `);
            const { rows } = await pool.query<{
                id: string;
                recipient: string;
                subject: string;
                html: string;
                sent_at: string;
                delivered: boolean;
                provider: string;
                error: string | null;
                action_link: string | null;
                email_type: string;
            }>('SELECT * FROM sent_emails_log ORDER BY sent_at DESC LIMIT 50');

            if (rows && rows.length > 0) {
                return rows.map((r) => ({
                    id: r.id,
                    to: r.recipient,
                    subject: r.subject,
                    html: r.html,
                    sentAt: r.sent_at,
                    delivered: r.delivered,
                    provider: (r.provider as SentEmail['provider']) || 'resend',
                    error: r.error || undefined,
                    actionLink: r.action_link || undefined,
                    type: (r.email_type as SentEmail['type']) || 'other',
                }));
            }
        } catch {
            // Fall back to memory
        }
    }
    return memory;
}

export function getDevOutbox(): SentEmail[] {
    return getMemoryOutbox();
}

async function logSentEmail(email: SentEmail): Promise<void> {
    const memory = getMemoryOutbox();
    memory.unshift(email);
    if (memory.length > 50) memory.length = 50;

    if (process.env.DATABASE_URL) {
        try {
            const pool = getPool();
            await pool.query(`
                CREATE TABLE IF NOT EXISTS sent_emails_log (
                    id TEXT PRIMARY KEY,
                    recipient TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    html TEXT NOT NULL,
                    sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                    delivered BOOLEAN NOT NULL DEFAULT false,
                    provider TEXT NOT NULL,
                    error TEXT,
                    action_link TEXT,
                    email_type TEXT NOT NULL DEFAULT 'other'
                );
            `);
            await pool.query(
                `INSERT INTO sent_emails_log (id, recipient, subject, html, sent_at, delivered, provider, error, action_link, email_type)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                 ON CONFLICT (id) DO NOTHING`,
                [
                    email.id,
                    email.to,
                    email.subject,
                    email.html,
                    email.sentAt,
                    email.delivered,
                    email.provider,
                    email.error || null,
                    email.actionLink || null,
                    email.type,
                ],
            );
        } catch {
            // Memory already captured
        }
    }
}

export interface SendEmailResult {
    success: boolean;
    provider: 'resend' | 'smtp' | 'dev';
    error?: string;
    details?: string;
    actionLink?: string;
}

export interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    actionLink?: string;
    type?: SentEmail['type'];
}

export async function sendEmailResult(
    to: string,
    subject: string,
    html: string,
    actionLink?: string,
    type: SentEmail['type'] = 'other',
): Promise<SendEmailResult> {
    const id = `mail_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM || 'DomainVoodoo <onboarding@resend.dev>';

    // Check if standard SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // 1. Try Resend if configured
    if (apiKey) {
        try {
            const resend = new Resend(apiKey);
            const { error, data } = await resend.emails.send({ from, to, subject, html });

            if (error) {
                const isSandboxRestriction =
                    error.message.includes('only send testing emails') ||
                    error.message.includes('verify your domain') ||
                    from.includes('onboarding@resend.dev');

                let errorMsg = `Resend Error (${error.name}): ${error.message}`;
                if (isSandboxRestriction) {
                    errorMsg += ` [NOTE: Resend sandbox with onboarding@resend.dev only delivers to the Resend account owner's registered address. Add & verify a domain at resend.com/domains or configure SMTP to deliver to all inboxes.]`;
                }

                console.error(`[mailer] ${errorMsg}`);

                // If SMTP is available as a fallback, try SMTP
                if (smtpHost && smtpUser && smtpPass) {
                    return await sendViaSmtp(id, to, subject, html, actionLink, type);
                }

                await logSentEmail({
                    id,
                    to,
                    subject,
                    html,
                    sentAt: new Date().toISOString(),
                    delivered: false,
                    provider: 'resend',
                    error: errorMsg,
                    actionLink,
                    type,
                });

                return {
                    success: false,
                    provider: 'resend',
                    error: errorMsg,
                    details: JSON.stringify(error),
                    actionLink,
                };
            }

            await logSentEmail({
                id,
                to,
                subject,
                html,
                sentAt: new Date().toISOString(),
                delivered: true,
                provider: 'resend',
                actionLink,
                type,
            });

            return {
                success: true,
                provider: 'resend',
                details: JSON.stringify(data),
                actionLink,
            };
        } catch (resendErr) {
            const errMsg = resendErr instanceof Error ? resendErr.message : String(resendErr);
            console.error('[mailer] Resend exception:', errMsg);

            if (smtpHost && smtpUser && smtpPass) {
                return await sendViaSmtp(id, to, subject, html, actionLink, type);
            }

            await logSentEmail({
                id,
                to,
                subject,
                html,
                sentAt: new Date().toISOString(),
                delivered: false,
                provider: 'resend',
                error: errMsg,
                actionLink,
                type,
            });

            return {
                success: false,
                provider: 'resend',
                error: errMsg,
                actionLink,
            };
        }
    }

    // 2. Try SMTP if configured
    if (smtpHost && smtpUser && smtpPass) {
        return await sendViaSmtp(id, to, subject, html, actionLink, type);
    }

    // 3. Fallback: Dev Mode Outbox (Simulated Delivery)
    console.log(`[mailer] (dev mode, no API key or SMTP) recorded "${subject}" to ${to}`);
    await logSentEmail({
        id,
        to,
        subject,
        html,
        sentAt: new Date().toISOString(),
        delivered: true,
        provider: 'dev',
        error: 'Dev outbox simulated delivery (No RESEND_API_KEY or SMTP configured)',
        actionLink,
        type,
    });

    return {
        success: true,
        provider: 'dev',
        details: 'Captured in local Outbox. Configure RESEND_API_KEY or SMTP for live inbox delivery.',
        actionLink,
    };
}

async function sendViaSmtp(
    id: string,
    to: string,
    subject: string,
    html: string,
    actionLink?: string,
    type: SentEmail['type'] = 'other',
): Promise<SendEmailResult> {
    const smtpHost = process.env.SMTP_HOST!;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER!;
    const smtpPass = process.env.SMTP_PASS!;
    const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
    const from = process.env.EMAIL_FROM || `DomainVoodoo <${smtpUser}>`;

    try {
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
        });

        await logSentEmail({
            id,
            to,
            subject,
            html,
            sentAt: new Date().toISOString(),
            delivered: true,
            provider: 'smtp',
            actionLink,
            type,
        });

        return {
            success: true,
            provider: 'smtp',
            details: `Delivered via SMTP: ${info.messageId}`,
            actionLink,
        };
    } catch (smtpErr) {
        const errMsg = smtpErr instanceof Error ? smtpErr.message : String(smtpErr);
        console.error('[mailer] SMTP dispatch failed:', errMsg);

        await logSentEmail({
            id,
            to,
            subject,
            html,
            sentAt: new Date().toISOString(),
            delivered: false,
            provider: 'smtp',
            error: errMsg,
            actionLink,
            type,
        });

        return {
            success: false,
            provider: 'smtp',
            error: errMsg,
            actionLink,
        };
    }
}

/**
 * Standard sendEmail function for backwards compatibility with all existing routes
 */
export async function sendEmail(
    to: string,
    subject: string,
    html: string,
    actionLink?: string,
    type: SentEmail['type'] = 'other',
): Promise<void> {
    await sendEmailResult(to, subject, html, actionLink, type);
}

// =========================================================================
// HIGH-CONVERTING BRANDED HTML AUTO-RESPONDER TEMPLATES
// =========================================================================

export function verifyEmailHtml(link: string): string {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#090d16;color:#e2e8f0;padding:24px;margin:0}.card{max-width:540px;margin:0 auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:32px;box-shadow:0 10px 25px rgba(0,0,0,0.5)}.brand{color:#818cf8;font-weight:900;font-size:22px;margin-bottom:16px}.btn{display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:14px 28px;border-radius:10px;margin:20px 0;letter-spacing:0.5px}.sub{color:#94a3b8;font-size:12px;line-height:1.6;margin-top:24px;border-top:1px solid #1e293b;padding-top:16px}</style></head>
<body>
<div class="card">
    <div class="brand">Domain<span style="color:#a5b4fc">Voodoo</span></div>
    <h2 style="color:#ffffff;margin-top:0;">Confirm your DomainVoodoo account</h2>
    <p style="color:#cbd5e1;line-height:1.6;">Welcome to the institutional domain valuation and deal-flow engine. Confirm your email address to activate unlimited free appraisals, portfolio watchlists, and market drops.</p>
    <div style="text-align:center;">
        <a href="${link}" class="btn">Confirm Email Address →</a>
    </div>
    <p style="color:#94a3b8;font-size:13px;">Or copy and paste this direct verification link into your browser:</p>
    <p style="background:#020617;padding:12px;border-radius:8px;font-family:monospace;font-size:11px;color:#a5b4fc;word-break:break-all;">${link}</p>
    <div class="sub">
        If you did not create an account on DomainVoodoo, you can safely ignore this email.
    </div>
</div>
</body>
</html>`;
}

export function resetPasswordHtml(link: string): string {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#090d16;color:#e2e8f0;padding:24px;margin:0}.card{max-width:540px;margin:0 auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:32px;box-shadow:0 10px 25px rgba(0,0,0,0.5)}.brand{color:#818cf8;font-weight:900;font-size:22px;margin-bottom:16px}.btn{display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:14px 28px;border-radius:10px;margin:20px 0;letter-spacing:0.5px}.sub{color:#94a3b8;font-size:12px;line-height:1.6;margin-top:24px;border-top:1px solid #1e293b;padding-top:16px}</style></head>
<body>
<div class="card">
    <div class="brand">Domain<span style="color:#a5b4fc">Voodoo</span></div>
    <h2 style="color:#ffffff;margin-top:0;">Reset your account password</h2>
    <p style="color:#cbd5e1;line-height:1.6;">We received a request to reset the password for your DomainVoodoo account. Click the button below to set a new password:</p>
    <div style="text-align:center;">
        <a href="${link}" class="btn">Reset My Password →</a>
    </div>
    <p style="color:#94a3b8;font-size:13px;">This link will expire in 1 hour. Or paste this link into your browser:</p>
    <p style="background:#020617;padding:12px;border-radius:8px;font-family:monospace;font-size:11px;color:#a5b4fc;word-break:break-all;">${link}</p>
    <div class="sub">
        If you did not request a password reset, your account is secure and you can ignore this email.
    </div>
</div>
</body>
</html>`;
}

export function passwordChangedHtml(): string {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#090d16;color:#e2e8f0;padding:24px;margin:0}.card{max-width:540px;margin:0 auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:32px;box-shadow:0 10px 25px rgba(0,0,0,0.5)}.brand{color:#818cf8;font-weight:900;font-size:22px;margin-bottom:16px}.sub{color:#94a3b8;font-size:12px;line-height:1.6;margin-top:24px;border-top:1px solid #1e293b;padding-top:16px}</style></head>
<body>
<div class="card">
    <div class="brand">Domain<span style="color:#a5b4fc">Voodoo</span></div>
    <h2 style="color:#ffffff;margin-top:0;">✓ Your password was successfully updated</h2>
    <p style="color:#cbd5e1;line-height:1.6;">This confirmation email is to inform you that your DomainVoodoo password was updated successfully.</p>
    <p style="color:#94a3b8;font-size:13px;">Time: ${new Date().toUTCString()}</p>
    <div class="sub">
        If you did not initiate this change, please sign in to reset your password immediately or contact security support.
    </div>
</div>
</body>
</html>`;
}

export function newsletterWelcomeHtml(unsubscribeLink?: string): string {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#090d16;color:#e2e8f0;padding:24px;margin:0}.card{max-width:540px;margin:0 auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:32px;box-shadow:0 10px 25px rgba(0,0,0,0.5)}.brand{color:#818cf8;font-weight:900;font-size:22px;margin-bottom:16px}.sub{color:#94a3b8;font-size:12px;line-height:1.6;margin-top:24px;border-top:1px solid #1e293b;padding-top:16px}</style></head>
<body>
<div class="card">
    <div class="brand">Domain<span style="color:#a5b4fc">Voodoo</span> Dispatch</div>
    <h2 style="color:#ffffff;margin-top:0;">Welcome to Private Domain Intelligence</h2>
    <p style="color:#cbd5e1;line-height:1.6;">Your subscription is confirmed! You will receive high-value reported sales comps, expiring drop picks, and valuation market updates directly to your inbox.</p>
    <div class="sub">
        ${unsubscribeLink ? `<a href="${unsubscribeLink}" style="color:#64748b;">Unsubscribe</a>` : 'You can unsubscribe at any time.'}
    </div>
</div>
</body>
</html>`;
}

export function adOrderConfirmationHtml(slotId: number, company: string, amount: number): string {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#090d16;color:#e2e8f0;padding:24px;margin:0}.card{max-width:540px;margin:0 auto;background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:32px;box-shadow:0 10px 25px rgba(0,0,0,0.5)}.brand{color:#818cf8;font-weight:900;font-size:22px;margin-bottom:16px}.sub{color:#94a3b8;font-size:12px;line-height:1.6;margin-top:24px;border-top:1px solid #1e293b;padding-top:16px}</style></head>
<body>
<div class="card">
    <div class="brand">Domain<span style="color:#a5b4fc">Voodoo</span> Advertising</div>
    <h2 style="color:#ffffff;margin-top:0;">✓ Banner Placement Order Received</h2>
    <p style="color:#cbd5e1;line-height:1.6;">Thank you, <strong style="color:#ffffff">${company}</strong>. Your reservation for <strong style="color:#818cf8">Ad Box #${slotId}</strong> ($${amount}/mo) has been received and routed to our admin terminal for verification and live push deployment.</p>
    <div class="sub">
        An onboarding specialist will confirm your live deployment link and invoice within 24 hours.
    </div>
</div>
</body>
</html>`;
}
