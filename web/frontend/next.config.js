/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '.'
  },
  assetPrefix: './'
}

module.exports = nextConfig
