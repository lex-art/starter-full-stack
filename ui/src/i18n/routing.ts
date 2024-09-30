import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'es'] as const
export const routing = defineRouting({
	locales,
	defaultLocale: 'es',
	localePrefix: 'as-needed',
})

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)
