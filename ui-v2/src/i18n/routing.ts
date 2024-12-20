import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'es'] as const
export const routing = defineRouting({
	// A list of all locales that are supported
	locales,

	// Used when no locale matches
	defaultLocale: 'es',

	// The prefix for the locale segment in the URL
	localePrefix: 'as-needed'
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing)
