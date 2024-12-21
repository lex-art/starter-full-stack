'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

export function LangToggle() {
	const t = useTranslations()
	const locale = useLocale()
	const redirect = useRouter()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const pathname = usePathname()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<span className="h-[1.8rem] w-[1.8rem] text-xl  transition-all flex items-center justify-center">
						<Image
							src={`/img/flags/${locale}.png`}
							alt={locale === 'es' ? 'Spanish Flag' : 'English Flag'}
							width={25}
							height={25}
						/>
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
					{t('common.spanish')}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						redirect.push(pathname ?? '/', { locale: otherLocale })
					}
				>
					{t('common.english')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
