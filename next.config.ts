import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export',
  // assetPrefix: './',
  // trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // força o Next a NÃO usar Worker Threads (usa processos em vez disso)
    workerThreads: false,
    // quantos “processos filhos” (workers) o Next pode criar em paralelo
    // ajuste para um valor abaixo do limite do seu servidor (ex: 2 ou 3)
    cpus: 2,
  },
}

export default nextConfig
