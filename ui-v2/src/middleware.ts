import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { auth as authMiddleware } from './auth'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Rutas públicas que no requieren autenticación
const publicPages = [
	'/auth/*',
	'en/auth/*',
	'/_next/static',
	'/_next/image',
	'/favicon.ico'
]

// Rutas a las que los usuarios autenticados no deberían acceder (como login/register)
const authRedirectPages = ['/auth/login', '/auth/register']
const isPublicPage = (pathname: string) => {
	return publicPages.some((path) => {
		// Si la ruta termina con *, verifica si la ruta actual comienza con esa ruta
		if (path.endsWith('*')) {
			const basePath = path.slice(0, -1) // Elimina el *
			return pathname.startsWith(basePath)
		}
		// Si no tiene *, verifica si la ruta coincide exactamente
		return pathname === path
	})
}
export default async function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set('x-url', request.nextUrl.pathname)
	const newRequest = new NextRequest(request, {
		headers: requestHeaders
	})
	const { pathname } = newRequest.nextUrl

	// Si la ruta es pública, solo ejecuta el middleware de next-intl
	// Verifica si la ruta es pública
	if (isPublicPage(pathname)) {
		return intlMiddleware(newRequest) // Solo ejecuta el middleware de next-intl
	}

	// Ejecuta el middleware de Auth.js para verificar la autenticación
	const session = await authMiddleware()
	// Si el usuario no está autenticado, redirige a la página de inicio de sesión
	if (!session) {
		const loginUrl = new URL('/auth/login', newRequest.url)
		return NextResponse.redirect(loginUrl)
	}

	// Si el usuario está autenticado y trata de acceder a rutas como /auth/login, redirige al dashboard
	const isAuthRedirectPage = authRedirectPages.some((path) =>
		newRequest.nextUrl.pathname.startsWith(path)
	)
	if (isAuthRedirectPage) {
		const dashboardUrl = new URL('/', newRequest.url)
		return NextResponse.redirect(dashboardUrl)
	}

	// Si el usuario está autenticado y la ruta no es pública, ejecuta el middleware de next-intl
	return intlMiddleware(newRequest)
}

export const config = {
	// Match only internationalized pathnames
	//matcher: ['/', '/(es|en)/:path*']
	matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|.*\\..*).*)']
}
