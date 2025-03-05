import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	env: {
		APP_ENV: process.env.APP_ENV,
		CLIENT_URL: process.env.CLIENT_URL,
		CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
		SERVER_URL: process.env.SERVER_URL
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.yandex.net"
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com"
			}
		]
	},
	async rewrites() {
		return [
			{
				source: "/uploads/:path*",
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
}

export default nextConfig
