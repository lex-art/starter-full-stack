import { Link, usePathname } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'

export default function LocaleSwitcher() {
	const t = useTranslations('common')
	const locale = useLocale()
	const otherLocale = locale === 'es' ? 'en' : 'es'
	const pathname = usePathname()

	return (
		<Link href={pathname} locale={otherLocale}>
			{t('switchLng', { locale: otherLocale })}
		</Link>
	)
}
