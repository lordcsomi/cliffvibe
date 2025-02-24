/** @type {import('next').NextConfig} */
const nextConfig = {
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
