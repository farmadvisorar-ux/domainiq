import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://prstuvw.xyz';

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/api/badge/'],
                disallow: ['/admin/', '/api/', '/dashboard/', '/reset-password', '/verify-email', '/dev/'],
            },
            {
                userAgent: 'Googlebot',
                allow: ['/', '/api/badge/'],
                disallow: ['/admin/', '/api/', '/dashboard/', '/reset-password', '/verify-email', '/dev/'],
            },
            {
                userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'rogerbot', 'bingbot'],
                allow: ['/', '/api/badge/'],
                disallow: ['/admin/', '/api/', '/dashboard/', '/dev/'],
            },
            {
                userAgent: [
                    'GPTBot',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'PerplexityBot',
                    'ClaudeBot',
                    'Claude-Web',
                    'Applebot',
                    'CCBot',
                    'Google-Extended',
                    'cohere-ai',
                    'Meta-ExternalAgent',
                ],
                allow: ['/', '/api/badge/', '/api/v1/valuate', '/llms.txt', '/llms-full.txt'],
                disallow: ['/admin/', '/dashboard/', '/reset-password', '/verify-email', '/dev/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
