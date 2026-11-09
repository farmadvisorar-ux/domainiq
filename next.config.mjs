/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ['pg'],
    },
    async redirects() {
        return [
            {
                source: '/valuation',
                destination: '/',
                permanent: true,
            },
            {
                source: '/lander',
                destination: '/',
                permanent: true,
            },
            {
                source: '/certificate',
                destination: '/',
                permanent: true,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ];
    },
};

export default nextConfig;
