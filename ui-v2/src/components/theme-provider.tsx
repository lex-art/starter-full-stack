'use client'

import { makeZodI18nMap } from '@/lib/zod/zod-error-map'
import { useTranslations } from 'next-intl'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'
import { z } from 'zod'

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	const t = useTranslations('zod')
	// this configuration is for the zod error messages for global use in client sides
	z.setErrorMap(
		makeZodI18nMap({
			t
		})
	)
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
