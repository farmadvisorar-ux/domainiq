import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://prstuvw.xyz';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/', '/reset-password', '/verify-email', '/dev/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/', '/reset-password', '/verify-email', '/dev/'],
            },
            {
                userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Applebot', 'CCBot', 'Google-Extended'],
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/', '/dev/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
