/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '.'
  },
  assetPrefix: './',
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
