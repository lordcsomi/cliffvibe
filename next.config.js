/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true  // Required for static export
  },
  experimental: {
    turbo: {
      rules: {
        // Configure turbopack rules here
      },
      resolve: {
        alias: {
          "mapbox-gl": "mapbox-gl"
        }
      }
    }
  }
}

module.exports = nextConfig
