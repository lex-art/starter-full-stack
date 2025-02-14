import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { auth as authMiddleware } from './auth'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

/**
 * Public routes that users can access without being authenticated
 */
const publicPages = [
	'/auth/*',
	'en/auth/*',
	'/_next/static',
	'/_next/image',
	'/favicon.ico'
]

/**
 * Routes that authenticated users should not access (like login/register)
 */
const authRedirectPages = ['/auth/login', '/auth/register']
const isPublicPage = (pathname: string) => {
	return publicPages.some((path) => {
		/**
		 * if the route ends with *, check if the current route starts with that route
		 */
		if (path.endsWith('*')) {
			const basePath = path.slice(0, -1) // Elimina el *
			return pathname.startsWith(basePath)
		}
		/**
		 * Check if the route matches exactly
		 */
		return pathname === path
	})
}
export default async function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers)
	/**
	 * Add the current pathname to the headers to be used in the next-intl middleware or other middlewares
	 */
	requestHeaders.set('x-url', request.nextUrl.pathname)
	const newRequest = new NextRequest(request, {
		headers: requestHeaders
	})
	const { pathname } = newRequest.nextUrl

	/**
	 * if the route is public, just execute the next-intl middleware
	 * Check if the route is public
	 */
	if (isPublicPage(pathname)) {
		return intlMiddleware(newRequest) // Solo ejecuta el middleware de next-intl
	}

	/**
	 * execute the auth middleware of Auth.js to check if the user is authenticated
	 */
	const session = await authMiddleware()
	/**
	 * if the user is not authenticated, redirect to the login page
	 */
	if (!session) {
		const loginUrl = new URL('/auth/login', newRequest.url)
		return NextResponse.redirect(loginUrl)
	}

	/**
	 * if the user is authenticated but not verified, redirect to the verify account page
	 */
	if (!session.data?.user?.verified) {
		const verifyRequestUrl = new URL(
			'/auth/verify-account',
			newRequest.url
		)
		return NextResponse.redirect(verifyRequestUrl)
	}
	/**
	 * if the user is authenticated and tries to access routes like /auth/login, redirect to the dashboard
	 */
	const isAuthRedirectPage = authRedirectPages.some((path) =>
		newRequest.nextUrl.pathname.startsWith(path)
	)
	if (isAuthRedirectPage) {
		const dashboardUrl = new URL('/', newRequest.url)
		return NextResponse.redirect(dashboardUrl)
	}

	/**
	 * if the user is authenticated and the route is not public, execute the next-intl middleware
	 */
	return intlMiddleware(newRequest)
}

export const config = {
	// Match only internationalized pathnames
	//matcher: ['/', '/(es|en)/:path*']
	matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|.*\\..*).*)']
}
