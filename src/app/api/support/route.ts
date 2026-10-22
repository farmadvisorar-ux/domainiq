import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { category, name, email, domain, browser, message } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'A valid email address is required so we can reply to your inquiry.' },
                { status: 400 }
            );
        }

        if (!message || message.trim().length < 5) {
            return NextResponse.json(
                { error: 'Please provide a brief message describing your issue or request.' },
                { status: 400 }
            );
        }

        // Generate persistent reference ticket ID
        const ticketId = `DV-${(category || 'SUP').slice(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

        // In production this can dispatch to a webhook, database, or alerting queue
        console.log(`[Support Ticket Created] ${ticketId}:`, {
            category,
            name: name || 'Anonymous Domainer',
            email,
            domain: domain || 'N/A',
            browser: browser || 'Chrome',
            messageLength: message.length,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            ticketId,
            message: 'Your support ticket has been received. Our developer team responds within 24 hours.',
            eta: 'Under 24 hours',
            directEmail: 'support@domainvoodoo.com',
        });
    } catch (err: unknown) {
        console.error('Support ticket error:', err);
        return NextResponse.json(
            { error: 'Failed to submit support request. Please email support@domainvoodoo.com directly.' },
            { status: 500 }
        );
    }
}
