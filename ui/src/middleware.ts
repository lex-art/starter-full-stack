import { withAuth } from 'next-auth/middleware'
import { getSession } from 'next-auth/react'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, routing } from './i18n/routing'
import { doesRoleHaveAccessToURL } from './lib/accessControl/accessControl'

const publicPages = ['/auth/*', '/api/auth', '/_next/static', '/_next/image']
const JWT_COOKIE_NAME = 'next-auth.session-token'

const handleI18nRouting = createIntlMiddleware(routing)

const authMiddleware = withAuth(
	// Note that this callback is only invoked if
	// the `authorized` callback has returned `true`
	// and not for pages listed in `pages`.
	function onSuccess(req) {
		return handleI18nRouting(req)
	},
	{
		callbacks: {
			authorized: async ({ req }) => {
				const requestForNextAuth = {
					headers: {
						cookie: req.headers.get('cookie') ?? undefined
					}
				}
				const session = await getSession({ req: requestForNextAuth })
				return !!session?.accessToken
			}
		},
		pages: {
			signIn: '/auth/login'
		},
		secret: process.env.NEXTAUTH_SECRET
	}
)

export default async function middleware(request: NextRequest) {
	const publicPathnameRegex = RegExp(
		`^(/(${locales.join('|')}))?(${publicPages
			.map((p) => p.replace(/\*/g, '.*')) // Reemplazar * con .* en los patrones
			.join('|')})$`,
		'i'
	)

	const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname)
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set('x-url', request.nextUrl.pathname)
	const newRequest = new NextRequest(request, {
		headers: requestHeaders
	})

	const jwtToken = request.cookies.get(JWT_COOKIE_NAME)?.value
	if (isPublicPage) {
		if (jwtToken) {
			return NextResponse.redirect(new URL('/', request.url))
		}
		return handleI18nRouting(newRequest)
	}

	const role = newRequest.cookies.get('role')
	let haveAccess = doesRoleHaveAccessToURL({
		role: role?.value ?? 'guest',
		url: newRequest.nextUrl.pathname
	})
	if (!haveAccess) {
		// Redirect to login page if user has no access to that particular page
		return NextResponse.rewrite(new URL('/403', request.url))
	}

	return (authMiddleware as any)(newRequest)
}

export const config = {
	// Skip all paths that should not be internationalized
	//matcher: ['/((?!api|_next|.*\\..*).*)'],
	matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|.*\\..*).*)']
}
