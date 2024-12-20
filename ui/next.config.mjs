import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: {
		buildActivity: process.env.NODE_ENV === 'development'
	},
	transpilePackages: ['mui-tel-input']
}

export default withNextIntl(nextConfig)
