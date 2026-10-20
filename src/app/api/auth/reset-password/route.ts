import { NextRequest, NextResponse } from 'next/server';
import { passwordSchema } from '@/lib/validation';
import { consumeEmailToken, hashPassword, updatePassword, findUserById, createSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null);
        const token = typeof body?.token === 'string' ? body.token : null;
        const parsed = passwordSchema.safeParse(body?.password);

        if (!token || !parsed.success) {
            return NextResponse.json({ error: parsed.success ? 'Missing reset token' : parsed.error.issues[0]?.message }, { status: 400 });
        }

        const row = await consumeEmailToken(token, 'reset');
        if (!row) {
            return NextResponse.json({ error: 'This reset link is invalid or has expired. Request a new one.' }, { status: 400 });
        }

        const passwordHash = await hashPassword(parsed.data);
        await updatePassword(row.user_id, passwordHash);

        const user = await findUserById(row.user_id);
        if (user) {
            await createSessionCookie(user);
            try {
                const { sendEmail, passwordChangedHtml } = await import('@/lib/mailer');
                await sendEmail(user.email, 'Your DomainVoodoo password was updated', passwordChangedHtml(), undefined, 'password_changed');
            } catch (mailErr) {
                console.warn('Password changed email send error:', mailErr);
            }
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Reset password error:', err);
        return NextResponse.json({ error: 'Unable to reset password right now. Please try again.' }, { status: 500 });
    }
}
