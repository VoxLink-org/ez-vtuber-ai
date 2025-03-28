/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow loading scripts from external domains
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cubism.live2d.com https://cdn.jsdelivr.net; img-src 'self' data: https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self' https://cdn.jsdelivr.net;"
          }
        ]
      }
    ];
  },
  // Add types for window object
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;

