import { NextRequest, NextResponse } from 'next/server';
import { queryComps } from '@/data/comps';
import { formatUsd } from '@/lib/format';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const q = searchParams.get('q') || searchParams.get('keyword') || undefined;
        const tld = searchParams.get('tld') || undefined;
        const category = searchParams.get('category') || undefined;
        const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
        const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
        const wordStructure = searchParams.get('structure') || undefined;
        const sortBy = (searchParams.get('sortBy') as any) || 'price-desc';
        const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') || 50)));
        const offset = Math.max(0, Number(searchParams.get('offset') || 0));

        const result = queryComps({
            keyword: q,
            tld,
            category,
            minPrice,
            maxPrice,
            wordStructure,
            sortBy,
            limit,
            offset,
        });

        // Check if markdown format is requested
        const format = searchParams.get('format')?.toLowerCase();
        const acceptHeader = req.headers.get('accept') || '';
        const wantsMarkdown = format === 'markdown' || format === 'md' || acceptHeader.includes('text/markdown');

        if (wantsMarkdown) {
            const mdLines = [
                `# DomainVoodoo Historical Domain Sales Comps Dataset`,
                ``,
                `**Filter**: Keyword="${q || 'none'}", TLD="${tld || 'all'}", Category="${category || 'all'}"`,
                `**Qualified Comps**: ${result.total}`,
                `**Total Volume**: ${formatUsd(result.stats.totalUsd)}`,
                `**Median Sale Price**: ${formatUsd(result.stats.medianUsd)}`,
                `**Mean (Average) Sale Price**: ${formatUsd(result.stats.meanUsd)}`,
                `**Highest Comp**: ${formatUsd(result.stats.maxUsd)}`,
                ``,
                `| Domain | Sale Price (USD) | Year | Extension | Category | Source / Provenance |`,
                `| :--- | :--- | :--- | :--- | :--- | :--- |`,
                ...result.items.map(
                    (c) =>
                        `| [${c.domain}](https://prstuvw.xyz/valuation/${encodeURIComponent(c.domain)}) | ${formatUsd(c.priceUsd)} | ${c.year} | .${c.tld} | ${c.category} | ${c.sourceNote} |`
                ),
                ``,
                `---`,
                `*Data provided by [DomainVoodoo CVM-4 Econometric Engine](https://prstuvw.xyz/comps). Query live API: https://prstuvw.xyz/api/comps*`,
            ];

            return new NextResponse(mdLines.join('\n'), {
                status: 200,
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                },
            });
        }

        return NextResponse.json(
            {
                status: 'success',
                endpoint: 'DomainVoodoo Historical Comps API v1',
                query: { keyword: q, tld, category, minPrice, maxPrice, sortBy, limit, offset },
                totalMatches: result.total,
                aggregateStats: result.stats,
                items: result.items,
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                },
            }
        );
    } catch (err) {
        return NextResponse.json(
            { status: 'error', error: err instanceof Error ? err.message : 'Comps query error' },
            { status: 500 }
        );
    }
}
