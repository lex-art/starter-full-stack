import { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { locales } from './navigation'
import configAuth from './app/api/auth/configAuth'
import { getSession } from 'next-auth/react'

const publicPages = ['/auth/*']

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
		jwt: {
			decode: configAuth.jwt.decode
		},
		callbacks: {
			authorized: async ({ req, token }) => {
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
	return (authMiddleware as any)(newRequest)
}

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|.*\\..*).*)']
}
