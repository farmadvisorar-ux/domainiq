import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles } from '@/data/articles';
import { getAllTlds } from '@/data/tlds';
import { DOMAIN_SALE_RECORDS } from '@/data/records';
import { getAllComparisons } from '@/data/comparisons';
import { getAllClubs } from '@/data/clubs';

const INDEXNOW_KEY = 'e8a7c2937f3448b1a8d11629d891b94e';
const HOST = 'prstuvw.xyz';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        let urlList: string[] = body.urls;

        if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
            // Default: compile top priority programmatic pages
            const baseUrl = `https://${HOST}`;
            const articles = getAllArticles().map((a) => `${baseUrl}/articles/${a.slug}`);
            const tlds = getAllTlds().map((t) => `${baseUrl}/tld/${t.extension}`);
            const comparisons = getAllComparisons().map((c) => `${baseUrl}/compare/${c.slug}`);
            const clubs = getAllClubs().map((cl) => `${baseUrl}/clubs/${cl.slug}`);
            const topSales = DOMAIN_SALE_RECORDS.slice(0, 50).map(
                (r) => `${baseUrl}/valuation/${encodeURIComponent(r.domain.toLowerCase())}`
            );

            urlList = [
                baseUrl,
                `${baseUrl}/records`,
                `${baseUrl}/clubs`,
                `${baseUrl}/articles`,
                `${baseUrl}/aeo`,
                `${baseUrl}/glossary`,
                `${baseUrl}/domain-worth-calculator`,
                `${baseUrl}/compare`,
                `${baseUrl}/bulk`,
                `${baseUrl}/deal-room`,
                ...clubs,
                ...comparisons,
                ...articles,
                ...tlds,
                ...topSales,
            ];
        }

        const payload = {
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
            urlList: urlList.slice(0, 200),
        };

        const res = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload),
        });

        return NextResponse.json({
            status: 'success',
            indexNowStatus: res.status,
            submittedCount: payload.urlList.length,
            message:
                res.status === 200 || res.status === 202
                    ? 'URLs submitted successfully to IndexNow (Bing, Yahoo, Yandex, Seznam)'
                    : `IndexNow responded with status ${res.status}`,
        });
    } catch (err) {
        return NextResponse.json(
            { status: 'error', error: err instanceof Error ? err.message : 'IndexNow error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        service: 'IndexNow Fast-Crawl Submission Service',
        host: HOST,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        usage: 'POST /api/indexnow with optional JSON body { "urls": ["https://prstuvw.xyz/..."] }',
    });
}
