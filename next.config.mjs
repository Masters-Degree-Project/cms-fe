/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    API_BASE: process.env.API_BASE,
    WEB_BASE: process.env.WEB_BASE
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/generate-content',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
