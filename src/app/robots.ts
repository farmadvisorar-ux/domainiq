import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://prstuvw.xyz';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/'],
            },
            {
                userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Applebot', 'CCBot', 'Googlebot'],
                allow: ['/', '/articles/', '/aeo/', '/domain-worth-calculator', '/compare', '/how-it-works'],
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
