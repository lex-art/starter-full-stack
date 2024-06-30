import AppGrid from '@/components/Common/LAyout/Grid/Grid'
import { useTranslations } from 'next-intl'

export default function Secret() {
	const t = useTranslations('common')

	return (
		<AppGrid>
			<p>{t('home')}</p>
		</AppGrid>
	)
}
