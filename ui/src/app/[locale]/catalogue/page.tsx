import AppGrid from '@/components/Common/LAyout/Grid/Grid'
import { useTranslations } from 'next-intl'

export default function Catalogue() {
	const t = useTranslations('common')
	return (
		<AppGrid width="100%" height="100%">
			<h1>{t('icons')}</h1>
		</AppGrid>
	)
}
