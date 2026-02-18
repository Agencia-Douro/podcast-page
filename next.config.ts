import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
    poweredByHeader: false,
    turbopack: {
        root: __dirname,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000,
        remotePatterns: [
        {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: "/**",
        },
        {
            protocol: "http",
            hostname: "51.75.19.38",
            port: "3008",
            pathname: "/uploads/**",
        },
        {
            protocol: "http",
            hostname: "localhost",
            port: "3008",
            pathname: "/uploads/**",
        },
        {
            protocol: "https",
            hostname: "agenciadouro.pt",
            pathname: "/**",
        },
        {
            protocol: "https",
            hostname: "www.agenciadouro.pt",
            pathname: "/**",
        },
        {
            protocol: "https",
            hostname: "img.youtube.com",
            pathname: "/vi/**",
        },
        ],
    },
    async headers() {
        return [
            {
                source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
        {
            source: "/:locale(pt|en|fr)/hero/:image*",
            destination: "/hero/:image*",
        },
        {
            source: "/:locale(pt|en|fr)/flags/:image*",
            destination: "/flags/:image*",
        },
        {
            source: "/:locale(pt|en|fr)/podcast.png",
            destination: "/podcast.png",
        },
        {
            source: "/:locale(pt|en|fr)/patrocinador-podcast.jpeg",
            destination: "/patrocinador-podcast.jpeg",
        },
        ];
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/pt",
                permanent: false,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
