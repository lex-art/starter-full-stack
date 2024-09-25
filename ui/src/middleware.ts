import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { getSession } from 'next-auth/react'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { doesRoleHaveAccessToURL } from './lib/accessControl/accessControl'
import { locales } from './navigation'

const publicPages = ['/auth/*', '/api/auth', '/_next/static', '/_next/image']

const intlMiddleware = createIntlMiddleware({
	locales,
	localePrefix: 'as-needed',
	defaultLocale: 'es'
})

const authMiddleware = withAuth(
	// Note that this callback is only invoked if
	// the `authorized` callback has returned `true`
	// and not for pages listed in `pages`.
	(req) => intlMiddleware(req),
	{
		/**
		 * @todo Implementar la decodificación de JWT si se uso en la configuración de NextAuth
		 */
		/* jwt: {
			decode: configAuth.jwt.decode
		}, */
		callbacks: {
			authorized: async ({ req, token }) => {
				const token2 = await getToken({ req })
				const requestForNextAuth = {
					headers: {
						cookie: req.headers.get('cookie') ?? undefined
					}
				}
				const session = await getSession({ req: requestForNextAuth })
				return !!session
			}
		},
		pages: {
			signIn: '/auth/login'
		},
		secret: process.env.NEXTAUTH_SECRET
	}
)

export default function middleware(request: NextRequest) {
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

	if (isPublicPage) {
		return intlMiddleware(newRequest)
	}
	const role = request.cookies.get('role')
	let haveAccess = doesRoleHaveAccessToURL({
		role: role?.value ?? 'guest',
		url: request.nextUrl.pathname
	})
	if (!haveAccess) {
		// Redirect to login page if user has no access to that particular page
		return NextResponse.rewrite(new URL('/403', request.url))
	}

	return (authMiddleware as any)(newRequest)
}

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|.*\\..*).*)']
}
