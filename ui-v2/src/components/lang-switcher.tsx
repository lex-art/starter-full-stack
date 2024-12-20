'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { locales, usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function LangToggle() {
	const locale = useLocale()
	const redirect = useRouter()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const pathname = usePathname()
	console.log('====================================')
	console.log(otherLocale)
	console.log('====================================')
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<span className="h-[1.8rem] w-[1.8rem] text-xl  transition-all">
						{locale === 'es' ? '🇬🇹' : '🇺🇸'}
					</span>

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() =>
						redirect.push(pathname ?? '/', { locale: otherLocale })
					}
				>
					Español
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						redirect.push(pathname ?? '/', { locale: otherLocale })
					}
				>
					Ingles
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
