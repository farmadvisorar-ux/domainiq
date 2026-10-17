import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/lib/admin-auth';
import { readMonetization, saveMonetization } from '@/lib/monetization';
import { monetizationSchema } from '@/lib/monetization-schema';

export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        return NextResponse.json(await readMonetization(), { headers: { 'Cache-Control': 'no-store' } });
    } catch {
        return NextResponse.json({ error: 'Settings unavailable. Check the database connection.' }, { status: 503 });
    }
}
export async function PUT(req: NextRequest) {
    if (req.headers.get('origin') !== req.nextUrl.origin) {
        return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }
    if (!await verifyAdminAccess(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const result = monetizationSchema.safeParse(await req.json().catch(() => null));
    if (!result.success) return NextResponse.json({ error: result.error.issues[0]?.message || 'Invalid settings' }, { status: 400 });
    try {
        await saveMonetization(result.data);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Not saved. Configure DATABASE_URL and check database access.' }, { status: 503 });
    }
}
