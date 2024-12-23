import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set('x-url', request.nextUrl.pathname)
	const newRequest = new NextRequest(request, {
		headers: requestHeaders
	})
	return handleI18nRouting(newRequest)
}

export const config = {
	// Match only internationalized pathnames
	//matcher: ['/', '/(es|en)/:path*']
	matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|.*\\..*).*)']
}
