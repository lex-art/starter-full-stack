import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function HomePage() {
	const t = useTranslations('common')
	return (
		<div>
			<h1>{t('home')}</h1>
			<Link href="/dashboard">{t('user')}</Link>
		</div>
	)
}
