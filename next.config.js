/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode 활성화
  reactStrictMode: true,

  // 이미지 도메인 허용 설정
  images: {
    domains: process.env.RESOURCES_DOMAINS.trim().split(','),
  },

  // webpack 설정
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,
    };

    return config;
  },

  // API 라우트 설정
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
          has: [
            {
              type: "header",
              key: "Authorization",
            },
          ],
        },
      ],
    };
  },

  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // 실험적 기능
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  // 컴파일러 설정
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // 성능 최적화
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
