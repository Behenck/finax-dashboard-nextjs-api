import type { NextConfig } from 'next'
import TerserPlugin from 'terser-webpack-plugin'

const nextConfig: NextConfig = {
  // output: 'export',
  // assetPrefix: './',
  // trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // desativa o minificador SWC
  swcMinify: false,
  webpack(config, { dev }) {
    if (!dev) {
      // força o Terser a rodar em um único processo
      config.optimization.minimizer = [
        new TerserPlugin({
          parallel: false,
          terserOptions: {
            format: { comments: false },
          },
        }),
      ]
    }
    return config
  },
}

export default nextConfig
